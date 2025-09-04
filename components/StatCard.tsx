'use client';
import clsx from 'clsx';

export default function StatCard({
  title, value, mom, actionText, onAction
}: {
  title: string;
  value: string;
  mom?: number;
  actionText?: string;
  onAction?: () => void;
}) {
  const positive = (mom ?? 0) >= 0;
  return (
    <div className="card p-5 flex flex-col gap-2">
      <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
      <div className="flex items-end justify-between">
        <div className="text-2xl font-semibold">{value}</div>
        {typeof mom === 'number' && (
          <div className={clsx('px-2 py-1 rounded-lg text-sm font-medium', positive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300')}>
            {positive ? '▲' : '▼'} {Math.abs(mom).toFixed(1)}%
          </div>
        )}
      </div>
      {actionText && onAction && (
        <div>
          <button className="btn btn-primary mt-2" onClick={onAction}>{actionText}</button>
        </div>
      )}
    </div>
  );
}
