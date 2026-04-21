// app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, Users, Package, BookOpen, ShoppingCart, 
  TrendingUp, Settings, LogOut, Eye, Edit, Trash2, 
  Plus, Search, Loader2, DollarSign, Truck, Store,
  Home, Menu, X
} from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'ADMIN') {
      router.push('/');
      return;
    }
    setUser(parsedUser);
    fetchStats();
    setLoading(false);
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'emerald' },
    { id: 'users', label: 'Kelola User', icon: Users, color: 'blue' },
    { id: 'pupuk', label: 'Kelola Pupuk', icon: Package, color: 'purple' },
    { id: 'artikel', label: 'Kelola Artikel', icon: BookOpen, color: 'orange' },
    { id: 'transaksi', label: 'Transaksi', icon: ShoppingCart, color: 'red' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-30 bg-white p-2 rounded-lg shadow-md"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-20 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-5 border-b bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">🌾</span>
            </div>
            <div>
              <span className="font-bold text-white">AgriLink</span>
              <p className="text-white/70 text-xs">Admin Panel</p>
            </div>
          </div>
          <p className="text-white/80 text-sm mt-2">{user?.name}</p>
        </div>
        
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                activeTab === item.id
                  ? `bg-${item.color}-50 text-${item.color}-700 font-medium`
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className={`w-4 h-4 ${activeTab === item.id ? `text-${item.color}-500` : 'text-gray-400'}`} />
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            {menuItems.find(m => m.id === activeTab)?.label}
          </h1>
          <p className="text-gray-500 text-sm mt-1">Kelola data aplikasi AgriLink</p>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-emerald-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Total User</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.totalUsers || 0}</p>
                  </div>
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Total Pupuk</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.totalPupuk || 0}</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-purple-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Total Artikel</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.totalArtikel || 0}</p>
                  </div>
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-orange-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Total Transaksi</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.totalTransaksi || 0}</p>
                  </div>
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-5 text-white">
              <h2 className="text-lg font-bold">Selamat Datang, {user?.name}!</h2>
              <p className="text-emerald-100 text-sm mt-1">Anda dapat mengelola semua data aplikasi dari panel ini.</p>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && <UserManagement />}
        
        {/* Pupuk Tab */}
        {activeTab === 'pupuk' && <PupukManagement />}
        
        {/* Artikel Tab */}
        {activeTab === 'artikel' && <ArtikelManagement />}
        
        {/* Transaksi Tab */}
        {activeTab === 'transaksi' && <TransaksiManagement />}
      </div>
    </div>
  );
}

// ==================== KOMPONEN MANAGEMENT ====================

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.success) setUsers(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user: any) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    const colors: any = {
      ADMIN: 'bg-purple-100 text-purple-700',
      PETANI: 'bg-emerald-100 text-emerald-700',
      DISTRIBUTOR: 'bg-blue-100 text-blue-700',
      PENJUAL: 'bg-orange-100 text-orange-700',
    };
    return colors[role] || 'bg-gray-100 text-gray-700';
  };

  if (loading) return <div className="text-center py-8 text-gray-500">Loading...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-3">
        <h2 className="font-semibold text-gray-800">Daftar User</h2>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left text-xs font-medium text-gray-500">ID</th>
              <th className="p-3 text-left text-xs font-medium text-gray-500">Nama</th>
              <th className="p-3 text-left text-xs font-medium text-gray-500">Email</th>
              <th className="p-3 text-left text-xs font-medium text-gray-500">Role</th>
              <th className="p-3 text-left text-xs font-medium text-gray-500">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user: any) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="p-3 text-sm text-gray-600">{user.id}</td>
                <td className="p-3 text-sm font-medium text-gray-800">{user.name}</td>
                <td className="p-3 text-sm text-gray-500">{user.email}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadge(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PupukManagement() {
  const [pupuk, setPupuk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nama: '', icon: '🌿', warna: 'emerald', kandungan: '', harga: ''
  });

  useEffect(() => {
    fetchPupuk();
  }, []);

  const fetchPupuk = async () => {
    try {
      const res = await fetch('/api/pupuk');
      const data = await res.json();
      if (data.success) setPupuk(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/admin/pupuk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setShowModal(false);
      fetchPupuk();
      setFormData({ nama: '', icon: '🌿', warna: 'emerald', kandungan: '', harga: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Yakin ingin menghapus pupuk ini?')) {
      await fetch(`/api/admin/pupuk?id=${id}`, { method: 'DELETE' });
      fetchPupuk();
    }
  };

  if (loading) return <div className="text-center py-8 text-gray-500">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-800">Daftar Pupuk</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-emerald-700 transition"
        >
          <Plus className="w-4 h-4" /> Tambah Pupuk
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-xs font-medium text-gray-500">Icon</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500">Nama</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500">Kandungan</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500">Harga</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pupuk.map((item: any) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 text-2xl">{item.icon}</td>
                  <td className="p-3 font-medium text-gray-800">{item.nama}</td>
                  <td className="p-3 text-sm text-gray-500">{item.kandungan}</td>
                  <td className="p-3 text-sm font-medium text-emerald-600">Rp {item.harga?.toLocaleString()}</td>
                  <td className="p-3">
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah Pupuk */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Tambah Pupuk Baru</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pupuk</label>
                <input
                  type="text"
                  placeholder="Contoh: Urea"
                  value={formData.nama}
                  onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon (emoji)</label>
                <input
                  type="text"
                  placeholder="Contoh: 🌿"
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kandungan</label>
                <input
                  type="text"
                  placeholder="Contoh: N:46%"
                  value={formData.kandungan}
                  onChange={(e) => setFormData({...formData, kandungan: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Harga (per kg)</label>
                <input
                  type="number"
                  placeholder="Contoh: 7500"
                  value={formData.harga}
                  onChange={(e) => setFormData({...formData, harga: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition">Simpan</button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition">Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ArtikelManagement() {
  const [artikel, setArtikel] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtikel();
  }, []);

  const fetchArtikel = async () => {
    try {
      const res = await fetch('/api/artikel');
      const data = await res.json();
      if (data.success) setArtikel(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (confirm('Yakin ingin menghapus artikel ini?')) {
      await fetch(`/api/admin/artikel?slug=${slug}`, { method: 'DELETE' });
      fetchArtikel();
    }
  };

  if (loading) return <div className="text-center py-8 text-gray-500">Loading...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-gray-800">Daftar Artikel</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left text-xs font-medium text-gray-500">Judul</th>
              <th className="p-3 text-left text-xs font-medium text-gray-500">Kategori</th>
              <th className="p-3 text-left text-xs font-medium text-gray-500">Penulis</th>
              <th className="p-3 text-left text-xs font-medium text-gray-500">Dibaca</th>
              <th className="p-3 text-left text-xs font-medium text-gray-500">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {artikel.map((item: any) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-3 text-sm font-medium text-gray-800">{item.title}</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">{item.category}</span>
                </td>
                <td className="p-3 text-sm text-gray-500">{item.author}</td>
                <td className="p-3 text-sm text-gray-500">{item.views}</td>
                <td className="p-3">
                  <button onClick={() => handleDelete(item.slug)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TransaksiManagement() {
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransaksi();
  }, []);

  const fetchTransaksi = async () => {
    try {
      const res = await fetch('/api/admin/transaksi');
      const data = await res.json();
      if (data.success) setTransaksi(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: any = {
      menunggu: 'bg-yellow-100 text-yellow-700',
      diproses: 'bg-blue-100 text-blue-700',
      selesai: 'bg-green-100 text-green-700',
      batal: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  if (loading) return <div className="text-center py-8 text-gray-500">Loading...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-gray-800">Daftar Transaksi</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left text-xs font-medium text-gray-500">No. Order</th>
              <th className="p-3 text-left text-xs font-medium text-gray-500">Petani</th>
              <th className="p-3 text-left text-xs font-medium text-gray-500">Total</th>
              <th className="p-3 text-left text-xs font-medium text-gray-500">Status</th>
              <th className="p-3 text-left text-xs font-medium text-gray-500">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {transaksi.map((item: any) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-3 text-sm font-mono text-gray-600">{item.order_number}</td>
                <td className="p-3 text-sm text-gray-700">{item.petani_nama}</td>
                <td className="p-3 text-sm font-medium text-emerald-600">Rp {item.total_harga?.toLocaleString()}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-500">{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}