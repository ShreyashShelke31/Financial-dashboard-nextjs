'use client';
import { useEffect, useRef, useState } from 'react';
import StatCard from '@/components/StatCard';
import TimeFilter from '@/components/TimeFilter';
import ClientsBubbleChart from '@/components/charts/ClientsBubbleChart';
import SipBusinessChart from '@/components/charts/SipBusinessChart';
import MonthlyMISChart from '@/components/charts/MonthlyMISChart';
import type { DashboardData, RangeKey } from '@/lib/types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Capacitor } from '@capacitor/core';

export default function DashboardPage() {
  const [range, setRange] = useState<RangeKey>('7d');
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const pdfRef = useRef<HTMLDivElement | null>(null);

  async function load(r: RangeKey) {
    setLoading(true);
    try {
      const res = await fetch(`/mock/dashboard-${r}.json`, { cache: 'no-store' });
      const json: DashboardData = await res.json();
      setData(json);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(range); }, [range]);

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

  async function downloadPDF() {
    if (!pdfRef.current) return;
    const node = pdfRef.current;
    const canvas = await html2canvas(node, { scale: 2, backgroundColor: null });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    // Fit image into A4 size while maintaining aspect
    const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
    const w = canvas.width * ratio;
    const h = canvas.height * ratio;
    const x = (pageWidth - w) / 2;
    const y = 10;
    pdf.addImage(imgData, 'PNG', x, y, w, h, '', 'FAST');

    if (Capacitor.isNativePlatform()) {
      const base64 = pdf.output('datauristring').split(',')[1];
      const { Filesystem } = await import('@capacitor/filesystem');
      const fileName = `financial-dashboard-${range}.pdf`;
      await Filesystem.writeFile({
        path: fileName,
        data: base64,
        directory: Filesystem.Directory.Documents,
      });
      alert(`Saved to Documents/${fileName}`);
    } else {
      pdf.save(`financial-dashboard-${range}.pdf`);
    }
  }

  return (
    <div className="space-y-6" ref={pdfRef} id="dashboard-pdf">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="text-2xl font-semibold">Financial Dashboard</div>
        <div className="flex items-center gap-2">
          <TimeFilter value={range} onChange={setRange} />
          <button onClick={downloadPDF} className="btn btn-primary">Download PDF</button>
        </div>
      </div>

      {loading && (
        <div className="text-sm text-gray-500">Loading data…</div>
      )}

      {data && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatCard
              title="AUM"
              value={formatCurrency(data.cards.aum.value)}
              mom={data.cards.aum.mom}
              actionText="View Report"
              onAction={() => alert('Open AUM Report')}
            />
            <StatCard
              title="SIP"
              value={formatCurrency(data.cards.sip.value)}
              mom={data.cards.sip.mom}
              actionText="View Report"
              onAction={() => alert('Open SIP Report')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-1">
              <StatCard title="Purchases" value={String(data.stats.purchases)} />
            </div>
            <div className="md:col-span-1">
              <StatCard title="Redemptions" value={String(data.stats.redemptions)} />
            </div>
            <div className="md:col-span-1">
              <StatCard title="Rejected Transactions" value={String(data.stats.rejected)} />
            </div>
            <div className="md:col-span-1">
              <StatCard title="SIP Rejections" value={String(data.stats.sipRejections)} />
            </div>
            <div className="md:col-span-1">
              <StatCard title="New SIP" value={String(data.stats.newSip)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ClientsBubbleChart data={data.clients} />
            <SipBusinessChart categories={data.sipBusiness.categories} bar={data.sipBusiness.bar} line={data.sipBusiness.line} />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <MonthlyMISChart months={data.monthlyMIS.months} equity={data.monthlyMIS.equity} debt={data.monthlyMIS.debt} hybrid={data.monthlyMIS.hybrid} />
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400">
            Updated at: {new Date(data.updatedAt).toLocaleString()}
          </div>
        </>
      )}
    </div>
  );
}
