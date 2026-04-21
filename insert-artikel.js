// insert-artikel.js
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'database.sqlite');
const db = new Database(dbPath);

// Cek apakah tabel artikel sudah ada
const tableCheck = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='artikel'").get();
if (!tableCheck) {
  console.log('❌ Tabel artikel belum ada! Jalankan node lib/database.js terlebih dahulu');
  process.exit(1);
}

const artikelData = [
  {
    title: 'Panduan Lengkap Budidaya Padi',
    slug: 'panduan-budidaya-padi',
    category: 'Padi',
    excerpt: 'Panduan lengkap menanam padi dari persiapan lahan hingga panen.',
    content: `# Panduan Lengkap Budidaya Padi

## Persiapan Lahan
1. Bajak tanah sedalam 20-30 cm
2. Biarkan tanah kering selama 2 minggu
3. Genangi air setinggi 5-10 cm
4. Lakukan penggaruan untuk meratakan tanah

## Pemilihan Bibit
Gunakan bibit unggul seperti:
- Ciherang (tahan hama)
- Inpari 32 (produktivitas tinggi)
- Mekongga (umur pendek)

## Pemupukan
- 7 HST: Urea 50 kg + NPK 50 kg
- 30 HST: Urea 75 kg + NPK 100 kg + ZA 50 kg + KCL 50 kg
- 50 HST: Urea 75 kg + NPK 100 kg + KCL 50 kg

## Panen
Ciri-ciri siap panen:
- 80-90% gabah menguning
- Batang agak kering
- Umur 110-125 hari tergantung varietas`,
    image: 'https://images.unsplash.com/photo-1596003906949-67221c37965c?w=800',
    author: 'Tim AgriLink'
  },
  {
    title: 'Mengenal Hama Walang Sangit dan Cara Mengatasinya',
    slug: 'hama-walang-sangit',
    category: 'Hama',
    excerpt: 'Kenali ciri-ciri walang sangit dan cara efektif memberantasnya.',
    content: `# Hama Walang Sangit pada Padi

## Ciri-ciri Serangan
- Bulir padi menjadi hampa
- Warna bulir berubah menjadi kecoklatan
- Ada bau tidak sedap saat dipegang

## Pengendalian Kimia
Insektisida yang efektif:
- Sipermetrin 50 EC (0.5-1 ml/liter)
- Klorpirifos 200 EC (1-2 ml/liter)

## Waktu Aplikasi
- Pagi atau sore hari
- Saat tidak hujan
- Ulangi setiap 7-14 hari jika diperlukan`,
    image: 'https://images.unsplash.com/photo-1596003906949-67221c37965c?w=800',
    author: 'Tim AgriLink'
  },
  {
    title: 'Panduan Pemupukan Jagung yang Tepat',
    slug: 'pemupukan-jagung-tepat',
    category: 'Jagung',
    excerpt: 'Dosis dan waktu pemupukan jagung untuk hasil maksimal.',
    content: `# Panduan Pemupukan Jagung

## Pupuk Dasar (Saat Tanam)
- Urea: 100 kg
- SP-36: 150 kg
- KCL: 50 kg

## Pupuk Susulan I (15-20 HST)
- Urea: 150 kg
- NPK: 150 kg

## Pupuk Susulan II (40-45 HST)
- Urea: 100 kg
- KCL: 100 kg

## Tanda Kekurangan Unsur Hara
- N: Daun menguning dari ujung ke pangkal
- P: Tanaman kerdil, daun ungu kemerahan
- K: Ujung daun kering seperti terbakar`,
    image: 'https://images.unsplash.com/photo-1551754655-cd27e9c5c48c?w=800',
    author: 'Tim AgriLink'
  },
  {
    title: 'Cara Mengatasi Tanaman Cabai yang Layu',
    slug: 'cara-mengatasi-cabai-layu',
    category: 'Cabai',
    excerpt: 'Penyebab dan solusi tanaman cabai yang layu dan mati.',
    content: `# Mengatasi Tanaman Cabai Layu

## Penyebab Cabai Layu

### Layu Fusarium
- Gejala: Daun menguning, layu, batang coklat
- Solusi: Gunakan fungisida, rotasi tanaman

### Layu Bakteri
- Gejala: Layu tiba-tiba, batang berlendir
- Solusi: Cabut dan bakar, beri kapur dolomit

### Kekurangan Air
- Gejala: Layu pada siang hari
- Solusi: Irigasi rutin pagi/sore

## Pencegahan
1. Tanam varietas tahan
2. Sterilisasi lahan dengan kapur
3. Rotasi tanaman
4. Drainase yang baik`,
    image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=800',
    author: 'Tim AgriLink'
  }
];

const insertArtikel = db.prepare(`
  INSERT OR IGNORE INTO artikel (title, slug, category, excerpt, content, image, author)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

let count = 0;
for (const artikel of artikelData) {
  const result = insertArtikel.run(
    artikel.title,
    artikel.slug,
    artikel.category,
    artikel.excerpt,
    artikel.content,
    artikel.image,
    artikel.author
  );
  if (result.changes > 0) count++;
}

console.log(`✅ ${count} data artikel berhasil ditambahkan!`);
console.log('📚 Artikel yang tersedia:');
console.log('   - Panduan Lengkap Budidaya Padi');
console.log('   - Mengenal Hama Walang Sangit');
console.log('   - Panduan Pemupukan Jagung yang Tepat');
console.log('   - Cara Mengatasi Tanaman Cabai yang Layu');