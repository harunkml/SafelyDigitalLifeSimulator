import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockEmails } from '../../data/mockData';
import { useApp } from '../../state/AppContext';
import { 
  Mail, 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  Info, 
  ArrowRight, 
  RefreshCw, 
  Trophy,
  AlertTriangle,
  ExternalLink,
  Settings,
  Terminal
} from 'lucide-react';
import { playSynthSound } from '../../utils/soundEffects';
import SettingsModal from '../../components/SettingsModal/SettingsModal';

// Geliştirici / Test modunu kontrol eden değişken. Yayına alırken false yapılmalıdır.
const IS_DEV_MODE = true;

export default function MailScreen() {
  const navigate = useNavigate();
  const { 
    lives, 
    setLives, 
    securityScore, 
    setSecurityScore, 
    username, 
    sound, 
    sfxVolume,
    setMailCompleted, 
    setMailScore, 
    mailFailedLocked,
    setMailFailedLocked,
    awardAnswerVP,
    awardCompletionVP,
    unlockAchievement
  } = useApp();
  
  const [gameStatus, setGameStatus] = useState('intro'); // 'intro' | 'playing' | 'feedback' | 'gameover' | 'won'
  const [emailPool, setEmailPool] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState(null); // { isCorrect: boolean, text: string, explanation: string }
  const [failedConsequence, setFailedConsequence] = useState(''); // consequenceFail text for gameover screen
  const [showSettings, setShowSettings] = useState(false);

  const [streak, setStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [earnedVPMsg, setEarnedVPMsg] = useState('');

  const handleAdminSkip = () => {
    setSecurityScore(1500); // 500 başlangıç + 20 mail * 50 = 1500 (Maksimum skor)
    setMailScore(1500);
    setMailCompleted(true);
    setGameStatus('won');
  };

  const startNewGame = () => {
    // Filter safe and phishing emails
    const safePool = mockEmails.filter(email => email.isSafe);
    const phishingPool = mockEmails.filter(email => !email.isSafe);

    // Randomly select 10 from each
    const getRandomSelection = (arr, count) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    const chosenSafe = getRandomSelection(safePool, 10);
    const chosenPhishing = getRandomSelection(phishingPool, 10);

    // Combine and shuffle
    const combined = [...chosenSafe, ...chosenPhishing];
    const finalShuffled = combined.sort(() => 0.5 - Math.random());

    setEmailPool(finalShuffled);
    setCurrentIndex(0);
    setLives(3);
    setSecurityScore(500);
    setFeedback(null);
    setFailedConsequence('');
    setStreak(0);
    setCorrectCount(0);
    setEarnedVPMsg('');
    setGameStatus('playing');
  };

  const handleDecision = (userSaysSafe) => {
    const currentEmail = emailPool[currentIndex];
    const isCorrect = userSaysSafe === currentEmail.isSafe;

    if (isCorrect) {
      // Correct decision! (+50 points for all correct decisions)
      setSecurityScore(prev => prev + 50);
      playSynthSound('success', sound, sfxVolume);
      if (navigator.vibrate) navigator.vibrate(50);

      const nextStreak = streak + 1;
      setStreak(nextStreak);
      const nextCorrect = correctCount + 1;
      setCorrectCount(nextCorrect);

      const { vpEarned, streakBonus } = awardAnswerVP(true, nextStreak);
      let vpText = `+${vpEarned} VP`;
      if (streakBonus > 0) {
        vpText += ` & +${streakBonus} VP Seri Bonusu!`;
      }
      setEarnedVPMsg(vpText);

      setFeedback({
        isCorrect: true,
        text: currentEmail.consequenceSuccess || "Şüpheli durumu fark ederek doğru karar verdiniz.",
        explanation: currentEmail.isSafe 
          ? "Bu e-posta güvenlidir. Gönderici adresi ve bağlantı hedefleri resmi kurumla eşleşiyor." 
          : "Bu bir kimlik avı (phishing) saldırısıdır. Gönderici adresindeki veya bağlantıdaki sahtekarlığı başarıyla tespit ettiniz."
      });
      setGameStatus('feedback');
    } else {
      // Incorrect decision!
      setStreak(0);
      setEarnedVPMsg('');
      
      // Case C: Kritik maili güvenli bulursa -> Instant Game Over
      if (!currentEmail.isSafe && currentEmail.dangerLevel === 'high' && userSaysSafe) {
        setFailedConsequence(currentEmail.consequenceFail || "Kritik bir oltalama e-postasına inandınız ve verilerinizi çaldırdınız.");
        setGameStatus('gameover');
        playSynthSound('gameover', sound, sfxVolume);
        if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 300]);
        return;
      }
      
      // For Case A & Case B: Deduct 1 life
      const newLives = lives - 1;
      setLives(newLives);

      let scoreDeduction = 0;
      if (!currentEmail.isSafe && currentEmail.dangerLevel === 'medium') {
        // Case A: Ortalama zararlı maili güvenli bulursa -> -70 points
        scoreDeduction = 70;
      } else if (currentEmail.isSafe) {
        // Case B: Güvenli maili şüpheli bulursa -> -100 points
        scoreDeduction = 100;
      }

      setSecurityScore(prev => Math.max(0, prev - scoreDeduction));

      if (newLives <= 0) {
        setFailedConsequence("Tüm canlarınızı tükettiniz! Birden fazla güvenlik açığına izin verdiğiniz için siber saldırganlar dijital yaşamınızı ele geçirdi.");
        setMailScore(Math.max(0, securityScore - scoreDeduction));
        setMailCompleted(true);
        setMailFailedLocked(true);
        setGameStatus('gameover');
        playSynthSound('gameover', sound, sfxVolume);
        if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 300]);
      } else {
        setFeedback({
          isCorrect: false,
          text: currentEmail.consequenceFail || "Yanlış karar verdiniz.",
          explanation: currentEmail.isSafe
            ? "Güvenli bir e-postayı şüpheli olarak reddettiniz. Önemli bir işlemi veya bildirimi kaçırmış olabilirsiniz."
            : "Bu bir oltalama (phishing) e-postasıdır. Gönderici adresi veya sahte bağlantı hedefine dikkat etmediniz."
        });
        setGameStatus('feedback');
        playSynthSound('failure', sound, sfxVolume);
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
      }
    }
  };

  const handleNext = () => {
    setFeedback(null);
    if (currentIndex < 19) {
      setCurrentIndex(prev => prev + 1);
      setGameStatus('playing');
    } else {
      setMailScore(securityScore);
      setMailCompleted(true);
      setGameStatus('won');
      playSynthSound('win', sound, sfxVolume);
      if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);

      // Award completion VP
      awardCompletionVP();

      // Check achievements at won state
      const nextCorrect = correctCount;
      if (nextCorrect >= 18) {
        unlockAchievement('accuracy_90');
      }
      if (nextCorrect === 20) {
        unlockAchievement('email_master');
      }
      const savedAchievements = JSON.parse(localStorage.getItem('safely_unlocked_achievements') || '[]');
      const hasPasswordMaster = savedAchievements.includes('password_master');
      const hasPermissionMaster = savedAchievements.includes('permission_master');
      if (nextCorrect === 20 && hasPasswordMaster && hasPermissionMaster) {
        unlockAchievement('cyber_detective');
      }
    }
  };

  // 1. Intro Screen UI
  if (gameStatus === 'intro') {
    return (
      <div className="flex-1 flex flex-col justify-between p-5 bg-slate-50 dark:bg-[#08090d] select-none text-slate-800 dark:text-white animate-fade-in h-full">
        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6 max-w-sm mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-cyan-50 dark:bg-cyan-accent/10 border-2 border-cyan-500 dark:border-cyan-accent flex items-center justify-center pulse-accent">
            <Mail className="w-8 h-8 text-cyan-600 dark:text-cyan-accent animate-pulse" />
          </div>
          
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-slate-800 dark:text-white">
              E-Posta Güvenlik Modülü
            </h2>
            <p className="text-xs text-cyan-600 dark:text-cyan-accent font-bold tracking-widest uppercase mt-1">
              Bölüm 1 - Oltalama Analizi
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] text-base text-slate-600 dark:text-gray-300 leading-relaxed text-left space-y-4 shadow-sm">
            <p className="font-semibold text-slate-700 dark:text-gray-200">
              Bazı e-postalar güvenilir görünür ancak seni sahte sitelere yönlendirmeye çalışır.
            </p>
            <div className="space-y-2.5 text-sm text-slate-500 dark:text-gray-400">
              <p className="flex items-start gap-2">
                <span className="text-cyan-600 dark:text-cyan-accent font-bold mt-0.5">▪</span>
                <span><strong className="text-slate-700 dark:text-gray-200">Gönderen Adresi:</strong> E-postanın kimden geldiğini doğrulamak için alan adını dikkatlice incele.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-cyan-600 dark:text-cyan-accent font-bold mt-0.5">▪</span>
                <span><strong className="text-slate-700 dark:text-gray-200">Link Adresi:</strong> E-posta içindeki butonların yönlendirdiği gerçek alan adını (Bağlantı Hedefi) mutlaka kontrol et.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-cyan-600 dark:text-cyan-accent font-bold mt-0.5">▪</span>
                <span><strong className="text-slate-700 dark:text-gray-200">Aciliyet Hissi:</strong> Hesabının kapatılacağını iddia eden veya acele ettiren e-postalara karşı uyanık ol.</span>
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={startNewGame}
          className="w-full py-4 bg-cyan-accent hover:bg-cyan-accent/90 active:scale-[0.98] text-[#08090d] font-black rounded-2xl shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all text-sm uppercase tracking-wider mt-4"
        >
          Devam Et
        </button>
      </div>
    );
  }

  // 2. Game Over UI (Restart)
  if (gameStatus === 'gameover') {
    return (
      <div className="flex-1 flex flex-col justify-between p-5 bg-slate-50 dark:bg-[#08090d] select-none text-slate-800 dark:text-white animate-fade-in h-full">
        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6 max-w-sm mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-danger-red/10 border-2 border-danger-red flex items-center justify-center animate-bounce">
            <ShieldAlert className="w-8 h-8 text-danger-red animate-pulse" />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-danger-red">
              Sistem Ele Geçirildi!
            </h2>
            <p className="text-xs text-slate-500 dark:text-gray-500 font-bold tracking-widest uppercase mt-1">
              Güvenlik İhlali Yaşandı
            </p>
          </div>

          <div className="w-full p-5 rounded-2xl bg-white dark:bg-[#12141c] border-2 border-danger-red/30 text-sm text-slate-600 dark:text-gray-300 leading-relaxed text-left space-y-3 shadow-[0_0_15px_rgba(231,76,60,0.1)]">
            <div className="flex items-center gap-2 text-danger-red font-bold uppercase tracking-wider text-xs pb-2 border-b border-slate-200 dark:border-[#1f2330]">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>İhlal Detayı</span>
            </div>
            <p className="text-base font-semibold text-slate-800 dark:text-white leading-snug">
              {failedConsequence}
            </p>
            <p className="text-slate-500 dark:text-gray-400 mt-2">
              Siber güvenlikte tek bir zayıf halka veya aceleci bir karar, tüm dijital varlıklarınızı tehlikeye atabilir.
            </p>
          </div>
        </div>

        {mailFailedLocked ? (
          <button
            onClick={() => navigate('/home')}
            className="w-full py-4 bg-danger-red hover:bg-danger-red/90 active:scale-[0.98] text-white font-black rounded-2xl shadow-[0_0_20px_rgba(231,76,60,0.2)] transition-all text-sm uppercase tracking-wider mt-4 flex items-center justify-center gap-2"
          >
            <span>Ana Menüye Dön</span>
          </button>
        ) : (
          <button
            onClick={() => setGameStatus('intro')}
            className="w-full py-4 bg-danger-red hover:bg-danger-red/90 active:scale-[0.98] text-white font-black rounded-2xl shadow-[0_0_20px_rgba(231,76,60,0.2)] transition-all text-sm uppercase tracking-wider mt-4 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Yeniden Başlat</span>
          </button>
        )}
      </div>
    );
  }

  // 3. Win UI
  if (gameStatus === 'won') {
    return (
      <div className="flex-1 flex flex-col justify-between p-5 bg-slate-50 dark:bg-[#08090d] select-none text-slate-800 dark:text-white animate-fade-in h-full">
        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6 max-w-sm mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-safe-green/10 border-2 border-safe-green flex items-center justify-center animate-pulse">
            <Trophy className="w-8 h-8 text-safe-green" />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-safe-green">
              Tebrikler, Güvendesiniz!
            </h2>
            <p className="text-xs text-cyan-accent font-bold tracking-widest uppercase mt-1">
              Bölüm Tamamlandı
            </p>
          </div>

          <div className="w-full p-5 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] text-sm text-slate-600 dark:text-gray-300 leading-relaxed text-center space-y-4">
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Dijital Güvenlik Skorunuz</p>
              <p className="text-3xl font-black text-cyan-accent tracking-wide font-mono">
                {securityScore}
              </p>
            </div>
            
            <p className="text-slate-600 dark:text-gray-300 text-sm text-left leading-relaxed px-1">
              Mail Güvenlik Modülü’ndeki 20 e-postayı da başarıyla analiz ettiniz ve oltalama (phishing) saldırılarına geçit vermediniz!
            </p>
            
            <div className="p-3 bg-slate-50 dark:bg-[#08090d] border border-slate-200 dark:border-[#1f2330] rounded-xl text-left">
              <span className="text-[11px] uppercase font-bold text-cyan-accent/80 block mb-0.5 tracking-wider">Sıradaki Bölüm</span>
              <span className="text-sm font-bold text-slate-800 dark:text-white">Şifre Laboratuvarı</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/home')}
          className="w-full py-4 bg-cyan-accent hover:bg-cyan-accent/90 active:scale-[0.98] text-[#08090d] font-black rounded-2xl shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all text-sm uppercase tracking-wider mt-4"
        >
          Ana Menüye Dön
        </button>
      </div>
    );
  }

  // 4. Main Game UI (Playing / Feedback)
  const currentEmail = emailPool[currentIndex];
  if (!currentEmail) return null;

  return (
    <div className="flex-1 flex flex-col p-4 bg-slate-50 dark:bg-[#08090d] h-full justify-between select-none relative">
      
      {/* 4a. HUD Status Bar */}
      <div className="p-3 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] flex items-center justify-between mb-3.5 shadow-sm text-sm">
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] font-bold text-slate-500 dark:text-gray-500 uppercase tracking-wider">E-Posta Havuzu</span>
          <span className="font-mono font-bold text-slate-800 dark:text-white">{currentIndex + 1} / 20</span>
        </div>
        
        <div className="flex flex-col items-center gap-1">
          <span className="text-[11px] font-bold text-slate-500 dark:text-gray-500 uppercase tracking-wider">Can</span>
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <Shield 
                key={i} 
                className={`w-4 h-4 transition-all duration-300 ${
                  i < lives 
                    ? 'text-cyan-600 dark:text-cyan-accent fill-cyan-500/20 dark:fill-cyan-accent/20' 
                    : 'text-slate-350 dark:text-gray-700'
                }`} 
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end gap-0.5">
          <span className="text-[11px] font-bold text-slate-500 dark:text-gray-500 uppercase tracking-wider">Skor</span>
          <span className="font-mono font-black text-cyan-600 dark:text-cyan-accent text-base">{securityScore}</span>
        </div>

        <div className="border-l border-slate-200 dark:border-[#1f2330] pl-2 flex items-center gap-1">
          {IS_DEV_MODE && (
            <button 
              onClick={handleAdminSkip}
              title="Admin: Oyunu Geç (Tam Skor)"
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1f2330] text-amber-500/50 hover:text-amber-500 active:scale-95 transition-all"
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
      </div>

      {/* 4b. Active Email Header */}
      <div className="p-3 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] mb-3 space-y-2 select-none shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-50 dark:bg-[#08090d] border border-cyan-500/30 dark:border-cyan-accent/30 flex items-center justify-center shrink-0">
            <span className="text-base font-black text-cyan-600 dark:text-cyan-accent uppercase">
              {currentEmail.sender.charAt(0)}
            </span>
          </div>
          <div className="overflow-hidden">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-black text-slate-800 dark:text-white truncate">{currentEmail.sender}</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-gray-500 font-mono truncate">{currentEmail.senderEmail}</p>
          </div>
        </div>
        
        <div className="pt-2 border-t border-slate-150 dark:border-[#1f2330] flex justify-between items-center text-xs text-slate-500 dark:text-gray-400">
          <div>
            <span className="font-bold text-slate-400 dark:text-gray-500">Konu:</span> <span className="font-bold text-slate-800 dark:text-white">{currentEmail.subject}</span>
          </div>
          <div>
            <span className="font-bold text-slate-400 dark:text-gray-500">Kime:</span> <span className="font-mono text-slate-600 dark:text-gray-300">{username.toLowerCase()}@safely-mail.com</span>
          </div>
        </div>
      </div>

      {/* 4c. Email Content View */}
      <div className="flex-1 p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] flex flex-col justify-between mb-4 overflow-y-auto min-h-[200px] shadow-sm">
        <div className="space-y-4">
          <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed whitespace-pre-line font-medium">
            {currentEmail.body}
          </p>
          
          {/* Link Preview box */}
          {currentEmail.linkText && (
            <div className="p-3 rounded-xl border border-dashed border-slate-200 dark:border-[#1f2330] bg-slate-50 dark:bg-[#08090d] select-none cursor-help relative">
              <span className="text-sm text-cyan-600 dark:text-cyan-accent font-bold underline block hover:text-cyan-700 dark:hover:text-cyan-accent/80 flex items-center gap-1.5">
                {currentEmail.linkText}
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
              
              {/* Highlighted hover preview link tooltip */}
              <div className="mt-2.5 p-2 rounded-lg bg-white dark:bg-[#12141c] border border-cyan-500/10 dark:border-cyan-accent/10 text-[11px] font-mono text-slate-500 dark:text-gray-400">
                <span className="text-cyan-600 dark:text-cyan-accent/80 block text-[10px] uppercase tracking-widest font-bold mb-0.5">Gerçek Bağlantı Hedefi (Bağlantı Adresi):</span>
                <span className="break-all text-slate-800 dark:text-white font-medium">{currentEmail.actualUrl}</span>
              </div>
            </div>
          )}
        </div>

        <div className="text-[11px] text-slate-500 dark:text-gray-500 flex items-start gap-1.5 mt-4 pt-2 border-t border-slate-150 dark:border-[#1f2330]/40 leading-relaxed">
          <Info className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-accent shrink-0 mt-0.5" />
          <span>İpucu: Gönderen e-posta adresi alan adıyla, yukarıdaki "Gerçek Bağlantı Hedefi" alan adını dikkatlice eşleştirip karar verin.</span>
        </div>
      </div>

      {/* 4d. Decision Actions Footer */}
      {gameStatus === 'playing' && (
        <div className="grid grid-cols-2 gap-3 shrink-0">
          <button
            onClick={() => handleDecision(true)}
            className="py-3.5 px-4 rounded-xl border border-safe-green/40 bg-safe-green/5 text-safe-green hover:bg-safe-green/10 active:scale-[0.98] transition-all text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Güvenli</span>
          </button>
          
          <button
            onClick={() => handleDecision(false)}
            className="py-3.5 px-4 rounded-xl border border-danger-red/40 bg-danger-red/5 text-danger-red hover:bg-danger-red/10 active:scale-[0.98] transition-all text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Şüpheli</span>
          </button>
        </div>
      )}

      {/* 4e. Feedback details overlay */}
      {gameStatus === 'feedback' && feedback && (
        <div className="absolute inset-0 bg-slate-50/95 dark:bg-[#08090d]/95 backdrop-blur-sm flex flex-col justify-center p-6 z-50 animate-fade-in select-none">
          <div className="text-center space-y-5 max-w-sm mx-auto w-full">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 mb-1 animate-pulse">
              {feedback.isCorrect ? (
                <CheckCircle className="w-8 h-8 text-safe-green" />
              ) : (
                <XCircle className="w-8 h-8 text-danger-red" />
              )}
            </div>
            
            <div>
              <h3 className={`text-lg font-black uppercase tracking-tight ${feedback.isCorrect ? 'text-safe-green' : 'text-danger-red'}`}>
                {feedback.isCorrect ? 'Başarılı Karar!' : 'Hatalı Karar!'}
              </h3>
              <p className="text-[11px] font-bold text-slate-500 dark:text-gray-500 uppercase tracking-widest mt-0.5">
                {feedback.isCorrect ? 'Tehdit Engellendi' : 'Güvenlik Açığı'}
              </p>
              {feedback.isCorrect && earnedVPMsg && (
                <div className="mt-2 inline-block px-3 py-1 bg-amber-500/10 text-amber-500 text-[11px] font-extrabold uppercase rounded-full border border-amber-500/20">
                  {earnedVPMsg}
                </div>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] text-sm text-slate-600 dark:text-gray-300 leading-relaxed text-left space-y-2 shadow-sm">
              <span className="font-bold text-slate-800 dark:text-white block">Karar Sonucu:</span>
              <p className="font-semibold text-slate-700 dark:text-gray-200">{feedback.text}</p>
              
              <div className="mt-3 text-xs text-slate-500 dark:text-gray-500 border-t border-slate-150 dark:border-[#1f2330] pt-2">
                <span className="font-bold text-cyan-600 dark:text-cyan-accent block uppercase text-[10px] mb-0.5 tracking-wider">Açıklama:</span>
                {feedback.explanation}
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3.5 bg-cyan-accent text-[#08090d] font-black rounded-xl active:scale-[0.98] transition-all text-sm uppercase tracking-wider shadow-[0_0_15px_rgba(0,229,255,0.2)] flex items-center justify-center gap-1.5"
            >
              <span>Devam Et</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}
