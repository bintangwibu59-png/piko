import { BarChart3, Target, BookOpen, Zap, Award } from 'lucide-react';
import { allVocabulary, categories } from '../data/vocabulary';
import { useProgress } from '../hooks/useProgress';

export default function Progress() {
  const { progress, getStats } = useProgress();
  const stats = getStats();

  const categoryStats = categories.map(cat => {
    const catWords = allVocabulary.filter(w => w.category === cat.label);
    const mastered = catWords.filter(w => progress[w.id] === 'mastered').length;
    const learning = catWords.filter(w => progress[w.id] === 'learning').length;
    const percent = catWords.length > 0 ? (mastered / catWords.length) * 100 : 0;
    return { ...cat, total: catWords.length, mastered, learning, percent };
  }).sort((a, b) => b.percent - a.percent);

  const totalPercent = allVocabulary.length > 0
    ? (Object.values(progress).filter(v => v === 'mastered').length / allVocabulary.length) * 100
    : 0;

  return (
    <div className="min-h-screen bg-western-cream">
      {/* Header */}
      <div className="bg-western-brown py-10 px-4">
        <div className="max-w-[1200px] mx-auto text-center">
          <BarChart3 className="mx-auto mb-3 text-western-terracotta" size={32} />
          <h1 className="font-display text-3xl md:text-4xl text-[#F0EBE0] uppercase tracking-wide">
            Progres Belajar
          </h1>
          <p className="font-body text-[#D4C9A8] mt-3 max-w-lg mx-auto">
            Pantau perkembanganmu dalam menguasai bahasa cowboy.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 py-8">
        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-western-beige/50 border border-[rgba(42,30,18,0.08)] rounded-lg p-4 text-center">
            <Target className="mx-auto mb-2 text-[#7D8B6A]" size={24} />
            <div className="font-mono-data text-2xl font-medium text-western-deep">{stats.mastered}</div>
            <div className="font-body text-xs text-[#6B5D4E] mt-1">Kata Dikuasai</div>
          </div>
          <div className="bg-western-beige/50 border border-[rgba(42,30,18,0.08)] rounded-lg p-4 text-center">
            <BookOpen className="mx-auto mb-2 text-[#8B3D2B]" size={24} />
            <div className="font-mono-data text-2xl font-medium text-western-deep">{stats.learning}</div>
            <div className="font-body text-xs text-[#6B5D4E] mt-1">Sedang Belajar</div>
          </div>
          <div className="bg-western-beige/50 border border-[rgba(42,30,18,0.08)] rounded-lg p-4 text-center">
            <Zap className="mx-auto mb-2 text-[#A66A0D]" size={24} />
            <div className="font-mono-data text-2xl font-medium text-western-deep">{stats.new}</div>
            <div className="font-body text-xs text-[#6B5D4E] mt-1">Kata Baru</div>
          </div>
          <div className="bg-western-beige/50 border border-[rgba(42,30,18,0.08)] rounded-lg p-4 text-center">
            <Award className="mx-auto mb-2 text-western-terracotta" size={24} />
            <div className="font-mono-data text-2xl font-medium text-western-deep">{Math.round(totalPercent)}%</div>
            <div className="font-body text-xs text-[#6B5D4E] mt-1">Total Selesai</div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="bg-western-beige/50 border border-[rgba(42,30,18,0.08)] rounded-lg p-5 mb-8">
          <h2 className="font-serif-display text-lg text-western-deep mb-3">Progres Keseluruhan</h2>
          <div className="h-3 bg-[rgba(42,30,18,0.08)] rounded-full overflow-hidden">
            <div
              className="h-full bg-western-terracotta rounded-full transition-all duration-700"
              style={{ width: `${totalPercent}%` }}
            />
          </div>
          <p className="font-body text-sm text-[#6B5D4E] mt-2">
            {stats.mastered} dari {allVocabulary.length} kata telah dikuasai ({Math.round(totalPercent)}%)
          </p>
        </div>

        {/* Category Progress */}
        <h2 className="font-serif-display text-lg text-western-deep mb-4">Progres per Kategori</h2>
        <div className="space-y-3">
          {categoryStats.map((cat) => (
            <div key={cat.label} className="bg-western-beige/50 border border-[rgba(42,30,18,0.08)] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-body font-semibold text-sm text-western-deep">{cat.label}</span>
                  <span className="font-body text-xs text-[#6B5D4E] ml-2">
                    {cat.mastered}/{cat.total} dikuasai
                    {cat.learning > 0 && `, ${cat.learning} belajar`}
                  </span>
                </div>
                <span className="font-mono-data text-sm font-medium text-western-deep">{Math.round(cat.percent)}%</span>
              </div>
              <div className="h-2 bg-[rgba(42,30,18,0.08)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#7D8B6A] rounded-full transition-all duration-500"
                  style={{ width: `${cat.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {stats.mastered === 0 && stats.learning === 0 && (
          <div className="text-center py-12">
            <BookOpen size={48} className="mx-auto text-[#D4C9A8] mb-4" />
            <p className="font-body text-lg text-[#6B5D4E]">Belum ada progres</p>
            <p className="font-body text-sm text-[#6B5D4E] mt-1">
              Mulai belajar dari halaman Kamus dan tandai status kata-kata.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
