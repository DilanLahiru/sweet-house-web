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
import { Plus, Edit, Trash2, Upload, ImageIcon } from 'lucide-react';
import { baseUrl } from '@/utils/baseUrl';

interface Poster {
  _id: string;
  name: string;
  image: string;
  description: string;
}

const API_BASE = `${baseUrl}/api/poster`;
const UPLOAD_URL = `${baseUrl}/api/image/upload`;

async function apiFetch(url: string, options?: RequestInit) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
}

const emptyForm = { name: '', image: '', description: '' };

export default function PosterManager() {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Poster | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => { loadPosters(); }, []);

  const loadPosters = async () => {
    try {
      setLoading(true);
      const data = await apiFetch(`${API_BASE}/load-all-posters`);
      setPosters(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to load posters');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, image: localPreview }));
    setUploading(true);

    try {
      const form = new FormData();
      form.append('image', file);
      const data = await apiFetch(UPLOAD_URL, { method: 'POST', body: form });
      setFormData((prev) => ({ ...prev, image: data.imageUrl }));
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
      setFormData((prev) => ({ ...prev, image: '' }));
      console.error(error);
    } finally {
      URL.revokeObjectURL(localPreview);
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.image || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (editingItem) {
        await apiFetch(`${API_BASE}/update-poster/${editingItem._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        toast.success('Poster updated successfully');
      } else {
        await apiFetch(`${API_BASE}/create-poster`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        toast.success('Poster created successfully');
      }
      setIsOpen(false);
      resetForm();
      loadPosters();
    } catch (error) {
      toast.error('Failed to save poster');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await apiFetch(`${API_BASE}/delete-poster/${deleteId}`, { method: 'DELETE' });
      toast.success('Poster deleted successfully');
      setDeleteId(null);
      loadPosters();
    } catch (error) {
      toast.error('Failed to delete poster');
      console.error(error);
    }
  };

  const openEdit = (poster: Poster) => {
    setEditingItem(poster);
    setFormData({ name: poster.name, image: poster.image, description: poster.description });
    setIsOpen(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData(emptyForm);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) resetForm();
    setIsOpen(open);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-amber-900">Posters</h2>

        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button className="bg-amber-600 hover:bg-amber-700 gap-2">
              <Plus className="w-4 h-4" />
              Add Poster
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Poster' : 'Add New Poster'}</DialogTitle>
              <DialogDescription>
                Fill in the poster name, image, and description.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Summer Special"
                />
              </div>

              {/* Image upload */}
              <div>
                <Label>Image *</Label>
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
                  value={formData.image}
                  onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                  placeholder="https://example.com/poster.jpg"
                />
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="mt-2 w-full h-44 object-cover rounded-md border"
                  />
                )}
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description *</Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe this poster..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700"
                disabled={uploading}
              >
                {editingItem ? 'Save Changes' : 'Create Poster'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading posters…</div>
      ) : posters.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
          <ImageIcon className="w-12 h-12 mb-3" />
          <p className="text-lg font-medium">No posters yet</p>
          <p className="text-sm">Click "Add Poster" to create your first one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posters.map((poster) => (
            <Card key={poster._id} className="overflow-hidden">
              <img
                src={poster.image}
                alt={poster.name}
                className="w-full h-52 object-cover"
              />
              <CardContent className="p-4 space-y-2">
                <h3 className="font-semibold text-gray-900 text-sm">{poster.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{poster.description}</p>
                <div className="flex gap-2 pt-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 gap-1 text-xs"
                    onClick={() => openEdit(poster)}
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 gap-1 text-xs text-red-600 hover:text-red-700 hover:border-red-300"
                    onClick={() => setDeleteId(poster._id)}
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

      {/* Delete confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this poster?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the poster. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
