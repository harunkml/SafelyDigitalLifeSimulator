import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../state/AppContext';
import { ShieldCheck, User, Info } from 'lucide-react';
import { isUsernameUnique, reserveUsername } from '../../firebase/leaderboardService';

export default function Login() {
  const { setUsername } = useApp();
  const [nameInput, setNameInput] = useState('');
  const [step, setStep] = useState('input'); // 'input' | 'intro'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = nameInput.trim();
    if (!trimmedName) {
      setError('Lütfen geçerli bir isim girin.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const isUnique = await isUsernameUnique(trimmedName);
      if (!isUnique) {
        setError('Bu kullanıcı adı zaten alınmış. Lütfen başka bir isim deneyin.');
        setLoading(false);
        return;
      }

      await reserveUsername(trimmedName);
      setStep('intro');
    } catch (err) {
      console.error("Giriş esnasında hata:", err);
      setError('Bağlantı hatası oluştu, lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handleIntroConfirm = () => {
    setUsername(nameInput.trim());
    navigate('/home'); // Go to Home first, instead of starting mail directly!
  };

  if (step === 'intro') {
    return (
      <div className="flex-1 flex flex-col justify-between p-6 bg-slate-50 dark:bg-[#08090d]">
        <div className="flex-1 flex flex-col justify-center items-center text-center mt-8 space-y-6 animate-fade-in">
          <div className="w-16 h-16 rounded-3xl bg-cyan-50 dark:bg-cyan-accent/10 border-2 border-cyan-500 dark:border-cyan-accent flex items-center justify-center pulse-accent">
            <Info className="w-8 h-8 text-cyan-600 dark:text-cyan-accent" />
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-slate-800 dark:text-white tracking-tight uppercase">
              Simülasyon Bilgisi
            </h2>
            <p className="text-sm text-slate-500 dark:text-gray-500 font-semibold tracking-wider uppercase mt-1">
              Safely - Dijital Yaşam Simülatörü
            </p>
          </div>

          <div className="max-w-xs p-5 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] text-base text-slate-600 dark:text-gray-300 leading-relaxed text-left space-y-3 shadow-sm">
            <p>
              Bugün dijital dünyada karşılaşacağın durumlarda kararlar vereceksin.
            </p>
            <p className="text-safe-green font-semibold">
              Doğru kararlar seni korur.
            </p>
            <p className="text-danger-red font-semibold">
              Yanlış kararlar hesaplarını ve verilerini riske atabilir.
            </p>
          </div>
        </div>

        <button
          onClick={handleIntroConfirm}
          className="w-full py-4 bg-cyan-accent hover:bg-cyan-accent/90 active:scale-[0.98] text-[#08090d] font-bold rounded-2xl shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all text-base uppercase tracking-wider mb-8"
        >
          Anladım
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-slate-50 dark:bg-[#08090d]">
      
      {/* Welcome Screen Intro */}
      <div className="flex-1 flex flex-col justify-center items-center text-center mt-8">
        <div className="w-16 h-16 rounded-3xl bg-cyan-50 dark:bg-cyan-accent/10 border-2 border-cyan-500 dark:border-cyan-accent flex items-center justify-center mb-6 pulse-accent">
          <ShieldCheck className="w-8 h-8 text-cyan-600 dark:text-cyan-accent" />
        </div>
        
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white mb-2 leading-none">
          Safely
        </h1>
        <p className="text-base font-semibold tracking-wider text-cyan-600 dark:text-cyan-accent uppercase mb-4">
          Dijital Yaşam Simülatörü
        </p>
        
        <div className="max-w-xs p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] text-sm text-slate-500 dark:text-gray-400 leading-relaxed shadow-sm">
          <p className="mb-2 font-semibold text-slate-700 dark:text-gray-300">Bu oyun bir bilgi yarışması veya sınav değildir.</p>
          Günlük hayatta karşılaşabileceğiniz siber güvenlik olaylarını simüle eder. Verdiğiniz kararların dijital yaşamınız üzerindeki gerçekçi etkilerini deneyimleyeceksiniz.
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleInputSubmit} className="w-full space-y-4 mb-8">
        <div className="space-y-2">
          <label className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400 block px-1">
            Kullanıcı Adınız
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-gray-500">
              <User className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Dijital Kimlik Adı..."
              value={nameInput}
              disabled={loading}
              onChange={(e) => {
                setNameInput(e.target.value);
                if (error) setError('');
              }}
              maxLength={20}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-[#1f2330] bg-white dark:bg-[#12141c] text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:border-cyan-accent/60 focus:ring-1 focus:ring-cyan-accent/30 transition-all text-base shadow-sm"
            />
          </div>
          {error && (
            <p className="text-sm text-danger-red px-1 font-medium">{error}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 bg-cyan-accent hover:bg-cyan-accent/90 active:scale-[0.98] text-[#08090d] font-bold rounded-2xl shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all text-base uppercase tracking-wider ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Kontrol Ediliyor...' : 'Simülasyonu Başlat'}
        </button>
      </form>
    </div>
  );
}
