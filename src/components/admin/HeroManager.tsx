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
//import { heroApi, uploadApi } from '@/services/api';
import { toast } from 'sonner';
import { Edit, Upload } from 'lucide-react';

interface HeroContent {
  id?: string;
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  createdAt?: string;
}

export default function HeroManager() {
  const [hero, setHero] = useState<HeroContent>({
    title: '',
    subtitle: '',
    ctaText: '',
    ctaLink: '',
    backgroundImage: '',
  });
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadHero();
  }, []);

  const loadHero = async () => {
    try {
      setLoading(true);
      const data = await heroApi.get();
      if (data && Object.keys(data).length > 0) {
        setHero(data);
      }
    } catch (error) {
      toast.error('Failed to load hero content');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!hero.title) {
        toast.error('Please fill in all required fields');
        return;
      }

      if (hero.id) {
        await heroApi.update(hero.id, hero);
      } else {
        await heroApi.create(hero);
      }

      toast.success('Hero content updated successfully');
      setIsOpen(false);
      loadHero();
    } catch (error) {
      toast.error('Failed to save hero content');
      console.error(error);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-amber-900">Hero Section</h2>
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button className="bg-amber-600 hover:bg-amber-700 gap-2">
              <Edit className="w-4 h-4" />
              Edit Hero
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Hero Content</DialogTitle>
              <DialogDescription>
                Update the main hero section content.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={hero.title}
                  onChange={(e) => setHero({ ...hero, title: e.target.value })}
                  placeholder="e.g., Welcome to Sandamali Sweet House"
                />
              </div>
              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <textarea
                  id="subtitle"
                  value={hero.subtitle}
                  onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                  placeholder="Sub-heading text..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="ctaText">Call-to-Action Button Text</Label>
                <Input
                  id="ctaText"
                  value={hero.ctaText || ''}
                  onChange={(e) => setHero({ ...hero, ctaText: e.target.value })}
                  placeholder="e.g., Shop Now"
                />
              </div>
              <div>
                <Label htmlFor="ctaLink">Call-to-Action Link</Label>
                <Input
                  id="ctaLink"
                  value={hero.ctaLink || ''}
                  onChange={(e) => setHero({ ...hero, ctaLink: e.target.value })}
                  placeholder="/products"
                />
              </div>
              <div>
                <Label htmlFor="backgroundImage">Background Image</Label>
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
                            setHero({ ...hero, backgroundImage: response.url });
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
                    id="backgroundImageUrl"
                    value={hero.backgroundImage || ''}
                    onChange={(e) => setHero({ ...hero, backgroundImage: e.target.value })}
                    placeholder="https://example.com/hero-bg.jpg"
                  />
                </div>
                {hero.backgroundImage && (
                  <img
                    src={hero.backgroundImage}
                    alt="Preview"
                    className="mt-2 w-full h-40 object-cover rounded-md"
                  />
                )}
              </div>
              <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700" disabled={uploading}>
                Update Hero Content
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading hero content...</p>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-amber-900">{hero.title || 'No title set'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {hero.backgroundImage && (
              <img
                src={hero.backgroundImage}
                alt="Hero background"
                className="w-full h-64 object-cover rounded-md"
              />
            )}
            <div>
              <label className="text-sm font-semibold text-gray-700">Subtitle:</label>
              <p className="text-gray-600">{hero.subtitle || 'Not set'}</p>
            </div>
            {hero.ctaText && (
              <div>
                <label className="text-sm font-semibold text-gray-700">CTA Button:</label>
                <p className="text-gray-600">
                  {hero.ctaText} {hero.ctaLink && `→ ${hero.ctaLink}`}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
