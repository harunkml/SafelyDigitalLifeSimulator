import { doc, getDoc, setDoc, updateDoc, collection, query, where, orderBy, limit, getDocs, serverTimestamp } from 'firebase/firestore/lite';
import { db } from './config';

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

// Check if Firebase is using placeholder key (not configured yet)
const isFirebaseConfigured = () => {
  try {
    return db && db.app && db.app.options && db.app.options.apiKey && db.app.options.apiKey !== "fallback-placeholder-key";
  } catch {
    return false;
  }
};



/**
 * Checks if a username is unique on Firestore (case-insensitive check using lowercase IDs)
 * Fallback to LocalStorage simulation in dev mode if Firebase is not fully setup.
 */
export const isUsernameUnique = async (username) => {
  if (!username || !username.trim()) return false;
  const usernameClean = username.trim().toLowerCase();

  // Admin hesabı her zaman benzersizdir ve kaydedilmez (Test için)
  if (usernameClean === 'admin') return true;

  // 1. Firebase Firestore Check
  if (isFirebaseConfigured()) {
    try {
      const docRef = doc(db, 'leaderboard', usernameClean);
      const docSnap = await getDoc(docRef);
      return !docSnap.exists();
    } catch (error) {
      console.warn("Firestore check failed, falling back to LocalStorage simulation:", error);
    }
  }

  // 2. Dev mode / Offline LocalStorage Fallback Check
  const mockLeaderboard = JSON.parse(localStorage.getItem('safely_mock_leaderboard') || '{}');
  return !mockLeaderboard[usernameClean];
};

/**
 * Reserves a username in Firestore immediately to prevent concurrency issues
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
    createdAt: new Date().toISOString() // Fallback ISO string
  };

  // 1. Firebase Firestore Write
  if (isFirebaseConfigured()) {
    try {
      const docRef = doc(db, 'leaderboard', usernameClean);
      await setDoc(docRef, {
        ...initialRecord,
        createdAt: serverTimestamp() // Firestore native timestamp
      });
      return;
    } catch (error) {
      console.warn("Firestore reservation failed, falling back to LocalStorage:", error);
    }
  }

  // 2. LocalStorage Fallback
  const mockLeaderboard = JSON.parse(localStorage.getItem('safely_mock_leaderboard') || '{}');
  mockLeaderboard[usernameClean] = initialRecord;
  localStorage.setItem('safely_mock_leaderboard', JSON.stringify(mockLeaderboard));
};

/**
 * Saves final score, locks the status to completed, and computes dynamic titles
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

  // 1. Firebase Firestore Update
  if (isFirebaseConfigured()) {
    try {
      const docRef = doc(db, 'leaderboard', usernameClean);
      await updateDoc(docRef, {
        ...finalRecord,
        completedAt: serverTimestamp()
      });
      return;
    } catch (error) {
      console.warn("Firestore final save failed, falling back to LocalStorage:", error);
    }
  }

  // 2. LocalStorage Fallback
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
 * Retrieves the Top 50 completed records for the Leaderboard
 */
export const getLeaderboard = async (filter = 'all') => {
  const currentWeek = getWeekIdentifier();

  // 1. Firebase Firestore Query
  if (isFirebaseConfigured()) {
    try {
      const lbCollection = collection(db, 'leaderboard');
      let lbQuery;

      if (filter === 'weekly') {
        lbQuery = query(
          lbCollection,
          where('status', '==', 'completed'),
          where('weekId', '==', currentWeek),
          orderBy('score', 'desc'),
          orderBy('completedAt', 'asc'),
          limit(50)
        );
      } else {
        lbQuery = query(
          lbCollection,
          where('status', '==', 'completed'),
          orderBy('score', 'desc'),
          orderBy('completedAt', 'asc'),
          limit(50)
        );
      }

      const querySnapshot = await getDocs(lbQuery);
      const records = [];
      querySnapshot.forEach((doc) => {
        records.push({ id: doc.id, ...doc.data() });
      });
      return records;
    } catch (error) {
      console.warn("Firestore fetch failed, querying local fallback data:", error);
    }
  }

  // 2. LocalStorage Fallback Query
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
