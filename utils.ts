import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import VocabTable from '../components/VocabTable';
import Sidebar from '../components/Sidebar';
import { useProgress } from '../hooks/useProgress';
import { allVocabulary, type WordStatus, type Category } from '../data/vocabulary';

export default function Home() {
  const { getStats } = useProgress();
  const stats = getStats();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<WordStatus | 'all'>('all');
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Hero />
      <Stats
        masteredCount={stats.mastered}
        learningCount={stats.learning}
        totalCount={allVocabulary.length}
      />

      {/* Mobile filter toggle */}
      <div className="md:hidden bg-western-cream border-b border-[rgba(42,30,18,0.08)] px-4 py-2">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center gap-2 font-body font-semibold text-sm text-western-deep"
        >
          {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          {sidebarOpen ? 'Tutup Filter' : 'Buka Filter'}
        </button>
      </div>

      <div className="max-w-[1400px] mx-auto flex">
        {/* Sidebar - Desktop always visible, Mobile conditional */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block fixed md:relative inset-0 md:inset-auto z-30 bg-western-cream md:bg-transparent`}>
          <div className="h-full md:h-auto pt-14 md:pt-0">
            <Sidebar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeFilter={activeFilter}
              onFilterChange={(f) => { setActiveFilter(f); setSidebarOpen(false); }}
              activeCategory={activeCategory}
              onCategoryChange={(c) => { setActiveCategory(c); setSidebarOpen(false); }}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>

        {/* Main Table */}
        <VocabTable
          searchQuery={searchQuery}
          activeFilter={activeFilter}
          activeCategory={activeCategory}
        />
      </div>
    </div>
  );
}
