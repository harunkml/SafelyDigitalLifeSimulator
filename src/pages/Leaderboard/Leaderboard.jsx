import { useState, useEffect } from 'react';
import { getLeaderboard } from '../../firebase/leaderboardService';
import { Trophy, Award, Shield, Loader2 } from 'lucide-react';
import { useApp } from '../../state/AppContext';

export default function Leaderboard() {
  const { username } = useApp();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'weekly'

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      try {
        const data = await getLeaderboard(activeTab);
        setLeaderboardData(data);
      } catch (error) {
        console.error("Liderlik tablosu yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchScores();
  }, [activeTab]);

  // Ranking icons
  const getRankBadge = (index) => {
    if (index === 0) return <span className="text-xl">🥇</span>;
    if (index === 1) return <span className="text-xl">🥈</span>;
    if (index === 2) return <span className="text-xl">🥉</span>;
    return <span className="text-sm font-mono font-bold text-slate-400 dark:text-gray-500 w-6 text-center">{index + 1}</span>;
  };

  // Title styling helper
  const getTitleBadgeStyle = (title) => {
    if (title?.includes("Siber Usta")) {
      return "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400";
    }
    if (title?.includes("Siber Uzman")) {
      return "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400";
    }
    if (title?.includes("Dijital Koruyucu")) {
      return "border-cyan-500/20 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400";
    }
    if (title?.includes("Bilinçli Kullanıcı")) {
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    }
    if (title?.includes("Acemi Kullanıcı")) {
      return "border-slate-500/20 bg-slate-500/10 text-slate-600 dark:text-slate-400";
    }
    return "border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400";
  };

  return (
    <div className="flex-1 flex flex-col p-4 bg-slate-50 dark:bg-[#08090d] h-full select-none">
      
      {/* Header Title */}
      <div className="mb-4 flex items-center gap-2 px-1">
        <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-accent/10 border border-cyan-100 dark:border-cyan-accent/20 flex items-center justify-center">
          <Trophy className="w-5 h-5 text-cyan-600 dark:text-cyan-accent" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white leading-none">
            Liderlik Tablosu
          </h2>
          <p className="text-xs text-slate-500 dark:text-gray-500 font-medium mt-1">
            En güvenli siber kahramanlar sıralaması.
          </p>
        </div>
      </div>

      {/* Tabs for Extensibility */}
      <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-200/50 dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] mb-4 text-sm font-bold shadow-inner">
        <button
          onClick={() => setActiveTab('all')}
          className={`py-2 rounded-lg transition-all active:scale-[0.98] ${
            activeTab === 'all'
              ? 'bg-white dark:bg-[#08090d] text-cyan-600 dark:text-cyan-accent shadow-sm'
              : 'text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          Tüm Zamanlar
        </button>
        <button
          onClick={() => setActiveTab('weekly')}
          className={`py-2 rounded-lg transition-all active:scale-[0.98] relative ${
            activeTab === 'weekly'
              ? 'bg-white dark:bg-[#08090d] text-cyan-600 dark:text-cyan-accent shadow-sm'
              : 'text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          <span>Haftalık</span>
        </button>
      </div>

      {/* Leaderboard Table List */}
      <div className="flex-1 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] flex flex-col overflow-hidden shadow-sm">
        
        {loading ? (
          <div className="flex-1 flex flex-col justify-center items-center gap-3 text-slate-400 dark:text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-600 dark:text-cyan-accent" />
            <span className="text-sm font-semibold">Skorlar Yükleniyor...</span>
          </div>
        ) : leaderboardData.length === 0 ? (
          <div className="flex-1 flex flex-col justify-center items-center gap-2 text-center p-6 text-slate-400 dark:text-gray-500">
            <Shield className="w-12 h-12 text-slate-300 dark:text-gray-700 mb-1" />
            <p className="text-sm font-bold uppercase tracking-wider">Henüz Kayıt Yok</p>
            <p className="text-xs text-slate-500 max-w-xs leading-relaxed">Oyunu tamamlayan ilk siber koruyucu olmak için simülasyonu bitirin!</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {leaderboardData.map((player, index) => {
              const isUser = player.username.toLowerCase() === username.toLowerCase();
              const cardThemeClass = `card-theme-${player.cardTheme || 'clean-slate'}`;
              const highlightClass = isUser ? 'ring-2 ring-amber-500 shadow-md scale-[1.01]' : '';

              return (
                <div 
                  key={player.id || index}
                  className={`flex items-center justify-between p-3 rounded-2xl transition-all relative overflow-hidden select-none ${cardThemeClass} ${highlightClass}`}
                  style={{ minHeight: '76px' }}
                >
                  {/* Position, Emoji Avatar & Name */}
                  <div className="flex items-center gap-3 overflow-hidden pr-2 z-10">
                    <div className="w-6 flex items-center justify-center shrink-0">
                      {isUser ? (
                        <span className="text-[9px] bg-amber-500 text-white font-black px-1.5 py-0.5 rounded uppercase tracking-wider">Sen</span>
                      ) : (
                        getRankBadge(index)
                      )}
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-white/20 dark:bg-black/10 border border-slate-350/20 flex items-center justify-center shrink-0 text-xl select-none">
                      {player.avatar || '👤'}
                    </div>
                    
                    <div className="overflow-hidden text-left">
                      <span className="text-sm font-black text-slate-800 dark:text-white block truncate leading-tight">
                        {player.username}
                      </span>
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold border mt-1 ${getTitleBadgeStyle(player.title)}`}>
                        {player.title || "Açık Hedef 🎯"}
                      </span>
                    </div>
                  </div>

                  {/* Score and stats */}
                  <div className="flex items-center gap-3 shrink-0 text-right z-10">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[8px] font-black text-slate-450 dark:text-gray-500 uppercase tracking-widest leading-none">Skor</span>
                      <span className="text-xs font-mono font-black text-cyan-600 dark:text-cyan-accent leading-none">{player.score} Puan</span>
                    </div>

                    <div className="flex flex-col items-end gap-0.5 border-l border-slate-300/20 pl-2.5 min-w-[48px]">
                      <span className="text-[8px] font-black text-slate-450 dark:text-gray-500 uppercase tracking-widest leading-none">Rozetler</span>
                      <div className="flex items-center gap-0.5 text-xs font-bold text-slate-700 dark:text-gray-300 leading-none">
                        <Award className="w-3 h-3 text-amber-500" />
                        <span className="text-[10px] font-bold leading-none">{player.badgeCount || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
