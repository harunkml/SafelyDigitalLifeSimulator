import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../state/AppContext';
import { Mail, KeyRound, Smartphone, Settings, UserCheck, Trophy, ShieldAlert, ShoppingBag } from 'lucide-react';

export default function Home() {
  const { 
    username, 
    mailScore, 
    passwordScore, 
    permissionsScore, 
    mailCompleted, 
    mailFailedLocked, 
    passwordCompleted, 
    permissionsCompleted,
    veriPuani,
    unlockedAchievements,
    userAvatar
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
      id: 'store',
      name: 'Tema Mağazası',
      icon: <ShoppingBag className="w-6 h-6 text-cyan-accent" />,
      path: '/store',
      badge: null,
      description: 'Yeni temalar satın al.'
    },
    {
      id: 'settings',
      name: 'Ayarlar',
      icon: <Settings className="w-6 h-6 text-cyan-accent" />,
      path: '/settings',
      badge: null,
      description: 'Ses ve görünüm ayarları.'
    },
    {
      id: 'leaderboard',
      name: 'Liderlik Tablosu',
      icon: <Trophy className="w-6 h-6 text-cyan-600 dark:text-cyan-accent" />,
      path: '/leaderboard',
      badge: null,
      description: 'En yüksek skorları gör.'
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
    <div className="flex-1 flex flex-col p-5 bg-slate-50 dark:bg-[#08090d] relative overflow-hidden h-full">
      
      {/* Dynamic greeting banner & Header Stats */}
      <div className="mb-6 mt-2 flex flex-col justify-between items-start gap-3">
        <div className="w-full flex justify-between items-start">
          <div>
            <h2 className="text-base font-bold text-slate-800 dark:text-white mb-0.5 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-accent" />
              Merhaba, <span className="text-cyan-600 dark:text-cyan-accent">{username || 'Kullanıcı'}</span>
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-gray-500 font-medium">
              Dijital yaşamını korumak için bir uygulama seç.
            </p>
          </div>
        </div>

        {/* Stats Badges */}
        <div className="flex gap-2 w-full select-none">
          <div className="flex-1 flex flex-col items-center p-2 rounded-2xl bg-cyan-50 dark:bg-cyan-accent/15 border border-cyan-150 dark:border-cyan-accent/10 shadow-sm text-center">
            <span className="text-[8px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest leading-none mb-1">Toplam Puan</span>
            <span className="text-xs font-black text-cyan-600 dark:text-cyan-accent font-mono leading-none">
              {mailScore + passwordScore + permissionsScore}
            </span>
          </div>

          <div className="flex-1 flex flex-col items-center p-2 rounded-2xl bg-amber-50 dark:bg-amber-500/15 border border-amber-150 dark:border-amber-500/10 shadow-sm text-center">
            <span className="text-[8px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest leading-none mb-1">Veri Puanı (VP)</span>
            <span className="text-xs font-black text-amber-600 dark:text-amber-550 dark:text-amber-500 font-mono leading-none">
              {veriPuani} VP
            </span>
          </div>
        </div>
      </div>

      {/* Grid apps layout */}
      <div className="grid grid-cols-2 gap-3 flex-1 content-start overflow-y-auto max-h-[440px] pr-0.5">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => handleAppClick(app)}
            className="flex flex-col items-center justify-between p-3.5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] hover:border-cyan-accent/40 dark:hover:bg-[#151822] active:scale-[0.97] transition-all text-center relative group min-h-[105px] focus:outline-none"
          >
            {/* App Badge */}
            {app.badge && (
              <span className={`absolute top-2.5 right-2.5 rounded-full ${
                app.id === 'mail' 
                  ? 'w-2.5 h-2.5 bg-danger-red' 
                  : app.id === 'admin'
                    ? 'px-1.5 py-0.5 text-[8px] uppercase tracking-wider font-extrabold bg-danger-red text-white'
                    : 'px-1.5 py-0.5 text-[9px] font-bold bg-cyan-accent text-[#08090d]'
              }`}>
                {app.badge !== true ? app.badge : ''}
              </span>
            )}

            {/* Shortcut Icon container */}
            <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-[#08090d] border border-slate-200 dark:border-[#1f2330] flex items-center justify-center mb-1.5 group-hover:border-cyan-accent/20 transition-all shrink-0">
              {app.icon}
            </div>

            {/* Title / Description */}
            <div className="w-full">
              <p className="text-xs font-black text-slate-800 dark:text-white mb-0.5 group-hover:text-cyan-accent transition-colors leading-tight">
                {app.name}
              </p>
              <p className="text-[10px] text-slate-400 dark:text-gray-500 font-medium leading-tight">
                {app.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Profile Card Button instead of Kişisel Veri Kalkanı Aktif text */}
      <div className="mt-auto pt-4 select-none shrink-0">
        <button
          onClick={() => navigate('/profile')}
          className="w-full flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200 dark:border-[#1f2330] hover:border-cyan-accent/45 dark:hover:border-cyan-accent/30 active:scale-[0.98] transition-all cursor-pointer shadow-sm group focus:outline-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-accent/10 border border-cyan-100 dark:border-cyan-accent/20 flex items-center justify-center group-hover:border-cyan-accent/30 transition-all shrink-0">
              <span className="text-lg leading-none select-none">{userAvatar || '👤'}</span>
            </div>
            <div className="text-left">
              <p className="text-[8px] text-slate-400 dark:text-gray-500 font-black uppercase tracking-widest leading-none mb-1">Benim Profilim</p>
              <p className="text-xs font-black text-slate-800 dark:text-white leading-none">{username || 'Kullanıcı'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[8px] bg-amber-500/10 text-amber-500 font-black px-2 py-1 rounded-full border border-amber-500/25 uppercase tracking-widest leading-none">
              {unlockedAchievements.length} Rozet
            </span>
          </div>
        </button>
      </div>

      {/* Access Denied Modal */}
      {lockedMessage && (
        <div className="absolute inset-0 bg-slate-100/80 dark:bg-[#08090d]/80 backdrop-blur-sm flex flex-col justify-center p-6 z-50 animate-fade-in text-center">
          <div className="bg-white dark:bg-[#12141c] border border-danger-red/30 rounded-2xl p-5 shadow-2xl">
            <h3 className="text-danger-red font-black text-base mb-1.5">Erişim Engellendi</h3>
            <p className="text-slate-600 dark:text-gray-300 text-xs mb-4 leading-relaxed">{lockedMessage}</p>
            <button 
              onClick={() => setLockedMessage('')}
              className="w-full py-2.5 bg-slate-150 dark:bg-[#1f2330] hover:bg-slate-200 dark:hover:bg-[#2a2f42] text-slate-800 dark:text-white rounded-xl text-xs uppercase font-extrabold active:scale-[0.98] transition-all"
            >
              Tamam
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
