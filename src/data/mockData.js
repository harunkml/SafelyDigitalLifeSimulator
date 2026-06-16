const rawEmails = [
  {
    "id": 101,
    "category": "urgency_email",
    "subject": "Hesabınız 24 Saat İçinde Askıya Alınacak",
    "sender": "Garanti BBVA Güvenlik <guvenlik@garanti-bbva-online.com>",
    "message_preview": "Sayın müşterimiz, hesabınızda olağandışı işlem hareketleri tespit edildi. Hesabınızın güvenliği için 24 saat içinde kimlik doğrulamanızı tamamlamanız gerekmektedir. Aksi takdirde hesabınız geçici olarak askıya alınacaktır.",
    "actual_url": "http://garanti-bbva-online.com/guvenlik/dogrula",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Sahte bankacılık sayfasına müşteri numaranızı ve şifrenizi girerek hesabınız ele geçirildi. Resmi adres garantibbva.com.tr dir",
    "consequence_success": "Resmi Garanti BBVA adresinin 'garantibbva.com.tr' olduğunu fark ederek e-postayı engellediniz."
  },
  {
    "id": 102,
    "category": "urgency_email",
    "subject": "NetfIix Ödemeniz Alınamadı — Üyeliğiniz Duruyor",
    "sender": "NetfIix Türkiye ",
    "message_preview": "Sayın kullanıcımız, bu ayki ödemeniz gerçekleştirilemedi. İzlemeye devam edebilmek için ödeme yönteminizi 6 saat içinde güncellemeniz gerekmektedir.",
    "actual_url": "http://netfIix-destek.com/odeme/guncelle",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Sahte ödeme sayfasına kart bilgilerinizi girerek dolandırıcılara bilgilerinizi kaptırdınız. Gönderici adresindeki harf oyunlarını dikkate almalısın. Adreste netfIix içinde L harfi yerine büyük I harf vardı.",
    "consequence_success": "Gönderici adresindeki 'netfIix' içindeki büyük 'I' harfini fark ederek e-postayı engellediniz."
  },
  {
    "id": 103,
    "category": "urgency_email",
    "subject": "Apple Kimliğiniz Kilitlendi",
    "sender": "Apple Destek ",
    "message_preview": "Apple ID hesabınız güvenlik ihlali nedeniyle kilitlendi. Hesabınızı kurtarmak için 48 saat içinde kimlik doğrulamanızı tamamlayın. Aksi takdirde hesabınız kalıcı olarak silinecektir.",
    "actual_url": "http://apple-id-tr.net/hesap/kurtar",
    "danger_level": "high",
    "expected_action": "reject",
    "consequence_fail": "Apple ID bilgilerinizi sahte siteye girerek tüm iCloud verilerinize ve satın almalarınıza erişim kaybettiniz.Resmi Apple adresi apple.com dur. apple-id-tr.net sahte adrestir.",
    "consequence_success": "Resmi Apple adresinin 'apple.com' olduğunu bilerek 'apple-id-tr.net' adresini şüpheli buldunuz."
  },
  {
    "id": 104,
    "category": "urgency_email",
    "subject": "Turkcell Faturanız Ödenmedi, Hattınız 3 Saat İçinde Kapanıyor",
    "sender": "Turkcell Faturalama ",
    "message_preview": "Ekim ayı faturanız ödenmemiştir. Hattınızın kapatılmaması için faturanızı hemen ödeyin. Gecikme halinde tekrar açılış ücreti tahsil edilecektir.",
    "actual_url": "http://turkcell-bildirim.net/fatura/ode",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Sahte fatura ödeme sayfasına banka kartı bilgilerinizi girerek dolandırıcılara para kaptırdınız. Resmi Turkcell adresi turkcell.com.tr dir. turkcell-bildirim.net sahte adrestir.",
    "consequence_success": "Resmi Turkcell adresinin 'turkcell.com.tr' olduğunu bilerek bu adresi şüpheli buldunuz."
  },
  {
    "id": 105,
    "category": "urgency_email",
    "subject": "Gmail Hesabınız Depolama Dolumu Nedeniyle Silinecek",
    "sender": "Google Depolama ",
    "message_preview": "Google hesabınızın depolama alanı doldu. 12 saat içinde işlem yapılmadığı takdirde e-postalarınız ve Drive dosyalarınız kalıcı olarak silinecektir.",
    "actual_url": "http://google-storage-tr.com/depolama/genislet",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Sahte Google sayfasına giriş bilgilerinizi girerek tüm Google hizmetlerinize erişiminizi kaybettiniz. Resmi Google adresi 'google.com' dur. ‘google-storage-tr.com’ sahte adrestir.",
    "consequence_success": "Resmi Google adresinin 'google.com' olduğunu bilerek 'google-storage-tr.com' adresini şüpheli buldunuz."
  },
  {
    "id": 106,
    "category": "urgency_email",
    "subject": "Akbank Kartınız Dolandırıcılık Nedeniyle Donduruldu",
    "sender": "Akbank Güvenlik ",
    "message_preview": "Akbank kartınızda yetkisiz işlem girişimi tespit edildi. Kartınız geçici olarak dondurulmuştur. İşlemi iptal etmek ve kartınızı yeniden aktifleştirmek için kimliğinizi doğrulayın.",
    "actual_url": "http://akbank-destek.net/kart/aktifles",
    "danger_level": "high",
    "expected_action": "reject",
    "consequence_fail": "Kart bilgilerinizi ve SMS kodunuzu sahte siteye girerek hesabınız tamamen boşaltıldı. Resmi Akbank adresi 'akbank.com.tr' dir. ‘akbank-destek.net’ sahte adrestir ",
    "consequence_success": "Resmi Akbank adresinin 'akbank.com.tr' olduğunu bilerek 'akbank-destek.net' adresini şüpheli buldunuz."
  },
  {
    "id": 107,
    "category": "urgency_email",
    "subject": "Spotify Premium Üyeliğiniz Bu Gece Sona Eriyor",
    "sender": "Spotify ",
    "message_preview": "Premium üyeliğinizin ödemesi bu gece yarısı alınamadı. Müzik kesilmesin diye ödeme bilgilerinizi hemen güncelleyin. 3 saat sonra üyeliğiniz ücretsiz plana düşecektir.",
    "actual_url": "http://spotify-payment-tr.com/premium/yenile",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Sahte Spotify ödeme sayfasına kart bilgilerinizi girerek dolandırıcılara para kaptırdınız. Resmi Spotify adresi 'spotify.com dur. ‘spotify-payment-tr.com’ sahte adrestir.",
    "consequence_success": "Resmi Spotify adresinin 'spotify.com' olduğunu bilerek bu e-postayı şüpheli buldunuz."
  },
  {
    "id": 109,
    "category": "urgency_email",
    "subject": "Microsoft 365 Lisansınız Bugün Sona Eriyor",
    "sender": "Microsoft Lisans ",
    "message_preview": "Şirket Microsoft 365 lisansınızın süresi bu gün dolmaktadır. Hizmetlerinizin kesintisiz devam etmesi için lisansınızı hemen yenileyin. İşlem yapılmazsa Word, Excel ve Outlook erişiminiz kesilecektir.",
    "actual_url": "http://micros0ft-tr.com/lisans/yenile",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Sahte lisans yenileme sayfasına kurumsal bilgilerinizi ve kart numaranızı girerek dolandırıcılara para kaptırdınız. Gönderici adresindeki harf oyunlarını dikkate almalısın. Adreste micros0ft içinde O harfi yerine büyük 0 (sıfır) vardı.",
    "consequence_success": "Gönderici adresindeki 'micros0ft' içindeki '0' (sıfır) rakamını fark ederek e-postayı engellediniz."
  },
  {
    "id": 110,
    "category": "urgency_email",
    "subject": "Şüpheli Giriş: WhatsApp Hesabınız Risk Altında",
    "sender": "WhatsApp Güvenlik ",
    "message_preview": "WhatsApp hesabınıza Hollanda'dan giriş denemesi yapıldı. Hesabınızı hemen kilitleyin. 15 dakika içinde işlem yapılmazsa yetkisiz erişim aktif hale gelecektir.",
    "actual_url": "http://whatsapp-secure-tr.com/hesap/kilitle",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Sahte kilit sayfasında telefon numaranız ve doğrulama kodunuz ele geçirildi. Resmi Whatsapp adresi 'whatsapp.com dur. ‘whatsapp-secure-tr.com’ sahte adrestir. ",
    "consequence_success": "Resmi WhatsApp adresinin 'whatsapp.com' olduğunu bilerek bu e-postayı şüpheli buldunuz."
  },
  {
    "id": 111,
    "category": "urgency_email",
    "subject": "Vodafone: Hattınız Kimlik Doğrulaması Yapılmadığı İçin Kapatılacak",
    "sender": "Vodafone Türkiye ",
    "message_preview": "5G altyapısına geçiş kapsamında tüm kullanıcıların kimlik doğrulaması yapması gerekmektedir. Doğrulamayı tamamlamayanların hatları 48 saat içinde kapatılacaktır.",
    "actual_url": "http://vodafone-kimlik.net/5g/dogrula",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Sahte doğrulama sayfasına TC kimlik numaranızı ve telefon bilgilerinizi girerek bilgileriniz çalındı. Resmi Vodafone adresi 'vodefone.com dur. ‘vodafone-kimlik.net’ sahte adrestir.",
    "consequence_success": "Resmi Vodafone adresinin 'vodafone.com.tr' olduğunu bilerek bu e-postayı şüpheli buldunuz."
  },
  {
    "id": 112,
    "category": "urgency_email",
    "subject": "Trendyol Hesabınız Güvenlik İhlali Nedeniyle Kısıtlandı",
    "sender": "Trendyol Güvenlik ",
    "message_preview": "Trendyol hesabınızda güvenlik ihlali tespit edildi ve alışveriş işlemleriniz geçici olarak kısıtlandı. Hesabınızı normale döndürmek için kimliğinizi doğrulayın.",
    "actual_url": "http://trendyol-destek.net/hesap/dogrula",
    "danger_level": "low",
    "expected_action": "reject",
    "consequence_fail": "Trendyol giriş bilgilerinizi ve kayıtlı kart bilgilerinizi sahte siteye girerek hesabınız ele geçirildi. Resmi Trendyol adresi 'trendyol.com dur. ‘trendyol-destek.net’ sahte adrestir. ",
    "consequence_success": "Resmi Trendyol adresinin 'trendyol.com' olduğunu bilerek 'trendyol-destek.net' adresini şüpheli buldunuz."
  },
  {
    "id": 113,
    "category": "urgency_email",
    "subject": "e-Devlet Şifreniz Süresi Doldu, Erişiminiz Kesilecek",
    "sender": "e-Devlet Kapısı ",
    "message_preview": "e-Devlet şifrenizin geçerlilik süresi dolmuştur. Devlet hizmetlerine erişiminizin kesilmemesi için şifrenizi 24 saat içinde yenilemeniz gerekmektedir.",
    "actual_url": "http://e-devlet-tr.com/sifre/yenile",
    "danger_level": "high",
    "expected_action": "reject",
    "consequence_fail": "Sahte e-Devlet sayfasına TC kimlik numaranızı ve şifrenizi girerek kimliğiniz çalındı. Resmi e-Devlet adresi 'turkiye.gov.tr dir. ‘e-devlet-tr.com’ sahte adrestir. ",
    "consequence_success": "Resmi e-Devlet adresinin 'turkiye.gov.tr' olduğunu bilerek '.gov.tr' yerine '.com' uzantısını şüpheli buldunuz."
  },
  {
    "id": 114,
    "category": "urgency_email",
    "subject": "Amazon Siparişiniz İptal Edilmek Üzere",
    "sender": "Amazon Türkiye ",
    "message_preview": "Son siparişinizin ödemesi onaylanamadı. 2 saat içinde ödeme yönteminizi güncellemezseniz siparişiniz iptal edilecek ve stok garantisi kalkmış olacaktır.",
    "actual_url": "http://amazon-tr-destek.com/siparis/odeme",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Sahte Amazon sayfasına kart bilgilerinizi girerek dolandırıcılara para kaptırdınız. Resmi Amazon Türkiye adresi 'amazon.com.tr dir. ‘amazon-tr-destek.com’ sahte adrestir.",
    "consequence_success": "Resmi Amazon Türkiye adresinin 'amazon.com.tr' olduğunu bilerek 'amazon-tr-destek.com' adresini şüpheli buldunuz."
  },
  {
    "id": 115,
    "category": "urgency_email",
    "subject": "Kredi Kartı Limitiniz Aşıldı — Acil İşlem Gerekiyor",
    "sender": "Yapı Kredi Bankası ",
    "message_preview": "Yapı Kredi kartınızda limit aşımı gerçekleşti. Kartınızın bloke edilmemesi için aşımı kapatmanız gerekmektedir. Hesap detaylarınızı görüntülemek ve ödeme yapmak için tıklayın.",
    "actual_url": "http://yapikredi-online.net/kart/limit-ode",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Sahte banka sayfasına kart bilgilerinizi ve SMS doğrulama kodunuzu girerek hesabınız boşaltıldı. Resmi Yapı Kredi adresi 'yapıkredi.com.tr dir. ‘yapıkredi-online.net’ sahte adrestir. ",
    "consequence_success": "Resmi Yapı Kredi adresinin 'yapikredi.com.tr' olduğunu bilerek 'yapikredi-online.net' adresini şüpheli buldunuz."
  },
  {
    "id": 202,
    "category": "reward_email",
    "subject": "500 TL Migros Alışveriş Çekiniz Hazır",
    "sender": "Migros Müşteri Hizmetleri <hediye@migros-odul.net>",
    "message_preview": "Migros alışverişleriniz sayesinde 500 TL değerinde alışveriş çeki kazandınız. Çekinizi hesabınıza tanımlamak için üyelik bilgilerinizi doğrulayın. Çek 24 saat içinde talep edilmezse iptal olur.",
    "actual_url": "http://migros-odul.net/cek/tanimla",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Sahte doğrulama sayfasına Migros üyelik bilgilerinizi girerek hesabınız ele geçirildi. Resmi Migros adresi 'migros.com.tr dur. ‘migros-odul.net’ sahte adrestir. ",
    "consequence_success": "Resmi Migros adresinin 'migros.com.tr' olduğunu bilerek 'migros-odul.net' adresini şüpheli buldunuz."
  },
  {
    "id": 203,
    "category": "reward_email",
    "subject": "Özel Seçildiniz: 7.500 TL Nakit Ödül Sizi Bekliyor",
    "sender": "Türkiye Dijital Ödül Merkezi <tebrikler@dijital-odul-merkezi.com>",
    "message_preview": "Sistemimizdeki 2 milyon kullanıcı arasından rastgele seçilen 100 kişiden birisiniz. 7.500 TL nakit ödülünüzü almak için IBAN bilgilerinizi ve kimlik fotokopinizi gönderin.",
    "actual_url": "http://dijital-odul-merkezi.com/nakit/talep",
    "danger_level": "high",
    "expected_action": "reject",
    "consequence_fail": "IBAN ve kimlik bilgilerinizi paylaştınız; bu bilgiler sahte banka hesabı açmak için kullanıldı.",
    "consequence_success": "Hiç katılmadığınız bir çekilişten ödül geleceğini mantıksız bularak ve bilinmeyen göndericiye güvenmeyerek e-postayı engellediniz."
  },
  {
    "id": 204,
    "category": "reward_email",
    "subject": "Amazon Prime: 3 Aylık Ücretsiz Üyelik Kazandınız",
    "sender": "Amazon Türkiye <prime-hediye@amazon-prime-tr.net>",
    "message_preview": "Amazon alışverişleriniz nedeniyle size 3 aylık Prime üyeliği hediye ettik. Hediyenizi aktif etmek için aşağıdaki bağlantıya tıklayın ve kart bilgilerinizi doğrulayın.",
    "actual_url": "http://amazon-prime-tr.net/prime/aktif-et",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Sahte aktivasyon sayfasına kart bilgilerinizi girerek aylık abonelik ücreti çekilmeye başlandı. Resmi Amazon adresi 'amazon.com.tr' dir. ‘amazon-prime-tr.net’ sahte adrestir. ",
    "consequence_success": "Resmi Amazon adresinin 'amazon.com.tr' olduğunu bilerek 'amazon-prime-tr.net' adresini şüpheli buldunuz."
  },
  {
    "id": 205,
    "category": "reward_email",
    "subject": "Vodafone Sadakat Ödülü: 2 Ay Ücretsiz Sınırsız İnternet",
    "sender": "Vodafone Türkiye <sadakat@vodafone-kampanya.net>",
    "message_preview": "Vodafone'a olan sadakatinizi ödüllendiriyoruz. 2 aylık sınırsız internet paketi kazandınız. Paketi aktif etmek için hat bilgilerinizi doğrulayın.",
    "actual_url": "http://vodafone-kampanya.net/paket/aktif",
    "danger_level": "low",
    "expected_action": "reject",
    "consequence_fail": "Sahte aktivasyon sayfasına telefon numaranızı ve TC kimliğinizi girerek bilgileriniz çalındı. Resmi Vodafone adresi 'vodafone.com.tr' dir. ‘vodafone-kampanya.net’ sahte adrestir. ",
    "consequence_success": "Resmi Vodafone adresinin 'vodafone.com.tr' olduğunu bilerek 'vodafone-kampanya.net' adresini şüpheli buldunuz."
  },
  {
    "id": 206,
    "category": "reward_email",
    "subject": "Yemeksepeti'nden Sürpriz: 300 TL Kupon Kazandınız",
    "sender": "Yemeksepeti Kampanya <kupon@yemeksepeti-odul.com>",
    "message_preview": "Bu ay en çok sipariş veren kullanıcılar arasındasınız! 300 TL değerinde yemek kuponu kazandınız. Kuponu hesabınıza yüklemek için giriş bilgilerinizi doğrulayın.",
    "actual_url": "http://yemeksepeti-odul.com/kupon/yukle",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Sahte Yemeksepeti sayfasına giriş bilgilerinizi girerek hesabınız ve kayıtlı kartınız ele geçirildi. Resmi Yemeksepeti adresi 'yemeksepeti.com' dur. ‘yemeksepeti-odul.com’ sahte adrestir. ",
    "consequence_success": "Resmi Yemeksepeti adresinin 'yemeksepeti.com' olduğunu bilerek bu e-postayı şüpheli buldunuz."
  },
  {
    "id": 207,
    "category": "reward_email",
    "subject": "Pegasus: İstanbul-Berlin Gidiş-Dönüş Bilet Hediyeniz",
    "sender": "Pegasus Havayolları <bolbol@pegasus-miles.net>",
    "message_preview": "BolBol üyeliğiniz kapsamında İstanbul-Berlin gidiş-dönüş bilet kazandınız. Biletinizi almak için pasaport bilgilerinizi ve iletişim adresinizi doğrulayın. Teklif 48 saat geçerlidir.",
    "actual_url": "http://pegasus-miles.net/bilet/talep",
    "danger_level": "high",
    "expected_action": "reject",
    "consequence_fail": "Pasaport bilgilerinizi ve adresinizi sahte siteye girerek kimlik avı saldırısına maruz kaldınız. Resmi Pegasus adresi 'flypgs.com' dur. ‘pegasus-miles.net’ sahte adrestir. ",
    "consequence_success": "Resmi Pegasus adresinin 'flypgs.com' olduğunu bilerek 'pegasus-miles.net' adresini şüpheli buldunuz."
  },
  {
    "id": 208,
    "category": "reward_email",
    "subject": "İş Bankası: 1.500 TL Cashback Ödülünüz Onaylandı",
    "sender": "Türkiye İş Bankası <cashback@isbank-odul.com>",
    "message_preview": "Bu ay gerçekleştirdiğiniz alışverişler nedeniyle 1.500 TL geri ödeme hakkı kazandınız. Ödülünüzü hesabınıza aktarmak için internet bankacılığı bilgilerinizi doğrulayın.",
    "actual_url": "http://isbank-odul.com/cashback/aktar",
    "danger_level": "high",
    "expected_action": "reject",
    "consequence_fail": "İnternet bankacılığı şifrenizi sahte siteye girerek hesabınızdaki para çekildi. Resmi İş Bankası adresi 'isbank.com.tr' dir. ‘isbank-odul.com’ sahte adrestir. ",
    "consequence_success": "Resmi İş Bankası adresinin 'isbank.com.tr' olduğunu bilerek 'isbank-odul.com' adresini şüpheli buldunuz."
  },
  {
    "id": 209,
    "category": "reward_email",
    "subject": "Disney+ Sizi Seçti: 6 Ay Ücretsiz İzleme",
    "sender": "Disney+ Türkiye <promosyon@disneyplus-tr.net>",
    "message_preview": "Platformumuzun erken kullanıcılarından biri olarak sizi ödüllendiriyoruz. 6 aylık ücretsiz Disney+ üyeliği kazandınız. Hediyenizi aktif etmek için hesabınızı doğrulayın.",
    "actual_url": "http://disneyplus-tr.net/uyelik/aktif",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Sahte aktivasyon sayfasına Disney+ giriş bilgilerinizi ve kart bilgilerinizi girerek hesabınız ele geçirildi. Resmi Disney+ adresi 'disneyplus.com' dur. ‘disneyplus-tr.net’ sahte adrestir. ",
    "consequence_success": "Resmi Disney+ adresinin 'disneyplus.com' olduğunu bilerek 'disneyplus-tr.net' adresini şüpheli buldunuz."
  },
  {
    "id": 210,
    "category": "reward_email",
    "subject": "Hepsiburada Büyük Çekiliş: Samsung Galaxy Tab Kazandınız",
    "sender": "Hepsiburada Ödüller <cekilis@hepsiburada-kampanya.com>",
    "message_preview": "Hepsiburada alışverişleriniz sayesinde bu ayki çekilişimizde Samsung Galaxy Tab S9 kazandınız! Ürünün kargoya verilebilmesi için teslimat adresinizi ve kimlik bilgilerinizi onaylayın.",
    "actual_url": "http://hepsiburada-kampanya.com/cekilish/teslim",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Kimlik bilgilerinizi ve adresinizi sahte siteye girerek kişisel verileriniz çalındı. Resmi Hepsiburada adresi 'hepsiburada.com' dur. ‘hepsiburada-kampanya.com’ sahte adrestir. ",
    "consequence_success": "Resmi Hepsiburada adresinin 'hepsiburada.com' olduğunu ve katıldığınızı hatırlamadığınız bir çekiliş olduğunu fark ederek e-postayı engellediniz."
  },
  {
    "id": 301,
    "category": "authority_email",
    "subject": "SGK Prim Borcunuz Hakkında Son Uyarı",
    "sender": "Sosyal Güvenlik Kurumu <uyari@sgk-gov-tr.net>",
    "message_preview": "Adınıza kayıtlı 1.840 TL tutarında SGK prim borcunuz bulunmaktadır. 72 saat içinde ödeme yapılmadığı takdirde maaş ve banka hesaplarınıza haciz uygulanacaktır.",
    "actual_url": "http://sgk-gov-tr.net/borc/ode",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Sahte ödeme sayfasına banka kartı bilgilerinizi girerek dolandırıcılara para kaptırdınız. Resmi SGK adresi 'sgk.gov.tr' dur. ‘sgk-gov-tr.net’ sahte adrestir. ",
    "consequence_success": "Resmi SGK adresinin 'sgk.gov.tr' olduğunu bilerek '.gov.tr' yerine '.net' uzantısını şüpheli buldunuz."
  },
  {
    "id": 302,
    "category": "authority_email",
    "subject": "Emniyet Müdürlüğü: Adınıza Şikâyet Yapıldı",
    "sender": "T.C. Emniyet Genel Müdürlüğü <sikayet@emniyet-bildirim.com>",
    "message_preview": "Adınıza sahte banka hesabı açıldığına dair şikâyette bulunulmuştur. İfade verme sürecinizi başlatmak için 24 saat içinde aşağıdaki formu doldurmanız gerekmektedir. Aksi hâlde gıyabi işlem başlatılabilir.",
    "actual_url": "http://emniyet-bildirim.com/ifade/basvur",
    "danger_level": "high",
    "expected_action": "reject",
    "consequence_fail": "Paniğe kapılarak sahte forma TC kimlik numaranızı ve adresinizi girdiniz; bilgileriniz çalındı. Resmi Emniyet adresi 'egm.gov.tr' dur. ‘emniyet-bildirim.com’ sahte adrestir. ",
    "consequence_success": "Resmi Emniyet adresinin 'egm.gov.tr' olduğunu bilerek '.com' uzantılı bu adresi şüpheli buldunuz."
  },
  {
    "id": 303,
    "category": "authority_email",
    "subject": "Gelir İdaresi: 2.100 TL Vergi İadeniz Onaylandı",
    "sender": "Gelir İdaresi Başkanlığı <iade@gib-iade.net>",
    "message_preview": "2024 yılı gelir vergisi beyannameniz incelendi ve 2.100 TL iade hakkınız doğdu. İadenizi alabilmek için IBAN bilgilerinizi ve kimliğinizi 48 saat içinde doğrulayın.",
    "actual_url": "http://gib-iade.net/iade/iban-gir",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "IBAN ve kimlik bilgilerinizi sahte siteye girerek kişisel verileriniz dolandırıcıların eline geçti. Resmi GİB adresi 'gib.gov.tr' dur. ‘gib-iade.net’ sahte adrestir. ",
    "consequence_success": "Resmi GİB adresinin 'gib.gov.tr' olduğunu bilerek 'gib-iade.net' adresini şüpheli buldunuz."
  },
  {
    "id": 304,
    "category": "authority_email",
    "subject": "BTK Uyarısı: Cihazınızda Şüpheli Aktivite",
    "sender": "Bilgi Teknolojileri ve İletişim Kurumu <uyari@btk-destek.net>",
    "message_preview": "Cihazınızdan yasadışı içeriklere erişim girişimi tespit edildi. Cihazınız 6 saat içinde uzaktan kısıtlanacaktır. İşlemi durdurmak için kimliğinizi doğrulayın.",
    "actual_url": "http://btk-destek.net/cihaz/dogrula",
    "danger_level": "high",
    "expected_action": "reject",
    "consequence_fail": "Paniğe kapılarak sahte BTK sayfasına TC kimlik numaranızı ve telefon bilgilerinizi girdiniz. Resmi BTK adresi 'btk.gov.tr' dur. ‘btk-destek.net’ sahte adrestir. ",
    "consequence_success": "Resmi BTK adresinin 'btk.gov.tr' olduğunu bilerek 'btk-destek.net' adresini şüpheli buldunuz."
  },
  {
    "id": 305,
    "category": "authority_email",
    "subject": "MASAK: Hesabınız Soruşturma Kapsamına Alındı",
    "sender": "Mali Suçları Araştırma Kurulu <sorusturma@masak-bildirim.com>",
    "message_preview": "Banka hesabınız, devam eden bir finansal suç soruşturması kapsamında incelemeye alınmıştır. Hesabınızın dondurulmaması için 24 saat içinde beyanınızı iletmeniz gerekmektedir.",
    "actual_url": "http://masak-bildirim.com/beyan/ilet",
    "danger_level": "high",
    "expected_action": "reject",
    "consequence_fail": "Sahte beyan formuna banka hesap bilgilerinizi girerek hesabınız ele geçirildi. Resmi MASAK adresi 'masak.gov.tr' dur. ‘masak-bildirim.com’ sahte adrestir. ",
    "consequence_success": "Resmi MASAK adresinin 'masak.gov.tr' olduğunu bilerek '.com' uzantılı bu adresi şüpheli buldunuz."
  },
  {
    "id": 306,
    "category": "authority_email",
    "subject": "Nüfus Müdürlüğü: Kimlik Kartınız Güncellenmeli",
    "sender": "Nüfus ve Vatandaşlık İşleri Genel Müdürlüğü <guncelleme@nvi-guncelle.net>",
    "message_preview": "Nüfus kayıtlarında kimlik bilgilerinizde eksiklik tespit edildi. Pasaport ve ehliyet işlemlerinizin aksaması önlemek için bilgilerinizi 72 saat içinde güncellemeniz gerekmektedir.",
    "actual_url": "http://nvi-guncelle.net/kimlik/guncelle",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Sahte güncelleme formuna TC kimliğinizi, doğum tarihinizi ve adresinizi girerek kimliğiniz çalındı. Resmi NVI adresi 'nvi.gov.tr' dur. ‘nvi-guncelle.net’ sahte adrestir. ",
    "consequence_success": "Resmi NVI adresinin 'nvi.gov.tr' olduğunu bilerek 'nvi-guncelle.net' adresini şüpheli buldunuz."
  },
  {
    "id": 307,
    "category": "authority_email",
    "subject": "Sağlık Bakanlığı: MHRS Randevunuz İptal Edilecek",
    "sender": "T.C. Sağlık Bakanlığı <randevu@saglik-mhrs.com>",
    "message_preview": "MHRS sisteminde kayıtlı randevunuz bilgilerinizin güncellenmemesi nedeniyle iptal sürecine girdi. Randevunuzun korunması için kimlik doğrulamasını tamamlayın.",
    "actual_url": "http://saglik-mhrs.com/randevu/koru",
    "danger_level": "low",
    "expected_action": "reject",
    "consequence_fail": "Sahte MHRS sayfasına TC kimlik numaranızı ve e-Devlet şifrenizi girerek bilgileriniz çalındı. Resmi MHRS adresi 'saglik.gov.tr' dur. ‘saglik-mhrs.com’ sahte adrestir. ",
    "consequence_success": "Resmi Sağlık Bakanlığı adresinin 'saglik.gov.tr' olduğunu bilerek '.com' uzantılı bu adresi şüpheli buldunuz."
  },
  {
    "id": 308,
    "category": "authority_email",
    "subject": "Trafik Cezanız İcra Takibine Alındı",
    "sender": "Emniyet Genel Müdürlüğü Trafik Denetleme <ceza@egm-trafik-tr.com>",
    "message_preview": "Adınıza kayıtlı aracın 2024 yılına ait ödenmemiş trafik cezası icra takibine alındı. Toplam tutar 980 TL olup 48 saat içinde ödeme yapılmazsa aracınıza el koyma işlemi başlatılacaktır.",
    "actual_url": "http://egm-trafik-tr.com/ceza/ode",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Sahte ödeme sayfasına banka kartı bilgilerinizi girerek dolandırıcılara para kaptırdınız. Resmi EGM adresi 'egm.gov.tr ' dur. ‘egm-trafik-tr.com’ sahte adrestir. ",
    "consequence_success": "Resmi EGM adresinin 'egm.gov.tr' olduğunu bilerek 'egm-trafik-tr.com' adresini şüpheli buldunuz."
  },
  {
    "id": 309,
    "category": "authority_email",
    "subject": "EPDK: Elektrik Aboneliğinizde Usulsüzlük Tespit Edildi",
    "sender": "Enerji Piyasası Düzenleme Kurumu <abonelik@epdk-bildirim.net>",
    "message_preview": "Adresinize kayıtlı elektrik aboneliğinde usulsüzlük tespit edildi. Aboneliğinizin iptal edilmemesi için kimlik ve adres bilgilerinizi 24 saat içinde güncellemeniz gerekmektedir.",
    "actual_url": "http://epdk-bildirim.net/abonelik/guncelle",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Sahte güncelleme formuna kimlik ve adres bilgilerinizi girerek kişisel verileriniz çalındı. Resmi EPDK adresi 'epdk.gov.tr' dur. ‘epdk-bildirim.net’ sahte adrestir. ",
    "consequence_success": "Resmi EPDK adresinin 'epdk.gov.tr' olduğunu bilerek 'epdk-bildirim.net' adresini şüpheli buldunuz."
  },
  {
    "id": 310,
    "category": "authority_email",
    "subject": "Adalet Bakanlığı: Adınıza Mahkeme Tebligatı Gönderildi",
    "sender": "T.C. Adalet Bakanlığı <tebligat@adalet-tebligat.com>",
    "message_preview": "Adınıza açılan dava kapsamında duruşma tarihiniz belirlendi. Tebligatı teslim aldığınızı onaylamak ve dava dosyanıza erişmek için aşağıdaki bağlantıya tıklayın. 48 saat içinde onay verilmezse gıyabi karar çıkarılabilir.",
    "actual_url": "http://adalet-tebligat.com/tebligat/onayla",
    "danger_level": "high",
    "expected_action": "reject",
    "consequence_fail": "Paniğe kapılarak sahte forma TC kimlik numaranızı ve adresinizi girdiniz; bilgileriniz çalındı. Resmi Adalet Bakanlığı adresi 'adalet.gov.tr' dir. 'adalet-tebligat.com' sahte adrestir. ",
    "consequence_success": "Resmi Adalet Bakanlığı adresinin 'adalet.gov.tr' olduğunu bilerek '.com' uzantılı bu adresi şüpheli buldunuz."
  },
  {
    "id": 401,
    "category": "spoofing_email",
    "subject": "Hesabınıza Yeni Bir Cihazdan Giriş Yapıldı",
    "sender": "Google Güvenlik <security@google.com.accounts-tr.net>",
    "message_preview": "Google hesabınıza Bursa, Türkiye konumundan tanımlanmayan bir cihaz ile giriş yapıldı. Bu işlemi siz yapmadıysanız hesabınızı hemen güvenceye alın.",
    "actual_url": "http://google.com.accounts-tr.net/secure/login",
    "danger_level": "high",
    "expected_action": "reject",
    "consequence_fail": "Sahte Google giriş sayfasına şifrenizi girerek hesabınız ele geçirildi. Resmi Google adresi 'google.com' dur. ‘google.com.accounts-tr.net’ sahte adrestir. ",
    "consequence_success": "Alan adının 'google.com' ile başlamasına rağmen asıl domainin 'accounts-tr.net' olduğunu fark ederek e-postayı engellediniz."
  },
  {
    "id": 403,
    "category": "spoofing_email",
    "subject": "Steam Hesabınız Rusya'dan Açıldı",
    "sender": "Steam Support <noreply@stearn-help.com>",
    "message_preview": "Steam hesabınıza Moskova, Rusya'dan giriş yapıldı ve envanterinizden işlem gerçekleştirildi. Hesabınızı güvenceye almak için şifrenizi hemen değiştirin.",
    "actual_url": "http://stearn-help.com/account/secure",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Sahte Steam sayfasına kullanıcı adı ve şifrenizi girerek hesabınız ve tüm oyun envanteriniz çalındı. Gönderici adresindeki harf oyunlarını dikkate almalısın. Adreste stearn yazımında m yerine rn vardı.",
    "consequence_success": "Gönderici adresindeki 'stearn' yazımını (rn yerine m) fark ederek e-postayı engellediniz."
  },
  {
    "id": 404,
    "category": "spoofing_email",
    "subject": "Facebook: Hesabınızda Kimlik Doğrulama Gerekiyor",
    "sender": "Facebook Security <security@faceb00k-alert.com>",
    "message_preview": "Facebook hesabınıza bağlı telefon numarası değiştirilmeye çalışıldı. Bu işlemi siz başlatmadıysanız hesabınızı hemen kilitleyin.",
    "actual_url": "http://faceb00k-alert.com/account/lock",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Sahte Facebook sayfasına giriş bilgilerinizi girerek hesabınız ve bağlı Instagram hesabınız ele geçirildi. Gönderici adresindeki harf oyunlarını dikkate almalısın. Adreste faceb00k içinde O harflerinin yerine 0 (sıfır) rakamları vardı. ",
    "consequence_success": "Gönderici adresindeki 'faceb00k' içindeki '00' rakamlarını fark ederek e-postayı engellediniz."
  },
  {
    "id": 405,
    "category": "spoofing_email",
    "subject": "X'te Hesabınıza Şüpheli Giriş Denemesi",
    "sender": "X Güvenlik <alert@x-security-notify.com>",
    "message_preview": "X hesabınıza tanımlanmayan bir cihazdan giriş denemesi yapıldı ve engellendi. Hesabınızın güvende olduğunu doğrulamak için şifrenizi yenileyin.",
    "actual_url": "http://x-security-notify.com/sifre/yenile",
    "danger_level": "low",
    "expected_action": "reject",
    "consequence_fail": "Sahte X şifre sıfırlama sayfasına mevcut şifrenizi girerek hesabınız ele geçirildi. Resmi X adresi 'x.com' dur. ‘x-securit-notify.com’ sahte adrestir. ",
    "consequence_success": "Resmi X adresinin 'x.com' olduğunu bilerek 'x-security-notify.com' adresini şüpheli buldunuz."
  },
  {
    "id": 406,
    "category": "spoofing_email",
    "subject": "Zoom: Hesabınıza Bilinmeyen Cihazdan Erişildi",
    "sender": "Zoom Güvenlik <no-reply@zo0m-notify.com>",
    "message_preview": "Zoom hesabınıza farklı bir ülkeden erişim sağlandı ve bir toplantı başlatıldı. Hesabınızı korumak için şifrenizi güncelleyin ve aktif oturumları kapatın.",
    "actual_url": "http://zo0m-notify.com/account/secure",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Sahte Zoom sayfasına kurumsal giriş bilgilerinizi girerek şirket toplantılarınıza yetkisiz erişim sağlandı. Gönderici adresindeki harf oyunlarını dikkate almalısın. Adreste zo0m içinde o harfi yerine 0 (sıfır) vardı. ",
    "consequence_success": "Gönderici adresindeki 'zo0m' içindeki '0' (sıfır) rakamını fark ederek e-postayı engellediniz."
  },
  {
    "id": 407,
    "category": "spoofing_email",
    "subject": "Hepsiburada: Hesabınızda Yeni Sipariş Oluşturuldu",
    "sender": "Hepsiburada Bildirim <siparis@hepsiburada-alert.com>",
    "message_preview": "Hepsiburada hesabınızda sizin tarafınızdan başlatılmayan 1.349 TL tutarında bir sipariş oluşturuldu. Siparişi iptal etmek için hemen tıklayın.",
    "actual_url": "http://hepsiburada-alert.com/siparis/iptal",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Sahte iptal sayfasına Hepsiburada giriş bilgilerinizi girerek hesabınız ve kayıtlı kartınız ele geçirildi. Resmi Hepsiburada adresi 'hepsiburada.com' dur. ‘hepsiburada-alert.com’ sahte adrestir. ",
    "consequence_success": "Resmi Hepsiburada adresinin 'hepsiburada.com' olduğunu bilerek 'hepsiburada-alert.com' adresini şüpheli buldunuz."
  },
  {
    "id": 408,
    "category": "spoofing_email",
    "subject": "iCloud: Verileriniz Başka Cihaza Kopyalanıyor",
    "sender": "Apple iCloud <support@apple-icloud-destek.com>",
    "message_preview": "iCloud hesabınızdan fotoğraflar ve belgeler başka bir cihaza aktarılıyor. Bu işlemi durdurmak için Apple ID'nizi hemen doğrulayın.",
    "actual_url": "http://apple-icloud-destek.com/dogrula/kimlik",
    "danger_level": "high",
    "expected_action": "reject",
    "consequence_fail": "Sahte iCloud sayfasına Apple ID bilgilerinizi girerek tüm iCloud verilerinize ve ödeme bilgilerinize erişim kaybettiniz. Resmi Apple adresi 'icloud.com' dur. ‘apple-icloud-destek.com’ sahte adrestir. ",
    "consequence_success": "Resmi Apple adresinin 'icloud.com' olduğunu bilerek 'apple-icloud-destek.com' adresini şüpheli buldunuz."
  },
  {
    "id": 409,
    "category": "spoofing_email",
    "subject": "Binance: Hesabınızdan Büyük Çekim Talebi Oluşturuldu",
    "sender": "Binance Güvenlik <security@binance-tr-destek.com>",
    "message_preview": "Binance hesabınızdan 0.38 BTC çekim talebi oluşturuldu. Bu talebi siz başlatmadıysanız 15 dakika içinde aşağıdaki bağlantıdan işlemi iptal edin.",
    "actual_url": "http://binance-tr-destek.com/cekim/iptal",
    "danger_level": "high",
    "expected_action": "reject",
    "consequence_fail": "Sahte Binance sayfasına giriş bilgilerinizi ve 2FA kodunuzu girerek tüm kripto varlıklarınız transfer edildi. Resmi Binance adresi 'binance.com' dur. ‘binance-destek-tr.com’ sahte adrestir. ",
    "consequence_success": "Resmi Binance adresinin 'binance.com' olduğunu bilerek 'binance-tr-destek.com' adresini şüpheli buldunuz."
  },
  {
    "id": 411,
    "category": "spoofing_email",
    "subject": "Turkcell: Hat Bilgileriniz Değiştirildi",
    "sender": "Turkcell Bildirim <bilgi@turkcell-destek.net>",
    "message_preview": "Turkcell hesabınızdaki iletişim e-postası değiştirildi. Bu değişikliği siz yapmadıysanız hesabınızı hemen güvenceye alın.",
    "actual_url": "http://turkcell-destek.net/hesap/geri-al",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Sahte Turkcell sayfasına TC kimlik numaranızı ve hat şifrenizi girerek hattınız başkasına devredildi. Resmi Turkcell adresi 'turkcell.com.tr' dur. ‘turkcell-destek.net’ sahte adrestir. ",
    "consequence_success": "Resmi Turkcell adresinin 'turkcell.com.tr' olduğunu bilerek 'turkcell-destek.net' adresini şüpheli buldunuz."
  },
  {
    "id": 412,
    "category": "spoofing_email",
    "subject": "Trendyol: Siparişinizin Teslimat Adresi Değiştirildi",
    "sender": "Trendyol Sipariş <siparis@trendyo1-bildirim.com>",
    "message_preview": "Sipariş numarası #TY991043 olan ürününüzün teslimat adresi değiştirildi. Bu işlemi siz yapmadıysanız aşağıdaki bağlantıdan adresi geri alın.",
    "actual_url": "http://trendyoll-bildirim.com/adres/geri-al",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Sahte Trendyol sayfasına giriş bilgilerinizi girerek hesabınız ve kayıtlı kart bilgileriniz ele geçirildi.",
    "consequence_success": "Gönderici adresindeki 'trendyo1' içindeki '1' rakamını (l yerine) fark ederek e-postayı engellediniz."
  },
  {
    "id": 413,
    "category": "spoofing_email",
    "subject": "Microsoft: Hesabınıza İran'dan Giriş Denemesi Engellendi",
    "sender": "Microsoft Güvenlik <alert@micr0soft-alert.com>",
    "message_preview": "Microsoft hesabınıza İran'dan giriş denemesi yapıldı ve otomatik olarak engellendi. Hesabınızın güvende olduğunu doğrulamak için kimliğinizi onaylayın.",
    "actual_url": "http://micr0soft-alert.com/hesap/dogrula",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Sahte Microsoft doğrulama sayfasına e-posta ve şifrenizi girerek tüm Microsoft hizmetleriniz ele geçirildi. Gönderici adresindeki harf oyunlarını dikkate almalısın. Adreste micr0soft içinde O harfi yerine 0 (sıfır) vardı. ",
    "consequence_success": "Gönderici adresindeki 'micr0soft' içindeki '0' (sıfır) rakamını fark ederek e-postayı engellediniz."
  },
  {
    "id": 414,
    "category": "spoofing_email",
    "subject": "GitHub: Deponuza Yetkisiz Erişim Sağlandı",
    "sender": "GitHub Security <noreply@githubb-security.com>",
    "message_preview": "GitHub hesabınızdaki özel depolara yetkisiz bir erişim tespit edildi. Erişimi sonlandırmak ve hesabınızı korumak için şifrenizi hemen değiştirin.",
    "actual_url": "http://githubb-security.com/password/reset",
    "danger_level": "low",
    "expected_action": "reject",
    "consequence_fail": "Sahte GitHub sayfasına şifrenizi girerek özel projeleriniz ve kaynak kodlarınız çalındı.",
    "consequence_success": "Gönderici adresindeki 'githubb' içindeki çift 'b' harfini fark ederek e-postayı engellediniz."
  },
  {
    "id": 415,
    "category": "spoofing_email",
    "subject": "Kargo Teslimatınız Başarısız Oldu — Yeniden Planlayın",
    "sender": "Yurtiçi Kargo <teslimat@yurtici-kargo-tr.com>",
    "message_preview": "Adresinize gönderilen kargo teslim edilemedi. Yeni teslimat zamanı seçmek ve küçük bir yeniden teslimat ücreti ödemek için 24 saat içinde adresinizi doğrulayın.",
    "actual_url": "http://yurtici-kargo-tr.com/teslimat/yeniden",
    "danger_level": "medium",
    "expected_action": "reject",
    "consequence_fail": "Sahte kargo sayfasına adresinizi ve kart bilgilerinizi girerek dolandırıcılara para kaptırdınız.",
    "consequence_success": "Resmi Yurtiçi Kargo adresinin 'yurticikargo.com' olduğunu bilerek 'yurtici-kargo-tr.com' adresini şüpheli buldunuz."
  },
  {
    "id": 701,
    "category": "safe_transaction_email",
    "subject": "Yemeksepeti Sipariş Onayınız #YS102938",
    "sender": "Yemeksepeti Sipariş <info@yemeksepeti.com>",
    "message_preview": "Siparişiniz başarıyla alındı ve restoran tarafından hazırlanıyor. 450 TL tutarındaki ödemeniz Masterpass üzerinden güvenle gerçekleştirildi. Afiyet olsun!",
    "actual_url": "https://www.yemeksepeti.com/hesabim/siparislerim",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Orijinal bir sipariş e-postasını şüpheli bularak sildiniz ve sipariş takibinizi zorlaştırdınız.",
    "consequence_success": "Gönderici adresinin resmi 'yemeksepeti.com' olduğunu doğrulayarak bu işlemi güvenli olarak işaretlediniz."
  },
  {
    "id": 702,
    "category": "safe_transaction_email",
    "subject": "Getir Siparişinize Ait e-Arşiv Fatura",
    "sender": "Getir Fatura <fatura@getir.com>",
    "message_preview": "Merhaba, bugünkü Getir siparişinize ait e-Arşiv faturanız ektedir. Bizi tercih ettiğiniz için teşekkür ederiz.",
    "actual_url": "https://getir.com/fatura-sorgulama",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Güvenli bir e-arşiv faturasını spam olarak işaretlediniz.",
    "consequence_success": "Göndericinin resmi 'getir.com' domainine ait olduğunu fark edip e-postayı kabul ettiniz."
  },
  {
    "id": 703,
    "category": "safe_transaction_email",
    "subject": "Trendyol Siparişiniz Kargoya Verildi",
    "sender": "Trendyol Bildirim <siparis@trendyol.com>",
    "message_preview": "Sipariş numarası 90348271 olan ürününüz Trendyol Express firmasına teslim edilmiştir. Kargo takip numaranız ile sürecini hesabınızdan izleyebilirsiniz.",
    "actual_url": "https://www.trendyol.com/Hesabim/Siparislerim",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Orijinal bir kargo bildirimini reddettiniz ve kargonuzun durumundan haberdar olamadınız.",
    "consequence_success": "Göndericinin resmi 'trendyol.com' adresi olduğunu doğrulayarak e-postayı güvenli kabul ettiniz."
  },
  {
    "id": 704,
    "category": "safe_transaction_email",
    "subject": "Amazon.com.tr Sipariş Onayı",
    "sender": "Amazon Türkiye <siparis-onayi@amazon.com.tr>",
    "message_preview": "Amazon.com.tr üzerinden verdiğiniz sipariş alınmıştır. Siparişiniz kargoya verildiğinde size ayrı bir bilgilendirme e-postası göndereceğiz. Sipariş özeti için tıklayın.",
    "actual_url": "https://www.amazon.com.tr/gp/css/order-history",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Güvenli bir Amazon sipariş onayını engelleyerek sipariş detaylarına erişiminizi kısıtladınız.",
    "consequence_success": "Alan adının resmi 'amazon.com.tr' olduğunu fark ederek e-postayı güvenli işaretlediniz."
  },
  {
    "id": 705,
    "category": "safe_transaction_email",
    "subject": "İade İşleminiz Tamamlandı - Hepsiburada",
    "sender": "Hepsiburada Destek <destek@hepsiburada.com>",
    "message_preview": "İade talebinde bulunduğunuz ürün depomuza ulaşmış ve iade işleminiz onaylanmıştır. 850 TL tutarındaki ücret iadesi bankanıza bağlı olarak 2-3 iş günü içinde kartınıza yansıyacaktır.",
    "actual_url": "https://www.hepsiburada.com/siparislerim/iadeler",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Güvenli bir iade bilgilendirme e-postasını sildiniz ve para iade sürecinizi takip edemediniz.",
    "consequence_success": "Göndericinin resmi 'hepsiburada.com' adresini kullandığını bilerek e-postayı kabul ettiniz."
  },
  {
    "id": 706,
    "category": "safe_transaction_email",
    "subject": "Netflix Faturanız",
    "sender": "Netflix <mailer@netflix.com>",
    "message_preview": "Aylık Netflix üyeliğiniz başarıyla yenilenmiştir. 229,99 TL tutarındaki faturanıza ait detayları hesabınızın faturalandırma bölümünde bulabilirsiniz.",
    "actual_url": "https://www.netflix.com/YourAccount",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Resmi Netflix faturasını sahte sanıp oltalama olarak işaretlediniz.",
    "consequence_success": "Netflix'in resmi e-posta adresi olan 'mailer@netflix.com'u doğrulayarak işlemi güvenli kategorisine aldınız."
  },
  {
    "id": 707,
    "category": "safe_transaction_email",
    "subject": "Spotify Premium Makbuzunuz",
    "sender": "Spotify <no-reply@spotify.com>",
    "message_preview": "Spotify Premium üyeliğiniz için bu ayki ödemeniz alınmıştır. Makbuzunuzu incelemek veya planınızı değiştirmek için hesap sayfanızı ziyaret edin.",
    "actual_url": "https://www.spotify.com/tr/account/overview/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Güvenli bir Spotify ödeme makbuzunu reddettiniz.",
    "consequence_success": "Alan adının resmi 'spotify.com' olduğunu doğrulayarak e-postanın güvenli olduğunu anladınız."
  },
  {
    "id": 708,
    "category": "safe_transaction_email",
    "subject": "Steam Satın Alma İşleminiz İçin Teşekkürler",
    "sender": "Steam Destek <noreply@steampowered.com>",
    "message_preview": "Steam mağazasından yaptığınız satın alım başarılı. Ürünler kütüphanenize eklendi. İşlem tutarı ve vergi detayları için faturanızı inceleyebilirsiniz.",
    "actual_url": "https://store.steampowered.com/account/history/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Gerçek bir Steam satın alım makbuzunu sildiniz.",
    "consequence_success": "Göndericinin resmi 'steampowered.com' alan adından geldiğini görerek güvenli olduğunu onayladınız."
  },
  {
    "id": 709,
    "category": "safe_transaction_email",
    "subject": "Türk Hava Yolları E-Biletiniz",
    "sender": "Türk Hava Yolları <info@thy.com>",
    "message_preview": "Biletleme işleminiz başarıyla tamamlandı. Uçuş detaylarınızı, PNR kodunuzu ve e-bilet numaranızı e-postanın içeriğinde bulabilirsiniz. İyi uçuşlar dileriz.",
    "actual_url": "https://www.turkishairlines.com/tr-tr/ucak-bileti/rezervasyon-kontrol/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Önemli bir uçuş e-biletini sahte sanarak engellediniz ve bilet bilet bilgilerinize ulaşamadınız.",
    "consequence_success": "Resmi 'thy.com' domainini kontrol edip e-postanın güvenli uçuş bildirimi olduğunu onayladınız."
  },
  {
    "id": 710,
    "category": "safe_transaction_email",
    "subject": "Pegasus Uçuş Biletinize Ait Fatura",
    "sender": "Pegasus Hava Yolları <info@flypgs.com>",
    "message_preview": "Değerli misafirimiz, satın almış olduğunuz uçuşa ait e-arşiv faturanız düzenlenmiştir. Fatura belgenize aşağıdaki bağlantıdan PDF olarak ulaşabilirsiniz.",
    "actual_url": "https://www.flypgs.com/bilet-islemleri/e-fatura",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Güvenli fatura bildirimini reddederek seyahat masraf belgenizi kaybettiniz.",
    "consequence_success": "Resmi 'flypgs.com' alan adını teyit ederek e-postayı güvenli kabul ettiniz."
  },
  {
    "id": 711,
    "category": "safe_transaction_email",
    "subject": "İGDAŞ Elektronik Faturanız",
    "sender": "İGDAŞ Bilgilendirme <fatura@igdas.istanbul>",
    "message_preview": "Sözleşme numaranıza ait doğalgaz faturanız oluşturulmuştur. Son ödeme tarihi ve güncel tüketim detaylarınızı görüntülemek için faturanızı inceleyebilirsiniz.",
    "actual_url": "https://www.igdas.istanbul/fatura-sorgulama",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Orijinal doğalgaz fatura bildirimini sildiniz ve ödeme tarihini kaçırma riski yarattınız.",
    "consequence_success": "Göndericinin resmi '.istanbul' uzantılı İGDAŞ adresi olduğunu doğrulayarak kabul ettiniz."
  },
  {
    "id": 712,
    "category": "safe_transaction_email",
    "subject": "Enerjisa Elektrik Tüketim Faturanız",
    "sender": "Enerjisa <fatura@enerjisa.com.tr>",
    "message_preview": "Değerli müşterimiz, tesisat numaranıza ait aylık elektrik tüketim faturanız e-arşiv sistemi üzerinden oluşturulmuştur. Ödemenizi dijital kanallarimizdan yapabilirsiniz.",
    "actual_url": "https://online.enerjisa.com.tr/Fatura/Sorgulama",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Elektrik faturası bildirimini oltalama zannederek sildiniz.",
    "consequence_success": "Alan adının resmi 'enerjisa.com.tr' olduğunu görerek güvenli işlemi onayladınız."
  },
  {
    "id": 713,
    "category": "safe_transaction_email",
    "subject": "Turkcell Aylık Faturanız",
    "sender": "Turkcell Fatura <fatura@turkcell.com.tr>",
    "message_preview": "Değerli müşterimiz, iletişim hattınıza ait son dönem e-faturanız sisteme yüklenmiştir. Güncel fatura tutarınızı ve detayları görüntülemek için giriş yapabilirsiniz.",
    "actual_url": "https://www.turkcell.com.tr/hesabim/faturalarim",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Turkcell faturanızı sahte zannederek reddettiniz ve faturanızı takip edemediniz.",
    "consequence_success": "Göndericinin resmi 'turkcell.com.tr' domaininden geldiğini teyit ettiniz."
  },
  {
    "id": 714,
    "category": "safe_transaction_email",
    "subject": "Vodafone Elektronik Faturanız",
    "sender": "Vodafone <efatura@vodafone.com.tr>",
    "message_preview": "Sayın abonemiz, hattınıza ait e-arşiv fatura belgeniz PDF formatında e-postanıza eklenmiştir. Fatura borcunuzu Vodafone Yanımda üzerinden ödeyebilirsiniz.",
    "actual_url": "https://www.vodafone.com.tr/VodafoneYanimda/fatura-islemleri",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Gerçek Vodafone faturanızı silerek hesap ekstrenizi görüntüleyemediniz.",
    "consequence_success": "Resmi 'vodafone.com.tr' adresini kontrol ederek e-postayı güvenli buldunuz."
  },
  {
    "id": 715,
    "category": "safe_transaction_email",
    "subject": "Türk Telekom Fatura Bilgilendirmesi",
    "sender": "Türk Telekom <fatura@turktelekom.com.tr>",
    "message_preview": "Evde İnternet aboneliğinize ait aylık faturanız kesilmiştir. Ödeme işlemlerinizi Türk Telekom Online İşlemler uygulaması üzerinden komisyonsuz olarak gerçekleştirebilirsiniz.",
    "actual_url": "https://onlineislemler.turktelekom.com.tr/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "İnternet faturanızı phising sanarak reddettiniz.",
    "consequence_success": "Alan adının orijinal 'turktelekom.com.tr' olduğunu teyit edip güvenli işaretlediniz."
  },
  {
    "id": 716,
    "category": "safe_transaction_email",
    "subject": "Apple'dan faturanız",
    "sender": "Apple <no_reply@email.apple.com>",
    "message_preview": "App Store üzerinden gerçekleştirdiğiniz iCloud+ (50 GB) abonelik yenileme işlemi için kesilen makbuzunuz ektedir. Satın alımınızı cihazınızın ayarlar bölümünden yönetebilirsiniz.",
    "actual_url": "https://reportaproblem.apple.com/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Resmi Apple faturasını sahte sanarak engellediniz.",
    "consequence_success": "Apple'ın makbuzlar için kullandığı resmi 'email.apple.com' adresini tanıyıp onayladınız."
  },
  {
    "id": 717,
    "category": "safe_transaction_email",
    "subject": "Google Play Sipariş Makbuzu",
    "sender": "Google Play <googleplay-noreply@google.com>",
    "message_preview": "Google Play Store'dan yaptığınız uygulama içi satın alma işleminin makbuzudur. Satın alma işlemleri ve abonelik iptalleri için Play Store ödemeler sayfanızı ziyaret edin.",
    "actual_url": "https://play.google.com/store/account/orderhistory",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Gerçek bir Play Store ödeme dekontunu sildiniz.",
    "consequence_success": "Göndericinin resmi 'google.com' olduğunu doğrulayarak işlemi güvenli buldunuz."
  },
  {
    "id": 718,
    "category": "safe_transaction_email",
    "subject": "Migros Sanal Market Siparişiniz Teslim Edildi",
    "sender": "Migros Sanal Market <sanalmarket@migros.com.tr>",
    "message_preview": "Siparişiniz kuryemiz tarafından teslim edilmiştir. Alışverişinizle ilgili e-Arşiv faturanız sistemde oluşturulmuştur. Bizi tercih ettiğiniz için teşekkür ederiz.",
    "actual_url": "https://www.migros.com.tr/siparislerim",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Güvenli teslimat bildirimini şüpheli bularak e-postayı engellediniz.",
    "consequence_success": "Göndericinin resmi 'migros.com.tr' adresi olduğunu teyit ederek e-postayı kabul ettiniz."
  },
  {
    "id": 719,
    "category": "safe_transaction_email",
    "subject": "Cuma akşamı yolculuğunuzun makbuzu",
    "sender": "Uber Makbuzlar <receipts@uber.com>",
    "message_preview": "Yolculuğunuz için teşekkür ederiz. Toplam yolculuk tutarınız hesabınıza bağlı kartınızdan tahsil edilmiştir. Sürücü değerlendirmesi ve güzergah detayı için tıklayın.",
    "actual_url": "https://riders.uber.com/trips",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Orijinal Uber yolculuk makbuzunuzu spam zannederek sildiniz.",
    "consequence_success": "Resmi 'uber.com' domainini kontrol ederek e-postanın güvenli olduğunu anladınız."
  },
  {
    "id": 720,
    "category": "safe_transaction_email",
    "subject": "Martı Sürüş Makbuzunuz",
    "sender": "Martı <iletisim@marti.tech>",
    "message_preview": "Martı sürüşünüz başarıyla tamamlandı. Sürüş süresi, kat edilen mesafe ve tahsil edilen toplam ücrete dair detaylı e-arşiv faturanız ektedir.",
    "actual_url": "https://www.marti.tech/hesabim",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Güvenli sürüş faturanızı reddederek belgeyi sildiniz.",
    "consequence_success": "Alan adının resmi 'marti.tech' olduğunu doğrulayarak e-postayı güvenli kabul ettiniz."
  },
  {
    "id": 721,
    "category": "safe_transaction_email",
    "subject": "PlayStation Store Satın Alım Onayı",
    "sender": "PlayStation Store <store@playstation.com>",
    "message_preview": "PlayStation Store'dan yaptığınız satın alım işlemi için teşekkür ederiz. İşlem ID'si ve satın alınan içeriğin indirme yönergeleri için detaylara göz atabilirsiniz.",
    "actual_url": "https://store.playstation.com/tr-tr/pages/history",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Resmi bir oyun faturasını sahte sanarak erişimi kapattınız.",
    "consequence_success": "Göndericinin resmi 'playstation.com' adresinden geldiğini fark edip güvenli işaretlediniz."
  },
  {
    "id": 722,
    "category": "safe_transaction_email",
    "subject": "Rezervasyon Onayınız: İstanbul",
    "sender": "Airbnb <automated@airbnb.com>",
    "message_preview": "Rezervasyonunuz onaylandı! Seyahat programınız, ev sahibi iletişim bilgileri ve ödeme makbuzunuz hesabınıza eklenmiştir. İyi tatiller dileriz.",
    "actual_url": "https://www.airbnb.com.tr/trips",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Orijinal konaklama rezervasyonunu sildiniz ve seyahat belgenize ulaşamadınız.",
    "consequence_success": "Resmi 'airbnb.com' alan adını kontrol ederek seyahat onayınızı güvenli olarak işaretlediniz."
  },
  {
    "id": 723,
    "category": "safe_transaction_email",
    "subject": "Booking.com Ödeme Onayınız",
    "sender": "Booking.com <customer.service@booking.com>",
    "message_preview": "Otel rezervasyonunuz için ön ödeme işleminiz başarıyla tamamlandı. Faturanız ve tesise giriş yaparken göstereceğiniz onay numaranız belgededir.",
    "actual_url": "https://secure.booking.com/myreservations.html",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Gerçek otel ödeme dekontunu oltalama sanarak sildiniz.",
    "consequence_success": "Göndericinin resmi 'booking.com' olduğunu doğrulayarak e-postayı kabul ettiniz."
  },
  {
    "id": 724,
    "category": "safe_transaction_email",
    "subject": "Biletix Sipariş Onayınız ve Referans Numaranız",
    "sender": "Biletix <info@biletix.com>",
    "message_preview": "Satın aldığınız etkinlik biletlerinin referans numarası ve PDF biletleriniz tarafınıza iletilmiştir. Etkinlik alanına girerken barkodu okutmanız yeterlidir.",
    "actual_url": "https://www.biletix.com/mybiletix",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Orijinal etkinlik biletinizi sahte zannederek reddettiniz.",
    "consequence_success": "Resmi 'biletix.com' adresinden geldiğini doğrulayarak biletinizi güvenle indirdiniz."
  },
  {
    "id": 725,
    "category": "safe_transaction_email",
    "subject": "Çiçeksepeti Siparişiniz Teslim Edildi",
    "sender": "Çiçeksepeti Sipariş <siparis@ciceksepeti.com>",
    "message_preview": "Siparişiniz alıcısına başarıyla teslim edilmiştir! Bizi tercih ettiğiniz için teşekkür ederiz. Siparişinizin e-arşiv faturasını inceleyebilirsiniz.",
    "actual_url": "https://www.ciceksepeti.com/siparis-takip",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Güvenli hediye teslimat bildirimini engelleyerek faturayı kaybettiniz.",
    "consequence_success": "Alan adının orijinal 'ciceksepeti.com' olduğunu görerek güvenli olduğunu onayladınız."
  },
  {
    "id": 726,
    "category": "safe_transaction_email",
    "subject": "Param Güvende Ödemeniz Alındı",
    "sender": "Sahibinden.com <info@sahibinden.com>",
    "message_preview": "Param Güvende sistemi ile yaptığınız ürün ödemesi havuz hesabımıza aktarılmıştır. Satıcı ürünü kargoladıktan sonra kargo takip numarası tarafınıza iletilecektir.",
    "actual_url": "https://banaozel.sahibinden.com/siparislerim",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Gerçek bir alışveriş onay bildirimini sildiniz.",
    "consequence_success": "Resmi 'sahibinden.com' adresini kontrol ederek işlemin güvenli olduğunu anladınız."
  },
  {
    "id": 727,
    "category": "safe_transaction_email",
    "subject": "Dolap Satış Onayı ve Kargo Kodunuz",
    "sender": "Dolap Destek <destek@dolap.com>",
    "message_preview": "Ürününüz satıldı! Alıcının adresine gönderim yapmak için aşağıdaki kargo kampanya kodunu kullanabilirsiniz. Ürünü 3 iş günü içinde kargoya vermeyi unutmayın.",
    "actual_url": "https://dolap.com/hesabim/satislarim",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Gerçek satış onay kodunu engelleyerek kargo gönderim sürecini aksattınız.",
    "consequence_success": "Göndericinin resmi 'dolap.com' olduğunu doğrulayıp e-postayı kabul ettiniz."
  },
  {
    "id": 728,
    "category": "safe_transaction_email",
    "subject": "N11 Siparişiniz Başarıyla Tamamlandı",
    "sender": "N11.com Sipariş <siparis@n11.com>",
    "message_preview": "Mağaza siparişinizi onayladı ve ürününüzü kargoya vermek üzere hazırlıklara başladı. Sipariş numaranız ile süreci hesabınızdan anlık takip edebilirsiniz.",
    "actual_url": "https://www.n11.com/hesabim/siparislerim",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Sipariş onayı e-postasını sildiniz ve sipariş detaylarını kaybettiniz.",
    "consequence_success": "Resmi 'n11.com' alan adından geldiğini teyit ederek e-postayı güvenli işaretlediniz."
  },
  {
    "id": 729,
    "category": "safe_transaction_email",
    "subject": "YouTube Premium Üyelik Faturanız",
    "sender": "YouTube <youtube-premium@youtube.com>",
    "message_preview": "Bireysel YouTube Premium aboneliğinizin bu ayki ücreti başarıyla tahsil edilmiştir. Fatura ve ödeme detaylarına hesap ayarlarınızdan erişebilirsiniz.",
    "actual_url": "https://www.youtube.com/paid_memberships",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Güvenli abonelik yenileme makbuzunu sahte sanarak engellediniz.",
    "consequence_success": "Gönderici alan adının orijinal 'youtube.com' olduğunu bilerek faturayı onayladınız."
  },
  {
    "id": 730,
    "category": "safe_transaction_email",
    "subject": "İSKİ e-Arşiv Fatura Bilgilendirmesi",
    "sender": "İSKİ İstanbul <fatura@iski.istanbul>",
    "message_preview": "Mukavele numaranıza ait son dönem su tüketim faturanız oluşturulmuştur. Son ödeme tarihi geçmeden ödemenizi mobil bankacılık veya web sitemiz üzerinden yapabilirsiniz.",
    "actual_url": "https://www.iski.istanbul/fatura-odeme",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Resmi su faturası e-postasını reddederek faturanızı vaktinde ödeme fırsatını kaçırdınız.",
    "consequence_success": "Göndericinin resmi '.istanbul' uzantılı adres olduğunu fark ederek işlemi güvenli olarak kabul ettiniz."
  },
  {
    "id": 901,
    "category": "safe_social_email",
    "subject": "selin_yilmaz seni takip etmeye başladı",
    "sender": "Instagram <no-reply@mail.instagram.com>",
    "message_preview": "Instagram'da yeni bir takipçin var! selin_yilmaz profilini takip etmeye başladı. Onun paylaşımlarını görmek için sen de geri takip edebilirsin.",
    "actual_url": "https://www.instagram.com/selin_yilmaz",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Gerçek bir sosyal medya bildirimini silerek yeni takipçinizle etkileşime geçmeyi kaçırdınız.",
    "consequence_success": "Göndericinin resmi 'mail.instagram.com' adresi olduğunu doğrulayarak e-postayı güvenli işaretlediniz."
  },
  {
    "id": 902,
    "category": "safe_social_email",
    "subject": "Ahmet Yılmaz sana bir arkadaşlık isteği gönderdi",
    "sender": "Facebook <notification@facebookmail.com>",
    "message_preview": "Ahmet Yılmaz Facebook'ta seninle arkadaş olmak istiyor. İsteği onaylamak veya reddetmek için hemen Facebook'a giriş yap.",
    "actual_url": "https://www.facebook.com/friends/requests/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Facebook arkadaşlık isteği bildirimini sahte sanarak engellediniz.",
    "consequence_success": "Facebook'un bildirimler için kullandığı 'facebookmail.com' adresini tanıyıp onayladınız."
  },
  {
    "id": 903,
    "category": "safe_social_email",
    "subject": "Profiliniz bu hafta 15 kez görüntülendi",
    "sender": "LinkedIn <messages-noreply@linkedin.com>",
    "message_preview": "Profilinize kimlerin baktığını merak ediyor musunuz? Bu hafta 15 kişi LinkedIn profilinizi inceledi. Profilinize bakanları görmek için tıklayın.",
    "actual_url": "https://www.linkedin.com/analytics/profile-views/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Resmi bir LinkedIn ağ bildirimini reddettiniz.",
    "consequence_success": "Alan adının orijinal 'linkedin.com' olduğunu teyit edip güvenli işaretlediniz."
  },
  {
    "id": 904,
    "category": "safe_social_email",
    "subject": "@can_veli bir gönderide senden bahsetti",
    "sender": "X <notify@x.com>",
    "message_preview": "Can Veli (@can_veli) seni bir X gönderisinde etiketledi: 'Bugünkü etkinlik harikaydı, katılan herkese teşekkürler!' Gönderiyi görmek için tıkla.",
    "actual_url": "https://x.com/notifications",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Resmi X etkileşim bildirimini oltalama sanarak sildiniz.",
    "consequence_success": "Göndericinin resmi 'x.com' adresi olduğunu doğrulayarak işlemi güvenli buldunuz."
  },
  {
    "id": 905,
    "category": "safe_social_email",
    "subject": "Kanalınıza yeni bir abone katıldı!",
    "sender": "YouTube <noreply@youtube.com>",
    "message_preview": "Tebrikler, kanalınıza yeni biri abone oldu! Topluluğunuz büyümeye devam ediyor. Analizlerinizi görmek için YouTube Studio'ya göz atın.",
    "actual_url": "https://studio.youtube.com/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Güvenli bir YouTube topluluk bildirimini sildiniz.",
    "consequence_success": "Alan adının resmi 'youtube.com' olduğunu görerek güvenli olduğunu onayladınız."
  },
  {
    "id": 906,
    "category": "safe_social_email",
    "subject": "Yeni bir yorum aldınız: \"Harika bir video!\"",
    "sender": "TikTok <noreply@tiktok.com>",
    "message_preview": "Son paylaştığınız TikTok videonuza '@user38912' kullanıcısından yeni bir yorum geldi: 'Harika bir video!'. Yorumu yanıtlamak için uygulamayı açın.",
    "actual_url": "https://www.tiktok.com/notifications",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Gerçek bir TikTok etkileşim e-postasını spam zannederek sildiniz.",
    "consequence_success": "Resmi 'tiktok.com' domainini kontrol ederek e-postanın güvenli olduğunu anladınız."
  },
  {
    "id": 907,
    "category": "safe_social_email",
    "subject": "Bir yeni arkadaşlık isteğin var",
    "sender": "Discord <noreply@discord.com>",
    "message_preview": "Görünüşe göre 'GamerPro99' seninle Discord'da arkadaş olmak istiyor. İsteği kabul etmek için Discord uygulamasını açabilirsin.",
    "actual_url": "https://discord.com/channels/@me",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Orijinal Discord arkadaşlık isteğini reddederek arkadaşınızı beklettiniz.",
    "consequence_success": "Göndericinin resmi 'discord.com' olduğunu doğrulayarak e-postayı kabul ettiniz."
  },
  {
    "id": 908,
    "category": "safe_social_email",
    "subject": "Yorumunuza yeni bir yanıt geldi",
    "sender": "Reddit <noreply@redditmail.com>",
    "message_preview": "r/technology topluluğundaki yorumuna 'tech_guru' adlı kullanıcıdan bir yanıt geldi. Konuşmaya katılmak için hemen tıkla.",
    "actual_url": "https://www.reddit.com/notifications",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Güvenli bir Reddit forum bildirimini sahte sanarak erişimi kapattınız.",
    "consequence_success": "Reddit'in mail bildirimleri için kullandığı 'redditmail.com' adresini tanıyıp onayladınız."
  },
  {
    "id": 909,
    "category": "safe_social_email",
    "subject": "Kaydettiğin Pinlere benzer yeni fikirler bulduk",
    "sender": "Pinterest <hello@inspire.pinterest.com>",
    "message_preview": "Senin için oluşturduğumuz yeni panolara göz at! 'Ev Dekorasyonu' panona kaydettiğin Pinlere benzer yeni ve yaratıcı fikirler bulduk.",
    "actual_url": "https://tr.pinterest.com/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Gerçek bir Pinterest içerik önerisini sildiniz.",
    "consequence_success": "Göndericinin resmi 'pinterest.com' alan adından geldiğini fark edip güvenli işaretlediniz."
  },
  {
    "id": 910,
    "category": "safe_social_email",
    "subject": "Sabah Koşusu aktiviten için tebrik aldın",
    "sender": "Strava <no-reply@strava.com>",
    "message_preview": "Tebrikler! Dünkü 'Sabah Koşusu' aktiviteniz için Mert ve 3 diğer kişiden 'Kudos' aldınız. Aktivitenizin detaylarını inceleyin.",
    "actual_url": "https://www.strava.com/dashboard",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Orijinal spor uygulaması etkileşimini sildiniz.",
    "consequence_success": "Resmi 'strava.com' alan adını kontrol ederek aktivite onayınızı güvenli olarak işaretlediniz."
  },
  {
    "id": 911,
    "category": "safe_social_email",
    "subject": "Rehberindeki bir kişi daha Goodreads'e katıldı",
    "sender": "Goodreads <no-reply@goodreads.com>",
    "message_preview": "E-posta rehberinizde bulunan Zeynep, az önce Goodreads'e katıldı. Ne okuduğunu görmek ve kitap tavsiyesi almak için onu arkadaş olarak ekleyin.",
    "actual_url": "https://www.goodreads.com/friend/requests",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Güvenli bir sosyal ağ davetiyesini oltalama sanarak sildiniz.",
    "consequence_success": "Göndericinin resmi 'goodreads.com' olduğunu doğrulayarak e-postayı kabul ettiniz."
  },
  {
    "id": 912,
    "category": "safe_social_email",
    "subject": "Gönderin yeniden bloglandı",
    "sender": "Tumblr <notification@tumblr.com>",
    "message_preview": "Sanat blogunda paylaştığın son görsel 'aesthetic-vibes' kullanıcısı tarafından yeniden bloglandı. Notları görmek için panona git.",
    "actual_url": "https://www.tumblr.com/dashboard",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Tumblr etkileşim e-postasını sildiniz ve blogunuzdaki aktiviteyi kaçırdınız.",
    "consequence_success": "Resmi 'tumblr.com' adresinden geldiğini teyit ederek e-postayı güvenli işaretlediniz."
  },
  {
    "id": 913,
    "category": "safe_social_email",
    "subject": "Hikayeniz 50 alkış aldı",
    "sender": "Medium <noreply@medium.com>",
    "message_preview": "Yazdığınız 'Yazılıma Yeni Başlayanlar İçin Tavsiyeler' adlı makale okuyuculardan toplam 50 alkış topladı! İstatistiklerinizi Medium Partner Program üzerinden inceleyin.",
    "actual_url": "https://medium.com/me/stats",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Güvenli makale istatistik e-postasını engelleyerek okuyucu etkileşimlerini göremediniz.",
    "consequence_success": "Göndericinin resmi 'medium.com' adresi olduğunu teyit ederek e-postayı kabul ettiniz."
  },
  {
    "id": 914,
    "category": "safe_social_email",
    "subject": "Pqueen şu an canlı yayında!",
    "sender": "Twitch <no-reply@twitch.tv>",
    "message_preview": "Takip ettiğiniz yayıncı Pqueen şu anda 'Sohbet ve Oyun' başlığıyla canlı yayında. Yayına katılmak ve sohbete dahil olmak için hemen tıklayın.",
    "actual_url": "https://www.twitch.tv/pqueen",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Gerçek bir Twitch yayın bildirimini sildiniz ve yayını kaçırdınız.",
    "consequence_success": "Resmi 'twitch.tv' alan adını kontrol ederek e-postanın güvenli olduğunu anladınız."
  },
  {
    "id": 915,
    "category": "safe_social_email",
    "subject": "Arkadaşların yeni Bitmoji kıyafetleri deniyor",
    "sender": "Snapchat <no_reply@snapchat.com>",
    "message_preview": "Snapchat'te arkadaşların Bitmoji avatarlarını yeni kış koleksiyonuyla güncelledi. Sen de kendi tarzını yansıtmak için dolabını kontrol et.",
    "actual_url": "https://www.snapchat.com/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Orijinal Snapchat eğlence bildirimini oltalama sanarak reddettiniz.",
    "consequence_success": "Göndericinin resmi 'snapchat.com' adresinden geldiğini fark edip güvenli işaretlediniz."
  },
  {
    "id": 916,
    "category": "safe_social_email",
    "subject": "BeReal zamanı! Arkadaşların fotoğraf paylaştı",
    "sender": "BeReal <contact@bereal.com>",
    "message_preview": "Zaman doluyor! Arkadaşların bugünkü BeReal fotoğraflarını paylaştı. Onların ne yaptığını görmek için sen de kendi BeReal'ını paylaş.",
    "actual_url": "https://bereal.com/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Gerçek BeReal uyarı mesajını silerek günlük paylaşım anını kaçırdınız.",
    "consequence_success": "Göndericinin resmi 'bereal.com' adresi olduğunu teyit ederek e-postayı kabul ettiniz."
  },
  {
    "id": 917,
    "category": "safe_social_email",
    "subject": "Merve, Kadıköy Moda Sahili'nde check-in yaptı",
    "sender": "Swarm <noreply@foursquare.com>",
    "message_preview": "Arkadaşın Merve az önce Kadıköy Moda Sahili mekanında check-in yaptı. Görünüşe göre sana çok yakın, hemen ona mesaj atabilirsin!",
    "actual_url": "https://tr.foursquare.com/swarm",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Orijinal Swarm konum bildirimini şüpheli bularak e-postayı engellediniz.",
    "consequence_success": "Foursquare'in resmi domaini olan 'foursquare.com'u kontrol ederek güvenli kabul ettiniz."
  },
  {
    "id": 918,
    "category": "safe_social_email",
    "subject": "Yeni bir mesajınız var: İstanbul seyahati hakkında",
    "sender": "Couchsurfing <noreply@couchsurfing.com>",
    "message_preview": "Gezgin 'Alex', önümüzdeki hafta İstanbul'a yapacağı seyahat için size bir mesaj gönderdi: 'Merhaba, evinde kalma şansım var mı?' Mesaja yanıt verin.",
    "actual_url": "https://www.couchsurfing.com/messages",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Güvenli seyahat ağı mesajını sildiniz ve gezginin mesajını yanıtsız bıraktınız.",
    "consequence_success": "Alan adının orijinal 'couchsurfing.com' olduğunu görerek güvenli olduğunu onayladınız."
  },
  {
    "id": 919,
    "category": "safe_social_email",
    "subject": "Grubunuzda yeni bir etkinlik planlandı",
    "sender": "Meetup <info@meetup.com>",
    "message_preview": "Üyesi olduğunuz 'İstanbul Doğa Yürüyüşleri' grubunda bu Pazar için yeni bir trekking etkinliği oluşturuldu. Katılımcı listesine eklenmek için LCV (Evet) yanıtı verin.",
    "actual_url": "https://www.meetup.com/home/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Gerçek bir topluluk etkinlik duyurusunu reddettiniz.",
    "consequence_success": "Resmi 'meetup.com' adresini kontrol ederek işlemin güvenli olduğunu anladınız."
  },
  {
    "id": 920,
    "category": "safe_social_email",
    "subject": "Çalma listeni beğenenler artıyor",
    "sender": "Spotify <no-reply@spotify.com>",
    "message_preview": "Oluşturduğun 'Yolculuk Şarkıları' isimli çalma listesi bu hafta 5 yeni kişi tarafından daha kaydedildi! İnsanlar müzik zevkini çok beğendi.",
    "actual_url": "https://open.spotify.com/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Gerçek bir Spotify topluluk bildirimini sildiniz.",
    "consequence_success": "Gönderici alan adının orijinal 'spotify.com' olduğunu bilerek işlemi onayladınız."
  },
  {
    "id": 921,
    "category": "safe_social_email",
    "subject": "Someone starred your repository",
    "sender": "GitHub <noreply@github.com>",
    "message_preview": "developer_ali just starred your repository 'weather-app-react'. Keep up the good work and check out who else is following your projects.",
    "actual_url": "https://github.com/notifications",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Güvenli bir GitHub geliştirici ağı bildirimini sildiniz.",
    "consequence_success": "Göndericinin resmi 'github.com' alan adından geldiğini görerek işlemi güvenli kabul ettiniz."
  },
  {
    "id": 922,
    "category": "safe_social_email",
    "subject": "Bir kullanıcı sorusunu yanıtlamanı istedi",
    "sender": "Quora <info@quora.com>",
    "message_preview": "Ahmet, teknoloji alanındaki deneyimlerine dayanarak şu soruyu yanıtlamanı talep etti: 'Yapay zeka gelecekte hangi meslekleri bitirecek?'",
    "actual_url": "https://tr.quora.com/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Orijinal Quora soru talebini oltalama zannederek sildiniz.",
    "consequence_success": "Resmi 'quora.com' domainini kontrol ederek e-postanın güvenli olduğunu anladınız."
  },
  {
    "id": 923,
    "category": "safe_social_email",
    "subject": "burak_kaya seni Threads'de takip etmeye başladı",
    "sender": "Threads <no-reply@mail.threads.net>",
    "message_preview": "Threads ağına yeni katılan arkadaşın burak_kaya seni takip etmeye başladı. Onunla sohbete başlamak için hemen Threads uygulamasını aç.",
    "actual_url": "https://www.threads.net/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Güvenli yeni sosyal ağ takipçi bildirimini reddederek belgeyi sildiniz.",
    "consequence_success": "Alan adının resmi 'mail.threads.net' olduğunu doğrulayarak e-postayı güvenli kabul ettiniz."
  },
  {
    "id": 924,
    "category": "safe_social_email",
    "subject": "Videonuz yeni bir beğeni aldı",
    "sender": "Vimeo <noreply@vimeo.com>",
    "message_preview": "Harika haber! 'Kısa Film Projemiz' adlı videonuz az önce yeni bir beğeni kazandı. İstatistikleri görmek için profilinizi ziyaret edin.",
    "actual_url": "https://vimeo.com/analytics",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Resmi bir Vimeo etkileşim e-postasını sahte sanarak erişimi kapattınız.",
    "consequence_success": "Göndericinin resmi 'vimeo.com' adresinden geldiğini fark edip güvenli işaretlediniz."
  },
  {
    "id": 925,
    "category": "safe_social_email",
    "subject": "Kişilerinizden biri Telegram'a katıldı!",
    "sender": "Telegram <noreply@telegram.org>",
    "message_preview": "Telefon rehberinizde bulunan Ayşe Demir az önce Telegram kullanmaya başladı. Ona bir 'Merhaba' çıkartması gönderin ve sohbeti başlatın.",
    "actual_url": "https://web.telegram.org/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Orijinal mesajlaşma uygulaması katılım bildirimini sildiniz.",
    "consequence_success": "Resmi 'telegram.org' alan adını kontrol ederek bağlantınızı güvenli olarak işaretlediniz."
  },
  {
    "id": 1001,
    "category": "safe_system_email",
    "subject": "Siteniz WordPress 6.5 sürümüne güncellendi",
    "sender": "WordPress.com <donotreply@wordpress.com>",
    "message_preview": "Web siteniz otomatik arka plan güncellemeleri kapsamında en yeni WordPress 6.5 sürümüne başarıyla güncellenmiştir. Herhangi bir işlem yapmanıza gerek yoktur.",
    "actual_url": "https://wordpress.com/settings",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Gerçek bir sistem güncelleme bilgisini sildiniz ve web sitenizin sürüm durumunu takip edemediniz.",
    "consequence_success": "Gönderici adresinin resmi 'wordpress.com' olduğunu doğrulayarak sistem bildirimini güvenli kabul ettiniz."
  },
  {
    "id": 1002,
    "category": "safe_system_email",
    "subject": "iCloud saklama alanınız dolmak üzere",
    "sender": "Apple <noreply@email.apple.com>",
    "message_preview": "iCloud saklama alanınızın %95'ini kullandınız. Fotoğraflarınızın ve belgelerinizin yedeklenmeye devam etmesi için alan açın veya planınızı yükseltin.",
    "actual_url": "https://www.icloud.com/settings",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Resmi bir sistem depolama uyarısını reddettiniz ve yedeklemelerinizin durmasına sebep oldunuz.",
    "consequence_success": "Apple'ın resmi bilgilendirme adresi olan 'email.apple.com'u tanıyıp e-postayı güvenli işaretlediniz."
  },
  {
    "id": 1003,
    "category": "safe_system_email",
    "subject": "Planlı Bakım Kesintisi Bildirimi",
    "sender": "Google Workspace <workspace-noreply@google.com>",
    "message_preview": "Sistem altyapımızı geliştirmek amacıyla 18 Haziran Pazar günü 02:00 - 04:00 saatleri arasında Google Workspace hizmetlerinde planlı bir bakım yapılacaktır.",
    "actual_url": "https://workspace.google.com/dashboard",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Sistem bakım bildirimini oltalama zannederek sildiniz ve kesinti saatlerinde hazırlıksız yakalandınız.",
    "consequence_success": "Alan adının resmi 'google.com' olduğunu doğrulayarak bakım duyurusunu güvenli olarak işaretlediniz."
  },
  {
    "id": 1004,
    "category": "safe_system_email",
    "subject": "Zoom Hizmet Şartları Güncellemesi",
    "sender": "Zoom <info@zoom.us>",
    "message_preview": "Hizmet Şartları ve Gizlilik Politikası metinlerimizde güncellemeler yaptık. Değişiklikler 1 Temmuz tarihinden itibaren geçerli olacaktır. Detayları okumak için tıklayın.",
    "actual_url": "https://zoom.us/terms",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Yasal bir politika güncelleme e-postasını sahte sanarak erişimi kapattınız.",
    "consequence_success": "Göndericinin resmi 'zoom.us' alan adından geldiğini görerek bilgilendirmeyi güvenli kabul ettiniz."
  },
  {
    "id": 1005,
    "category": "safe_system_email",
    "subject": "[GitHub] Run failed: Build and Test",
    "sender": "GitHub Actions <notifications@github.com>",
    "message_preview": "Projenizdeki 'Build and Test' isimli GitHub Actions iş akışı hata vererek sonlandı. Hata loglarını incelemek ve sorunu çözmek için depodaki Actions sekmesine gidin.",
    "actual_url": "https://github.com/features/actions",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Geliştirici sistem hata bildirimini silerek projenizdeki sorunu fark etmeyi geciktirdiniz.",
    "consequence_success": "Resmi 'github.com' adresinden geldiğini teyit ederek sistem uyarısını onayladınız."
  },
  {
    "id": 1006,
    "category": "safe_system_email",
    "subject": "[AWS] Amazon EC2 Scheduled Maintenance",
    "sender": "Amazon Web Services <no-reply-aws@amazon.com>",
    "message_preview": "Amazon EC2 bulut sunucularınızdan biri için donanım bakımı planlanmıştır. Sunucunuz belirtilen tarihte kısa süreliğine yeniden başlatılacaktır.",
    "actual_url": "https://console.aws.amazon.com/ec2/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Önemli bir sunucu bakım e-postasını sildiniz.",
    "consequence_success": "Resmi 'amazon.com' AWS bildirim adresini doğrulayarak işlemi güvenli buldunuz."
  },
  {
    "id": 1007,
    "category": "safe_system_email",
    "subject": "Slack çalışma alanı verileriniz dışa aktarıldı",
    "sender": "Slack <feedback@slack.com>",
    "message_preview": "Talep ettiğiniz Slack çalışma alanı verileri başarıyla dışa aktarıldı. Zip dosyasını indirme bağlantınız sistem yöneticisi panelinizde hazırdır.",
    "actual_url": "https://slack.com/workspace-settings",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Sistem tarafından üretilen veri aktarım linkini sahte sanarak indirmeyi reddettiniz.",
    "consequence_success": "Göndericinin resmi 'slack.com' adresi olduğunu doğrulayarak sistem mesajını kabul ettiniz."
  },
  {
    "id": 1008,
    "category": "safe_system_email",
    "subject": "cPanel: Backup successfully completed",
    "sender": "cPanel <no-reply@cpanel.net>",
    "message_preview": "Web sunucunuzdaki günlük yedekleme işlemi (Full Backup) başarıyla tamamlandı. Yedek dosyanız belirlenen uzak FTP sunucusuna aktarıldı.",
    "actual_url": "https://cpanel.net/products/cpanelwhm/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Sistem yedekleme raporunu silerek sunucu durumunu teyit etme fırsatını kaçırdınız.",
    "consequence_success": "Resmi 'cpanel.net' adresinden gelen otomatik sistem e-postasını güvenli işaretlediniz."
  },
  {
    "id": 1009,
    "category": "safe_system_email",
    "subject": "Discord Gizlilik Politikası'nda Yapılan Değişiklikler",
    "sender": "Discord <noreply@discord.com>",
    "message_preview": "Discord deneyimini şeffaf tutmak adına Gizlilik Politikamızı güncelledik. Verilerinizin nasıl kullanıldığını öğrenmek için özet metnimizi okuyabilirsiniz.",
    "actual_url": "https://discord.com/privacy",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Yasal bir sistem politikasını oltalama sanarak sildiniz.",
    "consequence_success": "Alan adının resmi 'discord.com' olduğunu görerek güvenli olduğunu onayladınız."
  },
  {
    "id": 1010,
    "category": "safe_system_email",
    "subject": "Cloudflare Weekly Analytics Report",
    "sender": "Cloudflare <noreply@notify.cloudflare.com>",
    "message_preview": "Geçtiğimiz hafta web sitenize yönelik 12.045 istek Cloudflare ağında başarıyla yönlendirildi ve 32 potansiyel tehdit engellendi. Raporun tamamı ektedir.",
    "actual_url": "https://dash.cloudflare.com/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Güvenli bir sistem güvenlik raporunu reddettiniz.",
    "consequence_success": "Cloudflare'in resmi bildirim domainini kontrol ederek e-postanın güvenli olduğunu anladınız."
  },
  {
    "id": 1011,
    "category": "safe_system_email",
    "subject": "Cihazınız için yeni bir Windows güncellemesi hazır",
    "sender": "Microsoft Windows <windows-noreply@microsoft.com>",
    "message_preview": "Windows 11 için özellik güncelleştirmesi cihazınıza indirilmeye hazır. Performans artışı ve yeni güvenlik yamaları içeren bu sürümü yüklemek için Ayarlar'a gidin.",
    "actual_url": "https://support.microsoft.com/windows",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Gerçek bir işletim sistemi güncelleme bildirimini sildiniz.",
    "consequence_success": "Microsoft'un resmi 'microsoft.com' adresinden geldiğini doğrulayarak işlemi güvenli buldunuz."
  },
  {
    "id": 1012,
    "category": "safe_system_email",
    "subject": "Scheduled Maintenance for Notion Workspace",
    "sender": "Notion <team@mail.notion.so>",
    "message_preview": "Notion veritabanı altyapımızda gerçekleştirilecek bakım çalışması nedeniyle sistemimiz bu hafta sonu 1 saatliğine salt okunur (read-only) modda olacaktır.",
    "actual_url": "https://status.notion.so/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Sistem kesintisi uyarısını reddederek çalışma saatlerinizde sorun yaşadınız.",
    "consequence_success": "Notion'ın resmi bildirim adresi olan 'mail.notion.so'yu tanıyıp e-postayı güvenli işaretlediniz."
  },
  {
    "id": 1013,
    "category": "safe_system_email",
    "subject": "Dropbox: Yeni masaüstü uygulamamızı deneyin",
    "sender": "Dropbox <no-reply@dropbox.com>",
    "message_preview": "Eşzamanlama (sync) performansını iki katına çıkardığımız yeni Dropbox masaüstü uygulaması yayınlandı. Sistem tepsisi üzerinden güncellemenizi başlatabilirsiniz.",
    "actual_url": "https://www.dropbox.com/install",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Gerçek bir yazılım güncelleme bilgilendirmesini sahte sanarak erişimi kapattınız.",
    "consequence_success": "Alan adının orijinal 'dropbox.com' olduğunu teyit edip güvenli işaretlediniz."
  },
  {
    "id": 1014,
    "category": "safe_system_email",
    "subject": "PlayStation Network Hizmet Şartları Güncellendi",
    "sender": "PlayStation <sony@email.sonyentertainmentnetwork.com>",
    "message_preview": "PSN (PlayStation Network) hizmet şartlarında satın alma kurallarını etkileyen önemli bir değişiklik yapılmıştır. Konsolunuza giriş yapmadan önce metni onaylamanız istenecektir.",
    "actual_url": "https://www.playstation.com/legal/psn-terms-of-service/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Orijinal sistem kural değişikliğini spam olarak sildiniz.",
    "consequence_success": "Sony'nin resmi ağ alan adını kontrol ederek e-postayı güvenli kabul ettiniz."
  },
  {
    "id": 1015,
    "category": "safe_system_email",
    "subject": "GeForce NOW Sunucu Bakım Bilgilendirmesi",
    "sender": "NVIDIA <noreply@nvidia.com>",
    "message_preview": "Avrupa sunucularımızda oyun deneyimini iyileştirmek amacıyla planlı donanım iyileştirmesi yapılacaktır. Sistem durumu sayfasından güncel durumu takip edebilirsiniz.",
    "actual_url": "https://status.geforcenow.com/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Gerçek bir Nvidia sunucu uyarısını reddederek oyun sırasında bağlantı sorunu yaşadınız.",
    "consequence_success": "Göndericinin resmi 'nvidia.com' olduğunu doğrulayarak e-postayı kabul ettiniz."
  },
  {
    "id": 1016,
    "category": "safe_system_email",
    "subject": "Vercel: Deployment Successful",
    "sender": "Vercel <notifications@vercel.com>",
    "message_preview": "Harika haber! Vercel platformuna bağladığınız 'my-portfolio' projesi ana dalda (main branch) başarıyla derlendi ve yayına alındı.",
    "actual_url": "https://vercel.com/dashboard",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Güvenli bir sistem yayınlama (deployment) bildirimini sildiniz.",
    "consequence_success": "Alan adının resmi 'vercel.com' olduğunu görerek güvenli olduğunu onayladınız."
  },
  {
    "id": 1017,
    "category": "safe_system_email",
    "subject": "Scheduled Downtime for Figma",
    "sender": "Figma <support@figma.com>",
    "message_preview": "Figma dosyalarınızın güvenliği ve hızı için veritabanı göçü gerçekleştiriyoruz. Sistem 45 dakika boyunca çevrimdışı olacaktır. Kayıtlı dosyalarınız etkilenmeyecektir.",
    "actual_url": "https://status.figma.com/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Sistem kesinti uyarısını sildiniz ve proje çalışmanız kesintiye uğradı.",
    "consequence_success": "Göndericinin resmi 'figma.com' adresinden geldiğini fark edip güvenli işaretlediniz."
  },
  {
    "id": 1018,
    "category": "safe_system_email",
    "subject": "Jira Cloud: System Update Notification",
    "sender": "Atlassian <noreply@atlassian.com>",
    "message_preview": "Jira Cloud çalışma alanınız yeni özelliklere ve geliştirilmiş arayüze geçirildi. Yeni sprint panoları hakkında bilgi almak için sürüm notlarına göz atın.",
    "actual_url": "https://status.atlassian.com/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Orijinal yazılım güncelleme notunu oltalama sanarak sildiniz.",
    "consequence_success": "Resmi 'atlassian.com' domainini kontrol ederek e-postanın güvenli olduğunu anladınız."
  },
  {
    "id": 1019,
    "category": "safe_system_email",
    "subject": "Your Audience Export is Ready",
    "sender": "Mailchimp <hello@mailchimp.com>",
    "message_preview": "İşlem tamamlandı! Sistemden talep ettiğiniz e-posta bülteni abone listenizin CSV dosyası indirmeye hazırdır. Dosya güvenliğiniz için 24 saat içinde silinecektir.",
    "actual_url": "https://login.mailchimp.com/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Sistem veri çıktısını şüpheli bularak e-postayı engellediniz.",
    "consequence_success": "Alan adının orijinal 'mailchimp.com' olduğunu teyit edip güvenli işaretlediniz."
  },
  {
    "id": 1020,
    "category": "safe_system_email",
    "subject": "Samsung Hesabı Gizlilik Bildirimi Güncellemesi",
    "sender": "Samsung Account <noreply@samsung-account.com>",
    "message_preview": "Değerli kullanıcımız, cihaz ve hizmet verilerinizin işlenme süreçlerini daha açık hale getirmek için Samsung Hesabı Gizlilik Bildirimi güncellenmiştir.",
    "actual_url": "https://account.samsung.com/membership/policy/privacy",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Gerçek bir sistem gizlilik uyarısını reddettiniz.",
    "consequence_success": "Resmi 'samsung-account.com' adresini kontrol ederek işlemin güvenli olduğunu anladınız."
  },
  {
    "id": 1021,
    "category": "safe_system_email",
    "subject": "Creative Cloud Bulut Depolama Alanınız Hakkında",
    "sender": "Adobe <message@adobe.com>",
    "message_preview": "Sistem politikalarımızdaki güncelleme nedeniyle Adobe Creative Cloud klasör eşzamanlama hizmeti sonlandırılmaktadır. Dosyalarınız bilgisayarınızda kalmaya devam edecektir.",
    "actual_url": "https://creativecloud.adobe.com/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Resmi bir sistem altyapı değişikliğini sildiniz ve dosya yönetimi konusunda habersiz kaldınız.",
    "consequence_success": "Göndericinin resmi 'adobe.com' olduğunu doğrulayarak e-postayı kabul ettiniz."
  },
  {
    "id": 1022,
    "category": "safe_system_email",
    "subject": "[Heroku] Upcoming Platform Maintenance",
    "sender": "Heroku <bot@heroku.com>",
    "message_preview": "Heroku Postgres veri tabanlarında rutin bir sistem bakımı planlanmıştır. Bu süre zarfında veri tabanınız birkaç saniyeliğine çevrimdışı kalabilir.",
    "actual_url": "https://status.heroku.com/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Önemli veritabanı bakım e-postasını sahte sanarak uygulamalarınızdaki kesintiye hazırlıksız yakalandınız.",
    "consequence_success": "Göndericinin resmi 'heroku.com' alan adından geldiğini görerek işlemi güvenli kabul ettiniz."
  },
  {
    "id": 1023,
    "category": "safe_system_email",
    "subject": "Droplet Reboot Required for Security Update",
    "sender": "DigitalOcean <support@support.digitalocean.com>",
    "message_preview": "Sunucunuzun (Droplet) güvenliğini sağlamak için kritik bir çekirdek (kernel) yamasının uygulandığı sistem güncellemesi yayınlandı. Lütfen kontrol panelinden sunucunuzu yeniden başlatın.",
    "actual_url": "https://cloud.digitalocean.com/droplets",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Güvenli bir sistem altyapı uyarısını engelleyerek sunucunuzu riske attınız.",
    "consequence_success": "Resmi 'digitalocean.com' bildirim domainini kontrol ederek e-postanın güvenli olduğunu anladınız."
  },
  {
    "id": 1024,
    "category": "safe_system_email",
    "subject": "Kaspersky Veritabanı Başarıyla Güncellendi",
    "sender": "Kaspersky <noreply@kaspersky.com>",
    "message_preview": "Kaspersky Antivirüs sisteminizin virüs tanımlama veritabanı son sürüme başarıyla güncellendi. Bilgisayarınız yeni tehditlere karşı koruma altındadır.",
    "actual_url": "https://my.kaspersky.com/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Gerçek bir güvenlik yazılımı sistem raporunu sildiniz.",
    "consequence_success": "Alan adının orijinal 'kaspersky.com' olduğunu teyit edip güvenli işaretlediniz."
  },
  {
    "id": 1025,
    "category": "safe_system_email",
    "subject": "Steam İstemci Güncellemesi Yayınlandı",
    "sender": "Steam <noreply@steampowered.com>",
    "message_preview": "Steam masaüstü istemcisi için yeni bir sistem güncellemesi indirildi. Yeni indirme arayüzü ve performans iyileştirmelerini uygulamak için Steam'i yeniden başlatın.",
    "actual_url": "https://store.steampowered.com/news/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Sistem güncelleme bildirimini oltalama sanarak reddettiniz.",
    "consequence_success": "Resmi 'steampowered.com' adresinden geldiğini teyit ederek yazılım bildirimini onayladınız."
  },
  {
    "id": 1201,
    "category": "workplace_safe",
    "subject": "Yeni bir direkt mesajınız var: Proje Güncellemesi",
    "sender": "Slack <notifications@slack.com>",
    "message_preview": "Slack çalışma alanınızda Caner size yeni bir direkt mesaj gönderdi: 'Merhaba, bugünkü toplantı notlarını wikiye ekledim, inceleyebilir misin?'",
    "actual_url": "https://app.slack.com/client",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Ekip içi iletişim bildirimini sildiniz ve çalışma arkadaşınızın mesajına geç yanıt verdiniz.",
    "consequence_success": "Göndericinin resmi 'slack.com' adresi olduğunu doğrulayarak bildirimi güvenli işaretlediniz."
  },
  {
    "id": 1202,
    "category": "workplace_safe",
    "subject": "Zeynep sizi bir mesajda etiketledi",
    "sender": "Microsoft Teams <noreply@email.teams.microsoft.com>",
    "message_preview": "Zeynep, 'Pazarlama Kampanyası Q3' kanalında sizden bahsetti: '@isim Lütfen bütçe tablosunun son halini onaylar mısın?'",
    "actual_url": "https://teams.microsoft.com/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Microsoft Teams bildirimini reddederek iş akışındaki önemli bir talebi kaçırdınız.",
    "consequence_success": "Microsoft'un resmi e-posta adresini kontrol edip e-postayı güvenle açtınız."
  },
  {
    "id": 1203,
    "category": "workplace_safe",
    "subject": "[JIRA] Yeni Görev Atandı: PROJ-402 Arayüz Optimizasyonu",
    "sender": "Jira <jira@atlassian.com>",
    "message_preview": "Proje yöneticiniz tarafından adınıza yeni bir görev atandı. Görev detaylarını ve kabul kriterlerini incelemek için Jira panonuza gidin.",
    "actual_url": "https://yourcompany.atlassian.net/browse/PROJ-402",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Güvenli bir görev atama e-postasını sahte sanarak göreve başlamakta geciktiniz.",
    "consequence_success": "Alan adının orijinal 'atlassian.com' olduğunu görerek güvenli olduğunu onayladınız."
  },
  {
    "id": 1204,
    "category": "workplace_safe",
    "subject": "Bulut kaydı hazır: Haftalık Pazarlama Toplantısı",
    "sender": "Zoom <no-reply@zoom.us>",
    "message_preview": "Bugün saat 14:00'te gerçekleştirdiğiniz 'Haftalık Pazarlama Toplantısı'nın bulut kaydı ve yapay zeka tarafından oluşturulan özet notları izlenmeye hazırdır.",
    "actual_url": "https://zoom.us/recording",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Toplantı kaydı bildirimini sildiniz ve notlara erişimi kaybettiniz.",
    "consequence_success": "Göndericinin resmi 'zoom.us' alan adından geldiğini teyit ederek bağlantıyı güvenle açtınız."
  },
  {
    "id": 1205,
    "category": "workplace_safe",
    "subject": "Haziran 2026 Maaş Bordronuz Yüklendi",
    "sender": "Kolay İK <noreply@kolayik.com>",
    "message_preview": "Değerli çalışanımız, Haziran 2026 dönemine ait maaş bordronuz sisteme yüklenmiştir. Detayları görüntülemek için personel hesabınıza giriş yapabilirsiniz.",
    "actual_url": "https://app.kolayik.com/bordro",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Resmi bordro bilgilendirmesini sahte zannederek maaş detaylarınızı incelemediniz.",
    "consequence_success": "İnsan kaynakları yazılımının resmi adresini kontrol ederek işlemi güvenli olarak kabul ettiniz."
  },
  {
    "id": 1206,
    "category": "workplace_safe",
    "subject": "\"Q3 Strateji Sunumu\" adlı doküman sizinle paylaşıldı",
    "sender": "Google Drive <drive-shares-noreply@google.com>",
    "message_preview": "Yöneticiniz, incelemeniz ve yorum yapmanız için 'Q3 Strateji Sunumu' adlı Google Slaytlar dosyasını sizinle paylaştı. Dokümanı açmak için tıklayın.",
    "actual_url": "https://docs.google.com/presentation/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Güvenli dosya paylaşım bildirimini engelleyerek ortak çalışmaya katılamadınız.",
    "consequence_success": "Göndericinin resmi 'google.com' olduğunu doğrulayarak dokümanı güvenle açtınız."
  },
  {
    "id": 1207,
    "category": "workplace_safe",
    "subject": "Ayşe, \"Ürün Lansman Planı\" sayfasında sizden bahsetti",
    "sender": "Confluence <confluence@atlassian.com>",
    "message_preview": "Ayşe, Confluence üzerindeki 'Ürün Lansman Planı' sayfasına bir yorum bıraktı ve sizden bahsetti: 'Bu konudaki teknik gereksinimleri ekleyebilir misin?'",
    "actual_url": "https://yourcompany.atlassian.net/wiki/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Şirket içi bilgi bankası bildirimini sildiniz ve dokümantasyon eksik kaldı.",
    "consequence_success": "Resmi 'atlassian.com' alan adını teyit edip e-postayı güvenli işaretlediniz."
  },
  {
    "id": 1208,
    "category": "workplace_safe",
    "subject": "[Talep #4829] Yeni Monitör Talebiniz Çözümlendi",
    "sender": "BT Destek Masası <support@zendesk.com>",
    "message_preview": "Sayın çalışanımız, oluşturduğunuz 'Ek Monitör Talebi' başlıklı destek kaydı (Talep #4829) BT departmanı tarafından çözümlenmiştir. Donanımınız masanıza bırakılmıştır.",
    "actual_url": "https://yourcompany.zendesk.com/hc/requests/4829",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "BT destek masası güncellemesini sahte sanarak talebinizin durumundan habersiz kaldınız.",
    "consequence_success": "Zendesk'in resmi destek e-postasını tanıyarak bildirimi onayladınız."
  },
  {
    "id": 1209,
    "category": "workplace_safe",
    "subject": "Hatırlatma: Görevinizin süresi bugün doluyor",
    "sender": "Asana <no-reply@asana.com>",
    "message_preview": "Bu bir hatırlatmadır: Atanmış olduğunuz 'Müşteri Performans Raporunu Tamamla' görevinin son teslim tarihi bugün 17:00'dir. Görevi tamamlandı olarak işaretlemeyi unutmayın.",
    "actual_url": "https://app.asana.com/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Proje yönetim hatırlatmasını reddederek iş teslimini geciktirdiniz.",
    "consequence_success": "Alan adının orijinal 'asana.com' olduğunu görerek görevinizi zamanında tamamladınız."
  },
  {
    "id": 1210,
    "category": "workplace_safe",
    "subject": "Review requested: Update payment gateway integration",
    "sender": "GitHub <notifications@github.com>",
    "message_preview": "Takım arkadaşınız, 'Update payment gateway integration' adlı Pull Request (PR) işlemi için kod incelemesi yapmanızı talep etti. İlgili satırları incelemek için GitHub'a gidin.",
    "actual_url": "https://github.com/company/repo/pull/45",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Güvenli bir geliştirici kod inceleme isteğini sildiniz ve proje sürecini yavaşlattınız.",
    "consequence_success": "Göndericinin resmi 'github.com' alan adından geldiğini fark edip güvenli işaretlediniz."
  },
  {
    "id": 1211,
    "category": "workplace_safe",
    "subject": "Masraf Raporunuz Onaylandı",
    "sender": "SAP Concur <AutoNotification@concursolutions.com>",
    "message_preview": "Yöneticiniz 'Mayıs 2026 Müşteri Ziyareti' adlı seyahat masraf raporunuzu onayladı. Ödemeniz, bir sonraki maaş ödemesiyle birlikte hesabınıza yatırılacaktır.",
    "actual_url": "https://www.concursolutions.com/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Resmi şirket masraf onay bildirimini oltalama sanarak sildiniz.",
    "consequence_success": "SAP Concur'un resmi e-posta adresini doğrulayarak işlemin güvenli olduğunu anladınız."
  },
  {
    "id": 1212,
    "category": "workplace_safe",
    "subject": "Şirket İçi Eğitim: Yeni Veri Güvenliği Politikaları",
    "sender": "Workday <workday@myworkday.com>",
    "message_preview": "Tüm çalışanlarımızın dikkatine: 2026 yılı güncel 'Veri Güvenliği ve KVKK Eğitimi' profilinize atanmıştır. Lütfen ay sonuna kadar eğitim modülünü tamamlayın.",
    "actual_url": "https://www.myworkday.com/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "İnsan kaynakları eğitim bildirimini reddettiniz ve zorunlu şirket eğitimini kaçırdınız.",
    "consequence_success": "Göndericinin resmi 'myworkday.com' adresi olduğunu teyit ederek e-postayı kabul ettiniz."
  },
  {
    "id": 1213,
    "category": "workplace_safe",
    "subject": "Yöneticiniz size bir kurs önerdi: Etkili Zaman Yönetimi",
    "sender": "LinkedIn Learning <learning-noreply@linkedin.com>",
    "message_preview": "Yöneticiniz profesyonel gelişiminize katkı sağlaması amacıyla size LinkedIn Learning üzerinden 'Etkili Zaman Yönetimi ve Verimlilik' kursunu önerdi. Kursa başlamak için tıklayın.",
    "actual_url": "https://www.linkedin.com/learning/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Güvenli kurumsal eğitim önerisini spam olarak işaretlediniz.",
    "consequence_success": "Resmi 'linkedin.com' alan adını kontrol ederek e-postanın güvenli olduğunu anladınız."
  },
  {
    "id": 1214,
    "category": "workplace_safe",
    "subject": "Yeni Etkinlik: Proje Değerlendirme Toplantısı",
    "sender": "Calendly <notifications@calendly.com>",
    "message_preview": "Müşterimiz sizinle 45 dakikalık bir 'Proje Değerlendirme Toplantısı' ayarladı. Toplantı detayı ve konferans bağlantısı takviminize otomatik olarak eklendi.",
    "actual_url": "https://calendly.com/events/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Müşteri toplantı bildirimini sildiniz ve toplantı saatini unuttunuz.",
    "consequence_success": "Calendly'nin resmi bildirim adresini doğrulayarak toplantıyı takviminize işlediniz."
  },
  {
    "id": 1215,
    "category": "workplace_safe",
    "subject": "Tasarımda yeni bir yorumunuz var",
    "sender": "Figma <figma@figma.com>",
    "message_preview": "Merve, 'Mobil App Tasarımı v2' adlı Figma dosyanıza bir yorum bıraktı: 'Buradaki butonun rengini marka paletine göre güncelleyelim.' Yorumu görmek için dosyaya gidin.",
    "actual_url": "https://www.figma.com/file/",
    "danger_level": "safe",
    "expected_action": "accept",
    "consequence_fail": "Tasarım aracı geri bildirimini oltalama sanarak erişimi kapattınız.",
    "consequence_success": "Göndericinin resmi 'figma.com' olduğunu doğrulayarak tasarım revizyonunu güvenle incelediniz."
  }
];


export const mockEmails = rawEmails.map(email => {
  const senderStr = email.sender || "";
  
  // Extract Name and Email from combined sender field
  let senderName = senderStr;
  let senderEmail = "";
  
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})/;
  const emailMatch = senderStr.match(emailRegex);
  
  if (emailMatch) {
    senderEmail = emailMatch[1].trim();
    senderName = senderStr.replace(emailMatch[0], "").replace(/[<>]/g, "").trim();
    if (!senderName) {
      senderName = senderEmail.split('@')[0];
    }
  }

  const isSafe = email.expected_action === 'accept';

  return {
    id: email.id,
    category: email.category,
    sender: senderName,
    senderEmail: senderEmail,
    subject: email.subject || '✉️ Yeni Bildirim',
    body: email.message_preview,
    linkText: isSafe ? "Detayları Göster" : "Hesabı Güncelle ve Doğrula",
    actualUrl: email.actual_url || "",
    isSafe: isSafe,
    consequenceSuccess: email.consequence_success,
    consequenceFail: email.consequence_fail || "Güvenlik kararı doğrultusunda verilerinizi koruyamadınız.",
    dangerLevel: email.danger_level
  };
});

export const mockPasswords = [
  {
    "id": 1,
    "text": "12345678",
    "strength": "weak",
    "explanation": "Ardışık sayılar en yaygın ve en zayıf şifreler arasındadır. Bilgisayar saniyeler içinde kırabilir. Hiçbir harf veya özel karakter içermiyor."
  },
  {
    "id": 2,
    "text": "password",
    "strength": "weak",
    "explanation": "İnsan yapımı en zayıf şifredir. 'password' kelimesi sözlüklerde vardır ve saldırganlar ilk olarak bunu denerler. Ayrıca tümü küçük harften oluşmuştur."
  },
  {
    "id": 3,
    "text": "admin123",
    "strength": "weak",
    "explanation": "Varsayılan admin şifrelerinden biridir. Çok yaygın olduğu için saldırganlar bunu özel olarak denerler. Ardışık sayı (123) ile bittişi zayıflığını arttırır."
  },
  {
    "id": 4,
    "text": "qwerty123",
    "strength": "weak",
    "explanation": "Klavyeyi soldan sağa kaydırmakla oluşturulmuştur. Bilgisayar bu tür düzenleri çok hızlı tanır ve kırar. Çok popüler bir kalıptır."
  },
  {
    "id": 5,
    "text": "123456",
    "strength": "weak",
    "explanation": "Belki de dünyanın en zayıf şifresidir. Ardışık sayılar saldırganların ilk denemesidir. Hiç harf yok, hiç karakter yok."
  },
  {
    "id": 6,
    "text": "abc123",
    "strength": "weak",
    "explanation": "Basit harf-sayı kombinasyonu ama çok kısa (6 karakter). Şifreler en az 8-12 karakter olmalıdır. Bu da sözlük saldırısına açıktır."
  },
  {
    "id": 7,
    "text": "welcome",
    "strength": "weak",
    "explanation": "Basit İngilizce kelime olarak veritabanlarında bulunur. Tümü küçük harf, sayı yok, özel karakter yok. 3 kriterde de başarısız olmuştur."
  },
  {
    "id": 8,
    "text": "monkey123",
    "strength": "weak",
    "explanation": "Sözlükte olan bir kelime + ardışık sayı kombinasyonu. Bilgisayar 'monkey' kelimesini bilir ve 123 eklemeleri standart deneme tekniğidir."
  },
  {
    "id": 9,
    "text": "1234567890",
    "strength": "weak",
    "explanation": "Uzun olmasına rağmen ardışık sayılardan oluşmuştur. Kalıp, uzunluktan daha önemlidir. Harf ve özel karakter eksikliği onu kırılgan yapar."
  },
  {
    "id": 10,
    "text": "111111",
    "strength": "weak",
    "explanation": "Aynı rakamı 6 kez yazılması. İnsan yapımı en kolay şifrelerden biridir. Bilgisayar saniyeler içinde deneyip kırar."
  },
  {
    "id": 11,
    "text": "pass123",
    "strength": "weak",
    "explanation": "'pass' kelimesi sözlükte yaygındır ve 123 eklenmesi çok standart bir taktiktir. Bu kombinasyon milyonlar tarafından kullanılmıştır."
  },
  {
    "id": 12,
    "text": "letmein",
    "strength": "weak",
    "explanation": "Sözlükte bulunan iki kelime. Özel karakter ve sayı yoktur. En yaygın zayıf şifreler listesinde ilk 10'da yer almıştır."
  },
  {
    "id": 13,
    "text": "asdfgh",
    "strength": "weak",
    "explanation": "Klavyenin sol tarafındaki ardışık tuşlar. Bilgisayar bu tür fiziksel kalıpları çok iyi tanır. Kırmak sadece saniye meselesidir."
  },
  {
    "id": 14,
    "text": "user123",
    "strength": "weak",
    "explanation": "'user' çok genel bir kelimedir ve veritabanlarında sık bulunur. 123 eklemesi standart denemelerdir. Hiç özel karakter yok."
  },
  {
    "id": 15,
    "text": "12121212",
    "strength": "weak",
    "explanation": "Tekrar eden kalıp (12 tekrarı). İnsan yapımı kalıplar bilgisayar tarafından çabucak tanınır. Rastgele görünse de aslında öngörülebilirdir."
  },
  {
    "id": 16,
    "text": "Galatasaray1905!",
    "strength": "weak",
    "explanation": "Büyük harf + sayı + özel karakter var ama sorun: Galatasaray gerçek kelimedir ve kuruluş tarihi (1905) açıkça bilinir. Kişisel bilgi ve tarihsel veriler sözlük saldırılarında kullanılır."
  },
  {
    "id": 17,
    "text": "MaviKedi2025!",
    "strength": "weak",
    "explanation": "Birbiriyle anlamsal ilgili sözcükler + yıl. 'MaviKedi' diye bir cümle açık anlamı vardır. Yıl tahmin edilebilirdir. Özel karakter sadece bir tane ve çok basit (!). Mantıklı yapı kırılabilir hale getiriyor."
  },
  {
    "id": 18,
    "text": "Istanbul!34",
    "strength": "weak",
    "explanation": "Şehir adı (İstanbul) + sayı + !. İstanbul Türkiye'deki en ünlü şehir olduğundan sözlükte vardır. Sayılar 34'tür (plaka kodu) - tahmin edilebilirdir. Çok kısa (11 karakter) ve basit özel karakter."
  },
  {
    "id": 19,
    "text": "Turkiye2024!",
    "strength": "weak",
    "explanation": "Ülke adı + yıl + !. Çok açık ve coğrafi. Yıl takvim tarafından tahmin edilebilir. Özel karakter çeşitliliği eksik. Kelime daha sık olabilir."
  },
  {
    "id": 20,
    "text": "DogumTarihi1990!",
    "strength": "weak",
    "explanation": "Doğum tarihi (1990) özel bilgidir ama yaşlı nesil için tahmin edilebilir. 'DogumTarihi' cümlesi çok açık. Gerçek kişisel veri = güvenlik riski. Özel karakter sayısı az."
  },
  {
    "id": 21,
    "text": "Sevgilim2024!",
    "strength": "weak",
    "explanation": "'Sevgilim' + yıl + !. Çok kişisel ve tahmin edilebilir. Sevdiklerinizin isimleri sık saldırılara konu olur. Yıl tahmin edilebilir. Özel karakterler sadece bittişte."
  },
  {
    "id": 22,
    "text": "SuluFutbol99!",
    "strength": "weak",
    "explanation": "Hobi + sayı + !. İnsanların hobileri sosyal medyada açıkça görülebilir. 99 doğum yılı anlamında tarafından tahmin edilebilir. Özel karakter çeşitliliği yok."
  },
  {
    "id": 23,
    "text": "KediBeşik#2023",
    "strength": "weak",
    "explanation": "İki kelime + yıl + #. Ev hayvanının adı + fiziksel açıklamalar sosyal medyada paylaşılır. Yıl açık. Özel karakter sayısı az. Mantıklı yapı kırılabilir."
  },
  {
    "id": 24,
    "text": "Ankara2025@",
    "strength": "weak",
    "explanation": "Şehir adı + yıl + @. Coğrafik veri kolayca tahmin edilebilir. Yıl = takvim. @ sembolü standart. Çok kısa (12 karakter) ve basit yapı."
  },
  {
    "id": 25,
    "text": "Kahvaltı123!",
    "strength": "weak",
    "explanation": "Türkçe kelime + ardışık sayı + !. 'Kahvaltı' sözlükte vardır. 123 hemen denenen ilk kombinasyondur. Özel karakter başına konmamıştır. Çok mantıklı yapı."
  },
  {
    "id": 26,
    "text": "Basketball2024!",
    "strength": "weak",
    "explanation": "Spor + yıl + !. Kişilerin ilgi alanları sosyal medyada açıkça görülebilir. 2024 takvim tarafından tahmin edilir. Özel karakter yalnızca sonda. Çeşitlilik eksik."
  },
  {
    "id": 27,
    "text": "Marmara1989#",
    "strength": "weak",
    "explanation": "Bölge adı + yıl + #. Marmara coğrafik bir terim. 1989 doğum yılı gözlemlenebilir. Özel karakter sayısı az. Yapı çok basit."
  },
  {
    "id": 28,
    "text": "Rose123456!",
    "strength": "weak",
    "explanation": "Çiçek adı + ardışık sayı + !. 'Rose' İngilizce sözlükte yer alır. 123456 en zayıf ardışık sayılardan biri. Özel karakter desteği zayıf. Kalıp çok belirgin."
  },
  {
    "id": 29,
    "text": "Picasso1973!",
    "strength": "weak",
    "explanation": "Ünlü sanatçı adı + yıl + !. Bilnen şahsiyetler sözlükte vardır. 1973 tarihsel veri. Özel karakter çeşitliliği yok. Kültürel bilgi saldırıya dönüştürülebilir."
  },
  {
    "id": 30,
    "text": "Mountain2023@",
    "strength": "weak",
    "explanation": "Doğa teması + yıl + @. 'Mountain' genel kelimedir. 2023 takvim tarafından tahmin edilir. Özel karakter sayısı az. Mantık yolu bellidir."
  },
  {
    "id": 31,
    "text": "Okul1999#Eğlence",
    "strength": "weak",
    "explanation": "İnsani tema + doğum yılı + # + İnsani tema. 1999 yaş tahmin edilebilir. Anlamlı kelimeler sözlükte vardır. Özel karakter ortada ama az sayıda. Çok açık yapı."
  },
  {
    "id": 32,
    "text": "Koşu2024!Sağlık",
    "strength": "weak",
    "explanation": "'Koşu' ve 'Sağlık' türkçe kelimeler, ilişkili konular. 2024 açık yıl. ! işareti ortada. Kelimeler sözlükte vardır. Özel karakter sayısı az. Yapı tahmin edilebilirdir."
  },
  {
    "id": 33,
    "text": "Jazz123#2020",
    "strength": "weak",
    "explanation": "Müzik türü + ardışık sayı + # + yıl. 'Jazz' müzik dünyasında bilinen terim. 123 standart. 2020 geçmiş yıl. Özel karakter az. Mantıklı yapı."
  },
  {
    "id": 34,
    "text": "Çiçek99#Bahçe",
    "strength": "weak",
    "explanation": "Türkçe çiçek adı + sayı + # + Türkçe kelime. Anlamsal ilişki var. Doğum yılı 99. Özel karakter desteği zayıf. İki kelime mantıklı şekilde bağlanmış."
  },
  {
    "id": 35,
    "text": "London2024!UK",
    "strength": "weak",
    "explanation": "Şehir + yıl + ! + ülke kodu. Coğrafik bilgi tahmin edilebilir. 2024 takvim. Özel karakter az. İlişkili bilgiler birbirine bağlı, saldırgan kolayca tahmin edebilir."
  },
  {
    "id": 36,
    "text": "Eylül2023@Sonbahar",
    "strength": "weak",
    "explanation": "Ay adı + yıl + @ + sezon. Anlamsal bağlantı çok açık. 2023 takvim. Tüm kelimeler sözlükte vardır. Özel karakter sayısı az. Mantık yolu bellidir."
  },
  {
    "id": 37,
    "text": "Güneş99!Ay",
    "strength": "weak",
    "explanation": "'Güneş' ve 'Ay' doğa unsurları, sözlükte vardır. 99 doğum yılı anlamında. ! işareti basit. Kelimeler çok bağlantılı. Çeşitlilik eksik. Kısa yapı."
  },
  {
    "id": 38,
    "text": "Renault2015#Auto",
    "strength": "weak",
    "explanation": "Araba markası + yıl + # + sektör. 'Renault' marka olarak bilinen. 2015 araba modelinin yılı olabilir. Özel karakter az. İlişkili bilgiler kolayca tahmin edilebilir."
  },
  {
    "id": 39,
    "text": "Bilgisayar123!PC",
    "strength": "weak",
    "explanation": "'Bilgisayar' Türkçe sözlükte vardır. 123 standart. 'PC' İngilizce kısaltması. Ardışık sayı kullanımı. Özel karakter basit. Teknik terim saldırıda kullanılabilir."
  },
  {
    "id": 40,
    "text": "Yüzme99@Havuz",
    "strength": "weak",
    "explanation": "Spor faaliyeti + sayı + @ + yer. 'Yüzme' ve 'Havuz' sözlükte vardır, bağlantılı. 99 yaş tahmini. Özel karakter az. Yapı çok mantıklı, tahmin edilebilir."
  },
  {
    "id": 41,
    "text": "Müzik2024!Sanat",
    "strength": "weak",
    "explanation": "Hobi + yıl + ! + ilişkili alan. 'Müzik' ve 'Sanat' genel terimler. 2024 açık yıl. ! işareti standart. Özel karakter çeşitliliği yok. Anlam yolu bellidir."
  },
  {
    "id": 42,
    "text": "Kırmızı88#Beyaz",
    "strength": "weak",
    "explanation": "Renk adı + sayı + # + renk adı. 'Kırmızı' ve 'Beyaz' renkler sözlükte vardır. 88 doğum yılı. Özel karakter az. Kelimeler anlamsal olarak ilişkili."
  },
  {
    "id": 43,
    "text": "Phoenix2025!",
    "strength": "weak",
    "explanation": "Efsanevi kuş adı + yıl + !. 'Phoenix' mitoloji sözlüğünde vardır. 2025 açık gelecek yıl. Özel karakter basit. Tek kelime yapısı. Çok basit özel karakter kullanımı."
  },
  {
    "id": 44,
    "text": "Ufak2023@Büyük",
    "strength": "weak",
    "explanation": "Zıt anlamlı kelimeler + yıl + @. 'Ufak' ve 'Büyük' sözlükte vardır. 2023 takvim. Özel karakter az. Anlam ilişkisi açık. Doğal dil kalıpları saldırıya konu."
  },
  {
    "id": 45,
    "text": "Edison1879!",
    "strength": "weak",
    "explanation": "Ünlü mucit + yıl + !. 'Edison' tarihi figür. 1879 çok bilinir. Özel karakter basit. Tarihsel veriler kırılabilir. Çok kısa özel karakter."
  },
  {
    "id": 46,
    "text": "Gökyüzü99#Bulut",
    "strength": "weak",
    "explanation": "Doğa teması + sayı + # + ilişkili kelime. 'Gökyüzü' ve 'Bulut' sözlükte vardır. 99 yaş tahmini. Özel karakter az. Açık anlamsal bağlantı."
  },
  {
    "id": 47,
    "text": "Ağaç2024!Yaprak",
    "strength": "weak",
    "explanation": "'Ağaç' ve 'Yaprak' doğa unsurları, sözlükte vardır. 2024 yıl. ! işareti basit. Özel karakter sayısı az. Mantıklı bağlant. Çeşitlilik eksik."
  },
  {
    "id": 48,
    "text": "Davut123!Goliath",
    "strength": "weak",
    "explanation": "Tarihsel/dini karakterler + sayı + !. 'Davut' ve 'Goliath' ünlü hikaye. 123 standart. Özel karakter basit. Kültürel bilgi saldırıda kullanılabilir. Çeşitlilik az."
  },
  {
    "id": 49,
    "text": "Yelkenli88@Deniz",
    "strength": "weak",
    "explanation": "Aktivite + sayı + @ + yer. 'Yelkenli' ve 'Deniz' ilişkili terimler. 88 doğum yılı. Özel karakter az. Mantık yolu bellidir. Sözlükte vardır."
  },
  {
    "id": 50,
    "text": "Çocuk99!Oyun",
    "strength": "weak",
    "explanation": "'Çocuk' ve 'Oyun' ilişkili kavramlar. 99 doğum yılı. ! işareti basit. Özel karakter sayısı az. Kelimeler sözlükte vardır. Anlamsal bağlantı açık. Çok basit yapı."
  },
  {
    "id": 51,
    "text": "Kültür2023#Tarih",
    "strength": "weak",
    "explanation": "'Kültür' ve 'Tarih' akademik terimler. 2023 yıl. # işareti basit. Özel karakter az. Sözlükte vardır. Anlamsal bağlantı net. Kırılması kolay. Çeşitlilik eksik."
  },
  {
    "id": 52,
    "text": "Siyah77!Pembe",
    "strength": "weak",
    "explanation": "Renk + sayı + ! + renk. 'Siyah' ve 'Pembe' renkler sözlükte vardır. 77 doğum yılı. ! basit. Özel karakter sayısı az. Kelimeler genel. Yapı tahmin edilebilir."
  },
  {
    "id": 53,
    "text": "Mevsim2024!Kış",
    "strength": "weak",
    "explanation": "'Mevsim' genel terim + yıl + !. 'Kış' mevsim adı. 2024 takvim. ! basit. Özel karakter sayısı az. Kelimeler sözlükte vardır. Çok açık yapı."
  },
  {
    "id": 54,
    "text": "Teknoloji99#İnsan",
    "strength": "weak",
    "explanation": "'Teknoloji' ve 'İnsan' geniş konular. 99 doğum yılı. # basit. Çok kısa (18 karakter, karakterler sayıyla değil). Özel karakter çeşitliliği az. Kelimeler sözlükte vardır."
  },
  {
    "id": 55,
    "text": "Matema2023@Fen",
    "strength": "weak",
    "explanation": "'Matematik' (kısaltılmış) + yıl + @ + konu. Akademik terimler sözlükte vardır. 2023 takvim. @ basit. Özel karakter az. Mantık yolu açık. Çeşitlilik eksik."
  },
  {
    "id": 56,
    "text": "Kahve!Tren7Bulut?",
    "strength": "strong",
    "explanation": "Rastgele seçilmiş 3 kelime + 2 farklı özel karakter + sayı. 'Kahve', 'Tren', 'Bulut' birbirine bağlantısız. Büyük harf, küçük harf, sayı, özel karakter karışımı. 17 karakter uzunluk. Sözlük saldırısına dayanıklı."
  },
  {
    "id": 57,
    "text": "Sandalye#74Roket*",
    "strength": "strong",
    "explanation": "Rastgele kelimeler + sayı + 2 özel karakter. 'Sandalye', 'Roket' bağlantısız. 18 karakter. Büyük harfler, küçük harfler, sayılar, özel karakterler (#*) karışıktır. İnsan yapımı görünüyor ama rastgele mantıklı."
  },
  {
    "id": 58,
    "text": "Mavi$Kuş9Patika!",
    "strength": "strong",
    "explanation": "Bağlantısız kelimeler + sayı + 2 özel karakter ($!). 'Mavi', 'Kuş', 'Patika' ayrı konseptler. Karmaşık karışım. 17 karakter. Özel karakter çeşitliliği ($ ve !). Sözlük saldırısına dirençli."
  },
  {
    "id": 59,
    "text": "Defter#3Süper@Kütüphanede",
    "strength": "strong",
    "explanation": "İlişkisiz kavramlar + sayı + 2 özel karakter. 26 karakter çok uzun. 'Defter', 'Süper', 'Kütüphanede' bağlantısız. Büyük/küçük karışımı. # ve @ kombinasyonu. Sözlük saldırısına çok dirençli."
  },
  {
    "id": 60,
    "text": "Gitar?8Limon#Çatı",
    "strength": "strong",
    "explanation": "Tamamen rastgele kavramlar + sayı + 2 özel karakter (?#). 18 karakter. 'Gitar', 'Limon', 'Çatı' hiçbir ilişki yok. Büyük harf başında, sonra küçük harfler. Karakter çeşitliliği yüksek."
  },
  {
    "id": 61,
    "text": "Pencere!2Balık$Köşe",
    "strength": "strong",
    "explanation": "Bağlantısız nesneler + sayı + 2 özel karakter (!$). 19 karakter. 'Pencere', 'Balık', 'Köşe' tamamen ayrı. Büyük/küçük karışımı. Özel karakter çeşitli. Mantık yolu yok."
  },
  {
    "id": 62,
    "text": "Çanta@5Yaşlı#Proje",
    "strength": "strong",
    "explanation": "Bağlantısız kelimeler + sayı + 2 özel karakter (@#). 18 karakter. 'Çanta', 'Yaşlı', 'Proje' tamamen ayrı konseptler. Türkçe karakterler içerir. Sözlük saldırısına dirençli. İnsan yapımı görünüyor."
  },
  {
    "id": 63,
    "text": "Torna?7Ceket$Bahçıvan",
    "strength": "strong",
    "explanation": "Rastgele nesneler + sayı + 2 özel karakter (?$). 20 karakter. 'Torna', 'Ceket', 'Bahçıvan' ilişkisiz. Başında büyük harf, sonra küçük. Karakter çeşitliliği yüksek. Sözlük saldırısı başarısız."
  },
  {
    "id": 64,
    "text": "Masöz!9Gözlük#Tuz",
    "strength": "strong",
    "explanation": "Bağlantısız kelimeler + sayı + 2 özel karakter (!#). 17 karakter. 'Masöz', 'Gözlük', 'Tuz' tamamen ayrı. Türkçe karakterler (ö, ü, z). Büyük/küçük karışımı. Rasgele yapı kırmaya dayanıklı."
  },
  {
    "id": 65,
    "text": "Fabrika@3Sarı$Baskı",
    "strength": "strong",
    "explanation": "Rastgele konseptler + sayı + 2 özel karakter (@$). 19 karakter. 'Fabrika', 'Sarı', 'Baskı' ilişkisiz. Büyük/küçük harfler karışık. Özel karakter yeri değişken. Sözlük saldırısından güvenli."
  },
  {
    "id": 66,
    "text": "Kayak?6Elma#Terapist",
    "strength": "strong",
    "explanation": "Rastgele nesneler + sayı + 2 özel karakter (?#). 19 karakter. 'Kayak', 'Elma', 'Terapist' tamamen bağlantısız. Büyük harfler başında. Karakter çeşitliliği. Sözlük + kırma saldırısına dirençli."
  },
  {
    "id": 67,
    "text": "Organ!4Kaydırma$Kepçe",
    "strength": "strong",
    "explanation": "İlişkisiz kavramlar + sayı + 2 özel karakter (!$). 20 karakter. 'Organ', 'Kaydırma', 'Kepçe' hiç bağlantı yok. Büyük/küçük karışımı. Özel karakter sayısı yeterli. Sözlük saldırısı başarısız."
  },
  {
    "id": 68,
    "text": "Telgraf@2Dövüş#Somun",
    "strength": "strong",
    "explanation": "Bağlantısız nesneler + sayı + 2 özel karakter (@#). 19 karakter. 'Telgraf', 'Dövüş', 'Somun' ayrı dünyalar. Başında büyük harf. Karakter çeşitliliği. Sözlük saldırısı fails."
  },
  {
    "id": 69,
    "text": "Motosiklet?1Başçı$Para",
    "strength": "strong",
    "explanation": "Rastgele kavramlar + sayı + 2 özel karakter (?$). 21 karakter. 'Motosiklet', 'Başçı', 'Para' hiç ilişkili değil. Uzun ilk kelime. Karakter çeşitliliği maksimum. Sözlük saldırısı başarısız."
  },
  {
    "id": 70,
    "text": "Balıklı!8Halı#Cerrah",
    "strength": "strong",
    "explanation": "Bağlantısız nesneler + sayı + 2 özel karakter (!#). 19 karakter. 'Balıklı', 'Halı', 'Cerrah' tamamen ayrı. Türkçe karakterler (ı, ç). Büyük/küçük karışımı. Rasgele yapı dirençli."
  },
  {
    "id": 71,
    "text": "Gözler@9Tavern$Dişçi",
    "strength": "strong",
    "explanation": "İlişkisiz kelimeler + sayı + 2 özel karakter (@$). 19 karakter. 'Gözler', 'Tavern', 'Dişçi' tamamen ayrı. Türkçe karakterler (ö, ç). Büyük harfler başında. Sözlük saldırısına dirençli."
  },
  {
    "id": 72,
    "text": "Kuaför?5Kredi#Sokak",
    "strength": "strong",
    "explanation": "Rastgele nesneler + sayı + 2 özel karakter (?#). 19 karakter. 'Kuaför', 'Kredi', 'Sokak' ilişkisiz. Türkçe karakterler (ö). Karakter çeşitliliği. Sözlük + kırma saldırısından güvenli."
  },
  {
    "id": 73,
    "text": "Tiyatro!7Peyzaj$Sekreter",
    "strength": "strong",
    "explanation": "Bağlantısız kavramlar + sayı + 2 özel karakter (!$). 22 karakter. 'Tiyatro', 'Peyzaj', 'Sekreter' hiç ilişki yok. Başında büyük harf. Karakter çeşitliliği yüksek. Sözlük saldırısı başarısız."
  },
  {
    "id": 74,
    "text": "Bereket@4Güzellik#Çatalca",
    "strength": "strong",
    "explanation": "Rastgele konseptler + sayı + 2 özel karakter (@#). 21 karakter. 'Bereket', 'Güzellik', 'Çatalca' tamamen ayrı. Türkçe karakterler (ç, ü, ş). Büyük/küçük karışımı. Sözlük saldırısı başarısız."
  },
  {
    "id": 75,
    "text": "Şafak?3Bilgisayar$Peynir",
    "strength": "strong",
    "explanation": "İlişkisiz nesneler + sayı + 2 özel karakter (?$). 22 karakter. 'Şafak', 'Bilgisayar', 'Peynir' bağlantısız. Türkçe karakterler (ş). Uzun orta kelime. Karakter çeşitliliği. Rasgele yapı kırmaya dirençli."
  },
  {
    "id": 76,
    "text": "Kasap!6Gezinti#Kanarya",
    "strength": "strong",
    "explanation": "Bağlantısız kavramlar + sayı + 2 özel karakter (!#). 20 karakter. 'Kasap', 'Gezinti', 'Kanarya' hiç ilişkili değil. Başında büyük harf. Türkçe karakterler. Sözlük saldırısı başarısız."
  },
  {
    "id": 77,
    "text": "Vişne@8Halıcı$Teleskop",
    "strength": "strong",
    "explanation": "Rastgele nesneler + sayı + 2 özel karakter (@$). 20 karakter. 'Vişne', 'Halıcı', 'Teleskop' ayrı dünyalar. Türkçe karakterler (ı, ş, ç). Karakter çeşitliliği. Sözlük saldırısından güvenli."
  },
  {
    "id": 78,
    "text": "Çinici?2Camus#Tavla",
    "strength": "strong",
    "explanation": "İlişkisiz kavramlar + sayı + 2 özel karakter (?#). 17 karakter. 'Çinici', 'Camus', 'Tavla' tamamen bağlantısız. Türkçe karakterler (ç). Karakter çeşitliliği. Sözlük saldırısı başarısız."
  },
  {
    "id": 79,
    "text": "Fırın!9Tango$Piazzetta",
    "strength": "strong",
    "explanation": "Bağlantısız nesneler + sayı + 2 özel karakter (!$). 20 karakter. 'Fırın', 'Tango', 'Piazzetta' tamamen ayrı. Türkçe karakterler (ı). Karakter çeşitliliği maksimum. Rasgele yapı dirençli."
  },
  {
    "id": 80,
    "text": "Bahçı@5Polis#Kozmetik",
    "strength": "strong",
    "explanation": "Rastgele konseptler + sayı + 2 özel karakter (@#). 19 karakter. 'Bahçı', 'Polis', 'Kozmetik' hiç ilişkili değil. Başında büyük harf. Karakter çeşitliliği. Sözlük saldırısından güvenli."
  },
  {
    "id": 81,
    "text": "Cüzdan?7Temizlikçi$Resim",
    "strength": "strong",
    "explanation": "İlişkisiz nesneler + sayı + 2 özel karakter (?$). 21 karakter. 'Cüzdan', 'Temizlikçi', 'Resim' bağlantısız. Türkçe karakterler (ü, ç). Karakter çeşitliliği. Sözlük saldırısı başarısız."
  },
  {
    "id": 82,
    "text": "Dişçi!4Mandalina#Çevre",
    "strength": "strong",
    "explanation": "Bağlantısız kavramlar + sayı + 2 özel karakter (!#). 19 karakter. 'Dişçi', 'Mandalina', 'Çevre' tamamen ayrı. Türkçe karakterler (ş, ç). Büyük/küçük karışımı. Sözlük saldırısı başarısız."
  },
  {
    "id": 83,
    "text": "Çekirge@6Doktor$Çömlek",
    "strength": "strong",
    "explanation": "Rastgele nesneler + sayı + 2 özel karakter (@$). 20 karakter. 'Çekirge', 'Doktor', 'Çömlek' hiç ilişkili değil. Türkçe karakterler (ç). Karakter çeşitliliği. Rasgele yapı kırmaya dirençli."
  },
  {
    "id": 84,
    "text": "Eczane?1Yarış#Fındık",
    "strength": "strong",
    "explanation": "İlişkisiz kavramlar + sayı + 2 özel karakter (?#). 17 karakter. 'Eczane', 'Yarış', 'Fındık' tamamen bağlantısız. Türkçe karakterler (ç). Karakter çeşitliliği. Sözlük saldırısından güvenli."
  },
  {
    "id": 85,
    "text": "Fotoğraf!8Maraton$Barista",
    "strength": "strong",
    "explanation": "Bağlantısız nesneler + sayı + 2 özel karakter (!$). 21 karakter. 'Fotoğraf', 'Maraton', 'Barista' hiç ilişkili değil. Türkçe karakterler (ğ). Uzun kelimeler. Sözlük saldırısı başarısız."
  },
  {
    "id": 86,
    "text": "Gölü@9Katmer#Şeyyar",
    "strength": "strong",
    "explanation": "Rastgele kavramlar + sayı + 2 özel karakter (@#). 18 karakter. 'Gölü', 'Katmer', 'Şeyyar' tamamen ayrı. Türkçe karakterler (ö, ş). Karakter çeşitliliği. Sözlük saldırısından güvenli."
  },
  {
    "id": 87,
    "text": "Harita?2Okullar$Pertin",
    "strength": "strong",
    "explanation": "İlişkisiz nesneler + sayı + 2 özel karakter (?$). 19 karakter. 'Harita', 'Okullar', 'Pertin' bağlantısız. Başında büyük harf. Karakter çeşitliliği. Sözlük saldırısı başarısız."
  },
  {
    "id": 88,
    "text": "İmalat!5Nakliye#Ruh",
    "strength": "strong",
    "explanation": "Bağlantısız kavramlar + sayı + 2 özel karakter (!#). 17 karakter. 'İmalat', 'Nakliye', 'Ruh' tamamen ayrı. Türkçe karakterler (İ). Karakter çeşitliliği. Rasgele yapı dirençli."
  },
  {
    "id": 89,
    "text": "Jimnastik@3Sürü$Kuş",
    "strength": "strong",
    "explanation": "Rastgele nesneler + sayı + 2 özel karakter (@$). 18 karakter. 'Jimnastik', 'Sürü', 'Kuş' hiç ilişkili değil. Başında büyük harf. Karakter çeşitliliği. Sözlük saldırısından güvenli."
  },
  {
    "id": 90,
    "text": "Kalayıcı?7Enfeksiyon#Torna",
    "strength": "strong",
    "explanation": "İlişkisiz kavramlar + sayı + 2 özel karakter (?#). 23 karakter. 'Kalayıcı', 'Enfeksiyon', 'Torna' tamamen bağlantısız. Türkçe karakterler (ç, ı). Uzun kelimeler. Sözlük saldırısı başarısız."
  },
  {
    "id": 91,
    "text": "Q#8vLp!2X@7mKr$4",
    "strength": "strong",
    "explanation": "Tamamen rastgele karakterler, sayılar ve özel işaretler. Hiç anlamı olmayan kombinasyon. Her karakterin türü farklı. 16 karakter, 5+ çeşitli özel karakter. Bilgisayar tarafından otomatik üretilmiş gibi görünüyor. Sözlük saldırısı imkansız, baskı kuvveti (brute force) da çok zor."
  },
  {
    "id": 92,
    "text": "T@4pZ#8mQ!2kL$7v",
    "strength": "strong",
    "explanation": "Rastgele harf ve sayılar + çoklu özel karakterler. (@#!$) 16 karakter. Hiç mantıksal bağlantı yok. Bilgisayar yapımı hissiyatı. Büyük ve küçük harfler karışık. Sözlük saldırısı başarısız. Baskı kuvveti çok zaman alır."
  },
  {
    "id": 93,
    "text": "9K@mR#3sT!8wP$2Y",
    "strength": "strong",
    "explanation": "Tamamen rastgele sayı-harf karışımı + 4 farklı özel karakter (@#!$). 16 karakter. İnsan tarafından yazılamayacak kadar karmaşık görünüyor. Bilgisayar üretmesi kolay, insan tahmin etmesi imkansız. Maksimum karakter çeşitliliği."
  },
  {
    "id": 94,
    "text": "7j$Qn@9xB!5pL#4H",
    "strength": "strong",
    "explanation": "Rastgele harf/sayı + 4 özel karakter ($@!#). 16 karakter, tümü değişken. Hiç anlamı yok. Bilgisayar yapımı görünüyor. Sözlük saldırısı başarısız. Baskı kuvveti günler alabilir."
  },
  {
    "id": 95,
    "text": "2D#fG@8sW!6eM$3A",
    "strength": "strong",
    "explanation": "Tamamen rastgele karakter kombinasyonu. Sayı-harf-özel karakter çeşitliliği maksimum. (#@!$) 16 karakter. İnsan yapımı imkansız. Bilgisayar yapımı açık. Hiç düzen yok. Sözlük saldırısı ve baskı kuvveti dirençli."
  },
  {
    "id": 96,
    "text": "5c@Rt!4bZ#7nK$9p",
    "strength": "strong",
    "explanation": "Tamamen rastgele harf/sayı + 4 özel karakter (@!#$). 16 karakter. İnsan tarafından oluşturulamayacak kadar karmaşık. Bilgisayar üretmesi gibi görünüyor. Maksimum çeşitlilik. Kırılması çok zor."
  },
  {
    "id": 97,
    "text": "U!1xM$6wK#3oJ@2E",
    "strength": "strong",
    "explanation": "Rastgele harf-sayı-özel karakter kombinasyonu. (!$#@) 16 karakter, her biri değişken. Hiç anlamı ve düzeni yok. Bilgisayar üretmesi kolay ama insan kırması imkansız. Maksimum entropisi (karmaşıklığı)."
  },
  {
    "id": 98,
    "text": "4y@Bg#5mP!1jC$8r",
    "strength": "strong",
    "explanation": "Tamamen rastgele karakterler + 4 farklı özel sembol (@#!$). 16 karakter. Tamamen bilgisayar üretimi hissiyatı. İnsan yazması pratik imkansız. Sözlük saldırısı başarısız. Baskı kuvveti en az 2^128 kombinasyon."
  },
  {
    "id": 99,
    "text": "6i#Lv$2sD@9tF!4q",
    "strength": "strong",
    "explanation": "Rastgele harf/sayı + 4 özel karakter (#$@!). 16 karakter, sıralanmamış. Tamamen karmaşık. Bilgisayar yapımı açık. İnsan tahmin etmesi imkansız. Hiç anlamsal ilişki yok. Maksimum entropiye sahip."
  },
  {
    "id": 100,
    "text": "O@3eH!7gW#5dB$1n",
    "strength": "strong",
    "explanation": "Tamamen rastgele karakter kombinasyonu + 4 farklı özel işaret (@!#$). 16 karakter. Bilgisayar tarafından otomatik üretilmiş gibi. İnsan yapımı imkansız. Maksimum karakter çeşitliliği. Kırılması astronomik zaman alır."
  }
];

export const PERMISSIONS = {
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

export const LEVEL_1_APPS = [
  {
    id: 1,
    name: "Adım Sayar Pro",
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
    reason: "Adım sayıcı sadece hareket sensörü ve depolama izni istemelidir. Internet sadece senkronizasyon içindir.",
    difficulty: "easy"
  },
  {
    id: 2,
    name: "Fotoğraf Uygulaması",
    category: "Fotoğraf & Video",
    icon: "📷",
    description: "Harika fotoğraflar çekin, edit yapın, albüm oluşturun.",
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
    reason: "Fotoğraf uygulaması kamera, galeri ve depolama istemelidir. Bunlar temel fonksiyonları için gereklidir.",
    difficulty: "easy"
  },
  {
    id: 3,
    name: "Döviz Çevirici",
    category: "Finans & Para",
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
    reason: "Döviz Çevirici neden Rehber ve SMS izni isteyecek? Bu veri çalmak için tipik bir işarettir. Gereksiz izinler barındırmaktadır.",
    difficulty: "easy"
  },
  {
    id: 4,
    name: "Müzik Çalar",
    category: "Müzik & Ses",
    icon: "🎵",
    description: "Müzik dinleyin, playlist oluşturun, favorilerinizi kaydedin.",
    permissions: {
      camera: false,
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
    reason: "Müzik çalar Rehber'e neden erişmek isteyecek? Bu uygulama veri çalmaya çalışıyor. Sadece Galeri, Depolama ve İnternet yeterli.",
    difficulty: "easy"
  },
  {
    id: 5,
    name: "Haber Okuyucu",
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
    reason: "Haber uygulaması sadece İnternet ve Depolama (okunan haberler için) istemelidir. Başka izin gerekmez.",
    difficulty: "easy"
  },
  {
    id: 6,
    name: "Saat Uygulaması",
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
    reason: "Saat uygulaması depolama ve takvim istemelidir. Bu tamamen normal ve güvenlidir.",
    difficulty: "easy"
  },
  {
    id: 7,
    name: "Hesap Makinesi Pro",
    category: "Araçlar",
    icon: "🧮",
    description: "Gelişmiş hesaplamalar, geçmiş kaydet, cilt tasarımı.",
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
      internet: false,
      biometric: false,
      device_settings: false
    },
    isSafe: false,
    reason: "Hesap makinesi neden Kamera isteyecek? Bu açıkça zararlıdır. Sadece Depolama yeterlidir.",
    difficulty: "easy"
  },
  {
    id: 8,
    name: "Şarkı Tanıyıcı",
    category: "Müzik & Ses",
    icon: "🎤",
    description: "Çalan müzikleri tanıyın, sanatçıları bulmak, saatlık sıralamayı görmek.",
    permissions: {
      camera: false,
      location: false,
      contacts: true,
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
    reason: "Şarkı tanıyıcı Rehber'e neden izin isteyecek? Mikrofon ve İnternet yeterlidir. Bu zararlı bir uygulamadır.",
    difficulty: "easy"
  },
  {
    id: 9,
    name: "Hava Durumu",
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
    reason: "Hava Durumu uygulaması Konum (yerel hava), İnternet ve Depolama istemelidir. Bunlar temel fonksiyonlar için gereklidir.",
    difficulty: "easy"
  },
  {
    id: 10,
    name: "Süper El Feneri 2026",
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
    reason: "El feneri uygulaması hiçbir izin istememeli! Telefondaki flaş ışığını doğrudan kullanabilir. Rehber ve SMS istiyorsa çok zararlıdır.",
    difficulty: "easy"
  }
];

export const LEVEL_2_APPS = [
  {
    id: 11,
    name: "Instagram Clone - SosyalIM",
    category: "Sosyal Medya",
    icon: "📸",
    description: "Fotoğraf paylaş, arkadaşlarla bağlan, hikayeler yarat, yorumlaş.",
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
    reason: "Sosyal Medya Kamera ve Galeri istemelidir, ama Konum, Rehber ve SMS neden isteyecek? Veri toplamaya çalışıyor.",
    difficulty: "medium"
  },
  {
    id: 12,
    name: "Google Haritalar Clone - RouteMap",
    category: "Navigasyon",
    icon: "🗺️",
    description: "Yolunuzu bulun, trafik bilgisi alın, rota kaydedin.",
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
    isSafe: false,
    reason: "Navigasyon Konum, Kamera, Galeri ve İnternet gerektirir, fakat SMS neden isteyecek? Bu zararlıdır.",
    difficulty: "medium"
  },
  {
    id: 13,
    name: "Spotify Clone - MuzikBox",
    category: "Müzik & Ses",
    icon: "🎧",
    description: "Müzik akışı, playlist, arkadaş önerileri, konser haberleri.",
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
    isSafe: true,
    reason: "Müzik uygulaması Mikrofon (şarkı tanıma), Depolama, İnternet ve konser bulma/yerelleştirme için Konum isteyebilir. Makul izinlerdir.",
    difficulty: "medium"
  },
  {
    id: 14,
    name: "Gmail Clone - MailBox",
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
    reason: "Email uygulaması Kamera (QR), Rehber (adresler), Galeri (ekler), Depolama, Takvim istemelidir. Hepsi makul.",
    difficulty: "medium"
  },
  {
    id: 15,
    name: "Google Drive Clone - CloudBox",
    category: "Bulut Depolama",
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
    reason: "Cloud uygulaması Kamera (belge tarama), Rehber (paylaşım), Galeri, Depolama ve İnternet istemelidir. Tümü makul.",
    difficulty: "medium"
  },
  {
    id: 16,
    name: "LinkedIn Clone - JobNet",
    category: "Profesyonel Network",
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
    reason: "Profesyonel network Kamera, Konum, Rehber ve Galeri istemelidir. Tümü işlevsel ve makuldür.",
    difficulty: "medium"
  },
  {
    id: 17,
    name: "Uber Clone - RideGo",
    category: "Ulaşım",
    icon: "🚕",
    description: "Araba çağır, sürücüyü takip et, ödeme yap, değerlendir.",
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
    reason: "Taksi uygulaması Konum, Rehber (acil durum paylaşımları için), SMS, Telefon ve Biyometrik doğrulama isteyebilir. Hepsi hizmet için gereklidir.",
    difficulty: "medium"
  }
];

export const LEVEL_3_APPS = [
  {
    id: 18,
    name: "Fotoğraf Filtresi - BeautySnap",
    category: "Fotoğraf & Video",
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
    reason: "Filtre uygulaması sadece Kamera ve Galeri istemelidir! Konum, Rehber ve SMS istiyorsa kişisel veri çalmaya çalışıyor.",
    difficulty: "hard"
  },
  {
    id: 19,
    name: "QR Kod Okuyucu - QuickScan",
    category: "Araçlar",
    icon: "📱",
    description: "WiFi şifrelerini tarayın, ödeme bağlantısı oluşturun, URL açın.",
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
    reason: "QR okuyucu sadece Kamera istemelidir! Konum, Rehber ve SMS istiyorsa spyware'dir.",
    difficulty: "hard"
  },
  {
    id: 20,
    name: "Yazı Tipi Uygulaması - FontStyle",
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
    reason: "Yazı tipi uygulaması hiçbir izin istememeli! Sadece Depolama ve İnternet yeterli. Konum, Rehber ve SMS istiyorsa zararlıdır.",
    difficulty: "hard"
  },
  {
    id: 21,
    name: "Temizlik Uygulaması - PhoneBoost",
    category: "Sistem Araçları",
    icon: "🧹",
    description: "Telefonu hızlandır, çöpleri temizle, reklam kaldır, pil kaydır.",
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
    reason: "Temizlik uygulaması Konum, Rehber, SMS ve Cihaz Ayarlarını istiyorsa adware/malware'dir. Hiçbir temizleme uygulaması bunlara ihtiyaç duymaz.",
    difficulty: "hard"
  },
  {
    id: 22,
    name: "Batarya Tasarrufu - BatteryPlus",
    category: "Sistem Araçları",
    icon: "🔋",
    description: "Batarya tasarrufu, arka plan uygulamalarını yönet, ısıyı azalt.",
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
    reason: "Batarya uygulaması Konum ve Cihaz Ayarlarını istiyorsa izleme/kontrol cihazıdır. Sadece Depolama yeterli.",
    difficulty: "hard"
  },
  {
    id: 23,
    name: "PDF Okuyucu - DocumentPro",
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
    reason: "PDF okuyucu sadece Galeri ve Depolama istemelidir. Kamera ve Rehber istiyorsa maskenin arkasında veri çalmaya çalışıyor.",
    difficulty: "hard"
  }
];

export const LEVEL_4_APPS = [
  {
    id: 24,
    name: "Apple Pay / Google Pay - SecureWallet",
    category: "Finans & Ödeme",
    icon: "💳",
    description: "NFC ile ödeme yap, Kontaksız Satın Al, gişeden çekilişler bak.",
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
    reason: "Ödeme uygulaması Kamera, SMS, Biyometrik ve İnternet istemelidir. Tümü güvenlik ve işlevsellik için gereklidir.",
    difficulty: "hard"
  },
  {
    id: 25,
    name: "Zoom Toplantı - VideoCall Pro",
    category: "İletişim",
    icon: "🎥",
    description: "Video konferans, ekran paylaş, sesli konferans, toplantı kaydı.",
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
    reason: "Video konferans Kamera, Mikrofon, Rehber, Galeri, Depolama, Takvim ve İnternet istemelidir. Tümü fonksiyonları için gereklidir.",
    difficulty: "hard"
  },
  {
    id: 26,
    name: "Garanti Bankası - GarantiBanking",
    category: "Finans & Bankacılık",
    icon: "🏦",
    description: "Transfer, fatura öde, kredi kartı, yatırım, kripto.",
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
    reason: "Bankacılık uygulaması Kamera, Konum, Rehber, SMS, Galeri, Biyometrik ve İnternet istemelidir. Tümü güvenlik ve işlevsellik için kritiktir.",
    difficulty: "hard"
  },
  {
    id: 27,
    name: "WhatsApp",
    category: "İletişim",
    icon: "💬",
    description: "Metin mesaj, arama, video çağrı, grup chat, durum paylaş.",
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
    reason: "WhatsApp Kamera, Konum, Rehber, Mikrofon, Galeri ve İnternet istemelidir. Tümü meşru mesajlaşma özellikleridir.",
    difficulty: "hard"
  },
  {
    id: 28,
    name: "Turkcell Mobil İşlemler - T-Mobile",
    category: "Telecom",
    icon: "📱",
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
    reason: "Telecom uygulaması Konum, SMS, Telefon, Biyometrik ve İnternet istemelidir. Hepsi hizmet için gerekli ve makuldür.",
    difficulty: "hard"
  },
  {
    id: 29,
    name: "Amazon / Trendyol - ShoppingHub",
    category: "E-Ticaret",
    icon: "🛍️",
    description: "Ürün ara, satın al, sepet yönet, ödeme, izleme.",
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
    reason: "E-ticaret uygulaması Kamera, Konum, Rehber, SMS, Galeri, Biyometrik ve İnternet istemelidir. Tümü alışveriş fonksiyonları için gereklidir.",
    difficulty: "hard"
  }
];

export const ALL_APPS = [
  ...LEVEL_1_APPS,
  ...LEVEL_2_APPS,
  ...LEVEL_3_APPS,
  ...LEVEL_4_APPS
];

export function checkDecision(app, userDecision) {
  const isCorrect = (userDecision === true && app.isSafe) || 
                    (userDecision === false && !app.isSafe);
  
  return {
    correct: isCorrect,
    feedback: app.reason,
    points: isCorrect ? 10 : -5
  };
}

export function getAppsByDifficulty(difficulty, count) {
  let apps = [];
  if (difficulty === 'easy') {
    apps = LEVEL_1_APPS;
  } else if (difficulty === 'medium') {
    apps = [...LEVEL_1_APPS, ...LEVEL_2_APPS];
  } else if (difficulty === 'hard') {
    apps = ALL_APPS;
  }
  return apps
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
}

export function evaluatePermissionRisk(permissions) {
  let riskScore = 0;
  if (permissions.sms) riskScore += 3;
  if (permissions.contacts) riskScore += 2;
  if (permissions.location) riskScore += 1;
  if (permissions.camera) riskScore += 1;
  if (permissions.phone_calls) riskScore += 2;
  if (permissions.device_settings) riskScore += 3;
  
  if (riskScore >= 5) return 'high';
  if (riskScore >= 2) return 'medium';
  return 'low';
}

const mapAppFields = (app) => ({
  ...app,
  isSuspicious: !app.isSafe,
  descriptionOfRisk: app.reason
});

export const mockApps = [
  LEVEL_1_APPS[0], // Adım Sayar Pro (Safe)
  LEVEL_1_APPS[9], // Süper El Feneri 2026 (Unsafe)
  LEVEL_2_APPS[2], // Spotify Clone (Safe)
  LEVEL_2_APPS[0], // Instagram Clone (Unsafe)
  LEVEL_3_APPS[1], // QR Kod Okuyucu (Unsafe)
  LEVEL_3_APPS[3], // Temizlik Uygulaması (Unsafe)
  LEVEL_4_APPS[2], // Garanti Bankası (Safe)
  LEVEL_4_APPS[0]  // Apple Pay / Google Pay (Safe)
].map(mapAppFields);
