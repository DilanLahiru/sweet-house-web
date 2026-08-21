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
import { toast } from 'sonner';
import { Edit, Upload } from 'lucide-react';
import { baseUrl } from '@/utils/baseUrl';

const API_BASE = `${baseUrl}/api/story`;
const UPLOAD_URL = `${baseUrl}/api/image/upload`;

async function apiFetch(url: string, options?: RequestInit) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
}

interface StoryContent {
  id?: string;
  title: string;
  content: string;
  founder?: string;
  foundingYear?: number;
  mission?: string;
  vision?: string;
  image?: string;
  createdAt?: string;
}

export default function StoryManager() {
  const [story, setStory] = useState<StoryContent>({
    title: '',
    content: '',
    founder: '',
    foundingYear: new Date().getFullYear(),
    mission: '',
    vision: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadStory();
  }, []);

  const loadStory = async () => {
    try {
      setLoading(true);
      const data = await apiFetch(`${API_BASE}/load-all-stories`);
      const storyData = Array.isArray(data) ? data[0] : data;
      if (storyData && Object.keys(storyData).length > 0) {
        setStory(storyData);
      }
    } catch (error) {
      toast.error('Failed to load story');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!story.title || !story.content) {
        toast.error('Please fill in all required fields');
        return;
      }

      if (story.id) {
        await apiFetch(`${API_BASE}/update-story/${story.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(story),
        });
      } else {
        await apiFetch(`${API_BASE}/create-story`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(story),
        });
      }

      toast.success('Story updated successfully');
      setIsOpen(false);
      loadStory();
    } catch (error) {
      toast.error('Failed to save story');
      console.error(error);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-amber-900">Our Story</h2>
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button className="bg-amber-600 hover:bg-amber-700 gap-2">
              <Edit className="w-4 h-4" />
              Edit Story
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Our Story</DialogTitle>
              <DialogDescription>
                Update the company story and background information.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Story Title *</Label>
                <Input
                  id="title"
                  value={story.title}
                  onChange={(e) => setStory({ ...story, title: e.target.value })}
                  placeholder="e.g., The Sandamali Sweet House Story"
                />
              </div>
              <div>
                <Label htmlFor="content">Story Content *</Label>
                <textarea
                  id="content"
                  value={story.content}
                  onChange={(e) => setStory({ ...story, content: e.target.value })}
                  placeholder="Tell the story of your company..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  rows={5}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="founder">Founder</Label>
                  <Input
                    id="founder"
                    value={story.founder || ''}
                    onChange={(e) => setStory({ ...story, founder: e.target.value })}
                    placeholder="Founder name"
                  />
                </div>
                <div>
                  <Label htmlFor="foundingYear">Founding Year</Label>
                  <Input
                    id="foundingYear"
                    type="number"
                    value={story.foundingYear}
                    onChange={(e) => setStory({ ...story, foundingYear: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="mission">Mission Statement</Label>
                <textarea
                  id="mission"
                  value={story.mission || ''}
                  onChange={(e) => setStory({ ...story, mission: e.target.value })}
                  placeholder="Our mission..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="vision">Vision Statement</Label>
                <textarea
                  id="vision"
                  value={story.vision || ''}
                  onChange={(e) => setStory({ ...story, vision: e.target.value })}
                  placeholder="Our vision..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="image">Story Image</Label>
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

                          setStory({
                            ...story,
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
                    value={story.image || ''}
                    onChange={(e) => setStory({ ...story, image: e.target.value })}
                    placeholder="https://example.com/story-image.jpg"
                  />
                </div>
                {story.image && (
                  <img
                    src={story.image}
                    alt="Preview"
                    className="mt-2 w-full h-40 object-cover rounded-md"
                  />
                )}
              </div>
              <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700" disabled={uploading}>
                Update Story
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading story...</p>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-amber-900">{story.title || 'No title set'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {story.image && (
              <img
                src={story.image}
                alt="Story"
                className="w-full h-64 object-cover rounded-md"
              />
            )}
            <div>
              <label className="text-sm font-semibold text-gray-700">Story:</label>
              <p className="text-gray-600 whitespace-pre-wrap">{story.content || 'Not set'}</p>
            </div>
            {story.founder && (
              <div>
                <label className="text-sm font-semibold text-gray-700">Founder:</label>
                <p className="text-gray-600">
                  {story.founder} {story.foundingYear && `(Founded in ${story.foundingYear})`}
                </p>
              </div>
            )}
            {story.mission && (
              <div>
                <label className="text-sm font-semibold text-gray-700">Mission:</label>
                <p className="text-gray-600">{story.mission}</p>
              </div>
            )}
            {story.vision && (
              <div>
                <label className="text-sm font-semibold text-gray-700">Vision:</label>
                <p className="text-gray-600">{story.vision}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
