import React, { useState, useEffect, useRef, useCallback } from 'react';
import { setQuery } from '../store/slices/searchSlice';
import { fetchAnimes } from '../store/slices/searchSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import './SearchBar.css';

const DEBOUNCE_MS = 250;

const SearchBar: React.FC = () => {
    const dispatch = useAppDispatch();
    const reduxQuery = useAppSelector((s) => s.search.query);
    const [local, setLocal] = useState(reduxQuery ?? '');
    const controllerRef = useRef<AbortController | null>(null);
    const timeoutRef = useRef<number | undefined>(undefined);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setLocal(e.target.value);
    }, []);

    useEffect(() => {
        // debounce update + fetch
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => {
            // update query state
            dispatch(setQuery(local));

            // cancel previous in-flight request
            if (controllerRef.current) {
                controllerRef.current.abort();
            }

            // if empty query, dispatch fetch to clear results
            if (!local.trim()) {
                dispatch(fetchAnimes({ query: '', page: 1 }));
                return;
            }

            const controller = new AbortController();
            controllerRef.current = controller;
            dispatch(fetchAnimes({ query: local, page: 1, signal: controller.signal }));
        }, DEBOUNCE_MS);

        return () => {
            window.clearTimeout(timeoutRef.current);
        };
    }, [local, dispatch]);

    useEffect(() => {
        return () => {
            if (controllerRef.current) controllerRef.current.abort();
        };
    }, []);

    // keep local input in sync when redux query changes (e.g. navigating back)
    useEffect(() => {
        setLocal(reduxQuery ?? '');
    }, [reduxQuery]);

    return (
        <div className="search-bar">
            <input
                type="text"
                aria-label="Search anime"
                placeholder="Search for anime..."
                value={local}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchBar;