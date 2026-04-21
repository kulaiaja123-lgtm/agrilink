// app/toko/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingCart, Plus, Search, Home, BookOpen, Package } from 'lucide-react';

interface Pupuk {
  id: number;
  nama: string;
  icon: string;
  warna: string;
  kandungan: string;
  harga: number;
}

export default function TokoPage() {
  const router = useRouter();
  const [pupuk, setPupuk] = useState<Pupuk[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [addingId, setAddingId] = useState<number | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
    fetchPupuk();
    fetchCartCount();
  }, []);

  const fetchPupuk = async () => {
    try {
      const response = await fetch('/api/pupuk');
      const data = await response.json();
      if (data.success) {
        setPupuk(data.data);
      }
    } catch (error) {
      console.error('Error fetching pupuk:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCartCount = async () => {
    if (!user) return;
    try {
      const response = await fetch(`/api/cart?userId=${user.id}`);
      const data = await response.json();
      if (data.success) {
        const count = data.data.reduce((sum: number, item: any) => sum + item.jumlah, 0);
        setCartCount(count);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (pupukId: number) => {
    if (!user) return;
    setAddingId(pupukId);
    try {
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, pupukId, jumlah: 1 })
      });
      fetchCartCount();
      // Tampilkan notifikasi sederhana
      alert('Berhasil ditambahkan ke keranjang!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Gagal menambahkan ke keranjang');
    } finally {
      setAddingId(null);
    }
  };

  const filteredPupuk = pupuk.filter(item =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user || user.role !== 'PETANI') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Hanya untuk petani</p>
          <Link href="/" className="text-emerald-600">Kembali ke Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              <div>
                <h1 className="text-sm font-bold">Toko Pupuk</h1>
                <p className="text-emerald-100 text-xs">Beli pupuk kebutuhan Anda</p>
              </div>
            </div>
            <Link href="/keranjang" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
          
          {/* Navigasi */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            <Link href="/" className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-lg text-white text-xs">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <Link href="/petani" className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-lg text-white text-xs">
              <Package className="w-3.5 h-3.5" /> Kalkulator
            </Link>
            <Link href="/blog" className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-lg text-white text-xs">
              <BookOpen className="w-3.5 h-3.5" /> Edukasi
            </Link>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari pupuk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm"
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Grid Pupuk */}
        {!loading && (
          <>
            {filteredPupuk.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-400">Pupuk tidak ditemukan</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {filteredPupuk.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">{item.nama}</h3>
                        <p className="text-gray-400 text-[10px]">{item.kandungan}</p>
                      </div>
                    </div>
                    <p className="text-emerald-600 font-bold text-sm mb-2">Rp {item.harga.toLocaleString()}/kg</p>
                    <button
                      onClick={() => addToCart(item.id)}
                      disabled={addingId === item.id}
                      className="w-full bg-emerald-600 text-white py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1"
                    >
                      {addingId === item.id ? (
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Plus className="w-3 h-3" /> Tambah ke Keranjang
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}