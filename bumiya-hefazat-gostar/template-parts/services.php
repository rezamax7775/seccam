<?php
/**
 * Services Grid Template Part
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

$services = [
    [
        'id'    => 'sales',
        'title' => 'فروش تجهیزات حفاظتی و نظارتی',
        'desc'  => 'تأمین مستقیم انواع دوربین‌های مداربسته تحت شبکه (IP) و آنالوگ HD، دستگاه‌های NVR و DVR، هاردهای نظارتی و متعلقات اورجینال با ضمانت معتبر.',
        'icon'  => '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
    ],
    [
        'id'    => 'installation',
        'title' => 'نصب و راه‌اندازی تخصصی دوربین',
        'desc'  => 'اجرای کابل‌کشی استاندارد، داکت‌کشی تمیز، نصب و کالیبراسیون دقیق دوربین‌ها در انواع محیط‌های مسکونی، اداری، فروشگاهی و کارخانجات صنعتی.',
        'icon'  => '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    ],
    [
        'id'    => 'design',
        'title' => 'طراحی مهندسی سیستم نظارتی',
        'desc'  => 'نقشه‌برداری از محل، جانمایی تخصصی دوربین‌ها جهت حذف ۱۰۰ درصدی نقاط کور، محاسبه دقیق پهنای باند شبکه و ظرفیت ذخیره‌سازی هارد.',
        'icon'  => '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
    ],
    [
        'id'    => 'configuration',
        'title' => 'راه‌اندازی و انتقال تصویر آنلاین',
        'desc'  => 'پیکربندی پیشرفته دستگاه‌ها، فعال‌سازی هوش مصنوعی تشخیص چهره و پلاک، و انتقال تصویر امن روی گوشی‌های اندروید و iOS از راه دور.',
        'icon'  => '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
    ],
    [
        'id'    => 'support',
        'title' => 'پشتیبانی، سرویس و تعمیرات',
        'desc'  => 'قراردادهای دوره‌ای نگهداری و عیب‌یابی سیستم‌های دوربین مداربسته، رفع قطعی تصویر، بازیابی رمز عبور دستگاه‌ها و تعمیرات سخت‌افزاری.',
        'icon'  => '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    ],
    [
        'id'    => 'consulting',
        'title' => 'مشاوره و کارشناسی در محل',
        'desc'  => 'حضور کارشناس مجرب در محل پروژه، بررسی نیازهای امنیتی، ارائه پیش‌فاکتور شفاف و پیشنهاد به‌صرفه‌ترین راهکار فنی و اقتصادی.',
        'icon'  => '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    ],
];
?>

<section class="bumiya-services-section" id="services-section">
    <div class="bumiya-container">
        <div class="section-header text-center">
            <span class="section-badge">خدمات تخصصی</span>
            <h2 class="section-title">راهکارهای جامع امنیتی بومیا حفاظت گستر</h2>
            <p class="section-desc">از تأمین مرغوب‌ترین تجهیزات تا طراحی، نصب و پشتیبانی مستمر پروژه‌های نظارتی</p>
        </div>

        <div class="services-grid">
            <?php foreach ($services as $service) : ?>
                <div class="service-card">
                    <div class="service-icon">
                        <?php echo $service['icon']; ?>
                    </div>
                    <h3 class="service-title"><?php echo esc_html($service['title']); ?></h3>
                    <p class="service-desc"><?php echo esc_html($service['desc']); ?></p>
                    <a href="#consultation-form-section" class="service-link open-consultation-modal" data-service="<?php echo esc_attr($service['title']); ?>">
                        <span>درخواست این خدمت</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
