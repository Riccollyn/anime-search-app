export interface Anime {
    mal_id: number;
    url: string;
    image_url: string;
    title: string;
    title_english?: string;
    title_japanese?: string;
    type: string;
    source: string;
    episodes?: number;
    status: string;
    airing: boolean;
    synopsis: string;
    background?: string;
    premiered?: string;
    score?: number;
    scored_by?: number;
    rank?: number;
    popularity?: number;
    members?: number;
    favorites?: number;
    genres: Genre[];
}

export interface Genre {
    mal_id: number;
    name: string;
    type: string;
}