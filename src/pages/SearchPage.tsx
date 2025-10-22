import React, { useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar';
import AnimeCard from '../components/AnimeCard';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchAnimes } from '../store/slices/searchSlice';
import Pagination from '../components/Pagination';

const SearchPage: React.FC = () => {
    const { results, loading, error, query, page, lastTotal } = useAppSelector((s) => s.search);
    const [typeFilter, setTypeFilter] = useState<string>('');
    const dispatch = useAppDispatch();

    const handlePage = (newPage: number) => {
        if (!query.trim()) return;
        dispatch(fetchAnimes({ query, page: newPage }));
    };

    const totalPages = typeof lastTotal === 'number' && lastTotal > 0 ? Math.ceil(lastTotal / Math.max(1, results.length || 1)) : 1;
    const filteredResults = useMemo(() => {
        return typeFilter ? results.filter((r) => (r as any).type === typeFilter) : results;
    }, [results, typeFilter]);

    return (
        <main className="container py-4">
            <div className="row justify-content-center mb-4 g-2">
                <div className="col-12 col-md-7 col-lg-6 d-flex justify-content-center">
                    <SearchBar />
                </div>
                <div className="col-12 col-sm-auto d-flex align-items-center justify-content-center">
                    <select className="form-select filter-select" aria-label="Filter by type" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                        <option value="">All types</option>
                        <option value="TV">TV</option>
                        <option value="Movie">Movie</option>
                        <option value="OVA">OVA</option>
                        <option value="Special">Special</option>
                    </select>
                </div>
            </div>

            {loading && (
                <div className="text-center py-4">Loading...</div>
            )}
            {error && <div className="text-danger">{error}</div>}

                {/* Initial prompt removed - show nothing until user types */}

            {!loading && !error && results.length === 0 && query.trim() !== '' && (
                <div className="text-center py-5">No results found</div>
            )}

            {!loading && (
                <div className="row g-3">
                    {filteredResults.map((a) => (
                        <div key={a.mal_id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <AnimeCard anime={a} />
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-4">
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePage} />
            </div>
        </main>
    );
};

export default SearchPage;