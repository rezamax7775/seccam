<?php
/**
 * Template Name: درباره ما (About Us)
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

$contact_info = bumiya_get_contact_info();
?>

<main id="primary" class="site-main page-about-main">

    <!-- Breadcrumbs -->
    <?php bumiya_breadcrumbs(); ?>

    <!-- About Header -->
    <section class="about-hero-banner">
        <div class="bumiya-container">
            <span class="section-badge">معرفی مجموعه</span>
            <h1 class="about-title">درباره شرکت مهندسی «بومیا حفاظت گستر»</h1>
            <p class="about-subtitle">
                پیشرو در ارائه راهکارهای جامع نظارت تصویری، دوربین مداربسته، شبکه‌های صنعتی و امنیت الکترونیک
            </p>
        </div>
    </section>

    <!-- Company Story & Mission -->
    <section class="about-content-section">
        <div class="bumiya-container">
            <div class="about-grid-2">
                <div class="about-story-text typography-rtl">
                    <h2>بیش از یک دهه پاسداری از امنیت و آرامش شما</h2>
                    <p>
                        شرکت <strong>بومیا حفاظت گستر</strong> با هدف ارائه خدمات تخصصی، مهندسی و مدرن در حوزه سیستم‌های نظارت تصویری و تجهیزات حفاظت الکترونیک تأسیس گردید. در طول سال‌ها فعالیت مستمر، این مجموعه توانسته است با تکیه بر دانش فنی روز، به‌کارگیری تجهیزات باکیفیت از برترین برندهای بین‌المللی و تعهد به اصول اخلاقی و حرفه‌ای، پروژه‌های متعدد مسکونی، تجاری، صنعتی و سازمانی را با موفقیت کامل به انجام برساند.
                    </p>
                    <p>
                        دیدگاه ما در بومیا حفاظت گستر، ایجاد یک تجربه امنیتی بی‌دغدغه و پایدار برای مشتریان است. ما سیستم‌های امنیتی را نه فقط به عنوان مجموعه‌ای از کابل‌ها و دوربین‌ها، بلکه به عنوان یک سامانه حیاتی بازدارنده و مانیتورینگ بلادرنگ نگاه می‌کنیم.
                    </p>

                    <div class="about-vision-boxes">
                        <div class="vision-card">
                            <span class="v-icon">🎯</span>
                            <h4>مأموریت ما</h4>
                            <p>ارائه به‌روزترین تکنولوژی‌های حفاظتی متناسب با بودجه و نیاز واقعی کارفرما بدون هزینه‌های سربار و ناکارآمد.</p>
                        </div>
                        <div class="vision-card">
                            <span class="v-icon">🌟</span>
                            <h4>چشم‌انداز ما</h4>
                            <p>تبدیل شدن به معتمدترین و پیشرفته‌ترین قطب مشاوره، تأمین و اجرای سامانه‌های امنیتی در سراسر ایران.</p>
                        </div>
                    </div>
                </div>

                <div class="about-visual-side">
                    <div class="about-stats-card">
                        <div class="stat-big-item">
                            <span class="stat-number">۱۵+</span>
                            <span class="stat-title">سال تجربه موفق</span>
                        </div>
                        <div class="stat-big-item">
                            <span class="stat-number">۸۵۰+</span>
                            <span class="stat-title">پروژه تحویل‌شده</span>
                        </div>
                        <div class="stat-big-item">
                            <span class="stat-number">۱۰۰٪</span>
                            <span class="stat-title">گارانتی اصالت کالا</span>
                        </div>
                        <div class="stat-big-item">
                            <span class="stat-number">۲۴/۷</span>
                            <span class="stat-title">پشتیبانی فنی</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Why Us 6 Pillars -->
    <section class="about-pillars-section">
        <div class="bumiya-container">
            <div class="section-header text-center">
                <span class="section-badge">ارزش‌های بنیادین</span>
                <h2 class="section-title">چرا مشتریان، «بومیا حفاظت گستر» را انتخاب می‌کنند؟</h2>
                <p class="section-desc">اصول کاری که اعتماد پایدار کارفرمایان را برای ما به ارمغان آورده است</p>
            </div>

            <div class="pillars-grid-3">
                <div class="pillar-box">
                    <div class="pillar-icon">🧠</div>
                    <h3>۱. مشاوره تخصصی و مهندسی</h3>
                    <p>بررسی موشکافانه نقشه محیط و زوایای تابش نور برای انتخاب دقیق لنز و سنسور مناسب، بدون فروش تجهیزات غیرضروری.</p>
                </div>

                <div class="pillar-box">
                    <div class="pillar-icon">🛠️</div>
                    <h3>۲. اجرای کاملاً حرفه‌ای و استاندارد</h3>
                    <p>داکت‌کشی تمیز، آرایش اصولی رک و اتصالات ضدآب، تضمین‌کننده دوام و پایداری طولانی‌مدت سیستم است.</p>
                </div>

                <div class="pillar-box">
                    <div class="pillar-icon">🔒</div>
                    <h3>۳. تجهیزات باکیفیت و اورجینال</h3>
                    <p>تأمین مستقیم تجهیزات از برندهای معتبر جهانی با چیپست‌های درجه یک، همراه با گارانتی طلایی تعویض.</p>
                </div>

                <div class="pillar-box">
                    <div class="pillar-icon">⚡</div>
                    <h3>۴. پشتیبانی سریع و دائمی</h3>
                    <p>پاسخگویی تیم فنی در مواقع بروز اشکال یا قطعی، انجام بروزرسانی سیستم‌عامل دستگاه‌ها و انتقال تصویر بدون وقفه.</p>
                </div>

                <div class="pillar-box">
                    <div class="pillar-icon">💰</div>
                    <h3>۵. قیمت منصفانه و شفاف</h3>
                    <p>صدور پیش‌فاکتور دقیق به همراه لیست کامل اجرت‌ها و ریز قیمت‌ها با بالاترین نسبت کارایی به هزینه.</p>
                </div>

                <div class="pillar-box">
                    <div class="pillar-icon">🤝</div>
                    <h3>۶. خدمات پس از فروش متعهدانه</h3>
                    <p>آموزش رایگان نحوه بازبینی فیلم‌ها و کار با نرم‌افزار به پرسنل حراست و مدیریت مجموعه به همراه تأمین قطعات یدکی.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Consultation CTA -->
    <section class="about-cta-banner">
        <div class="bumiya-container">
            <div class="about-cta-card">
                <h2>برای ارتقای امنیت محیط خود آماده‌اید؟</h2>
                <p>همین امروز با کارشناسان بومیا حفاظت گستر تماس بگیرید یا درخواست مشاوره خود را ثبت نمایید.</p>
                <div class="cta-btns">
                    <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="btn-primary-hero">تماس با کارشناسان</a>
                    <a href="<?php echo esc_url(bumiya_get_whatsapp_link()); ?>" target="_blank" rel="noopener noreferrer" class="btn-secondary-hero">گفتگو در واتساپ</a>
                </div>
            </div>
        </div>
    </section>

</main>

<?php
get_footer();
