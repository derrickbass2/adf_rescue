import { useState, useEffect } from 'react';
import axios from 'axios';

// Custom hook for fetching data
export const useDataFetching = <T,>(
  url: string,
  options?: Record<string, any> // Optional configuration for axios
) => {
  const [data, setData] = useState<T | null>(null); // Holds fetched data
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    let isMounted = true; // To prevent setting state if the component unmounts
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, options); // Fetch data from API
        if (isMounted) {
          setData(response.data);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'An error occurred');
          setData(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup to avoid memory leaks
    };
  }, [url, options]); // Re-run fetch if URL or options change

  return { data, isLoading, error };
};

export default useDataFetching;