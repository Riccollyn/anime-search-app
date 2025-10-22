import React from 'react';
import type { Anime } from '../store/slices/searchSlice';
import { Link } from 'react-router-dom';

const AnimeCard: React.FC<{ anime: Anime }> = ({ anime }) => {
    const img = anime.images?.jpg?.image_url ?? anime.images?.jpg?.large_image_url ?? (anime as any).image_url ?? '';
    return (
        <article className="card h-100">
            {img ? <img src={img} className="card-img-top" alt={anime.title} style={{ height: 200, objectFit: 'cover' }} /> : null}
            <div className="card-body">
                <h5 className="card-title"><Link to={`/anime/${anime.mal_id}`}>{anime.title}</Link></h5>
                <p className="card-text text-truncate" style={{ WebkitLineClamp: 3 }}>{anime.synopsis}</p>
            </div>
        </article>
    );
};

export default AnimeCard;