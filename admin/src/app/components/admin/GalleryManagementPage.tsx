import { type FormEvent, useMemo, useState } from 'react';
import { Plus, Trash2, Upload, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface GalleryImage {
  id: string;
  url: string;
  mainImageUrl?: string;
  relatedImages?: string[];
  caption: string;
}

interface GalleryManagementPageProps {
  images: GalleryImage[];
  onAddImage: (payload: { caption: string; mainImage: File; relatedImages: File[] }) => void;
  onDeleteImage: (id: string) => void;
  onUpdateCaption: (id: string, caption: string) => void;
}

export function GalleryManagementPage({
  images,
  onAddImage,
  onDeleteImage,
  onUpdateCaption,
}: GalleryManagementPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [newImageCaption, setNewImageCaption] = useState('');
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [relatedImageFiles, setRelatedImageFiles] = useState<File[]>([]);
  const [editingCaption, setEditingCaption] = useState<{ id: string; caption: string } | null>(
    null
  );

  const handleAddImage = (e: FormEvent) => {
    e.preventDefault();
    if (!mainImageFile || !newImageCaption.trim()) return;
    onAddImage({ caption: newImageCaption.trim(), mainImage: mainImageFile, relatedImages: relatedImageFiles });
    setNewImageCaption('');
    setMainImageFile(null);
    setRelatedImageFiles([]);
    setIsModalOpen(false);
  };

  const handleUpdateCaption = (id: string) => {
    if (editingCaption && editingCaption.id === id) {
      onUpdateCaption(id, editingCaption.caption);
      setEditingCaption(null);
    }
  };

  const filteredImages = useMemo(
    () =>
      images.filter((image) => image.caption.toLowerCase().includes(searchTerm.toLowerCase())),
    [images, searchTerm],
  );

  const totalPages = Math.max(1, Math.ceil(filteredImages.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedImages = filteredImages.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search images by caption..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10"
          />
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#4CAF50] hover:bg-[#45a049] text-white px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Upload New Image
        </Button>
      </div>

      <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100 border-dashed">
        <div className="flex flex-col items-center justify-center text-center">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-16 h-16 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mb-4 hover:bg-[#4CAF50]/20 transition-colors"
            aria-label="Open image upload"
          >
            <Upload className="w-8 h-8 text-[#4CAF50]" />
          </button>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            Drag & Drop Upload Area
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            Drag your images here or click the button above to upload
          </p>
          <p className="text-xs text-gray-500">Supports: JPG, PNG, GIF (Max 5MB)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedImages.map((image) => (
          <div
            key={image.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all"
          >
            <div className="relative aspect-square">
              <img
                src={image.mainImageUrl || image.url}
                alt={image.caption}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => onDeleteImage(image.id)}
                className="absolute top-2 right-2 w-8 h-8 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              {editingCaption?.id === image.id ? (
                <div className="flex gap-2">
                  <Input
                    value={editingCaption.caption}
                    onChange={(e) =>
                      setEditingCaption({ id: image.id, caption: e.target.value })
                    }
                    className="text-sm rounded-lg"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUpdateCaption(image.id);
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    onClick={() => handleUpdateCaption(image.id)}
                    className="bg-[#4CAF50] hover:bg-[#45a049] rounded-lg"
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <div>
                  <p
                    onClick={() => setEditingCaption({ id: image.id, caption: image.caption })}
                    className="text-sm text-gray-600 cursor-pointer hover:text-gray-900"
                  >
                    {image.caption || 'Click to add caption'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Related images: {image.relatedImages?.length || 0}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredImages.length === 0 ? 0 : startIndex + 1} to{' '}
          {Math.min(startIndex + itemsPerPage, filteredImages.length)} of {filteredImages.length} results
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Upload New Image</DialogTitle>
            <DialogDescription>
              Select one main image, add caption, and optionally add related images for this program.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddImage} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="mainImage">Main Image</Label>
              <Input
                id="mainImage"
                type="file"
                accept="image/*"
                onChange={(e) => setMainImageFile(e.target.files?.[0] || null)}
                className="mt-1 rounded-xl"
                required
              />
            </div>

            <div>
              <Label htmlFor="caption">Caption</Label>
              <Input
                id="caption"
                value={newImageCaption}
                onChange={(e) => setNewImageCaption(e.target.value)}
                className="mt-1 rounded-xl"
                placeholder="Enter image caption"
                required
              />
            </div>

            <div>
              <Label htmlFor="relatedImages">More Images (optional)</Label>
              <Input
                id="relatedImages"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setRelatedImageFiles(Array.from(e.target.files || []))}
                className="mt-1 rounded-xl"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-[#4CAF50] hover:bg-[#45a049] text-white rounded-xl"
              >
                Upload Image
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 rounded-xl"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
