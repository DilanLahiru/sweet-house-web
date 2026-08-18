import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { baseUrl, API_PATH } from '@/utils/baseUrl';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Mail, Lock, Eye, EyeOff, Calendar, ShieldCheck } from 'lucide-react';

export default function ProfileManager() {
  const { user, token, updateUser } = useAuth();

  // Profile form
  const [profile, setProfile] = useState({ name: user?.name ?? '', email: user?.email ?? '' });
  const [savingProfile, setSavingProfile] = useState(false);

  // Password form
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.name || !profile.email) {
      toast.error('Name and email are required');
      return;
    }
    setSavingProfile(true);
    try {
      const res = await fetch(`${baseUrl}${API_PATH.USER.UPDATE}/${user?._id}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.message || 'Failed to update profile'); return; }
      updateUser(data);
      toast.success('Profile updated successfully');
    } catch {
      toast.error('Could not connect to the server');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwords.oldPassword || !passwords.newPassword || !passwords.confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (passwords.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    setSavingPassword(true);
    try {
      const res = await fetch(`${baseUrl}${API_PATH.USER.CHANGE_PASSWORD}/${user?._id}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify({ oldPassword: passwords.oldPassword, newPassword: passwords.newPassword }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.message || 'Failed to change password'); return; }
      toast.success('Password changed successfully');
      setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch {
      toast.error('Could not connect to the server');
    } finally {
      setSavingPassword(false);
    }
  };

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '—';

  return (
    <div className="space-y-6 max-w-3xl">

      {/* Avatar card */}
      <Card className="border border-gray-100 overflow-hidden">
        <div className="h-24 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600" />
        <CardContent className="pt-0 pb-6 px-6">
          <div className="flex items-end gap-4 -mt-10">
            <div className="w-20 h-20 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center bg-gradient-to-br from-amber-400 to-orange-500">
              <span className="text-3xl font-bold text-white">
                {user?.name?.charAt(0).toUpperCase() ?? 'A'}
              </span>
            </div>
            <div className="mb-2">
              <h3 className="text-xl font-bold text-gray-900">{user?.name}</h3>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-500" /> Administrator
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-500" /> Member since {joinedDate}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile */}
      <Card className="border border-gray-100">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <User className="w-4 h-4 text-amber-500" /> Profile Information
          </CardTitle>
          <CardDescription>Update your display name and email address.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative mt-1.5">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="pl-9"
                    placeholder="Your name"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="pl-9"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={savingProfile}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6"
              >
                {savingProfile ? 'Saving…' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card className="border border-gray-100">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-500" /> Change Password
          </CardTitle>
          <CardDescription>Choose a strong password of at least 6 characters.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            {/* Current password */}
            <div>
              <Label htmlFor="oldPassword">Current Password</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="oldPassword"
                  type={showOld ? 'text' : 'password'}
                  value={passwords.oldPassword}
                  onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                  className="pl-9 pr-10"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowOld(!showOld)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* New password */}
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="newPassword"
                    type={showNew ? 'text' : 'password'}
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    className="pl-9 pr-10"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm password */}
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                    className="pl-9 pr-10"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Match indicator */}
            {passwords.newPassword && passwords.confirmPassword && (
              <p className={`text-xs ${passwords.newPassword === passwords.confirmPassword ? 'text-emerald-600' : 'text-red-500'}`}>
                {passwords.newPassword === passwords.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
              </p>
            )}

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={savingPassword}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6"
              >
                {savingPassword ? 'Updating…' : 'Update Password'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
