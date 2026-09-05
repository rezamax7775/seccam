export interface ThemeFile {
  path: string;
  name: string;
  category: 'core' | 'templates' | 'inc' | 'parts' | 'assets' | 'docs';
  description: string;
  type: 'php' | 'css' | 'js' | 'md';
}

export const THEME_FILES: ThemeFile[] = [
  {
    path: 'style.css',
    name: 'style.css',
    category: 'core',
    description: 'شناسنامه و هدر اصلی پوسته وردپرس به همراه متغیرهای طراحی CSS و استایل‌های پایه‌ای RTL',
    type: 'css'
  },
  {
    path: 'functions.php',
    name: 'functions.php',
    category: 'core',
    description: 'فایل مرکزی توابع، ثبت منوها، لود استایل‌ها و اسکریپت‌ها، و اتصال ماژول‌های inc/',
    type: 'php'
  },
  {
    path: 'header.php',
    name: 'header.php',
    category: 'core',
    description: 'سربرگ اصلی پوسته، شامل اطلاعات تماس سریع، لوگو، منوی ناوبری، مودال جستجو و منوی موبایل',
    type: 'php'
  },
  {
    path: 'footer.php',
    name: 'footer.php',
    category: 'core',
    description: 'پانویس پوسته، ستون‌های اطلاعات شرکت، پیوندهای سریع، گواهینامه‌ها و لود مودال‌های استعلام',
    type: 'php'
  },
  {
    path: 'front-page.php',
    name: 'front-page.php',
    category: 'templates',
    description: 'قالب صفحه اصلی با بنر متحرک، ویترین خدمات، آخرین محصولات هوشمند، پروژه‌های شاخص و فرم استعلام',
    type: 'php'
  },
  {
    path: 'index.php',
    name: 'index.php',
    category: 'templates',
    description: 'قالب پشتیبان و وبلاگ اصلی با فهرست مقالات و سایدبار اختصاصی',
    type: 'php'
  },
  {
    path: 'single.php',
    name: 'single.php',
    category: 'templates',
    description: 'قالب نمایش تکی مقالات آموزشی، نکات نگهداری سیستم‌های حفاظتی و بخش نظرات',
    type: 'php'
  },
  {
    path: 'single-product.php',
    name: 'single-product.php',
    category: 'templates',
    description: 'صفحه اختصاصی معرفی محصول با جدول مشخصات فنی کامل، سنسور، دید در شب و دکمه استعلام قیمت',
    type: 'php'
  },
  {
    path: 'single-project.php',
    name: 'single-project.php',
    category: 'templates',
    description: 'صفحه معرفی پروژه اجرا شده با اطلاعات کارفرما، تعداد دوربین، متراژ فیبر نوری و چالش‌های فنی',
    type: 'php'
  },
  {
    path: 'archive-product.php',
    name: 'archive-product.php',
    category: 'templates',
    description: 'کاتالوگ و آرشیو کلی محصولات امنیتی با فیلتر دسته‌بندی و قابلیت مقایسه فنی',
    type: 'php'
  },
  {
    path: 'archive-project.php',
    name: 'archive-project.php',
    category: 'templates',
    description: 'گالری و نمونه‌کارهای اجرا شده پروژه‌های صنعتی، تجاری و ساختمانی',
    type: 'php'
  },
  {
    path: 'taxonomy-product_category.php',
    name: 'taxonomy-product_category.php',
    category: 'templates',
    description: 'آرشیو دسته‌بندی محصولات (نظیر دوربین تحت شبکه، سیستم‌های اعلام حریق، پلاک‌خوان)',
    type: 'php'
  },
  {
    path: 'taxonomy-project_category.php',
    name: 'taxonomy-project_category.php',
    category: 'templates',
    description: 'آرشیو دسته‌بندی پروژه‌ها (نظیر نفت و گاز، مراکز تجاری، اماکن دولتی)',
    type: 'php'
  },
  {
    path: 'page-about.php',
    name: 'page-about.php',
    category: 'templates',
    description: 'برگه درباره شرکت بومیا حفاظت گستر با تاریخچه، افتخارات، چارت سازمانی و گواهینامه‌ها',
    type: 'php'
  },
  {
    path: 'page-contact.php',
    name: 'page-contact.php',
    category: 'templates',
    description: 'برگه تماس با ما با نقشه، تلفن‌های مستقیم واحد فروش و پشتیبانی، و فرم هوشمند استعلام',
    type: 'php'
  },
  {
    path: 'page.php',
    name: 'page.php',
    category: 'templates',
    description: 'قالب پیش‌فرض برگه‌ها در وردپرس با طراحی شکیل و هدر اختصاصی',
    type: 'php'
  },
  {
    path: 'search.php',
    name: 'search.php',
    category: 'templates',
    description: 'صفحه نتایج جستجو با تفکیک هوشمند بین مقالات، محصولات و پروژه‌ها',
    type: 'php'
  },
  {
    path: '404.php',
    name: '404.php',
    category: 'templates',
    description: 'صفحه اختصاصی خطای ۴۰۴ با پیام راهنما و هدایت به بخش‌های اصلی سایت',
    type: 'php'
  },
  {
    path: 'inc/post-types.php',
    name: 'inc/post-types.php',
    category: 'inc',
    description: 'ثبت پست‌تایپ‌های سفارشی: محصولات (product)، پروژه‌ها (project) و درخواست‌های مشاوره (consultation_req)',
    type: 'php'
  },
  {
    path: 'inc/taxonomies.php',
    name: 'inc/taxonomies.php',
    category: 'inc',
    description: 'ثبت تاکسونومی‌ها: دسته‌بندی و برند محصولات، دسته‌بندی و موقعیت مکانی پروژه‌ها',
    type: 'php'
  },
  {
    path: 'inc/meta-boxes.php',
    name: 'inc/meta-boxes.php',
    category: 'inc',
    description: 'متاباکس‌های حرفه‌ای جهت ورود مشخصات فنی دوربین‌ها (سنسور، رزولوشن، دید در شب) و اطلاعات پروژه',
    type: 'php'
  },
  {
    path: 'inc/admin-columns.php',
    name: 'inc/admin-columns.php',
    category: 'inc',
    description: 'ستون‌های سفارشی پیشخوان وردپرس برای نمایش مشخصات، شماره تماس، وضعیت و مدل در جداول ادمین',
    type: 'php'
  },
  {
    path: 'inc/contact-form.php',
    name: 'inc/contact-form.php',
    category: 'inc',
    description: 'پردازشگر AJAX ثبت درخواست استعلام قیمت و مشاوره با اعتبارسنجی امنیتی Nonce',
    type: 'php'
  },
  {
    path: 'inc/customizer.php',
    name: 'inc/customizer.php',
    category: 'inc',
    description: 'تنظیمات زنده پوسته در کاستومایزر وردپرس (شماره تماس، آدرس، واتساپ، شبکه‌های اجتماعی)',
    type: 'php'
  },
  {
    path: 'inc/helpers.php',
    name: 'inc/helpers.php',
    category: 'inc',
    description: 'توابع کمکی قالب، فرمت‌کننده قیمت، اعداد فارسی، برچسب‌های وضعیت و نشان‌ها',
    type: 'php'
  },
  {
    path: 'inc/security.php',
    name: 'inc/security.php',
    category: 'inc',
    description: 'تنظیمات امنیتی، متاتگ‌های Open Graph، بهینه‌سازی سرعت و ضد اسپم',
    type: 'php'
  },
  {
    path: 'inc/demo-importer.php',
    name: 'inc/demo-importer.php',
    category: 'inc',
    description: 'درون‌ریز داده‌های اولیه دمو (محصولات، پروژه‌ها و تنظیمات) تنها با یک کلیک در پیشخوان',
    type: 'php'
  },
  {
    path: 'template-parts/hero.php',
    name: 'template-parts/hero.php',
    category: 'parts',
    description: 'بخش بنر و اسلایدر صفحه اصلی با شعارها و دکمه‌های اقدام به عمل (CTA)',
    type: 'php'
  },
  {
    path: 'template-parts/services.php',
    name: 'template-parts/services.php',
    category: 'parts',
    description: 'بخش کارت‌های معرفی ۶ سرویس اصلی شرکت با آیکون و شمارنده‌ها',
    type: 'php'
  },
  {
    path: 'template-parts/product-card.php',
    name: 'template-parts/product-card.php',
    category: 'parts',
    description: 'کامپوننت کارت محصول با نمایش رزولوشن، دید در شب و دکمه استعلام سریع',
    type: 'php'
  },
  {
    path: 'template-parts/project-card.php',
    name: 'template-parts/project-card.php',
    category: 'parts',
    description: 'کامپوننت کارت پروژه با نمایش کارفرما، تعداد دوربین و برچسب‌های تکنولوژی',
    type: 'php'
  },
  {
    path: 'template-parts/contact-modal.php',
    name: 'template-parts/contact-modal.php',
    category: 'parts',
    description: 'مودال پیشرفته استعلام قیمت و دریافت اطلاعات پروژه به صورت پاپ‌آپ سراسری',
    type: 'php'
  },
  {
    path: 'assets/css/main.css',
    name: 'assets/css/main.css',
    category: 'assets',
    description: 'استایل‌های فرانت‌اند واکنش‌گرا و مدرن قالب با پالت رنگ سازمانی سرمه‌ای و آبی فیروزه‌ای',
    type: 'css'
  },
  {
    path: 'assets/css/admin.css',
    name: 'assets/css/admin.css',
    category: 'assets',
    description: 'استایل‌های اختصاصی پیشخوان وردپرس و برچسب‌های وضعیت درخواست‌های استعلام',
    type: 'css'
  },
  {
    path: 'assets/js/main.js',
    name: 'assets/js/main.js',
    category: 'assets',
    description: 'کدهای جاوااسکریپت فرانت‌اند جهت کنترل منوی موبایل، مودال‌ها و ارسال فرم ایجکس',
    type: 'js'
  },
  {
    path: 'assets/js/admin.js',
    name: 'assets/js/admin.js',
    category: 'assets',
    description: 'کدهای جاوااسکریپت پیشخوان جهت تغییر سریع وضعیت استعلام‌ها بدون رفرش صفحه',
    type: 'js'
  },
  {
    path: 'README.md',
    name: 'README.md',
    category: 'docs',
    description: 'مستندات کامل راهنمای نصب، فعال‌سازی، ساختار فایل‌ها و نحوه استفاده از پوسته',
    type: 'md'
  }
];
