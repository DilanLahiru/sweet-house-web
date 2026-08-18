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
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { baseUrl, API_PATH } from '@/utils/baseUrl';
import { toast } from 'sonner';
import { Trash2, Edit, Plus, Upload } from 'lucide-react';

const API_BASE = `${baseUrl}`;

async function apiFetch(url: string, options?: RequestInit) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  weight: number;
  tags?: string[];
}

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<Product>({
    _id: '',
    name: '',
    description: '',
    price: 0,
    image: '',
    weight: 0,
    tags: [],
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await apiFetch(`${API_BASE}${API_PATH.PRODUCT.LOAD_ALL}`);
      setProducts(data);
    } catch (error) {
      toast.error('Failed to load products');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.name || !formData.description || !formData.price || !formData.image || !formData.weight) {
        toast.error('Please fill in all required fields');
        return;
      }

      const payload = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        image: formData.image,
        weight: formData.weight,
        tags: formData.tags ?? [],
      };

      if (editingId) {
        await apiFetch(`${API_BASE}${API_PATH.PRODUCT.UPDATE}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        toast.success('Product updated successfully');
      } else {
        await apiFetch(`${API_BASE}${API_PATH.PRODUCT.CREATE}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        toast.success('Product created successfully');
      }

      setIsOpen(false);
      setEditingId(null);
      setFormData({
        _id: '',
        name: '',
        description: '',
        price: 0,
        image: '',
        weight: 0,
        tags: [],
      });
      loadProducts();
    } catch (error) {
      toast.error('Failed to save product');
      console.error(error);
    }
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setEditingId(product._id);
    setIsOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await apiFetch(`${API_BASE}${API_PATH.PRODUCT.DELETE}/${deleteId}`, { method: 'DELETE' });
      toast.success('Product deleted successfully');
      setDeleteId(null);
      loadProducts();
    } catch (error) {
      toast.error('Failed to delete product');
      console.error(error);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setEditingId(null);
      setFormData({
        _id: '',
        name: '',
        description: '',
        price: 0,
        image: '',
        weight: 0,
        tags: [],
      });
    }
    setIsOpen(open);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-amber-900">Products</h2>
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button className="bg-amber-600 hover:bg-amber-700 gap-2">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Product' : 'Add New Product'}</DialogTitle>
              <DialogDescription>
                Fill in the details below to {editingId ? 'update the' : 'create a new'} product.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                {/* ── Left column ── */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Milk Toffee"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Weight (g) *</Label>
                    <Input
                      id="weight"
                      type="number"
                      min="0"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
                      placeholder="e.g., 250"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price (Rs.) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      value={(formData.tags ?? []).join(', ')}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                        })
                      }
                      placeholder="e.g., sweet, gift, popular"
                    />
                  </div>
                </div>

                {/* ── Right column ── */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Product description"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="image">Product Image *</Label>
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
                                const body = new FormData();
                                body.append('image', file);
                                const response = await apiFetch(`${API_BASE}${API_PATH.IMAGE.UPLOAD}`, { method: 'POST', body });
                                setFormData({ ...formData, image: response.imageUrl });
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
                      <div className="text-xs text-gray-500">Or paste image URL below:</div>
                      <Input
                        id="imageUrl"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="mt-2 w-full h-32 object-cover rounded-md"
                      />
                    )}
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700" disabled={uploading}>
                {editingId ? 'Update Product' : 'Create Product'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-gray-500">
            No products yet. Click "Add Product" to create one.
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-amber-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-amber-900 w-16">Image</th>
                <th className="text-left px-4 py-3 font-semibold text-amber-900">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-amber-900">Description</th>
                <th className="text-left px-4 py-3 font-semibold text-amber-900">Tags</th>
                <th className="text-right px-4 py-3 font-semibold text-amber-900">Weight</th>
                <th className="text-right px-4 py-3 font-semibold text-amber-900">Price</th>
                <th className="text-center px-4 py-3 font-semibold text-amber-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product, index) => (
                <tr
                  key={product._id}
                  className={`hover:bg-amber-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}
                >
                  <td className="px-4 py-2.5">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md border border-gray-200"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 text-xs">No img</div>
                    )}
                  </td>
                  <td className="px-4 py-2.5">
                    <p className="font-medium text-gray-900 whitespace-nowrap">{product.name}</p>
                  </td>
                  <td className="px-4 py-2.5 max-w-xs">
                    <p className="text-gray-500 line-clamp-2 text-xs">{product.description}</p>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex flex-wrap gap-1">
                      {(product.tags ?? []).slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full whitespace-nowrap">{tag}</span>
                      ))}
                      {(product.tags ?? []).length > 2 && (
                        <span className="text-[10px] text-gray-400">+{product.tags!.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-right text-gray-600 whitespace-nowrap">{product.weight}g</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-amber-600 whitespace-nowrap">Rs. {product.price}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex gap-1.5 justify-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(product)}
                        className="h-7 px-2 text-xs gap-1"
                      >
                        <Edit className="w-3 h-3" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteId(product._id)}
                        className="h-7 px-2 text-xs gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete Product</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this product? This action cannot be undone.
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
