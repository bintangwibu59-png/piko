import { Link, useLocation } from 'react-router';
import { BookOpen, Layers, Heart, BarChart3, HelpCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/', label: 'Kamus', icon: BookOpen },
  { path: '/modules', label: 'Modul', icon: Layers },
  { path: '/quiz', label: 'Quiz', icon: HelpCircle },
  { path: '/favorites', label: 'Favorit', icon: Heart },
  { path: '/progress', label: 'Progres', icon: BarChart3 },
];

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-western-brown border-b border-[rgba(240,235,224,0.12)] z-40">
      <div className="max-w-[1400px] mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-0 shrink-0">
          <span className="font-display text-2xl text-western-terracotta tracking-wide">COWBOY</span>
          <span className="font-serif-display text-2xl text-[#F0EBE0] tracking-wide">HOLIC</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-body font-semibold transition-colors ${
                  isActive
                    ? 'text-western-terracotta'
                    : 'text-[#F0EBE0] hover:text-western-terracotta'
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[#F0EBE0] p-2"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-western-brown border-t border-[rgba(240,235,224,0.12)] absolute top-14 left-0 right-0">
          <nav className="flex flex-col p-2">
            {navItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-body font-semibold transition-colors ${
                    isActive
                      ? 'text-western-terracotta bg-[rgba(197,80,59,0.1)]'
                      : 'text-[#F0EBE0] hover:bg-[rgba(240,235,224,0.05)]'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
