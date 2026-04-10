// Scan Academy — Bilingual Translations (Arabic / English)

export const GOVERNORATES = {
  ar: [
    'القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'البحيرة',
    'الغربية', 'المنوفية', 'القليوبية', 'الشرقية', 'الإسماعيلية',
    'بورسعيد', 'السويس', 'دمياط', 'كفر الشيخ', 'الفيوم',
    'بني سويف', 'المنيا', 'أسيوط', 'سوهاج', 'قنا',
    'الأقصر', 'أسوان', 'البحر الأحمر', 'الوادي الجديد', 'مطروح',
    'شمال سيناء', 'جنوب سيناء',
  ],
  en: [
    'Cairo', 'Giza', 'Alexandria', 'Dakahlia', 'Beheira',
    'Gharbia', 'Monufia', 'Qalyubia', 'Sharqia', 'Ismailia',
    'Port Said', 'Suez', 'Damietta', 'Kafr el-Sheikh', 'Faiyum',
    'Beni Suef', 'Minya', 'Asyut', 'Sohag', 'Qena',
    'Luxor', 'Aswan', 'Red Sea', 'New Valley', 'Matruh',
    'North Sinai', 'South Sinai',
  ],
};

export const translations = {
  ar: {
    navbar: {
      home: 'الرئيسية',
      simulator: 'محاكي الأشعة',
      pricing: 'الأسعار',
      register: 'سجل الآن',
    },

    hero: {
      badge: 'أكبر برنامج تدريب عملي للأشعة في مصر',
      title_1: 'انطلاقة',
      title_brand: 'أكبر تدريب عملي للأشعة',
      title_2: 'في مصر',
      subtitle:
        'إحنا مش بنديك كورس… إحنا بنديك خبرة سوق حقيقي. تدريب عملي على أجهزة أشعة حقيقية بإشراف متخصصين معتمدين في كل محافظات مصر.',
      pill_1: 'يومين مكثفين',
      pill_2: 'شهادة معتمدة',
      pill_3: 'أجهزة حقيقية',
      pill_4: '27 محافظة',
      cta_register: 'سجل دلوقتي',
      cta_simulator: 'جرب محاكي الأشعة',
      stat_1_val: '+500',
      stat_1_lbl: 'طالب متدرب',
      stat_2_val: '27',
      stat_2_lbl: 'محافظة',
      stat_3_val: 'يومين',
      stat_3_lbl: 'تدريب مكثف',
      stat_4_val: '4.9★',
      stat_4_lbl: 'متوسط التقييم',
      hint: 'حرّك المؤشر للتفاعل',
      badge_cert: 'شهادة معتمدة',
      badge_equip: 'أجهزة أشعة حقيقية',
      badge_inst: 'مدربون متخصصون',
      badge_rating: '4.9 ★ تقييم',
      anatomy_right_lung: 'الرئة اليمنى',
      anatomy_left_lung: 'الرئة اليسرى',
      anatomy_cardiac: 'ظل القلب',
      anatomy_trachea: 'القصبة الهوائية',
      anatomy_diaphragm: 'الحجاب الحاجز الأيمن',
    },

    about: {
      badge: 'عن البرنامج',
      title_1: 'تدريب',
      title_brand: 'بيجيلك لحد عندك',
      subtitle:
        'إحنا مش بس بنديك نظريات — إحنا بنقدملك تدريب عملي متخصص في الأشعة لحد محافظتك. المكان بيتحدد حسب أعلى عدد تسجيلات عشان أكبر عدد ممكن يستفيد.',
      feat_1_title: 'بنيجي لمحافظتك',
      feat_1_desc:
        'الورشة بتتعمل في المحافظة صاحبة أعلى عدد تسجيلات — بنوصلك التدريب من غير ما تسافر.',
      feat_2_title: 'مجموعات صغيرة',
      feat_2_desc:
        'عدد محدود في كل دفعة عشان كل طالب ياخد وقت عملي حقيقي مع الجهاز وتوجيه مباشر من المدربين.',
      feat_3_title: 'أجهزة حقيقية',
      feat_3_desc:
        'اتدرب على أجهزة أشعة حقيقية في بيئة سريرية. ابني ثقة حقيقية قبل دخولك للمستشفى.',
      feat_4_title: 'شهادة معتمدة',
      feat_4_desc:
        'احصل على شهادة إتمام رسمية بعد إنهاء البرنامج لمدة يومين، معترف بها من متخصصي الأشعة.',
      banner_title: 'إزاي بيتحدد مكان الورشة؟',
      banner_desc:
        'بعد انتهاء فترة التسجيل، بنحدد المحافظة صاحبة أعلى عدد تسجيلات. ورشة اليومين بتتعمل هناك — عشان أكبر عدد يقدر يحضر بدون سفر.',
      banner_cta: 'سجل دلوقتي وساعد إن الورشة تيجي لمحافظتك!',
    },

    testimonials: {
      badge: 'آراء الطلاب',
      title: 'إيه اللي بيقوله طلابنا',
      subtitle: 'اسمع من طلاب حضروا التدريب فعلاً في محافظات مختلفة.',
      hint_move: '↔ وقف على الكارت عشان توقف التمرير',
      hint_paused: '⏸ متوقف — حرّك المؤشر لاستكمال التمرير',
    },

    offer: {
      badge: 'إيه اللي هتاخده',
      title_1: 'كل ده متوفر بـ',
      title_price: '250 جنيه',
      subtitle:
        'تجربة تدريب عملي متكاملة مصممة تديك ميزة حقيقية في سوق العمل في مجال الأشعة.',
      popular: '⭐ الأكثر طلباً',
      register_btn: 'سجل دلوقتي',
      cards: [
        {
          title: 'يومين مكثفين',
          sub: 'منظم ومركز',
          desc: 'يومين كاملين من التدريب المكثف بيغطوا النظرية والتطبيق العملي على الأجهزة.',
          features: [
            '+8 ساعات تدريب عملي',
            'جلسات بإشراف متخصصين',
            'سؤال وجواب مباشر',
            'مواد دراسية',
          ],
        },
        {
          title: 'تجربة عملية',
          sub: 'الميزة الأساسية',
          desc: 'اشتغل بشكل مباشر على أجهزة الأشعة، واتقن وضعيات المرضى، وتعلم قراءة صور أشعة حقيقية.',
          features: [
            'أجهزة أشعة حقيقية',
            'وضعيات المرضى',
            'تحسين جودة الصورة',
            'السلامة الإشعاعية',
          ],
        },
        {
          title: 'قيمة ممتازة',
          sub: 'سعر في المتناول',
          desc: 'تدريب احترافي متكامل بسعر مميز — هدفنا نوصل التعليم العملي لكل طالب.',
          features: [
            'كل المواد متضمنة',
            'شهادة إتمام',
            'وجبات خفيفة',
            'بدون رسوم إضافية',
          ],
        },
      ],
    },

    finalcta: {
      badge: '🎯 عدد الأماكن محدود',
      title_1: 'مستعد تبدأ',
      title_brand: 'مشوارك في الأشعة؟',
      subtitle:
        'متفوتش فرصتك في تدريب عملي حقيقي في الأشعة بسعر مميز. سجل دلوقتي وساعد إن الورشة تيجي لمحافظتك!',
      cta_register: 'سجل دلوقتي',
      cta_whatsapp: 'تواصل على واتساب',
      trust_1: '✔ بدون دفع مسبق',
      trust_2: '✔ تأكيد عبر واتساب',
      trust_3: '✔ شهادة معتمدة',
    },

    footer: {
      tagline:
        'أكبر منصة تدريب عملي للأشعة في مصر — بنوصل تعليم سريري احترافي لكل محافظة.',
      quick_links: 'روابط سريعة',
      contact_us: 'تواصل معنا',
      link_home: 'الرئيسية',
      link_about: 'عن البرنامج',
      link_register: 'سجل الآن',
      link_simulator: 'محاكي الأشعة',
      copyright: '© 2026 Scan Academy مصر',
      made_with: 'صُنع بحب لطلاب المجال الطبي',
    },

    register: {
      crumb_home: 'الرئيسية',
      crumb_cur: 'التسجيل',
      page_title: 'سجل في الورشة',
      page_sub: 'املأ بياناتك وسيتم تأكيد حجزك عبر واتساب',
      section_badge: 'انضم إلينا',
      section_title: 'سجل الآن',
      section_sub:
        'ادخل بياناتك — المحافظة صاحبة أعلى عدد تسجيلات هي اللي هتستضيف الورشة!',
      lbl_name: 'الاسم',
      lbl_college: 'الكلية / المعهد',
      lbl_gov: 'المحافظة',
      lbl_city: 'المدينة',
      lbl_phone: 'رقم الهاتف',
      submit: 'تسجيل',
      wa_notice:
        'بعد التسجيل هتتحول لواتساب لتأكيد الحجز. بياناتك بتساعدنا نحدد مكان تنفيذ الورشة.',
    },

    simulator: {
      crumb_home: 'الرئيسية',
      crumb_cur: 'محاكي الأشعة',
      page_title: 'محاكي الأشعة',
      page_sub:
        'استكشف تشريح الصدر، وتدرب على وضعيات المرضى، وتعلم تقنيات التصوير الإشعاعي في بيئة تعليمية آمنة',
      chip_online: 'يعمل الآن',
      chip_exams: '4 أنواع فحوصات',
      chip_edu: 'للتعليم فقط',
    },
  },

  en: {
    navbar: {
      home: 'Home',
      simulator: 'X-Ray Simulator',
      pricing: 'Pricing',
      register: 'Register Now',
    },

    hero: {
      badge: 'The Largest Practical Radiology Training in Egypt',
      title_1: 'Breakthrough',
      title_brand: 'Largest Practical Training',
      title_2: 'in Egypt',
      subtitle:
        'We don’t just give you a course… we give you real market experience. Hands-on training on real X-ray machines supervised by certified specialists across all governorates of Egypt.',
      pill_1: '2 Intensive Days',
      pill_2: 'Certified Certificate',
      pill_3: 'Real Equipment',
      pill_4: '27 Governorates',
      cta_register: 'Register Now',
      cta_simulator: 'Try X-Ray Simulator',
      stat_1_val: '+500',
      stat_1_lbl: 'Trained Students',
      stat_2_val: '27',
      stat_2_lbl: 'Governorates',
      stat_3_val: '2 Days',
      stat_3_lbl: 'Intensive Training',
      stat_4_val: '4.9★',
      stat_4_lbl: 'Average Rating',
      hint: 'Move cursor to interact',
      badge_cert: 'Certified',
      badge_equip: 'Real Machines',
      badge_inst: 'Expert Trainers',
      badge_rating: '4.9 ★ Rating',
      anatomy_right_lung: 'Right Lung',
      anatomy_left_lung: 'Left Lung',
      anatomy_cardiac: 'Cardiac Shadow',
      anatomy_trachea: 'Trachea',
      anatomy_diaphragm: 'Right Diaphragm',
    },

    about: {
      badge: 'About the Program',
      title_1: 'Training',
      title_brand: 'Comes Right to You',
      subtitle:
        'We don’t just teach theory — we provide specialized practical radiology training right in your governorate. The location is determined by the highest number of registrations.',
      feat_1_title: 'We Come to Your Governorate',
      feat_1_desc:
        'The workshop is held in the governorate with the highest number of registrations — bringing the training to you without travel.',
      feat_2_title: 'Small Groups',
      feat_2_desc:
        'Limited numbers in each batch so every student gets real hands-on time with the machine and direct guidance.',
      feat_3_title: 'Real Equipment',
      feat_3_desc:
        'Train on real X-ray machines in a clinical environment. Build true confidence before entering the hospital.',
      feat_4_title: 'Certified Certificate',
      feat_4_desc:
        'Receive an official certificate of completion after finishing the 2-day program, recognized by radiology professionals.',
      banner_title: 'How is the workshop location determined?',
      banner_desc:
        'After the registration period, we identify the governorate with the most registrations and host the 2-day workshop there — so the maximum number of people can attend without traveling.',
      banner_cta: 'Register now and help bring the workshop to your city!',
    },

    testimonials: {
      badge: 'Student Reviews',
      title: 'What Our Students Say',
      subtitle: 'Hear from students who actually attended the training in various governorates.',
      hint_move: '↔ Hover over card to pause scrolling',
      hint_paused: '⏸ Paused — Move cursor to resume scrolling',
    },

    offer: {
      badge: 'What You Get',
      title_1: 'All this available for',
      title_price: '250 EGP',
      subtitle:
        'A comprehensive practical training experience designed to give you a real edge in the radiology job market.',
      popular: '⭐ Most Popular',
      register_btn: 'Register Now',
      cards: [
        {
          title: '2 Intensive Days',
          sub: 'Organized & Focused',
          desc: 'Two full days of intensive training covering theory and practical application on machines.',
          features: [
            '+8 hours practical training',
            'Supervised sessions',
            'Live Q&A',
            'Study materials',
          ],
        },
        {
          title: 'Hands-on Experience',
          sub: 'The Core Benefit',
          desc: 'Work directly on X-ray machines, master patient positioning, and learn to read real X-ray images.',
          features: [
            'Real X-ray machines',
            'Patient positioning',
            'Image quality optimization',
            'Radiation safety',
          ],
        },
        {
          title: 'Exceptional Value',
          sub: 'Accessible Price',
          desc: 'Comprehensive professional training at an accessible price — our goal is to make practical education available to every student.',
          features: [
            'All materials included',
            'Certificate of completion',
            'Light snacks',
            'No hidden fees',
          ],
        },
      ],
    },

    finalcta: {
      badge: '🎯 Limited Seats Available',
      title_1: 'Ready to start',
      title_brand: 'your radiology career?',
      subtitle:
        'Don’t miss your chance for real practical training in radiology at an exceptional value. Register now and help bring the workshop to your governorate!',
      cta_register: 'Register Now',
      cta_whatsapp: 'Contact via WhatsApp',
      trust_1: '✔ No upfront payment',
      trust_2: '✔ WhatsApp Confirmation',
      trust_3: '✔ Certified Certificate',
    },

    footer: {
      tagline:
        'The largest practical radiology training platform in Egypt — bringing professional clinical education to every governorate.',
      quick_links: 'Quick Links',
      contact_us: 'Contact Us',
      link_home: 'Home',
      link_about: 'About Program',
      link_register: 'Register Now',
      link_simulator: 'X-Ray Simulator',
      copyright: '© 2026 Scan Academy Egypt',
      made_with: 'Made with love ❤ for medical students',
    },

    register: {
      crumb_home: 'Home',
      crumb_cur: 'Registration',
      page_title: 'Register for Workshop',
      page_sub: 'Fill in your details and your booking will be confirmed via WhatsApp',
      section_badge: 'Join Us',
      section_title: 'Register Now',
      section_sub:
        'Enter your details — the governorate with the most registrations will host the workshop!',
      lbl_name: 'Name',
      lbl_college: 'College / Institute',
      lbl_gov: 'Governorate',
      lbl_city: 'City',
      lbl_phone: 'Phone Number',
      ph_name: 'ex. Ahmed Mohamed',
      ph_college: 'ex. Faculty of Applied Health Sciences',
      ph_gov: 'Select Governorate',
      ph_city: 'ex. Tanta',
      ph_phone: 'ex. 01012345678',
      submit: 'Register',
      submitting: 'Registering...',
      wa_notice:
        'After registering, you will be redirected to WhatsApp to confirm your booking. Your details help us determine the workshop location.',
      err_req: 'This field is required',
      err_phone: 'Please enter a valid 11-digit Egyptian phone number',
      wa_msg: (n: string, c: string, g: string, ci: string, p: string) =>
        `Hello, I want to confirm my registration:\nName: ${n}\nCollege: ${c}\nGovernorate: ${g}\nCity: ${ci}\nPhone: ${p}`,
      ok_title: 'Registration Initiated Successfully!',
      ok_sub: 'You will be redirected to WhatsApp shortly to confirm your booking.',
      ok_fallback: 'If you are not redirected automatically,',
      ok_fallback_link: 'click here to confirm via WhatsApp',
    },

    simulator: {
      crumb_home: 'Home',
      crumb_cur: 'X-Ray Simulator',
      page_title: 'X-Ray Simulator',
      page_sub:
        'Explore chest anatomy, practice patient positioning, and learn radiographic techniques in a safe educational environment',
      chip_online: 'Online',
      chip_exams: '4 Exam Types',
      chip_edu: 'Education Only',
      view_mode: 'View Mode',
      view_standard: 'Standard',
      view_inverted: 'Inverted',
      view_bone: 'Bone Enhanced',
      view_soft: 'Soft Tissue',
      structure_opacity: 'Anatomy Highlights',
      structure_lungs: 'Lungs',
      structure_heart: 'Heart',
      structure_bones: 'Bones',
      tech_factors: 'Technical Factors',
      tech_kvp: 'kVp (Penetration)',
      tech_mas: 'mAs (Density)',
      anatomy_focus: 'Anatomy Focus',
      pos_guide: 'Positioning Guide',
      pos_pa: 'PA Chest',
      pos_ap: 'AP Chest',
      pos_lat: 'Lateral',
      exam_room: 'Exam Room',
      btn_expose: 'Expose',
      btn_reset: 'Reset',
      panel_image: 'Image View',
      toast_expose: 'X-Ray Exposed!',
      toast_expose_desc: 'Image acquired with current technical factors',
    },
  },
} as const;

export type Lang = 'ar' | 'en';
export type TranslationKeys = typeof translations;