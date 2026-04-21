// app/distributor/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChatBot from '@/components/ChatBot';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { 
  Package, TrendingUp, Users, Truck, 
  CheckCircle, AlertCircle, Search, 
  Plus, Eye, Edit, Trash2, LogOut,
  DollarSign, MapPin, Clock, Home,
  Leaf
} from 'lucide-react';

export default function DistributorPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('stok');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const stats = [
    { label: 'Total Stok', value: '12.5 ton', icon: Package, color: 'emerald', change: '+8%' },
    { label: 'Petani Aktif', value: '47', icon: Users, color: 'blue', change: '+12%' },
    { label: 'Permintaan', value: '8.45 ton', icon: TrendingUp, color: 'orange', change: '+23%' },
    { label: 'Omzet', value: 'Rp 96.5jt', icon: DollarSign, color: 'purple', change: '+15%' },
  ];

  const stokData = [
    { nama: 'Urea', stok: 5000, harga: 7500, status: 'Aman', icon: '🌿', warna: 'emerald' },
    { nama: 'NPK', stok: 3200, harga: 8500, status: 'Aman', icon: '🧪', warna: 'blue' },
    { nama: 'ZA', stok: 1800, harga: 7200, status: 'Menipis', icon: '⚪', warna: 'yellow' },
    { nama: 'KCL', stok: 2100, harga: 9000, status: 'Aman', icon: '🧴', warna: 'red' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header dengan Navigasi */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              <div>
                <h1 className="text-sm font-bold">Dashboard Distributor</h1>
                <p className="text-blue-100 text-xs">Selamat datang, {user.name}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="bg-white/20 p-1.5 rounded-lg">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
          
          {/* Tombol Navigasi - Hanya Home dan Dashboard Petani */}
          <div className="flex gap-2 mt-3">
            <Link 
              href="/" 
              className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-lg text-white text-sm"
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <Link 
              href="/petani" 
              className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-lg text-white text-sm"
            >
              <Leaf className="w-3.5 h-3.5" />
              Dashboard Petani
            </Link>
          
<Link 
  href="/blog" 
  className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-lg text-white text-sm"
>
  <BookOpen className="w-3.5 h-3.5" />
  Edukasi
</Link>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex gap-4 mt-4">
            <button 
              onClick={() => setActiveTab('stok')}
              className={`pb-2 text-sm font-medium transition ${activeTab === 'stok' ? 'border-b-2 border-white' : 'text-white/60'}`}
            >
              📦 Manajemen Stok
            </button>
            <button 
              onClick={() => setActiveTab('pesanan')}
              className={`pb-2 text-sm font-medium transition ${activeTab === 'pesanan' ? 'border-b-2 border-white' : 'text-white/60'}`}
            >
              📋 Pesanan
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {stats.map((stat, idx) => (
            <div key={idx} className={`bg-gradient-to-r from-${stat.color}-50 to-${stat.color}-100 rounded-xl p-3`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-xs">{stat.label}</p>
                  <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                  <p className="text-green-600 text-[10px]">{stat.change}</p>
                </div>
                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
            </div>
          ))}
        </div>

        {activeTab === 'stok' ? (
          <>
            <button className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 mb-4">
              <Plus className="w-4 h-4" />
              Tambah Stok Baru
            </button>

            <div className="space-y-3">
              {stokData.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-800">{item.nama}</p>
                        <p className="text-gray-400 text-xs">Rp {item.harga.toLocaleString()}/kg</p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'Aman' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.status}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-xs">Stok tersedia</p>
                      <p className="font-bold text-gray-800">{item.stok.toLocaleString()} kg</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 bg-gray-100 rounded-lg">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 bg-gray-100 rounded-lg">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                    <div className="bg-emerald-500 rounded-full h-1.5" style={{ width: `${Math.min((item.stok / 5000) * 100, 100)}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-gray-800">Urea 500 kg</p>
                  <p className="text-gray-500 text-xs">Pemesan: Pak Rahmat</p>
                  <p className="text-gray-400 text-xs flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" /> Kecamatan Cisarua
                  </p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Menunggu</span>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <Clock className="w-3 h-3" /> 2 jam lalu
                </div>
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  Proses
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-gray-800">NPK 300 kg</p>
                  <p className="text-gray-500 text-xs">Pemesan: Bu Siti</p>
                  <p className="text-gray-400 text-xs flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" /> Kecamatan Leuwiliang
                  </p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Diproses</span>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <Clock className="w-3 h-3" /> 5 jam lalu
                </div>
                <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium">
                  Selesai
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ChatBot />
    </div>
  );
}