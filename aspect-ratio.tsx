import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { allVocabulary, type Category } from '../data/vocabulary';

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  lessonCount: number;
  wordCount: number;
  image: string;
  category: Category;
}

export default function ModuleCard({ title, description, lessonCount, wordCount, image, category }: ModuleCardProps) {
  const { progress } = useProgress();

  const categoryWords = allVocabulary.filter(w => w.category === category);
  const masteredCount = categoryWords.filter(w => progress[w.id] === 'mastered').length;
  const progressPercent = categoryWords.length > 0 ? (masteredCount / categoryWords.length) * 100 : 0;

  return (
    <div className="bg-western-beige border border-[rgba(42,30,18,0.08)] rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-40 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-5">
        <h3 className="font-serif-display text-lg text-western-deep mb-1">{title}</h3>
        <p className="font-body text-sm text-[#6B5D4E] mb-3">{description}</p>
        <p className="font-mono-data text-xs text-[#6B5D4E] mb-3">
          {lessonCount} pelajaran &bull; {wordCount} kata
        </p>

        {/* Progress bar */}
        <div className="h-1.5 bg-[rgba(42,30,18,0.08)] rounded-full mb-4 overflow-hidden">
          <div
            className="h-full bg-western-terracotta rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 font-body font-semibold text-sm text-western-terracotta hover:text-[#b34733] transition-colors"
        >
          {progressPercent > 0 ? 'Lanjutkan' : 'Mulai'}
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
