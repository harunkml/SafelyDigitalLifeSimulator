import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../state/AppContext';
import { Settings, User, Music, Volume2, ShieldAlert, LogOut, Moon, Sun } from 'lucide-react';

export default function SettingsScreen() {
  const { 
    username, 
    setUsername, 
    music, 
    setMusic, 
    sound, 
    setSound, 
    sfxVolume,
    updateSfxVolume,
    bgmVolume,
    updateBgmVolume,
    theme,
    setTheme,
    resetGame 
  } = useApp();
  
  const [nameInput, setNameInput] = useState(username);
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleSaveName = (e) => {
    e.preventDefault();
    if (nameInput.trim()) {
      setUsername(nameInput.trim());
      setSuccessMsg('Kullanıcı adı başarıyla güncellendi.');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  const handleReset = () => {
    resetGame();
    navigate('/');
  };



  return (
    <div className="flex-1 flex flex-col p-4 bg-slate-50 dark:bg-[#08090d]">
      
      {/* Title */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2 px-1">
          <Settings className="w-5 h-5 text-cyan-accent" />
          Sistem Ayarları
        </h2>
      </div>

      {/* Profile/Username Settings */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] mb-4 space-y-3">
        <div className="flex items-center gap-2 text-cyan-accent">
          <User className="w-4 h-4" />
          <h3 className="text-sm font-bold uppercase tracking-wider">Profil Bilgisi</h3>
        </div>

        <form onSubmit={handleSaveName} className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              maxLength={20}
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-[#1f2330] bg-slate-50 dark:bg-[#08090d] text-slate-800 dark:text-white text-sm placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:border-cyan-accent"
              placeholder="Profil Adı..."
            />
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-accent text-[#08090d] text-sm font-bold rounded-xl active:scale-[0.98] transition-all"
            >
              Kaydet
            </button>
          </div>
          {successMsg && (
            <p className="text-xs text-safe-green font-medium px-1">{successMsg}</p>
          )}
        </form>
      </div>

      {/* Appearance Settings */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] mb-4 space-y-3">
        <div className="flex items-center gap-2 text-cyan-accent">
          {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          <h3 className="text-sm font-bold uppercase tracking-wider">Görünüm</h3>
        </div>

        <div className="flex items-center justify-between py-1.5">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-medium text-slate-600 dark:text-gray-300">Koyu Tema (Dark Mode)</span>
          </div>
          
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
              theme === 'dark' ? 'bg-cyan-accent' : 'bg-slate-300 dark:bg-gray-800'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
              theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
            }`}></div>
          </button>
        </div>
      </div>

      {/* Audio Settings */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] mb-4 space-y-3">
        <div className="flex items-center gap-2 text-cyan-accent">
          <Volume2 className="w-4 h-4" />
          <h3 className="text-sm font-bold uppercase tracking-wider">Ses & Müzik</h3>
        </div>

        <div className="space-y-3">
          {/* Music Toggle */}
          <div className="flex items-center justify-between py-1.5 border-b border-[#1f2330]/50 last:border-b-0">
            <div className="flex items-center gap-2.5">
              <Music className="w-4 h-4 text-slate-400 dark:text-gray-400" />
              <span className="text-sm font-medium text-slate-600 dark:text-gray-300">Arka Plan Müziği</span>
            </div>
            
            <button
              onClick={() => setMusic(!music)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
                music ? 'bg-cyan-accent' : 'bg-slate-300 dark:bg-gray-800'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                music ? 'translate-x-5' : 'translate-x-0'
              }`}></div>
            </button>
          </div>

          {/* BGM Volume Slider */}
          {music && (
            <div className="flex items-center gap-3 pl-6.5 animate-fade-in pb-1.5 border-b border-[#1f2330]/50">
              <span className="text-xs font-bold text-slate-400 dark:text-gray-500 w-8">Ses:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={bgmVolume}
                onChange={(e) => updateBgmVolume(parseInt(e.target.value, 10))}
                className="flex-1 h-1 bg-slate-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-accent"
              />
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-gray-400 w-8 text-right">
                {bgmVolume}%
              </span>
            </div>
          )}

          {/* SFX/Sound Toggle */}
          <div className="space-y-2.5 py-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Volume2 className="w-4 h-4 text-slate-400 dark:text-gray-400" />
                <span className="text-sm font-medium text-slate-600 dark:text-gray-300">Ses Efektleri (SFX)</span>
              </div>
              
              <button
                onClick={() => setSound(!sound)}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
                  sound ? 'bg-cyan-accent' : 'bg-slate-300 dark:bg-gray-800'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                  sound ? 'translate-x-5' : 'translate-x-0'
                }`}></div>
              </button>
            </div>

            {/* Volume Slider */}
            {sound && (
              <div className="flex items-center gap-3 pl-6.5 animate-fade-in">
                <span className="text-xs font-bold text-slate-400 dark:text-gray-500 w-8">Ses:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sfxVolume}
                  onChange={(e) => updateSfxVolume(parseInt(e.target.value, 10))}
                  className="flex-1 h-1 bg-slate-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-accent"
                />
                <span className="text-xs font-mono font-bold text-slate-500 dark:text-gray-400 w-8 text-right">
                  {sfxVolume}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Warning */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] mb-4 space-y-2 text-sm leading-relaxed text-slate-500 dark:text-gray-400 select-none">
        <div className="flex items-center gap-2 text-cyan-accent mb-1">
          <ShieldAlert className="w-4 h-4" />
          <h3 className="text-sm font-bold uppercase tracking-wider">Cihaz Güvenlik Durumu</h3>
        </div>
        <p className="text-xs">
          İşletim sistemi sürümü: <span className="text-slate-800 dark:text-gray-300 font-mono">Safely OS v1.0.0</span>
        </p>
        <p className="text-xs">
          Tüm veriler tarayıcı çerezleri ve yerel hafıza (localStorage) üzerinde saklanır.
        </p>
      </div>

      {/* Reset Simulation button */}
      <button
        onClick={handleReset}
        className="w-full mt-auto py-3.5 rounded-2xl border border-danger-red/40 bg-danger-red/5 hover:bg-danger-red/10 active:scale-[0.98] transition-all text-sm font-bold text-danger-red uppercase tracking-wider flex items-center justify-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        Simülasyonu Sıfırla ve Çık
      </button>

    </div>
  );
}
