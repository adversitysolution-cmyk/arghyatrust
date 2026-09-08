import { useMemo, useState } from 'react';
import { Download, Calendar, CheckCircle, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';

interface ExportDataPageProps {
  onExportContacts: (startDate: string, endDate: string) => void;
  onExportVolunteers: (startDate: string, endDate: string) => void;
}

export function ExportDataPage({
  onExportContacts,
  onExportVolunteers,
}: ExportDataPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [exportType, setExportType] = useState<'contacts' | 'volunteers' | null>(null);

  const exportCards = useMemo(
    () => [
      {
        key: 'contacts' as const,
        title: 'Export Contact Submissions',
        description:
          'Download all contact form submissions as an Excel file. Includes name, email, phone, message, and submission date.',
        buttonLabel: 'Export Contacts',
      },
      {
        key: 'volunteers' as const,
        title: 'Export Volunteer Registrations',
        description:
          'Download all volunteer registration data as an Excel file. Includes name, age, gender, contact details, and areas of interest.',
        buttonLabel: 'Export Volunteers',
      },
    ],
    [],
  );

  const filteredCards = exportCards.filter(
    (card) =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleExport = (type: 'contacts' | 'volunteers') => {
    if (type === 'contacts') {
      onExportContacts(startDate, endDate);
    } else {
      onExportVolunteers(startDate, endDate);
    }
    setExportType(type);
    setShowConfirmation(true);
    
    // Auto close confirmation after 2 seconds
    setTimeout(() => {
      setShowConfirmation(false);
      setExportType(null);
    }, 2000);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-gray-900 mb-8">Export Data</h3>

        <div className="relative mb-6 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search export options..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Date Range Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#4CAF50]" />
            Date Range Filter
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 rounded-xl"
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Leave dates empty to export all data
          </p>
        </div>

        {/* Export Options */}
        <div className="space-y-4">
          {filteredCards.map((card) => (
            <div
              key={card.key}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h4>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </div>
                <Button
                  onClick={() => handleExport(card.key)}
                  className="bg-[#4CAF50] hover:bg-[#45a049] text-white px-6 py-3 rounded-xl flex items-center gap-2 ml-6"
                >
                  <Download className="w-5 h-5" />
                  {card.buttonLabel}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 rounded-2xl p-6 mt-6">
          <h5 className="font-semibold text-gray-900 mb-2">Export Information</h5>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Exported files are in Excel (.xlsx) format</li>
            <li>• All data fields are included in the export</li>
            <li>• Use date filters to export specific time periods</li>
            <li>• Downloads will start automatically</li>
          </ul>
        </div>
      </div>

      {/* Success Confirmation Modal */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="rounded-2xl max-w-md">
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-[#4CAF50]" />
            </div>
            <DialogTitle className="text-xl font-semibold text-gray-900 mb-2">
              Export Successful!
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {exportType === 'contacts' ? 'Contact submissions' : 'Volunteer registrations'} have
              been exported to Excel format. Your download should start automatically.
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
