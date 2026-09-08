import React from 'react';
import { CalendarDays, RefreshCw, ShieldCheck, User } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  adminName?: string;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export function AdminHeader({
  title,
  adminName = 'Admin User',
  onRefresh,
  isRefreshing = false,
}: AdminHeaderProps) {
  const now = new Date();
  const dateLabel = now.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <header className="sticky top-0 z-20 border-b border-[#d7e4db] bg-[#eef4ef]/90 px-4 py-4 backdrop-blur md:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#4d745e]">Arghya Trust Admin</p>
          <h2 className="mt-1 text-2xl font-semibold text-[#183726]">{title}</h2>
          <div className="mt-1 flex items-center gap-2 text-sm text-[#527565]">
            <CalendarDays className="h-4 w-4" />
            <span>{dateLabel}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#c8d9ce] bg-white px-4 text-sm font-medium text-[#2f5e45] transition hover:bg-[#f3f9f5]"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <div className="flex items-center gap-3 rounded-xl border border-[#c8d9ce] bg-white px-3 py-2 shadow-sm">
            <div className="text-right">
              <p className="text-sm font-semibold text-[#193828]">{adminName}</p>
              <p className="text-xs text-[#628473]">Administrator</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2f7d46] text-white">
              <User className="h-5 w-5" />
            </div>
            <ShieldCheck className="h-4 w-4 text-[#2f7d46]" />
          </div>
        </div>
      </div>
    </header>
  );
}
