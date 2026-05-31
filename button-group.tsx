import { useState, useMemo, useCallback } from 'react';
import { Volume2, VolumeX, ChevronDown, Bookmark, Heart } from 'lucide-react';
import { allVocabulary, type VocabWord, type WordStatus, type Category } from '../data/vocabulary';
import { useProgress } from '../hooks/useProgress';
import { useFavorites } from '../hooks/useFavorites';
import { useSpeech } from '../hooks/useSpeech';
import Toast from './Toast';

interface VocabTableProps {
  searchQuery: string;
  activeFilter: WordStatus | 'all';
  activeCategory: Category | 'all';
}

const statusConfig: Record<WordStatus, { label: string; bg: string; text: string }> = {
  mastered: { label: 'Dikuasai', bg: 'bg-[#7D8B6A]', text: 'text-[#F0EBE0]' },
  learning: { label: 'Belajar', bg: 'bg-[#8B3D2B]', text: 'text-[#F0EBE0]' },
  new: { label: 'Baru', bg: 'bg-[#A66A0D]', text: 'text-[#F0EBE0]' },
};

export default function VocabTable({ searchQuery, activeFilter, activeCategory }: VocabTableProps) {
  const { getStatus, toggleStatus } = useProgress();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { speakingId, speak } = useSpeech();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; status: WordStatus } | null>(null);
  const [visibleCount, setVisibleCount] = useState(50);

  const filteredWords = useMemo(() => {
    return allVocabulary.filter(word => {
      const matchesSearch = !searchQuery ||
        word.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        word.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        word.exampleEn.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter = activeFilter === 'all' || getStatus(word.id) === activeFilter;
      const matchesCategory = activeCategory === 'all' || word.category === activeCategory;

      return matchesSearch && matchesFilter && matchesCategory;
    });
  }, [searchQuery, activeFilter, activeCategory, getStatus]);

  const visibleWords = useMemo(() => filteredWords.slice(0, visibleCount), [filteredWords, visibleCount]);

  const handleToggleStatus = useCallback((word: VocabWord) => {
    const newStatus = toggleStatus(word.id);
    const statusLabels: Record<WordStatus, string> = {
      mastered: 'ditandai Dikuasai',
      learning: 'ditandai Sedang Belajar',
      new: 'direset ke Baru',
    };
    setToast({
      message: `'${word.word}' ${statusLabels[newStatus]}!`,
      status: newStatus,
    });
  }, [toggleStatus]);

  const handleRowClick = useCallback((id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  }, []);

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <mark key={i} className="bg-[rgba(197,80,59,0.2)] text-inherit rounded px-0.5">{part}</mark>
        : part
    );
  };

  return (
    <div className="flex-1 min-w-0">
      {/* Table Header */}
      <div className="sticky top-14 z-20 bg-western-beige border-b border-[rgba(42,30,18,0.1)]">
        <div className="grid grid-cols-[100px_1fr_1fr_100px_40px] md:grid-cols-[100px_160px_200px_120px_1fr_60px] gap-0">
          <div className="px-3 py-2.5 font-body font-semibold text-xs uppercase text-[#6B5D4E] tracking-wider">Status</div>
          <div className="px-3 py-2.5 font-body font-semibold text-xs uppercase text-[#6B5D4E] tracking-wider hidden md:block">Kata</div>
          <div className="px-3 py-2.5 font-body font-semibold text-xs uppercase text-[#6B5D4E] tracking-wider">Arti</div>
          <div className="px-3 py-2.5 font-body font-semibold text-xs uppercase text-[#6B5D4E] tracking-wider hidden md:block">Kategori</div>
          <div className="px-3 py-2.5 font-body font-semibold text-xs uppercase text-[#6B5D4E] tracking-wider">Contoh</div>
          <div className="px-3 py-2.5 font-body font-semibold text-xs uppercase text-[#6B5D4E] tracking-wider text-center"></div>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-[rgba(42,30,18,0.06)]">
        {visibleWords.map((word, index) => {
          const status = getStatus(word.id);
          const statusStyle = statusConfig[status];
          const isExpanded = expandedId === word.id;
          const isSpeaking = speakingId === word.id;

          return (
            <div
              key={word.id}
              className={`transition-colors ${index % 2 === 0 ? 'bg-western-cream' : 'bg-[rgba(212,201,168,0.2)]'} hover:bg-western-beige/60`}
            >
              <div
                className="grid grid-cols-[100px_1fr_1fr_100px_40px] md:grid-cols-[100px_160px_200px_120px_1fr_60px] gap-0 cursor-pointer"
                onClick={() => handleRowClick(word.id)}
              >
                {/* Status */}
                <div className="px-3 py-3 flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleStatus(word);
                    }}
                    className={`${statusStyle.bg} ${statusStyle.text} text-xs font-body font-semibold px-2.5 py-1 rounded-full transition-all hover:opacity-80 whitespace-nowrap`}
                  >
                    {statusStyle.label}
                  </button>
                </div>

                {/* Word */}
                <div className="px-3 py-3 hidden md:flex items-center">
                  <span className="font-serif-display text-base font-medium text-western-deep">
                    {highlightText(word.word, searchQuery)}
                  </span>
                </div>

                {/* Meaning */}
                <div className="px-3 py-3 flex items-center">
                  <span className="font-body text-sm text-western-deep">
                    {highlightText(word.meaning, searchQuery)}
                  </span>
                </div>

                {/* Category */}
                <div className="px-3 py-3 hidden md:flex items-center">
                  <span className="border border-[#6B5D4E] text-[#6B5D4E] text-xs font-body font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                    {word.category}
                  </span>
                </div>

                {/* Example */}
                <div className="px-3 py-3 flex items-center min-w-0">
                  <p className="font-body text-xs text-[#6B5D4E] italic truncate">
                    "{highlightText(word.exampleEn, searchQuery)}"
                  </p>
                </div>

                {/* Audio */}
                <div className="px-2 py-3 flex items-center justify-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speak(word.word, word.id);
                    }}
                    className="w-8 h-8 rounded-full border border-[rgba(42,30,18,0.15)] flex items-center justify-center hover:bg-western-beige transition-colors"
                  >
                    {isSpeaking
                      ? <VolumeX size={14} className="text-western-terracotta animate-pulse-soft" />
                      : <Volume2 size={14} className="text-[#6B5D4E]" />
                    }
                  </button>
                </div>
              </div>

              {/* Expanded Detail */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-[rgba(42,30,18,0.06)] animate-fade-in">
                  <div className="space-y-2">
                    {/* Word + Favorite on mobile */}
                    <div className="md:hidden flex items-center justify-between">
                      <span className="font-serif-display text-lg font-medium text-western-deep">{word.word}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(word.id);
                        }}
                        className="p-1.5 rounded-full hover:bg-western-beige transition-colors"
                      >
                        <Heart
                          size={18}
                          className={isFavorite(word.id) ? 'text-western-terracotta fill-western-terracotta' : 'text-[#6B5D4E]'}
                        />
                      </button>
                    </div>

                    {/* Etymology */}
                    <p className="font-body text-sm text-[#6B5D4E]">
                      <span className="font-semibold">Etimologi:</span> {word.etymology}
                    </p>

                    {/* Note */}
                    <p className="font-body text-sm text-[#6B5D4E]">
                      <span className="font-semibold">Catatan:</span> {word.note}
                    </p>

                    {/* Examples */}
                    <div className="bg-western-beige/40 rounded-md p-3 space-y-1.5">
                      <p className="font-body text-sm text-western-deep italic">
                        "{word.exampleEn}"
                      </p>
                      <p className="font-body text-sm text-[#6B5D4E]">
                        {word.exampleId}
                      </p>
                    </div>

                    {/* Related words */}
                    {word.related.length > 0 && (
                      <p className="font-body text-sm">
                        <span className="font-semibold text-western-deep">Lihat juga:</span>{' '}
                        {word.related.map((r, i) => (
                          <span key={r}>
                            <span className="text-western-terracotta cursor-pointer hover:underline">{r}</span>
                            {i < word.related.length - 1 && <span className="text-[#6B5D4E]">, </span>}
                          </span>
                        ))}
                      </p>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStatus(word);
                        }}
                        className="text-xs font-body font-semibold px-3 py-1.5 border border-[rgba(42,30,18,0.15)] rounded-md hover:bg-western-beige transition-colors text-western-deep"
                      >
                        {status === 'mastered' ? 'Reset ke Baru' : status === 'learning' ? 'Tandai Dikuasai' : 'Tandai Belajar'}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(word.id);
                        }}
                        className="text-xs font-body font-semibold px-3 py-1.5 border border-[rgba(42,30,18,0.15)] rounded-md hover:bg-western-beige transition-colors text-western-deep flex items-center gap-1.5"
                      >
                        <Bookmark size={12} className={isFavorite(word.id) ? 'text-western-terracotta fill-western-terracotta' : ''} />
                        {isFavorite(word.id) ? 'Hapus Favorit' : 'Tambah Favorit'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Load More */}
      {visibleCount < filteredWords.length && (
        <div className="flex justify-center py-6">
          <button
            onClick={() => setVisibleCount(prev => prev + 50)}
            className="font-body font-semibold text-sm text-western-terracotta hover:text-[#b34733] transition-colors flex items-center gap-2 px-6 py-2 border border-western-terracotta rounded-md hover:bg-[rgba(197,80,59,0.05)]"
          >
            Muat Lebih ({filteredWords.length - visibleCount} kata lagi)
            <ChevronDown size={16} />
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredWords.length === 0 && (
        <div className="py-16 text-center">
          <p className="font-body text-lg text-[#6B5D4E]">Tidak ada kata yang cocok dengan filter ini.</p>
          <p className="font-body text-sm text-[#6B5D4E] mt-1">Coba ubah pencarian atau filter.</p>
        </div>
      )}

      {/* Footer info */}
      <div className="px-4 py-3 border-t border-[rgba(42,30,18,0.06)]">
        <p className="font-body text-xs text-[#6B5D4E]">
          Menampilkan {visibleWords.length} dari {filteredWords.length} kata
          {activeCategory !== 'all' && ` di kategori "${activeCategory}"`}
        </p>
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          status={toast.status}
          visible={!!toast}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
