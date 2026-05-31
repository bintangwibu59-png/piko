import { useState, useEffect, useCallback } from 'react';
import type { WordStatus } from '../data/vocabulary';

const STORAGE_KEY = 'cowboyholic_progress';

export function useProgress() {
  const [progress, setProgress] = useState<Record<string, WordStatus>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const getStatus = useCallback((wordId: string): WordStatus => {
    return progress[wordId] || 'new';
  }, [progress]);

  const setStatus = useCallback((wordId: string, status: WordStatus) => {
    setProgress(prev => ({ ...prev, [wordId]: status }));
  }, []);

  const toggleStatus = useCallback((wordId: string): WordStatus => {
    const current = progress[wordId] || 'new';
    const next: WordStatus = current === 'new' ? 'learning' : current === 'learning' ? 'mastered' : 'new';
    setProgress(prev => ({ ...prev, [wordId]: next }));
    return next;
  }, [progress]);

  const getStats = useCallback(() => {
    const values = Object.values(progress);
    return {
      mastered: values.filter(v => v === 'mastered').length,
      learning: values.filter(v => v === 'learning').length,
      new: values.filter(v => v === 'new').length,
      total: values.length,
    };
  }, [progress]);

  return { progress, getStatus, setStatus, toggleStatus, getStats };
}
