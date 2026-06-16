import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../state/AppContext';
import { getRandomApps } from '../../data/permissionsData';
import { Smartphone, ShieldAlert, CheckCircle, Settings, Terminal } from 'lucide-react';
import { saveFinalScore } from '../../firebase/leaderboardService';
import { playSynthSound } from '../../utils/soundEffects';
import SettingsModal from '../../components/SettingsModal/SettingsModal';

const IS_DEV_MODE = true;

export default function Permissions() {
  const { 
    username,
    mailScore,
    passwordScore,
    lives,
    setPermissionsScore, 
    setPermissionsCompleted, 
    permissionsScore,
    sfxVolume,
    awardAnswerVP,
    awardCompletionVP,
    awardEndGameVP,
    unlockAchievement
  } = useApp();
  
  const navigate = useNavigate();

  const [gameApps, setGameApps] = useState(() => getRandomApps(15));
  const [gameStatus, setGameStatus] = useState('intro'); // 'intro' | 'playing' | 'won'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState(null); // { isCorrect: boolean, text: string, detail: string }
  const [localScore, setLocalScore] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [streak, setStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [earnedVPMsg, setEarnedVPMsg] = useState('');

  const startNewGame = () => {
    setGameApps(getRandomApps(15));
    setCurrentIndex(0);
    setLocalScore(0);
    setFeedback(null);
    setStreak(0);
    setCorrectCount(0);
    setEarnedVPMsg('');
    setGameStatus('playing');
  };

  const handleDevSkip = () => {
    setPermissionsScore(1700); // 15 apps * 100 + 200 bonus = 1700
    setPermissionsCompleted(true);
    setGameStatus('won');
  };

  const handleDecision = (blockAction, app) => {
    const isCorrect = (blockAction && !app.isSafe) || (!blockAction && app.isSafe);
    let earnedText = '';
    
    if (isCorrect) {
      playSynthSound('success', sfxVolume);
      if (navigator.vibrate) navigator.vibrate(50);
      setLocalScore((prev) => prev + 100);

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
      setStreak(0);
    }

    setEarnedVPMsg(earnedText);

    setFeedback({
      isCorrect,
      text: isCorrect
        ? `Başarılı! ${app.name} hakkında doğru güvenlik kararı verdiniz.`
        : `Güvenlik Zafiyeti! ${app.name} kişisel verilerinizi ele geçirdi.`,
      detail: app.reason
    });
  };

  const closeFeedback = () => {
    setFeedback(null);
    
    if (currentIndex < gameApps.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      playSynthSound('win', sfxVolume);
      if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
      const completionBonus = 200;
      const finalScore = localScore + completionBonus;
      setPermissionsScore(finalScore);
      setGameStatus('won');

      // Award completion VP
      awardCompletionVP();

      // Check achievements
      const finalCorrect = correctCount;
      if (finalCorrect >= 14) {
        unlockAchievement('accuracy_90');
      }
      if (finalCorrect === 15) {
        unlockAchievement('permission_master');
      }
      const savedAchievements = JSON.parse(localStorage.getItem('safely_unlocked_achievements') || '[]');
      const hasEmailMaster = savedAchievements.includes('email_master');
      const hasPasswordMaster = savedAchievements.includes('password_master');
      if (finalCorrect === 15 && hasEmailMaster && hasPasswordMaster) {
        unlockAchievement('cyber_detective');
      }
    }
  };

  const handleFinishModule = async () => {
    setSubmitting(true);
    try {
      const finalScore = localScore + 200;
      const totalScore = mailScore + passwordScore + finalScore;
      await saveFinalScore(username, totalScore, lives);

      // Award Oyun Sonu VP
      awardEndGameVP(totalScore);

      // Unlock persistent_player achievement
      unlockAchievement('persistent_player');
    } catch (error) {
      console.error("Firestore final skoru kaydedilemedi:", error);
    } finally {
      setPermissionsCompleted(true);
      setSubmitting(false);
      navigate('/home');
    }
  };

  if (gameStatus === 'intro') {
    return (
      <div className="flex-1 flex flex-col justify-between p-3.5 bg-slate-50 dark:bg-[#08090d] select-none text-slate-800 dark:text-white animate-fade-in h-full overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2.5 max-w-sm mx-auto py-1.5">
          <div className="w-10 h-10 rounded-xl bg-cyan-accent/10 border-2 border-cyan-accent flex items-center justify-center pulse-accent shrink-0">
            <Smartphone className="w-5 h-5 text-cyan-accent animate-pulse" />
          </div>
          
          <div>
            <h2 className="text-[17px] font-black uppercase tracking-tight text-slate-800 dark:text-white">
              Uygulama İzin Merkezi
            </h2>
            <p className="text-[10px] text-cyan-accent font-bold tracking-widest uppercase mt-0.5">
              Bölüm 3 - Uygulama İzinleri
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] text-xs text-slate-600 dark:text-gray-300 leading-relaxed text-left space-y-1.5 w-full shadow-sm">
            <p className="font-semibold text-slate-700 dark:text-gray-200">Mobil uygulamalar çalışmak için çeşitli izinler talep eder.</p>
            <p>Birçok zararlı uygulama, işleviyle alakasız izinler isteyerek (örneğin el fenerinin rehberinize erişmesi) verilerinizi çalar.</p>
            <p className="text-cyan-accent/95 font-medium">Uygulamaların açıklamalarını ve talep ettikleri izinleri karşılaştırarak güvenli olanları kurup şüpheli olanları engellemelisin.</p>
            <div className="pt-1.5 border-t border-slate-100 dark:border-[#1f2330]/80">
              <p className="font-bold text-slate-500 dark:text-gray-400 mb-1">Karşına çıkacak uygulamaları incele ve kararını ver:</p>
              <p className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-safe-green shrink-0" /> <span><strong className="text-safe-green">Kur</strong> = Güvenli ve makul izinler</span></p>
              <p className="flex items-center gap-1.5 mt-1"><ShieldAlert className="w-3.5 h-3.5 text-danger-red shrink-0" /> <span><strong className="text-danger-red">Reddet</strong> = Şüpheli/gereksiz izinler</span></p>
            </div>
            <p className="font-black text-center text-slate-800 dark:text-white pt-0.5">Hazırsan başlayalım.</p>
          </div>
        </div>

        <button
          onClick={startNewGame}
          className="w-full py-3 bg-cyan-accent hover:bg-cyan-accent/90 active:scale-[0.98] text-[#08090d] font-black rounded-2xl shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all text-sm uppercase tracking-wider shrink-0 cursor-pointer"
        >
          Devam Et
        </button>
      </div>
    );
  }

  if (gameStatus === 'won') {
    return (
      <div className="flex-1 flex flex-col justify-center items-center text-center p-6 bg-slate-50 dark:bg-[#08090d] select-none h-full animate-fade-in">
        <CheckCircle className="w-16 h-16 text-safe-green mb-4" />
        <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Modül Tamamlandı!</h2>
        <p className="text-base text-slate-500 dark:text-gray-400 mb-6">Uygulama izinlerini başarıyla denetlediniz.</p>
        <div className="text-3xl font-black text-cyan-600 dark:text-cyan-accent mb-8">{permissionsScore} Puan</div>
        <button
          onClick={handleFinishModule}
          disabled={submitting}
          className={`w-full py-4 bg-slate-200 dark:bg-[#1f2330] text-slate-800 dark:text-white font-black rounded-2xl hover:bg-slate-300 dark:hover:bg-[#2a2f42] active:scale-[0.98] transition-all text-sm uppercase tracking-wider ${
            submitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {submitting ? 'Kaydediliyor...' : 'Ana Menüye Dön'}
        </button>
      </div>
    );
  }

  const currentApp = gameApps[currentIndex];

  // Helper map for permission labels in Turkish
  const permissionLabels = {
    camera: "📷 Kamera Erişimi",
    location: "📍 Konum Bilgisi (GPS)",
    contacts: "👥 Rehber Erişimi",
    sms: "💬 SMS Okuma/Gönderme",
    microphone: "🎤 Mikrofon Erişimi",
    gallery: "🖼️ Galeri Erişimi",
    storage: "💾 Depolama Erişimi",
    phone_calls: "📞 Telefon Çağrıları",
    calendar: "📅 Takvim Entegrasyonu",
    internet: "🌐 İnternet Erişimi",
    biometric: "🔑 Biyometrik Kimlik",
    device_settings: "⚙️ Sistem Ayarları"
  };

  // Extract requested permissions (those with value === true)
  const requestedPermissions = Object.keys(currentApp.permissions).filter(
    (key) => currentApp.permissions[key] === true
  );

  return (
    <div className="flex-1 flex flex-col p-3.5 bg-slate-50 dark:bg-[#08090d] overflow-hidden h-full relative">
      
      {/* Header */}
      <div className="mb-3 shrink-0 flex justify-between items-center bg-white dark:bg-[#12141c] p-2.5 rounded-2xl border border-slate-200 dark:border-[#1f2330] shadow-sm">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-cyan-accent" />
            İzin Denetimi
          </h2>
          {IS_DEV_MODE && (
            <button 
              onClick={handleDevSkip}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-[#1f2330] text-cyan-accent hover:bg-slate-200 dark:hover:bg-[#2a2f42] transition-colors cursor-pointer"
              title="Geliştirici Geçişi"
            >
              <Terminal className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={() => setShowSettings(true)}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1f2330] text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-accent active:scale-95 transition-all cursor-pointer"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
        <div className="text-sm font-mono font-bold text-slate-500 dark:text-gray-400">
          {currentIndex + 1} / {gameApps.length}
        </div>
      </div>

      {/* Main Playing Area with App Card */}
      <div className="flex-1 flex flex-col justify-center items-center py-1.5 relative z-10 w-full max-w-sm mx-auto">
        <div className="w-full rounded-3xl bg-white dark:bg-[#12141c] border-2 border-slate-200 dark:border-[#1f2330] flex flex-col p-5 shadow-xl relative overflow-hidden h-full max-h-[420px]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2330_1px,transparent_1px),linear-gradient(to_bottom,#1f2330_1px,transparent_1px)] bg-[size:16px_16px] opacity-10 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            {/* App Header (Icon, Name, Category) */}
            <div className="flex gap-4 items-center pb-3.5 border-b border-slate-100 dark:border-[#1f2330]">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-[#08090d] border border-slate-200 dark:border-[#1f2330] flex items-center justify-center text-2xl shrink-0">
                {currentApp.icon}
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 dark:text-white leading-snug">{currentApp.name}</h3>
                <p className="text-[10px] text-cyan-600 dark:text-cyan-accent font-extrabold uppercase tracking-wider mt-0.5">{currentApp.category}</p>
              </div>
            </div>

            {/* App Description */}
            <div className="py-2.5">
              <p className="text-[10px] font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-1">Açıklama</p>
              <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed bg-slate-50 dark:bg-[#08090d]/60 p-2.5 rounded-xl border border-slate-100 dark:border-[#1f2330]">
                {currentApp.description}
              </p>
            </div>

            {/* Requested Permissions (Clean Static List) */}
            <div className="flex-1 overflow-y-auto min-h-[100px] py-1.5">
              <p className="text-[10px] font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Talep Edilen İzinler</p>
              <div className="space-y-1">
                {requestedPermissions.length > 0 ? (
                  requestedPermissions.map((perm) => (
                    <div key={perm} className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-gray-200 bg-slate-50 dark:bg-[#08090d]/60 border border-slate-100 dark:border-[#1f2330] px-2.5 py-1.5 rounded-xl">
                      <span>{permissionLabels[perm] || perm}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic">Bu uygulama hiçbir özel izin talep etmiyor.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Panel */}
      <div className="grid grid-cols-2 gap-3 mt-3 shrink-0 max-w-sm mx-auto w-full relative z-20">
        <button
          onClick={() => handleDecision(true, currentApp)} // Şüpheli Bildir -> blockAction = true
          className="py-4 px-4 rounded-2xl border-2 border-danger-red/30 bg-danger-red/5 hover:bg-danger-red/10 active:scale-[0.98] text-danger-red font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShieldAlert className="w-4 h-4" />
          Reddet
        </button>
        <button
          onClick={() => handleDecision(false, currentApp)} // Kurulumu Onayla -> blockAction = false
          className="py-4 px-4 rounded-2xl border-2 border-safe-green/30 bg-safe-green/5 hover:bg-safe-green/10 active:scale-[0.98] text-safe-green font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <CheckCircle className="w-4 h-4" />
          Kur
        </button>
      </div>

      {/* Feedback Popup Overlay */}
      {feedback && (
        <div className="absolute inset-0 bg-slate-50/95 dark:bg-[#08090d]/95 backdrop-blur-sm flex flex-col justify-center p-6 z-50 animate-fade-in">
          <div className="text-center space-y-6 max-w-sm mx-auto w-full">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 mb-2">
              {feedback.isCorrect ? (
                <CheckCircle className="w-10 h-10 text-safe-green animate-pulse" />
              ) : (
                <ShieldAlert className="w-10 h-10 text-danger-red animate-pulse" />
              )}
            </div>

            <div>
              <h3 className={`text-xl font-extrabold ${feedback.isCorrect ? 'text-safe-green' : 'text-danger-red'}`}>
                {feedback.isCorrect ? 'Karar Başarılı!' : 'Siber Güvenlik Zafiyeti!'}
              </h3>
              <p className="text-sm font-medium text-slate-500 dark:text-gray-400 mt-1">
                {currentApp.name} Değerlendirmesi
              </p>
              {feedback.isCorrect && earnedVPMsg && (
                <div className="mt-2 inline-block px-3 py-1 bg-amber-500/10 text-amber-500 text-[11px] font-extrabold uppercase rounded-full border border-amber-500/20">
                  {earnedVPMsg}
                </div>
              )}
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] text-sm text-slate-600 dark:text-gray-300 leading-relaxed text-left shadow-md">
              <p className="font-extrabold text-slate-800 dark:text-white mb-2">Analiz Raporu:</p>
              <p>{feedback.detail}</p>
            </div>

            <button
              onClick={closeFeedback}
              className="w-full py-4 bg-cyan-accent text-[#08090d] font-black rounded-2xl active:scale-[0.98] transition-all text-sm uppercase tracking-wider shadow-[0_0_15px_rgba(0,229,255,0.2)] cursor-pointer"
            >
              Sonraki Uygulama
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}
