let audioCtx = null;

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const resumeAudio = () => {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      window.removeEventListener('click', resumeAudio);
      window.removeEventListener('keydown', resumeAudio);
    };
    window.addEventListener('click', resumeAudio);
    window.addEventListener('keydown', resumeAudio);
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
};

let bgmOscillators = [];
let bgmGainNode = null;
let bgmTimeout = null;
let isBgmPlaying = false;

const bgmNotes = [
    // --- BÖLÜM 1: Giriş (Sakin ve Nötr) ---
    { f: 293.66, d: 0.3 }, // D4
    { f: 349.23, d: 0.3 }, // F4
    { f: 440.00, d: 0.6 }, // A4
    { f: 293.66, d: 0.3 }, // D4
    { f: 349.23, d: 0.3 }, // F4
    { f: 523.25, d: 0.6 }, // C5

    // --- BÖLÜM 2: Dengeli İniş ---
    { f: 293.66, d: 0.3 }, // D4
    { f: 349.23, d: 0.3 }, // F4
    { f: 440.00, d: 0.3 }, // A4
    { f: 392.00, d: 0.3 }, // G4
    { f: 349.23, d: 0.3 }, // F4
    { f: 329.63, d: 0.3 }, // E4
    { f: 293.66, d: 0.6 }, // D4

    // --- BÖLÜM 3: Daha Kalın Notalarla Derinlik (Yeni Bölüm) ---
    { f: 220.00, d: 0.3 }, // A3 (Daha tok bir ses)
    { f: 261.63, d: 0.3 }, // C4
    { f: 293.66, d: 0.6 }, // D4
    { f: 220.00, d: 0.3 }, // A3
    { f: 233.08, d: 0.3 }, // Bb3
    { f: 293.66, d: 0.6 }, // D4

    // --- BÖLÜM 4: Ufak Bir Gerilim ---
    { f: 466.16, d: 0.3 }, // Bb4 
    { f: 440.00, d: 0.3 }, // A4
    { f: 349.23, d: 0.6 }, // F4
    { f: 466.16, d: 0.3 }, // Bb4
    { f: 440.00, d: 0.3 }, // A4
    { f: 523.25, d: 0.6 }, // C5

    // --- BÖLÜM 5: Nefes Alma Payı (Uzun Bekleyiş) ---
    { f: 440.00, d: 0.6 }, // A4
    { f: 349.23, d: 0.6 }, // F4
    { f: 293.66, d: 0.9 }, // D4 (Burada melodi biraz duraksıyor)

    // --- BÖLÜM 6: Boşluk Hissi (Aralıklı ve Yüksek) ---
    { f: 293.66, d: 0.4 }, // D4
    { f: 440.00, d: 0.4 }, // A4
    { f: 587.33, d: 0.8 }, // D5 (Hafif bir yankı/uzaklık hissi)
    { f: 523.25, d: 0.4 }, // C5
    { f: 440.00, d: 0.4 }, // A4
    { f: 349.23, d: 0.8 }, // F4

    // --- BÖLÜM 7: Yavaşça Sönümlenme ---
    { f: 392.00, d: 0.3 }, // G4
    { f: 349.23, d: 0.3 }, // F4
    { f: 329.63, d: 0.3 }, // E4
    { f: 261.63, d: 0.3 }, // C4
    { f: 293.66, d: 0.9 }, // D4

    // --- BÖLÜM 8: Döngüye Hazırlık (Final) ---
    { f: 220.00, d: 0.6 }, // A3
    { f: 261.63, d: 0.6 }, // C4
    { f: 293.66, d: 1.5 }  // D4 (Çok uzun bir bitiş, başa sarmadan önce ciddi bir sessizlik yaratır)
];
const getActiveTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('safely_active_theme') || 'default';
  }
  return 'default';
};

const arcticBgmNotes = [
    // --- BÖLÜM 1: Sistem Başlatma (Temiz ve Uzun) ---
    { f: 523.25, d: 0.8 }, // C5
    { f: 659.25, d: 0.8 }, // E5

    // --- BÖLÜM 2: Veri Akışı ---
    { f: 783.99, d: 0.4 }, // G5
    { f: 659.25, d: 0.4 }, // E5
    { f: 523.25, d: 0.8 }, // C5

    // --- BÖLÜM 3: Stabilizasyon ---
    { f: 392.00, d: 0.8 }, // G4
    { f: 440.00, d: 0.8 }, // A4

    // --- BÖLÜM 4: Analiz ---
    { f: 523.25, d: 0.4 }, // C5
    { f: 587.33, d: 0.4 }, // D5
    { f: 659.25, d: 0.8 }, // E5

    // --- BÖLÜM 5: Derin Tarama (Düşük Frekans) ---
    { f: 329.63, d: 1.2 }, // E4

    // --- BÖLÜM 6: Ağ Senkronizasyonu ---
    { f: 440.00, d: 0.4 }, // A4
    { f: 493.88, d: 0.4 }, // B4
    { f: 523.25, d: 0.8 }, // C5

    // --- BÖUÜM 7: Soğutma (Yavaş İniş) ---
    { f: 440.00, d: 0.6 }, // A4
    { f: 392.00, d: 0.6 }, // G4
    { f: 329.63, d: 1.2 }, // E4

    // --- BÖLÜM 8: Döngü Sonu Bekleyişi (Steril Sessizlik) ---
    { f: 261.63, d: 1.0 }, // C4
    { f: 523.25, d: 2.0 }  // C5 (Çok uzun sustain, döngü başa sarmadan önce derin bir buzlu boşluk)
];

const amberBgmNotes = [
    // --- BÖLÜM 1: İlk Tarama (Ritmik Pulse) ---
    { f: 261.63, d: 0.2 }, // C4
    { f: 261.63, d: 0.2 }, // C4
    { f: 261.63, d: 0.4 }, // C4 (Uzun)

    // --- BÖLÜM 2: Radar Yükselişi ---
    { f: 311.13, d: 0.2 }, // Eb4
    { f: 311.13, d: 0.2 }, // Eb4
    { f: 311.13, d: 0.4 }, // Eb4 (Uzun)

    // --- BÖLÜM 3: Tehdit Algılama Aşaması ---
    { f: 349.23, d: 0.2 }, // F4
    { f: 349.23, d: 0.2 }, // F4
    { f: 349.23, d: 0.4 }, // F4 (Uzun)

    // --- BÖLÜM 4: Sistem Kontrolü (Hızlı İniş) ---
    { f: 311.13, d: 0.4 }, // Eb4
    { f: 261.63, d: 0.4 }, // C4

    // --- BÖLÜM 5: Derin Tarama (Daha Kalın Pulse) ---
    { f: 196.00, d: 0.2 }, // G3
    { f: 196.00, d: 0.2 }, // G3
    { f: 196.00, d: 0.4 }, // G3 (Uzun)

    // --- BÖLÜM 6: Tansiyon Artışı ---
    { f: 392.00, d: 0.2 }, // G4
    { f: 392.00, d: 0.2 }, // G4
    { f: 392.00, d: 0.4 }, // G4 (Uzun)

    // --- BÖLÜM 7: Alarm Bekleyişi ---
    { f: 349.23, d: 0.4 }, // F4
    { f: 311.13, d: 0.4 }, // Eb4

    // --- BÖLÜM 8: Döngü Başına Dönüş (Nefes Alma) ---
    { f: 261.63, d: 0.2 }, // C4
    { f: 261.63, d: 0.8 }  // C4 (Başa sarmadan önce uzun bir bekleyiş)
];

const matrixBgmNotes = [
    // --- BÖLÜM 1: Derin Sunucu Uğultusu ---
    { f: 130.81, d: 0.6 }, // C3 (Kalın ve tok bir başlangıç)
    { f: 0, d: 0.2 },      // Kısa es

    // --- BÖLÜM 2: Veri İşleme ---
    { f: 155.56, d: 0.3 }, // Eb3
    { f: 130.81, d: 0.4 }, // C3
    { f: 0, d: 0.3 },

    // --- BÖLÜM 3: Terminal Taraması ---
    { f: 196.00, d: 0.4 }, // G3
    { f: 0, d: 0.2 },
    { f: 155.56, d: 0.4 }, // Eb3
    { f: 0, d: 0.4 },

    // --- BÖLÜM 4: Ana Sistem / Kasa Sesi ---
    { f: 98.00, d: 1.0 },  // G2 (Çok kalın, adeta bir fan uğultusu veya elektrik akımı gibi)
    { f: 0, d: 0.2 },

    // --- BÖLÜM 5: Çözümleme ---
    { f: 130.81, d: 0.4 }, // C3
    { f: 196.00, d: 0.4 }, // G3
    { f: 0, d: 0.4 },

    // --- BÖLÜM 6: Döngü Sonu Derin Boşluk ---
    { f: 130.81, d: 0.8 }, // C3
    { f: 0, d: 1.5 }       // Sessizlik (Komut satırı imleci yanıp sönüyor...)
];

const oceanBgmNotes = [
    // --- BÖLÜM 1: Dalga Yükselişi ---
    { f: 261.63, d: 0.6 }, // C4
    { f: 329.63, d: 0.6 }, // E4

    // --- BÖLÜM 2: Akış ---
    { f: 392.00, d: 0.6 }, // G4
    { f: 329.63, d: 0.6 }, // E4

    // --- BÖLÜM 3: Ferahlık ---
    { f: 440.00, d: 0.6 }, // A4
    { f: 523.25, d: 0.6 }, // C5

    // --- BÖLÜM 4: Yumuşak İniş ---
    { f: 392.00, d: 0.6 }, // G4
    { f: 329.63, d: 0.6 }, // E4

    // --- BÖLÜM 5: Sakinlik ---
    { f: 349.23, d: 0.6 }, // F4
    { f: 440.00, d: 0.6 }, // A4

    // --- BÖLÜM 6: Dönüş ---
    { f: 392.00, d: 0.6 }, // G4
    { f: 349.23, d: 0.6 }, // F4

    // --- BÖLÜM 7: Çözülme ---
    { f: 329.63, d: 0.8 }, // E4
    { f: 293.66, d: 0.8 }, // D4

    // --- BÖLÜM 8: Nefes (Döngü Sonu) ---
    { f: 261.63, d: 1.2 }, // C4
    { f: 0, d: 0.8 }       // Melodinin tekrarından önce tatlı bir es payı
];

/**
 * Plays a synthesized retro sound effect using Web Audio API.
 * @param {string} type - The sound type ('success' | 'failure' | 'gameover' | 'win')
 * @param {boolean} soundEnabled - Context setting for whether SFX is enabled
 * @param {number} volumeVal - Volume slider value (0 to 100)
 */
export const playSynthSound = (type, soundEnabled = true, volumeVal) => {
  // If the second parameter is a number, we treat it as volumeVal, and default soundEnabled to true
  if (typeof soundEnabled === 'number') {
    volumeVal = soundEnabled;
    soundEnabled = true;
  }

  if (volumeVal === undefined) {
    volumeVal = 45; // Default SFX volume level (45%)
  }

  if (!soundEnabled || volumeVal <= 0) return;

  try {
    const ctx = getAudioContext();
    const time = ctx.currentTime;
    const maxGain = 0.4;
    const gainVal = (volumeVal / 100) * maxGain;

    const theme = getActiveTheme();

    if (theme === 'arctic') {
      if (type === 'success') {
        // ✔️ Sistem Doğrulandı (Triangle: C5 -> E5 -> G5)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';

        osc.frequency.setValueAtTime(523.25, time); // C5
        osc.frequency.setValueAtTime(659.25, time + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, time + 0.2); // G5

        gain.gain.setValueAtTime(gainVal, time);
        gain.gain.setValueAtTime(gainVal, time + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4); // Temiz fade out

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.4);

      } else if (type === 'failure') {
        // ❌ Veri Sızıntısı (Sawtooth: 180Hz -> 140Hz -> 110Hz buz çatlaması hissiyatı)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';

        osc.frequency.setValueAtTime(180, time);
        osc.frequency.linearRampToValueAtTime(140, time + 0.15);
        osc.frequency.linearRampToValueAtTime(110, time + 0.3);

        gain.gain.setValueAtTime(gainVal, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.3);

      } else if (type === 'gameover') {
        // ☠️ Sistem Kilitlendi (Sawtooth: Boğuk Downward Descent)
        const notes = [
          { f: 523.25, d: 0.25 }, // C5
          { f: 466.16, d: 0.25 }, // Bb4
          { f: 415.30, d: 0.25 }, // Ab4
          { f: 392.00, d: 0.6 }   // G4
        ];
        let t = time;
        
        notes.forEach((note, index) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          // Boğuk bir ses elde etmek için lowpass filtre ekliyoruz
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          // Notalar indikçe filtre frekansı da düşer, daha boğuklaşır
          filter.frequency.setValueAtTime(800 - (index * 150), t); 

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(note.f, t);
          
          gain.gain.setValueAtTime(gainVal, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + note.d);
          
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start(t);
          osc.stop(t + note.d);
          t += note.d;
        });

      } else if (type === 'win') {
        // 🏆 Sistem Güvenli (Square: C5 -> E5 -> G5 -> C6 Temiz ve Parlak)
        const notes = [
          { f: 523.25, d: 0.15 }, // C5
          { f: 659.25, d: 0.15 }, // E5
          { f: 783.99, d: 0.15 }, // G5
          { f: 1046.50, d: 0.5 }  // C6
        ];
        let t = time;
        
        notes.forEach((note) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(note.f, t);
          
          // Square wave (kare dalga) kulak tırmalayıcı olabileceği için gain biraz daha kısık
          gain.gain.setValueAtTime(gainVal * 0.25, t); 
          gain.gain.exponentialRampToValueAtTime(0.001, t + note.d);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start(t);
          osc.stop(t + note.d);
          t += note.d;
        });
      }
    } else if (theme === 'matrix') {
      if (type === 'success') {
        // ✔️ Terminal OK (Triangle: E5 -> G5 -> B5) - SESİ YÜKSELTİLDİ
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';

        osc.frequency.setValueAtTime(659.25, time); // E5
        osc.frequency.setValueAtTime(783.99, time + 0.1); // G5
        osc.frequency.setValueAtTime(987.77, time + 0.2); // B5

        // Triangle zayıf olduğu için gainVal değerini %70 artırdık (* 1.7)
        gain.gain.setValueAtTime(gainVal * 1.7, time);
        gain.gain.setValueAtTime(gainVal * 1.7, time + 0.28);
        gain.gain.linearRampToValueAtTime(0.001, time + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.3);

      } else if (type === 'failure') {
        // ❌ Glitch & Static (Sawtooth) - VURGU ARTIRILDI
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';

        osc.frequency.setValueAtTime(100, time);
        osc.frequency.exponentialRampToValueAtTime(80, time + 0.1);
        osc.frequency.exponentialRampToValueAtTime(60, time + 0.2);

        // Ana vuruşların şiddeti (* 1.3) ile artırıldı
        gain.gain.setValueAtTime(gainVal * 1.3, time);
        gain.gain.setValueAtTime(0.001, time + 0.05); 
        gain.gain.setValueAtTime(gainVal * 1.3, time + 0.07); 
        gain.gain.setValueAtTime(0.001, time + 0.12); 
        gain.gain.setValueAtTime(gainVal * 1.3, time + 0.15); 
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.35);

      } else if (type === 'gameover') {
        // ☠️ Downward Collapse - DERİNLİK VE SES ARTIRILDI
        const notes = [
          { f: 261.63, d: 0.2 }, // C4
          { f: 207.65, d: 0.2 }, // Ab3
          { f: 174.61, d: 0.6 }  // F3
        ];
        let t = time;
        
        notes.forEach((note, index) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(note.f, t);

          if (index === notes.length - 1) {
              osc.detune.setValueAtTime(0, t);
              osc.detune.linearRampToValueAtTime(-600, t + note.d); 
          }

          // Bas frekanslar zor duyulduğu için gain %40 artırıldı
          gain.gain.setValueAtTime(gainVal * 1.4, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + note.d);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start(t);
          osc.stop(t + note.d);
          t += note.d;
        });

      } else if (type === 'win') {
        // 🏆 Terminal Enter (Square) - KISIKLIK KALDIRILDI
        const notes = [
          { f: 523.25, d: 0.1 }, // C5
          { f: 659.25, d: 0.1 }, // E5
          { f: 783.99, d: 0.1 }, // G5
          { f: 1046.50, d: 0.25} // C6
        ];
        let t = time;
        
        notes.forEach((note) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(note.f, t);
          
          // Önceki versiyonda square dalga kulak tırmalamasın diye 0.2 çarpanı vardı. 
          // Ses az geldiği için bu çarpan 0.6'ya çıkarılarak daha gür bir "Win" sesi elde edildi.
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(gainVal * 0.6, t + 0.01); 
          gain.gain.setValueAtTime(gainVal * 0.6, t + note.d - 0.02); 
          gain.gain.linearRampToValueAtTime(0.001, t + note.d); 
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start(t);
          osc.stop(t + note.d);
          t += note.d;
        });
      }
    } else if (theme === 'ocean') {
      if (type === 'success') {
        // ✔️ Soft Chime (Triangle: C5 -> E5 -> G5)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';

        osc.frequency.setValueAtTime(523.25, time); // C5
        osc.frequency.setValueAtTime(659.25, time + 0.15); // E5
        osc.frequency.setValueAtTime(783.99, time + 0.3); // G5

        // Yumuşak bir giriş (soft attack) ve çıkış (fade out) zili hissi
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(gainVal * 1.2, time + 0.05);
        gain.gain.setValueAtTime(gainVal * 1.2, time + 0.35);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.5);

      } else if (type === 'failure') {
        // ❌ Düşük Şiddetli Uyarı (Sawtooth: 200Hz -> 160Hz -> 120Hz)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        
        // Lowpass filtre: Sawtooth'un o rahatsız edici cızırtısını kesip tok, modern bir uyarı tonu verir
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, time);

        osc.frequency.setValueAtTime(200, time);
        osc.frequency.exponentialRampToValueAtTime(160, time + 0.15);
        osc.frequency.exponentialRampToValueAtTime(120, time + 0.3);

        // Sesi aniden başlatmak yerine yumuşak bir kavisle açıyoruz
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(gainVal * 0.8, time + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.35);

      } else if (type === 'gameover') {
        // ☠️ Yumuşak ve Üzgün Düşüş (Sawtooth: C5 -> Bb4 -> G4 -> E4)
        const notes = [
          { f: 523.25, d: 0.25 }, // C5
          { f: 466.16, d: 0.25 }, // Bb4
          { f: 392.00, d: 0.3 },  // G4
          { f: 329.63, d: 0.6 }   // E4
        ];
        let t = time;
        
        notes.forEach((note, index) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          // Hüzünlü hissiyatı korumak için yine lowpass filtresi uygulandı
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(800 - (index * 100), t);

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(note.f, t);

          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(gainVal * 0.8, t + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, t + note.d);
          
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start(t);
          osc.stop(t + note.d);
          t += note.d;
        });

      } else if (type === 'win') {
        // 🏆 Temiz Zafer Melodisi (Square: C5 -> E5 -> G5 -> C6)
        const notes = [
          { f: 523.25, d: 0.15 }, // C5
          { f: 659.25, d: 0.15 }, // E5
          { f: 783.99, d: 0.15 }, // G5
          { f: 1046.50, d: 0.5 }  // C6
        ];
        let t = time;
        
        notes.forEach((note) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(note.f, t);
          
          // Square dalganın "temiz (clean)" duyulması için patlamasız yumuşak attack
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(gainVal * 0.35, t + 0.02); 
          gain.gain.setValueAtTime(gainVal * 0.35, t + note.d - 0.05); 
          gain.gain.exponentialRampToValueAtTime(0.001, t + note.d); 
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start(t);
          osc.stop(t + note.d);
          t += note.d;
        });
      }
    } else {
      // Default theme sounds
      if (type === 'success') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, time); // C5
        osc.frequency.setValueAtTime(659.25, time + 0.08); // E5
        gain.gain.setValueAtTime(gainVal, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.25);
      } else if (type === 'failure') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, time);
        osc.frequency.linearRampToValueAtTime(100, time + 0.22);
        gain.gain.setValueAtTime(gainVal, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.22);
      } else if (type === 'gameover') {
        const notes = [
          { f: 311.13, d: 0.2 }, // Eb4
          { f: 293.66, d: 0.2 }, // D4
          { f: 277.18, d: 0.2 }, // Db4
          { f: 261.63, d: 0.6 }  // C4
        ];
        let t = time;
        notes.forEach((note) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(note.f, t);
          gain.gain.setValueAtTime(gainVal, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + note.d);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + note.d);
          t += note.d;
        });
      } else if (type === 'win') {
        const notes = [
          { f: 523.25, d: 0.15 }, // C5
          { f: 659.25, d: 0.15 }, // E5
          { f: 783.99, d: 0.15 }, // G5
          { f: 1046.50, d: 0.4 }  // C6
        ];
        let t = time;
        notes.forEach((note) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(note.f, t);
          gain.gain.setValueAtTime(gainVal * 0.3, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + note.d);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + note.d);
          t += note.d;
        });
      }
    }
  } catch (error) {
    console.warn("Web Audio API not supported or blocked by browser policy:", error);
  }
};

export const playBGM = (volumeVal = 15) => {
  if (isBgmPlaying) {
    if (bgmGainNode) {
      bgmGainNode.gain.setTargetAtTime((volumeVal / 100) * 0.15, getAudioContext().currentTime, 0.1);
    }
    return;
  }
  
  isBgmPlaying = true;
  
  try {
    const ctx = getAudioContext();
    bgmGainNode = ctx.createGain();
    bgmGainNode.gain.value = (volumeVal / 100) * 0.15;
    bgmGainNode.connect(ctx.destination);
    
    const scheduleSequence = () => {
      if (!isBgmPlaying) return;
      let t = ctx.currentTime;
      const theme = getActiveTheme();
      let notes = bgmNotes;
      if (theme === 'arctic') {
        notes = arcticBgmNotes;
      } else if (theme === 'amber') {
        notes = amberBgmNotes;
      } else if (theme === 'matrix') {
        notes = matrixBgmNotes;
      } else if (theme === 'ocean') {
        notes = oceanBgmNotes;
      }
      const totalDur = notes.reduce((sum, n) => sum + n.d, 0);

      notes.forEach((note) => {
        // 1. Ana Osilatör (Triangle - Temiz ses)
        const oscTriangle = ctx.createOscillator();
        const gainTriangle = ctx.createGain();
        oscTriangle.type = 'triangle';
        oscTriangle.frequency.setValueAtTime(note.f, t);
        
        if (note.f === 0) {
          gainTriangle.gain.setValueAtTime(0, t);
        } else {
          gainTriangle.gain.setValueAtTime(0, t);
          gainTriangle.gain.linearRampToValueAtTime(1, t + 0.02);
          gainTriangle.gain.setValueAtTime(1, t + note.d - 0.02);
          gainTriangle.gain.linearRampToValueAtTime(0, t + note.d);
        }

        oscTriangle.connect(gainTriangle);
        gainTriangle.connect(bgmGainNode);
        oscTriangle.start(t);
        oscTriangle.stop(t + note.d);
        bgmOscillators.push(oscTriangle);

        // 2. Alt Osilatör (Sadece Amber temasına özel, SOC odasındaki elektronik his için)
        if (theme === 'amber' && note.f !== 0) {
          const oscSquare = ctx.createOscillator();
          const gainSquare = ctx.createGain();
          oscSquare.type = 'square';
          oscSquare.frequency.setValueAtTime(note.f, t);
          
          gainSquare.gain.setValueAtTime(0, t);
          gainSquare.gain.linearRampToValueAtTime(0.1, t + 0.02); 
          gainSquare.gain.setValueAtTime(0.1, t + note.d - 0.02);
          gainSquare.gain.linearRampToValueAtTime(0, t + note.d);

          oscSquare.connect(gainSquare);
          gainSquare.connect(bgmGainNode);
          oscSquare.start(t);
          oscSquare.stop(t + note.d);
          bgmOscillators.push(oscSquare);
        }
        
        t += note.d;
      });
      
      setTimeout(() => {
        // Clean up completed oscillators from tracking array
        const oscCountToSlice = theme === 'amber' ? notes.length * 2 : notes.length;
        bgmOscillators = bgmOscillators.slice(oscCountToSlice);
      }, 5000);
      
      bgmTimeout = setTimeout(scheduleSequence, totalDur * 1000);
    };
    
    scheduleSequence();
    
  } catch (err) {
    console.warn("BGM Error:", err);
  }
};

export const stopBGM = () => {
  isBgmPlaying = false;
  clearTimeout(bgmTimeout);
  if (bgmGainNode) {
    bgmGainNode.gain.setTargetAtTime(0, getAudioContext().currentTime, 0.1);
  }
  bgmOscillators.forEach(osc => {
    try {
      osc.stop(getAudioContext().currentTime + 0.1);
    } catch {
      // ignore
    }
  });
  bgmOscillators = [];
};
