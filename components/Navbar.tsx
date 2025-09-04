'use client';
import ThemeToggle from './ThemeToggle';

const items = ['CRM','Utilities','Insurance','Assets','Mutual','Research','Transact Online','Goal GPS','Financial Planning','Wealth Report','Other'];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-gray-200 dark:border-slate-800">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center font-bold">₹</div>
          <div className="text-xl font-semibold">FinDash</div>
        </div>
        <ul className="hidden md:flex items-center gap-4 text-sm">
          {items.map((item) => (
            <li key={item} className="px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer">{item}</li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
