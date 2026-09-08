import React from 'react';
import {
  Calendar,
  Download,
  Image,
  LayoutDashboard,
  LogOut,
  Mail,
  NotebookPen,
  Users,
} from 'lucide-react';
import logoImage from '../../../assets/LOGO.png';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export function AdminSidebar({ activeTab, onTabChange, onLogout }: AdminSidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'contacts', icon: Mail, label: 'Contacts' },
    { id: 'volunteers', icon: Users, label: 'Volunteers' },
    { id: 'newsletters', icon: Mail, label: 'Newsletters' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'blogs', icon: NotebookPen, label: 'Blog Review' },
    { id: 'gallery', icon: Image, label: 'Gallery' },
    { id: 'export', icon: Download, label: 'Export Data' },
  ];

  return (
    <aside className="hidden w-72 shrink-0 border-r border-[#d7e4db] bg-white/95 px-4 py-5 backdrop-blur md:flex md:flex-col">
      <div className="h-32 overflow-hidden rounded-2xl border border-[#d8e6dd] bg-[#f4faf6]">
        <img src={logoImage} alt="Arghya Trust logo" className="h-full w-full object-contain" />
      </div>

      <nav className="mt-5 flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-[#2f7d46] text-white shadow-[0_8px_20px_rgba(47,125,70,0.28)]'
                      : 'text-[#2b5240] hover:bg-[#eef5f0]'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        onClick={onLogout}
        className="mt-4 flex w-full items-center gap-3 rounded-xl border border-[#e7d3d3] bg-[#fff7f7] px-4 py-3 text-sm font-medium text-[#b43838] transition hover:bg-[#ffecec]"
      >
        <LogOut className="h-5 w-5" />
        <span>Logout</span>
      </button>
    </aside>
  );
}
