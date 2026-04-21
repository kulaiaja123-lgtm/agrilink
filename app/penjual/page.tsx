// app/penjual/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChatBot from '@/components/ChatBot';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { 
  Store, Package, TrendingUp, ShoppingCart,
  Plus, Trash2, Eye, Edit, LogOut,
  DollarSign, Clock, CheckCircle, XCircle,
  Search, Home, Leaf, Truck
} from 'lucide-react';

export default function PenjualPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('stok');
  const [searchTerm, setSearchTerm] = useState('');

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

  const [stokToko, setStokToko] = useState([
    { id: 1, nama: 'Urea', jumlah: 250, harga: 8000, icon: '🌿', terjual: 45 },
    { id: 2, nama: 'NPK', jumlah: 180, harga: 9000, icon: '🧪', terjual: 32 },
    { id: 3, nama: 'ZA', jumlah: 95, harga: 7800, icon: '⚪', terjual: 28 },
  ]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const totalStok = stokToko.reduce((sum, item) => sum + item.jumlah, 0);
  const totalNilai = stokToko.reduce((sum, item) => sum + (item.jumlah * item.harga), 0);
  const totalTerjual = stokToko.reduce((sum, item) => sum + item.terjual, 0);

  const stats = [
    { label: 'Total Stok', value: totalStok, unit: 'kg', icon: Package, color: 'emerald' },
    { label: 'Nilai Stok', value: `Rp ${(totalNilai/1000).toFixed(0)}`, unit: 'rb', icon: DollarSign, color: 'blue' },
    { label: 'Terjual', value: totalTerjual, unit: 'kg', icon: TrendingUp, color: 'purple' },
    { label: 'Pesanan', value: '3', unit: '', icon: ShoppingCart, color: 'orange' },
  ];

  const filteredStok = stokToko.filter(item => 
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header dengan Navigasi */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5" />
              <div>
                <h1 className="text-sm font-bold">Dashboard Penjual</h1>
                <p className="text-gray-300 text-xs">Selamat datang, {user.name}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="bg-white/20 p-1.5 rounded-lg">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
          
          {/* Tombol Navigasi - Home, Dashboard Distributor, Dashboard Petani */}
          <div className="flex gap-2 mt-3">
            <Link 
              href="/" 
              className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-lg text-white text-sm"
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <Link 
              href="/distributor" 
              className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-lg text-white text-sm"
            >
              <Truck className="w-3.5 h-3.5" />
              Dashboard Distributor
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
              📦 Stok Toko
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
                </div>
                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
            </div>
          ))}
        </div>

        {activeTab === 'stok' ? (
          <>
            <div className="flex gap-2 mb-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari pupuk..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1">
                <Plus className="w-4 h-4" /> Tambah
              </button>
            </div>

            <div className="space-y-3">
              {filteredStok.map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-800">{item.nama}</p>
                        <p className="text-gray-400 text-xs">Rp {item.harga.toLocaleString()}/kg</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button className="p-1.5 bg-gray-100 rounded-lg">
                        <Eye className="w-3.5 h-3.5 text-gray-600" />
                      </button>
                      <button className="p-1.5 bg-gray-100 rounded-lg">
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-xs">Stok</p>
                      <p className="font-bold text-gray-800">{item.jumlah} kg</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Terjual</p>
                      <p className="font-medium text-gray-700">{item.terjual} kg</p>
                    </div>
                    <div>
                      {item.jumlah > 0 ? (
                        <span className="flex items-center gap-1 text-green-600 text-xs">
                          <CheckCircle className="w-3 h-3" /> Tersedia
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-600 text-xs">
                          <XCircle className="w-3 h-3" /> Habis
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                    <div className="bg-emerald-500 rounded-full h-1.5" style={{ width: `${(item.jumlah / 300) * 100}%` }}></div>
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
                  <p className="font-semibold text-gray-800">🌿 Urea 50 kg</p>
                  <p className="text-gray-500 text-xs">Pemesan: Pak Ahmad</p>
                  <p className="text-gray-400 text-xs flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" /> 2 jam lalu
                  </p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Menunggu</span>
              </div>
              <button className="w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium mt-2">
                Proses Pesanan
              </button>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-gray-800">🧪 NPK 30 kg</p>
                  <p className="text-gray-500 text-xs">Pemesan: Bu Dewi</p>
                  <p className="text-gray-400 text-xs flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" /> 5 jam lalu
                  </p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Diproses</span>
              </div>
              <button className="w-full bg-gray-200 text-gray-600 py-2 rounded-lg text-sm font-medium mt-2">
                Tandai Selesai
              </button>
            </div>
          </div>
        )}
      </div>
      <ChatBot />
    </div>
  );
}