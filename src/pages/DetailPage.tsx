import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

type AnimeDetail = {
    mal_id: number;
    title: string;
    synopsis?: string;
    score?: number;
    episodes?: number;
    url?: string;
    // Jikan v4 shape
    images?: {
        jpg?: {
            image_url?: string;
            large_image_url?: string;
        };
    };
    // fallback older shape
    image_url?: string;
    genres?: { name: string }[];
};

const DetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const fromStore = useAppSelector((s) =>
        s.search.results.find((item: any) => item.mal_id?.toString() === id)
    ) as AnimeDetail | undefined;

    const [anime, setAnime] = useState<AnimeDetail | null>(fromStore ?? null);
    const [loading, setLoading] = useState<boolean>(!fromStore && !!id);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        if (fromStore) {
            setAnime(fromStore);
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        setLoading(true);
        setError(null);

        fetch(`https://api.jikan.moe/v4/anime/${encodeURIComponent(id)}`, { signal: controller.signal })
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((json) => {
                setAnime(json.data ?? null);
            })
            .catch((err: any) => {
                if (err.name === 'AbortError') return;
                setError(err.message || 'Failed to load anime');
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [id, fromStore]);

    const imageUrl =
        anime?.images?.jpg?.image_url ?? anime?.images?.jpg?.large_image_url ?? anime?.image_url ?? '';

        if (loading) return <main style={{ padding: 16 }}>Loading...</main>;
    if (error) return <main style={{ padding: 16 }}><p style={{ color: 'red' }}>{error}</p></main>;
    if (!anime) return <main style={{ padding: 16 }}><p>Anime not found</p><Link to="/">Back</Link></main>;

    return (
        <main style={{ padding: 16 }}>
            <Link to="/">← Back</Link>
            <article style={{ marginTop: 12 }}>
                <h1>{anime.title}</h1>
                {imageUrl && <img src={imageUrl} alt={anime.title} style={{ maxWidth: 320 }} />}
                {anime.synopsis && <p style={{ marginTop: 12 }}>{anime.synopsis}</p>}
                <p>Score: {anime.score ?? 'N/A'}</p>
                <p>Episodes: {anime.episodes ?? 'N/A'}</p>
                {anime.genres && anime.genres.length > 0 && (
                    <p>Genres: {anime.genres.map((g) => g.name).join(', ')}</p>
                )}
                {anime.url && (
                    <p>
                        <a href={anime.url} target="_blank" rel="noopener noreferrer">
                            View on MyAnimeList
                        </a>
                    </p>
                )}
            </article>
        </main>
    );
};

export default DetailPage;