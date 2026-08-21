import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Trash2, Edit, Plus, GripVertical, Upload } from 'lucide-react';
import { baseUrl } from '@/utils/baseUrl';

const API_BASE = `${baseUrl}/api/process`;
const UPLOAD_URL = `${baseUrl}/api/image/upload`;

async function apiFetch(url: string, options?: RequestInit) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
}

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon?: string;
  order: number;
  image?: string;
  createdAt?: string;
}

export default function ProcessManager() {
  const [steps, setSteps] = useState<ProcessStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<ProcessStep>({
    id: '',
    title: '',
    description: '',
    icon: '',
    order: 0,
    image: '',
  });

  useEffect(() => {
    loadSteps();
  }, []);

  const loadSteps = async () => {
    try {
      setLoading(true);
      const data = await apiFetch(`${API_BASE}/load-all-processes`);
      const sorted = (data || []).sort((a: ProcessStep, b: ProcessStep) => a.order - b.order);
      setSteps(sorted);
    } catch (error) {
      toast.error('Failed to load process steps');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.title) {
        toast.error('Please fill in all required fields');
        return;
      }

      const dataToSubmit = {
        ...formData,
        order: editingId ? formData.order : steps.length + 1,
      };

      if (editingId) {
        await apiFetch(`${API_BASE}/update-process/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSubmit),
        });
        toast.success('Process step updated successfully');
      } else {
        await apiFetch(`${API_BASE}/create-process`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSubmit),
        });
        toast.success('Process step created successfully');
      }

      setIsOpen(false);
      setEditingId(null);
      setFormData({
        id: '',
        title: '',
        description: '',
        icon: '',
        order: 0,
        image: '',
      });
      loadSteps();
    } catch (error) {
      toast.error('Failed to save process step');
      console.error(error);
    }
  };

  const handleEdit = (step: ProcessStep) => {
    setFormData(step);
    setEditingId(step.id);
    setIsOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await apiFetch(`${API_BASE}/delete-process/${deleteId}`, {
        method: 'DELETE',
      });
      toast.success('Process step deleted successfully');
      setDeleteId(null);
      loadSteps();
    } catch (error) {
      toast.error('Failed to delete process step');
      console.error(error);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setEditingId(null);
      setFormData({
        id: '',
        title: '',
        description: '',
        icon: '',
        order: 0,
        image: '',
      });
    }
    setIsOpen(open);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-amber-900">Production Process</h2>
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button className="bg-amber-600 hover:bg-amber-700 gap-2">
              <Plus className="w-4 h-4" />
              Add Step
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Process Step' : 'Add New Process Step'}</DialogTitle>
              <DialogDescription>
                Add a step in the production process.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Step Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Raw Material Selection"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe this process step..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="icon">Icon (emoji or icon name)</Label>
                <Input
                  id="icon"
                  value={formData.icon || ''}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="e.g., 🌾"
                />
              </div>
              <div>
                <Label htmlFor="image">Step Image</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      id="imageFile"
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        setUploading(true);
                        try {
                          const form = new FormData();
                          form.append('image', file);

                          const response = await apiFetch(UPLOAD_URL, {
                            method: 'POST',
                            body: form,
                          });

                          setFormData({
                            ...formData,
                            image: response.imageUrl || response.url || '',
                          });
                          toast.success('Image uploaded successfully');
                        } catch (error) {
                          toast.error('Failed to upload image');
                          console.error(error);
                        } finally {
                          setUploading(false);
                        }
                      }}
                      disabled={uploading}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      disabled={uploading}
                      className="gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      {uploading ? 'Uploading...' : 'Upload'}
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500">
                    Or paste image URL below:
                  </div>
                  <Input
                    id="imageUrl"
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="mt-2 w-full h-40 object-cover rounded-md"
                  />
                )}
              </div>
              <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700" disabled={uploading}>
                {editingId ? 'Update Step' : 'Create Step'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading process steps...</p>
        </div>
      ) : steps.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-gray-500">
            No process steps yet. Click "Add Step" to create one.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {steps.map((step, index) => (
            <Card key={step.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="text-3xl">{step.icon || '•'}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-amber-900">
                            Step {index + 1}: {step.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{step.description}</p>
                      {step.image && (
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                      )}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(step)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setDeleteId(step.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete Process Step</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this process step? This action cannot be undone.
          </AlertDialogDescription>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
