import { BookOpen, Target, Zap, Users } from 'lucide-react';

interface StatsProps {
  masteredCount: number;
  learningCount: number;
  totalCount: number;
}

export default function Stats({ masteredCount, learningCount, totalCount }: StatsProps) {
  const stats = [
    { label: 'Total Kata', value: totalCount, icon: BookOpen, color: 'text-western-brown' },
    { label: 'Dikuasai', value: masteredCount, icon: Target, color: 'text-[#7D8B6A]' },
    { label: 'Sedang Belajar', value: learningCount, icon: Zap, color: 'text-[#8B3D2B]' },
    { label: 'Kategori', value: 10, icon: Users, color: 'text-western-terracotta' },
  ];

  return (
    <div className="bg-western-cream border-b border-[rgba(42,30,18,0.08)]">
      <div className="max-w-[1400px] mx-auto px-4 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 bg-western-beige/40 rounded-lg px-4 py-3 border border-[rgba(42,30,18,0.06)]"
            >
              <div className={`${stat.color} shrink-0`}>
                <stat.icon size={22} />
              </div>
              <div>
                <div className="font-mono-data text-xl font-medium text-western-deep leading-none">
                  {stat.value}
                </div>
                <div className="font-body text-xs text-[#6B5D4E] mt-1">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
