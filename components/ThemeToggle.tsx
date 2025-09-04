'use client';
import { useTheme } from '@/lib/theme';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button className="btn" onClick={toggle} aria-label="Toggle dark mode" title="Toggle dark mode">
      <span className="text-sm font-medium">{theme === 'dark' ? 'Dark' : 'Light'}</span>
      <span className="inline-block w-2 h-2 rounded-full bg-primary" />
    </button>
  );
}
