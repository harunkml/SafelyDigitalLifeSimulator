import { useState, useEffect, useCallback } from 'react';
import { useApp, COSMETICS_DB } from '../../state/AppContext';
import { 
  Coins, 
  Check, 
  Lock, 
  ShieldCheck, 
  Gift, 
  Box, 
  Sparkles, 
  Trophy, 
  Palette
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Store() {
  const { 
    veriPuani, 
    unlockedThemes, 
    activeTheme, 
    selectActiveTheme, 
    lastDailyClaimTime,
    claimDailyReward,
    // Loot Box & Emojis additions
    unlockedCardThemes,
    unlockedEmojis,
    activeCardTheme,
    selectActiveCardTheme,
    userAvatar,
    selectUserAvatar,
    cyberMasterClaimed,
    openLootBox,
    claimCyberMasterChest
  } = useApp();

  const [activeTab, setActiveTab] = useState('shop'); // 'shop' | 'inventory'
  const [activeSubTab, setActiveSubTab] = useState('themes'); // 'themes' | 'cardThemes' | 'emojis'
  const [successMessage, setSuccessMessage] = useState('');
  
  // Loot box opening states
  const [openingBox, setOpeningBox] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [openedItem, setOpenedItem] = useState(null);

  // Cooldown timer state for Daily Reward
  const [timeLeft, setTimeLeft] = useState(() => {
    const now = Date.now();
    const cooldown = 24 * 60 * 60 * 1000;
    const rem = cooldown - (now - lastDailyClaimTime);
    return rem > 0 ? rem : 0;
  });

  // Retrieve user highest score from local storage
  const [highScore] = useState(() => {
    const username = localStorage.getItem('safely_username') || '';
    if (username) {
      const mockLeaderboard = JSON.parse(localStorage.getItem('safely_mock_leaderboard') || '{}');
      const record = mockLeaderboard[username.toLowerCase()];
      if (record && record.status === 'completed') {
        return record.score;
      }
    }
    return 0;
  });

  const getRemainingCooldown = useCallback(() => {
    const now = Date.now();
    const cooldown = 24 * 60 * 60 * 1000;
    const rem = cooldown - (now - lastDailyClaimTime);
    return rem > 0 ? rem : 0;
  }, [lastDailyClaimTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getRemainingCooldown());
    }, 1000);

    return () => clearInterval(interval);
  }, [getRemainingCooldown]);

  const handleClaimDaily = () => {
    const success = claimDailyReward();
    if (success) {
      setSuccessMessage('Günlük Veri Bonusu (+50 VP) Alındı!');
      setTimeLeft(24 * 60 * 60 * 1000);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleOpenLootBox = (type) => {
    const result = openLootBox(type);
    if (!result.success) {
      setSuccessMessage(result.reason);
      setTimeout(() => setSuccessMessage(''), 3000);
      return;
    }

    // Trigger box opening animation sequence
    setOpeningBox(true);
    setRevealed(false);
    setOpenedItem(null);

    setTimeout(() => {
      if (result.refunded) {
        setOpenedItem({
          refunded: true,
          name: 'VP İade Paketi',
          value: `+${result.refundAmount} VP`,
          rarity: 'common',
          type: 'refund',
          reason: result.reason
        });
      } else {
        setOpenedItem(result.item);
      }
      setRevealed(true);
    }, 2000);
  };

  const handleClaimCyberMaster = () => {
    const success = claimCyberMasterChest();
    if (success) {
      setSuccessMessage('Siber Usta Kasası Açıldı!');
      setOpeningBox(true);
      setRevealed(false);
      setOpenedItem(null);
      setTimeout(() => {
        setOpenedItem({
          specialPackage: true,
          name: 'Siber Usta Özel Paketi',
          value: '🕵️‍♂️ + 🏆 + 👑',
          rarity: 'legendary',
          type: 'special_bundle'
        });
        setRevealed(true);
      }, 1500);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const formatTime = (ms) => {
    const totalSecs = Math.floor(ms / 1000);
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;
    
    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const getRarityBadgeStyle = (rarity) => {
    switch (rarity) {
      case 'common': return 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700';
      case 'rare': return 'bg-sky-500/10 text-sky-500 border border-sky-500/20';
      case 'epic': return 'bg-orange-500/10 text-orange-500 border border-orange-500/20';
      case 'legendary': return 'bg-amber-550/10 dark:bg-amber-500/10 text-amber-500 border border-amber-550/20 dark:border-amber-500/20';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  const getRarityText = (rarity) => {
    switch (rarity) {
      case 'common': return 'Yaygın (Common)';
      case 'rare': return 'Nadir (Rare)';
      case 'epic': return 'Destansı (Epic)';
      case 'legendary': return 'Efsanevi (Legendary)';
      default: return '';
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 bg-slate-50 dark:bg-[#08090d] select-none overflow-y-auto max-h-[720px] pb-8 pr-1.5 animate-fade-in relative">
      
      {/* VP Balance Display */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] shadow-sm mb-4 relative overflow-hidden flex flex-col items-center justify-center text-center shrink-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2330_1px,transparent_1px),linear-gradient(to_bottom,#1f2330_1px,transparent_1px)] bg-[size:16px_16px] opacity-5 pointer-events-none"></div>

        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-2 relative z-10 shrink-0 shadow-sm animate-pulse">
          <Coins className="w-6 h-6 text-amber-500" />
        </div>
        <div className="relative z-10">
          <p className="text-[9px] text-slate-400 dark:text-gray-500 font-black uppercase tracking-widest leading-none mb-1">Mevcut Bakiyeniz</p>
          <h2 className="text-xl font-black text-amber-600 dark:text-amber-500 font-mono leading-none">{veriPuani} VP</h2>
        </div>

        {/* Action success banner */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-2 left-2 right-2 py-1.5 px-3 bg-safe-green text-white text-[10px] font-black rounded-lg uppercase tracking-wide shadow-md flex items-center justify-center gap-1 z-35"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{successMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Daily Reward Card */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] shadow-sm mb-4 relative overflow-hidden flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
            timeLeft > 0 
              ? 'bg-slate-100 dark:bg-[#1f2330] border-slate-250 dark:border-[#1f2330] text-slate-400 dark:text-gray-500' 
              : 'bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/20 dark:border-emerald-550/20 text-emerald-600 dark:text-emerald-400 animate-pulse'
          }`}>
            <Gift className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-tight">Günlük Veri Bonusu</h3>
            <p className="text-[9px] text-slate-450 dark:text-gray-400 font-semibold leading-tight mt-0.5 max-w-[170px]">
              {timeLeft > 0 
                ? 'Sonraki veri yüklemesi için bekleyin.' 
                : 'Her 24 saatte bir ücretsiz +50 VP kazanın!'}
            </p>
          </div>
        </div>

        <div>
          {timeLeft > 0 ? (
            <div className="flex flex-col items-end">
              <span className="text-[8px] text-slate-400 dark:text-gray-500 font-bold uppercase tracking-wider mb-1 leading-none">Yeni Ödül İçin</span>
              <div className="px-3 py-1.5 bg-slate-100 dark:bg-[#1f2330] border border-slate-250 dark:border-[#1f2330] rounded-xl font-mono text-[10px] font-black text-slate-500 dark:text-gray-450">
                {formatTime(timeLeft)}
              </div>
            </div>
          ) : (
            <button
              onClick={handleClaimDaily}
              className="py-2 px-3.5 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.97] text-white font-black text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-[0_0_10px_rgba(34,197,94,0.25)] cursor-pointer"
            >
              Al (+50 VP)
            </button>
          )}
        </div>
      </div>

      {/* Tabs Menu (Store / Inventory) */}
      <div className="flex bg-slate-200/60 dark:bg-[#12141c]/60 border border-slate-200 dark:border-[#1f2330] p-1 rounded-2xl mb-4 relative shrink-0">
        <button
          onClick={() => setActiveTab('shop')}
          className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
            activeTab === 'shop'
              ? 'bg-white dark:bg-[#12141c] border border-slate-250 dark:border-[#1f2330] text-cyan-600 dark:text-cyan-accent shadow-sm'
              : 'text-slate-500 dark:text-gray-400'
          }`}
        >
          Kasa Mağazası
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
            activeTab === 'inventory'
              ? 'bg-white dark:bg-[#12141c] border border-slate-250 dark:border-[#1f2330] text-cyan-600 dark:text-cyan-accent shadow-sm'
              : 'text-slate-500 dark:text-gray-400'
          }`}
        >
          Envanterim
        </button>
      </div>

      {/* Shop Tab Panel */}
      {activeTab === 'shop' && (
        <div className="space-y-4 flex-1 pb-4">
          
          {/* Mystery Box Card (250 VP) */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="flex justify-between items-start mb-3">
              <div className="text-left">
                <span className="text-[8px] bg-sky-500/10 text-sky-500 font-black px-2 py-0.5 rounded border border-sky-500/25 uppercase tracking-wider">Mavi Kod</span>
                <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight mt-1">Gizemli Kutu</h3>
                <p className="text-[10px] text-slate-400 dark:text-gray-500 font-semibold mt-0.5 leading-relaxed">
                  Rastgele bir genel tema, oyuncu kartı çerçevesi veya yeni bir profil emoji resmi içerir.
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-[#08090d] border border-slate-200 dark:border-[#1f2330] flex items-center justify-center text-slate-500 shrink-0">
                <Box className="w-6 h-6 text-sky-500 animate-pulse" />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 dark:border-[#1f2330] pt-3 mt-1">
              {/* Odds Details */}
              <div className="flex gap-2">
                <span className="text-[8px] text-slate-400 dark:text-gray-500 font-black uppercase">Yaygın %70</span>
                <span className="text-[8px] text-sky-400 font-black uppercase">Nadir %25</span>
                <span className="text-[8px] text-orange-400 font-black uppercase">Destansı %5</span>
              </div>

              <button
                onClick={() => handleOpenLootBox('mystery')}
                disabled={veriPuani < 250}
                className={`py-2 px-4 rounded-xl font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  veriPuani >= 250
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-[0_0_10px_rgba(245,158,11,0.2)] active:scale-[0.97]'
                    : 'bg-slate-100 dark:bg-[#1f2330] text-slate-400 dark:text-gray-500 cursor-not-allowed opacity-50'
                }`}
              >
                <Coins className="w-3.5 h-3.5" />
                <span>250 VP AÇ</span>
              </button>
            </div>
          </div>

          {/* Legendary Chest Card (500 VP) */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="flex justify-between items-start mb-3">
              <div className="text-left">
                <span className="text-[8px] bg-amber-500/10 text-amber-500 font-black px-2 py-0.5 rounded border border-amber-550/25 dark:border-amber-500/20 uppercase tracking-wider">Lüks Gold</span>
                <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight mt-1">Efsanevi Kasa</h3>
                <p className="text-[10px] text-slate-400 dark:text-gray-500 font-semibold mt-0.5 leading-relaxed">
                  Daha yüksek nadirlikte seçkin kozmetikler içerir. Yaygın eşya barındırmaz.
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-[#08090d] border border-slate-200 dark:border-[#1f2330] flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-amber-500 animate-pulse" />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 dark:border-[#1f2330] pt-3 mt-1">
              {/* Odds Details */}
              <div className="flex gap-2">
                <span className="text-[8px] text-sky-400 font-black uppercase">Nadir %60</span>
                <span className="text-[8px] text-orange-400 font-black uppercase">Destansı %30</span>
                <span className="text-[8px] text-amber-550 dark:text-amber-500 font-black uppercase">Efsanevi %10</span>
              </div>

              <button
                onClick={() => handleOpenLootBox('legendary')}
                disabled={veriPuani < 500}
                className={`py-2 px-4 rounded-xl font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  veriPuani >= 500
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-[0_0_10px_rgba(245,158,11,0.2)] active:scale-[0.97]'
                    : 'bg-slate-100 dark:bg-[#1f2330] text-slate-400 dark:text-gray-500 cursor-not-allowed opacity-50'
                }`}
              >
                <Coins className="w-3.5 h-3.5" />
                <span>500 VP AÇ</span>
              </button>
            </div>
          </div>

          {/* Cyber Master Chest Card (Earned by score) */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-amber-500/25 dark:border-amber-500/15 shadow-sm flex flex-col justify-between relative overflow-hidden">
            {/* Golden Ribbon accent */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 flex items-center justify-center rotate-45 translate-x-7 -translate-y-7 pointer-events-none">
              <Trophy className="w-4 h-4 text-amber-500 -rotate-45" />
            </div>

            <div className="flex justify-between items-start mb-3">
              <div className="text-left">
                <span className="text-[8px] bg-amber-500 text-white font-black px-2 py-0.5 rounded uppercase tracking-wider">Başarım Ödülü</span>
                <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight mt-1">Siber Usta Kasası</h3>
                <p className="text-[10px] text-slate-400 dark:text-gray-500 font-semibold mt-0.5 leading-relaxed pr-6">
                  Simülasyonda **3000+** yüksek skora ulaşan ustalara özel altın-cyan renkli prestij kozmetik paketi.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 dark:border-[#1f2330] pt-3 mt-1">
              <div className="text-left">
                <span className="text-[9px] text-slate-500 font-bold">Gereksinim: 3000+ En Yüksek Skor (Sizinki: {highScore})</span>
              </div>

              {cyberMasterClaimed ? (
                <div className="py-2 px-4 bg-slate-100 dark:bg-[#1f2330] border border-slate-250 dark:border-[#1f2330] text-slate-450 dark:text-gray-500 rounded-xl font-black text-[10px] uppercase tracking-wider select-none leading-none">
                  Açıldı
                </div>
              ) : (
                <button
                  onClick={handleClaimCyberMaster}
                  disabled={highScore < 3000}
                  className={`py-2 px-4 rounded-xl font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    highScore >= 3000
                      ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-[0_0_12px_rgba(245,158,11,0.25)] active:scale-[0.97]'
                      : 'bg-slate-100 dark:bg-[#1f2330] text-slate-400 dark:text-gray-500 cursor-not-allowed opacity-50'
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>KASAYI AÇ</span>
                </button>
              )}
            </div>
          </div>

        </div>
      )}

      {/* Inventory Tab Panel */}
      {activeTab === 'inventory' && (
        <div className="flex flex-col flex-1 pb-4">
          
          {/* Sub Tabs selector */}
          <div className="flex border-b border-slate-200 dark:border-[#1f2330] mb-4 text-center shrink-0">
            <button
              onClick={() => setActiveSubTab('themes')}
              className={`flex-1 pb-2 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
                activeSubTab === 'themes' 
                  ? 'border-cyan-accent text-cyan-600 dark:text-cyan-accent' 
                  : 'border-transparent text-slate-400'
              }`}
            >
              Genel Temalar
            </button>
            <button
              onClick={() => setActiveSubTab('cardThemes')}
              className={`flex-1 pb-2 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
                activeSubTab === 'cardThemes' 
                  ? 'border-cyan-accent text-cyan-600 dark:text-cyan-accent' 
                  : 'border-transparent text-slate-400'
              }`}
            >
              Skor Kartları
            </button>
            <button
              onClick={() => setActiveSubTab('emojis')}
              className={`flex-1 pb-2 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
                activeSubTab === 'emojis' 
                  ? 'border-cyan-accent text-cyan-600 dark:text-cyan-accent' 
                  : 'border-transparent text-slate-400'
              }`}
            >
              Profil Resimleri
            </button>
          </div>

          {/* Sub-tab lists content */}
          <div className="grid grid-cols-2 gap-3.5 content-start overflow-y-auto pr-1">
            
            {/* General Themes List */}
            {activeSubTab === 'themes' && (
              <>
                {/* Always include starting Default theme */}
                <div className={`flex flex-col rounded-2xl bg-white dark:bg-[#12141c] border overflow-hidden shadow-sm transition-all ${
                  activeTheme === 'default' ? 'border-cyan-accent shadow-md' : 'border-slate-200 dark:border-[#1f2330]'
                }`}>
                  <div className="h-10 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 flex items-center justify-center p-2">
                    <span className="text-[9px] font-black text-white uppercase tracking-wider truncate">Cyber Cyan</span>
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                    <p className="text-[9px] text-slate-400 dark:text-gray-500 font-semibold leading-normal truncate text-left">Varsayılan sistem teması.</p>
                    {activeTheme === 'default' ? (
                      <div className="w-full py-1.5 bg-cyan-accent/10 border border-cyan-accent/25 text-cyan-accent rounded-lg font-black text-[9px] uppercase tracking-wider flex items-center justify-center gap-1 select-none leading-none">
                        <Check className="w-3 h-3" />
                        <span>Aktif</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => selectActiveTheme('default')}
                        className="w-full py-1.5 px-2 bg-slate-100 dark:bg-[#1f2330] hover:bg-slate-200 dark:hover:bg-[#2a2f42] text-slate-800 dark:text-white rounded-lg font-black text-[9px] uppercase tracking-wider transition-all cursor-pointer"
                      >
                        Aktif Et
                      </button>
                    )}
                  </div>
                </div>

                {/* Rest of the general themes in COSMETICS_DB */}
                {Object.keys(COSMETICS_DB.themes).flatMap(rarity => 
                  COSMETICS_DB.themes[rarity].map(theme => {
                    const isUnlocked = unlockedThemes.includes(theme.value);
                    const isActive = activeTheme === theme.value;
                    
                    return (
                      <div 
                        key={theme.id}
                        className={`flex flex-col rounded-2xl bg-white dark:bg-[#12141c] border overflow-hidden shadow-sm transition-all relative ${
                          isActive ? 'border-cyan-accent shadow-md' : 'border-slate-200 dark:border-[#1f2330]'
                        }`}
                      >
                        {/* Rarity Tag */}
                        <div className="absolute top-1 right-1">
                          <span className={`text-[7px] font-black px-1 py-0.5 rounded uppercase tracking-wider ${getRarityBadgeStyle(theme.rarity)}`}>
                            {theme.rarity}
                          </span>
                        </div>

                        <div className="h-10 w-full bg-slate-150 dark:bg-[#1f2330] border-b border-slate-200 dark:border-[#1f2330] flex items-center justify-center p-2">
                          <span className="text-[9px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider truncate text-center w-full pr-5">{theme.name}</span>
                        </div>

                        <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                          {!isUnlocked ? (
                            <div className="flex-1 flex flex-col items-center justify-center py-2 text-slate-400 dark:text-gray-500">
                              <Lock className="w-4 h-4 mb-1" />
                              <span className="text-[9px] font-black uppercase tracking-wider">Kilitli</span>
                            </div>
                          ) : (
                            <>
                              <p className="text-[9px] text-slate-400 dark:text-gray-500 font-semibold leading-normal truncate text-left">Açılmış genel arayüz teması.</p>
                              {isActive ? (
                                <div className="w-full py-1.5 bg-cyan-accent/10 border border-cyan-accent/25 text-cyan-accent rounded-lg font-black text-[9px] uppercase tracking-wider flex items-center justify-center gap-1 select-none leading-none">
                                  <Check className="w-3 h-3" />
                                  <span>Aktif</span>
                                </div>
                              ) : (
                                <button
                                  onClick={() => selectActiveTheme(theme.value)}
                                  className="w-full py-1.5 px-2 bg-slate-100 dark:bg-[#1f2330] hover:bg-slate-200 dark:hover:bg-[#2a2f42] text-slate-800 dark:text-white rounded-lg font-black text-[9px] uppercase tracking-wider transition-all cursor-pointer"
                                >
                                  Aktif Et
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}

                {/* Exclusive Siber Usta General Theme if Unlocked */}
                {unlockedThemes.includes('cyber-master') && (
                  <div className={`flex flex-col rounded-2xl bg-white dark:bg-[#12141c] border overflow-hidden shadow-sm transition-all ${
                    activeTheme === 'cyber-master' ? 'border-amber-500 shadow-md' : 'border-slate-200 dark:border-[#1f2330]'
                  }`}>
                    <div className="h-10 w-full bg-gradient-to-r from-amber-500 to-yellow-600 flex items-center justify-center p-2">
                      <span className="text-[9px] font-black text-white uppercase tracking-wider truncate">🏆 Siber Usta</span>
                    </div>
                    <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                      <p className="text-[9px] text-slate-450 dark:text-gray-500 font-semibold leading-normal truncate text-left">Seçkin usta teması.</p>
                      {activeTheme === 'cyber-master' ? (
                        <div className="w-full py-1.5 bg-amber-500/10 border border-amber-550/25 text-amber-500 rounded-lg font-black text-[9px] uppercase tracking-wider flex items-center justify-center gap-1 select-none leading-none">
                          <Check className="w-3 h-3" />
                          <span>Aktif</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => selectActiveTheme('cyber-master')}
                          className="w-full py-1.5 px-2 bg-slate-100 dark:bg-[#1f2330] hover:bg-slate-200 dark:hover:bg-[#2a2f42] text-slate-800 dark:text-white rounded-lg font-black text-[9px] uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Aktif Et
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Card Frames List */}
            {activeSubTab === 'cardThemes' && (
              <>
                {/* Default Clean Slate card theme */}
                <div className={`flex flex-col rounded-2xl bg-white dark:bg-[#12141c] border overflow-hidden shadow-sm transition-all ${
                  activeCardTheme === 'clean-slate' ? 'border-cyan-accent shadow-md' : 'border-slate-200 dark:border-[#1f2330]'
                }`}>
                  <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center p-2">
                    <span className="text-[9px] font-black text-slate-700 dark:text-slate-350 uppercase tracking-wider truncate">Clean Slate</span>
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                    <p className="text-[9px] text-slate-400 dark:text-gray-500 font-semibold leading-normal truncate text-left">Düz gri, standart kart.</p>
                    {activeCardTheme === 'clean-slate' ? (
                      <div className="w-full py-1.5 bg-cyan-accent/10 border border-cyan-accent/25 text-cyan-accent rounded-lg font-black text-[9px] uppercase tracking-wider flex items-center justify-center gap-1 select-none leading-none">
                        <Check className="w-3 h-3" />
                        <span>Seçili</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => selectActiveCardTheme('clean-slate')}
                        className="w-full py-1.5 px-2 bg-slate-100 dark:bg-[#1f2330] hover:bg-slate-200 dark:hover:bg-[#2a2f42] text-slate-800 dark:text-white rounded-lg font-black text-[9px] uppercase tracking-wider transition-all cursor-pointer"
                      >
                        Seç
                      </button>
                    )}
                  </div>
                </div>

                {/* Rest of the card themes in COSMETICS_DB */}
                {Object.keys(COSMETICS_DB.cardThemes).flatMap(rarity => 
                  COSMETICS_DB.cardThemes[rarity].map(cardTheme => {
                    const isUnlocked = unlockedCardThemes.includes(cardTheme.value);
                    const isActive = activeCardTheme === cardTheme.value;
                    
                    return (
                      <div 
                        key={cardTheme.id}
                        className={`flex flex-col rounded-2xl bg-white dark:bg-[#12141c] border overflow-hidden shadow-sm transition-all relative ${
                          isActive ? 'border-cyan-accent shadow-md' : 'border-slate-200 dark:border-[#1f2330]'
                        }`}
                      >
                        {/* Rarity Tag */}
                        <div className="absolute top-1 right-1 z-5">
                          <span className={`text-[7px] font-black px-1 py-0.5 rounded uppercase tracking-wider ${getRarityBadgeStyle(cardTheme.rarity)}`}>
                            {cardTheme.rarity}
                          </span>
                        </div>

                        <div className="h-10 w-full bg-slate-150 dark:bg-[#1f2330] border-b border-slate-200 dark:border-[#1f2330] flex items-center justify-center p-2">
                          <span className="text-[9px] font-black text-slate-700 dark:text-slate-350 uppercase tracking-wider truncate text-center w-full pr-5">{cardTheme.name}</span>
                        </div>

                        <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                          {!isUnlocked ? (
                            <div className="flex-1 flex flex-col items-center justify-center py-2 text-slate-400 dark:text-gray-500">
                              <Lock className="w-4 h-4 mb-1" />
                              <span className="text-[9px] font-black uppercase tracking-wider">Kilitli</span>
                            </div>
                          ) : (
                            <>
                              <p className="text-[9px] text-slate-400 dark:text-gray-500 font-semibold leading-normal truncate text-left">Kişisel skor kartı süsü.</p>
                              {isActive ? (
                                <div className="w-full py-1.5 bg-cyan-accent/10 border border-cyan-accent/25 text-cyan-accent rounded-lg font-black text-[9px] uppercase tracking-wider flex items-center justify-center gap-1 select-none leading-none">
                                  <Check className="w-3 h-3" />
                                  <span>Seçili</span>
                                </div>
                              ) : (
                                <button
                                  onClick={() => selectActiveCardTheme(cardTheme.value)}
                                  className="w-full py-1.5 px-2 bg-slate-100 dark:bg-[#1f2330] hover:bg-slate-200 dark:hover:bg-[#2a2f42] text-slate-800 dark:text-white rounded-lg font-black text-[9px] uppercase tracking-wider transition-all cursor-pointer"
                                >
                                  Seç
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}

                {/* Exclusive Siber Usta Card Frame if Unlocked */}
                {unlockedCardThemes.includes('cyber-master-card') && (
                  <div className={`flex flex-col rounded-2xl bg-white dark:bg-[#12141c] border overflow-hidden shadow-sm transition-all ${
                    activeCardTheme === 'cyber-master-card' ? 'border-amber-500 shadow-md' : 'border-slate-200 dark:border-[#1f2330]'
                  }`}>
                    <div className="h-10 w-full bg-gradient-to-r from-amber-500 to-yellow-600 flex items-center justify-center p-2">
                      <span className="text-[9px] font-black text-white uppercase tracking-wider truncate">🏆 Siber Usta</span>
                    </div>
                    <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                      <p className="text-[9px] text-slate-450 dark:text-gray-500 font-semibold leading-normal truncate text-left">Altın siber yaldızlı kart.</p>
                      {activeCardTheme === 'cyber-master-card' ? (
                        <div className="w-full py-1.5 bg-amber-500/10 border border-amber-550/25 text-amber-500 rounded-lg font-black text-[9px] uppercase tracking-wider flex items-center justify-center gap-1 select-none leading-none">
                          <Check className="w-3 h-3" />
                          <span>Seçili</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => selectActiveCardTheme('cyber-master-card')}
                          className="w-full py-1.5 px-2 bg-slate-100 dark:bg-[#1f2330] hover:bg-slate-200 dark:hover:bg-[#2a2f42] text-slate-800 dark:text-white rounded-lg font-black text-[9px] uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Seç
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Profile Emojis List */}
            {activeSubTab === 'emojis' && (
              <>
                {/* Default starting emojis */}
                {['👤', '🤖', '😀', '😎', '👾'].map(emoji => (
                  <div 
                    key={emoji}
                    className={`flex flex-col rounded-2xl bg-white dark:bg-[#12141c] border overflow-hidden shadow-sm transition-all ${
                      userAvatar === emoji ? 'border-cyan-accent shadow-md' : 'border-slate-200 dark:border-[#1f2330]'
                    }`}
                  >
                    <div className="h-12 w-full bg-slate-100 dark:bg-[#1f2330] flex items-center justify-center text-2xl select-none">
                      {emoji}
                    </div>
                    <div className="p-3 flex flex-col justify-between space-y-2">
                      {userAvatar === emoji ? (
                        <div className="w-full py-1.5 bg-cyan-accent/10 border border-cyan-accent/25 text-cyan-accent rounded-lg font-black text-[9px] uppercase tracking-wider flex items-center justify-center gap-1 select-none leading-none">
                          <Check className="w-3 h-3" />
                          <span>Aktif</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => selectUserAvatar(emoji)}
                          className="w-full py-1.5 px-2 bg-slate-100 dark:bg-[#1f2330] hover:bg-slate-200 dark:hover:bg-[#2a2f42] text-slate-800 dark:text-white rounded-lg font-black text-[9px] uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Seç
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* Rest of the emojis in COSMETICS_DB */}
                {Object.keys(COSMETICS_DB.emojis).flatMap(rarity => 
                  COSMETICS_DB.emojis[rarity].map(emojiItem => {
                    const isUnlocked = unlockedEmojis.includes(emojiItem.value);
                    const isActive = userAvatar === emojiItem.value;
                    
                    return (
                      <div 
                        key={emojiItem.id}
                        className={`flex flex-col rounded-2xl bg-white dark:bg-[#12141c] border overflow-hidden shadow-sm transition-all relative ${
                          isActive ? 'border-cyan-accent shadow-md' : 'border-slate-200 dark:border-[#1f2330]'
                        }`}
                      >
                        {/* Rarity Tag */}
                        <div className="absolute top-1 right-1 z-5">
                          <span className={`text-[7px] font-black px-1 py-0.5 rounded uppercase tracking-wider ${getRarityBadgeStyle(emojiItem.rarity)}`}>
                            {emojiItem.rarity}
                          </span>
                        </div>

                        <div className="h-12 w-full bg-slate-100 dark:bg-[#1f2330] flex items-center justify-center text-2xl select-none">
                          {emojiItem.value}
                        </div>

                        <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                          {!isUnlocked ? (
                            <div className="flex-1 flex flex-col items-center justify-center py-1.5 text-slate-400 dark:text-gray-500">
                              <Lock className="w-4 h-4 mb-1" />
                              <span className="text-[9px] font-black uppercase tracking-wider">Kilitli</span>
                            </div>
                          ) : (
                            <>
                              {isActive ? (
                                <div className="w-full py-1.5 bg-cyan-accent/10 border border-cyan-accent/25 text-cyan-accent rounded-lg font-black text-[9px] uppercase tracking-wider flex items-center justify-center gap-1 select-none leading-none">
                                  <Check className="w-3 h-3" />
                                  <span>Aktif</span>
                                </div>
                              ) : (
                                <button
                                  onClick={() => selectUserAvatar(emojiItem.value)}
                                  className="w-full py-1.5 px-2 bg-slate-100 dark:bg-[#1f2330] hover:bg-slate-200 dark:hover:bg-[#2a2f42] text-slate-800 dark:text-white rounded-lg font-black text-[9px] uppercase tracking-wider transition-all cursor-pointer"
                                >
                                  Seç
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}

                {/* Exclusive Siber Usta Emoji if Unlocked */}
                {unlockedEmojis.includes('🕵️‍♂️') && (
                  <div className={`flex flex-col rounded-2xl bg-white dark:bg-[#12141c] border overflow-hidden shadow-sm transition-all ${
                    userAvatar === '🕵️‍♂️' ? 'border-amber-500 shadow-md' : 'border-slate-200 dark:border-[#1f2330]'
                  }`}>
                    <div className="h-12 w-full bg-slate-100 dark:bg-[#1f2330] flex items-center justify-center text-2xl select-none">
                      🕵️‍♂️
                    </div>
                    <div className="p-3 flex flex-col justify-between space-y-2">
                      {userAvatar === '🕵️‍♂️' ? (
                        <div className="w-full py-1.5 bg-amber-500/10 border border-amber-550/25 text-amber-500 rounded-lg font-black text-[9px] uppercase tracking-wider flex items-center justify-center gap-1 select-none leading-none">
                          <Check className="w-3 h-3" />
                          <span>Aktif</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => selectUserAvatar('🕵️‍♂️')}
                          className="w-full py-1.5 px-2 bg-slate-100 dark:bg-[#1f2330] hover:bg-slate-200 dark:hover:bg-[#2a2f42] text-slate-800 dark:text-white rounded-lg font-black text-[9px] uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Seç
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

          </div>
        </div>
      )}

      {/* Loot Reveal Overlay Modal */}
      <AnimatePresence>
        {openingBox && (
          <div className="absolute inset-0 bg-slate-950/80 dark:bg-black/90 backdrop-blur-md flex flex-col justify-center items-center p-6 z-50 animate-fade-in text-center select-none">
            
            {!revealed ? (
              // Animation stage
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="space-y-6"
              >
                <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto shadow-2xl relative">
                  <Box className="w-10 h-10 text-amber-500 animate-bounce" />
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-dashed border-cyan-accent"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                  ></motion.div>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-black text-white uppercase tracking-widest leading-none">Sistem Taraması Yapılıyor</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Veri Paketi Çözümleniyor...</p>
                </div>
              </motion.div>
            ) : (
              // Reveal stage
              openedItem && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white dark:bg-[#12141c] border-2 border-amber-500 rounded-3xl p-6 shadow-2xl relative overflow-hidden max-w-xs w-full text-center"
                >
                  {/* Decorative Rarity Top line */}
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-amber-500"></div>

                  <span className={`inline-block text-[8px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-4 ${getRarityBadgeStyle(openedItem.rarity)}`}>
                    {getRarityText(openedItem.rarity)}
                  </span>

                  <h3 className="text-slate-800 dark:text-white font-black text-sm uppercase tracking-tight mb-4">
                    {openedItem.refunded ? 'İADE YAPILDI' : 'YENİ KOZMETİK AÇILDI!'}
                  </h3>

                  {/* Cosmetic Presentation display */}
                  <div className="my-4 p-4 rounded-2xl bg-slate-50 dark:bg-[#08090d] border border-slate-200 dark:border-[#1f2330] flex flex-col items-center justify-center min-h-[110px] shadow-inner">
                    {openedItem.type === 'emoji' ? (
                      <span className="text-5xl select-none animate-pulse">{openedItem.value}</span>
                    ) : openedItem.type === 'theme' ? (
                      <div className="flex flex-col items-center gap-2">
                        <Palette className="w-10 h-10 text-cyan-500" />
                        <span className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">{openedItem.name}</span>
                        <span className="text-[8px] text-slate-400 uppercase tracking-widest">Genel Arayüz Teması</span>
                      </div>
                    ) : openedItem.type === 'cardTheme' ? (
                      <div className="w-full">
                        {/* Show player card preview styled with opened theme */}
                        <div className={`flex items-center justify-between p-3 rounded-xl card-theme-${openedItem.value} text-left`}>
                          <span className="text-lg leading-none select-none">👤</span>
                          <span className="text-[10px] font-black uppercase tracking-wider truncate pr-2">{openedItem.name}</span>
                          <span className="text-[8px] font-mono text-cyan-600 dark:text-cyan-accent text-right">Skor Kartı</span>
                        </div>
                      </div>
                    ) : openedItem.type === 'refund' ? (
                      <div className="flex flex-col items-center gap-1">
                        <Coins className="w-8 h-8 text-amber-500 animate-bounce" />
                        <span className="text-xl font-black text-amber-600 dark:text-amber-500 font-mono">{openedItem.value}</span>
                        <p className="text-[9px] text-slate-450 dark:text-gray-400 font-semibold leading-normal mt-1">{openedItem.reason}</p>
                      </div>
                    ) : openedItem.type === 'special_bundle' ? (
                      <div className="flex flex-col items-center gap-1.5">
                        <Trophy className="w-8 h-8 text-amber-500 animate-pulse" />
                        <span className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">{openedItem.name}</span>
                        <span className="text-[9px] text-slate-450 dark:text-gray-400 font-semibold">Tüm Siber Usta kozmetiklerinin kilidi açıldı!</span>
                      </div>
                    ) : (
                      <span className="text-xs font-black text-slate-400">Paket Tanımlanamadı</span>
                    )}
                  </div>

                  {!openedItem.refunded && !openedItem.specialPackage && (
                    <p className="text-[9px] text-slate-500 dark:text-gray-400 font-medium leading-normal mb-5">
                      Bu kozmetik artık kilitli değil! Envanter sekmesinden hemen aktif edebilir veya profilinizi süsleyebilirsiniz.
                    </p>
                  )}

                  <button 
                    onClick={() => setOpeningBox(false)}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-white rounded-2xl text-xs uppercase font-black tracking-wider transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] cursor-pointer"
                  >
                    Kapat
                  </button>
                </motion.div>
              )
            )}

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
