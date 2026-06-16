import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../../state/AppContext';
import { ShoppingBag, Coins, Check, ShieldCheck, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SHOP_THEMES = [
  {
    id: 'arctic',
    title: 'Arctic Protocol',
    price: 100,
    description: 'Veri merkezi esintili soğuk buz mavisi görünümü.',
    colors: ['#0EA5E9', '#DFF6FF', '#081420'], // light accent, light bg, dark bg
    bannerClass: 'bg-gradient-to-r from-sky-400 to-sky-600'
  },
  {
    id: 'ocean',
    title: 'Ocean Core',
    price: 200,
    description: 'Teknoloji şirketi hissi veren mavi ve lacivert tonları.',
    colors: ['#0284C7', '#E0F2FE', '#0B1B3D'],
    bannerClass: 'bg-gradient-to-r from-blue-600 to-indigo-800'
  },
  {
    id: 'amber',
    title: 'Amber Shield',
    price: 300,
    description: 'Sıcak turuncu SOC ve siber tehdit izleme paneli.',
    colors: ['#F97316', '#FFF7ED', '#1C0D02'],
    bannerClass: 'bg-gradient-to-r from-amber-500 to-orange-650'
  },
  {
    id: 'matrix',
    title: 'Matrix Noir',
    price: 500,
    description: 'CRT yeşil terminal ekranı ve dijital tarama çizgileri.',
    colors: ['#22C55E', '#DCFCE7', '#020D04'],
    bannerClass: 'bg-gradient-to-r from-green-500 to-emerald-950'
  }
];

export default function Store() {
  const { 
    veriPuani, 
    unlockedThemes, 
    activeTheme, 
    selectActiveTheme, 
    buyTheme,
    lastDailyClaimTime,
    claimDailyReward
  } = useApp();

  const [activeTab, setActiveTab] = useState('shop'); // 'shop' | 'inventory'
  const [successMessage, setSuccessMessage] = useState('');

  // Cooldown calculator helper
  const getRemainingCooldown = useCallback(() => {
    const now = Date.now();
    const cooldown = 24 * 60 * 60 * 1000;
    const rem = cooldown - (now - lastDailyClaimTime);
    return rem > 0 ? rem : 0;
  }, [lastDailyClaimTime]);

  const [timeLeft, setTimeLeft] = useState(getRemainingCooldown);

  useEffect(() => {
    // Sync local state when lastDailyClaimTime updates externally (asynchronously)
    const timeoutId = setTimeout(() => {
      setTimeLeft(getRemainingCooldown());
    }, 0);

    const interval = setInterval(() => {
      setTimeLeft(getRemainingCooldown());
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(interval);
    };
  }, [lastDailyClaimTime, getRemainingCooldown]);

  const handleBuy = (theme) => {
    const success = buyTheme(theme.id, theme.price);
    if (success) {
      setSuccessMessage(`"${theme.title}" başarıyla satın alındı!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleActivate = (themeId) => {
    selectActiveTheme(themeId);
  };

  const handleClaimDaily = () => {
    const success = claimDailyReward();
    if (success) {
      setSuccessMessage('Günlük Veri Bonusu (+50 VP) Alındı!');
      setTimeLeft(24 * 60 * 60 * 1000); // Update local state instantly for smooth UX
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

  // Filter items
  const shopItems = SHOP_THEMES.filter(t => !unlockedThemes.includes(t.id));
  const ownedItems = SHOP_THEMES.filter(t => unlockedThemes.includes(t.id));

  // Include default theme in owned list
  const allOwnedItems = [
    {
      id: 'default',
      title: 'Cyber Cyan (Varsayılan)',
      description: 'Klasik neon siber güvenlik yeşili ve mavi tonları.',
      colors: ['#00E5FF', '#F1F5F9', '#08090D'],
      bannerClass: 'bg-gradient-to-r from-cyan-400 to-cyan-600'
    },
    ...ownedItems
  ];

  return (
    <div className="flex-1 flex flex-col p-4 bg-slate-50 dark:bg-[#08090d] select-none overflow-y-auto max-h-[720px] pb-8 pr-1.5 animate-fade-in">
      
      {/* Header Stat Area: VP Balance */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] shadow-sm mb-4 relative overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2330_1px,transparent_1px),linear-gradient(to_bottom,#1f2330_1px,transparent_1px)] bg-[size:16px_16px] opacity-5 pointer-events-none"></div>

        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-2 relative z-10 shrink-0 shadow-sm animate-pulse">
          <Coins className="w-6 h-6 text-amber-500" />
        </div>
        <div className="relative z-10">
          <p className="text-[9px] text-slate-400 dark:text-gray-500 font-black uppercase tracking-widest leading-none mb-1">Mevcut Bakiyeniz</p>
          <h2 className="text-xl font-black text-amber-600 dark:text-amber-500 font-mono leading-none">{veriPuani} VP</h2>
        </div>

        {/* Global purchase feedback banner */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-2 left-2 right-2 py-1.5 px-3 bg-safe-green text-white text-[10px] font-black rounded-lg uppercase tracking-wide shadow-md flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{successMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Günlük Veri Bonusu Card */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] shadow-sm mb-4 relative overflow-hidden flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
            timeLeft > 0 
              ? 'bg-slate-100 dark:bg-[#1f2330] border-slate-250 dark:border-[#1f2330] text-slate-400 dark:text-gray-500' 
              : 'bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/20 dark:border-emerald-550/20 text-emerald-600 dark:text-emerald-400 animate-pulse'
          }`}>
            <Gift className="w-5 h-5" />
          </div>
          <div>
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
          Mağaza ({shopItems.length})
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
            activeTab === 'inventory'
              ? 'bg-white dark:bg-[#12141c] border border-slate-250 dark:border-[#1f2330] text-cyan-600 dark:text-cyan-accent shadow-sm'
              : 'text-slate-500 dark:text-gray-400'
          }`}
        >
          Temalarım ({allOwnedItems.length})
        </button>
      </div>

      {/* Grid Content List (Responsive 2 cols grid) */}
      <div className="grid grid-cols-2 gap-3.5 flex-1 content-start pb-4">
        {activeTab === 'shop' ? (
          shopItems.length > 0 ? (
            shopItems.map((theme) => {
              const canAfford = veriPuani >= theme.price;
              return (
                <div 
                  key={theme.id}
                  className="flex flex-col rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] overflow-hidden shadow-sm hover:shadow-md transition-all group"
                >
                  {/* Visual Preview Banner */}
                  <div className={`h-12 w-full ${theme.bannerClass} relative flex items-center justify-center p-2 text-center`}>
                    <span className="text-[10px] font-black text-white uppercase tracking-wider drop-shadow-sm truncate">{theme.title}</span>
                  </div>

                  {/* Body description */}
                  <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                    <p className="text-[9px] text-slate-500 dark:text-gray-400 font-semibold leading-normal min-h-[42px] line-clamp-3">
                      {theme.description}
                    </p>

                    <button
                      onClick={() => handleBuy(theme)}
                      disabled={!canAfford}
                      className={`w-full py-2 px-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer select-none ${
                        canAfford
                          ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-[0_0_10px_rgba(245,158,11,0.2)] active:scale-[0.97]'
                          : 'bg-slate-100 dark:bg-[#1f2330] text-slate-450 dark:text-gray-500 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <Coins className="w-3 h-3 shrink-0" />
                      <span>{theme.price} VP</span>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-2 text-center py-8 text-slate-500 dark:text-gray-450 space-y-2">
              <ShoppingBag className="w-8 h-8 mx-auto text-slate-350 dark:text-gray-600 opacity-60" />
              <p className="text-xs font-black uppercase tracking-wider">Tüm temaları satın aldın!</p>
              <p className="text-[10px] font-medium leading-normal max-w-xs mx-auto">Tebrikler, tüm kişiselleştirme paketlerini envanterine ekledin.</p>
            </div>
          )
        ) : (
          allOwnedItems.map((theme) => {
            const isActive = activeTheme === theme.id;
            return (
              <div 
                key={theme.id}
                className={`flex flex-col rounded-2xl bg-white dark:bg-[#12141c] border overflow-hidden shadow-sm transition-all group ${
                  isActive ? 'border-cyan-accent shadow-md' : 'border-slate-200 dark:border-[#1f2330]'
                }`}
              >
                {/* Visual Preview Banner */}
                <div className={`h-12 w-full ${theme.bannerClass} relative flex items-center justify-center p-2 text-center`}>
                  <span className="text-[10px] font-black text-white uppercase tracking-wider drop-shadow-sm truncate">{theme.title}</span>
                </div>

                {/* Body description */}
                <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                  <p className="text-[9px] text-slate-500 dark:text-gray-400 font-semibold leading-normal min-h-[42px] line-clamp-3">
                    {theme.description}
                  </p>

                  {isActive ? (
                    <div className="w-full py-2 bg-cyan-accent/10 border border-cyan-accent/25 text-cyan-accent rounded-xl font-black text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 select-none leading-none">
                      <Check className="w-3.5 h-3.5 shrink-0" />
                      <span>Aktif</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleActivate(theme.id)}
                      className="w-full py-2 px-2.5 bg-slate-100 dark:bg-[#1f2330] hover:bg-slate-200 dark:hover:bg-[#2a2f42] text-slate-800 dark:text-white rounded-xl font-black text-[10px] uppercase tracking-wider transition-all active:scale-[0.97] cursor-pointer leading-none"
                    >
                      Aktif Et
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
