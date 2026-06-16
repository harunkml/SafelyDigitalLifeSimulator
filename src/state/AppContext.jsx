import { createContext, useState, useContext, useEffect } from 'react';
import { playBGM, stopBGM } from '../utils/soundEffects';

const AppContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext);

export const ACHIEVEMENTS = [
  {
    id: 'first_100_vp',
    title: 'İlk Birikim 💰',
    description: 'Toplamda ilk kez 100 VP barajına ulaştınız.',
    reward: 20,
    icon: '💰'
  },
  {
    id: 'collector_2',
    title: 'Tema Koleksiyoncusu 🎨',
    description: 'Mağazadan 2 farklı tema satın aldınız.',
    reward: 50,
    icon: '🎨'
  },
  {
    id: 'collector_all',
    title: 'Siber Moda İkonu 👑',
    description: 'Mağazadaki tüm temaları satın aldınız.',
    reward: 500,
    icon: '👑'
  },
  {
    id: 'streak_5',
    title: 'Beşli Seri 🔥',
    description: 'Herhangi bir oyunda üst üste 5 doğru cevap verdiniz.',
    reward: 10,
    icon: '🔥'
  },
  {
    id: 'streak_10',
    title: 'Yenilmez ⚡',
    description: 'Herhangi bir oyunda üst üste 10 doğru cevap verdiniz.',
    reward: 50,
    icon: '⚡'
  },
  {
    id: 'accuracy_90',
    title: 'Keskin Göz 🎯',
    description: 'Bir modülü %90 veya üzeri başarı oranıyla bitirdiniz.',
    reward: 50,
    icon: '🎯'
  },
  {
    id: 'password_master',
    title: 'Şifre Muhafızı 🔑',
    description: 'Şifre Laboratuvarı\'nı sıfır hata ile tamamladınız.',
    reward: 100,
    icon: '🔑'
  },
  {
    id: 'email_master',
    title: 'Posta Dedektifi 📬',
    description: 'E-Posta Güvenliği\'ni sıfır hata ile tamamladınız.',
    reward: 200,
    icon: '📬'
  },
  {
    id: 'permission_master',
    title: 'İzin Denetçisi 🛡️',
    description: 'Uygulama İzinleri\'ni sıfır hata ile tamamladınız.',
    reward: 200,
    icon: '🛡️'
  },
  {
    id: 'cyber_detective',
    title: 'Siber Dedektif 🕵️‍♂️',
    description: 'Tüm modülleri (E-Posta, Şifre, İzinler) sıfır hata ile bitirdiniz!',
    reward: 500,
    icon: '🕵️‍♂️'
  },
  {
    id: 'welcome_bonus',
    title: 'İlk Gün 🚶',
    description: 'İlk günlük giriş bonusunuzu aldınız.',
    reward: 10,
    icon: '🚶'
  },
  {
    id: 'big_spender',
    title: 'İlk Yatırım 💸',
    description: 'Mağazadan ilk temanızı satın aldınız.',
    reward: 15,
    icon: '💸'
  },
  {
    id: 'persistent_player',
    title: 'Azimli Oyuncu 👾',
    description: '3 modülü de başarıyla tamamladınız.',
    reward: 100,
    icon: '👾'
  }
];

export const AppProvider = ({ children }) => {
  const [username, setUsernameState] = useState(() => {
    return localStorage.getItem('safely_username') || '';
  });
  const [securityScore, setSecurityScore] = useState(500);
  const [lives, setLives] = useState(3);
  const [music, setMusic] = useState(true);
  const [sound, setSound] = useState(true);
  const [currentDay, setCurrentDay] = useState(1);
  const [batteryLevel, setBatteryLevel] = useState(82);
  
  // Game scores and completion states
  const [mailScore, setMailScore] = useState(0);
  const [mailCompleted, setMailCompleted] = useState(false);
  const [mailFailedLocked, setMailFailedLocked] = useState(false);
  
  const [passwordScore, setPasswordScore] = useState(0);
  const [passwordCompleted, setPasswordCompleted] = useState(false);
  
  const [permissionsScore, setPermissionsScore] = useState(0);
  const [permissionsCompleted, setPermissionsCompleted] = useState(false);

  const [theme, setTheme] = useState('light'); // 'light' or 'dark'
  const [activeTheme, setActiveTheme] = useState(() => {
    return localStorage.getItem('safely_active_theme') || 'default';
  });

  // Veri Puanı (VP) and personalization states
  const [veriPuani, setVeriPuaniState] = useState(() => {
    const saved = localStorage.getItem('safely_veri_puani');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [unlockedThemes, setUnlockedThemes] = useState(() => {
    const saved = localStorage.getItem('safely_unlocked_themes');
    return saved ? JSON.parse(saved) : ['default'];
  });

  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    const saved = localStorage.getItem('safely_unlocked_achievements');
    return saved ? JSON.parse(saved) : [];
  });

  const [achievementToast, setAchievementToast] = useState(null);

  const [sfxVolume, setSfxVolume] = useState(() => {
    const saved = localStorage.getItem('safely_sfx_volume');
    return saved ? parseInt(saved, 10) : 45; // Varsayılan SFX volume değeri (%45)
  });

  const [bgmVolume, setBgmVolume] = useState(() => {
    const saved = localStorage.getItem('safely_bgm_volume');
    return saved ? parseInt(saved, 10) : 15; // Varsayılan BGM volume değeri (%15)
  });

  const updateSfxVolume = (vol) => {
    setSfxVolume(vol);
    localStorage.setItem('safely_sfx_volume', String(vol));
  };

  const updateBgmVolume = (vol) => {
    setBgmVolume(vol);
    localStorage.setItem('safely_bgm_volume', String(vol));
  };

  const selectActiveTheme = (val) => {
    setActiveTheme(val);
    localStorage.setItem('safely_active_theme', val);
  };

  const setVeriPuani = (val) => {
    setVeriPuaniState(val);
    localStorage.setItem('safely_veri_puani', String(val));
    if (val >= 100) {
      unlockAchievement('first_100_vp');
    }
  };

  const unlockAchievement = (id) => {
    setUnlockedAchievements((prev) => {
      if (prev.includes(id)) return prev;
      const newUnlocked = [...prev, id];
      localStorage.setItem('safely_unlocked_achievements', JSON.stringify(newUnlocked));
      
      const ach = ACHIEVEMENTS.find(a => a.id === id);
      if (ach) {
        setVeriPuaniState((currentVP) => {
          const nextVP = currentVP + ach.reward;
          localStorage.setItem('safely_veri_puani', String(nextVP));
          if (nextVP >= 100 && id !== 'first_100_vp') {
            setTimeout(() => unlockAchievement('first_100_vp'), 50);
          }
          return nextVP;
        });
        setAchievementToast(ach);
      }
      return newUnlocked;
    });
  };

  const awardAnswerVP = (isCorrect, currentStreak) => {
    if (!isCorrect) return { vpEarned: 0, streakBonus: 0 };
    
    const earned = 5;
    let bonus = 0;
    
    if (currentStreak === 3) bonus = 10;
    else if (currentStreak === 5) bonus = 20;
    else if (currentStreak === 10) bonus = 50;
    
    const total = earned + bonus;
    setVeriPuani(veriPuani + total);
    
    if (currentStreak === 5) unlockAchievement('streak_5');
    if (currentStreak === 10) unlockAchievement('streak_10');
    
    return { vpEarned: earned, streakBonus: bonus };
  };

  const awardCompletionVP = () => {
    setVeriPuani(veriPuani + 50);
  };

  const awardEndGameVP = (totalScore) => {
    let reward = 0;
    if (totalScore < 670) reward = 0;
    else if (totalScore < 1340) reward = 25;
    else if (totalScore < 2010) reward = 50;
    else if (totalScore < 2680) reward = 125;
    else if (totalScore < 3162) reward = 250;
    else reward = 350;
    
    setVeriPuani(veriPuani + reward);
    return reward;
  };

  const buyTheme = (themeId, price) => {
    if (veriPuani >= price && !unlockedThemes.includes(themeId)) {
      const nextVP = veriPuani - price;
      setVeriPuani(nextVP);
      
      const nextThemes = [...unlockedThemes, themeId];
      setUnlockedThemes(nextThemes);
      localStorage.setItem('safely_unlocked_themes', JSON.stringify(nextThemes));
      
      const purchasedCount = nextThemes.length - 1;
      if (purchasedCount >= 2) {
        setTimeout(() => unlockAchievement('collector_2'), 50);
      }
      if (purchasedCount >= 4) {
        setTimeout(() => unlockAchievement('collector_all'), 50);
      }
      setTimeout(() => unlockAchievement('big_spender'), 50);
      
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.remove('arctic-protocol', 'amber-shield', 'matrix-noir', 'ocean-core');
    if (activeTheme === 'arctic') {
      document.documentElement.classList.add('arctic-protocol');
    } else if (activeTheme === 'amber') {
      document.documentElement.classList.add('amber-shield');
    } else if (activeTheme === 'matrix') {
      document.documentElement.classList.add('matrix-noir');
    } else if (activeTheme === 'ocean') {
      document.documentElement.classList.add('ocean-core');
    }
  }, [activeTheme]);

  useEffect(() => {
    if (music) {
      stopBGM();
      playBGM(bgmVolume);
    } else {
      stopBGM();
    }
  }, [music, bgmVolume, activeTheme]);

  // Sync username to localStorage
  const setUsername = (name) => {
    setUsernameState(name);
    if (name) {
      localStorage.setItem('safely_username', name);
    } else {
      localStorage.removeItem('safely_username');
    }
  };

  const resetGame = () => {
    setUsername('');
    setSecurityScore(500);
    setLives(3);
    setMusic(true);
    setSound(true);
    setCurrentDay(1);
    setMailScore(0);
    setMailCompleted(false);
    setMailFailedLocked(false);
    setPasswordScore(0);
    setPasswordCompleted(false);
    setPermissionsScore(0);
    setPermissionsCompleted(false);
    setSfxVolume(45);
    localStorage.setItem('safely_sfx_volume', '45');
    setBgmVolume(15);
    localStorage.setItem('safely_bgm_volume', '15');
    // Reset VP & Achievements
    setVeriPuaniState(0);
    localStorage.setItem('safely_veri_puani', '0');
    setUnlockedThemes(['default']);
    localStorage.setItem('safely_unlocked_themes', JSON.stringify(['default']));
    setUnlockedAchievements([]);
    localStorage.setItem('safely_unlocked_achievements', JSON.stringify([]));
    setActiveTheme('default');
    localStorage.setItem('safely_active_theme', 'default');
  };

  // Simulating battery level just for the OS status bar feel
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prev) => (prev > 1 ? prev - 1 : 100));
    }, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <AppContext.Provider
      value={{
        username,
        setUsername,
        securityScore,
        setSecurityScore,
        lives,
        setLives,
        music,
        setMusic,
        sound,
        setSound,
        currentDay,
        setCurrentDay,
        batteryLevel,
        mailScore,
        setMailScore,
        mailCompleted,
        setMailCompleted,
        mailFailedLocked,
        setMailFailedLocked,
        passwordScore,
        setPasswordScore,
        passwordCompleted,
        setPasswordCompleted,
        permissionsScore,
        setPermissionsScore,
        permissionsCompleted,
        setPermissionsCompleted,
        theme,
        setTheme,
        activeTheme,
        selectActiveTheme,
        sfxVolume,
        updateSfxVolume,
        bgmVolume,
        updateBgmVolume,
        resetGame,
        // VP & achievements additions
        veriPuani,
        setVeriPuani,
        unlockedThemes,
        unlockedAchievements,
        achievementToast,
        setAchievementToast,
        awardAnswerVP,
        awardCompletionVP,
        awardEndGameVP,
        unlockAchievement,
        buyTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
