import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Trash2, Edit, Plus, Upload, ImageIcon } from 'lucide-react';
import { baseUrl } from '@/utils/baseUrl';

interface GalleryImage {
  _id: string;
  imageUrl: string;
  caption: string;
  createdAt?: string;
}

const API_BASE = `${baseUrl}/api/gallery`;
const UPLOAD_URL = `${baseUrl}/api/image/upload`;

async function apiFetch(url: string, options?: RequestInit) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
}

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryImage | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({ imageUrl: '', caption: '' });

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      setLoading(true);
      const data = await apiFetch(`${API_BASE}/load-all-galleries`);
      setImages(data);
    } catch (error) {
      toast.error('Failed to load gallery images');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show a local preview immediately while the upload is in progress
    const localPreview = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, imageUrl: localPreview }));
    setUploading(true);

    try {
      const form = new FormData();
      form.append('image', file);
      const data = await apiFetch(UPLOAD_URL, { method: 'POST', body: form });
      console.log('====================================');
      console.log(data);
      console.log('====================================');
      // Replace the local blob URL with the permanent Cloudinary URL
      setFormData((prev) => ({ ...prev, imageUrl: data.imageUrl }));
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
      // Revert preview on failure
      setFormData((prev) => ({ ...prev, imageUrl: '' }));
      console.error(error);
    } finally {
      URL.revokeObjectURL(localPreview);
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      toast.error('Please provide an image');
      return;
    }

    try {
      if (editingItem) {
        await apiFetch(`${API_BASE}/update-gallery/${editingItem._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        toast.success('Image updated successfully');
      } else {
        await apiFetch(`${API_BASE}/create-gallery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        toast.success('Image added to gallery');
      }
      setIsOpen(false);
      resetForm();
      loadImages();
    } catch (error) {
      toast.error('Failed to save image');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await apiFetch(`${API_BASE}/delete-gallery/${deleteId}`, { method: 'DELETE' });
      toast.success('Image removed from gallery');
      setDeleteId(null);
      loadImages();
    } catch (error) {
      toast.error('Failed to delete image');
      console.error(error);
    }
  };

  const openEdit = (item: GalleryImage) => {
    setEditingItem(item);
    setFormData({ imageUrl: item.imageUrl, caption: item.caption });
    setIsOpen(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({ imageUrl: '', caption: '' });
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) resetForm();
    setIsOpen(open);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-amber-900">Gallery</h2>
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button className="bg-amber-600 hover:bg-amber-700 gap-2">
              <Plus className="w-4 h-4" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Image' : 'Add Gallery Image'}</DialogTitle>
              <DialogDescription>
                Upload an image or paste a URL to add it to the gallery.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Upload Image</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" disabled={uploading} className="gap-2 shrink-0">
                    <Upload className="w-4 h-4" />
                    {uploading ? 'Uploading…' : 'Upload'}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Or paste an image URL below:</p>
                <Input
                  className="mt-1"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-md border"
                />
              )}

              <Button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700"
                disabled={uploading}
              >
                {editingItem ? 'Save Changes' : 'Add to Gallery'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading gallery…</p>
        </div>
      ) : images.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
          <ImageIcon className="w-12 h-12 mb-3" />
          <p className="text-lg font-medium">No images yet</p>
          <p className="text-sm">Click "Add Image" to upload your first photo.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((item) => (
            <Card key={item._id} className="overflow-hidden group relative">
              <img
                src={item.imageUrl}
                alt={item.caption || 'Gallery image'}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-2">
                {item.caption && (
                  <p className="text-xs text-gray-600 truncate">{item.caption}</p>
                )}
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 gap-1 text-xs"
                    onClick={() => openEdit(item)}
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 gap-1 text-xs text-red-600 hover:text-red-700 hover:border-red-300"
                    onClick={() => setDeleteId(item._id)}
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this image?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the image from the gallery. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
