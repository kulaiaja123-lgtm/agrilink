// app/blog/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Calendar, User, Eye, BookOpen, Leaf, Bug, Wheat, Apple } from 'lucide-react';

interface Artikel {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  views: number;
  created_at: string;
}

export default function BlogPage() {
  const [artikel, setArtikel] = useState<Artikel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'semua', nama: 'Semua', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'Padi', nama: 'Padi', icon: <Leaf className="w-4 h-4" /> },
    { id: 'Jagung', nama: 'Jagung', icon: <Wheat className="w-4 h-4" /> },
    { id: 'Cabai', nama: 'Cabai', icon: <Apple className="w-4 h-4" /> },
    { id: 'Hama', nama: 'Hama', icon: <Bug className="w-4 h-4" /> },
  ];

  useEffect(() => {
    fetchArtikel();
  }, [selectedCategory]);

  const fetchArtikel = async () => {
    setLoading(true);
    try {
      const url = selectedCategory !== 'semua' 
        ? `/api/artikel?category=${selectedCategory}`
        : '/api/artikel';
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setArtikel(data.data);
      }
    } catch (error) {
      console.error('Error fetching artikel:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArtikel = artikel.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-7 h-7" />
            <div>
              <h1 className="text-xl font-bold">Edukasi Pertanian</h1>
              <p className="text-emerald-100 text-sm">Artikel dan panduan lengkap untuk petani</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari artikel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat.icon}
                {cat.nama}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Grid Artikel */}
        {!loading && (
          <>
            {filteredArtikel.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Belum ada artikel dalam kategori ini</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredArtikel.map((item) => (
                  <Link
                    key={item.id}
                    href={`/blog/${item.slug}`}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="h-36 bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                      <span className="text-5xl">
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
                      <h2 className="font-bold text-gray-800 mb-1 group-hover:text-emerald-600 transition line-clamp-2 text-sm">
                        {item.title}
                      </h2>
                      <p className="text-gray-500 text-xs mb-3 line-clamp-2">
                        {item.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{item.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(item.created_at)}</span>
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
          </>
        )}
      </div>
    </div>
  );
}