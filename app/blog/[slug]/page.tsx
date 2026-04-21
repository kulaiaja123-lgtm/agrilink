// app/blog/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Eye, BookOpen } from 'lucide-react';

interface Artikel {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: string;
  author: string;
  views: number;
  created_at: string;
}

export default function ArtikelDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [artikel, setArtikel] = useState<Artikel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.slug) {
      fetchArtikel();
    }
  }, [params?.slug]);

  const fetchArtikel = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/artikel/${params.slug}`);
      const data = await response.json();
      if (data.success) {
        setArtikel(data.data);
      } else {
        router.push('/blog');
      }
    } catch (error) {
      console.error('Error fetching artikel:', error);
      router.push('/blog');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const renderContent = (content: string) => {
    return content.split('\n').map((paragraph, idx) => {
      if (paragraph.startsWith('# ')) {
        return <h1 key={idx} className="text-2xl font-bold text-gray-800 mt-6 mb-3">{paragraph.slice(2)}</h1>;
      }
      if (paragraph.startsWith('## ')) {
        return <h2 key={idx} className="text-xl font-bold text-gray-800 mt-5 mb-2">{paragraph.slice(3)}</h2>;
      }
      if (paragraph.startsWith('### ')) {
        return <h3 key={idx} className="text-lg font-bold text-gray-800 mt-4 mb-2">{paragraph.slice(4)}</h3>;
      }
      if (paragraph.startsWith('- ')) {
        return <li key={idx} className="ml-5 text-gray-600 text-sm mb-1">{paragraph.slice(2)}</li>;
      }
      if (paragraph.trim()) {
        return <p key={idx} className="text-gray-600 text-sm leading-relaxed mb-3">{paragraph}</p>;
      }
      return <div key={idx} className="h-1"></div>;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!artikel) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-3xl mx-auto px-4 py-5">
          <Link href="/blog" className="inline-flex items-center gap-1 text-white/80 hover:text-white mb-3 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{artikel.category}</span>
          </div>
          <h1 className="text-xl font-bold">{artikel.title}</h1>
          <div className="flex flex-wrap gap-3 mt-3 text-xs text-white/70">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{artikel.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(artikel.created_at)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{artikel.views} dibaca</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-5">
          {renderContent(artikel.content)}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 text-sm font-medium"
          >
            <BookOpen className="w-4 h-4" />
            Lihat artikel lainnya
          </Link>
        </div>
      </div>
    </div>
  );
}