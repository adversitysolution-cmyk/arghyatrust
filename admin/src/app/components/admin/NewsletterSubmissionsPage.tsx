import React from 'react';
import { Search, Trash2, Eye, Pencil, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import type { NewsletterSubscriber } from '../../lib/types';

interface NewsletterSubmissionsPageProps {
  newsletters: NewsletterSubscriber[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, payload: Pick<NewsletterSubscriber, 'email' | 'sourcePage'>) => void;
}

export function NewsletterSubmissionsPage({ newsletters, onDelete, onUpdate }: NewsletterSubmissionsPageProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selected, setSelected] = React.useState<NewsletterSubscriber | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editForm, setEditForm] = React.useState({ email: '', sourcePage: 'global' });
  const itemsPerPage = 10;

  const filtered = newsletters.filter(
    (item) =>
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.sourcePage || 'global').toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-8">
      <div className="relative mb-6 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search by email or source..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="pl-10"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Source</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="px-6 py-4 text-sm text-gray-800">{item.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.sourcePage || 'global'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setSelected(item);
                        setIsEditing(false);
                        setEditForm({ email: item.email, sourcePage: item.sourcePage || 'global' });
                      }}
                      className="text-[#4CAF50] hover:bg-[#4CAF50]/10"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDelete(item.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filtered.length === 0 ? 0 : startIndex + 1} to{' '}
          {Math.min(startIndex + itemsPerPage, filtered.length)} of {filtered.length} results
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="rounded-xl"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="rounded-xl"
          >
            Next
          </Button>
        </div>
      </div>

      <Dialog
        open={!!selected}
        onOpenChange={() => {
          setSelected(null);
          setIsEditing(false);
        }}
      >
        <DialogContent className="max-w-xl rounded-2xl">
          <DialogHeader>
            <DialogTitle>Newsletter Subscriber Details</DialogTitle>
          </DialogHeader>
          {selected && (
            <Button
              size="sm"
              onClick={() => {
                if (isEditing) {
                  onUpdate(selected.id, editForm);
                }
                setIsEditing((prev) => !prev);
              }}
              className="absolute right-14 top-4 h-8 w-8 rounded-md border border-green-300 bg-green-50 p-0 text-green-700 hover:bg-green-100"
            >
              {isEditing ? <Save className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
            </Button>
          )}
          {selected && (
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">Email</label>
                {isEditing ? (
                  <Input
                    value={editForm.email}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{selected.email}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Source Page</label>
                {isEditing ? (
                  <Input
                    value={editForm.sourcePage}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, sourcePage: e.target.value }))}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{selected.sourcePage || 'global'}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Date</label>
                <p className="mt-1 text-gray-900">{selected.date}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
