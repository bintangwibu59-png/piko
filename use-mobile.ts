import { modules } from '../data/vocabulary';
import ModuleCard from '../components/ModuleCard';
import { Layers } from 'lucide-react';

export default function Modules() {
  return (
    <div className="min-h-screen bg-western-cream">
      {/* Header */}
      <div className="bg-western-brown py-10 px-4">
        <div className="max-w-[1200px] mx-auto text-center">
          <Layers className="mx-auto mb-3 text-western-terracotta" size={32} />
          <h1 className="font-display text-3xl md:text-4xl text-[#F0EBE0] uppercase tracking-wide">
            Modul Pembelajaran
          </h1>
          <p className="font-body text-[#D4C9A8] mt-3 max-w-lg mx-auto">
            Pilih modul yang sesuai dengan minatmu. Setiap modul mencakup kosa kata spesifik dengan contoh penggunaan.
          </p>
        </div>
      </div>

      {/* Module Grid */}
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((mod) => (
            <ModuleCard
              key={mod.id}
              id={mod.id}
              title={mod.title}
              description={mod.description}
              lessonCount={mod.lessonCount}
              wordCount={mod.wordCount}
              image={mod.image}
              category={mod.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
