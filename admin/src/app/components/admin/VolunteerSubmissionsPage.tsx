import { useMemo, useState } from 'react';
import { Eye, Search, Trash2, Pencil, Save } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import type { VolunteerSubmission } from '../../lib/types';

interface VolunteerSubmissionsPageProps {
  volunteers: VolunteerSubmission[];
  onDeleteVolunteer: (id: string) => void;
  onUpdateVolunteer: (id: string, payload: Omit<VolunteerSubmission, 'id' | 'date'>) => void;
}

export function VolunteerSubmissionsPage({
  volunteers,
  onDeleteVolunteer,
  onUpdateVolunteer,
}: VolunteerSubmissionsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVolunteer, setSelectedVolunteer] = useState<VolunteerSubmission | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Omit<VolunteerSubmission, 'id' | 'date'>>({
    name: '',
    age: undefined,
    gender: '',
    qualification: '',
    cityState: '',
    language: '',
    email: '',
    whatsapp: '',
    interest: '',
    duration: '',
    pledge: false,
  });
  const itemsPerPage = 10;

  const filtered = useMemo(
    () =>
      volunteers.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.whatsapp || '').toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [volunteers, searchTerm],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-8">
      <div className="relative mb-6 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search volunteers by name, email or WhatsApp..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="pl-10"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full table-fixed">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {[
                'Name',
                'Age',
                'Gender',
                'Qualification',
                'City/State',
                'Language',
                'Email',
                'WhatsApp',
                'Interest',
                'Duration',
                'Pledge',
                'Date',
              ].map((header) => (
                <th key={header} className="px-2 py-3 text-left text-xs font-semibold text-gray-700">
                  {header}
                </th>
              ))}
              <th className="px-2 py-3 text-left text-xs font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="px-2 py-3 text-xs break-words">{item.name}</td>
                <td className="px-2 py-3 text-xs break-words">{item.age || ''}</td>
                <td className="px-2 py-3 text-xs capitalize break-words">{item.gender || ''}</td>
                <td className="px-2 py-3 text-xs break-words">{item.qualification || ''}</td>
                <td className="px-2 py-3 text-xs break-words">{item.cityState || ''}</td>
                <td className="px-2 py-3 text-xs break-words">{item.language || ''}</td>
                <td className="px-2 py-3 text-xs break-all">{item.email}</td>
                <td className="px-2 py-3 text-xs break-words">{item.whatsapp || ''}</td>
                <td className="px-2 py-3 text-xs break-words">{item.interest || ''}</td>
                <td className="px-2 py-3 text-xs break-words">{item.duration || ''}</td>
                <td className="px-2 py-3 text-xs break-words">{item.pledge ? 'Yes' : 'No'}</td>
                <td className="px-2 py-3 text-xs break-words">{item.date}</td>
                <td className="px-2 py-3">
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setSelectedVolunteer(item);
                        setIsEditing(false);
                        setEditForm({
                          name: item.name,
                          age: item.age,
                          gender: item.gender || '',
                          qualification: item.qualification || '',
                          cityState: item.cityState || '',
                          language: item.language || '',
                          email: item.email,
                          whatsapp: item.whatsapp || '',
                          interest: item.interest || '',
                          duration: item.duration || '',
                          pledge: Boolean(item.pledge),
                        });
                      }}
                      className="text-[#4CAF50] hover:bg-[#4CAF50]/10"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDeleteVolunteer(item.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
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
        open={!!selectedVolunteer}
        onOpenChange={() => {
          setSelectedVolunteer(null);
          setIsEditing(false);
        }}
      >
        <DialogContent className="max-w-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle>Volunteer Submission Details</DialogTitle>
          </DialogHeader>
          {selectedVolunteer && (
            <Button
              size="sm"
              onClick={() => {
                if (isEditing) {
                  onUpdateVolunteer(selectedVolunteer.id, editForm);
                }
                setIsEditing((prev) => !prev);
              }}
              className="absolute right-14 top-4 h-8 w-8 rounded-md border border-green-300 bg-green-50 p-0 text-green-700 hover:bg-green-100"
            >
              {isEditing ? <Save className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
            </Button>
          )}
          {selectedVolunteer && (
            <div className="mt-4 grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
              <div>
                <span className="font-semibold text-gray-700">Name:</span>{' '}
                {isEditing ? (
                  <Input value={editForm.name} onChange={(e) => setEditForm((p) => ({ ...p, name: e.target.value }))} className="mt-1" />
                ) : selectedVolunteer.name}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Email:</span>{' '}
                {isEditing ? (
                  <Input value={editForm.email} onChange={(e) => setEditForm((p) => ({ ...p, email: e.target.value }))} className="mt-1" />
                ) : selectedVolunteer.email}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Age:</span>{' '}
                {isEditing ? (
                  <Input
                    type="number"
                    value={editForm.age ?? ''}
                    onChange={(e) => setEditForm((p) => ({ ...p, age: e.target.value ? Number(e.target.value) : undefined }))}
                    className="mt-1"
                  />
                ) : (selectedVolunteer.age || '-')}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Gender:</span>{' '}
                {isEditing ? (
                  <Input value={editForm.gender || ''} onChange={(e) => setEditForm((p) => ({ ...p, gender: e.target.value }))} className="mt-1" />
                ) : (selectedVolunteer.gender || '-')}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Qualification:</span>{' '}
                {isEditing ? (
                  <Input value={editForm.qualification || ''} onChange={(e) => setEditForm((p) => ({ ...p, qualification: e.target.value }))} className="mt-1" />
                ) : (selectedVolunteer.qualification || '-')}
              </div>
              <div>
                <span className="font-semibold text-gray-700">City/State:</span>{' '}
                {isEditing ? (
                  <Input value={editForm.cityState || ''} onChange={(e) => setEditForm((p) => ({ ...p, cityState: e.target.value }))} className="mt-1" />
                ) : (selectedVolunteer.cityState || '-')}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Language:</span>{' '}
                {isEditing ? (
                  <Input value={editForm.language || ''} onChange={(e) => setEditForm((p) => ({ ...p, language: e.target.value }))} className="mt-1" />
                ) : (selectedVolunteer.language || '-')}
              </div>
              <div>
                <span className="font-semibold text-gray-700">WhatsApp:</span>{' '}
                {isEditing ? (
                  <Input value={editForm.whatsapp || ''} onChange={(e) => setEditForm((p) => ({ ...p, whatsapp: e.target.value }))} className="mt-1" />
                ) : (selectedVolunteer.whatsapp || '-')}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Interest:</span>{' '}
                {isEditing ? (
                  <Input value={editForm.interest || ''} onChange={(e) => setEditForm((p) => ({ ...p, interest: e.target.value }))} className="mt-1" />
                ) : (selectedVolunteer.interest || '-')}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Duration:</span>{' '}
                {isEditing ? (
                  <Input value={editForm.duration || ''} onChange={(e) => setEditForm((p) => ({ ...p, duration: e.target.value }))} className="mt-1" />
                ) : (selectedVolunteer.duration || '-')}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Pledge:</span>{' '}
                {isEditing ? (
                  <select
                    value={editForm.pledge ? 'yes' : 'no'}
                    onChange={(e) => setEditForm((p) => ({ ...p, pledge: e.target.value === 'yes' }))}
                    className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                ) : (selectedVolunteer.pledge ? 'Yes' : 'No')}
              </div>
              <div><span className="font-semibold text-gray-700">Date:</span> {selectedVolunteer.date}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
