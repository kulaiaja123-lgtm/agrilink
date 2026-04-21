// app/petani/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, ArrowLeft, LogOut, BookOpen, Store, ShoppingBag } from 'lucide-react';
import KalkulatorPetani from '@/components/KalkulatorPetani';

export default function PetaniPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [showCalculator, setShowCalculator] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Jika tidak menampilkan kalkulator (mode pilih pupuk)
  if (!showCalculator) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 sticky top-0 z-10">
          <div className="px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowCalculator(true)}
                  className="bg-white/20 p-2 rounded-lg"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <div>
                  <h1 className="text-lg font-bold text-white">Pilih Pupuk</h1>
                  <p className="text-white/70 text-xs">Kembali ke kalkulator</p>
                </div>
              </div>
              <button onClick={handleLogout} className="bg-white/20 p-2 rounded-lg">
                <LogOut className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="bg-white/10 rounded-xl p-6 text-center">
            <p className="text-white mb-4">Halaman pemilihan pupuk akan segera hadir</p>
            <button 
              onClick={() => setShowCalculator(true)}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg"
            >
              Kembali ke Kalkulator
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header dengan Navigasi */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <span className="text-xl">🌾</span>
              </div>
              <div>
                <h1 className="text-sm font-bold text-white">Dashboard Petani</h1>
                <p className="text-white/70 text-xs">Selamat datang, {user?.name}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="bg-white/20 p-1.5 rounded-lg">
              <LogOut className="w-4 h-4 text-white" />
            </button>
          </div>
          
          {/* Tombol Navigasi */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            <Link 
              href="/" 
              className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-lg text-white text-sm whitespace-nowrap"
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <button 
              onClick={() => setShowCalculator(false)}
              className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-lg text-white text-sm whitespace-nowrap"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Pilih Pupuk
            </button>
            <Link 
              href="/toko" 
              className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-lg text-white text-sm whitespace-nowrap"
            >
              <Store className="w-3.5 h-3.5" />
              Toko
            </Link>
            <Link 
              href="/pesanan-saya" 
              className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-lg text-white text-sm whitespace-nowrap"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Pesanan
            </Link>
            <Link 
              href="/blog" 
              className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-lg text-white text-sm whitespace-nowrap"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Edukasi
            </Link>
          </div>
        </div>
      </div>

      <KalkulatorPetani />
    </div>
  );
}