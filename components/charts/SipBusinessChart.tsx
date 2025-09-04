'use client';
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function SipBusinessChart({ categories, bar, line }: { categories: string[]; bar: number[]; line: number[]; }) {
  const data = categories.map((c, i) => ({ name: c, bar: bar[i] ?? 0, line: line[i] ?? 0 }));
  return (
    <div className="card p-4 h-[360px]">
      <div className="font-medium mb-2">SIP Business</div>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="bar" />
          <Line type="monotone" dataKey="line" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
