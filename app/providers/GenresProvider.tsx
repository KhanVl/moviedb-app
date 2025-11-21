'use client';

import { createContext, useContext, useMemo } from 'react';
import type { Genre } from '../types';

type GenresContextValue = { genresById: Record<number, string> };
const GenresContext = createContext<GenresContextValue>({ genresById: {} });

export function GenresProvider({
  genres,
  children,
}: {
  genres: Genre[];
  children: React.ReactNode;
}) {
  const genresById = useMemo(() => {
    const map: Record<number, string> = {};
    for (const g of genres) map[g.id] = g.name;
    return map;
  }, [genres]);
  return <GenresContext.Provider value={{ genresById }}>{children}</GenresContext.Provider>;
}

export function useGenres() {
  return useContext(GenresContext);
}
