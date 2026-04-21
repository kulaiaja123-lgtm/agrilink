// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, LogIn, Mail, Lock, ArrowRight, Leaf, Shield, Zap } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
  localStorage.setItem('user', JSON.stringify(data.user));
  
  const role = data.user.role;
  if (role === 'ADMIN') {
    router.push('/admin');
  } else if (role === 'PETANI') {
    router.push('/petani');
  } else if (role === 'DISTRIBUTOR') {
    router.push('/distributor');
  } else if (role === 'PENJUAL') {
    router.push('/penjual');
  } else router.push('/');
      } else {
        setError(data.error || 'Email atau password salah');
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
            <h1 className="text-4xl font-bold text-white">Selamat Datang Kembali!</h1>
            <p className="text-emerald-100 text-lg">
              Masuk ke akun Anda untuk mengakses kalkulator pupuk, 
              pantau stok, dan dapatkan rekomendasi terbaik untuk pertanian Anda.
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
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">AgriLink</h1>
            <p className="text-white/50 text-sm">Platform Pupuk Cerdas</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white">Masuk ke Akun</h2>
              <p className="text-white/50 text-sm mt-1">Silakan masukkan kredensial Anda</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-white/70 text-sm mb-2">Email</label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contoh@email.com"
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-11 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Password</label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-11 pr-12 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-white/40" />
                    ) : (
                      <Eye className="w-5 h-5 text-white/40" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Masuk
                    <LogIn className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/40 text-sm">
                Belum punya akun?{' '}
                <Link href="/register" className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1 group">
                  Daftar Sekarang
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                </Link>
              </p>
            </div>

            {/* Demo Accounts */}
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-white/40 text-xs text-center mb-2">📋 Akun Demo</p>
              <div className="space-y-1 text-center">
                <p className="text-white/30 text-xs">🌾 Petani: petani@agrilink.com / password123</p>
                <p className="text-white/30 text-xs">🚚 Distributor: distributor@agrilink.com / password123</p>
                <p className="text-white/30 text-xs">🏪 Penjual: penjual@agrilink.com / password123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}