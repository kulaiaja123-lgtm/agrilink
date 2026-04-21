// app/pesanan-saya/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, Clock, CheckCircle, XCircle, Truck, Home, BookOpen, Store, Loader2 } from 'lucide-react';

interface Pesanan {
  id: number;
  order_number: string;
  status: string;
  total_harga: number;
  created_at: string;
  details: any[];
}

export default function PesananSayaPage() {
  const router = useRouter();
  const [pesanan, setPesanan] = useState<Pesanan[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    fetchPesanan(parsedUser.id, parsedUser.role);
  }, []);

  const fetchPesanan = async (userId: number, role: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/pesanan?userId=${userId}&role=${role}`);
      const data = await response.json();
      console.log('Pesanan data:', data);
      if (data.success) {
        setPesanan(data.data || []);
      } else {
        setPesanan([]);
      }
    } catch (error) {
      console.error('Error fetching pesanan:', error);
      setPesanan([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'menunggu': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'diproses': return <Truck className="w-4 h-4 text-blue-500" />;
      case 'selesai': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'batal': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'menunggu': return 'Menunggu Konfirmasi';
      case 'diproses': return 'Sedang Diproses';
      case 'selesai': return 'Selesai';
      case 'batal': return 'Dibatalkan';
      default: return status;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center gap-2">
            <div>
              <h1 className="text-sm font-bold">Pesanan Saya</h1>
              <p className="text-emerald-100 text-xs">{user.name}</p>
            </div>
          </div>
          
          {/* Navigasi */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            <Link href="/" className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-lg text-white text-xs">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <Link href="/toko" className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-lg text-white text-xs">
              <Store className="w-3.5 h-3.5" /> Toko
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
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
          </div>
        ) : pesanan.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">Belum ada pesanan</p>
            <Link href="/toko" className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm">
              Belanja Sekarang
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {pesanan.map((order) => (
              <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-xs font-mono text-gray-500">{order.order_number}</p>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(order.created_at)}</p>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100">
                    {getStatusIcon(order.status)}
                    <span className="text-xs font-medium">{getStatusText(order.status)}</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-3">
                  {order.details && order.details.map((detail: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center text-sm py-1 border-b border-gray-100 last:border-0">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{detail.icon}</span>
                        <span className="text-gray-700">{detail.nama}</span>
                        <span className="text-gray-400 text-xs">x{detail.jumlah} kg</span>
                      </div>
                      <span className="font-medium text-gray-800">Rp {(detail.harga * detail.jumlah).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total</span>
                  <span className="font-bold text-emerald-600">Rp {order.total_harga.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}