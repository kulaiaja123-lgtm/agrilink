// lib/database.js
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'database.sqlite');
const db = new Database(dbPath);

// Buat semua tabel
db.exec(`
  -- Tabel User
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'PETANI',
    phone TEXT,
    address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );


-- Tabel Keranjang (Cart)
CREATE TABLE IF NOT EXISTS cart (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  pupuk_id INTEGER NOT NULL,
  jumlah INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (pupuk_id) REFERENCES pupuk(id)
);

-- Tabel Pesanan
CREATE TABLE IF NOT EXISTS pesanan (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_number TEXT UNIQUE NOT NULL,
  petani_id INTEGER NOT NULL,
  penjual_id INTEGER NOT NULL,
  status TEXT DEFAULT 'menunggu',
  total_harga INTEGER NOT NULL,
  catatan TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (petani_id) REFERENCES users(id),
  FOREIGN KEY (penjual_id) REFERENCES users(id)
);

-- Tabel Detail Pesanan
CREATE TABLE IF NOT EXISTS pesanan_detail (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pesanan_id INTEGER NOT NULL,
  pupuk_id INTEGER NOT NULL,
  jumlah INTEGER NOT NULL,
  harga INTEGER NOT NULL,
  FOREIGN KEY (pesanan_id) REFERENCES pesanan(id),
  FOREIGN KEY (pupuk_id) REFERENCES pupuk(id)
);
  -- Tabel Pupuk
  CREATE TABLE IF NOT EXISTS pupuk (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT UNIQUE NOT NULL,
    icon TEXT DEFAULT '🌿',
    warna TEXT DEFAULT 'green',
    kandungan TEXT,
    dosis_padi INTEGER DEFAULT 0,
    dosis_jagung INTEGER DEFAULT 0,
    dosis_cabai INTEGER DEFAULT 0,
    dosis_kedelai INTEGER DEFAULT 0,
    manfaat TEXT,
    cara_aplikasi TEXT,
    waktu_aplikasi TEXT,
    harga INTEGER DEFAULT 0
  );

  -- Tabel Stok
  CREATE TABLE IF NOT EXISTS stok (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    pupuk_id INTEGER NOT NULL,
    jumlah INTEGER DEFAULT 0,
    harga INTEGER DEFAULT 0,
    lokasi TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (pupuk_id) REFERENCES pupuk(id)
  );

  -- Tabel Transaksi
  CREATE TABLE IF NOT EXISTS transaksi (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    petani_id INTEGER NOT NULL,
    penjual_id INTEGER NOT NULL,
    pupuk_id INTEGER NOT NULL,
    jumlah INTEGER NOT NULL,
    total_harga INTEGER NOT NULL,
    status TEXT DEFAULT 'MENUNGGU',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (petani_id) REFERENCES users(id),
    FOREIGN KEY (penjual_id) REFERENCES users(id),
    FOREIGN KEY (pupuk_id) REFERENCES pupuk(id)
  );

  -- Tabel Artikel Edukasi
  CREATE TABLE IF NOT EXISTS artikel (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    image TEXT,
    category TEXT,
    author TEXT,
    views INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Insert data pupuk awal jika belum ada
const pupukCount = db.prepare('SELECT COUNT(*) as count FROM pupuk').get();
if (pupukCount.count === 0) {
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
  console.log('✅ Data pupuk awal ditambahkan');
}

// Insert user demo jika belum ada
const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
if (userCount.count === 0) {
  const insertUser = db.prepare(`
    INSERT INTO users (name, email, password, role)
    VALUES (?, ?, ?, ?)
  `);

  insertUser.run('Petani Demo', 'petani@agrilink.com', 'password123', 'PETANI');
  insertUser.run('Distributor Demo', 'distributor@agrilink.com', 'password123', 'DISTRIBUTOR');
  insertUser.run('Penjual Demo', 'penjual@agrilink.com', 'password123', 'PENJUAL');
  console.log('✅ User demo ditambahkan');
}
// Insert admin user
const adminCheck = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@agrilink.com');
if (!adminCheck) {
  const insertAdmin = db.prepare(`
    INSERT INTO users (name, email, password, role)
    VALUES (?, ?, ?, ?)
  `);
  insertAdmin.run('Super Admin', 'admin@agrilink.com', 'admin123', 'ADMIN');
  console.log('✅ Admin user ditambahkan');
}
console.log('✅ Database SQLite siap!');
console.log('📁 Lokasi:', dbPath);
console.log('📊 User demo: petani@agrilink.com / password123');

module.exports = db;