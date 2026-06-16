import { createContext, useState, useContext, useEffect } from 'react';
import { playBGM, stopBGM } from '../utils/soundEffects';

const AppContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext);

// eslint-disable-next-line react-refresh/only-export-components
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

// eslint-disable-next-line react-refresh/only-export-components
export const COSMETICS_DB = {
  emojis: {
    common: [
      { id: 'alien', name: '👽 Alien', value: '👽', rarity: 'common' },
      { id: 'pumpkin', name: '🎃 Balkabağı', value: '🎃', rarity: 'common' },
      { id: 'clown', name: '🤡 Palyaço', value: '🤡', rarity: 'common' },
      { id: 'poop', name: '💩 Kaka', value: '💩', rarity: 'common' }
    ],
    rare: [
      { id: 'fox', name: '🦊 Tilki', value: '🦊', rarity: 'rare' },
      { id: 'owl', name: '🦉 Baykuş', value: '🦉', rarity: 'rare' },
      { id: 'penguin', name: '🐧 Penguen', value: '🐧', rarity: 'rare' },
      { id: 'cyborg-arm', name: '🦾 Mekanik Kol', value: '🦾', rarity: 'rare' }
    ],
    epic: [
      { id: 'hacker', name: '👨‍💻 Hacker', value: '👨‍💻', rarity: 'epic' },
      { id: 'shield-avatar', name: '🛡️ Kalkan', value: '🛡️', rarity: 'epic' },
      { id: 'lock-avatar', name: '🔐 Şifreli Kilit', value: '🔐', rarity: 'epic' },
      { id: 'dish-avatar', name: '📡 Çanak Anten', value: '📡', rarity: 'epic' }
    ],
    legendary: [
      { id: 'crown-avatar', name: '👑 Taç', value: '👑', rarity: 'legendary' },
      { id: 'rocket-avatar', name: '🚀 Roket', value: '🚀', rarity: 'legendary' },
      { id: 'zap-avatar', name: '⚡ Şimşek', value: '⚡', rarity: 'legendary' },
      { id: 'brain-avatar', name: '🧠 Beyin', value: '🧠', rarity: 'legendary' }
    ]
  },
  themes: {
    common: [
      { id: 'neon-sunset', name: 'Neon Sunset 🌇', value: 'neon-sunset', rarity: 'common' },
      { id: 'copper-circuit', name: 'Copper Circuit 🧡', value: 'copper-circuit', rarity: 'common' }
    ],
    rare: [
      { id: 'nova-core', name: 'Nova Core 🚀', value: 'nova-core', rarity: 'rare' },
      { id: 'arctic', name: 'Arctic Protocol ❄', value: 'arctic', rarity: 'rare' },
      { id: 'ocean', name: 'Ocean Core 🌊', value: 'ocean', rarity: 'rare' }
    ],
    epic: [
      { id: 'amber', name: 'Amber Shield 🔥', value: 'amber', rarity: 'epic' },
      { id: 'matrix', name: 'Matrix Noir 🌿', value: 'matrix', rarity: 'epic' }
    ]
  },
  cardThemes: {
    common: [
      { id: 'carbon', name: 'Carbon ⚫', value: 'carbon', rarity: 'common' },
      { id: 'card-ocean', name: 'Ocean 🌊', value: 'card-ocean', rarity: 'common' },
      { id: 'secure', name: 'Secure 🛡', value: 'secure', rarity: 'common' }
    ],
    rare: [
      { id: 'card-arctic', name: 'Arctic Protocol ❄', value: 'card-arctic', rarity: 'rare' },
      { id: 'card-matrix', name: 'Matrix Noir 🌿', value: 'card-matrix', rarity: 'rare' },
      { id: 'card-amber', name: 'Amber Shield 🔥', value: 'card-amber', rarity: 'rare' },
      { id: 'network-grid', name: 'Network Grid 📡', value: 'network-grid', rarity: 'rare' }
    ],
    epic: [
      { id: 'data-stream', name: 'Data Stream 🧬', value: 'data-stream', rarity: 'epic' },
      { id: 'encrypted', name: 'Encrypted 🔐', value: 'encrypted', rarity: 'epic' },
      { id: 'satellite', name: 'Satellite Link 🛰', value: 'satellite', rarity: 'epic' },
      { id: 'threat-monitor', name: 'Threat Monitor ⚡', value: 'threat-monitor', rarity: 'epic' }
    ],
    legendary: [
      { id: 'cyber-guardian', name: 'Cyber Guardian 🛡', value: 'cyber-guardian', rarity: 'legendary' },
      { id: 'quantum', name: 'Quantum Protocol 🚀', value: 'quantum', rarity: 'legendary' },
      { id: 'founder', name: 'Founder\'s Edition 🏆', value: 'founder', rarity: 'legendary' }
    ]
  }
};

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

  const [lastDailyClaimTime, setLastDailyClaimTimeState] = useState(() => {
    const saved = localStorage.getItem('safely_last_daily_bonus_claim_time');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [unlockedCardThemes, setUnlockedCardThemes] = useState(() => {
    const saved = localStorage.getItem('safely_unlocked_card_themes');
    return saved ? JSON.parse(saved) : ['clean-slate'];
  });

  const [unlockedEmojis, setUnlockedEmojis] = useState(() => {
    const saved = localStorage.getItem('safely_unlocked_emojis');
    return saved ? JSON.parse(saved) : ['👤', '🤖', '😀', '😎', '👾'];
  });

  const [activeCardTheme, setActiveCardThemeState] = useState(() => {
    return localStorage.getItem('safely_active_card_theme') || 'clean-slate';
  });

  const [userAvatar, setUserAvatarState] = useState(() => {
    return localStorage.getItem('safely_user_avatar') || '👤';
  });

  const [cyberMasterClaimed, setCyberMasterClaimedState] = useState(() => {
    return localStorage.getItem('safely_cyber_master_claimed') === 'true';
  });

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
    let reward;
    if (totalScore < 670) reward = 0;
    else if (totalScore < 1340) reward = 25;
    else if (totalScore < 2010) reward = 50;
    else if (totalScore < 2680) reward = 125;
    else if (totalScore < 3162) reward = 250;
    else reward = 350;
    
    setVeriPuani(veriPuani + reward);
    return reward;
  };

  const claimDailyReward = () => {
    const now = Date.now();
    const cooldown = 24 * 60 * 60 * 1000; // 24 hours
    if (now - lastDailyClaimTime >= cooldown) {
      const nextVP = veriPuani + 50;
      setVeriPuani(nextVP);
      setLastDailyClaimTimeState(now);
      localStorage.setItem('safely_last_daily_bonus_claim_time', String(now));
      
      // Unlock the achievement
      unlockAchievement('welcome_bonus');
      return true;
    }
    return false;
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

  const selectActiveCardTheme = (val) => {
    setActiveCardThemeState(val);
    localStorage.setItem('safely_active_card_theme', val);
  };

  const selectUserAvatar = (val) => {
    setUserAvatarState(val);
    localStorage.setItem('safely_user_avatar', val);
  };

  const awardRandomItemOfRarity = (rarity, cost) => {
    const pool = [];

    // Check emojis
    if (COSMETICS_DB.emojis[rarity]) {
      COSMETICS_DB.emojis[rarity].forEach(item => {
        if (!unlockedEmojis.includes(item.value)) {
          pool.push({ ...item, type: 'emoji' });
        }
      });
    }

    // Check general themes
    if (COSMETICS_DB.themes[rarity]) {
      COSMETICS_DB.themes[rarity].forEach(item => {
        if (!unlockedThemes.includes(item.value)) {
          pool.push({ ...item, type: 'theme' });
        }
      });
    }

    // Check card themes
    if (COSMETICS_DB.cardThemes[rarity]) {
      COSMETICS_DB.cardThemes[rarity].forEach(item => {
        if (!unlockedCardThemes.includes(item.value)) {
          pool.push({ ...item, type: 'cardTheme' });
        }
      });
    }

    // Fallback: if rolled rarity is complete, try to find an item in other rarities
    if (pool.length === 0) {
      const raritiesOrder = ['common', 'rare', 'epic', 'legendary'];
      for (const r of raritiesOrder) {
        if (r === rarity) continue;
        
        if (COSMETICS_DB.emojis[r]) {
          COSMETICS_DB.emojis[r].forEach(item => {
            if (!unlockedEmojis.includes(item.value)) pool.push({ ...item, type: 'emoji' });
          });
        }
        if (COSMETICS_DB.themes[r]) {
          COSMETICS_DB.themes[r].forEach(item => {
            if (!unlockedThemes.includes(item.value)) pool.push({ ...item, type: 'theme' });
          });
        }
        if (COSMETICS_DB.cardThemes[r]) {
          COSMETICS_DB.cardThemes[r].forEach(item => {
            if (!unlockedCardThemes.includes(item.value)) pool.push({ ...item, type: 'cardTheme' });
          });
        }

        if (pool.length > 0) {
          break;
        }
      }
    }

    // If still empty, refund 50%
    if (pool.length === 0) {
      const refund = Math.floor(cost / 2);
      const nextVP = veriPuani + refund; // cost already deducted in caller
      setVeriPuani(nextVP);
      return {
        success: true,
        refunded: true,
        refundAmount: refund,
        reason: 'Tüm mağaza eşyalarına sahipsiniz! VP iade edildi.'
      };
    }

    // Select random item
    const selectedItem = pool[Math.floor(Math.random() * pool.length)];

    // Unlock
    if (selectedItem.type === 'emoji') {
      const nextEmojis = [...unlockedEmojis, selectedItem.value];
      setUnlockedEmojis(nextEmojis);
      localStorage.setItem('safely_unlocked_emojis', JSON.stringify(nextEmojis));
    } else if (selectedItem.type === 'theme') {
      const nextThemes = [...unlockedThemes, selectedItem.value];
      setUnlockedThemes(nextThemes);
      localStorage.setItem('safely_unlocked_themes', JSON.stringify(nextThemes));
    } else if (selectedItem.type === 'cardTheme') {
      const nextCardThemes = [...unlockedCardThemes, selectedItem.value];
      setUnlockedCardThemes(nextCardThemes);
      localStorage.setItem('safely_unlocked_card_themes', JSON.stringify(nextCardThemes));
    }

    // Check Collector Achievement
    const totalUnlockedCount = (unlockedThemes.length - 1) + (unlockedCardThemes.length - 1);
    if (totalUnlockedCount + 1 >= 2) {
      setTimeout(() => unlockAchievement('collector_2'), 50);
    }
    if (totalUnlockedCount + 1 >= 8) {
      setTimeout(() => unlockAchievement('collector_all'), 50);
    }

    return {
      success: true,
      refunded: false,
      item: selectedItem
    };
  };

  const openLootBox = (boxType) => {
    let cost;
    if (boxType === 'mystery') cost = 250;
    else if (boxType === 'legendary') cost = 500;
    else return { success: false, reason: 'Geçersiz kutu tipi.' };

    if (veriPuani < cost) {
      return { success: false, reason: 'Yetersiz Veri Puanı (VP) bakiyesi.' };
    }

    // Deduct cost first
    setVeriPuani(veriPuani - cost);

    const roll = Math.floor(Math.random() * 100);
    let chosenRarity;

    if (boxType === 'mystery') {
      if (roll < 70) chosenRarity = 'common';
      else if (roll < 95) chosenRarity = 'rare';
      else chosenRarity = 'epic';
    } else {
      if (roll < 60) chosenRarity = 'rare';
      else if (roll < 90) chosenRarity = 'epic';
      else chosenRarity = 'legendary';
    }

    return awardRandomItemOfRarity(chosenRarity, cost);
  };

  const claimCyberMasterChest = () => {
    const mockLeaderboard = JSON.parse(localStorage.getItem('safely_mock_leaderboard') || '{}');
    const userRecord = mockLeaderboard[username.toLowerCase()];
    const highScore = userRecord && userRecord.status === 'completed' ? userRecord.score : 0;

    if (highScore >= 3000 && !cyberMasterClaimed) {
      const nextEmojis = unlockedEmojis.includes('🕵️‍♂️') ? unlockedEmojis : [...unlockedEmojis, '🕵️‍♂️'];
      setUnlockedEmojis(nextEmojis);
      localStorage.setItem('safely_unlocked_emojis', JSON.stringify(nextEmojis));

      const nextCardThemes = unlockedCardThemes.includes('cyber-master-card') ? unlockedCardThemes : [...unlockedCardThemes, 'cyber-master-card'];
      setUnlockedCardThemes(nextCardThemes);
      localStorage.setItem('safely_unlocked_card_themes', JSON.stringify(nextCardThemes));

      const nextThemes = unlockedThemes.includes('cyber-master') ? unlockedThemes : [...unlockedThemes, 'cyber-master'];
      setUnlockedThemes(nextThemes);
      localStorage.setItem('safely_unlocked_themes', JSON.stringify(nextThemes));

      setCyberMasterClaimedState(true);
      localStorage.setItem('safely_cyber_master_claimed', 'true');

      // Auto equip
      setUserAvatarState('🕵️‍♂️');
      localStorage.setItem('safely_user_avatar', '🕵️‍♂️');

      setActiveCardThemeState('cyber-master-card');
      localStorage.setItem('safely_active_card_theme', 'cyber-master-card');

      selectActiveTheme('cyber-master');

      return true;
    }
    return false;
  };

  useEffect(() => {
    document.documentElement.classList.remove(
      'arctic-protocol', 'amber-shield', 'matrix-noir', 'ocean-core',
      'neon-sunset', 'nova-core', 'copper-circuit', 'cyber-master'
    );
    if (activeTheme === 'arctic') {
      document.documentElement.classList.add('arctic-protocol');
    } else if (activeTheme === 'amber') {
      document.documentElement.classList.add('amber-shield');
    } else if (activeTheme === 'matrix') {
      document.documentElement.classList.add('matrix-noir');
    } else if (activeTheme === 'ocean') {
      document.documentElement.classList.add('ocean-core');
    } else if (activeTheme === 'neon-sunset') {
      document.documentElement.classList.add('neon-sunset');
    } else if (activeTheme === 'nova-core') {
      document.documentElement.classList.add('nova-core');
    } else if (activeTheme === 'copper-circuit') {
      document.documentElement.classList.add('copper-circuit');
    } else if (activeTheme === 'cyber-master') {
      document.documentElement.classList.add('cyber-master');
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
      if (name.toLowerCase() === 'admin') {
        setVeriPuani(5000);
      }
    } else {
      localStorage.removeItem('safely_username');
    }
  };

  const resetGame = () => {
    setUsername('');
    setSecurityScore(550);
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
    
    // Reset custom items
    setUnlockedCardThemes(['clean-slate']);
    localStorage.setItem('safely_unlocked_card_themes', JSON.stringify(['clean-slate']));
    setUnlockedEmojis(['👤', '🤖', '😀', '😎', '👾']);
    localStorage.setItem('safely_unlocked_emojis', JSON.stringify(['👤', '🤖', '😀', '😎', '👾']));
    setActiveCardThemeState('clean-slate');
    localStorage.setItem('safely_active_card_theme', 'clean-slate');
    setUserAvatarState('👤');
    localStorage.setItem('safely_user_avatar', '👤');
    setCyberMasterClaimedState(false);
    localStorage.setItem('safely_cyber_master_claimed', 'false');
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
        buyTheme,
        lastDailyClaimTime,
        claimDailyReward,
        // Loot Box & Emojis additions
        unlockedCardThemes,
        unlockedEmojis,
        activeCardTheme,
        selectActiveCardTheme,
        userAvatar,
        selectUserAvatar,
        cyberMasterClaimed,
        openLootBox,
        claimCyberMasterChest
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
