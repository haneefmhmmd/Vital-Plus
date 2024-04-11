import { useEffect, useState } from "react";

export const useFetch = (
  url,
  options = {},
  transform = null,
  valueToReload = []
) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [abort, setAbort] = useState(() => {});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, { ...options });
        const json = await res.json();
        if (transform) {
          const transformedData = transform(json);
          setResponse(transformedData);
        } else {
          setResponse(json);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, valueToReload);

  return { isLoading, response, error };
};
