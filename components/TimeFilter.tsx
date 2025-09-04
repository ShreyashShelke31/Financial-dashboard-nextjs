'use client';
import clsx from 'clsx';
import type { RangeKey } from '@/lib/types';

const RANGES: RangeKey[] = ['3d','7d','10d','30d'];

export default function TimeFilter({ value, onChange }: { value: RangeKey; onChange: (r: RangeKey) => void; }) {
  return (
    <div className="flex flex-wrap gap-2">
      {RANGES.map(r => (
        <button key={r}
          onClick={() => onChange(r)}
          className={clsx('px-4 py-2 rounded-xl border text-sm', value === r ? 'bg-primary border-transparent text-black' : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700')}>
          {r.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
