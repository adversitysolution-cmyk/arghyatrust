import { type FormEvent, useMemo, useState, useEffect } from 'react';
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
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [relatedImageFiles, setRelatedImageFiles] = useState<File[]>([]);
  const [relatedPreviews, setRelatedPreviews] = useState<{ file: File; url: string }[]>([]);

  // Edit Album State
  const [editingAlbum, setEditingAlbum] = useState<GalleryImage | null>(null);
  const [editCaption, setEditCaption] = useState('');
  const [editCoverFile, setEditCoverFile] = useState<File | null>(null);
  const [editCoverPreview, setEditCoverPreview] = useState<string | null>(null);
  const [editNewRelatedFiles, setEditNewRelatedFiles] = useState<File[]>([]);
  const [editNewRelatedPreviews, setEditNewRelatedPreviews] = useState<{ file: File; url: string }[]>([]);
  const [editExistingRelated, setEditExistingRelated] = useState<string[]>([]);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Inline Quick Caption Edit
  const [editingCaption, setEditingCaption] = useState<{ id: string; caption: string } | null>(null);

  // Sync previews for Add Modal Main Image
  useEffect(() => {
    if (!mainImageFile) {
      setMainImagePreview(null);
      return;
    }
    const url = URL.createObjectURL(mainImageFile);
    setMainImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [mainImageFile]);

  // Sync previews for Add Modal Related Images
  useEffect(() => {
    const list = relatedImageFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setRelatedPreviews(list);
    return () => {
      list.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [relatedImageFiles]);

  // Sync previews for Edit Modal Cover File
  useEffect(() => {
    if (!editCoverFile) {
      setEditCoverPreview(null);
      return;
    }
    const url = URL.createObjectURL(editCoverFile);
    setEditCoverPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [editCoverFile]);

  // Sync previews for Edit Modal New Related Files
  useEffect(() => {
    const list = editNewRelatedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setEditNewRelatedPreviews(list);
    return () => {
      list.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [editNewRelatedFiles]);

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
    setEditCoverPreview(null);
    setEditNewRelatedFiles([]);
    setEditExistingRelated(album.relatedImages || []);
    setIsEditModalOpen(true);
  };

  const handleRemoveExistingPhoto = (indexToRemove: number) => {
    setEditExistingRelated((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleRemoveNewRelatedFile = (indexToRemove: number) => {
    setEditNewRelatedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleRemoveAddRelatedFile = (indexToRemove: number) => {
    setRelatedImageFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
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
          Supports JPG, PNG, WEBP, GIF
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
                  <span className="absolute top-2 left-2 bg-black/70 text-white text-[11px] font-medium px-2 py-0.5 rounded-md backdrop-blur-sm shadow-sm">
                    {totalCount} {totalCount === 1 ? 'photo' : 'photos'}
                  </span>

                  {/* Delete Button (Always Visible) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`Are you sure you want to delete the album "${image.caption || 'Untitled Album'}"?`)) {
                        onDeleteImage(image.id);
                      }
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-600/90 hover:bg-red-700 text-white rounded-lg flex items-center justify-center transition-all z-10 shadow-md hover:scale-105"
                    title="Delete this entire album"
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
                        <b>{image.relatedImages?.length || 0}</b> additional photos attached
                      </p>
                    </div>
                  )}

                  {/* Quick Action Buttons */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 gap-1">
                    <button
                      type="button"
                      onClick={() => openEditModal(image)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-[#2f7d46] bg-gray-50 hover:bg-green-50 px-2.5 py-1.5 rounded-lg transition-colors border border-gray-200"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#2f7d46]" />
                      Edit / Add Photos
                    </button>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setSelectedPreviewImage(image)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#2f7d46] hover:bg-green-50 px-2 py-1.5 rounded-lg transition-colors"
                        title="View all photos in this album"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete album "${image.caption || 'Untitled'}"?`)) {
                            onDeleteImage(image.id);
                          }
                        }}
                        className="inline-flex items-center text-xs text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                        title="Delete album"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
        <DialogContent className="rounded-2xl max-w-xl max-h-[88vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Gallery Album</DialogTitle>
            <DialogDescription>
              Set the album title, upload the primary cover photo, and attach additional photos.
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

            {/* Main Cover Photo with Live Preview */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <Label htmlFor="add-mainImage" className="font-semibold text-gray-800 block mb-1">
                Main Cover Photo *
              </Label>
              <Input
                id="add-mainImage"
                type="file"
                accept="image/*"
                onChange={(e) => setMainImageFile(e.target.files?.[0] || null)}
                className="rounded-xl bg-white"
                required={!mainImageFile}
              />
              {mainImagePreview && mainImageFile ? (
                <div className="mt-3 flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200">
                  <img
                    src={mainImagePreview}
                    alt="Cover preview"
                    className="w-16 h-16 rounded-md object-cover border border-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">{mainImageFile.name}</p>
                    <p className="text-[11px] text-gray-400">{(mainImageFile.size / 1024).toFixed(1)} KB • Cover Photo</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMainImageFile(null)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Remove cover photo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <p className="text-[11px] text-gray-500 mt-1">This photo appears as the thumbnail card on the website.</p>
              )}
            </div>

            {/* Additional Photos with Live Grid Preview */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <Label htmlFor="add-relatedImages" className="font-semibold text-gray-800 block mb-1">
                Additional Album Photos (optional)
              </Label>
              <Input
                id="add-relatedImages"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const newFiles = Array.from(e.target.files || []);
                  setRelatedImageFiles((prev) => [...prev, ...newFiles]);
                }}
                className="rounded-xl bg-white"
              />
              
              {relatedPreviews.length > 0 ? (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-700">
                      Selected Photos Preview ({relatedPreviews.length}):
                    </span>
                    <button
                      type="button"
                      onClick={() => setRelatedImageFiles([])}
                      className="text-[11px] text-red-500 hover:underline"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto p-1">
                    {relatedPreviews.map((item, idx) => (
                      <div key={idx} className="relative group rounded-lg overflow-hidden border border-gray-200 bg-white p-1">
                        <img src={item.url} alt={item.file.name} className="w-full h-20 object-cover rounded" />
                        <p className="text-[10px] text-gray-600 truncate mt-1 px-0.5" title={item.file.name}>
                          {item.file.name}
                        </p>
                        <button
                          type="button"
                          onClick={() => handleRemoveAddRelatedFile(idx)}
                          className="absolute top-1.5 right-1.5 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center shadow hover:bg-red-700 transition-colors"
                          title="Remove this photo"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-[11px] text-gray-500 mt-1">You can select multiple photos at once to attach inside this album.</p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                className="flex-1 bg-[#4CAF50] hover:bg-[#45a049] text-white rounded-xl font-semibold"
              >
                Create Album ({1 + relatedImageFiles.length} {1 + relatedImageFiles.length === 1 ? 'Photo' : 'Photos'})
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

      {/* 2. EDIT ALBUM MODAL (Live preview of existing photos, new cover preview, and new photos preview with name) */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="rounded-2xl max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Album: {editingAlbum?.caption}</DialogTitle>
            <DialogDescription>
              Update title, replace cover image, delete individual photos, or insert new photos.
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

              {/* Cover Photo with Live Preview & File Name */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <Label className="block mb-2 font-semibold text-gray-800">Cover Photo</Label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <img
                        src={editCoverPreview || editingAlbum.mainImageUrl || editingAlbum.url}
                        alt="Cover"
                        className="w-20 h-20 rounded-lg object-cover border border-gray-200 shadow-sm"
                      />
                      <span className="text-[10px] text-gray-500 mt-1 block">
                        {editCoverPreview ? 'New Preview' : 'Current'}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <Label htmlFor="edit-cover" className="text-xs text-gray-600 block mb-1">
                      Choose new cover photo (optional):
                    </Label>
                    <Input
                      id="edit-cover"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setEditCoverFile(e.target.files?.[0] || null)}
                      className="rounded-lg text-xs bg-white"
                    />
                    {editCoverFile ? (
                      <div className="flex items-center justify-between mt-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                        <span className="truncate font-medium">New: {editCoverFile.name}</span>
                        <button
                          type="button"
                          onClick={() => setEditCoverFile(null)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Current Photos in Album with Individual Delete */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <Label className="font-semibold text-gray-800">
                    Existing Album Photos ({editExistingRelated.length})
                  </Label>
                  <span className="text-[11px] text-gray-500">Click ✕ on any photo to remove</span>
                </div>

                {editExistingRelated.length === 0 ? (
                  <p className="text-xs text-gray-400 italic py-2">No additional photos currently attached.</p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-48 overflow-y-auto p-1">
                    {editExistingRelated.map((imgUrl, idx) => (
                      <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group bg-white shadow-sm">
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

              {/* Insert / Upload New Photos with Live Thumbnail Grid & Names */}
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <Label htmlFor="edit-newPhotos" className="font-semibold text-emerald-900 block mb-1">
                  Insert New Photos into this Album
                </Label>
                <Input
                  id="edit-newPhotos"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const newFiles = Array.from(e.target.files || []);
                    setEditNewRelatedFiles((prev) => [...prev, ...newFiles]);
                  }}
                  className="rounded-lg bg-white mt-1 text-xs"
                />

                {editNewRelatedPreviews.length > 0 ? (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-emerald-900">
                        New Photos to Insert ({editNewRelatedPreviews.length}):
                      </span>
                      <button
                        type="button"
                        onClick={() => setEditNewRelatedFiles([])}
                        className="text-[11px] text-red-500 hover:underline"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-48 overflow-y-auto p-1">
                      {editNewRelatedPreviews.map((item, idx) => (
                        <div key={idx} className="relative rounded-lg overflow-hidden border border-emerald-200 bg-white p-1 shadow-sm">
                          <img src={item.url} alt={item.file.name} className="w-full h-20 object-cover rounded" />
                          <p className="text-[10px] text-gray-700 truncate mt-1 px-0.5 font-medium" title={item.file.name}>
                            {item.file.name}
                          </p>
                          <p className="text-[9px] text-gray-400 px-0.5">{(item.file.size / 1024).toFixed(1)} KB</p>
                          <button
                            type="button"
                            onClick={() => handleRemoveNewRelatedFile(idx)}
                            className="absolute top-1.5 right-1.5 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center shadow hover:bg-red-700 transition-colors"
                            title="Remove from upload"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-emerald-700 mt-1">Select one or more photos to append to this album.</p>
                )}
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
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const current = selectedPreviewImage;
                      setSelectedPreviewImage(null);
                      openEditModal(current);
                    }}
                    className="rounded-xl flex items-center gap-1 text-xs border-[#2f7d46] text-[#2f7d46] hover:bg-green-50"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit Album
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const current = selectedPreviewImage;
                      if (window.confirm(`Are you sure you want to delete the album "${current.caption || 'Untitled'}"?`)) {
                        setSelectedPreviewImage(null);
                        onDeleteImage(current.id);
                      }
                    }}
                    className="rounded-xl flex items-center gap-1 text-xs border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete Album
                  </Button>
                </div>
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
