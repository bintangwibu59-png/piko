import { useState } from 'react';
import { Search, ChevronDown, ChevronRight, X } from 'lucide-react';
import { categories, type Category, type WordStatus } from '../data/vocabulary';

interface SidebarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeFilter: WordStatus | 'all';
  onFilterChange: (f: WordStatus | 'all') => void;
  activeCategory: Category | 'all';
  onCategoryChange: (c: Category | 'all') => void;
  onClose?: () => void;
}

const statusFilters: { value: WordStatus | 'all'; label: string; color: string }[] = [
  { value: 'all', label: 'Semua Kata', color: 'bg-[#5A3D1F]' },
  { value: 'mastered', label: 'Sudah Dikuasai', color: 'bg-[#7D8B6A]' },
  { value: 'learning', label: 'Sedang Dipelajari', color: 'bg-[#8B3D2B]' },
  { value: 'new', label: 'Belum Dikenal', color: 'bg-[#A66A0D]' },
];

export default function Sidebar({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  activeCategory,
  onCategoryChange,
  onClose,
}: SidebarProps) {
  const [catExpanded, setCatExpanded] = useState(true);

  return (
    <aside className="w-full md:w-[280px] bg-western-beige border-r border-[rgba(42,30,18,0.08)] flex flex-col h-full">
      {/* Mobile close */}
      {onClose && (
        <div className="flex items-center justify-between p-3 md:hidden border-b border-[rgba(42,30,18,0.08)]">
          <span className="font-body font-semibold text-sm text-western-deep">Filter</span>
          <button onClick={onClose} className="p-1">
            <X size={18} className="text-western-deep" />
          </button>
        </div>
      )}

      {/* Search */}
      <div className="p-4 border-b border-[rgba(42,30,18,0.08)]">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B5D4E]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari kata..."
            className="w-full h-10 pl-9 pr-3 bg-western-cream border border-[rgba(42,30,18,0.12)] rounded-md font-body text-sm text-western-deep placeholder:text-[#6B5D4E] focus:outline-none focus:border-western-terracotta transition-colors"
          />
        </div>
      </div>

      {/* Status Filters */}
      <div className="p-4 border-b border-[rgba(42,30,18,0.08)]">
        <h3 className="font-body font-semibold text-[11px] uppercase text-[#6B5D4E] tracking-wider mb-3">
          Saring Kata
        </h3>
        <div className="space-y-1">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md font-body font-medium text-sm transition-all ${
                activeFilter === filter.value
                  ? 'bg-western-cream border-l-[3px] border-western-terracotta text-western-deep'
                  : 'hover:bg-western-cream/60 text-western-deep'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${filter.color} shrink-0`} />
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 flex-1 overflow-y-auto">
        <button
          onClick={() => setCatExpanded(!catExpanded)}
          className="flex items-center gap-1.5 mb-3"
        >
          {catExpanded ? <ChevronDown size={14} className="text-[#6B5D4E]" /> : <ChevronRight size={14} className="text-[#6B5D4E]" />}
          <h3 className="font-body font-semibold text-[11px] uppercase text-[#6B5D4E] tracking-wider">
            Kategori
          </h3>
        </button>

        {catExpanded && (
          <div className="space-y-1">
            <button
              onClick={() => onCategoryChange('all')}
              className={`w-full text-left px-3 py-2 rounded-md font-body font-medium text-sm transition-all ${
                activeCategory === 'all'
                  ? 'bg-western-cream border-l-[3px] border-western-terracotta text-western-deep'
                  : 'hover:bg-western-cream/60 text-western-deep'
              }`}
            >
              Semua Kategori
            </button>
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => onCategoryChange(cat.label)}
                className={`w-full text-left px-3 py-2 rounded-md font-body font-medium text-sm transition-all ${
                  activeCategory === cat.label
                    ? 'bg-western-cream border-l-[3px] border-western-terracotta text-western-deep'
                    : 'hover:bg-western-cream/60 text-western-deep'
                }`}
              >
                <div>{cat.label}</div>
                <div className="font-mono-data text-xs text-[#6B5D4E] mt-0.5">{cat.description}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
