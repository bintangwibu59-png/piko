import { Heart, Volume2, VolumeX, Trash2 } from 'lucide-react';
import { allVocabulary } from '../data/vocabulary';
import { useFavorites } from '../hooks/useFavorites';
import { useSpeech } from '../hooks/useSpeech';
import { useState } from 'react';

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const { speakingId, speak } = useSpeech();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const favoriteWords = allVocabulary.filter(w => favorites.has(w.id));

  return (
    <div className="min-h-screen bg-western-cream">
      {/* Header */}
      <div className="bg-western-brown py-10 px-4">
        <div className="max-w-[1200px] mx-auto text-center">
          <Heart className="mx-auto mb-3 text-western-terracotta" size={32} />
          <h1 className="font-display text-3xl md:text-4xl text-[#F0EBE0] uppercase tracking-wide">
            Kata Favorit
          </h1>
          <p className="font-body text-[#D4C9A8] mt-3 max-w-lg mx-auto">
            Kumpulan kata-kata yang kamu tandai sebagai favorit untuk dipelajari ulang.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-4 py-8">
        {favoriteWords.length === 0 ? (
          <div className="text-center py-16">
            <Heart size={48} className="mx-auto text-[#D4C9A8] mb-4" />
            <p className="font-body text-lg text-[#6B5D4E]">Belum ada kata favorit</p>
            <p className="font-body text-sm text-[#6B5D4E] mt-1">
              Tandai kata favoritmu dengan menekan ikon bookmark di halaman kamus.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {favoriteWords.map((word) => (
              <div
                key={word.id}
                className="bg-western-beige/50 border border-[rgba(42,30,18,0.08)] rounded-lg overflow-hidden"
              >
                <div
                  className="flex items-center gap-4 p-4 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === word.id ? null : word.id)}
                >
                  {/* Word */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-serif-display text-lg text-western-deep">{word.word}</span>
                      <span className="text-xs font-body text-[#6B5D4E] border border-[#6B5D4E] px-2 py-0.5 rounded-full">{word.category}</span>
                    </div>
                    <p className="font-body text-sm text-western-deep mt-0.5">{word.meaning}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speak(word.word, word.id);
                      }}
                      className="w-8 h-8 rounded-full border border-[rgba(42,30,18,0.15)] flex items-center justify-center hover:bg-western-beige transition-colors"
                    >
                      {speakingId === word.id
                        ? <VolumeX size={14} className="text-western-terracotta" />
                        : <Volume2 size={14} className="text-[#6B5D4E]" />
                      }
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(word.id);
                      }}
                      className="w-8 h-8 rounded-full border border-western-terracotta flex items-center justify-center hover:bg-western-terracotta/10 transition-colors"
                    >
                      <Trash2 size={14} className="text-western-terracotta" />
                    </button>
                  </div>
                </div>

                {/* Expanded */}
                {expandedId === word.id && (
                  <div className="px-4 pb-4 border-t border-[rgba(42,30,18,0.06)] pt-3">
                    <p className="font-body text-sm text-[#6B5D4E] mb-2"><strong>Etimologi:</strong> {word.etymology}</p>
                    <p className="font-body text-sm text-[#6B5D4E] mb-2"><strong>Catatan:</strong> {word.note}</p>
                    <div className="bg-western-cream rounded-md p-3">
                      <p className="font-body text-sm text-western-deep italic">"{word.exampleEn}"</p>
                      <p className="font-body text-sm text-[#6B5D4E] mt-1">{word.exampleId}</p>
                    </div>
                    {word.related.length > 0 && (
                      <p className="font-body text-sm mt-2">
                        <strong className="text-western-deep">Lihat juga:</strong>{' '}
                        {word.related.join(', ')}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
