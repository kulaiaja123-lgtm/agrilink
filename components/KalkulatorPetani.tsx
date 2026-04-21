// components/KalkulatorPetani.tsx
'use client';
import { useState } from 'react';
import { 
  Calculator, Ruler, Sprout, Package, TrendingUp, 
  CheckCircle, Info, Sun, Droplet, ArrowLeft,
  Zap, Leaf, Flower2, Trees
} from 'lucide-react';

// Database pupuk lengkap
const dataPupuk = {
  urea: {
    id: 'urea',
    nama: 'Urea',
    icon: '🌿',
    warna: 'emerald',
    kandungan: 'N:46%',
    dosisStandar: { padi: 250, jagung: 300, cabai: 200, kedelai: 150 },
    manfaat: 'Merangsang pertumbuhan daun, batang, dan warna hijau tanaman',
    caraAplikasi: 'Ditugal atau disebar merata, sebaiknya pada pagi hari',
    waktuAplikasi: '14-21 HST',
    harga: 7500
  },
  npk: {
    id: 'npk',
    nama: 'NPK',
    icon: '🧪',
    warna: 'blue',
    kandungan: 'N:15% P:15% K:15%',
    dosisStandar: { padi: 300, jagung: 350, cabai: 400, kedelai: 250 },
    manfaat: 'Nutrisi seimbang untuk pertumbuhan vegetatif dan generatif',
    caraAplikasi: 'Ditebar merata atau ditugal di sekitar tanaman',
    waktuAplikasi: '7, 30, 50 HST',
    harga: 8500
  },
  za: {
    id: 'za',
    nama: 'ZA',
    icon: '⚪',
    warna: 'yellow',
    kandungan: 'N:21% S:24%',
    dosisStandar: { padi: 150, jagung: 200, cabai: 250, kedelai: 100 },
    manfaat: 'Menyediakan Nitrogen dan Sulfur untuk protein tanaman',
    caraAplikasi: 'Disebar merata, tidak boleh terkena daun langsung',
    waktuAplikasi: '14-21 HST',
    harga: 7200
  },
  kcl: {
    id: 'kcl',
    nama: 'KCL',
    icon: '🧴',
    warna: 'red',
    kandungan: 'K:60%',
    dosisStandar: { padi: 100, jagung: 150, cabai: 200, kedelai: 120 },
    manfaat: 'Memperkuat batang, meningkatkan kualitas buah',
    caraAplikasi: 'Ditebar atau ditugal, hindari kontak langsung dengan akar',
    waktuAplikasi: '30-40 HST',
    harga: 9000
  },
  sp36: {
    id: 'sp36',
    nama: 'SP-36',
    icon: '🔵',
    warna: 'indigo',
    kandungan: 'P:36%',
    dosisStandar: { padi: 100, jagung: 150, cabai: 200, kedelai: 100 },
    manfaat: 'Merangsang pertumbuhan akar, pembungaan, dan pembuahan',
    caraAplikasi: 'Ditebar sebelum tanam',
    waktuAplikasi: '1-2 minggu sebelum tanam',
    harga: 8200
  },
  phonska: {
    id: 'phonska',
    nama: 'Phonska',
    icon: '💎',
    warna: 'purple',
    kandungan: 'N:15% P:15% K:15% + Mikro',
    dosisStandar: { padi: 300, jagung: 350, cabai: 400, kedelai: 250 },
    manfaat: 'Pupuk lengkap dengan unsur hara makro dan mikro',
    caraAplikasi: 'Disebar merata di permukaan tanah',
    waktuAplikasi: '7, 30, 50 HST',
    harga: 8800
  }
};

export default function KalkulatorPetani() {
  const [luas, setLuas] = useState<number>(10000);
  const [tanaman, setTanaman] = useState<string>('jagung');
  const [pupukTerpilih, setPupukTerpilih] = useState<string>('npk');
  const [hasil, setHasil] = useState<any>(null);
  const [modeHitung, setModeHitung] = useState<'rekomendasi' | 'perPupuk'>('rekomendasi');

  const pupukList = Object.entries(dataPupuk).map(([key, value]) => ({
    id: key,
    ...value
  }));

  const hitungRekomendasiLengkap = () => {
    const luasHa = luas / 10000;
    const hasilPerhitungan = {};
    
    Object.keys(dataPupuk).forEach(key => {
      const pupuk = dataPupuk[key];
      const dosisPerHa = pupuk.dosisStandar[tanaman as keyof typeof pupuk.dosisStandar] || 200;
      const kebutuhan = (dosisPerHa * luasHa);
      hasilPerhitungan[key] = {
        ...pupuk,
        kebutuhan: kebutuhan,
        biaya: kebutuhan * pupuk.harga
      };
    });
    
    setHasil({ type: 'lengkap', data: hasilPerhitungan });
  };

  const hitungPerPupuk = () => {
    const luasHa = luas / 10000;
    const pupuk = dataPupuk[pupukTerpilih];
    const dosisPerHa = pupuk.dosisStandar[tanaman as keyof typeof pupuk.dosisStandar] || 200;
    const kebutuhan = dosisPerHa * luasHa;
    
    setHasil({
      type: 'perPupuk',
      data: {
        ...pupuk,
        kebutuhan: kebutuhan,
        biaya: kebutuhan * pupuk.harga,
        luasHa: luasHa,
        dosisPerHa: dosisPerHa
      }
    });
  };

  const handleHitung = () => {
    if (modeHitung === 'rekomendasi') {
      hitungRekomendasiLengkap();
    } else {
      hitungPerPupuk();
    }
  };

  const tanamanList = [
    { id: 'padi', nama: 'Padi', icon: '🌾', warna: 'emerald' },
    { id: 'jagung', nama: 'Jagung', icon: '🌽', warna: 'yellow' },
    { id: 'cabai', nama: 'Cabai', icon: '🌶️', warna: 'red' },
    { id: 'kedelai', nama: 'Kedelai', icon: '🫘', warna: 'teal' },
  ];

  // Format Rupiah
  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(angka);
  };

  // Tampilan Hasil
  if (hasil) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        {/* Header Compact */}
        <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center justify-between px-4 py-3">
            <button 
              onClick={() => setHasil(null)}
              className="flex items-center gap-1 text-white/60 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-yellow-400" />
              <span className="text-white text-sm">25°C</span>
            </div>
          </div>
        </div>

        <div className="px-4 py-4 pb-20">
          {hasil.type === 'lengkap' ? (
            // Mode Rekomendasi Lengkap
            <div>
              <div className="mb-4">
                <h1 className="text-xl font-bold text-white">Rekomendasi Pupuk</h1>
                <p className="text-white/50 text-sm">
                  {tanamanList.find(t => t.id === tanaman)?.icon} {tanamanList.find(t => t.id === tanaman)?.nama} | {luas.toLocaleString()} m² ({(luas/10000).toFixed(2)} ha)
                </p>
              </div>

              <div className="space-y-3">
                {Object.values(hasil.data).map((item: any) => (
                  <div key={item.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <p className="text-white font-semibold">{item.nama}</p>
                          <p className="text-white/40 text-xs">{item.kandungan}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">{item.kebutuhan.toFixed(1)} kg</p>
                        <p className="text-emerald-400 text-sm">{formatRupiah(item.biaya)}</p>
                      </div>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
                      <div 
                        className="bg-emerald-500 rounded-full h-1.5" 
                        style={{ width: `${Math.min((item.kebutuhan / 500) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-emerald-600/20 rounded-xl p-4 border border-emerald-500/20">
                <div className="flex justify-between items-center">
                  <p className="text-white font-semibold">Total Biaya</p>
                  <p className="text-white font-bold text-xl">
                    {formatRupiah(Object.values(hasil.data).reduce((sum: number, item: any) => sum + item.biaya, 0))}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Mode Per Pupuk
            <div>
              <div className={`bg-gradient-to-r from-${hasil.data.warna}-600 to-${hasil.data.warna}-700 rounded-2xl p-5 mb-4`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{hasil.data.icon}</span>
                  <div>
                    <h2 className="text-xl font-bold text-white">{hasil.data.nama}</h2>
                    <p className="text-white/70 text-sm">{hasil.data.kandungan}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-white/15 rounded-xl p-3">
                    <p className="text-white/60 text-xs">Dosis Standar</p>
                    <p className="text-white font-bold">{hasil.data.dosisPerHa} kg/ha</p>
                  </div>
                  <div className="bg-white/15 rounded-xl p-3">
                    <p className="text-white/60 text-xs">Luas Lahan</p>
                    <p className="text-white font-bold">{hasil.data.luasHa.toFixed(2)} ha</p>
                    <p className="text-white/40 text-xs">{luas.toLocaleString()} m²</p>
                  </div>
                </div>

                <div className="bg-white/20 rounded-xl p-4 mt-3">
                  <div className="flex justify-between items-center">
                    <p className="text-white/80 text-sm">Total Kebutuhan</p>
                    <p className="text-white font-bold text-2xl">{hasil.data.kebutuhan.toFixed(1)} kg</p>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/20">
                    <p className="text-white/80 text-sm">Estimasi Biaya</p>
                    <p className="text-white font-bold text-xl">{formatRupiah(hasil.data.biaya)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-emerald-400 text-sm font-medium mb-2">✨ Manfaat</p>
                  <p className="text-white text-sm">{hasil.data.manfaat}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-blue-400 text-sm font-medium mb-2">📝 Cara Aplikasi</p>
                  <p className="text-white text-sm">{hasil.data.caraAplikasi}</p>
                  <p className="text-white/50 text-xs mt-2">⏰ {hasil.data.waktuAplikasi}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Tampilan Kalkulator Utama
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-xl">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Kalkulator Pupuk</h1>
              <p className="text-white/70 text-xs">Hitung kebutuhan pupuk Anda</p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full">
            <Sun className="w-3 h-3 text-yellow-400" />
            <span className="text-white text-xs">25°C</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-5">
        {/* Mode Pilihan */}
        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setModeHitung('rekomendasi')}
            className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition ${
              modeHitung === 'rekomendasi'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                : 'bg-white/10 text-white/60'
            }`}
          >
            📋 Semua Pupuk
          </button>
          <button
            onClick={() => setModeHitung('perPupuk')}
            className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition ${
              modeHitung === 'perPupuk'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                : 'bg-white/10 text-white/60'
            }`}
          >
            🎯 Pilih Pupuk
          </button>
        </div>

        {/* Pilih Tanaman */}
        <div className="bg-white/5 rounded-xl p-4 mb-4 border border-white/10">
          <p className="text-white/70 text-xs mb-3 flex items-center gap-1">
            <Sprout className="w-3 h-3" /> Pilih Tanaman
          </p>
          <div className="grid grid-cols-4 gap-2">
            {tanamanList.map((t) => (
              <button
                key={t.id}
                onClick={() => setTanaman(t.id)}
                className={`py-2 rounded-xl text-center transition ${
                  tanaman === t.id
                    ? `bg-gradient-to-r from-${t.warna}-500 to-${t.warna}-600 text-white`
                    : 'bg-white/10 text-white/60'
                }`}
              >
                <div className="text-xl">{t.icon}</div>
                <div className="text-xs">{t.nama}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Pilih Pupuk (mode perPupuk) */}
        {modeHitung === 'perPupuk' && (
          <div className="bg-white/5 rounded-xl p-4 mb-4 border border-white/10">
            <p className="text-white/70 text-xs mb-3 flex items-center gap-1">
              <Package className="w-3 h-3" /> Pilih Pupuk
            </p>
            <div className="grid grid-cols-3 gap-2">
              {pupukList.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPupukTerpilih(p.id)}
                  className={`py-2 rounded-xl text-center transition text-sm ${
                    pupukTerpilih === p.id
                      ? `bg-gradient-to-r from-${p.warna}-500 to-${p.warna}-600 text-white`
                      : 'bg-white/10 text-white/60'
                  }`}
                >
                  <span className="text-lg">{p.icon}</span>
                  <div>{p.nama}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Luas Lahan */}
        <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
          <p className="text-white/70 text-xs mb-3 flex items-center gap-1">
            <Ruler className="w-3 h-3" /> Luas Lahan
          </p>
          <input 
            type="range"
            min="100"
            max="50000"
            step="100"
            value={luas}
            onChange={(e) => setLuas(Number(e.target.value))}
            className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-white/60 text-xs mt-2">
            <span>100 m²</span>
            <span className="text-white font-bold">{luas.toLocaleString()} m²</span>
            <span>5 ha</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <p className="text-white/40 text-[10px]">Are</p>
              <p className="text-white font-semibold text-sm">{(luas/100).toFixed(1)} are</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <p className="text-white/40 text-[10px]">Hektar</p>
              <p className="text-white font-semibold text-sm">{(luas/10000).toFixed(2)} ha</p>
            </div>
          </div>
        </div>

        {/* Tombol Hitung */}
        <button 
          onClick={handleHitung}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition"
        >
          <Calculator className="w-4 h-4" />
          Hitung Kebutuhan Pupuk
        </button>

        {/* Info */}
        <div className="mt-4 flex items-center justify-center gap-1 text-white/30 text-[10px]">
          <Info className="w-3 h-3" />
          <span>{pupukList.length} jenis pupuk tersedia</span>
        </div>
      </div>
    </div>
  );
}