<?php
/**
 * Helper Functions & Template Utilities for Bumiya Hefazat Gostar
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Get Centralized Contact Information
 */
function bumiya_get_contact_info() {
    return [
        'phone_main'   => get_theme_mod('bumiya_phone_main', '021-88889999'),
        'phone_mobile' => get_theme_mod('bumiya_phone_mobile', '09123456789'),
        'whatsapp'     => get_theme_mod('bumiya_whatsapp_number', '989123456789'),
        'whatsapp_msg' => get_theme_mod('bumiya_whatsapp_text', 'سلام، جهت مشاوره و استعلام قیمت تجهیزات حفاظتی و دوربین مداربسته پیام می‌دهم.'),
        'email'        => get_theme_mod('bumiya_company_email', 'info@bumiya-hefazat.ir'),
        'address'      => get_theme_mod('bumiya_company_address', 'تهران، خیابان جمهوری، تقاطع ولیعصر، مجتمع تجاری یاران، طبقه ۳، واحد ۱۲'),
        'working_hours'=> get_theme_mod('bumiya_working_hours', 'شنبه تا چهارشنبه: ۸:۳۰ الی ۱۸:۰۰ | پنجشنبه‌ها: ۸:۳۰ الی ۱۴:۰۰'),
    ];
}

/**
 * Generate Direct WhatsApp Link
 */
function bumiya_get_whatsapp_link($custom_msg = '') {
    $info = bumiya_get_contact_info();
    $number = preg_replace('/[^0-9]/', '', $info['whatsapp']);
    $msg = !empty($custom_msg) ? $custom_msg : $info['whatsapp_msg'];
    return 'https://wa.me/' . esc_attr($number) . '?text=' . urlencode($msg);
}

/**
 * Breadcrumb Component
 */
function bumiya_breadcrumbs() {
    if (is_front_page()) {
        return;
    }

    echo '<nav class="bumiya-breadcrumbs" aria-label="موقعیت در سایت">';
    echo '<div class="bumiya-container">';
    echo '<ol class="breadcrumb-list" itemscope itemtype="https://schema.org/BreadcrumbList">';

    // Home
    echo '<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">';
    echo '<a itemprop="item" href="' . esc_url(home_url('/')) . '"><span itemprop="name">صفحه اصلی</span></a>';
    echo '<meta itemprop="position" content="1" />';
    echo '<span class="sep">/</span>';
    echo '</li>';

    $position = 2;

    if (is_singular('product')) {
        echo '<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">';
        echo '<a itemprop="item" href="' . esc_url(get_post_type_archive_link('product')) . '"><span itemprop="name">محصولات</span></a>';
        echo '<meta itemprop="position" content="' . $position++ . '" />';
        echo '<span class="sep">/</span>';
        echo '</li>';

        $terms = get_the_terms(get_the_ID(), 'product_category');
        if ($terms && !is_wp_error($terms)) {
            $term = array_shift($terms);
            echo '<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">';
            echo '<a itemprop="item" href="' . esc_url(get_term_link($term)) . '"><span itemprop="name">' . esc_html($term->name) . '</span></a>';
            echo '<meta itemprop="position" content="' . $position++ . '" />';
            echo '<span class="sep">/</span>';
            echo '</li>';
        }

        echo '<li class="current" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">';
        echo '<span itemprop="name">' . esc_html(get_the_title()) . '</span>';
        echo '<meta itemprop="position" content="' . $position . '" />';
        echo '</li>';

    } elseif (is_post_type_archive('product')) {
        echo '<li class="current" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">';
        echo '<span itemprop="name">کاتالوگ محصولات و تجهیزات حفاظتی</span>';
        echo '<meta itemprop="position" content="' . $position . '" />';
        echo '</li>';

    } elseif (is_tax('product_category')) {
        echo '<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">';
        echo '<a itemprop="item" href="' . esc_url(get_post_type_archive_link('product')) . '"><span itemprop="name">محصولات</span></a>';
        echo '<meta itemprop="position" content="' . $position++ . '" />';
        echo '<span class="sep">/</span>';
        echo '</li>';

        echo '<li class="current" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">';
        echo '<span itemprop="name">' . single_term_title('', false) . '</span>';
        echo '<meta itemprop="position" content="' . $position . '" />';
        echo '</li>';

    } elseif (is_singular('project')) {
        echo '<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">';
        echo '<a itemprop="item" href="' . esc_url(get_post_type_archive_link('project')) . '"><span itemprop="name">پروژه‌های اجرایی</span></a>';
        echo '<meta itemprop="position" content="' . $position++ . '" />';
        echo '<span class="sep">/</span>';
        echo '</li>';

        echo '<li class="current" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">';
        echo '<span itemprop="name">' . esc_html(get_the_title()) . '</span>';
        echo '<meta itemprop="position" content="' . $position . '" />';
        echo '</li>';

    } elseif (is_post_type_archive('project')) {
        echo '<li class="current" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">';
        echo '<span itemprop="name">پروژه‌های انجام‌شده بومیا</span>';
        echo '<meta itemprop="position" content="' . $position . '" />';
        echo '</li>';

    } elseif (is_page()) {
        echo '<li class="current" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">';
        echo '<span itemprop="name">' . esc_html(get_the_title()) . '</span>';
        echo '<meta itemprop="position" content="' . $position . '" />';
        echo '</li>';

    } elseif (is_search()) {
        echo '<li class="current" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">';
        echo '<span itemprop="name">نتایج جستجو برای: ' . esc_html(get_search_query()) . '</span>';
        echo '<meta itemprop="position" content="' . $position . '" />';
        echo '</li>';

    } elseif (is_404()) {
        echo '<li class="current" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">';
        echo '<span itemprop="name">خطای ۴۰۴ - صفحه یافت نشد</span>';
        echo '<meta itemprop="position" content="' . $position . '" />';
        echo '</li>';
    }

    echo '</ol>';
    echo '</div>';
    echo '</nav>';
}

/**
 * Numeric Pagination
 */
function bumiya_pagination($query = null) {
    if (!$query) {
        global $wp_query;
        $query = $wp_query;
    }

    $big = 999999999;
    $links = paginate_links([
        'base'      => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
        'format'    => '?paged=%#%',
        'current'   => max(1, get_query_var('paged')),
        'total'     => $query->max_num_pages,
        'prev_text' => '&rarr; صفحه قبل',
        'next_text' => 'صفحه بعد &larr;',
        'type'      => 'array',
    ]);

    if (!empty($links)) {
        echo '<nav class="bumiya-pagination"><ul class="page-numbers">';
        foreach ($links as $link) {
            echo '<li>' . $link . '</li>';
        }
        echo '</ul></nav>';
    }
}
