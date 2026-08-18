import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { baseUrl, API_PATH } from '@/utils/baseUrl';
import { toast } from 'sonner';
import { Eye, EyeOff, Candy, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Logo from '@/assets/logo.png';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Please enter your email and password');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}${API_PATH.USER.LOGIN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Login failed');
        return;
      }

      login(data.user, data.token);
      toast.success('Welcome back!');
      navigate('/admin');
    } catch {
      toast.error('Could not connect to the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center p-4">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-amber-900/10 border border-amber-100 overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600" />

          <div className="p-8">
            {/* Logo & title */}
            <div className="flex flex-col items-center mb-8">
              <img src={Logo} alt="Sandamali Sweet House" className="h-20 w-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
              <p className="text-sm text-gray-500 mt-1">Sign in to manage your sweet house</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="admin@example.com"
                  className="mt-1.5 rounded-xl border-gray-200 focus:border-amber-400 focus:ring-amber-400"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="rounded-xl border-gray-200 focus:border-amber-400 focus:ring-amber-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg shadow-amber-500/25 transition-all"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Signing in…
                  </span>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Footer */}
            <p className="text-center text-xs text-gray-400 mt-8 flex items-center justify-center gap-1">
              <Candy className="w-3 h-3" /> Sandamali Sweet House — Admin Panel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
