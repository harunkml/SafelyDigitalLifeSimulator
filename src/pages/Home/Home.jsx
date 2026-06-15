import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../state/AppContext';
import { Mail, KeyRound, Smartphone, Settings, UserCheck, Trophy, ShieldAlert } from 'lucide-react';


export default function Home() {
  const { 
    username, 
    mailScore, 
    passwordScore, 
    permissionsScore, 
    mailCompleted, 
    mailFailedLocked, 
    passwordCompleted, 
    permissionsCompleted 
  } = useApp();
  const navigate = useNavigate();
  const [lockedMessage, setLockedMessage] = useState('');

  const handleAppClick = (app) => {
    if (app.path === '#') return;
    
    // Mail game locks
    if (app.id === 'mail' && mailCompleted) {
      if (mailFailedLocked) {
        setLockedMessage('Tüm canlarınızı tükettiğiniz için bu oyunu tekrar oynayamazsınız.');
      } else {
        setLockedMessage('Bu oyunu zaten tamamladınız.');
      }
      return;
    }

    // Passwords game locks
    if (app.id === 'passwords') {
      if (!mailCompleted) {
        setLockedMessage('Önce E-Posta oyununu oynamalısınız.');
        return;
      }
      if (passwordCompleted) {
        setLockedMessage('Bu oyunu zaten tamamladınız.');
        return;
      }
    }

    // Permissions game locks
    if (app.id === 'permissions') {
      if (!mailCompleted) {
        setLockedMessage('Önce E-Posta oyununu oynamalısınız.');
        return;
      }
      if (!passwordCompleted) {
        setLockedMessage('Önce Şifre Laboratuvarı oyununu tamamlamalısınız.');
        return;
      }
      if (permissionsCompleted) {
        setLockedMessage('Bu oyunu zaten tamamladınız.');
        return;
      }
    }

    navigate(app.path);
  };

  const apps = [
    {
      id: 'mail',
      name: 'E-Posta Alıcısı',
      icon: <Mail className="w-6 h-6 text-cyan-accent" />,
      path: '/mail',
      badge: true,
      description: 'Gelen mailleri değerlendir.'
    },
    {
      id: 'passwords',
      name: 'Şifre Laboratuvarı',
      icon: <KeyRound className="w-6 h-6 text-cyan-accent" />,
      path: '/passwords',
      badge: null,
      description: 'Zayıf/güçlü şifre ayıklama.'
    },
    {
      id: 'permissions',
      name: 'Uygulama İzinleri',
      icon: <Smartphone className="w-6 h-6 text-cyan-accent" />,
      path: '/permissions',
      badge: null,
      description: 'İzinlerin güvenliğini denetle.'
    },
    {
      id: 'settings',
      name: 'Ayarlar',
      icon: <Settings className="w-6 h-6 text-cyan-accent" />,
      path: '/settings',
      badge: null,
      description: 'Gizlilik ve profil yönetimi.'
    },
    {
      id: 'leaderboard',
      name: 'Başarımlar',
      icon: <Trophy className="w-6 h-6 text-cyan-600 dark:text-cyan-accent" />,
      path: '/leaderboard',
      badge: null,
      description: 'Skor tablosu ve görevler.'
    }
  ];

  if (username?.toLowerCase() === 'admin') {
    apps.push({
      id: 'admin',
      name: 'Admin Ekranı',
      icon: <ShieldAlert className="w-6 h-6 text-danger-red" />,
      path: '/admin',
      badge: 'Yeni',
      description: 'Sistem ve Tema Yönetimi.'
    });
  }


  return (
    <div className="flex-1 flex flex-col p-6 bg-slate-50 dark:bg-[#08090d]">
      
      {/* Dynamic greeting banner & Total Score */}
      <div className="mb-8 mt-2 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1 flex items-center gap-1.5">
            <UserCheck className="w-5 h-5 text-cyan-600 dark:text-cyan-accent" />
            Merhaba, <span className="text-cyan-600 dark:text-cyan-accent">{username || 'Kullanıcı'}</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-gray-500 font-medium">
            Dijital yaşamını korumak için bir uygulama seç.
          </p>
        </div>
        
        {/* Total Score Badge */}
        <div className="flex flex-col items-end px-3 py-1.5 rounded-2xl bg-cyan-50 dark:bg-cyan-accent/10 border border-cyan-100 dark:border-cyan-accent/20 shadow-sm shrink-0 select-none">
          <span className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest leading-none">Toplam Puan</span>
          <span className="text-base font-black text-cyan-600 dark:text-cyan-accent font-mono mt-0.5 leading-none">
            {mailScore + passwordScore + permissionsScore}
          </span>
        </div>
      </div>

      {/* Grid apps layout */}
      <div className="grid grid-cols-2 gap-4 flex-1 content-start">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => handleAppClick(app)}
            className="flex flex-col items-center justify-between p-4 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] hover:border-cyan-accent/40 dark:hover:bg-[#151822] active:scale-[0.97] transition-all text-center relative group min-h-[120px] focus:outline-none"
          >
            {/* App Badge */}
            {app.badge && (
              <span className={`absolute top-3 right-3 rounded-full ${
                app.id === 'mail' 
                  ? 'w-3 h-3 bg-danger-red' 
                  : app.id === 'admin'
                    ? 'px-2 py-0.5 text-[9px] uppercase tracking-wider font-extrabold bg-danger-red text-white'
                    : 'px-2 py-0.5 text-xs font-bold bg-cyan-accent text-[#08090d]'
              }`}>
                {app.badge !== true ? app.badge : ''}
              </span>
            )}

            
            {/* Shortcut Icon container */}
            <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-[#08090d] border border-slate-200 dark:border-[#1f2330] flex items-center justify-center mb-2 group-hover:border-cyan-accent/20 transition-all">
              {app.icon}
            </div>

            {/* Title / Description */}
            <div className="w-full">
              <p className="text-sm font-bold text-slate-800 dark:text-white mb-1 group-hover:text-cyan-accent transition-colors">
                {app.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-gray-500 font-medium leading-tight">
                {app.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-auto pt-6 text-center select-none">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 dark:border-[#1f2330] bg-white dark:bg-[#12141c] text-xs text-slate-500 dark:text-gray-400 font-semibold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-safe-green animate-pulse"></span>
          Kişisel Veri Kalkanı Aktif
        </div>
      </div>

      {lockedMessage && (
        <div className="absolute inset-0 bg-slate-100/80 dark:bg-[#08090d]/80 backdrop-blur-sm flex flex-col justify-center p-6 z-50 animate-fade-in text-center">
          <div className="bg-white dark:bg-[#12141c] border border-danger-red/30 rounded-2xl p-5 shadow-2xl">
            <h3 className="text-danger-red font-black text-lg mb-2">Erişim Engellendi</h3>
            <p className="text-slate-600 dark:text-gray-300 text-base mb-5">{lockedMessage}</p>
            <button 
              onClick={() => setLockedMessage('')}
              className="w-full py-3 bg-slate-100 dark:bg-[#1f2330] hover:bg-slate-200 dark:hover:bg-[#2a2f42] text-slate-800 dark:text-white rounded-xl text-sm uppercase font-bold active:scale-[0.98] transition-all"
            >
              Tamam
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
