// insert-pupuk.js
const Database = require('better-sqlite3');
const db = new Database('database.sqlite');

// Hapus data lama
db.prepare('DELETE FROM pupuk').run();

// Insert data pupuk
const insertPupuk = db.prepare(`
  INSERT INTO pupuk (nama, icon, warna, kandungan, dosis_padi, dosis_jagung, dosis_cabai, dosis_kedelai, manfaat, cara_aplikasi, waktu_aplikasi, harga)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const pupukData = [
  ['Urea', '🌿', 'emerald', 'N:46%', 250, 300, 200, 150, 'Merangsang pertumbuhan daun', 'Ditugal atau disebar', '14-21 HST', 7500],
  ['NPK', '🧪', 'blue', 'N:15% P:15% K:15%', 300, 350, 400, 250, 'Nutrisi seimbang', 'Ditebar merata', '7,30,50 HST', 8500],
  ['ZA', '⚪', 'yellow', 'N:21% S:24%', 150, 200, 250, 100, 'Nitrogen dan Sulfur', 'Disebar merata', '14-21 HST', 7200],
  ['KCL', '🧴', 'red', 'K:60%', 100, 150, 200, 120, 'Memperkuat batang', 'Ditebar atau ditugal', '30-40 HST', 9000],
  ['SP-36', '🔵', 'indigo', 'P:36%', 100, 150, 200, 100, 'Merangsang akar dan bunga', 'Ditebar sebelum tanam', '1-2 minggu sebelum tanam', 8200],
  ['Phonska', '💎', 'purple', 'N:15% P:15% K:15% + Mikro', 300, 350, 400, 250, 'Pupuk lengkap', 'Disebar merata', '7,30,50 HST', 8800],
];

for (const p of pupukData) {
  insertPupuk.run(p);
}

console.log('✅ 6 data pupuk berhasil ditambahkan!');
console.log('📦 Daftar pupuk: Urea, NPK, ZA, KCL, SP-36, Phonska');