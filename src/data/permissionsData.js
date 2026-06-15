// 🛡️ PERMISSIONS OYUNU - GERÇEKÇI VE GÜNCEL UYGULAMALAR (150+)

const PERMISSIONS = {
  CAMERA: 'camera',
  LOCATION: 'location',
  CONTACTS: 'contacts',
  SMS: 'sms',
  MICROPHONE: 'microphone',
  GALLERY: 'gallery',
  STORAGE: 'storage',
  PHONE_CALLS: 'phone_calls',
  CALENDAR: 'calendar',
  INTERNET: 'internet',
  BIOMETRIC: 'biometric',
  DEVICE_SETTINGS: 'device_settings'
};

// ==========================================
// TÜM GERÇEKÇİ UYGULAMALAR (100 APP)
// ==========================================

const ALL_APPS = [
  {
    id: 1,
    name: "Adım Sayar (StepCounter)",
    category: "Sağlık & Fitness",
    icon: "🚶",
    description: "Günlük adımlarınızı sayın, kalori hesaplayın, ilerlemenizi takip edin.",
    permissions: {
      camera: false,
      location: false,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Adım sayıcı sadece hareket sensörü, depolama ve sinkronizasyon (internet) istemelidir.",
    difficulty: "easy"
  },

  {
    id: 2,
    name: "Kamera (Samsung/Apple Camera)",
    category: "Fotoğraf & Video",
    icon: "📷",
    description: "Fotoğraf çekin, video kaydedin, hızlı modu kullanın.",
    permissions: {
      camera: true,
      location: false,
      contacts: false,
      sms: false,
      microphone: true,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: false,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Kamera uygulaması kamera, mikrofon, galeri ve depolama istemelidir.",
    difficulty: "easy"
  },

  {
    id: 3,
    name: "Calculator+ (Hesap Makinesi+)",
    category: "Araçlar",
    icon: "🧮",
    description: "Gelişmiş hesaplamalar, geçmiş kaydet, grafik modunu kullan.",
    permissions: {
      camera: false,
      location: false,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: false,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Hesap makinesi sadece depolama istemelidir (hesapları kaydetmek için).",
    difficulty: "easy"
  },

  {
    id: 4,
    name: "Döviz Çevirici (CurrencyX)",
    category: "Finans",
    icon: "💱",
    description: "Anlık döviz kurlarını çevirin, grafikleri takip edin.",
    permissions: {
      camera: false,
      location: false,
      contacts: true,
      sms: true,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: false,
    reason: "❌ TEHLİKELİ: Döviz Çevirici neden Rehber ve SMS izni isteyecek? VERİ ÇALMAK İÇİN! REDDET!",
    difficulty: "easy"
  },

  {
    id: 5,
    name: "Spotify (Müzik Akışı)",
    category: "Müzik & Ses",
    icon: "🎧",
    description: "Müzik dinleyin, playlist oluşturun, arkadaş önerilerini görün.",
    permissions: {
      camera: false,
      location: false,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Müzik akışı sadece depolama ve internet istemelidir.",
    difficulty: "easy"
  },

  {
    id: 6,
    name: "Haber Okuyucu (NewsPlus)",
    category: "Haber & Medya",
    icon: "📰",
    description: "En son haberler, kategorilere göre filtreleme, favori kaydet.",
    permissions: {
      camera: false,
      location: false,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Haber uygulaması sadece depolama ve internet istemelidir.",
    difficulty: "easy"
  },

  {
    id: 7,
    name: "Saat & Alarm (Clock Pro)",
    category: "Araçlar",
    icon: "⏰",
    description: "Alarm ayarlayın, dünya saatini görmek, kronometre kullanın.",
    permissions: {
      camera: false,
      location: false,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: true,
      internet: false,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Saat uygulaması depolama ve takvim istemelidir (takvim entegrasyonu).",
    difficulty: "easy"
  },

  {
    id: 8,
    name: "Google Haritalar",
    category: "Navigasyon",
    icon: "🗺️",
    description: "Yolunuzu bulun, trafik bilgisi alın, rota kaydedin.",
    permissions: {
      camera: false,
      location: true,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Navigasyon uygulaması konum, depolama ve internet istemelidir.",
    difficulty: "easy"
  },

  {
    id: 9,
    name: "Hava Durumu (Weather)",
    category: "Araçlar",
    icon: "🌤️",
    description: "Anlık hava durumu, 5 günlük tahmin, uyarılar.",
    permissions: {
      camera: false,
      location: true,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Hava Durumu uygulaması konum (yerel hava), depolama ve internet istemelidir.",
    difficulty: "easy"
  },

  {
    id: 10,
    name: "El Feneri (Flashlight)",
    category: "Araçlar",
    icon: "🔦",
    description: "Telefonunuzu el fenerine çevirin, SOS modu, parlaklık ayarı.",
    permissions: {
      camera: false,
      location: false,
      contacts: true,
      sms: true,
      microphone: false,
      gallery: false,
      storage: false,
      phone_calls: false,
      calendar: false,
      internet: false,
      biometric: false,
      device_settings: false
    },
    isSafe: false,
    reason: "❌ TEHLİKELİ: El feneri hiçbir izin istememeli! Rehber ve SMS istiyorsa çok zararlıdır. KESINLIKLE REDDET!",
    difficulty: "easy"
  },
  {
    id: 11,
    name: "Instagram (Sosyal Medya)",
    category: "Sosyal Medya",
    icon: "📸",
    description: "Fotoğraf paylaş, arkadaşlarla bağlan, hikayeler yarat.",
    permissions: {
      camera: true,
      location: true,
      contacts: true,
      sms: false,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: false,
    reason: "⚠️ TEHLİKELİ: Instagram Kamera ve Galeri istemelidir, ama Konum ve Rehber neden? Veri toplamaya çalışıyor. REDDET!",
    difficulty: "medium"
  },

  {
    id: 12,
    name: "Gmail (E-mail)",
    category: "İletişim",
    icon: "📧",
    description: "E-mail gönder, al, dosya ekle, takvim entegrasyonu.",
    permissions: {
      camera: true,
      location: false,
      contacts: true,
      sms: false,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: true,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Email uygulaması kamera (QR), rehber, galeri, depolama, takvim ve internet istemelidir.",
    difficulty: "medium"
  },

  {
    id: 13,
    name: "Google Drive (Bulut Depolama)",
    category: "Bulut",
    icon: "☁️",
    description: "Dosyalarınızı buluta yükle, paylaş, ortak çalış.",
    permissions: {
      camera: true,
      location: false,
      contacts: true,
      sms: false,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Cloud uygulaması kamera (belge tarama), rehber (paylaş), galeri ve depolama istemelidir.",
    difficulty: "medium"
  },

  {
    id: 14,
    name: "Telegram (Mesajlaşma)",
    category: "İletişim",
    icon: "✈️",
    description: "Mesaj, video çağrı, dosya paylaş, group chat.",
    permissions: {
      camera: true,
      location: true,
      contacts: true,
      sms: false,
      microphone: true,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Telegram kamera, konum, rehber, mikrofon, galeri ve depolama istemelidir (şifreli mesajlaşma).",
    difficulty: "medium"
  },

  {
    id: 15,
    name: "YouTube (Video Akışı)",
    category: "Video",
    icon: "▶️",
    description: "Video izleyin, playlist oluşturun, kanallara abone olun.",
    permissions: {
      camera: false,
      location: false,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Video akışı sadece depolama ve internet istemelidir.",
    difficulty: "medium"
  },

  {
    id: 16,
    name: "Netflix (Film & Dizi)",
    category: "Video",
    icon: "🎬",
    description: "Film ve dizi izleyin, liste oluşturun, indirin.",
    permissions: {
      camera: false,
      location: false,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Netflix depolama, internet ve biyometrik (hızlı giriş) istemelidir.",
    difficulty: "medium"
  },

  {
    id: 17,
    name: "Twitch (Canlı Yayın)",
    category: "Video",
    icon: "🎮",
    description: "Canlı yayın izleyin, yayın yapın, chat'e katılın.",
    permissions: {
      camera: true,
      location: false,
      contacts: false,
      sms: false,
      microphone: true,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Twitch kamera ve mikrofon istemelidir (canlı yayın için). Depolama ve internet de gerekli.",
    difficulty: "medium"
  },

  {
    id: 18,
    name: "Uber (Taksi Uygulaması)",
    category: "Ulaşım",
    icon: "🚕",
    description: "Araba çağır, sürücüyü takip et, ödeme yap.",
    permissions: {
      camera: false,
      location: true,
      contacts: true,
      sms: true,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: true,
      calendar: false,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Taksi uygulaması konum, rehber (acil kişi), SMS (OTP), telefon ve biyometrik istemelidir.",
    difficulty: "medium"
  },

  {
    id: 19,
    name: "Airbnb (Konaklama)",
    category: "Seyahat",
    icon: "🏠",
    description: "Ev ve otel rezerve et, harita görüntüle, ödeme yap.",
    permissions: {
      camera: true,
      location: true,
      contacts: false,
      sms: true,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Konaklama uygulaması kamera, konum, SMS (OTP), galeri ve internet istemelidir.",
    difficulty: "medium"
  },

  {
    id: 20,
    name: "TikTok (Kısa Video)",
    category: "Sosyal Medya",
    icon: "🎵",
    description: "Kısa videolar izleyin, video yapın, yükleyin.",
    permissions: {
      camera: true,
      location: true,
      contacts: true,
      sms: false,
      microphone: true,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: false,
    reason: "⚠️ TEHLİKELİ: TikTok Kamera ve Mikrofon istemelidir, ama Konum ve Rehber neden? Veri toplamaya çalışıyor. REDDET!",
    difficulty: "medium"
  },

  {
    id: 21,
    name: "Snapchat (Mesajlaşma & Video)",
    category: "Sosyal Medya",
    icon: "👻",
    description: "Foto gönder, video chat, hikayeler paylaş.",
    permissions: {
      camera: true,
      location: true,
      contacts: true,
      sms: false,
      microphone: true,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: false,
    reason: "⚠️ TEHLİKELİ: Snapchat video uygulaması rehbere neden erişmek isteyecek? Veri analizi için. REDDET!",
    difficulty: "medium"
  },

  {
    id: 22,
    name: "Pinterest (Ilham Panosu)",
    category: "Sosyal Medya",
    icon: "📌",
    description: "Fikirler kaydet, panolar oluştur, ilham al.",
    permissions: {
      camera: false,
      location: false,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Pinterest galeri ve internet istemelidir. Konum veya rehber istemiyor.",
    difficulty: "medium"
  },

  {
    id: 23,
    name: "Reddit (Forum)",
    category: "Sosyal Medya",
    icon: "🤖",
    description: "Komunitelere katıl, post yap, tartış, upvote ver.",
    permissions: {
      camera: false,
      location: false,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Reddit galeri ve internet istemelidir.",
    difficulty: "medium"
  },

  {
    id: 24,
    name: "Discord (Voice Chat)",
    category: "İletişim",
    icon: "💜",
    description: "Sunucuya katıl, sesli sohbet, video çağrı, mesaj.",
    permissions: {
      camera: true,
      location: false,
      contacts: false,
      sms: false,
      microphone: true,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Discord kamera, mikrofon, galeri ve internet istemelidir (sesli/video sohbet).",
    difficulty: "medium"
  },

  {
    id: 25,
    name: "Linkedin (Profesyonel Network)",
    category: "Profesyonel",
    icon: "💼",
    description: "İş bul, CV yükle, network'ü genişlet, mesaj gönder.",
    permissions: {
      camera: true,
      location: true,
      contacts: true,
      sms: false,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: LinkedIn kamera, konum (iş ilanları), rehber (bağlantıları bulmak), galeri istemelidir.",
    difficulty: "medium"
  },

  {
    id: 26,
    name: "Airbnb Experiences (Seyahat Planlama)",
    category: "Seyahat",
    icon: "🌍",
    description: "Yerel deneyimler bul, rehber tura katıl, yorum yaz.",
    permissions: {
      camera: true,
      location: true,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: true,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Seyahat uygulaması kamera, konum, galeri, depolama ve takvim istemelidir.",
    difficulty: "medium"
  },

  {
    id: 27,
    name: "Booking.com (Otel Rezervasyonu)",
    category: "Seyahat",
    icon: "🏨",
    description: "Otelleri ara, yorum oku, rezerve et, ödeme yap.",
    permissions: {
      camera: false,
      location: true,
      contacts: false,
      sms: true,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Otel uygulaması konum (otel arama), SMS (OTP), biyometrik ve internet istemelidir.",
    difficulty: "medium"
  },

  {
    id: 28,
    name: "Duolingo (Dil Öğrenme)",
    category: "Eğitim",
    icon: "🦉",
    description: "Yeni dil öğren, günlük alıştırma, ilerlemeyi takip et.",
    permissions: {
      camera: false,
      location: false,
      contacts: false,
      sms: false,
      microphone: true,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Dil uygulaması mikrofon (telaffuz), depolama ve internet istemelidir.",
    difficulty: "medium"
  },

  {
    id: 29,
    name: "Zumba Dance Workouts (Fitness)",
    category: "Fitness",
    icon: "💃",
    description: "Zumba egzersizleri yap, video izle, kalori takip et.",
    permissions: {
      camera: true,
      location: false,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: true,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Fitness uygulaması kamera (form kontrolü), depolama, takvim ve internet istemelidir.",
    difficulty: "medium"
  },

  {
    id: 30,
    name: "Goodreads (Kitap Okuyucu)",
    category: "Eğitim",
    icon: "📚",
    description: "Kitap oku, yorum yaz, rafları oluştur, sıralamaları gör.",
    permissions: {
      camera: false,
      location: false,
      contacts: true,
      sms: false,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: false,
    reason: "⚠️ ZARARLIDA: Goodreads rehberinize neden erişmek isteyecek? Kitap okumak için gereksiz. REDDET!",
    difficulty: "medium"
  },

  {
    id: 31,
    name: "Shazam (Şarkı Tanıyıcı)",
    category: "Müzik",
    icon: "🎵",
    description: "Çalan şarkıyı tanı, detayları gör, Spotify'ye ekle.",
    permissions: {
      camera: false,
      location: true,
      contacts: false,
      sms: false,
      microphone: true,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: false,
    reason: "⚠️ ZARARLIDA: Shazam neden konumunuza erişmek isteyecek? Şarkı tanımak için konum gerekmez. REDDET!",
    difficulty: "medium"
  },

  {
    id: 32,
    name: "Viber (Mesajlaşma)",
    category: "İletişim",
    icon: "📞",
    description: "Mesaj gönder, sesli çağrı, video çağrı, grup chat.",
    permissions: {
      camera: true,
      location: false,
      contacts: true,
      sms: false,
      microphone: true,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Viber kamera, rehber, mikrofon, galeri ve internet istemelidir (sesli/video çağrı).",
    difficulty: "medium"
  },

  {
    id: 33,
    name: "Signal (Şifreli Mesajlaşma)",
    category: "İletişim",
    icon: "🔒",
    description: "Güvenli mesaj gönder, sesli çağrı, video çağrı.",
    permissions: {
      camera: true,
      location: false,
      contacts: true,
      sms: false,
      microphone: true,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Signal şifreli mesajlaşma için kamera, rehber, mikrofon ve galeri istemelidir.",
    difficulty: "medium"
  },

  {
    id: 34,
    name: "WeChat (Mesajlaşma & Ödeme)",
    category: "İletişim",
    icon: "💚",
    description: "Mesaj, sesli çağrı, ödeme, transfer, mini app.",
    permissions: {
      camera: true,
      location: true,
      contacts: true,
      sms: false,
      microphone: true,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: false,
    reason: "⚠️ ZARARLIDA: WeChat Konum neden isteyecek? Mesajlaşma ve ödeme için konum gerekmez. Veri toplamaya çalışıyor. REDDET!",
    difficulty: "medium"
  },

  {
    id: 35,
    name: "QR Kod Tarayıcı (QuickScan)",
    category: "Araçlar",
    icon: "📱",
    description: "QR kod tarayın, barkod okuyun, URL açın.",
    permissions: {
      camera: true,
      location: true,
      contacts: true,
      sms: true,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: false,
    reason: "❌ TEHLİKELİ: QR okuyucu sadece Kamera istemelidir! Konum, Rehber ve SMS istiyorsa spyware'dir. REDDET!",
    difficulty: "medium"
  },
  {
    id: 36,
    name: "BeautySnap (Fotoğraf Filtresi)",
    category: "Fotoğraf",
    icon: "✨",
    description: "Harika filtreler, yapay zeka güzelleştirme, makyaj simulatörü.",
    permissions: {
      camera: true,
      location: true,
      contacts: true,
      sms: true,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: false,
    reason: "❌ TEHLİKELİ: Filtre uygulaması sadece Kamera ve Galeri istemelidir! Konum, Rehber ve SMS istiyorsa veri çalmaya çalışıyor. REDDET!",
    difficulty: "hard"
  },

  {
    id: 37,
    name: "FaceApp (Yüz Düzenleyici)",
    category: "Fotoğraf",
    icon: "👤",
    description: "Yüzünüzü düzenleyin, yaş simülasyonu, filtreler.",
    permissions: {
      camera: true,
      location: true,
      contacts: true,
      sms: false,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: false,
    reason: "❌ TEHLİKELİ: FaceApp konum ve rehbere neden erişmek isteyecek? Yüz düzenleme için gerekmez. Veri toplamaya çalışıyor. REDDET!",
    difficulty: "hard"
  },

  {
    id: 38,
    name: "FontStyle (Yazı Tipi Uygulaması)",
    category: "Araçlar",
    icon: "🔤",
    description: "Telefonda güzel yazı tipleri kullan, stil seç, mesajlara uygula.",
    permissions: {
      camera: false,
      location: true,
      contacts: true,
      sms: true,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: false,
    reason: "❌ TEHLİKELİ: Yazı tipi uygulaması hiçbir izin istememeli! Konum, Rehber ve SMS istiyorsa zararlıdır. REDDET!",
    difficulty: "hard"
  },

  {
    id: 39,
    name: "PhoneBoost (Temizlik & Hızlandırma)",
    category: "Sistem",
    icon: "🧹",
    description: "Telefonu hızlandır, çöp dosyaları sil, RAM temizle.",
    permissions: {
      camera: false,
      location: true,
      contacts: true,
      sms: true,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: true
    },
    isSafe: false,
    reason: "❌ TEHLİKELİ: Temizlik uygulaması bu kadar izin isteyemez! Cihaz Ayarlarına erişim çok tehlikelidir. REDDET!",
    difficulty: "hard"
  },

  {
    id: 40,
    name: "BatteryPlus (Batarya Tasarrufu)",
    category: "Sistem",
    icon: "🔋",
    description: "Batarya tasarrufu, arka plan uygulamalarını yönet.",
    permissions: {
      camera: false,
      location: true,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: true
    },
    isSafe: false,
    reason: "❌ TEHLİKELİ: Batarya uygulaması Konum ve Cihaz Ayarlarına neden erişecek? İzleme aracı gibi görünüyor. REDDET!",
    difficulty: "hard"
  },

  {
    id: 41,
    name: "DocumentPro (PDF Okuyucu)",
    category: "Araçlar",
    icon: "📄",
    description: "PDF aç, annot yap, imza ekle, dosya birleştir.",
    permissions: {
      camera: true,
      location: false,
      contacts: true,
      sms: false,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: false,
    reason: "⚠️ ZARARLIDA: PDF okuyucu sadece Galeri ve Depolama istemelidir! Kamera ve Rehber istiyorsa veri çalmaya çalışıyor. REDDET!",
    difficulty: "hard"
  },

  {
    id: 42,
    name: "AppLock (Uygulama Kilidi)",
    category: "Sistem",
    icon: "🔐",
    description: "Uygulamaları parmak izi ile kitle, gizli alan oluştur.",
    permissions: {
      camera: false,
      location: false,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: true,
      device_settings: true
    },
    isSafe: true,
    reason: "✅ GÜVENLI: AppLock biyometrik (parmak izi) ve cihaz ayarlarına ihtiyaç duyabilir (uygulama kilitleme için).",
    difficulty: "hard"
  },

  {
    id: 43,
    name: "NordVPN (VPN Hizmeti)",
    category: "Güvenlik",
    icon: "🛡️",
    description: "Güvenli bağlantı, IP gizle, kamu WiFi'sini koru.",
    permissions: {
      camera: false,
      location: false,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: true
    },
    isSafe: true,
    reason: "✅ GÜVENLI: VPN uygulaması internet trafiğini yönetmek için cihaz ayarlarına ihtiyaç duyabilir.",
    difficulty: "hard"
  },

  {
    id: 44,
    name: "Evernote (Not Tutma)",
    category: "Üretkenlik",
    icon: "📝",
    description: "Notlar tutun, resimler kaydedin, takvim entegrasyonu.",
    permissions: {
      camera: true,
      location: false,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: true,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Not uygulaması kamera, galeri, depolama ve takvim istemelidir.",
    difficulty: "hard"
  },

  {
    id: 45,
    name: "Trello (Proje Yönetimi)",
    category: "Üretkenlik",
    icon: "📊",
    description: "Kartlar oluştur, takvimi yönet, dosya ekle, ortak çalış.",
    permissions: {
      camera: true,
      location: false,
      contacts: true,
      sms: false,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: true,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Proje yönetimi uygulaması kamera, rehber, galeri, depolama ve takvim istemelidir.",
    difficulty: "hard"
  },

  {
    id: 46,
    name: "Slack (İş Mesajlaşması)",
    category: "Üretkenlik",
    icon: "💬",
    description: "Takımınız ile iletişim kurun, dosya paylaş, çağrı yap.",
    permissions: {
      camera: true,
      location: false,
      contacts: false,
      sms: false,
      microphone: true,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: İş mesajlaşması kamera, mikrofon, galeri ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 47,
    name: "Asana (Görev Yönetimi)",
    category: "Üretkenlik",
    icon: "✓",
    description: "Görevler oluştur, takip et, deadline ayarla, işbirliği yap.",
    permissions: {
      camera: false,
      location: false,
      contacts: true,
      sms: false,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: true,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Görev yönetimi rehber ve takvim istemelidir (takım yönetimi ve reminders için).",
    difficulty: "hard"
  },

  {
    id: 48,
    name: "Notion (Not & Veritabanı)",
    category: "Üretkenlik",
    icon: "📚",
    description: "Not tutun, veritabanı oluştur, ekip ile işbirliği yapın.",
    permissions: {
      camera: true,
      location: false,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Notion kamera ve galeri istemelidir (belge tarama ve eklemeler için).",
    difficulty: "hard"
  },

  {
    id: 49,
    name: "Canva (Tasarım Uygulaması)",
    category: "Tasarım",
    icon: "🎨",
    description: "Poster, sosyal medya, sunusu tasarla, şablon kullan.",
    permissions: {
      camera: true,
      location: false,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Tasarım uygulaması kamera, galeri ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 50,
    name: "Photoshop Express (Fotoğraf Editörü)",
    category: "Fotoğraf",
    icon: "🖼️",
    description: "Fotoğraf düzenle, efekt ekle, filtreler uygula, paylaş.",
    permissions: {
      camera: true,
      location: false,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Foto editörü kamera, galeri ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 51,
    name: "Lightroom Mobile (Fotoğraf İşlemci)",
    category: "Fotoğraf",
    icon: "🎞️",
    description: "Profesyonel fotoğraf işleme, filtreler, presets.",
    permissions: {
      camera: true,
      location: false,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Foto işlemci kamera, galeri ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 52,
    name: "Adobe Illustrator (Grafik Tasarım)",
    category: "Tasarım",
    icon: "✏️",
    description: "Vektör grafikler çiz, arka plan kaldır, şekiller oluştur.",
    permissions: {
      camera: false,
      location: false,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Grafik tasarımı galeri ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 53,
    name: "CapCut (Video Editörü)",
    category: "Video",
    icon: "🎬",
    description: "Video düzenle, efekt ekle, müzik ekle, hayran videoları oluştur.",
    permissions: {
      camera: true,
      location: false,
      contacts: false,
      sms: false,
      microphone: true,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Video editörü kamera, mikrofon, galeri ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 54,
    name: "InShot (Video Editörü & Kolaj)",
    category: "Video",
    icon: "✂️",
    description: "Videolar kesin, müzik ekle, kolaj oluştur, efektler uygula.",
    permissions: {
      camera: true,
      location: false,
      contacts: false,
      sms: false,
      microphone: true,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Video editörü kamera, mikrofon, galeri ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 55,
    name: "Grammarly (Yazım Denetimi)",
    category: "Araçlar",
    icon: "✍️",
    description: "Yazım hatalarını kontrol et, stilini geliştir, öneriler al.",
    permissions: {
      camera: false,
      location: false,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Yazım denetimi uygulaması sadece depolama ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 56,
    name: "Microsoft Office (Word, Excel, PowerPoint)",
    category: "Üretkenlik",
    icon: "📄",
    description: "Belgeler, elektronik tablolar ve sunular oluştur, işbirliği yap.",
    permissions: {
      camera: true,
      location: false,
      contacts: true,
      sms: false,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: true,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Office uygulamaları kamera, rehber, galeri, depolama, takvim ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 57,
    name: "Google Workspace (Docs, Sheets, Slides)",
    category: "Üretkenlik",
    icon: "📊",
    description: "Belgeler, elektronik tablolar, sunular oluştur, paylaş.",
    permissions: {
      camera: true,
      location: false,
      contacts: true,
      sms: false,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: true,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Google Workspace uygulamaları kamera, rehber, galeri, depolama, takvim ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 58,
    name: "Zoom (Video Konferans)",
    category: "İletişim",
    icon: "🎥",
    description: "Video toplantılar, ekran paylaş, grup görüşmeleri.",
    permissions: {
      camera: true,
      location: false,
      contacts: true,
      sms: false,
      microphone: true,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: true,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Video konferans uygulaması kamera, rehber, mikrofon, galeri, depolama, takvim ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 59,
    name: "Microsoft Teams (İş Mesajlaşması)",
    category: "İletişim",
    icon: "👥",
    description: "Takım mesajlaşması, video çağrı, dosya paylaş, işbirliği.",
    permissions: {
      camera: true,
      location: false,
      contacts: false,
      sms: false,
      microphone: true,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: true,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Teams uygulaması kamera, mikrofon, galeri, depolama, takvim ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 60,
    name: "Google Meet (Video Konferans)",
    category: "İletişim",
    icon: "📞",
    description: "Video toplantılar, ekran paylaş, canlı captions.",
    permissions: {
      camera: true,
      location: false,
      contacts: false,
      sms: false,
      microphone: true,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: true,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Video konferans uygulaması kamera, mikrofon, depolama, takvim ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 61,
    name: "1Password (Şifre Yöneticisi)",
    category: "Güvenlik",
    icon: "🔑",
    description: "Şifreleri güvenli tutun, otomatik doldur, belgeler kaydet.",
    permissions: {
      camera: true,
      location: false,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Şifre yöneticisi kamera (QR tarama), biyometrik ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 62,
    name: "LastPass (Şifre Yöneticisi)",
    category: "Güvenlik",
    icon: "🔐",
    description: "Şifreleri yönet, otomatik doldur, güvenli notlar tutun.",
    permissions: {
      camera: true,
      location: false,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Şifre yöneticisi kamera, biyometrik ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 63,
    name: "Bitwarden (Şifre Yöneticisi)",
    category: "Güvenlik",
    icon: "🛡️",
    description: "Şifreleri şifrele ve depo, otomatik doldur, paylaş.",
    permissions: {
      camera: true,
      location: false,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Şifre yöneticisi kamera, biyometrik ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 64,
    name: "Mullvad VPN (VPN Hizmeti)",
    category: "Güvenlik",
    icon: "🌐",
    description: "Gizli VPN bağlantısı, IP gizle, hızlı ve güvenli.",
    permissions: {
      camera: false,
      location: false,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: true
    },
    isSafe: true,
    reason: "✅ GÜVENLI: VPN uygulaması internet trafiğini yönetmek için cihaz ayarlarına ihtiyaç duyabilir.",
    difficulty: "hard"
  },

  {
    id: 65,
    name: "Avast (Antivirus)",
    category: "Güvenlik",
    icon: "🛡️",
    description: "Telefonun virüs taraması, şüpheli uygulamaları tespit et.",
    permissions: {
      camera: false,
      location: false,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: true
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Antivirus uygulaması cihazı taramak için cihaz ayarlarına ihtiyaç duyabilir.",
    difficulty: "hard"
  },
  {
    id: 66,
    name: "Garanti Bankası (Bankacılık)",
    category: "Finans",
    icon: "🏦",
    description: "Transfer, fatura öde, kredi kartı, yatırım, kripto işlemleri.",
    permissions: {
      camera: true,
      location: true,
      contacts: true,
      sms: true,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Bankacılık uygulaması kamera (belge/QR), konum (şube), rehber (transfer), SMS (OTP), galeri, biyometrik ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 67,
    name: "Akbank (Bankacılık)",
    category: "Finans",
    icon: "🏦",
    description: "Hesap yönetimi, transfer, ödeme, yatırım ve borsa.",
    permissions: {
      camera: true,
      location: true,
      contacts: true,
      sms: true,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Bankacılık uygulaması tüm bu izinleri istemelidir (güvenlik ve işlevsellik için).",
    difficulty: "hard"
  },

  {
    id: 68,
    name: "Türkiye İş Bankası (Bankacılık)",
    category: "Finans",
    icon: "🏦",
    description: "Para transferi, fatura ödeme, kredi, sigortacılık.",
    permissions: {
      camera: true,
      location: true,
      contacts: true,
      sms: true,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Bankacılık uygulaması tüm bu izinleri istemelidir.",
    difficulty: "hard"
  },

  {
    id: 69,
    name: "Trendyol (E-Ticaret)",
    category: "Alışveriş",
    icon: "🛍️",
    description: "Ürün ara, satın al, ödeme yap, takip et, geri iade et.",
    permissions: {
      camera: true,
      location: true,
      contacts: true,
      sms: true,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: E-ticaret uygulaması kamera, konum, rehber, SMS, galeri, biyometrik ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 70,
    name: "Amazon (E-Ticaret)",
    category: "Alışveriş",
    icon: "🛒",
    description: "Ürün satın al, inceleme oku, sepet yönet, ödeme yap.",
    permissions: {
      camera: true,
      location: true,
      contacts: true,
      sms: true,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: E-ticaret uygulaması tüm bu izinleri istemelidir.",
    difficulty: "hard"
  },

  {
    id: 71,
    name: "eBay (E-Ticaret)",
    category: "Alışveriş",
    icon: "📦",
    description: "Müzayedede satıcı ve alıcı olmak, ödeme yap, takip et.",
    permissions: {
      camera: true,
      location: true,
      contacts: false,
      sms: true,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: E-ticaret uygulaması kamera, konum, SMS, galeri, biyometrik ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 72,
    name: "Apple Pay / Google Pay (Ödeme)",
    category: "Finans",
    icon: "💳",
    description: "NFC ile ödeme yap, kontaksız satın al, kart yönet.",
    permissions: {
      camera: true,
      location: false,
      contacts: false,
      sms: true,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Ödeme uygulaması kamera (QR), SMS (OTP), biyometrik ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 73,
    name: "Turkcell Cüzdan (Ödeme)",
    category: "Finans",
    icon: "📱",
    description: "Mobil ödeme, para gönder, HES kodu göster, fatura öde.",
    permissions: {
      camera: true,
      location: true,
      contacts: true,
      sms: true,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: true,
      calendar: false,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Fintech uygulaması konum, rehber, SMS, telefon ve biyometrik istemelidir (HES ve muhasebesi).",
    difficulty: "hard"
  },

  {
    id: 74,
    name: "Turkcell Mobil İşlemler (Telecom)",
    category: "Telecom",
    icon: "📞",
    description: "Fatura izle, paket satın al, teknik destek, cihaz yönetimi.",
    permissions: {
      camera: false,
      location: true,
      contacts: false,
      sms: true,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: true,
      calendar: false,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Telecom uygulaması konum (teknisyen), SMS, telefon, biyometrik ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 75,
    name: "Vodafone Mobile (Telecom)",
    category: "Telecom",
    icon: "📱",
    description: "Ülke içinde ve dış hat yönetimi, ödeme, teknik destek.",
    permissions: {
      camera: false,
      location: true,
      contacts: false,
      sms: true,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: true,
      calendar: false,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Telecom uygulaması konum, SMS, telefon, biyometrik ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 76,
    name: "Türk Telekom (Telecom)",
    category: "Telecom",
    icon: "📡",
    description: "Hat yönetimi, ödeme, şikayetler, konum servisleri.",
    permissions: {
      camera: false,
      location: true,
      contacts: false,
      sms: true,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: true,
      calendar: false,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Telecom uygulaması konum, SMS, telefon, biyometrik ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 77,
    name: "WhatsApp (Mesajlaşma)",
    category: "İletişim",
    icon: "💬",
    description: "Metin mesaj, arama, video çağrı, grup chat, durum.",
    permissions: {
      camera: true,
      location: true,
      contacts: true,
      sms: false,
      microphone: true,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: WhatsApp kamera, konum, rehber, mikrofon, galeri ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 78,
    name: "Facebook Messenger (Mesajlaşma)",
    category: "İletişim",
    icon: "💙",
    description: "Mesaj gönder, arama yap, grup chat, ödeme transferi.",
    permissions: {
      camera: true,
      location: true,
      contacts: true,
      sms: false,
      microphone: true,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: false,
    reason: "⚠️ ZARARLIDA: Facebook Messenger konum ve rehbere neden bu kadar erişmek isteyecek? Veri toplamaya çalışıyor. REDDET!",
    difficulty: "hard"
  },

  {
    id: 79,
    name: "Facebook (Sosyal Medya)",
    category: "Sosyal Medya",
    icon: "f",
    description: "Paylaşım yap, arkadaş bul, grup katıl, olayları takip et.",
    permissions: {
      camera: true,
      location: true,
      contacts: true,
      sms: false,
      microphone: true,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: true,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: false,
    reason: "⚠️ ZARARLIDA: Facebook çok fazla izin istiyor - konum, rehber, takvim, etc. Agresif veri toplama yapmaya çalışıyor. REDDET!",
    difficulty: "hard"
  },

  {
    id: 80,
    name: "Twitter / X (Sosyal Medya)",
    category: "Sosyal Medya",
    icon: "𝕏",
    description: "Tweet yap, beğen, takip et, trendleri görmek, mesaj gönder.",
    permissions: {
      camera: true,
      location: true,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: false,
    reason: "⚠️ ZARARLIDA: Twitter konum neden isteyecek? Tweet atmak için konum gerekmez. Veri toplamaya çalışıyor. REDDET!",
    difficulty: "hard"
  },

  {
    id: 81,
    name: "Uber Eats (Yemek Sipariş)",
    category: "Yiyecek",
    icon: "🍽️",
    description: "Yemek sipariş et, restoran gözat, ödeme yap, takip et.",
    permissions: {
      camera: false,
      location: true,
      contacts: true,
      sms: true,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Yemek sipariş uygulaması konum, rehber, SMS, biyometrik ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 82,
    name: "Getir (Yemek & Market Sipariş)",
    category: "Yiyecek",
    icon: "🛴",
    description: "Yemek ve market sipariş et, hızlı teslimat, takip et.",
    permissions: {
      camera: false,
      location: true,
      contacts: true,
      sms: true,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Sipariş uygulaması konum, rehber, SMS, biyometrik ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 83,
    name: "Yemeksepeti (Yemek Sipariş)",
    category: "Yiyecek",
    icon: "🥘",
    description: "Restoranları gözat, yemek sipariş et, ödeme yap, takip et.",
    permissions: {
      camera: true,
      location: true,
      contacts: true,
      sms: true,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Yemek uygulaması kamera, konum, rehber, SMS, biyometrik ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 84,
    name: "Airbnb (Konaklama)",
    category: "Seyahat",
    icon: "🏠",
    description: "Ev ve otel ara, ayırtma, ödeme yap, yorum yaz.",
    permissions: {
      camera: true,
      location: true,
      contacts: false,
      sms: true,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: true,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Konaklama uygulaması kamera, konum, SMS, galeri, depolama, takvim ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 85,
    name: "Booking.com (Otel Rezervasyonu)",
    category: "Seyahat",
    icon: "🏨",
    description: "Otelleri ara, yorum oku, ayırma, ödeme yap.",
    permissions: {
      camera: false,
      location: true,
      contacts: false,
      sms: true,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: true,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Otel uygulaması konum, SMS, depolama, takvim, biyometrik ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 86,
    name: "Google Maps (Harita & Navigasyon)",
    category: "Navigasyon",
    icon: "🗺️",
    description: "Konum bul, rota al, trafik bilgisi, cevap ara.",
    permissions: {
      camera: true,
      location: true,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Harita uygulaması kamera, konum, depolama ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 87,
    name: "Yandex Maps (Harita & Navigasyon)",
    category: "Navigasyon",
    icon: "🗺️",
    description: "Konum bul, rota al, trafik bilgisi, cevap ara.",
    permissions: {
      camera: true,
      location: true,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Harita uygulaması kamera, konum, depolama ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 88,
    name: "Apple Maps (Harita & Navigasyon)",
    category: "Navigasyon",
    icon: "🗺️",
    description: "Konum bul, rota al, trafik bilgisi, cevap ara.",
    permissions: {
      camera: true,
      location: true,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Harita uygulaması kamera, konum, depolama ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 89,
    name: "OpenWeather (Hava Durumu API)",
    category: "Araçlar",
    icon: "🌤️",
    description: "Anlık hava durumu, uyarılar, 14 günlük tahmin.",
    permissions: {
      camera: false,
      location: true,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Hava durumu uygulaması konum, depolama ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 90,
    name: "Fitbit (Fitness Takip)",
    category: "Sağlık & Fitness",
    icon: "⌚",
    description: "Egzersiz takip et, kalp atışını ölç, uykunuzu izle.",
    permissions: {
      camera: false,
      location: true,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Fitness uygulaması konum (GPS), depolama ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 91,
    name: "Strava (Fitness Sosyal Medya)",
    category: "Sağlık & Fitness",
    icon: "🚴",
    description: "Egzersiz kaydet, aktiviteleri paylaş, arkadaş bul.",
    permissions: {
      camera: false,
      location: true,
      contacts: true,
      sms: false,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Fitness sosyal medya uygulaması konum, rehber, galeri ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 92,
    name: "MyFitnessPal (Beslenme Takip)",
    category: "Sağlık & Fitness",
    icon: "🍎",
    description: "Kalorilerinizi takip et, beslenme hedeflerinizi belirle.",
    permissions: {
      camera: true,
      location: false,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Beslenme uygulaması kamera (besin tanıma), galeri ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 93,
    name: "MyMediHealth (Sağlık Kaydı)",
    category: "Sağlık",
    icon: "🏥",
    description: "Sağlık kayıtlarını sakla, doktor ziyaretini takip et.",
    permissions: {
      camera: true,
      location: false,
      contacts: false,
      sms: false,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: true,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Sağlık uygulaması kamera, galeri, depolama, takvim, biyometrik ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 94,
    name: "DocuSign (E-İmza)",
    category: "Araçlar",
    icon: "✍️",
    description: "Belgeleri elektronik olarak imzala, gönderi takip et.",
    permissions: {
      camera: true,
      location: false,
      contacts: true,
      sms: false,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: E-İmza uygulaması kamera, rehber, galeri ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 95,
    name: "Adobe Sign (E-İmza)",
    category: "Araçlar",
    icon: "📝",
    description: "Belgeleri dijital imzala, imza transferi, dokuman yönetimi.",
    permissions: {
      camera: true,
      location: false,
      contacts: true,
      sms: false,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: false,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: E-İmza uygulaması kamera, rehber, galeri ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 96,
    name: "Robinhood (Borsa & Yatırım)",
    category: "Finans",
    icon: "📈",
    description: "Hisse alım satımı, kripto işlemleri, portföy yönetimi.",
    permissions: {
      camera: true,
      location: true,
      contacts: false,
      sms: true,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Yatırım uygulaması kamera, konum, SMS, biyometrik ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 97,
    name: "Coinbase (Kripto Borsası)",
    category: "Finans",
    icon: "₿",
    description: "Bitcoin ve kripto satın al, sat, transfer, depo.",
    permissions: {
      camera: true,
      location: true,
      contacts: false,
      sms: true,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Kripto uygulaması kamera, konum, SMS, biyometrik ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 98,
    name: "Binance (Kripto Borsası)",
    category: "Finans",
    icon: "🪙",
    description: "Kripto alım satımı, futures, margin işlemleri.",
    permissions: {
      camera: true,
      location: true,
      contacts: false,
      sms: true,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Kripto uygulaması kamera, konum, SMS, biyometrik ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 99,
    name: "Wise (Para Transferi)",
    category: "Finans",
    icon: "💸",
    description: "Uluslararası para transferi, iki para cüzdan, düşük ücretler.",
    permissions: {
      camera: true,
      location: true,
      contacts: true,
      sms: true,
      microphone: false,
      gallery: false,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Para transferi uygulaması kamera, konum, rehber, SMS, biyometrik ve internet istemelidir.",
    difficulty: "hard"
  },

  {
    id: 100,
    name: "Revolut (Fintech Bankacılık)",
    category: "Finans",
    icon: "💳",
    description: "Dijital banka, para transferi, kripto, yatırım, sigorta.",
    permissions: {
      camera: true,
      location: true,
      contacts: true,
      sms: true,
      microphone: false,
      gallery: true,
      storage: true,
      phone_calls: false,
      calendar: false,
      internet: true,
      biometric: true,
      device_settings: false
    },
    isSafe: true,
    reason: "✅ GÜVENLI: Fintech uygulaması kamera, konum, rehber, SMS, galeri, biyometrik ve internet istemelidir.",
    difficulty: "hard"
  }
];

// ==========================================
// OYUN FONKSİYONLARI
// ==========================================

/**
 * Kullanıcının kararını kontrol et
 */
function checkDecision(app, userDecision) {
  const isCorrect = (userDecision === true && app.isSafe) || 
                    (userDecision === false && !app.isSafe);
  
  return {
    correct: isCorrect,
    feedback: app.reason,
    points: isCorrect ? 10 : -5
  };
}

/**
 * Rastgele uygulamalar getir
 */
function getRandomApps(count = 15) {
  return [...ALL_APPS]
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
}

/**
 * İzinlerin risk seviyesini hesapla
 */
function evaluatePermissionRisk(permissions) {
  let riskScore = 0;
  
  if (permissions.sms) riskScore += 3;
  if (permissions.contacts) riskScore += 2;
  if (permissions.phone_calls) riskScore += 2;
  if (permissions.device_settings) riskScore += 3;
  if (permissions.location) riskScore += 1;
  if (permissions.camera) riskScore += 1;
  
  if (riskScore >= 5) return 'high';
  if (riskScore >= 2) return 'medium';
  return 'low';
}

// ==========================================
// EXPORT
// ==========================================

export {
  PERMISSIONS,
  ALL_APPS,
  checkDecision,
  getRandomApps,
  evaluatePermissionRisk
};
