import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  count: number;
  color: string;
}

export function StatsCard({ icon: Icon, title, count, color }: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-[#d7e3db] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-sm text-[#5c7769]">{title}</p>
          <h3 className="text-3xl font-semibold text-[#1d3a2b]">{count.toLocaleString()}</h3>
        </div>
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="h-6 w-6" style={{ color }} />
        </div>
      </div>
    </div>
  );
}
