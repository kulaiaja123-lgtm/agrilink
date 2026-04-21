// cek-pupuk.js
const Database = require('better-sqlite3');
const db = new Database('database.sqlite');

const pupuk = db.prepare('SELECT * FROM pupuk').all();
console.log('Jumlah pupuk:', pupuk.length);
console.log('Data pupuk:', pupuk);