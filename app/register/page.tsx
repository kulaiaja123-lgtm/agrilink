// app/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, UserPlus, User, Mail, Lock, Phone, MapPin, Briefcase, ArrowRight, Leaf, Shield, Zap } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'PETANI',
    phone: '',
    address: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const roles = [
    { value: 'PETANI', label: '👨‍🌾 Petani', desc: 'Mencari pupuk & informasi pertanian', color: 'emerald' },
    { value: 'DISTRIBUTOR', label: '🚚 Distributor', desc: 'Mendistribusikan pupuk ke penjual', color: 'blue' },
    { value: 'PENJUAL', label: '🏪 Penjual Pupuk', desc: 'Menjual pupuk ke petani', color: 'purple' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          phone: formData.phone,
          address: formData.address
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Registrasi berhasil! Silakan login.');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(data.error || 'Registrasi gagal');
      }
    } catch (err) {
      setError('Terjadi kesalahan, silakan coba lagi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 to-teal-700 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-xl">AgriLink</span>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-white">Bergabung dengan AgriLink!</h1>
            <p className="text-emerald-100 text-lg">
              Daftar sekarang dan dapatkan akses ke kalkulator pupuk, 
              pantau stok, dan berbagai fitur menarik lainnya.
            </p>
            
            <div className="flex gap-4 pt-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/80 text-sm">Data Aman</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/80 text-sm">Cepat & Akurat</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10">
          <p className="text-emerald-200/60 text-sm">
            © 2024 AgriLink. Platform Pupuk Cerdas untuk Petani Indonesia.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">AgriLink</h1>
            <p className="text-white/50 text-xs">Platform Pupuk Cerdas</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 md:p-7 border border-white/20 shadow-2xl">
            <div className="text-center mb-5">
              <h2 className="text-xl font-bold text-white">Daftar Akun</h2>
              <p className="text-white/50 text-xs mt-1">Isi data diri Anda dengan benar</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 text-sm text-center">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nama Lengkap */}
              <div>
                <label className="block text-white/60 text-xs mb-1">Nama Lengkap</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap"
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-3 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-white/60 text-xs mb-1">Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-3 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-white/60 text-xs mb-1">Daftar Sebagai</label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none"
                  >
                    {roles.map((role) => (
                      <option key={role.value} value={role.value} className="bg-slate-800">
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-white/30 text-[10px] mt-1">
                  {roles.find(r => r.value === formData.role)?.desc}
                </p>
              </div>

              {/* Password */}
              <div>
                <label className="block text-white/60 text-xs mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimal 6 karakter"
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-10 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-white/40" />
                    ) : (
                      <Eye className="w-4 h-4 text-white/40" />
                    )}
                  </button>
                </div>
              </div>

              {/* Konfirmasi Password */}
              <div>
                <label className="block text-white/60 text-xs mb-1">Konfirmasi Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Ulangi password"
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-10 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 text-white/40" />
                    ) : (
                      <Eye className="w-4 h-4 text-white/40" />
                    )}
                  </button>
                </div>
              </div>

              {/* No Telepon (Opsional) */}
              <div>
                <label className="block text-white/60 text-xs mb-1">No. Telepon (Opsional)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="08123456789"
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-3 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Alamat (Opsional) */}
              <div>
                <label className="block text-white/60 text-xs mb-1">Alamat (Opsional)</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Desa/Kecamatan, Kabupaten"
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-3 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Daftar Sekarang
                    <UserPlus className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 text-center">
              <p className="text-white/40 text-xs">
                Sudah punya akun?{' '}
                <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1 group">
                  Masuk
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}