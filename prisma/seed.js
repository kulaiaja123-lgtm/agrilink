// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Data pupuk
  const pupukData = [
    { nama: 'Urea', icon: '🌿', warna: 'emerald', kandungan: 'N:46%', dosisPadi: 250, dosisJagung: 300, dosisCabai: 200, dosisKedelai: 150, manfaat: 'Merangsang pertumbuhan daun', caraAplikasi: 'Ditugal atau disebar', waktuAplikasi: '14-21 HST', harga: 7500 },
    { nama: 'NPK', icon: '🧪', warna: 'blue', kandungan: 'N:15% P:15% K:15%', dosisPadi: 300, dosisJagung: 350, dosisCabai: 400, dosisKedelai: 250, manfaat: 'Nutrisi seimbang', caraAplikasi: 'Ditebar merata', waktuAplikasi: '7,30,50 HST', harga: 8500 },
    { nama: 'ZA', icon: '⚪', warna: 'yellow', kandungan: 'N:21% S:24%', dosisPadi: 150, dosisJagung: 200, dosisCabai: 250, dosisKedelai: 100, manfaat: 'Nitrogen dan Sulfur', caraAplikasi: 'Disebar merata', waktuAplikasi: '14-21 HST', harga: 7200 },
    { nama: 'KCL', icon: '🧴', warna: 'red', kandungan: 'K:60%', dosisPadi: 100, dosisJagung: 150, dosisCabai: 200, dosisKedelai: 120, manfaat: 'Memperkuat batang', caraAplikasi: 'Ditebar atau ditugal', waktuAplikasi: '30-40 HST', harga: 9000 },
    { nama: 'SP-36', icon: '🔵', warna: 'indigo', kandungan: 'P:36%', dosisPadi: 100, dosisJagung: 150, dosisCabai: 200, dosisKedelai: 100, manfaat: 'Merangsang akar dan bunga', caraAplikasi: 'Ditebar sebelum tanam', waktuAplikasi: '1-2 minggu sebelum tanam', harga: 8200 },
    { nama: 'Phonska', icon: '💎', warna: 'purple', kandungan: 'N:15% P:15% K:15% + Mikro', dosisPadi: 300, dosisJagung: 350, dosisCabai: 400, dosisKedelai: 250, manfaat: 'Pupuk lengkap', caraAplikasi: 'Disebar merata', waktuAplikasi: '7,30,50 HST', harga: 8800 },
  ];

  for (const pupuk of pupukData) {
    await prisma.pupuk.upsert({
      where: { nama: pupuk.nama },
      update: {},
      create: pupuk,
    });
  }
  console.log('✅ Data pupuk berhasil ditambahkan!');

  // Data user demo
  const userData = [
    { name: 'Petani Demo', email: 'petani@agrilink.com', password: 'password123', role: 'PETANI' },
    { name: 'Distributor Demo', email: 'distributor@agrilink.com', password: 'password123', role: 'DISTRIBUTOR' },
    { name: 'Penjual Demo', email: 'penjual@agrilink.com', password: 'password123', role: 'PENJUAL' },
  ];

  for (const user of userData) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }
  console.log('✅ User demo berhasil ditambahkan!');

  console.log('\n📊 Akun Demo:');
  console.log('   Petani: petani@agrilink.com / password123');
  console.log('   Distributor: distributor@agrilink.com / password123');
  console.log('   Penjual: penjual@agrilink.com / password123');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });