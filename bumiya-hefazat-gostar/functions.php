<?php
/**
 * Theme Functions and Definitions
 *
 * @package Bumiya_Hefazat_Gostar
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Define theme constants
define('BUMIYA_THEME_VERSION', '1.0.0');
define('BUMIYA_THEME_DIR', get_template_directory());
define('BUMIYA_THEME_URI', get_template_directory_uri());

/**
 * Sets up theme defaults and registers support for various WordPress features.
 */
function bumiya_theme_setup() {
    // Make theme available for translation.
    load_theme_textdomain('bumiya-hefazat', BUMIYA_THEME_DIR . '/languages');

    // Add default posts and comments RSS feed links to head.
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title.
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails on posts and pages.
    add_theme_support('post-thumbnails');
    set_post_thumbnail_size(800, 500, true);
    add_image_size('bumiya-card', 600, 400, true);
    add_image_size('bumiya-large', 1200, 700, true);
    add_image_size('bumiya-thumb', 150, 150, true);

    // Register navigation menus
    register_nav_menus([
        'primary-menu' => esc_html__('منوی اصلی هدر (راست‌چین)', 'bumiya-hefazat'),
        'footer-menu-1' => esc_html__('منوی فوتر - دسترسی سریع', 'bumiya-hefazat'),
        'footer-menu-2' => esc_html__('منوی فوتر - خدمات امنیتی', 'bumiya-hefazat'),
    ]);

    // Switch default core markup to output valid HTML5.
    add_theme_support('html5', [
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ]);

    // Add support for core custom logo.
    add_theme_support('custom-logo', [
        'height'      => 100,
        'width'       => 350,
        'flex-width'  => true,
        'flex-height' => true,
    ]);

    // Add support for full and wide align images.
    add_theme_support('align-wide');
    
    // Add support for responsive embeds
    add_theme_support('responsive-embeds');
}
add_action('after_setup_theme', 'bumiya_theme_setup');

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 */
function bumiya_content_width() {
    $GLOBALS['content_width'] = apply_filters('bumiya_content_width', 1200);
}
add_action('after_setup_theme', 'bumiya_content_width', 0);

/**
 * Enqueue scripts and styles.
 */
function bumiya_scripts() {
    // Google Fonts (Vazirmatn for Persian typography)
    wp_enqueue_style(
        'bumiya-fonts',
        'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css',
        [],
        null
    );

    // Theme Main Stylesheet (RTL)
    wp_enqueue_style(
        'bumiya-main-style',
        BUMIYA_THEME_URI . '/assets/css/main.css',
        [],
        BUMIYA_THEME_VERSION
    );

    // Root Theme CSS
    wp_enqueue_style(
        'bumiya-root-style',
        get_stylesheet_uri(),
        ['bumiya-main-style'],
        BUMIYA_THEME_VERSION
    );

    // Main JS
    wp_enqueue_script(
        'bumiya-main-script',
        BUMIYA_THEME_URI . '/assets/js/main.js',
        ['jquery'],
        BUMIYA_THEME_VERSION,
        true
    );

    // Localize script for AJAX & Nonces
    wp_localize_script('bumiya-main-script', 'bumiyaData', [
        'ajaxUrl'   => admin_url('admin-ajax.php'),
        'nonce'     => wp_create_nonce('bumiya_consultation_nonce'),
        'siteUrl'   => home_url(),
        'themeUrl'  => BUMIYA_THEME_URI,
        'successMsg' => esc_html__('درخواست شما با موفقیت ثبت شد. کارشناسان بومیا حفاظت گستر در اولین فرصت با شما تماس خواهند گرفت.', 'bumiya-hefazat'),
        'errorMsg'   => esc_html__('متأسفانه در ثبت درخواست خطایی رخ داد. لطفاً فیلدهای الزامی را بررسی کرده و مجدداً تلاش نمایید.', 'bumiya-hefazat'),
    ]);
}
add_action('wp_enqueue_scripts', 'bumiya_scripts');

/**
 * Enqueue Admin Scripts and Styles
 */
function bumiya_admin_scripts($hook) {
    wp_enqueue_style(
        'bumiya-admin-css',
        BUMIYA_THEME_URI . '/assets/css/admin.css',
        [],
        BUMIYA_THEME_VERSION
    );

    wp_enqueue_script(
        'bumiya-admin-js',
        BUMIYA_THEME_URI . '/assets/js/admin.js',
        ['jquery'],
        BUMIYA_THEME_VERSION,
        true
    );

    wp_localize_script('bumiya-admin-js', 'bumiyaAdminData', [
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce'   => wp_create_nonce('bumiya_admin_nonce'),
    ]);
}
add_action('admin_enqueue_scripts', 'bumiya_admin_scripts');

/**
 * Register Widget Areas
 */
function bumiya_widgets_init() {
    register_sidebar([
        'name'          => esc_html__('سایدبار وبلاگ و مقالات', 'bumiya-hefazat'),
        'id'            => 'sidebar-main',
        'description'   => esc_html__('ابزارک‌های این بخش در صفحات آرشیو و نوشته‌ها نمایش داده می‌شوند.', 'bumiya-hefazat'),
        'before_widget' => '<div id="%1$s" class="widget-box %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ]);

    register_sidebar([
        'name'          => esc_html__('سایدبار فیلتر محصولات', 'bumiya-hefazat'),
        'id'            => 'sidebar-products',
        'description'   => esc_html__('ابزارک‌های فیلتر و جستجوی محصولات.', 'bumiya-hefazat'),
        'before_widget' => '<div id="%1$s" class="widget-box %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ]);
}
add_action('widgets_init', 'bumiya_widgets_init');

/**
 * Include Required Theme Modules
 */
require_once BUMIYA_THEME_DIR . '/inc/post-types.php';
require_once BUMIYA_THEME_DIR . '/inc/taxonomies.php';
require_once BUMIYA_THEME_DIR . '/inc/meta-boxes.php';
require_once BUMIYA_THEME_DIR . '/inc/customizer.php';
require_once BUMIYA_THEME_DIR . '/inc/contact-form.php';
require_once BUMIYA_THEME_DIR . '/inc/admin-columns.php';
require_once BUMIYA_THEME_DIR . '/inc/demo-importer.php';
require_once BUMIYA_THEME_DIR . '/inc/security.php';
require_once BUMIYA_THEME_DIR . '/inc/helpers.php';
