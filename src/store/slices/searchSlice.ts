import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Anime {
    mal_id: number;
    title: string;
    images?: any;
    synopsis?: string;
}

export interface SearchState {
    query: string;
    results: Anime[];
    loading: boolean;
    error?: string | null;
    page: number;
    lastTotal?: number;
}

const initialState: SearchState = {
    query: '',
    results: [],
    loading: false,
    error: null,
    page: 1,
    lastTotal: 0,
};

// Thunk: accepts optional external signal in payload.signal, falls back to thunkAPI.signal
export const fetchAnimes = createAsyncThunk<
    { results: Anime[]; page: number; total?: number },
    { query: string; page?: number; signal?: AbortSignal },
    { rejectValue: string }
>('search/fetchAnimes', async (payload, thunkAPI) => {
    const q = payload.query ?? '';
    const page = payload.page ?? 1;
    const signal = payload.signal ?? thunkAPI.signal;

    if (!q.trim()) {
        // clear results for empty query
        return { results: [], page, total: 0 };
    }

    const url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}&page=${page}`;

    try {
        const res = await fetch(url, { signal });
        if (!res.ok) {
            const text = await res.text();
            return thunkAPI.rejectWithValue(`API error: ${res.status} ${text}`);
        }
        const json = await res.json();
        const results: Anime[] = json.data ?? [];
        const total = json.pagination?.items?.total;
        return { results, page, total };
    } catch (err: any) {
        if (err?.name === 'AbortError') {
            return thunkAPI.rejectWithValue('aborted');
        }
        return thunkAPI.rejectWithValue(err?.message ?? 'Unknown error');
    }
});

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
            state.page = 1;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        clearResults(state) {
            state.results = [];
            state.lastTotal = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnimes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAnimes.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.results = action.payload.results;
                state.page = action.payload.page;
                if (typeof action.payload.total === 'number') {
                    state.lastTotal = action.payload.total;
                }
            })
            .addCase(fetchAnimes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload === 'aborted' ? null : action.payload ?? 'Failed';
            });
    },
});

export const { setQuery, setPage, clearResults } = searchSlice.actions;
export default searchSlice.reducer;