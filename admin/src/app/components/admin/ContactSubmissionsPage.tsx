import { useState } from 'react';
import { Search, Download, Eye, Trash2, Pencil, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}

interface ContactSubmissionsPageProps {
  contacts: ContactSubmission[];
  onDeleteContact: (id: string) => void;
  onUpdateContact: (
    id: string,
    payload: Pick<ContactSubmission, 'name' | 'email' | 'phone' | 'message'>,
  ) => void;
  onExportToExcel: () => void;
}

export function ContactSubmissionsPage({
  contacts,
  onDeleteContact,
  onUpdateContact,
  onExportToExcel,
}: ContactSubmissionsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContacts = filteredContacts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-8">
      {/* Header with Search and Export */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 rounded-xl border border-gray-200"
          />
        </div>
        
        <Button
          onClick={onExportToExcel}
          className="bg-[#4CAF50] hover:bg-[#45a049] text-white px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export to Excel
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Message</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedContacts.map((contact) => (
              <tr
                key={contact.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-900">{contact.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{contact.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{contact.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {contact.message.substring(0, 30)}...
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{contact.date}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setSelectedContact(contact);
                        setIsEditing(false);
                        setEditForm({
                          name: contact.name,
                          email: contact.email,
                          phone: contact.phone,
                          message: contact.message,
                        });
                      }}
                      className="text-[#4CAF50] hover:bg-[#4CAF50]/10"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDeleteContact(contact.id)}
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

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredContacts.length)} of {filteredContacts.length} results
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

      {/* View Modal */}
      <Dialog
        open={!!selectedContact}
        onOpenChange={() => {
          setSelectedContact(null);
          setIsEditing(false);
        }}
      >
        <DialogContent className="rounded-2xl max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Submission Details</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <Button
              size="sm"
              onClick={() => {
                if (isEditing) {
                  onUpdateContact(selectedContact.id, editForm);
                }
                setIsEditing((prev) => !prev);
              }}
              className="absolute right-14 top-4 h-8 w-8 rounded-md border border-green-300 bg-green-50 p-0 text-green-700 hover:bg-green-100"
            >
              {isEditing ? <Save className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
            </Button>
          )}
          {selectedContact && (
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">Name</label>
                {isEditing ? (
                  <Input
                    value={editForm.name}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-gray-900 mt-1">{selectedContact.name}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Email</label>
                {isEditing ? (
                  <Input
                    value={editForm.email}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-gray-900 mt-1">{selectedContact.email}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Phone</label>
                {isEditing ? (
                  <Input
                    value={editForm.phone}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, phone: e.target.value }))}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-gray-900 mt-1">{selectedContact.phone}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Date</label>
                <p className="text-gray-900 mt-1">{selectedContact.date}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Message</label>
                {isEditing ? (
                  <textarea
                    value={editForm.message}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, message: e.target.value }))}
                    className="mt-1 min-h-[120px] w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm"
                  />
                ) : (
                  <p className="text-gray-900 mt-1 bg-gray-50 p-4 rounded-xl">
                    {selectedContact.message}
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
