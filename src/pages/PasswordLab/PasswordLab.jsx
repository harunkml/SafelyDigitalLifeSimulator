import { useState, useEffect } from 'react';
import { mockPasswords } from '../../data/mockData';
import { KeyRound, ShieldAlert, CheckCircle, Hand, ArrowRight, ArrowLeft, Terminal, Settings } from 'lucide-react';
import { motion, useAnimation, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useApp } from '../../state/AppContext';
import { useNavigate } from 'react-router-dom';
import { playSynthSound } from '../../utils/soundEffects';
import SettingsModal from '../../components/SettingsModal/SettingsModal';

const IS_DEV_MODE = true;

export default function PasswordLab() {
  const { 
    setPasswordScore, 
    setPasswordCompleted, 
    passwordScore, 
    sfxVolume,
    awardAnswerVP,
    awardCompletionVP,
    unlockAchievement,
    username
  } = useApp();
  const navigate = useNavigate();
  
  const [gameStatus, setGameStatus] = useState('intro'); // intro | playing | won
  const [passwordPool, setPasswordPool] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [toast, setToast] = useState(null);
  const [flash, setFlash] = useState(null); // 'green' | 'red' | null
  const [localScore, setLocalScore] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [streak, setStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  // Framer Motion controls
  const controls = useAnimation();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 0, 150], [-10, 0, 10]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const startNewGame = () => {
    // Filter passwords by strength
    const weakPool = mockPasswords.filter(p => p.strength === 'weak' || p.strength === 'very_weak');
    const strongPool = mockPasswords.filter(p => p.strength === 'strong' || p.strength === 'very_strong');
    
    // Shuffle arrays using Fisher-Yates algorithm
    const shuffleArray = (arr) => {
      const newArr = [...arr];
      for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      }
      return newArr;
    };

    if (weakPool.length === 0 || strongPool.length === 0) {
      // Fallback if data is not fully configured or loaded
      const shuffled = [...mockPasswords].sort(() => 0.5 - Math.random()).slice(0, 15);
      setPasswordPool(shuffled);
    } else {
      const shuffledWeak = shuffleArray(weakPool);
      const shuffledStrong = shuffleArray(strongPool);
      
      const selectedWeak = shuffledWeak.slice(0, 8);
      const selectedStrong = shuffledStrong.slice(0, 7);
      
      const combined = shuffleArray([...selectedWeak, ...selectedStrong]);
      setPasswordPool(combined);
    }
    
    setCurrentIndex(0);
    setStreak(0);
    setCorrectCount(0);
    setGameStatus('playing');
    controls.set({ x: 0, opacity: 1 });
    setIsTransitioning(false);
  };

  const handleDevSkip = () => {
    setPasswordScore(500);
    setPasswordCompleted(true);
    setGameStatus('won');
  };

  const handleClassify = async (direction) => {
    if (isTransitioning) return;
    
    const currentPassword = passwordPool[currentIndex];
    
    // Animate the card flying off screen
    await controls.start({
      x: direction === 'right' ? 300 : -300,
      opacity: 0,
      transition: { duration: 0.3 }
    });

    const isWeakGuess = direction === 'left';
    const isStrongGuess = direction === 'right';
    
    const actualIsWeak = currentPassword.strength === 'weak' || currentPassword.strength === 'very_weak';
    const actualIsStrong = currentPassword.strength === 'strong' || currentPassword.strength === 'very_strong';

    let isCorrect = false;
    if (isWeakGuess && actualIsWeak) isCorrect = true;
    if (isStrongGuess && actualIsStrong) isCorrect = true;

    let nextScore = localScore;
    let earnedText = '';
    if (isCorrect) {
      playSynthSound('success', sfxVolume);
      if (navigator.vibrate) navigator.vibrate(50);
      nextScore = localScore + 50;
      setLocalScore(nextScore);
      setFlash('green');

      const nextStreak = streak + 1;
      setStreak(nextStreak);
      const nextCorrect = correctCount + 1;
      setCorrectCount(nextCorrect);

      const { vpEarned, streakBonus } = awardAnswerVP(true, nextStreak);
      earnedText = `+${vpEarned} VP`;
      if (streakBonus > 0) {
        earnedText += ` & +${streakBonus} VP Seri Bonusu!`;
      }
    } else {
      playSynthSound('failure', sfxVolume);
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
      nextScore = Math.max(0, localScore - 30);
      setLocalScore(nextScore);
      setFlash('red');
      setStreak(0);
    }

    setToast({
      id: Date.now(),
      isCorrect,
      passwordText: currentPassword.text,
      explanation: currentPassword.explanation,
      earnedVP: earnedText
    });
    
    setTimeout(() => setFlash(null), 300);

    // Instead of feedback state, load the next card seamlessly.
    if (currentIndex < passwordPool.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      // Reset card position for next render invisibly
      controls.set({ x: 0, opacity: 1 });
    } else {
      setIsTransitioning(true);
      setTimeout(() => {
        playSynthSound('win', sfxVolume);
        if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
        const finalScore = nextScore + 500; // 500 completion bonus
        setPasswordScore(finalScore);
        setPasswordCompleted(true);
        setGameStatus('won');
        setIsTransitioning(false);

        // Award completion VP
        awardCompletionVP();

        // Check achievements
        const finalCorrect = isCorrect ? correctCount + 1 : correctCount;
        if (finalCorrect >= 14) {
          unlockAchievement('accuracy_90');
        }
        if (finalCorrect === 15) {
          unlockAchievement('password_master');
        }
        const savedAchievements = JSON.parse(localStorage.getItem('safely_unlocked_achievements') || '[]');
        const hasEmailMaster = savedAchievements.includes('email_master');
        const hasPermissionMaster = savedAchievements.includes('permission_master');
        if (finalCorrect === 15 && hasEmailMaster && hasPermissionMaster) {
          unlockAchievement('cyber_detective');
        }
      }, 1500);
    }
  };

  // Auto clear toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(prev => (prev?.id === toast.id ? null : prev));
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleDragEnd = (event, info) => {
    if (isTransitioning) return;
    const threshold = 100;
    if (info.offset.x > threshold) {
      handleClassify('right'); // Strong
    } else if (info.offset.x < -threshold) {
      handleClassify('left'); // Weak
    } else {
      controls.start({ x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } });
    }
  };

  if (gameStatus === 'intro') {
    return (
      <div className="flex-1 flex flex-col justify-between p-5 bg-slate-50 dark:bg-[#08090d] select-none text-slate-800 dark:text-white animate-fade-in h-full overflow-y-auto">
        <div className="flex-1 flex flex-col items-center text-center space-y-5 max-w-sm mx-auto py-4">
          <div className="w-16 h-16 rounded-3xl bg-cyan-accent/10 border-2 border-cyan-accent flex items-center justify-center pulse-accent shrink-0">
            <KeyRound className="w-8 h-8 text-cyan-accent animate-pulse" />
          </div>
          
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-slate-800 dark:text-white">
              Şifre Laboratuvarı
            </h2>
            <p className="text-xs text-cyan-accent font-bold tracking-widest uppercase mt-1">
              Bölüm 2 - Parola Güvenliği
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] text-sm text-slate-600 dark:text-gray-300 leading-relaxed text-left space-y-3 w-full shadow-sm">
            <p className="font-semibold text-slate-700 dark:text-gray-200">Dijital dünyadaki her hesabın ilk savunma hattı şifrendir.</p>
            <p>Birçok hesap, karmaşık saldırılarla değil; tahmin edilmesi kolay şifreler nedeniyle ele geçirilir.</p>
            <p>Hackerlar isimler, doğum tarihleri, futbol takımları ve en sık kullanılan şifrelerden oluşan dev listeler kullanır.</p>
            <p className="text-cyan-accent/90 font-medium">Bir şifre ne kadar tahmin edilemez ve benzersizse, hesabın da o kadar güvende olur.</p>
            <div className="pt-2 border-t border-slate-200 dark:border-[#1f2330]">
              <p className="font-bold text-slate-500 dark:text-gray-400 mb-2">Karşına çıkacak şifreleri incele ve onları doğru şekilde sınıflandır:</p>
              <p className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-safe-green" /> <strong className="text-safe-green">Sağa kaydır</strong> = Güçlü Şifre</p>
              <p className="flex items-center gap-2 mt-1"><ArrowLeft className="w-4 h-4 text-danger-red" /> <strong className="text-danger-red">Sola kaydır</strong> = Zayıf Şifre</p>
            </div>
            <p className="font-black text-center text-slate-800 dark:text-white pt-2">Hazırsan başlayalım.</p>
          </div>
        </div>

        <button
          onClick={startNewGame}
          className="w-full py-4 bg-cyan-accent hover:bg-cyan-accent/90 active:scale-[0.98] text-[#08090d] font-black rounded-2xl shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all text-sm uppercase tracking-wider shrink-0"
        >
          Devam Et
        </button>
      </div>
    );
  }

  if (gameStatus === 'won') {
    return (
      <div className="flex-1 flex flex-col justify-center items-center text-center p-6 bg-slate-50 dark:bg-[#08090d] select-none h-full">
        <CheckCircle className="w-16 h-16 text-safe-green mb-4" />
        <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Laboratuvar Tamamlandı!</h2>
        <p className="text-base text-slate-500 dark:text-gray-400 mb-6">Tüm şifreleri başarıyla analiz ettin.</p>
        <div className="text-3xl font-black text-cyan-600 dark:text-cyan-accent mb-8">{passwordScore} Puan</div>
        <button
          onClick={() => navigate('/home')}
          className="w-full py-4 bg-slate-200 dark:bg-[#1f2330] text-slate-800 dark:text-white font-black rounded-2xl hover:bg-slate-300 dark:hover:bg-[#2a2f42] active:scale-[0.98] transition-all text-sm uppercase tracking-wider"
        >
          Ana Menüye Dön
        </button>
      </div>
    );
  }

  const currentPassword = passwordPool[currentIndex];

  const baseBgClass = flash === 'green' 
    ? 'bg-safe-green/20 dark:bg-safe-green/30' 
    : flash === 'red' 
      ? 'bg-danger-red/20 dark:bg-danger-red/30' 
      : 'bg-slate-50 dark:bg-[#08090d]';

  return (
    <div className={`flex-1 flex flex-col p-4 overflow-hidden h-full relative transition-colors duration-300 ${baseBgClass}`}>
      
      {/* Title & Progress */}
      <div className="mb-4 shrink-0 flex justify-between items-center bg-white dark:bg-[#12141c] p-3 rounded-2xl border border-slate-200 dark:border-[#1f2330] relative z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-cyan-accent" />
            Şifre Analizi
          </h2>
          {IS_DEV_MODE && username?.toLowerCase() === 'admin' && (
            <button 
              onClick={handleDevSkip}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-[#1f2330] text-cyan-accent hover:bg-slate-200 dark:hover:bg-[#2a2f42] transition-colors"
              title="Geliştirici Geçişi"
            >
              <Terminal className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={() => setShowSettings(true)}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1f2330] text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-accent active:scale-95 transition-all"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
        <div className="text-sm font-mono font-bold text-slate-500 dark:text-gray-400">
          {currentIndex + 1} / {passwordPool.length}
        </div>
      </div>

      {/* Main Swipe Area */}
      <div className="flex-1 flex flex-col justify-center items-center relative perspective-[1000px] z-10">
        
        <div className="absolute top-4 w-full flex justify-between px-2 opacity-50 text-xs uppercase font-bold tracking-widest z-0 pointer-events-none">
          <span className="text-danger-red flex flex-col items-center gap-1">
            <ArrowLeft className="w-5 h-5" />
            Zayıf
          </span>
          <span className="text-safe-green flex flex-col items-center gap-1">
            <ArrowRight className="w-5 h-5" />
            Güçlü
          </span>
        </div>

        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{ x, rotate, opacity }}
          className="w-full max-w-[300px] aspect-[4/5] rounded-3xl bg-white dark:bg-[#12141c] border-2 border-slate-200 dark:border-[#1f2330] flex flex-col items-center justify-center p-6 relative overflow-hidden shadow-xl cursor-grab active:cursor-grabbing z-10"
          whileDrag={{ scale: 1.05, boxShadow: "0px 10px 40px rgba(0, 229, 255, 0.15)" }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2330_1px,transparent_1px),linear-gradient(to_bottom,#1f2330_1px,transparent_1px)] bg-[size:16px_16px] opacity-20 dark:opacity-10 pointer-events-none"></div>
          
          <div className="relative z-10 text-center w-full">
            <div className="mb-8 opacity-40">
              <Hand className="w-8 h-8 mx-auto text-slate-800 dark:text-white animate-pulse" />
              <span className="text-xs text-slate-800 dark:text-white uppercase tracking-widest font-bold mt-2 block">Kaydır</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-mono font-bold text-slate-800 dark:text-white tracking-wider break-all leading-tight">
              {currentPassword?.text}
            </h3>
          </div>
        </motion.div>
      </div>

      {/* Pop-up feedback Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`absolute bottom-6 left-4 right-4 p-4 rounded-2xl border shadow-2xl z-50 backdrop-blur-md ${
              toast.isCorrect 
                ? 'bg-safe-green/10 border-safe-green/30 dark:bg-safe-green/20 dark:border-safe-green/40 text-safe-green' 
                : 'bg-danger-red/10 border-danger-red/30 dark:bg-danger-red/20 dark:border-danger-red/40 text-danger-red'
            }`}
          >
            <div className="flex items-start gap-3">
              {toast.isCorrect ? <CheckCircle className="w-6 h-6 shrink-0" /> : <ShieldAlert className="w-6 h-6 shrink-0" />}
              <div>
                <p className="text-sm font-bold uppercase mb-1">
                  {toast.isCorrect ? 'Doğru!' : 'Hatalı!'} <span className="text-slate-700 dark:text-gray-200 normal-case ml-1 font-mono text-xs bg-slate-200 dark:bg-[#08090d] px-1 py-0.5 rounded opacity-80">{toast.passwordText}</span>
                </p>
                {toast.isCorrect && toast.earnedVP && (
                  <div className="mb-1.5 inline-block px-2 py-0.5 bg-amber-500/10 text-amber-500 text-[10px] font-extrabold uppercase rounded-full border border-amber-500/20">
                    {toast.earnedVP}
                  </div>
                )}
                <p className="text-xs text-slate-600 dark:text-gray-300 font-semibold leading-snug">{toast.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}
