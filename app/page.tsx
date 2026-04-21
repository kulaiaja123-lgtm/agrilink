// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calculator, Package, Bot, BookOpen, 
  TrendingUp, Shield, Users, Truck,
  ArrowRight, CheckCircle, Star, Eye, Calendar, User
} from 'lucide-react';

interface Artikel {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  views: number;
  created_at: string;
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [artikel, setArtikel] = useState<Artikel[]>([]);
  const [loadingArtikel, setLoadingArtikel] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchArtikel();
  }, []);

  const fetchArtikel = async () => {
    try {
      const response = await fetch('/api/artikel?limit=3');
      const data = await response.json();
      if (data.success) {
        setArtikel(data.data);
      }
    } catch (error) {
      console.error('Error fetching artikel:', error);
    } finally {
      setLoadingArtikel(false);
    }
  };

  const features = [
    { icon: Calculator, title: 'Kalkulator Pupuk', desc: 'Hitung kebutuhan pupuk sesuai lahan & tanaman', color: 'emerald', href: '/petani' },
    { icon: Package, title: 'Stok Real-Time', desc: 'Pantau ketersediaan pupuk di sekitar Anda', color: 'blue', href: '/distributor' },
    { icon: Bot, title: 'Chat AI Tani', desc: 'Tanya apa saja tentang pertanian', color: 'purple', href: '/petani' },
    { icon: BookOpen, title: 'Edukasi Penyakit', desc: 'Identifikasi hama & penyakit tanaman', color: 'orange', href: '/blog' },
  ];

  const stats = [
    { value: '50+', label: 'Jenis Pupuk', icon: Package },
    { value: '1000+', label: 'Petani Aktif', icon: Users },
    { value: '500+', label: 'Distributor', icon: Truck },
    { value: '95%', label: 'Kepuasan', icon: TrendingUp },
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">🌾</span>
            </div>
            <span className="font-bold text-xl text-gray-800">AgriLink</span>
          </div>
          <div className="hidden md:flex gap-6">
            <a href="#features" className="text-gray-600 hover:text-emerald-600">Fitur</a>
            <a href="#artikel" className="text-gray-600 hover:text-emerald-600">Artikel</a>
            <a href="#about" className="text-gray-600 hover:text-emerald-600">Tentang</a>
          </div>
          <div className="flex gap-2">
            <Link href="/login" className="px-4 py-2 text-emerald-600 font-medium rounded-lg hover:bg-emerald-50 transition">
              Masuk
            </Link>
            <Link href="/register" className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg hover:shadow-lg transition">
              Daftar
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full mb-6">
            <span className="text-emerald-600 text-sm">✨ Platform Pupuk Cerdas</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Pupuk Tepat,{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Panen Melimpah
            </span>
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto mb-6">
            Kalkulator pupuk, deteksi penyakit tanaman, dan koneksi langsung ke distributor dalam satu platform.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/register" className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold flex items-center gap-2 hover:shadow-xl transition text-sm">
              Mulai Sekarang <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#features" className="px-5 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:border-emerald-500 hover:text-emerald-600 transition text-sm">
              Lihat Fitur
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Fitur Unggulan</h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Kami menyediakan berbagai fitur untuk memudahkan petani, distributor, dan penjual pupuk
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, idx) => (
              <Link key={idx} href={feature.href} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
                <div className={`w-10 h-10 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-3`}>
                  <feature.icon className={`w-5 h-5 text-${feature.color}-600`} />
                </div>
                <h3 className="font-bold text-gray-800 mb-1 text-base">{feature.title}</h3>
                <p className="text-gray-500 text-xs">{feature.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Artikel Section */}
      <section id="artikel" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">📚 Artikel & Edukasi</h2>
              <p className="text-gray-500 text-sm">Panduan lengkap untuk pertanian Anda</p>
            </div>
            <Link href="/blog" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loadingArtikel ? (
            <div className="flex justify-center py-8">
              <div className="w-6 h-6 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : artikel.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-xl">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-400">Belum ada artikel</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-5">
              {artikel.map((item) => (
                <Link
                  key={item.id}
                  href={`/blog/${item.slug}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100"
                >
                  <div className="h-32 bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                    <span className="text-4xl">
                      {item.category === 'Padi' && '🌾'}
                      {item.category === 'Jagung' && '🌽'}
                      {item.category === 'Cabai' && '🌶️'}
                      {item.category === 'Hama' && '🐛'}
                      {!['Padi', 'Jagung', 'Cabai', 'Hama'].includes(item.category) && '📚'}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-1 line-clamp-2 text-sm">{item.title}</h3>
                    <p className="text-gray-500 text-xs line-clamp-2 mb-2">{item.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{item.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{item.views}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Siap Meningkatkan Hasil Panen?</h2>
          <p className="text-emerald-100 text-sm mb-5">Bergabunglah dengan ribuan petani yang sudah menggunakan AgriLink</p>
          <Link href="/register" className="inline-flex items-center gap-2 bg-white text-emerald-600 px-5 py-2.5 rounded-lg font-semibold hover:shadow-lg transition text-sm">
            Daftar Sekarang <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto text-center text-xs">
          <p>&copy; 2024 AgriLink. Platform Pupuk Cerdas untuk Petani Indonesia.</p>
        </div>
      </footer>
    </div>
  );
}