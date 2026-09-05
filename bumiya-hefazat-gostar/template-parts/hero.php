<?php
/**
 * Hero Section Template Part
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

$title      = get_theme_mod('bumiya_hero_title', 'امنیت هوشمند برای خانه و کسب‌وکار شما');
$subtitle   = get_theme_mod('bumiya_hero_subtitle', 'بومیا حفاظت گستر، ارائه‌دهنده راهکارهای حرفه‌ای دوربین مداربسته و سیستم‌های حفاظتی، نظارت هوشمند تصویری، مشاوره، نصب تخصصی و پشتیبانی شبانه‌روزی');
$btn1_text  = get_theme_mod('bumiya_hero_btn1_text', 'مشاهده محصولات و تجهیزات');
$btn2_text  = get_theme_mod('bumiya_hero_btn2_text', 'درخواست مشاوره رایگان');
$hero_bg    = get_theme_mod('bumiya_hero_image', '');

$contact_info = bumiya_get_contact_info();
$whatsapp_url = bumiya_get_whatsapp_link();
?>

<section class="bumiya-hero-section" <?php if ($hero_bg) echo 'style="background-image: linear-gradient(135deg, rgba(15, 43, 92, 0.95) 0%, rgba(9, 20, 40, 0.92) 100%), url(' . esc_url($hero_bg) . ');"'; ?>>
    <div class="bumiya-container">
        <div class="hero-grid">
            <!-- Text Content -->
            <div class="hero-content">
                <div class="hero-badge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    <span>مرکز تخصصی سیستم‌های نظارت تصویری و امنیتی</span>
                </div>

                <h1 class="hero-title"><?php echo esc_html($title); ?></h1>
                
                <p class="hero-subtitle"><?php echo esc_html($subtitle); ?></p>

                <div class="hero-buttons">
                    <a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>" class="btn-primary-hero">
                        <span><?php echo esc_html($btn1_text); ?></span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>

                    <button type="button" class="btn-calc-hero open-calculator-modal">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="16" y1="18" x2="16" y2="18.01"/><line x1="12" y1="18" x2="12" y2="18.01"/><line x1="8" y1="18" x2="8" y2="18.01"/></svg>
                        <span>محاسبه‌گر آنلاین پروژه</span>
                    </button>

                    <a href="#consultation-form-section" class="btn-secondary-hero open-consultation-modal" data-service="مشاوره عمومی">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        <span><?php echo esc_html($btn2_text); ?></span>
                    </a>
                </div>

                <!-- Trust Stats -->
                <div class="hero-stats">
                    <div class="stat-item">
                        <span class="stat-num">۱۵+</span>
                        <span class="stat-label">سال تجربه در پروژه‌های امنیتی</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-num">۸۵۰+</span>
                        <span class="stat-label">پروژه موفق نظارت تصویری</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-num">۱۰۰٪</span>
                        <span class="stat-label">ضمانت اصالت و گارانتی طلایی</span>
                    </div>
                </div>
            </div>

            <!-- Visual Feature Card -->
            <div class="hero-visual">
                <div class="hero-card-glass">
                    <div class="live-indicator">
                        <span class="pulse-dot"></span>
                        <span>سامانه مانیتورینگ زنده فعال</span>
                    </div>

                    <div class="camera-graphic">
                        <svg class="cctv-icon-animated" width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="1.2">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                            <circle cx="12" cy="13" r="4"/>
                            <path d="M12 9v1m0 6v1m-4-4h1m6 0h1"/>
                        </svg>
                    </div>

                    <div class="glass-specs">
                        <div class="spec-row">
                            <span class="spec-label">کیفیت تصویر:</span>
                            <span class="spec-val">4K Ultra HD & ColorVu</span>
                        </div>
                        <div class="spec-row">
                            <span class="spec-label">دید در شب هوشمند:</span>
                            <span class="spec-val">تشخیص انسان و خودرو (AI)</span>
                        </div>
                        <div class="spec-row">
                            <span class="spec-label">انتقال تصویر:</span>
                            <span class="spec-val">موبایل، تبلت و کامپیوتر</span>
                        </div>
                    </div>

                    <a href="<?php echo esc_url($whatsapp_url); ?>" target="_blank" rel="noopener noreferrer" class="hero-whatsapp-btn">
                        <span>ارتباط مستقیم در واتساپ</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>
