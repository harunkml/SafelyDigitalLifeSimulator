import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../state/AppContext';
import { Wifi, Battery, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OSFrame({ children }) {
  const { batteryLevel, username } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [time, setTime] = useState('');

  // Clock updates every 15 seconds for realistic feel
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      minutes = minutes < 10 ? '0' + minutes : minutes;
      hours = hours < 10 ? '0' + hours : hours;
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 15000);
    return () => clearInterval(interval);
  }, []);



  const isAtHome = location.pathname === '/home' || location.pathname === '/';
  const showBackButton = !isAtHome && location.pathname !== '/login';

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#030406] flex items-center justify-center p-0 sm:p-6 transition-all duration-300">
      
      {/* Smartphone Bezel (desktop only, stretched on mobile) */}
      <div className="w-full h-screen sm:h-[840px] sm:w-[410px] sm:rounded-[48px] sm:border-[12px] sm:border-slate-300 dark:sm:border-[#1e2230] bg-slate-50 dark:bg-[#08090d] flex flex-col relative overflow-hidden sm:shadow-[0_0_60px_rgba(0,0,0,0.2)] dark:sm:shadow-[0_0_60px_rgba(0,0,0,0.9)]">
        
        {/* Notch on Desktop */}
        <div className="hidden sm:block w-32 h-5 bg-slate-300 dark:bg-[#1e2230] rounded-full absolute top-2 left-1/2 -translate-x-1/2 z-40"></div>

        {/* Status Bar */}
        <div className="h-12 bg-slate-50 dark:bg-[#08090d] border-b border-slate-200 dark:border-[#1f2330] flex items-center justify-between px-6 select-none z-30 shrink-0">
          {/* Simulated Time */}
          <span className="text-sm font-semibold text-slate-600 dark:text-gray-300 tracking-wider">{time}</span>
          
          {/* Right Side Info (SKS Badge + Indicators) */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-slate-600 dark:text-gray-300">
              <Wifi className="w-3.5 h-3.5 text-cyan-accent" />
              <div className="flex items-center gap-1 select-none">
                <span className="text-xs font-semibold">{batteryLevel}%</span>
                <Battery className={`w-4 h-4 ${batteryLevel <= 20 ? 'text-danger-red' : 'text-cyan-accent'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Header Action Bar */}
        {showBackButton && (
          <div className="h-14 bg-slate-50/90 dark:bg-[#08090d]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#1f2330] flex items-center px-4 gap-2 z-20 shrink-0">
            <button 
              onClick={() => navigate(-1)}
              className="p-1.5 rounded-xl border border-slate-200 dark:border-[#1f2330] hover:border-cyan-accent/50 hover:text-cyan-accent active:scale-95 transition-all text-slate-500 dark:text-gray-400 bg-white dark:bg-[#12141c]"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-gray-400">Geri Dön</span>
          </div>
        )}

        {/* Dynamic Page Rendering with Framer Motion Screen Transitions */}
        <div className="flex-1 overflow-y-auto relative flex flex-col bg-slate-50 dark:bg-[#08090d]">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="flex-1 flex flex-col"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom OS Navigation bar (Sleek Phone Home Indicator Line) */}
        {username && (
          <div className="h-6 bg-slate-50 dark:bg-[#08090d] flex items-center justify-center pb-2 z-30 shrink-0 select-none">
            <div className="w-28 h-1 bg-slate-300 dark:bg-gray-700/50 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
}
