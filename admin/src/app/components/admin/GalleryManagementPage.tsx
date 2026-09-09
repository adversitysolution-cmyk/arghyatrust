import { type FormEvent, useMemo, useState } from 'react';
import { Plus, Trash2, Upload, Search, Edit3, Eye, Image as ImageIcon, X } from 'lucide-react';
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
  sortOrder?: number;
}

interface GalleryManagementPageProps {
  images: GalleryImage[];
  onAddImage: (payload: { caption: string; mainImage: File; relatedImages: File[] }) => void;
  onDeleteImage: (id: string) => void;
  onUpdateCaption: (id: string, caption: string) => void;
  onUpdateAlbum?: (
    id: string,
    payload: {
      caption?: string;
      mainImage?: File;
      relatedImages?: File[];
      existingRelatedImages?: string[];
    },
  ) => Promise<unknown>;
}

export function GalleryManagementPage({
  images,
  onAddImage,
  onDeleteImage,
  onUpdateCaption,
  onUpdateAlbum,
}: GalleryManagementPageProps) {
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPreviewImage, setSelectedPreviewImage] = useState<GalleryImage | null>(null);
  const [activeLightboxSrc, setActiveLightboxSrc] = useState<string | null>(null);

  // Search & Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Add Album State
  const [newImageCaption, setNewImageCaption] = useState('');
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [relatedImageFiles, setRelatedImageFiles] = useState<File[]>([]);

  // Edit Album State
  const [editingAlbum, setEditingAlbum] = useState<GalleryImage | null>(null);
  const [editCaption, setEditCaption] = useState('');
  const [editCoverFile, setEditCoverFile] = useState<File | null>(null);
  const [editNewRelatedFiles, setEditNewRelatedFiles] = useState<File[]>([]);
  const [editExistingRelated, setEditExistingRelated] = useState<string[]>([]);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Inline Quick Caption Edit
  const [editingCaption, setEditingCaption] = useState<{ id: string; caption: string } | null>(null);

  const handleAddImage = (e: FormEvent) => {
    e.preventDefault();
    if (!mainImageFile || !newImageCaption.trim()) return;
    onAddImage({
      caption: newImageCaption.trim(),
      mainImage: mainImageFile,
      relatedImages: relatedImageFiles,
    });
    setNewImageCaption('');
    setMainImageFile(null);
    setRelatedImageFiles([]);
    setIsAddModalOpen(false);
  };

  const openEditModal = (album: GalleryImage) => {
    setEditingAlbum(album);
    setEditCaption(album.caption);
    setEditCoverFile(null);
    setEditNewRelatedFiles([]);
    setEditExistingRelated(album.relatedImages || []);
    setIsEditModalOpen(true);
  };

  const handleRemoveExistingPhoto = (indexToRemove: number) => {
    setEditExistingRelated((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSaveAlbumEdit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingAlbum || !editCaption.trim()) return;

    if (onUpdateAlbum) {
      try {
        setIsSavingEdit(true);
        await onUpdateAlbum(editingAlbum.id, {
          caption: editCaption.trim(),
          mainImage: editCoverFile || undefined,
          relatedImages: editNewRelatedFiles,
          existingRelatedImages: editExistingRelated,
        });
        setIsEditModalOpen(false);
        setEditingAlbum(null);
      } catch (_err) {
        // error handled in parent toast
      } finally {
        setIsSavingEdit(false);
      }
    } else {
      // Fallback
      onUpdateCaption(editingAlbum.id, editCaption.trim());
      setIsEditModalOpen(false);
      setEditingAlbum(null);
    }
  };

  const handleUpdateCaption = (id: string) => {
    if (editingCaption && editingCaption.id === id) {
      onUpdateCaption(id, editingCaption.caption);
      setEditingCaption(null);
    }
  };

  const filteredImages = useMemo(
    () =>
      images.filter((image) =>
        image.caption.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [images, searchTerm],
  );

  const totalPages = Math.max(1, Math.ceil(filteredImages.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedImages = filteredImages.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search albums by title..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 rounded-xl"
          />
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#4CAF50] hover:bg-[#45a049] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-sm whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          Create New Album
        </Button>
      </div>

      {/* Upload Drag & Drop Banner */}
      <div
        onClick={() => setIsAddModalOpen(true)}
        className="bg-white rounded-2xl p-6 sm:p-8 mb-6 shadow-sm border border-gray-200 border-dashed cursor-pointer hover:border-[#4CAF50] hover:bg-[#4CAF50]/5 transition-all text-center"
      >
        <div className="w-14 h-14 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <Upload className="w-7 h-7 text-[#4CAF50]" />
        </div>
        <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
          Add New Program / Album
        </h4>
        <p className="text-xs sm:text-sm text-gray-500 mb-2">
          Click here to create a new gallery album with cover photo & multiple photos
        </p>
        <span className="inline-block text-xs font-medium text-[#4CAF50] bg-[#4CAF50]/10 px-3 py-1 rounded-full">
          Supports JPG, PNG, WEBP
        </span>
      </div>

      {/* Album Cards Grid */}
      {paginatedImages.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center text-gray-500 shadow-sm border border-gray-100">
          <ImageIcon className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="text-base font-medium text-gray-700">No gallery albums found</p>
          <p className="text-sm text-gray-400 mt-1">Click "Create New Album" above to upload your first gallery photos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedImages.map((image) => {
            const totalCount = 1 + (image.relatedImages?.length || 0);
            return (
              <div
                key={image.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Cover Image & Overlay */}
                <div
                  className="relative aspect-[4/3] cursor-pointer overflow-hidden group/img bg-gray-50"
                  onClick={() => setSelectedPreviewImage(image)}
                  title="Click to view album photos"
                >
                  <img
                    src={image.mainImageUrl || image.url}
                    alt={image.caption}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1">
                    <Eye className="w-4 h-4" />
                    View Album ({totalCount} photos)
                  </div>

                  {/* Top Badge */}
                  <span className="absolute top-2 left-2 bg-black/60 text-white text-[11px] font-medium px-2 py-0.5 rounded-md backdrop-blur-sm">
                    {totalCount} {totalCount === 1 ? 'photo' : 'photos'}
                  </span>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`Are you sure you want to delete the album "${image.caption}"?`)) {
                        onDeleteImage(image.id);
                      }
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-600/90 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-700 z-10 shadow-sm"
                    title="Delete entire album"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Card Details & Actions */}
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
                      <h4
                        onClick={() => setEditingCaption({ id: image.id, caption: image.caption })}
                        className="text-sm font-semibold text-gray-900 cursor-pointer hover:text-[#4CAF50] transition-colors line-clamp-1"
                        title="Click to rename"
                      >
                        {image.caption || 'Untitled Album'}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Related: <b>{image.relatedImages?.length || 0}</b> additional photos
                      </p>
                    </div>
                  )}

                  {/* Quick Action Buttons */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => openEditModal(image)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#4CAF50] transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit Album / Add Photos
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPreviewImage(image)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#4CAF50] hover:underline"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs sm:text-sm text-gray-600">
          Showing {filteredImages.length === 0 ? 0 : startIndex + 1} to{' '}
          {Math.min(startIndex + itemsPerPage, filteredImages.length)} of {filteredImages.length} albums
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="rounded-xl text-xs"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="rounded-xl text-xs"
          >
            Next
          </Button>
        </div>
      </div>

      {/* 1. CREATE NEW ALBUM MODAL */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="rounded-2xl max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Gallery Album</DialogTitle>
            <DialogDescription>
              Set the album title, upload the primary cover photo, and optionally attach additional photos.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddImage} className="space-y-4 mt-3">
            <div>
              <Label htmlFor="add-caption">Album Title / Caption *</Label>
              <Input
                id="add-caption"
                value={newImageCaption}
                onChange={(e) => setNewImageCaption(e.target.value)}
                className="mt-1 rounded-xl"
                placeholder="e.g. Swachha Biligiri Campaign 2026"
                required
              />
            </div>

            <div>
              <Label htmlFor="add-mainImage">Main Cover Photo *</Label>
              <Input
                id="add-mainImage"
                type="file"
                accept="image/*"
                onChange={(e) => setMainImageFile(e.target.files?.[0] || null)}
                className="mt-1 rounded-xl"
                required
              />
              <p className="text-[11px] text-gray-500 mt-1">This photo will appear as the thumbnail on the public gallery.</p>
            </div>

            <div>
              <Label htmlFor="add-relatedImages">Additional Album Photos (optional)</Label>
              <Input
                id="add-relatedImages"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setRelatedImageFiles(Array.from(e.target.files || []))}
                className="mt-1 rounded-xl"
              />
              <p className="text-[11px] text-gray-500 mt-1">Select multiple images at once to include inside this album.</p>
            </div>

            <div className="flex gap-3 pt-3">
              <Button
                type="submit"
                className="flex-1 bg-[#4CAF50] hover:bg-[#45a049] text-white rounded-xl"
              >
                Create Album
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddModalOpen(false)}
                className="flex-1 rounded-xl"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* 2. EDIT ALBUM MODAL (Edit title, replace cover, delete individual photos, upload new photos) */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="rounded-2xl max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Album: {editingAlbum?.caption}</DialogTitle>
            <DialogDescription>
              Update album title, replace the cover photo, remove specific photos, or insert new images.
            </DialogDescription>
          </DialogHeader>

          {editingAlbum ? (
            <form onSubmit={handleSaveAlbumEdit} className="space-y-5 mt-2">
              {/* Title */}
              <div>
                <Label htmlFor="edit-caption">Album Title / Caption *</Label>
                <Input
                  id="edit-caption"
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                  className="mt-1 rounded-xl"
                  required
                />
              </div>

              {/* Cover Photo */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <Label className="block mb-2 font-semibold text-gray-800">Cover Photo</Label>
                <div className="flex items-center gap-4">
                  <img
                    src={editingAlbum.mainImageUrl || editingAlbum.url}
                    alt="Current cover"
                    className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                  />
                  <div className="flex-1">
                    <Label htmlFor="edit-cover" className="text-xs text-gray-600 block mb-1">
                      Upload new photo to replace current cover (optional):
                    </Label>
                    <Input
                      id="edit-cover"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setEditCoverFile(e.target.files?.[0] || null)}
                      className="rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Current Related Photos (With individual delete) */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <Label className="font-semibold text-gray-800">
                    Current Photos in Album ({editExistingRelated.length})
                  </Label>
                  <span className="text-[11px] text-gray-500">Click ✕ to delete a photo</span>
                </div>

                {editExistingRelated.length === 0 ? (
                  <p className="text-xs text-gray-400 italic py-2">No additional photos attached to this album.</p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-48 overflow-y-auto p-1">
                    {editExistingRelated.map((imgUrl, idx) => (
                      <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group bg-white">
                        <img src={imgUrl} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveExistingPhoto(idx)}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition-colors"
                          title="Delete this photo"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Insert / Upload New Photos into this Album */}
              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <Label htmlFor="edit-newPhotos" className="font-semibold text-emerald-900 block mb-1">
                  Insert New Photos into this Album
                </Label>
                <Input
                  id="edit-newPhotos"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setEditNewRelatedFiles(Array.from(e.target.files || []))}
                  className="rounded-lg bg-white mt-1 text-xs"
                />
                <p className="text-[11px] text-emerald-700 mt-1">
                  {editNewRelatedFiles.length > 0
                    ? `${editNewRelatedFiles.length} new photo(s) selected to add.`
                    : 'You can select multiple photos to append to this album.'}
                </p>
              </div>

              {/* Save & Cancel */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={isSavingEdit}
                  className="flex-1 bg-[#4CAF50] hover:bg-[#45a049] text-white rounded-xl font-semibold"
                >
                  {isSavingEdit ? 'Saving Changes...' : 'Save Album Changes'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 rounded-xl"
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* 3. VIEW ALBUM LIGHTBOX PREVIEW MODAL */}
      <Dialog
        open={Boolean(selectedPreviewImage)}
        onOpenChange={(open) => {
          if (!open) setSelectedPreviewImage(null);
        }}
      >
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between pr-6">
              <div>
                <DialogTitle>{selectedPreviewImage?.caption || 'Gallery Album'}</DialogTitle>
                <DialogDescription className="mt-1">
                  {1 + (selectedPreviewImage?.relatedImages?.length || 0)} total images in this album. Click any image to view in full resolution.
                </DialogDescription>
              </div>
              {selectedPreviewImage ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const current = selectedPreviewImage;
                    setSelectedPreviewImage(null);
                    openEditModal(current);
                  }}
                  className="rounded-xl flex items-center gap-1 text-xs border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Album
                </Button>
              ) : null}
            </div>
          </DialogHeader>

          {selectedPreviewImage ? (
            <div className="space-y-4 mt-3">
              <div>
                <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Main Cover Photo</h5>
                <div
                  className="relative aspect-video max-h-72 overflow-hidden rounded-xl bg-gray-100 cursor-pointer group shadow-sm border border-gray-100"
                  onClick={() => setActiveLightboxSrc(selectedPreviewImage.mainImageUrl || selectedPreviewImage.url)}
                >
                  <img
                    src={selectedPreviewImage.mainImageUrl || selectedPreviewImage.url}
                    alt={selectedPreviewImage.caption}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                    Click to Enlarge Fullscreen
                  </div>
                </div>
              </div>

              {(selectedPreviewImage.relatedImages?.length || 0) > 0 ? (
                <div>
                  <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Album Photos ({selectedPreviewImage.relatedImages?.length})
                  </h5>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {selectedPreviewImage.relatedImages?.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 cursor-pointer group shadow-sm border border-gray-100"
                        onClick={() => setActiveLightboxSrc(imgUrl)}
                      >
                        <img
                          src={imgUrl}
                          alt={`${selectedPreviewImage.caption} photo ${idx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                          Enlarge
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-400 italic">No additional related photos attached to this album.</p>
              )}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* 4. FULLSCREEN LIGHTBOX POPUP */}
      {activeLightboxSrc ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 cursor-pointer backdrop-blur-sm"
          onClick={() => setActiveLightboxSrc(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white hover:text-gray-300 bg-black/50 rounded-full p-2"
            onClick={() => setActiveLightboxSrc(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activeLightboxSrc}
            alt="Full size preview"
            className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl object-contain"
          />
        </div>
      ) : null}
    </div>
  );
}
