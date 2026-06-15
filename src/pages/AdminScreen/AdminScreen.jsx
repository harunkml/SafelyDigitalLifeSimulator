import { useNavigate } from 'react-router-dom';
import { useApp } from '../../state/AppContext';
import { ArrowLeft, ShieldAlert, Cpu, Sliders, Terminal, Trash2 } from 'lucide-react';

export default function AdminScreen() {
  const navigate = useNavigate();
  const { username, activeTheme, selectActiveTheme } = useApp();

  const handleClearTestData = () => {
    if (window.confirm("Yerel test veritabanındaki tüm kullanıcılar silinecek. Onaylıyor musunuz?")) {
      localStorage.removeItem('safely_mock_leaderboard');
      window.location.reload();
    }
  };



  return (
    <div className="flex-1 flex flex-col p-5 bg-slate-50 dark:bg-[#08090d] select-none text-slate-800 dark:text-white animate-fade-in h-full overflow-y-auto">
      {/* Header */}
      <div className="mb-6 shrink-0 flex items-center justify-between bg-white dark:bg-[#12141c] p-3 rounded-2xl border border-slate-200 dark:border-[#1f2330] shadow-sm">
        <button
          onClick={() => navigate('/home')}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1f2330] text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-accent active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-danger-red animate-pulse" />
          Yönetici Paneli
        </h2>
        <div className="w-8"></div> {/* Spacer for symmetry */}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center items-center text-center max-w-sm mx-auto space-y-6">
        {/* Animated Cyber Icon */}
        <div className="w-20 h-20 rounded-3xl bg-danger-red/10 border-2 border-danger-red/30 flex items-center justify-center pulse-accent shrink-0 relative">
          <Cpu className="w-10 h-10 text-danger-red" />
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-danger-red border-2 border-[#08090d] animate-ping"></div>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-xl font-black uppercase tracking-tight text-slate-800 dark:text-white">
            Admin Ekranı
          </h1>
          <p className="text-xs text-danger-red font-bold tracking-widest uppercase mt-1">
            Tema Sistemi & Modüller
          </p>
        </div>

        {/* Info Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] text-sm text-slate-600 dark:text-gray-300 leading-relaxed text-left space-y-3 w-full shadow-md relative overflow-hidden">
          {/* Subtle grid background decor */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2330_1px,transparent_1px),linear-gradient(to_bottom,#1f2330_1px,transparent_1px)] bg-[size:12px_12px] opacity-10 pointer-events-none"></div>

          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2 text-danger-red font-bold">
              <Terminal className="w-4 h-4" />
              <span>[DURUM: YAPIM AŞAMASINDA]</span>
            </div>
            <p className="font-semibold text-slate-700 dark:text-gray-200">
              Bu modül henüz aktif değildir.
            </p>
            <p>
              İlerleyen güncellemelerde bu ekranda adminlerin; oyun içi ödülleri, aktif temaları ve özelleştirilebilir sistem ayarlarını yönetebileceği bir arayüz yer alacaktır.
            </p>
            <p className="text-xs text-slate-400 dark:text-gray-500 font-mono pt-2 border-t border-slate-100 dark:border-[#1f2330]">
              Yönetici: {username}
            </p>
          </div>
        </div>

        {/* Theme Selector Panel */}
        <div className="w-full p-5 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] shadow-md space-y-4 text-left relative overflow-hidden">
          {/* Subtle grid background decor */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2330_1px,transparent_1px),linear-gradient(to_bottom,#1f2330_1px,transparent_1px)] bg-[size:12px_12px] opacity-5 pointer-events-none"></div>

          <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2 relative z-10">
            <Sliders className="w-4 h-4 text-cyan-accent" />
            Tema Deneme Paneli
          </h3>
          
          <div className="space-y-2.5 relative z-10">
            {/* Theme 1: Default */}
            <button
              onClick={() => selectActiveTheme('default')}
              className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer focus:outline-none ${
                activeTheme === 'default'
                  ? 'border-cyan-accent bg-cyan-accent/5 dark:bg-cyan-accent/10 shadow-sm'
                  : 'border-slate-200 dark:border-[#1f2330] hover:bg-slate-50 dark:hover:bg-[#151822]'
              }`}
            >
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-white">Varsayılan Tema (Cyber Cyan)</p>
                <p className="text-[10px] text-slate-500 dark:text-gray-400 font-medium">Neon siber güvenlik yeşili ve cyan tonları.</p>
              </div>
              {activeTheme === 'default' && <span className="w-2 h-2 rounded-full bg-cyan-accent"></span>}
            </button>

            {/* Theme 2: Arctic Protocol */}
            <button
              onClick={() => selectActiveTheme('arctic')}
              className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer focus:outline-none ${
                activeTheme === 'arctic'
                  ? 'border-cyan-accent bg-cyan-accent/5 dark:bg-cyan-accent/10 shadow-sm'
                  : 'border-slate-200 dark:border-[#1f2330] hover:bg-slate-50 dark:hover:bg-[#151822]'
              }`}
            >
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-white">Arctic Protocol</p>
                <p className="text-[10px] text-slate-500 dark:text-gray-400 font-medium">Veri merkezi esintili soğuk buz mavisi.</p>
              </div>
              {activeTheme === 'arctic' && <span className="w-2 h-2 rounded-full bg-cyan-accent"></span>}
            </button>

            {/* Theme 3: Amber Shield */}
            <button
              onClick={() => selectActiveTheme('amber')}
              className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer focus:outline-none ${
                activeTheme === 'amber'
                  ? 'border-cyan-accent bg-cyan-accent/5 dark:bg-cyan-accent/10 shadow-sm'
                  : 'border-slate-200 dark:border-[#1f2330] hover:bg-slate-50 dark:hover:bg-[#151822]'
              }`}
            >
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-white">Amber Shield</p>
                <p className="text-[10px] text-slate-500 dark:text-gray-400 font-medium">Sıcak turuncu SOC ve tehdit izleme görünümü.</p>
              </div>
              {activeTheme === 'amber' && <span className="w-2 h-2 rounded-full bg-cyan-accent"></span>}
            </button>

            {/* Theme 4: Matrix Noir */}
            <button
              onClick={() => selectActiveTheme('matrix')}
              className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer focus:outline-none ${
                activeTheme === 'matrix'
                  ? 'border-cyan-accent bg-cyan-accent/5 dark:bg-cyan-accent/10 shadow-sm'
                  : 'border-slate-200 dark:border-[#1f2330] hover:bg-slate-50 dark:hover:bg-[#151822]'
              }`}
            >
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-white">Matrix Noir (Siyah Terminal)</p>
                <p className="text-[10px] text-slate-500 dark:text-gray-400 font-medium">Eski CRT terminal ekranı ve yeşil tarama çizgileri.</p>
              </div>
              {activeTheme === 'matrix' && <span className="w-2 h-2 rounded-full bg-cyan-accent"></span>}
            </button>

            {/* Theme 5: Ocean Core */}
            <button
              onClick={() => selectActiveTheme('ocean')}
              className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer focus:outline-none ${
                activeTheme === 'ocean'
                  ? 'border-cyan-accent bg-cyan-accent/5 dark:bg-cyan-accent/10 shadow-sm'
                  : 'border-slate-200 dark:border-[#1f2330] hover:bg-slate-50 dark:hover:bg-[#151822]'
              }`}
            >
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-white">Ocean Core</p>
                <p className="text-[10px] text-slate-500 dark:text-gray-400 font-medium">Modern teknoloji şirketi hissi veren mavi ve derin lacivert tonları.</p>
              </div>
              {activeTheme === 'ocean' && <span className="w-2 h-2 rounded-full bg-cyan-accent"></span>}
            </button>
          </div>
        </div>

        {/* System Tools Panel */}
        <div className="w-full p-5 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] shadow-md space-y-4 text-left relative overflow-hidden">
          {/* Subtle grid background decor */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2330_1px,transparent_1px),linear-gradient(to_bottom,#1f2330_1px,transparent_1px)] bg-[size:12px_12px] opacity-5 pointer-events-none"></div>

          <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2 relative z-10">
            <Cpu className="w-4 h-4 text-cyan-accent" />
            Sistem Araçları
          </h3>
          
          <div className="relative z-10">
            <button
              onClick={handleClearTestData}
              className="w-full py-3 rounded-xl border border-slate-300 dark:border-gray-700 bg-slate-100 dark:bg-gray-800 hover:bg-slate-200 dark:hover:bg-gray-700 active:scale-[0.98] transition-all text-xs font-bold text-slate-600 dark:text-gray-300 uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              <Trash2 className="w-4 h-4 text-danger-red" />
              Yerel Test Verilerini Temizle
            </button>
          </div>
        </div>

        {/* Action Button */}


        <button
          onClick={() => navigate('/home')}
          className="w-full py-4 bg-danger-red hover:bg-danger-red/90 active:scale-[0.98] text-white font-black rounded-2xl shadow-[0_0_20px_rgba(231,76,60,0.3)] transition-all text-sm uppercase tracking-wider shrink-0"
        >
          Anasayfaya Dön
        </button>
      </div>
    </div>
  );
}
