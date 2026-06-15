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
    createdAt: new Date().toISOString()
  };

  const mockLeaderboard = JSON.parse(localStorage.getItem('safely_mock_leaderboard') || '{}');
  mockLeaderboard[usernameClean] = initialRecord;
  localStorage.setItem('safely_mock_leaderboard', JSON.stringify(mockLeaderboard));
};

/**
 * Saves final score and locks the status to completed
 */
export const saveFinalScore = async (username, score, lives) => {
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
 * Retrieves the Top 50 completed records from LocalStorage
 */
export const getLeaderboard = async (filter = 'all') => {
  const currentWeek = getWeekIdentifier();

  const mockLeaderboard = JSON.parse(localStorage.getItem('safely_mock_leaderboard') || '{}');
  const records = Object.values(mockLeaderboard)
    .filter(record => record.status === 'completed' && (filter !== 'weekly' || record.weekId === currentWeek))
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime();
    })
    .slice(0, 50);

  return records;
};
