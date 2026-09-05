<?php
/**
 * The Header for Bumiya Hefazat Gostar Theme
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

$contact_info = bumiya_get_contact_info();
$whatsapp_url = bumiya_get_whatsapp_link();
?>
<!doctype html>
<html <?php language_attributes(); ?> dir="rtl">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class('rtl'); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site-wrapper">
    <a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e('پرش به محتوای اصلی', 'bumiya-hefazat'); ?></a>

    <!-- Top Bar -->
    <div class="bumiya-topbar">
        <div class="bumiya-container">
            <div class="topbar-inner">
                <div class="topbar-right">
                    <span class="topbar-badge">🛡️ سیستم‌های هوشمند نظارت تصویری و امنیتی</span>
                    <span class="topbar-hours">🕒 <?php echo esc_html($contact_info['working_hours']); ?></span>
                </div>
                <div class="topbar-left">
                    <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9+]/', '', $contact_info['phone_main'])); ?>" class="topbar-phone" dir="ltr">
                        <span><?php echo esc_html($contact_info['phone_main']); ?></span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </a>
                    <a href="<?php echo esc_url($whatsapp_url); ?>" target="_blank" rel="noopener noreferrer" class="topbar-whatsapp">
                        <span>ارتباط در واتساپ</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Header & Navigation -->
    <header id="masthead" class="site-header">
        <div class="bumiya-container">
            <div class="header-inner">
                <!-- Branding / Logo -->
                <div class="site-branding">
                    <?php if (has_custom_logo()) : ?>
                        <?php the_custom_logo(); ?>
                    <?php else : ?>
                        <a href="<?php echo esc_url(home_url('/')); ?>" class="brand-logo-link" rel="home">
                            <div class="logo-shield-icon">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                <div class="cctv-mini-dot"></div>
                            </div>
                            <div class="brand-text">
                                <span class="brand-name">بومیا حفاظت گستر</span>
                                <span class="brand-slogan">سیستم‌های حفاظتی و دوربین مداربسته</span>
                            </div>
                        </a>
                    <?php endif; ?>
                </div>

                <!-- Desktop Navigation Menu -->
                <nav id="site-navigation" class="main-navigation" aria-label="منوی اصلی">
                    <?php if (has_nav_menu('primary-menu')) : ?>
                        <?php
                        wp_nav_menu([
                            'theme_location' => 'primary-menu',
                            'menu_id'        => 'primary-menu',
                            'menu_class'     => 'nav-menu',
                            'container'      => false,
                            'fallback_cb'    => false,
                        ]);
                        ?>
                    <?php else : ?>
                        <ul class="nav-menu">
                            <li class="<?php echo is_front_page() ? 'current-menu-item' : ''; ?>">
                                <a href="<?php echo esc_url(home_url('/')); ?>">صفحه اصلی</a>
                            </li>
                            <li class="menu-item-has-children <?php echo (is_post_type_archive('product') || is_singular('product') || is_tax('product_category')) ? 'current-menu-item' : ''; ?>">
                                <a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>">محصولات</a>
                                <ul class="sub-menu">
                                    <li><a href="<?php echo esc_url(home_url('/products/?cat=camera')); ?>">دوربین مداربسته (IP & HD)</a></li>
                                    <li><a href="<?php echo esc_url(home_url('/products/?cat=dvr')); ?>">دستگاه DVR</a></li>
                                    <li><a href="<?php echo esc_url(home_url('/products/?cat=nvr')); ?>">دستگاه NVR</a></li>
                                    <li><a href="<?php echo esc_url(home_url('/products/?cat=hdd')); ?>">هارد نظارتی</a></li>
                                    <li><a href="<?php echo esc_url(home_url('/products/?cat=network')); ?>">تجهیزات شبکه و سوئیچ PoE</a></li>
                                    <li><a href="<?php echo esc_url(home_url('/products/?cat=cable')); ?>">کابل و متعلقات</a></li>
                                    <li><a href="<?php echo esc_url(home_url('/products/?cat=accessories')); ?>">لوازم جانبی</a></li>
                                </ul>
                            </li>
                            <li class="menu-item-has-children">
                                <a href="<?php echo esc_url(home_url('/#services-section')); ?>">خدمات</a>
                                <ul class="sub-menu">
                                    <li><a href="<?php echo esc_url(home_url('/#services-section')); ?>">نصب و راه‌اندازی دوربین</a></li>
                                    <li><a href="<?php echo esc_url(home_url('/#services-section')); ?>">طراحی سیستم حفاظتی</a></li>
                                    <li><a href="<?php echo esc_url(home_url('/#services-section')); ?>">انتقال تصویر و تنظیمات</a></li>
                                    <li><a href="<?php echo esc_url(home_url('/#services-section')); ?>">پشتیبانی و تعمیرات</a></li>
                                </ul>
                            </li>
                            <li class="<?php echo (is_post_type_archive('project') || is_singular('project')) ? 'current-menu-item' : ''; ?>">
                                <a href="<?php echo esc_url(get_post_type_archive_link('project')); ?>">پروژه‌ها</a>
                            </li>
                            <li class="<?php echo is_page('about') ? 'current-menu-item' : ''; ?>">
                                <a href="<?php echo esc_url(home_url('/about/')); ?>">درباره ما</a>
                            </li>
                            <li class="<?php echo is_page('contact') ? 'current-menu-item' : ''; ?>">
                                <a href="<?php echo esc_url(home_url('/contact/')); ?>">تماس با ما</a>
                            </li>
                        </ul>
                    <?php endif; ?>
                </nav>

                <!-- Header Actions (CTA & Search) -->
                <div class="header-actions">
                    <button type="button" class="btn-header-calc open-calculator-modal" aria-label="محاسبه‌گر پروژه دوربین">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="16" y1="18" x2="16" y2="18.01"/><line x1="12" y1="18" x2="12" y2="18.01"/><line x1="8" y1="18" x2="8" y2="18.01"/></svg>
                        <span>محاسبه‌گر پروژه</span>
                    </button>

                    <button type="button" class="btn-header-search" id="btn-open-search" aria-label="جستجو در سایت">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    </button>

                    <a href="<?php echo esc_url($whatsapp_url); ?>" target="_blank" rel="noopener noreferrer" class="btn-header-whatsapp" title="چت در واتساپ">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                        <span>واتساپ</span>
                    </a>

                    <a href="#consultation-form-section" class="btn-header-consult open-consultation-modal" data-service="مشاوره عمومی">
                        <span>درخواست مشاوره</span>
                    </a>

                    <!-- Mobile Hamburger Button -->
                    <button type="button" class="mobile-menu-toggle" id="mobile-menu-btn" aria-label="منوی موبایل" aria-expanded="false">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </div>
    </header>

    <!-- Mobile Drawer Navigation -->
    <div id="mobile-drawer" class="mobile-drawer-overlay" aria-hidden="true">
        <div class="mobile-drawer-content">
            <div class="drawer-header">
                <span class="drawer-title">بومیا حفاظت گستر</span>
                <button type="button" class="drawer-close-btn" id="drawer-close" aria-label="بستن منو">&times;</button>
            </div>
            <div class="drawer-nav">
                <ul class="mobile-menu-list">
                    <li><a href="<?php echo esc_url(home_url('/')); ?>">صفحه اصلی</a></li>
                    <li><a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>">محصولات و تجهیزات</a></li>
                    <li><a href="<?php echo esc_url(home_url('/#services-section')); ?>">خدمات امنیتی و نصب</a></li>
                    <li><a href="<?php echo esc_url(get_post_type_archive_link('project')); ?>">پروژه‌های اجرایی</a></li>
                    <li><a href="<?php echo esc_url(home_url('/about/')); ?>">درباره ما</a></li>
                    <li><a href="<?php echo esc_url(home_url('/contact/')); ?>">تماس با ما</a></li>
                </ul>
            </div>
            <div class="drawer-footer">
                <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9+]/', '', $contact_info['phone_main'])); ?>" class="drawer-phone-btn">
                    📞 تماس مستقیم: <?php echo esc_html($contact_info['phone_main']); ?>
                </a>
                <a href="<?php echo esc_url($whatsapp_url); ?>" target="_blank" rel="noopener noreferrer" class="drawer-whatsapp-btn">
                    💬 پیام در واتساپ
                </a>
            </div>
        </div>
    </div>

    <!-- Search Modal Popup -->
    <div id="bumiya-search-modal" class="search-modal-overlay" aria-hidden="true">
        <div class="search-modal-box">
            <button type="button" class="search-modal-close" id="search-modal-close">&times;</button>
            <h3 class="search-modal-title">جستجو در محصولات، پروژه‌ها و مقالات بومیا</h3>
            <form role="search" method="get" class="search-form-global" action="<?php echo esc_url(home_url('/')); ?>">
                <div class="search-input-wrap">
                    <input type="search" class="search-field" placeholder="نام محصول، مدل دوربین یا نوع پروژه..." value="<?php echo get_search_query(); ?>" name="s" required />
                    <button type="submit" class="search-submit">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        <span>جستجو</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
