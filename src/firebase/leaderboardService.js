// Dynamic Title Helper based on Score
export const getTitleForScore = (score) => {
  if (score <= 670) return "Açık Hedef 🎯";
  if (score <= 1340) return "Acemi Kullanıcı 📱";
  if (score <= 2010) return "Bilinçli Kullanıcı 🧠";
  if (score <= 2680) return "Dijital Koruyucu 🛡️";
  if (score <= 3182) return "Siber Uzman 🔐";
  return "Siber Usta 👑";
};

// Generates ISO-8601 week number string (e.g. "2026-W24")
export const getWeekIdentifier = () => {
  const d = new Date();
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
};

// Static Artificial Players (7 Mock Players: 1 High, 4 Avg, 2 Low)
export const MOCK_PLAYERS = [
  {
    id: "mock_1",
    username: "SiberGoz_99",
    score: 3300,
    heartsRemaining: 3,
    title: getTitleForScore(3300),
    status: "completed",
    weekId: getWeekIdentifier(),
    avatar: "👑",
    cardTheme: "cyber-guardian",
    theme: "matrix",
    completedAt: new Date(Date.now() - 2 * 3600000).toISOString() // 2 hours ago
  },
  {
    id: "mock_2",
    username: "Kripto_Kağan",
    score: 2450,
    heartsRemaining: 2,
    title: getTitleForScore(2450),
    status: "completed",
    weekId: getWeekIdentifier(),
    avatar: "🦊",
    cardTheme: "card-amber",
    theme: "amber",
    completedAt: new Date(Date.now() - 4 * 3600000).toISOString() // 4 hours ago
  },
  {
    id: "mock_3",
    username: "VeriKalkanı",
    score: 1850,
    heartsRemaining: 3,
    title: getTitleForScore(1850),
    status: "completed",
    weekId: getWeekIdentifier(),
    avatar: "🛡️",
    cardTheme: "secure",
    theme: "default",
    completedAt: new Date(Date.now() - 12 * 3600000).toISOString() // 12 hours ago
  },
  {
    id: "mock_4",
    username: "HackerBuster",
    score: 1520,
    heartsRemaining: 1,
    title: getTitleForScore(1520),
    status: "completed",
    weekId: "2026-W10",
    avatar: "👨‍💻",
    cardTheme: "threat-monitor",
    theme: "neon-sunset",
    completedAt: "2026-06-10T14:20:00.000Z"
  },
  {
    id: "mock_5",
    username: "KodYazanKedi",
    score: 1200,
    heartsRemaining: 2,
    title: getTitleForScore(1200),
    status: "completed",
    weekId: getWeekIdentifier(),
    avatar: "🐱",
    cardTheme: "card-ocean",
    theme: "ocean",
    completedAt: new Date(Date.now() - 24 * 3600000).toISOString() // 1 day ago
  },
  {
    id: "mock_6",
    username: "SiberCırak",
    score: 850,
    heartsRemaining: 3,
    title: getTitleForScore(850),
    status: "completed",
    weekId: "2026-W10",
    avatar: "👤",
    cardTheme: "clean-slate",
    theme: "default",
    completedAt: "2026-06-11T09:15:00.000Z"
  },
  {
    id: "mock_7",
    username: "LamerSavdı",
    score: 450,
    heartsRemaining: 1,
    title: getTitleForScore(450),
    status: "completed",
    weekId: "2026-W10",
    avatar: "🤖",
    cardTheme: "clean-slate",
    theme: "default",
    completedAt: "2026-06-12T17:45:00.000Z"
  }
];

/**
 * Checks if a username is unique on LocalStorage (case-insensitive check using lowercase IDs)
 */
export const isUsernameUnique = async (username) => {
  if (!username || !username.trim()) return false;
  const usernameClean = username.trim().toLowerCase();

  // Admin hesabı her zaman benzersizdir ve kaydedilmez (Test için)
  if (usernameClean === 'admin') return true;

  const mockLeaderboard = JSON.parse(localStorage.getItem('safely_mock_leaderboard') || '{}');
  return !mockLeaderboard[usernameClean];
};

/**
 * Reserves a username in LocalStorage immediately
 */
export const reserveUsername = async (username) => {
  if (!username || !username.trim()) return;
  const usernameClean = username.trim().toLowerCase();

  // Admin hesabı kaydedilmez
  if (usernameClean === 'admin') return;

  const initialRecord = {
    username: username.trim(),
    score: 0,
    heartsRemaining: 3,
    badges: [],
    badgeCount: 0,
    title: getTitleForScore(0),
    status: "registered",
    weekId: getWeekIdentifier(),
    avatar: "👤",
    theme: "default",
    cardTheme: "clean-slate",
    createdAt: new Date().toISOString()
  };

  const mockLeaderboard = JSON.parse(localStorage.getItem('safely_mock_leaderboard') || '{}');
  mockLeaderboard[usernameClean] = initialRecord;
  localStorage.setItem('safely_mock_leaderboard', JSON.stringify(mockLeaderboard));
};

/**
 * Saves final score and locks the status to completed
 */
export const saveFinalScore = async (username, score, lives, avatar, theme, cardTheme) => {
  if (!username || !username.trim()) return;
  const usernameClean = username.trim().toLowerCase();

  // Admin hesabı leaderboard'a kaydedilmez
  if (usernameClean === 'admin') return;

  const finalRecord = {
    score: score,
    heartsRemaining: lives,
    title: getTitleForScore(score),
    status: "completed",
    weekId: getWeekIdentifier(),
    avatar: avatar || '👤',
    theme: theme || 'default',
    cardTheme: cardTheme || 'clean-slate',
    completedAt: new Date().toISOString()
  };

  const mockLeaderboard = JSON.parse(localStorage.getItem('safely_mock_leaderboard') || '{}');
  if (mockLeaderboard[usernameClean]) {
    mockLeaderboard[usernameClean] = {
      ...mockLeaderboard[usernameClean],
      ...finalRecord,
      completedAt: new Date().toISOString()
    };
    localStorage.setItem('safely_mock_leaderboard', JSON.stringify(mockLeaderboard));
  }
};

/**
 * Retrieves the Top 50 completed records from LocalStorage merged with static MOCK_PLAYERS
 */
export const getLeaderboard = async (filter = 'all') => {
  const currentWeek = getWeekIdentifier();

  // Filter static mock players
  const mockFiltered = MOCK_PLAYERS.filter(
    player => filter !== 'weekly' || player.weekId === currentWeek
  );

  // Filter local storage players
  const localLeaderboard = JSON.parse(localStorage.getItem('safely_mock_leaderboard') || '{}');
  const localFiltered = Object.values(localLeaderboard).filter(
    record => record.status === 'completed' && (filter !== 'weekly' || record.weekId === currentWeek)
  );

  // Combine lists
  const combined = [...mockFiltered, ...localFiltered];

  // Sort and slice
  return combined
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return new Date(a.completedAt || a.createdAt).getTime() - new Date(b.completedAt || b.createdAt).getTime();
    })
    .slice(0, 50);
};
