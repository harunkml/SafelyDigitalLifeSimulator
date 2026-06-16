import { useState } from 'react';
import { useApp } from '../../state/AppContext';
import { ShoppingBag, Coins, Check, Lock, ShieldCheck, HelpCircle } from 'lucide-react';
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
    buyTheme 
  } = useApp();

  const [activeTab, setActiveTab] = useState('shop'); // 'shop' | 'inventory'
  const [successMessage, setSuccessMessage] = useState('');

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
