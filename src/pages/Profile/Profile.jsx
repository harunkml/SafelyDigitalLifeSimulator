import { useState, useEffect } from 'react';
import { useApp, ACHIEVEMENTS } from '../../state/AppContext';
import { 
  User, 
  Award, 
  Trophy, 
  ShieldCheck, 
  Coins, 
  Palette, 
  Crown, 
  Flame, 
  Zap, 
  Target, 
  Key, 
  Mail, 
  Shield, 
  Lock,
  Calendar,
  CreditCard,
  Gamepad2,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper to map icons to achievements
const getAchievementIcon = (id) => {
  switch(id) {
    case 'first_100_vp': return <Coins className="w-5 h-5 text-amber-500" />;
    case 'collector_2': return <Palette className="w-5 h-5 text-amber-500" />;
    case 'collector_all': return <Crown className="w-5 h-5 text-amber-500" />;
    case 'streak_5': return <Flame className="w-5 h-5 text-amber-500" />;
    case 'streak_10': return <Zap className="w-5 h-5 text-amber-500" />;
    case 'accuracy_90': return <Target className="w-5 h-5 text-amber-500" />;
    case 'password_master': return <Key className="w-5 h-5 text-amber-500" />;
    case 'email_master': return <Mail className="w-5 h-5 text-amber-500" />;
    case 'permission_master': return <Shield className="w-5 h-5 text-amber-500" />;
    case 'cyber_detective': return <Award className="w-5 h-5 text-amber-500 animate-pulse" />;
    case 'welcome_bonus': return <Calendar className="w-5 h-5 text-amber-500" />;
    case 'big_spender': return <CreditCard className="w-5 h-5 text-amber-500" />;
    case 'persistent_player': return <Gamepad2 className="w-5 h-5 text-amber-500" />;
    default: return <Award className="w-5 h-5 text-amber-500" />;
  }
};

export default function Profile() {
  const { 
    username, 
    setUsername, 
    unlockedAchievements
  } = useApp();
  
  const [nameInput, setNameInput] = useState(username);
  const [successMsg, setSuccessMsg] = useState('');
  const [selectedAch, setSelectedAch] = useState(null);
  
  // Retrieve saved score and title from simulated leaderboard
  const [leaderboardRecord, setLeaderboardRecord] = useState(null);

  useEffect(() => {
    if (username) {
      const mockLeaderboard = JSON.parse(localStorage.getItem('safely_mock_leaderboard') || '{}');
      const record = mockLeaderboard[username.toLowerCase()];
      if (record && record.status === 'completed') {
        const timeoutId = setTimeout(() => {
          setLeaderboardRecord(record);
        }, 0);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [username]);

  const handleSaveName = (e) => {
    e.preventDefault();
    if (nameInput.trim()) {
      setUsername(nameInput.trim());
      setSuccessMsg('Profil adı başarıyla güncellendi.');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 bg-slate-50 dark:bg-[#08090d] select-none overflow-y-auto max-h-[720px] pb-8 pr-1.5 animate-fade-in">
      
      {/* Profile Header Block */}
      <div className="flex flex-col items-center justify-center text-center p-5 bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] rounded-3xl shadow-sm mb-4 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2330_1px,transparent_1px),linear-gradient(to_bottom,#1f2330_1px,transparent_1px)] bg-[size:12px_12px] opacity-10 pointer-events-none"></div>
        
        {/* Avatar */}
        <div className="w-14 h-14 rounded-2xl bg-cyan-50 dark:bg-cyan-accent/10 border border-cyan-200 dark:border-cyan-accent/20 flex items-center justify-center mb-3 relative z-10 shrink-0 shadow-sm">
          <User className="w-6 h-6 text-cyan-600 dark:text-cyan-accent" />
        </div>

        {/* Username form */}
        <form onSubmit={handleSaveName} className="w-full max-w-xs space-y-2 relative z-10">
          <div className="flex gap-2">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              maxLength={20}
              className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#1f2330] bg-slate-50 dark:bg-[#08090d] text-slate-800 dark:text-white text-xs font-bold focus:outline-none focus:border-cyan-accent text-center"
              placeholder="Profil Adı..."
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-cyan-accent text-[#08090d] text-xs font-black rounded-xl active:scale-[0.98] transition-all cursor-pointer"
            >
              Güncelle
            </button>
          </div>
          {successMsg && (
            <p className="text-[10px] text-safe-green font-bold text-center">{successMsg}</p>
          )}
        </form>
      </div>

      {/* High Score / Rank Section */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] shadow-sm mb-4 space-y-2.5">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-accent border-b border-slate-100 dark:border-[#1f2330] pb-2">
          <Trophy className="w-4 h-4" />
          <h3 className="text-xs font-black uppercase tracking-wider">Sertifika & Başarı Durumu</h3>
        </div>

        {leaderboardRecord ? (
          <div className="flex justify-between items-center bg-slate-50 dark:bg-[#08090d]/60 border border-slate-100 dark:border-[#1f2330] p-3 rounded-2xl">
            <div className="space-y-1">
              <span className="text-[9px] text-slate-400 dark:text-gray-500 uppercase tracking-widest font-black leading-none block">Kazandığın Unvan</span>
              <span className="text-sm font-black text-slate-800 dark:text-white block leading-none">{leaderboardRecord.title}</span>
            </div>
            <div className="text-right space-y-1">
              <span className="text-[9px] text-slate-400 dark:text-gray-500 uppercase tracking-widest font-black leading-none block">Nihai Skor</span>
              <span className="text-sm font-black text-cyan-600 dark:text-cyan-accent font-mono block leading-none">{leaderboardRecord.score} Puan</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-[#08090d]/50 border border-dashed border-slate-200 dark:border-[#1f2330] text-[11px] text-slate-500 dark:text-gray-450 leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Tüm oyun modüllerini tamamlayıp skorunuzu kaydettiğinizde nihai sertifikanız ve en yüksek skorunuz burada görünecektir.</span>
          </div>
        )}
      </div>

      {/* Badges / Achievements Header */}
      <div className="flex justify-between items-center mb-2 px-1">
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-gray-400">
          <Award className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-black uppercase tracking-wider">Başarım Rozetleri</span>
        </div>
        <span className="text-[10px] text-slate-400 dark:text-gray-500 font-bold">
          {unlockedAchievements.length} / {ACHIEVEMENTS.length} Açıldı
        </span>
      </div>

      {/* Achievements Grid Layout (2 columns responsive) */}
      <div className="grid grid-cols-2 gap-2.5">
        {ACHIEVEMENTS.map((ach) => {
          const isUnlocked = unlockedAchievements.includes(ach.id);
          return (
            <button
              key={ach.id}
              onClick={() => setSelectedAch(ach)}
              className={`flex flex-col items-center justify-between p-3.5 rounded-2xl border text-center transition-all cursor-pointer relative focus:outline-none min-h-[110px] group ${
                isUnlocked
                  ? 'bg-white dark:bg-[#12141c] border-amber-500/40 hover:border-amber-500 text-slate-800 dark:text-white shadow-sm'
                  : 'bg-slate-100/40 dark:bg-[#12141c]/40 border-slate-200 dark:border-[#1f2330]/60 opacity-60 hover:opacity-85 text-slate-400'
              }`}
            >
              {/* Unlock Indicator icon */}
              {isUnlocked ? (
                <div className="absolute top-2 right-2 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 fill-amber-500/10" />
                </div>
              ) : (
                <div className="absolute top-2 right-2 shrink-0 opacity-40">
                  <Lock className="w-3 h-3 text-slate-400" />
                </div>
              )}

              {/* Icon Container */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 shrink-0 ${
                isUnlocked 
                  ? 'bg-amber-500/10 border border-amber-500/20' 
                  : 'bg-slate-200 dark:bg-[#08090d]/80 border border-slate-300 dark:border-slate-800'
              }`}>
                {isUnlocked ? getAchievementIcon(ach.id) : <Lock className="w-4 h-4 text-slate-450 dark:text-gray-500" />}
              </div>

              {/* Title / Description */}
              <div className="w-full">
                <p className="text-[11px] font-black leading-tight tracking-tight group-hover:text-amber-500 transition-colors">
                  {ach.title}
                </p>
                <p className="text-[9px] text-amber-600 dark:text-amber-500 font-mono font-bold leading-none mt-1">
                  +{ach.reward} VP Ödül
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Spacer */}
      <div className="h-6 shrink-0"></div>

      {/* Detail overlay Modal */}
      <AnimatePresence>
        {selectedAch && (
          <div className="fixed inset-0 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm flex flex-col justify-center p-6 z-50 animate-fade-in text-center select-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="bg-white dark:bg-[#12141c] border-2 border-amber-500 rounded-3xl p-5 shadow-2xl relative overflow-hidden max-w-xs mx-auto w-full"
            >
              {/* Top gold bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>

              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-3">
                {getAchievementIcon(selectedAch.id)}
              </div>

              <h3 className="text-base font-black text-slate-800 dark:text-white uppercase tracking-tight">{selectedAch.title}</h3>
              
              <div className="my-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#08090d]/60 border border-slate-100 dark:border-[#1f2330]/80 text-left">
                <span className="text-[9px] text-slate-400 dark:text-gray-500 font-black uppercase tracking-widest block mb-1">Görev Detayı:</span>
                <p className="text-xs font-bold text-slate-600 dark:text-gray-300 leading-relaxed">{selectedAch.description}</p>
                
                <div className="mt-3.5 pt-2 border-t border-slate-100 dark:border-[#1f2330]/80 flex justify-between items-center">
                  <span className="text-[9px] text-slate-400 dark:text-gray-500 font-black uppercase tracking-widest leading-none">Ödül Puanı</span>
                  <span className="text-xs font-black text-amber-500 font-mono leading-none">+{selectedAch.reward} VP</span>
                </div>
              </div>

              <div className="flex gap-2">
                {unlockedAchievements.includes(selectedAch.id) ? (
                  <div className="flex-1 py-3.5 rounded-xl bg-amber-500 text-white text-xs uppercase font-black tracking-wider flex items-center justify-center gap-1 leading-none border border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Kazanıldı</span>
                  </div>
                ) : (
                  <div className="flex-1 py-3.5 rounded-xl bg-slate-100 dark:bg-[#1f2330] text-slate-500 dark:text-gray-400 text-xs uppercase font-black tracking-wider flex items-center justify-center gap-1 leading-none border border-slate-200 dark:border-[#1f2330]/60">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Kilitli</span>
                  </div>
                )}
                <button
                  onClick={() => setSelectedAch(null)}
                  className="px-4 py-3.5 bg-slate-100 dark:bg-[#1f2330] hover:bg-slate-250 dark:hover:bg-[#2a2f42] text-slate-700 dark:text-white rounded-xl text-xs uppercase font-extrabold active:scale-[0.98] transition-all cursor-pointer leading-none"
                >
                  Kapat
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
