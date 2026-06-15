import { createContext, useState, useContext, useEffect } from 'react';
import { playBGM, stopBGM } from '../utils/soundEffects';

const AppContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext);

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
        resetGame
      }}


    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
