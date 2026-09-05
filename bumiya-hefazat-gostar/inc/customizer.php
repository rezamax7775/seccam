<?php
/**
 * WordPress Customizer Integration for Bumiya Hefazat Gostar
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Customizer Settings and Controls
 */
function bumiya_customize_register($wp_customize) {

    // Main Customizer Panel for Bumiya Theme
    $wp_customize->add_panel('bumiya_theme_options_panel', [
        'title'       => __('تنظیمات اختصاصی بومیا حفاظت گستر', 'bumiya-hefazat'),
        'description' => __('تنظیمات شماره تماس، واتساپ، هیرو، رنگ‌ها و اطلاعات تماس شرکت', 'bumiya-hefazat'),
        'priority'    => 25,
    ]);

    // ==========================================
    // 1. Contact & WhatsApp Information Section
    // ==========================================
    $wp_customize->add_section('bumiya_contact_info_section', [
        'title'       => __('اطلاعات تماس و واتساپ', 'bumiya-hefazat'),
        'panel'       => 'bumiya_theme_options_panel',
        'priority'    => 10,
    ]);

    // Main Phone
    $wp_customize->add_setting('bumiya_phone_main', [
        'default'           => '021-88889999',
        'sanitize_callback' => 'sanitize_text_field',
        'transport'         => 'refresh',
    ]);
    $wp_customize->add_control('bumiya_phone_main', [
        'label'       => __('شماره تماس اصلی شرکت:', 'bumiya-hefazat'),
        'section'     => 'bumiya_contact_info_section',
        'type'        => 'text',
    ]);

    // Support Phone / Mobile
    $wp_customize->add_setting('bumiya_phone_mobile', [
        'default'           => '09123456789',
        'sanitize_callback' => 'sanitize_text_field',
    ]);
    $wp_customize->add_control('bumiya_phone_mobile', [
        'label'       => __('شماره همراه / مشاوره فوری:', 'bumiya-hefazat'),
        'section'     => 'bumiya_contact_info_section',
        'type'        => 'text',
    ]);

    // WhatsApp Number (Strictly WhatsApp, Telegram forbidden)
    $wp_customize->add_setting('bumiya_whatsapp_number', [
        'default'           => '989123456789',
        'sanitize_callback' => 'sanitize_text_field',
        'description'       => __('شماره بدون صفر و با کد کشور وارد شود (مثال: 989123456789)', 'bumiya-hefazat'),
    ]);
    $wp_customize->add_control('bumiya_whatsapp_number', [
        'label'       => __('شماره واتساپ شرکت:', 'bumiya-hefazat'),
        'section'     => 'bumiya_contact_info_section',
        'type'        => 'text',
    ]);

    // WhatsApp Default Message
    $wp_customize->add_setting('bumiya_whatsapp_text', [
        'default'           => 'سلام، جهت مشاوره و استعلام قیمت تجهیزات حفاظتی و دوربین مداربسته از سایت بومیا پیام می‌دهم.',
        'sanitize_callback' => 'sanitize_textarea_field',
    ]);
    $wp_customize->add_control('bumiya_whatsapp_text', [
        'label'       => __('پیام پیش‌فرض چت واتساپ:', 'bumiya-hefazat'),
        'section'     => 'bumiya_contact_info_section',
        'type'        => 'textarea',
    ]);

    // Company Email
    $wp_customize->add_setting('bumiya_company_email', [
        'default'           => 'info@bumiya-hefazat.ir',
        'sanitize_callback' => 'sanitize_email',
    ]);
    $wp_customize->add_control('bumiya_company_email', [
        'label'       => __('ایمیل رسمی شرکت:', 'bumiya-hefazat'),
        'section'     => 'bumiya_contact_info_section',
        'type'        => 'email',
    ]);

    // Address
    $wp_customize->add_setting('bumiya_company_address', [
        'default'           => 'تهران، خیابان جمهوری، تقاطع ولیعصر، مجتمع تجاری یاران، طبقه ۳، واحد ۱۲',
        'sanitize_callback' => 'sanitize_textarea_field',
    ]);
    $wp_customize->add_control('bumiya_company_address', [
        'label'       => __('آدرس دفتر مرکزی:', 'bumiya-hefazat'),
        'section'     => 'bumiya_contact_info_section',
        'type'        => 'textarea',
    ]);

    // Working Hours
    $wp_customize->add_setting('bumiya_working_hours', [
        'default'           => 'شنبه تا چهارشنبه: ۸:۳۰ الی ۱۸:۰۰ | پنجشنبه‌ها: ۸:۳۰ الی ۱۴:۰۰',
        'sanitize_callback' => 'sanitize_text_field',
    ]);
    $wp_customize->add_control('bumiya_working_hours', [
        'label'       => __('ساعات کاری شرکت:', 'bumiya-hefazat'),
        'section'     => 'bumiya_contact_info_section',
        'type'        => 'text',
    ]);


    // ==========================================
    // 2. Hero Section (صفحه اصلی)
    // ==========================================
    $wp_customize->add_section('bumiya_hero_section', [
        'title'       => __('بخش هیرو صفحه اصلی (Hero Section)', 'bumiya-hefazat'),
        'panel'       => 'bumiya_theme_options_panel',
        'priority'    => 20,
    ]);

    // Hero Heading
    $wp_customize->add_setting('bumiya_hero_title', [
        'default'           => 'امنیت هوشمند برای خانه و کسب‌وکار شما',
        'sanitize_callback' => 'sanitize_text_field',
    ]);
    $wp_customize->add_control('bumiya_hero_title', [
        'label'       => __('تیتر بزرگ هیرو:', 'bumiya-hefazat'),
        'section'     => 'bumiya_hero_section',
        'type'        => 'text',
    ]);

    // Hero Subtitle
    $wp_customize->add_setting('bumiya_hero_subtitle', [
        'default'           => 'بومیا حفاظت گستر، ارائه‌دهنده راهکارهای حرفه‌ای دوربین مداربسته، طراحی و اجرای پروژه‌های پیشرفته حفاظتی و نظارتی با گارانتی معتبر و پشتیبانی ۲۴ ساعته',
        'sanitize_callback' => 'sanitize_textarea_field',
    ]);
    $wp_customize->add_control('bumiya_hero_subtitle', [
        'label'       => __('زیرتیتر توضیحات هیرو:', 'bumiya-hefazat'),
        'section'     => 'bumiya_hero_section',
        'type'        => 'textarea',
    ]);

    // Hero Button 1 Text
    $wp_customize->add_setting('bumiya_hero_btn1_text', [
        'default'           => 'مشاهده محصولات و تجهیزات',
        'sanitize_callback' => 'sanitize_text_field',
    ]);
    $wp_customize->add_control('bumiya_hero_btn1_text', [
        'label'       => __('متن دکمه اول:', 'bumiya-hefazat'),
        'section'     => 'bumiya_hero_section',
        'type'        => 'text',
    ]);

    // Hero Button 2 Text
    $wp_customize->add_setting('bumiya_hero_btn2_text', [
        'default'           => 'درخواست مشاوره و کارشناسی رایگان',
        'sanitize_callback' => 'sanitize_text_field',
    ]);
    $wp_customize->add_control('bumiya_hero_btn2_text', [
        'label'       => __('متن دکمه دوم:', 'bumiya-hefazat'),
        'section'     => 'bumiya_hero_section',
        'type'        => 'text',
    ]);

    // Hero Image Upload
    $wp_customize->add_setting('bumiya_hero_image', [
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
    ]);
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'bumiya_hero_image', [
        'label'       => __('تصویر پس‌زمینه هیرو (مرتبط با دوربین و امنیت):', 'bumiya-hefazat'),
        'section'     => 'bumiya_hero_section',
    ]));


    // ==========================================
    // 3. Theme Colors (رنگ‌بندی سازمانی)
    // ==========================================
    $wp_customize->add_section('bumiya_colors_section', [
        'title'       => __('رنگ‌بندی سازمانی بومیا', 'bumiya-hefazat'),
        'panel'       => 'bumiya_theme_options_panel',
        'priority'    => 30,
    ]);

    // Primary Color (Dark Blue)
    $wp_customize->add_setting('bumiya_color_primary', [
        'default'           => '#0f2b5c',
        'sanitize_callback' => 'sanitize_hex_color',
    ]);
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'bumiya_color_primary', [
        'label'       => __('رنگ اصلی (آبی سرمه‌ای امنیتی):', 'bumiya-hefazat'),
        'section'     => 'bumiya_colors_section',
    ]));

    // Secondary Color (Light Sky Blue)
    $wp_customize->add_setting('bumiya_color_secondary', [
        'default'           => '#0284c7',
        'sanitize_callback' => 'sanitize_hex_color',
    ]);
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'bumiya_color_secondary', [
        'label'       => __('رنگ ثانویه (آبی روشن تکنولوژی):', 'bumiya-hefazat'),
        'section'     => 'bumiya_colors_section',
    ]));

    // Accent Color (Gold / Amber)
    $wp_customize->add_setting('bumiya_color_accent', [
        'default'           => '#f59e0b',
        'sanitize_callback' => 'sanitize_hex_color',
    ]);
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'bumiya_color_accent', [
        'label'       => __('رنگ تأکیدی / ستاره و بج‌ها:', 'bumiya-hefazat'),
        'section'     => 'bumiya_colors_section',
    ]));
}
add_action('customize_register', 'bumiya_customize_register');

/**
 * Output Customizer CSS Dynamically in wp_head
 */
function bumiya_customizer_css() {
    $primary   = get_theme_mod('bumiya_color_primary', '#0f2b5c');
    $secondary = get_theme_mod('bumiya_color_secondary', '#0284c7');
    $accent    = get_theme_mod('bumiya_color_accent', '#f59e0b');
    ?>
    <style type="text/css" id="bumiya-customizer-css">
        :root {
            --primary: <?php echo esc_attr($primary); ?>;
            --secondary: <?php echo esc_attr($secondary); ?>;
            --accent: <?php echo esc_attr($accent); ?>;
        }
    </style>
    <?php
}
add_action('wp_head', 'bumiya_customizer_css');
