import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'cowboyholic_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]));
  }, [favorites]);

  const isFavorite = useCallback((wordId: string) => {
    return favorites.has(wordId);
  }, [favorites]);

  const toggleFavorite = useCallback((wordId: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(wordId)) {
        next.delete(wordId);
      } else {
        next.add(wordId);
      }
      return next;
    });
  }, []);

  return { favorites, isFavorite, toggleFavorite };
}
