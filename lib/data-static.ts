// lib/data-static.ts

export const pupukData = [
  { id: 1, nama: 'Urea', icon: '🌿', warna: 'emerald', kandungan: 'N:46%', harga: 7500 },
  { id: 2, nama: 'NPK', icon: '🧪', warna: 'blue', kandungan: 'N:15% P:15% K:15%', harga: 8500 },
  { id: 3, nama: 'ZA', icon: '⚪', warna: 'yellow', kandungan: 'N:21% S:24%', harga: 7200 },
  { id: 4, nama: 'KCL', icon: '🧴', warna: 'red', kandungan: 'K:60%', harga: 9000 },
  { id: 5, nama: 'SP-36', icon: '🔵', warna: 'indigo', kandungan: 'P:36%', harga: 8200 },
  { id: 6, nama: 'Phonska', icon: '💎', warna: 'purple', kandungan: 'N:15% P:15% K:15% + Mikro', harga: 8800 },
];

export const artikelData = [
  { id: 1, title: 'Panduan Lengkap Budidaya Padi', slug: 'panduan-budidaya-padi', category: 'Padi', excerpt: 'Panduan lengkap menanam padi dari persiapan lahan hingga panen.', content: '# Panduan Budidaya Padi\n\n## Persiapan Lahan\n...', author: 'Tim AgriLink', views: 150, created_at: new Date().toISOString() },
  { id: 2, title: 'Mengenal Hama Walang Sangit', slug: 'hama-walang-sangit', category: 'Hama', excerpt: 'Kenali ciri-ciri walang sangit dan cara efektif memberantasnya.', content: '# Hama Walang Sangit\n\n## Ciri-ciri Serangan\n...', author: 'Tim AgriLink', views: 120, created_at: new Date().toISOString() },
  { id: 3, title: 'Panduan Pemupukan Jagung', slug: 'pemupukan-jagung', category: 'Jagung', excerpt: 'Dosis dan waktu pemupukan jagung untuk hasil maksimal.', content: '# Pemupukan Jagung\n\n## Kebutuhan Pupuk\n...', author: 'Tim AgriLink', views: 98, created_at: new Date().toISOString() },
  { id: 4, title: 'Mengatasi Cabai Layu', slug: 'atasi-cabai-layu', category: 'Cabai', excerpt: 'Penyebab dan solusi tanaman cabai yang layu.', content: '# Cabai Layu\n\n## Penyebab\n...', author: 'Tim AgriLink', views: 85, created_at: new Date().toISOString() },
];

export const userData = [
  { id: 1, name: 'Petani Demo', email: 'petani@agrilink.com', password: 'password123', role: 'PETANI', phone: '081234567890', address: 'Desa Sukamakmur, Bogor' },
  { id: 2, name: 'Distributor Demo', email: 'distributor@agrilink.com', password: 'password123', role: 'DISTRIBUTOR', phone: '081234567891', address: 'Gudang Pusat, Jakarta' },
  { id: 3, name: 'Penjual Demo', email: 'penjual@agrilink.com', password: 'password123', role: 'PENJUAL', phone: '081234567892', address: 'Toko Tani Sejahtera, Bogor' },
  { id: 4, name: 'Super Admin', email: 'admin@agrilink.com', password: 'admin123', role: 'ADMIN', phone: '081234567893', address: 'Kantor Pusat, Jakarta' },
];