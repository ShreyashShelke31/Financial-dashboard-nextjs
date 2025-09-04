'use client';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, CartesianGrid } from 'recharts';

export default function ClientsBubbleChart({ data }: { data: Array<{x:number;y:number;z:number;name:string}> }) {
  return (
    <div className="card p-4 h-[360px]">
      <div className="font-medium mb-2">Clients</div>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="x" name="AUM" />
          <YAxis type="number" dataKey="y" name="Revenue" />
          <ZAxis type="number" dataKey="z" name="Size" range={[60, 400]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={data} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
