import { useEffect, useRef, useState } from 'react';

const useAbortableFetch = (url: string, options?: RequestInit) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    ...options,
                    signal: abortController.signal,
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                // Safely narrow unknown error type before accessing properties
                const errName = typeof err === 'object' && err !== null && 'name' in err ? (err as any).name : undefined;
                if (errName === 'AbortError') {
                    console.log('Fetch aborted');
                } else if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError(String(err));
                }
            }
        };

        fetchData();

        return () => {
            abortController.abort();
        };
    }, [url, options]);

    return { data, error };
};

export default useAbortableFetch;