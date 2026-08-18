import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductsManager from '@/components/admin/ProductsManager';
import TestimonialsManager from '@/components/admin/TestimonialsManager';
import HeroManager from '@/components/admin/HeroManager';
import FactoryManager from '@/components/admin/FactoryManager';
import ProcessManager from '@/components/admin/ProcessManager';
import StoryManager from '@/components/admin/StoryManager';
import GalleryManager from '@/components/admin/GalleryManager';
import PosterManager from '@/components/admin/PosterManager';
import ProfileManager from '@/components/admin/ProfileManager';
import { useAuth } from '@/context/AuthContext';
import { baseUrl, API_PATH } from '@/utils/baseUrl';
import { Package, MessageSquare, Home, LogOut, Menu, GalleryHorizontal, FileImage, Star, Image as ImageIcon, ArrowRight, Candy, UserCircle } from 'lucide-react';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({ products: 0, reviews: 0, gallery: 0, posters: 0 });

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  useEffect(() => {
    const load = async (url: string) => {
      try { const r = await fetch(url); return r.ok ? (await r.json()).length : 0; }
      catch { return 0; }
    };
    Promise.all([
      load(`${baseUrl}${API_PATH.PRODUCT.LOAD_ALL}`),
      load(`${baseUrl}${API_PATH.REVIEW.LOAD_ALL}`),
      load(`${baseUrl}${API_PATH.GALLERY.LOAD_ALL}`),
      load(`${baseUrl}${API_PATH.POSTER.LOAD_ALL}`),
    ]).then(([products, reviews, gallery, posters]) =>
      setStats({ products, reviews, gallery, posters })
    );
  }, []);

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'testimonials', label: 'Reviews', icon: MessageSquare },
    { id: 'gallery', label: 'Gallery', icon: GalleryHorizontal },
    { id: 'posters', label: 'Posters', icon: FileImage },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sandamali Sweet House</h1>
              <p className="text-sm text-gray-600">Admin Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-semibold text-gray-900">{user?.name}</span>
                <span className="text-xs text-gray-500">{user?.email}</span>
              </div>
              <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-0'
          } bg-white border-r border-gray-200 overflow-y-auto transition-all duration-300`}
        >
          <div className="p-6 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8">

                {/* Welcome banner */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-amber-900 to-orange-600 p-8 text-white shadow-lg">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                  <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Candy className="w-5 h-5 opacity-80" />
                        <span className="text-sm font-medium opacity-80 tracking-widest uppercase">Admin Dashboard</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-2">Welcome back!</h2>
                      <p className="text-white/75 max-w-md text-sm leading-relaxed">
                        Manage your handcrafted sweet collection, customer reviews, promotional gallery, and more — all from one place.
                      </p>
                    </div>
                    <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center shadow-inner">
                      <Candy className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>

                {/* Live stat counters */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Products', value: stats.products, icon: Package, color: 'amber', tab: 'products' },
                    { label: 'Reviews', value: stats.reviews, icon: Star, color: 'emerald', tab: 'testimonials' },
                    { label: 'Gallery', value: stats.gallery, icon: ImageIcon, color: 'orange', tab: 'gallery' },
                    { label: 'Posters', value: stats.posters, icon: FileImage, color: 'teal', tab: 'posters' },
                  ].map(({ label, value, icon: Icon, color, tab }) => (
                    <div
                      key={tab}
                      className="group text-left bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-amber-200 transition-all duration-200 shadow-lg "
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 shadow-md ${
                        color === 'amber'   ? 'bg-amber-50 text-amber-600' :
                        color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                        color === 'orange'  ? 'bg-orange-50 text-orange-600' :
                                              'bg-teal-50 text-teal-600'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="text-3xl font-bold text-gray-900">{value}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
                      {/* <p className="text-xs text-amber-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        Manage <ArrowRight className="w-3 h-3" />
                      </p> */}
                    </div>
                  ))}
                </div>

                {/* Quick actions */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { icon: Package, title: 'Products', desc: 'Add or update sweet products', color: 'from-amber-400 to-orange-500', tab: 'products' },
                      { icon: Star, title: 'Reviews', desc: 'View customer feedback', color: 'from-emerald-400 to-teal-500', tab: 'testimonials' },
                      { icon: GalleryHorizontal, title: 'Gallery', desc: 'Upload showcase images', color: 'from-orange-400 to-red-500', tab: 'gallery' },
                      { icon: FileImage, title: 'Posters', desc: 'Manage promo banners', color: 'from-teal-400 to-cyan-500', tab: 'posters' },
                    ].map(({ icon: Icon, title, desc, color, tab }) => (
                      <Card
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className="cursor-pointer group hover:shadow-lg transition-all duration-200 border border-gray-100 overflow-hidden bg-white rounded-xl shadow-xl"
                      >
                        <div className={`h-1.5 w-full bg-white`} />
                        <CardHeader className="pb-2 pt-4">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-2 shadow-sm`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <CardTitle className="text-base text-gray-900">{title}</CardTitle>
                          <CardDescription className="text-xs">{desc}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 group-hover:gap-2 transition-all">
                            Go to {title} <ArrowRight className="w-3 h-3" />
                          </span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

              </TabsContent>


              {/* Products Tab */}
              <TabsContent value="products">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Products Management</h2>
                    <p className="text-gray-600">Add, edit, or remove sweet products</p>
                  </div>
                  <ProductsManager />
                </div>
              </TabsContent>

              {/* Testimonials Tab */}
              <TabsContent value="testimonials">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Testimonials Management</h2>
                    <p className="text-gray-600">Manage customer reviews and ratings</p>
                  </div>
                  <TestimonialsManager />
                </div>
              </TabsContent>

              {/* Hero Tab */}
              <TabsContent value="hero">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Hero Section</h2>
                    <p className="text-gray-600">Update hero content and featured images</p>
                  </div>
                  <HeroManager />
                </div>
              </TabsContent>

              {/* Factory Tab */}
              <TabsContent value="factory">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Factory Banner</h2>
                    <p className="text-gray-600">Manage factory section information</p>
                  </div>
                  <FactoryManager />
                </div>
              </TabsContent>

              {/* Process Tab */}
              <TabsContent value="process">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Production Process</h2>
                    <p className="text-gray-600">Update production steps and workflows</p>
                  </div>
                  <ProcessManager />
                </div>
              </TabsContent>

              {/* Story Tab */}
              <TabsContent value="story">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Story</h2>
                    <p className="text-gray-600">Manage company story and history</p>
                  </div>
                  <StoryManager />
                </div>
              </TabsContent>

              {/* Gallery Tab */}
              <TabsContent value="gallery">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Gallery</h2>
                    <p className="text-gray-600">Upload and manage gallery images</p>
                  </div>
                  <GalleryManager />
                </div>
              </TabsContent>

              {/* Posters Tab */}
              <TabsContent value="posters">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Posters</h2>
                    <p className="text-gray-600">Create and manage promotional posters</p>
                  </div>
                  <PosterManager />
                </div>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h2>
                    <p className="text-gray-600">View and update your account details</p>
                  </div>
                  <ProfileManager />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
