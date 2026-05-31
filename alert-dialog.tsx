import { useNavigate } from 'react-router';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative h-[300px] md:h-[360px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Western landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(42,30,18,0.5)] via-[rgba(42,30,18,0.7)] to-[rgba(42,30,18,0.85)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <h1 className="font-display text-4xl md:text-6xl text-[#F0EBE0] uppercase tracking-wide mb-4 leading-tight">
          500+ Slang & Bahasa Cowboy
        </h1>
        <p className="font-body text-base md:text-lg text-[#D4C9A8] mb-6 max-w-xl mx-auto leading-relaxed">
          Kuasai bahasa era Wild West Amerika. Pelajari kata-kata yang dipakai cowboy, penambang, dan penjahat di frontier.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate('/modules')}
            className="bg-western-terracotta hover:bg-[#b34733] text-[#F0EBE0] font-body font-semibold text-sm px-7 py-3 rounded-md transition-colors flex items-center gap-2"
          >
            <BookOpen size={16} />
            Mulai Belajar
          </button>
          <button
            onClick={() => navigate('/quiz')}
            className="border border-[rgba(240,235,224,0.3)] hover:border-[rgba(240,235,224,0.6)] text-[#F0EBE0] font-body font-semibold text-sm px-7 py-3 rounded-md transition-colors flex items-center gap-2"
          >
            <ArrowRight size={16} />
            Tantang Diri
          </button>
        </div>
      </div>
    </section>
  );
}
