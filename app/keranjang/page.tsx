// app/keranjang/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard, Home, Package, BookOpen, Loader2 } from 'lucide-react';

interface CartItem {
  id: number;
  pupuk_id: number;
  nama: string;
  icon: string;
  harga: number;
  jumlah: number;
}

export default function KeranjangPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    fetchCart(parsedUser.id);
  }, []);

  const fetchCart = async (userId: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/cart?userId=${userId}`);
      const data = await response.json();
      console.log('Cart data:', data);
      if (data.success) {
        setCart(data.data || []);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartId: number, newJumlah: number) => {
    try {
      await fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartId, jumlah: newJumlah })
      });
      if (user) {
        fetchCart(user.id);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCart = async (cartId: number) => {
    try {
      await fetch(`/api/cart?id=${cartId}`, { method: 'DELETE' });
      if (user) {
        fetchCart(user.id);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const checkout = async () => {
    if (cart.length === 0) {
      alert('Keranjang kosong!');
      return;
    }
    
    setCheckoutLoading(true);
    try {
      const response = await fetch('/api/pesanan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          petaniId: user.id,
          penjualId: 3,
          cartItems: cart.map(item => ({
            pupuk_id: item.pupuk_id,
            jumlah: item.jumlah,
            harga: item.harga
          })),
          catatan: ''
        })
      });
      const data = await response.json();
      if (data.success) {
        alert(`Pesanan berhasil! No. Order: ${data.orderNumber}`);
        router.push('/pesanan-saya');
      } else {
        alert('Gagal checkout: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Gagal checkout');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const totalHarga = cart.reduce((sum, item) => sum + (item.harga * item.jumlah), 0);

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
            <Link href="/toko" className="text-white/80">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-sm font-bold">Keranjang Belanja</h1>
              <p className="text-emerald-100 text-xs">{cart.length} item</p>
            </div>
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
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
          </div>
        ) : cart.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">Keranjang belanja masih kosong</p>
            <Link href="/toko" className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm">
              Belanja Sekarang
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-3 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">{item.nama}</h3>
                        <p className="text-emerald-600 text-xs font-medium">Rp {item.harga.toLocaleString()}/kg</p>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.jumlah - 1)}
                        className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.jumlah} kg</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.jumlah + 1)}
                        className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="font-semibold text-gray-800">Rp {(item.harga * item.jumlah).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 text-sm">Total Belanja</span>
                <span className="text-xl font-bold text-emerald-600">Rp {totalHarga.toLocaleString()}</span>
              </div>
            </div>

            {/* Tombol Checkout */}
            <button
              onClick={checkout}
              disabled={checkoutLoading || cart.length === 0}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {checkoutLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  Checkout Sekarang
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}