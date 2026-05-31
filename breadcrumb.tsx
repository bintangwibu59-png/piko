import { useEffect, useState } from 'react';
import { Check, BookOpen, RotateCcw } from 'lucide-react';

interface ToastProps {
  message: string;
  status: 'mastered' | 'learning' | 'new';
  visible: boolean;
  onClose: () => void;
}

export default function Toast({ message, status, visible, onClose }: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible && !show) return null;

  const statusConfig = {
    mastered: { bg: 'bg-[#7D8B6A]', icon: Check, label: 'Dikuasai' },
    learning: { bg: 'bg-[#8B3D2B]', icon: BookOpen, label: 'Belajar' },
    new: { bg: 'bg-[#A66A0D]', icon: RotateCcw, label: 'Baru' },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className={`${config.bg} text-[#F0EBE0] px-5 py-3 rounded-lg shadow-lg flex items-center gap-3`}>
        <Icon size={18} />
        <span className="font-body font-medium text-sm">{message}</span>
      </div>
    </div>
  );
}
