import { useState, useCallback, useRef } from 'react';

export function useSpeech() {
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const speak = useCallback((text: string, id: string) => {
    if (!window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    if (speakingId === id) {
      setSpeakingId(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    // Try to find an English voice
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find(v => v.lang.startsWith('en'));
    if (enVoice) utterance.voice = enVoice;

    utterance.onend = () => {
      setSpeakingId(null);
    };

    utterance.onerror = () => {
      setSpeakingId(null);
    };

    window.speechSynthesis.speak(utterance);
    setSpeakingId(id);

    // Auto stop after 5 seconds
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    }, 5000);
  }, [speakingId]);

  return { speakingId, speak };
}
