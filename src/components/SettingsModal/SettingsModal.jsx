import { useApp } from '../../state/AppContext';
import { Settings, Music, Volume2, VolumeX } from 'lucide-react';

export default function SettingsModal({ onClose }) {
  const { 
    music, 
    setMusic, 
    sound, 
    setSound, 
    sfxVolume, 
    updateSfxVolume,
    bgmVolume,
    updateBgmVolume 
  } = useApp();

  return (
    <div className="absolute inset-0 bg-slate-50/80 dark:bg-[#08090d]/80 backdrop-blur-sm flex items-center justify-center p-6 z-[60] animate-fade-in select-none">
      <div className="bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] rounded-2xl w-full max-w-xs p-5 shadow-2xl">
        <h3 className="text-slate-800 dark:text-white font-bold text-lg mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-cyan-600 dark:text-cyan-accent" />
          Oyun Ayarları
        </h3>
        
        <div className="space-y-4 mb-6">
          {/* Müzik Ayarı */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#08090d] border border-slate-200 dark:border-[#1f2330]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
                <Music className="w-4 h-4" />
                <span className="text-base font-medium">Müzik</span>
              </div>
              <button 
                onClick={() => setMusic(!music)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${music ? 'bg-cyan-accent' : 'bg-slate-300 dark:bg-gray-600'}`}
              >
                <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${music ? 'translate-x-5' : 'translate-x-1'}`} />
              </button>
            </div>
            {music && (
              <div className="flex items-center gap-3 animate-fade-in pt-1">
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
          </div>

          {/* Efekt Ayarı */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#08090d] border border-slate-200 dark:border-[#1f2330]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
                {sound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span className="text-base font-medium">Efektler</span>
              </div>
              <button 
                onClick={() => setSound(!sound)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${sound ? 'bg-cyan-accent' : 'bg-slate-300 dark:bg-gray-600'}`}
              >
                <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${sound ? 'translate-x-5' : 'translate-x-1'}`} />
              </button>
            </div>
            {sound && (
              <div className="flex items-center gap-3 animate-fade-in pt-1">
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

        <button
          onClick={onClose}
          className="w-full py-3 bg-cyan-accent text-[#08090d] font-black rounded-xl text-sm uppercase tracking-wider active:scale-[0.98] transition-all"
        >
          Kapat
        </button>
      </div>
    </div>
  );
}
