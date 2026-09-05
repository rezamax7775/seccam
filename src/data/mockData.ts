export interface Product {
  id: string;
  title: string;
  model: string;
  category: string;
  brand: string;
  resolution: string;
  nightVision: string;
  sensor: string;
  protection: string;
  warranty: string;
  priceEstimate: string;
  features: string[];
  description: string;
  imageUrl: string;
  isFeatured?: boolean;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  location: string;
  date: string;
  cameraCount: number;
  nvrChannels: number;
  fiberDistance: string;
  summary: string;
  challenges: string;
  solution: string;
  technologies: string[];
  imageUrl: string;
}

export interface ConsultationRequest {
  id: string;
  name: string;
  phone: string;
  company?: string;
  serviceType: string;
  productName?: string;
  message: string;
  date: string;
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'cancelled';
  adminNotes?: string;
}

export interface SiteSettings {
  companyName: string;
  companySubtitle: string;
  phone1: string;
  phoneHotline: string;
  email: string;
  address: string;
  heroBadge: string;
  heroTitle: string;
  heroTitleGradient: string;
  heroSubtitle: string;
  heroProjectsCount: string;
  heroWarrantyMonths: string;
  heroUptimePercent: string;
  heroImage: string;
  copyrightText: string;
  aboutText: string;
  supportAvailableText: string;
}

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  companyName: 'بومیا حفاظت گستر',
  companySubtitle: 'سیستم‌های نظارت تصویری هوشمند و امنیت الکترونیک',
  phone1: '۰۲۱-۸۸۹۹۲۲۰۱',
  phoneHotline: '۰۹۱۲-۳۴۵-۶۷۸۹',
  email: 'info@bumiya-hefazat.ir',
  address: 'تهران، خیابان مطهری، خیابان فجر، ساختمان بومیا، طبقه ۴',
  heroBadge: 'پیشگام در یکپارچه‌سازی سیستم‌های حفاظت فیزیکی و هوش مصنوعی',
  heroTitle: 'امنیت هوشمند، پایدار و بدون وقفه برای',
  heroTitleGradient: 'صنایع و اماکن حساس',
  heroSubtitle: 'شرکت مهندسی بومیا حفاظت گستر با ۱۵ سال تجربه، طراح و مجری تخصصی شبکه‌های مداربسته ۴K، پلاک‌خوان هوشمند جاده‌ای، اعلام و اطفاء حریق آدرس‌پذیر و سامانه‌های بیومتریک کنترل تردد در سراسر کشور است.',
  heroProjectsCount: '+۸۵۰',
  heroWarrantyMonths: '۳۶ ماه',
  heroUptimePercent: '۹۹.۸٪',
  heroImage: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
  copyrightText: 'تمامی حقوق متعلق به شرکت مهندسی بومیا حفاظت گستر است © ۱۴۰۳',
  aboutText: 'شرکت بومیا حفاظت گستر به عنوان یکی از مجموعه‌های پیشگام در حوزه طراحی، تامین، اجرا و نگهداری سیستم‌های حفاظت الکترونیک و نظارت تصویری در ایران فعالیت می‌نماید. ما با بهره‌گیری از مهندسین مجرب و اخذ نمایندگی برندهای معتبر جهانی، امنیت پایدار بیش از ۸۵۰ مجتمع صنعتی، پالایشگاهی، تجاری و دولتی را تضمین نموده‌ایم.',
  supportAvailableText: 'پشتیبانی فنی ۲۴/۷ فعال'
};

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'دوربین مداربسته بولت هوشمند تحت شبکه ۴K با هوش مصنوعی',
    model: 'BHG-IPC-B8400-AI',
    category: 'دوربین تحت شبکه (IP)',
    brand: 'بومیا پرو (Bumiya Pro)',
    resolution: '8 مگاپیکسل 4K UHD (3840x2160)',
    nightVision: 'دید در شب رنگی تمام‌وقت (Full-Color) تا ۶۰ متر',
    sensor: '1/1.8" Progressive Scan CMOS ساخت سونی',
    protection: 'استاندارد ضد آب و گردوغبار IP67 و ضد ضربه IK10',
    warranty: '۳۶ ماه گارانتی طلایی تعویض بومیا حفاظت گستر',
    priceEstimate: 'تماس جهت استعلام پروژه',
    features: [
      'تشخیص هوشمند چهره و پلاک با الگوریتم Deep Learning',
      'فشرده‌سازی پیشرفته H.265+ جهت کاهش ۷۰٪ پهنای باند',
      'میکروفون داخلی ضد نویز و آلارم صوتی / نوری هوشمند',
      'پشتیبانی از کارت حافظه MicroSD تا 512 گیگابایت',
      'تکنولوژی WDR واقعی 120dB جهت اصلاح ضد نور شدید'
    ],
    description: 'این دوربین بولت پیشرفته ویژه حفاظت پیرامونی کارخانجات، پالایشگاه‌ها، انبارها و اماکن حساس با دقت فوق‌العاده در شب و روز طراحی شده است.',
    imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    isFeatured: true
  },
  {
    id: 'p2',
    title: 'دوربین اسپیددام چرخشی ۳۶۰ درجه لیزری با زوم اپتیکال ۳۲X',
    model: 'BHG-PTZ-S3200-IR',
    category: 'دوربین اسپیددام (PTZ)',
    brand: 'بومیا پرو (Bumiya Pro)',
    resolution: '4 مگاپیکسل QHD با نرخ فریم 60fps',
    nightVision: 'دید در شب مادون قرمز هوشمند لیزری تا ۲۰۰ متر',
    sensor: '1/2.8" STARVIS™ CMOS حساس به نور ضعیف',
    protection: 'استاندارد IP67 و مقاومت در برابر رعد و برق تا 6KV',
    warranty: '۲۴ ماه گارانتی بی‌قیدوشرط بومیا گستر',
    priceEstimate: 'تماس جهت استعلام پروژه',
    features: [
      'زوم اپتیکال واقعی ۳۲ برابر بدون افت کیفیت تصویر',
      'قابلیت ردیابی خودکار سوژه (Auto Tracking 3.0)',
      'سیستم گرم‌کننده و فن داخلی جهت کارکرد در دمای منفی ۴۰ تا مثبت ۷۰ درجه',
      'تعریف ۳۰۰ نقطه از پیش تعیین‌شده (Preset) و ۸ مسیر گشت‌زنی',
      'تثبیت‌کننده الکترونیکی تصویر (EIS)'
    ],
    description: 'انتخابی بی‌نظیر برای پایش مناطق وسیع از جمله بنادر، فرودگاه‌ها، مجتمع‌های پتروشیمی و محوطه‌های بزرگ صنعتی با ردیابی خودکار متجاوزین.',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=800&q=80',
    isFeatured: true
  },
  {
    id: 'p3',
    title: 'دوربین اختصاصی پلاک‌خوان هوشمند جاده‌ای و ورودی سازمانی',
    model: 'BHG-LPR-X900-ANPR',
    category: 'سیستم پلاک‌خوان (LPR / ANPR)',
    brand: 'بومیا ویژن (Bumiya Vision)',
    resolution: '4 مگاپیکسل با سنسور شاتر گلوبال (Global Shutter)',
    nightVision: 'پروژکتور مادون قرمز تخصصی بدون بازتاب پلاک تا ۵۰ متر',
    sensor: 'سنسور سرعت بالا ویژه وسایل نقلیه تا 180 کیلومتر در ساعت',
    protection: 'IP67 با بدنه آلومینیومی تقویت‌شده ضد زنگ',
    warranty: '۳۶ ماه گارانتی + پشتیبانی نرم‌افزاری پلاک‌خوان فارسی',
    priceEstimate: 'تماس جهت استعلام پروژه',
    features: [
      'موتور هوش مصنوعی شناسایی حروف و اعداد پلاک‌های استاندارد ایران',
      'دقت تشخیص پلاک بالای ۹۸.۷ درصد در شرایط تاریکی مطلق و بارندگی',
      'امکان اتصال مستقیم به راهبند و گیت‌های کنترل تردد خودکار',
      'مدیریت لیست سفید (White List) و لیست سیاه (Black List) با آلارم آنی',
      'خروجی وب‌سرویس و API برای اتصال به نرم‌افزارهای یکپارچه مالی و اداری'
    ],
    description: 'سیستم جامع مدیریت تردد و قرائت پلاک خودکار خودروها در ورودی مجتمع‌های مسکونی، پارکینگ‌های طبقاتی، ادارات دولتی و ایستگاه‌های عوارضی.',
    imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80',
    isFeatured: true
  },
  {
    id: 'p4',
    title: 'دستگاه ذخیره‌ساز شبکه ۳۲ کانال هوشمند ۴K با ۲ خروجی HDMI مستقل',
    model: 'BHG-NVR-9332-4K-AI',
    category: 'دستگاه ذخیره‌ساز (NVR / Server)',
    brand: 'بومیا پرو (Bumiya Pro)',
    resolution: 'پشتیبانی از رزولوشن تا 12 مگاپیکسل در تمامی کانال‌ها',
    nightVision: 'پشتیبانی از هوش مصنوعی دوربین و پردازشگر داخلی',
    sensor: 'پردازنده ۴ هسته‌ای قدرتمند صنعتی با پهنای باند ورودی 320Mbps',
    protection: 'بدنه رک‌مونت 2U صنعتی با منبع تغذیه Redundant پایدار',
    warranty: '۲۴ ماه گارانتی طلایی',
    priceEstimate: 'تماس جهت استعلام پروژه',
    features: [
      'پشتیبانی همزمان از ۴ هارد اینترپرایز تا ظرفیت کل ۴۰ ترابایت',
      'جستجوی هوشمند بر اساس رنگ لباس، نوع وسیله نقلیه و چهره',
      'انتقال تصویر P2P رایگان، پرسرعت و پایدار روی سرورهای داخلی ایران',
      'پشتیبانی از پروتکل‌های استاندارد ONVIF پروفایل S, G, T',
      'سیستم خنک‌کننده هوشمند بی‌صدا با مانیتورینگ سلامت هارد دیسک (S.M.A.R.T)'
    ],
    description: 'مرکز کنترل و ذخیره‌سازی داده‌های نظارتی با توان پردازش هوش مصنوعی بالا جهت تحلیل رفتاری، ورود به محدوده غیرمجاز و شمارش افراد.',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    isFeatured: true
  },
  {
    id: 'p5',
    title: 'ترمینال کنترل تردد چندبیومتریک تشخیص چهره، اثر انگشت و کارت',
    model: 'BHG-AC-FACE-700',
    category: 'کنترل تردد و اکسس کنترل',
    brand: 'بومیا سکیور (Bumiya Secure)',
    resolution: 'دوربین دوگانه استریو با هوش مصنوعی ضد جعل عکس (Anti-Spoofing)',
    nightVision: 'سنسور مادون قرمز تشخیص در تاریکی مطلق (0 Lux)',
    sensor: 'الگوریتم بیومتریک نسل جدید با سرعت شناسایی کمتر از ۰.۲ ثانیه',
    protection: 'استاندارد IP65 مناسب نصب در محیط‌های بیرونی مسقف',
    warranty: '۲۴ ماه گارانتی + نرم‌افزار جامع حضور و غیاب',
    priceEstimate: 'تماس جهت استعلام پروژه',
    features: [
      'ظرفیت ثبت ۱۰,۰۰۰ چهره و ۵۰,۰۰۰ کارت / تگ هوشمند',
      'صفحه نمایش لمسی ۵ اینچی IPS با وضوح فوق‌العاده',
      'امکان اتصال به انواع قفل‌های مگنت، رول بولت و گیت‌های شیشه‌ای',
      'پشتیبانی از شبکه Wi-Fi، TCP/IP و پروتکل ارتباطی Wiegand',
      'هشدار باز ماندن درب یا تلاش برای جداسازی دستگاه از دیوار (Tamper)'
    ],
    description: 'دستگاه پیشرفته کنترل دسترسی با ایمنی بسیار بالا، بدون نیاز به تماس فیزیکی، ایده‌آل برای اتاق‌های سرور، سازمان‌ها و کارخانجات.',
    imageUrl: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80',
    isFeatured: false
  },
  {
    id: 'p6',
    title: 'پنل مرکزی اعلام حریق آدرس‌پذیر ۲ لوپ صنعتی با تاییدیه آتش‌نشانی',
    model: 'BHG-FA-2LOOP-PRO',
    category: 'سیستم‌های اعلام و اطفاء حریق',
    brand: 'بومیا فایر (Bumiya Fire)',
    resolution: 'پشتیبانی از ۵۰۰ قطعه آدرس‌پذیر با دقت تعیین دقیق زون',
    nightVision: 'نمایشگر گرافیکی LCD رنگی جهت نمایش پیام‌های اضطراری',
    sensor: 'سازگار با دتکتورهای دود، حرارت، گاز منواکسید و شعله',
    protection: 'کابینت فلزی استاندارد با قفل امنیتی و رنگ الکترواستاتیک',
    warranty: '۳۶ ماه ضمانت و ۱۰ سال خدمات پس از فروش رسمی',
    priceEstimate: 'تماس جهت استعلام پروژه',
    features: [
      'دارای گواهینامه‌های معتبر بین‌المللی EN54-2 و EN54-4',
      'پشتیبانی کامل از باتری‌های پشتیبان اضطراری تا ۷۲ ساعت آماده‌باش',
      'امکان اتصال به تلفن‌کننده سیم‌کارتی و ارسال پیامک فوری به آتش‌نشانی',
      'ایزولاتور داخلی در کلیه لوپ‌ها جهت جلوگیری از قطعی کل سیستم',
      'قابلیت اتصال به سیستم اطفا اتوماتیک گاز FM200 و اسپرینکلر'
    ],
    description: 'سامانه استاندارد و تایید شده اعلام حریق آدرس‌پذیر مناسب برج‌های مسکونی، مراکز خرید، بیمارستان‌ها و سایت‌های صنعتی با تفکیک دقیق مکان بروز حادثه.',
    imageUrl: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=800&q=80',
    isFeatured: false
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj1',
    title: 'طراحی، تامین و اجرای شبکه نظارت تصویری و پلاک‌خوان مجتمع پتروشیمی دماوند',
    client: 'شرکت صنایع پتروشیمی خلیج فارس',
    category: 'صنعتی و نفت و گاز',
    location: 'منطقه ویژه اقتصادی عسلویه',
    date: 'اردیبهشت ۱۴۰۳',
    cameraCount: 148,
    nvrChannels: 192,
    fiberDistance: '۱۲.۵ کیلومتر',
    summary: 'پروژه جامع تجهیز محوطه ۷۰ هکتاری پتروشیمی به دوربین‌های ضد انفجار ATEX، رینگ فیبر نوری امن و اتاق مانیتورینگ مرکزی با ۱۲ مانیتور صنعتی.',
    challenges: 'شرایط آب‌وهوایی فوق‌العاده خورنده و شرجی، گردوغبار شدید و نیازمندی به تجهیزات دارای استاندارد ضد جرقه و ضدانفجار بین‌المللی.',
    solution: 'استفاده از دوربین‌های استیل ضد زنگ 316L با استانداردهای ضدانفجار Exd، اجرای بستر فیبر نوری با مسیرهای موازی (Redundant) و سامانه تشخیص خودکار نشت گاز و شعله با پردازش تصویر.',
    technologies: ['دوربین‌های ضد انفجار ATEX', 'رینگ فیبر نوری صنعتی', 'اتاق مانیتورینگ با ویدئو وال', 'هوش مصنوعی تشخیص شعله'],
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'proj2',
    title: 'سامانه حفاظت الکترونیک و کنترل تردد هوشمند مرکز لجستیک و انبار مرکزی کاسپین',
    client: 'هلدینگ پخش سراسری کاسپین',
    category: 'لجستیک و انبارداری',
    location: 'شهرک صنعتی شمس‌آباد، تهران',
    date: 'آبان ۱۴۰۲',
    cameraCount: 84,
    nvrChannels: 96,
    fiberDistance: '۴.۸ کیلومتر',
    summary: 'پوشش کامل انبار مسقف ۴۰ هزار مترمربعی به همراه درب‌های بارگیری، گیت‌های کنترل تردد پرسنل و سیستم پلاک‌خوان ثبت ورود و خروج تریلرها.',
    challenges: 'نیاز به خوانش دقیق بارکد بسته‌ها روی نوار نقاله و نظارت شبانه‌روزی بدون نقطه کور در راهروهای قفسه‌بندی مرتفع ۱۲ متری.',
    solution: 'به‌کارگیری دوربین‌های دید در شب با زاویه فوق‌عریض، نصب دتکتورهای حرارتی پیشرفته اعلام حریق در سقف سوله و یکپارچه‌سازی سیستم ورود و خروج با سامانه ERP شرکت.',
    technologies: ['سیستم پلاک‌خوان جاده‌ای', 'دوربین‌های ۴K با لنز وریفوکال', 'سیستم اعلام حریق آدرس‌پذیر', 'گیت تردد پرسرعت'],
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'proj3',
    title: 'یکپارچه‌سازی سیستم‌های حفاظتی، دوربین مداربسته و اعلام حریق برج ۳۶ طبقه رویال پارک',
    client: 'گروه سرمایه‌گذاری ساختمانی مهر',
    category: 'برج‌های تجاری و مسکونی لوکس',
    location: 'الهیه، تهران',
    date: 'اسفند ۱۴۰۲',
    cameraCount: 210,
    nvrChannels: 256,
    fiberDistance: '۱۸ کیلومتر',
    summary: 'طراحی زیرساخت BMS، اکسس کنترل هوشمند آسانسورها، پلاک‌خوان پارکینگ ۵ طبقه و سیستم صوتی پیجینگ و تخلیه اضطراری حریق.',
    challenges: 'تراکم بالای جمعیت، الزامات زیبایی‌شناختی معماری لوکس بدون افت کیفیت پوشش امنیتی و هماهنگی کامل با ضوابط سخت‌گیرانه سازمان آتش‌نشانی.',
    solution: 'استفاده از دوربین‌های مینی‌دام مخفی با بدنه دکوراتیو، سیستم فراخوانی آسانسور بر اساس چهره مالکان و سامانه یکپارچه اطفای حریق اسپرینکلر و مه‌پاش (Water Mist).',
    technologies: ['کنترل تردد آسانسور با چهره', 'دوربین‌های مینی دام ۴K', 'سیستم اعلام و اطفا یکپارچه', 'پیجینگ تحت شبکه'],
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_INQUIRIES: ConsultationRequest[] = [
  {
    id: 'REQ-1048',
    name: 'مهندس محمودی',
    phone: '09123456789',
    company: 'شرکت فولاد البرز',
    serviceType: 'دوربین مداربسته و حفاظت پیرامونی',
    productName: 'BHG-PTZ-S3200-IR',
    message: 'جهت پایش محوطه کارخانه با مساحت ۵ هکتار نیاز به مشاوره فنی، برآورد تعداد دوربین و بازدید کارشناسی از سایت داریم.',
    date: '۱۴۰۳/۰۵/۲۲',
    status: 'new'
  },
  {
    id: 'REQ-1047',
    name: 'دکتر صابری',
    phone: '09351234567',
    company: 'مرکز درمانی نور',
    serviceType: 'کنترل تردد و اکسس کنترل هوشمند',
    productName: 'BHG-AC-FACE-700',
    message: 'درخواست پیش‌فاکتور برای تجهیز ۴ اتاق سرور و داروخانه به قفل مگنتی و سیستم شناسایی چهره با لایسنس نرم‌افزاری.',
    date: '۱۴۰۳/۰۵/۲۰',
    status: 'contacted'
  },
  {
    id: 'REQ-1046',
    name: 'آقای شجاعی',
    phone: '09199887766',
    company: 'برج اداری کاسپین',
    serviceType: 'سیستم‌های اعلام و اطفاء حریق',
    productName: 'BHG-FA-2LOOP-PRO',
    message: 'نیاز به بازطراحی لوپ‌های اعلام حریق طبقات منفی پارکینگ و تاییدیه آتش‌نشانی منطقه.',
    date: '۱۴۰۳/۰۵/۱۸',
    status: 'in_progress'
  }
];

export const SERVICES = [
  {
    id: 'cctv',
    title: 'نظارت تصویری و دوربین‌های مداربسته هوشمند',
    desc: 'طراحی، کابل‌کشی فیبر نوری، نصب دوربین‌های تحت شبکه ۴K، حرارتی، ضد انفجار و راهبری سیستم‌های VMS پیشرفته.',
    icon: 'Camera',
    stats: 'بیش از ۵۵۰ پروژه صنعتی'
  },
  {
    id: 'access',
    title: 'سامانه‌های کنترل دسترسی و گیت‌های بیومتریک',
    desc: 'احراز هویت چندگانه از طریق تشخیص چهره، عنبیه، پلاک خودرو و گیت‌های کنترل تردد ضد تقلب سازمانی.',
    icon: 'ShieldCheck',
    stats: 'تجهیز بیش از ۲۰۰ سازمان'
  },
  {
    id: 'fire',
    title: 'سیستم‌های اعلام و اطفاء حریق اتوماتیک',
    desc: 'طراحی و پیاده‌سازی اعلام حریق آدرس‌پذیر، اطفا با گازهای FM200 و CO2 با اخذ تاییدیه‌های رسمی سازمان آتش‌نشانی.',
    icon: 'Flame',
    stats: 'تاییدیه‌های رسمی آتش‌نشانی'
  },
  {
    id: 'perimeter',
    title: 'حفاظت پیرامونی و فنس‌های الکتریکی هوشمند',
    desc: 'سنسورهای لرزشی فیبر نوری، رادارهای نظارتی محوطه و حصارهای شوک‌دهنده ولتاژ بالا با آلارم هوشمند.',
    icon: 'Cpu',
    stats: 'حفاظت از بیش از ۱۲۰ کیلومتر مرز و محوطه'
  },
  {
    id: 'monitoring',
    title: 'طراحی و تجهیز اتاق‌های مانیتورینگ و ویدئو وال',
    desc: 'کنسول‌های ارگونومیک، مانیتورهای صنعتی بدون فریم ۲۴/۷، سرورهای پشتیبان داده و سیستم‌های برق اضطراری UPS.',
    icon: 'Monitor',
    stats: 'اجرای ۴۵ اتاق کنترل مرکزی'
  },
  {
    id: 'maintenance',
    title: 'پشتیبانی، سرویس دوره‌ای و اورهال سامانه‌های امنیتی',
    desc: 'عقد قراردادهای نگهداری ۲۴ ساعته، مانیتورینگ سلامت تجهیزات و اعزام تیم‌های تخصصی در کوتاه‌ترین زمان ممکن.',
    icon: 'Wrench',
    stats: 'پشتیبانی با SLA تضمین‌شده'
  }
];
