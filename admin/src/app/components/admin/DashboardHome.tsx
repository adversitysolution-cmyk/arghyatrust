import React from 'react';
import { Calendar, Eye, Image, Mail, Trash2, Users } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { Button } from '../ui/button';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  status: 'Upcoming' | 'Completed';
}

interface DashboardHomeProps {
  stats: {
    contacts: number;
    volunteers: number;
    newsletters: number;
    events: number;
    galleryImages: number;
  };
  recentContacts: ContactSubmission[];
  recentEvents: Event[];
  onViewContact: () => void;
  onDeleteContact: (id: string) => void;
}

export function DashboardHome({
  stats,
  recentContacts,
  recentEvents,
  onViewContact,
  onDeleteContact,
}: DashboardHomeProps) {
  const totalLeads = stats.contacts + stats.volunteers + stats.newsletters;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#d2e1d7] bg-gradient-to-r from-[#1f5b34] to-[#2f7d46] p-6 text-white shadow-md md:p-8">
        <p className="text-xs uppercase tracking-[0.15em] text-white/75">Daily Overview</p>
        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-3xl font-semibold">Welcome to your admin dashboard</h3>
            <p className="mt-2 max-w-2xl text-sm text-white/90">
              Track new submissions, review current events, and keep trust content updated from one place.
            </p>
          </div>
          <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm backdrop-blur-sm">
            <p className="text-white/70">Total incoming records</p>
            <p className="text-2xl font-semibold">{totalLeads.toLocaleString()}</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatsCard
          icon={Mail}
          title="Contact Submissions"
          count={stats.contacts}
          color="#2f7d46"
        />
        <StatsCard
          icon={Users}
          title="Volunteer Forms"
          count={stats.volunteers}
          color="#1f6b9c"
        />
        <StatsCard
          icon={Mail}
          title="Newsletter Subscribers"
          count={stats.newsletters}
          color="#6f4db6"
        />
        <StatsCard
          icon={Calendar}
          title="Events"
          count={stats.events}
          color="#bd7d1a"
        />
        <StatsCard
          icon={Image}
          title="Gallery Images"
          count={stats.galleryImages}
          color="#8a3c7b"
        />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-[#d5e2d9] bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#1d3b2c]">Recent Contact Submissions</h3>
            <Button
              size="sm"
              variant="outline"
              onClick={onViewContact}
              className="border-[#c6d8cd] text-[#2f7d46] hover:bg-[#eef7f1]"
            >
              View all
            </Button>
          </div>
          {recentContacts.length === 0 ? (
            <p className="rounded-xl bg-[#f3f7f4] px-4 py-6 text-sm text-[#5d7a6b]">No recent contacts yet.</p>
          ) : (
            <div className="space-y-3">
              {recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[#e4ede8] bg-[#fbfdfb] p-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-[#1d3b2c]">{contact.name}</p>
                    <p className="truncate text-sm text-[#567364]">{contact.email}</p>
                    <p className="mt-1 text-xs text-[#7b9789]">{contact.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={onViewContact}
                      className="text-[#2f7d46] hover:bg-[#dff0e5]"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDeleteContact(contact.id)}
                      className="text-[#b73838] hover:bg-[#faecec]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-[#d5e2d9] bg-white p-6 shadow-sm">
          <h3 className="mb-5 text-lg font-semibold text-[#1d3b2c]">Recent Events</h3>
          {recentEvents.length === 0 ? (
            <p className="rounded-xl bg-[#f3f7f4] px-4 py-6 text-sm text-[#5d7a6b]">No event records yet.</p>
          ) : (
            <div className="space-y-3">
              {recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between rounded-xl border border-[#e4ede8] bg-[#fbfdfb] p-4"
                >
                  <div>
                    <p className="font-medium text-[#1d3b2c]">{event.title}</p>
                    <p className="text-sm text-[#567364]">{event.date}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      event.status === 'Upcoming'
                        ? 'bg-[#dff0e5] text-[#25633a]'
                        : 'bg-[#e9edef] text-[#5d6871]'
                    }`}
                  >
                    {event.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
