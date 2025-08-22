import { useState, useEffect, useCallback } from "react";
import { getSuperheroes } from "../api";
import type { SuperheroList } from "../types/superheroList";

export function useSuperheroes(page: number) {
  const [superheroes, setSuperheroes] = useState<SuperheroList[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    setLoading(true);
    getSuperheroes(page)
      .then(data => setSuperheroes(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { superheroes, loading, fetchData };
}
