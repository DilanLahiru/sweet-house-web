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
//import { factoryApi, uploadApi } from '@/services/api';
import { toast } from 'sonner';
import { Edit, Upload } from 'lucide-react';
import { baseUrl } from '@/utils/baseUrl';

interface FactoryInfo {
  id?: string;
  title: string;
  description: string;
  image?: string;
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

export default function FactoryManager() {
  const [factory, setFactory] = useState<FactoryInfo>({
    title: '',
    description: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({ imageUrl: '', caption: '' });

  useEffect(() => {
    loadFactory();
  }, []);

  const loadFactory = async () => {
    try {
          setLoading(true);
          const data = await apiFetch(`${API_BASE}/load-all-posters`);
          setFactory(data);
        } catch (error) {
          toast.error('Failed to load factory info');
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
    try {
      if (!factory.title) {
        toast.error('Please fill in all required fields');
        return;
      }

      if (factory.id) {
        //await factoryApi.update(factory.id, factory);
      } else {
        const data = await apiFetch(`${API_BASE}/create-poster`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
       console.log('====================================');
       console.log(data);
       console.log('====================================');
      }

      toast.success('Factory info updated successfully');
      setIsOpen(false);
      loadFactory();
    } catch (error) {
      toast.error('Failed to save factory info');
      console.error(error);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-amber-900">Factory Information</h2>
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button className="bg-amber-600 hover:bg-amber-700 gap-2">
              <Edit className="w-4 h-4" />
              Edit Factory Info
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Poster Information</DialogTitle>
              <DialogDescription>
                Update the poster details and information.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Poster Title *</Label>
                <Input
                  id="title"
                  value={factory.title}
                  onChange={(e) => setFactory({ ...factory, title: e.target.value })}
                  placeholder="e.g., Sandamali Sweet Factory"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={factory.description}
                  onChange={(e) => setFactory({ ...factory, description: e.target.value })}
                  placeholder="Describe your factory..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="image">Factory Image</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      id="imageFile"
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setUploading(true);
                          try {
                            const response = await uploadApi.uploadImage(file);
                            setFactory({ ...factory, image: response.url });
                            toast.success('Image uploaded successfully');
                          } catch (error) {
                            toast.error('Failed to upload image');
                            console.error(error);
                          } finally {
                            setUploading(false);
                          }
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
                    value={factory.image || ''}
                    onChange={(e) => setFactory({ ...factory, image: e.target.value })}
                    placeholder="https://example.com/factory.jpg"
                  />
                </div>
                {factory.image && (
                  <img
                    src={factory.image}
                    alt="Preview"
                    className="mt-2 w-full h-40 object-cover rounded-md"
                  />
                )}
              </div>
              <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700" disabled={uploading}>
                Update Factory Info
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading factory info...</p>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-amber-900">{factory.title || 'No title set'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {factory.image && (
              <img
                src={factory.image}
                alt="Factory"
                className="w-full h-64 object-cover rounded-md"
              />
            )}
            <div>
              <label className="text-sm font-semibold text-gray-700">Description:</label>
              <p className="text-gray-600">{factory.description || 'Not set'}</p>
            </div>
            {factory.location && (
              <div>
                <label className="text-sm font-semibold text-gray-700">Location:</label>
                <p className="text-gray-600">{factory.location}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              {factory.yearEstablished && (
                <div>
                  <label className="text-sm font-semibold text-gray-700">Established:</label>
                  <p className="text-gray-600">{factory.yearEstablished}</p>
                </div>
              )}
              {factory.employees && (
                <div>
                  <label className="text-sm font-semibold text-gray-700">Employees:</label>
                  <p className="text-gray-600">{factory.employees}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
