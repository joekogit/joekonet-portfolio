import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="p-2 rounded text-gray-400 hover:text-[#6BA3D0] dark:text-gray-500 dark:hover:text-[#9BC4E2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6BA3D0] focus:ring-offset-2 dark:focus:ring-offset-[#111111]"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
