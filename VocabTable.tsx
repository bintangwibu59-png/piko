export default function Footer() {
  return (
    <footer className="bg-western-brown border-t border-[rgba(240,235,224,0.08)]">
      <div className="max-w-[1400px] mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg text-western-terracotta">COWBOY</span>
          <span className="font-serif-display text-lg text-[#F0EBE0]">HOLIC</span>
          <span className="text-[#6B5D4E] text-sm font-body ml-2">&copy; 2025</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[#6B5D4E] text-sm font-body hover:text-[#F0EBE0] cursor-pointer transition-colors">Tentang</span>
          <span className="text-[#6B5D4E] text-sm font-body hover:text-[#F0EBE0] cursor-pointer transition-colors">Kontak</span>
          <span className="text-[#6B5D4E] text-sm font-body hover:text-[#F0EBE0] cursor-pointer transition-colors">Kebijakan Privasi</span>
        </div>
      </div>
    </footer>
  );
}
