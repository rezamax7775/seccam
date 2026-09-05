<?php
/**
 * Register Custom Post Types for Bumiya Hefazat Gostar
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Custom Post Types
 */
function bumiya_register_post_types() {

    // 1. Products CPT (محصولات)
    $product_labels = [
        'name'                  => _x('محصولات', 'Post type general name', 'bumiya-hefazat'),
        'singular_name'         => _x('محصول', 'Post type singular name', 'bumiya-hefazat'),
        'menu_name'             => _x('محصولات حفاظتی', 'Admin Menu text', 'bumiya-hefazat'),
        'name_admin_bar'        => _x('محصول', 'Add New on Toolbar', 'bumiya-hefazat'),
        'add_new'               => __('افزودن محصول جدید', 'bumiya-hefazat'),
        'add_new_item'          => __('افزودن محصول جدید', 'bumiya-hefazat'),
        'new_item'              => __('محصول جدید', 'bumiya-hefazat'),
        'edit_item'             => __('ویرایش محصول', 'bumiya-hefazat'),
        'view_item'             => __('مشاهده محصول', 'bumiya-hefazat'),
        'all_items'             => __('همه محصولات', 'bumiya-hefazat'),
        'search_items'          => __('جستجوی محصولات', 'bumiya-hefazat'),
        'parent_item_colon'     => __('محصول والد:', 'bumiya-hefazat'),
        'not_found'             => __('هیچ محصولی یافت نشد.', 'bumiya-hefazat'),
        'not_found_in_trash'    => __('هیچ محصولی در سطل زباله یافت نشد.', 'bumiya-hefazat'),
        'featured_image'        => _x('تصویر اصلی محصول', 'Overrides the “Set featured image” phrase', 'bumiya-hefazat'),
        'set_featured_image'    => _x('تنظیم تصویر اصلی', 'Overrides the “Set featured image” phrase', 'bumiya-hefazat'),
        'remove_featured_image' => _x('حذف تصویر اصلی', 'Overrides the “Remove featured image” phrase', 'bumiya-hefazat'),
        'use_featured_image'    => _x('استفاده به عنوان تصویر شاخص', 'Overrides the “Use as featured image” phrase', 'bumiya-hefazat'),
        'archives'              => _x('آرشیو محصولات', 'The post type archive label', 'bumiya-hefazat'),
    ];

    $product_args = [
        'labels'             => $product_labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => ['slug' => 'products', 'with_front' => false],
        'capability_type'    => 'post',
        'has_archive'        => 'products',
        'hierarchical'       => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-video-alt3', // CCTV icon
        'supports'           => ['title', 'editor', 'thumbnail', 'excerpt'],
        'show_in_rest'       => true,
    ];
    register_post_type('product', $product_args);


    // 2. Projects CPT (پروژه‌ها)
    $project_labels = [
        'name'                  => _x('پروژه‌ها', 'Post type general name', 'bumiya-hefazat'),
        'singular_name'         => _x('پروژه', 'Post type singular name', 'bumiya-hefazat'),
        'menu_name'             => _x('پروژه‌های اجرایی', 'Admin Menu text', 'bumiya-hefazat'),
        'name_admin_bar'        => _x('پروژه', 'Add New on Toolbar', 'bumiya-hefazat'),
        'add_new'               => __('افزودن پروژه جدید', 'bumiya-hefazat'),
        'add_new_item'          => __('افزودن پروژه جدید', 'bumiya-hefazat'),
        'new_item'              => __('پروژه جدید', 'bumiya-hefazat'),
        'edit_item'             => __('ویرایش پروژه', 'bumiya-hefazat'),
        'view_item'             => __('مشاهده پروژه', 'bumiya-hefazat'),
        'all_items'             => __('همه پروژه‌ها', 'bumiya-hefazat'),
        'search_items'          => __('جستجوی پروژه‌ها', 'bumiya-hefazat'),
        'not_found'             => __('هیچ پروژه‌ای یافت نشد.', 'bumiya-hefazat'),
        'not_found_in_trash'    => __('هیچ پروژه‌ای در زباله‌دان نیست.', 'bumiya-hefazat'),
        'featured_image'        => _x('تصویر شاخص پروژه', 'Overrides the “Set featured image” phrase', 'bumiya-hefazat'),
        'archives'              => _x('آرشیو پروژه‌ها', 'The post type archive label', 'bumiya-hefazat'),
    ];

    $project_args = [
        'labels'             => $project_labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => ['slug' => 'projects', 'with_front' => false],
        'capability_type'    => 'post',
        'has_archive'        => 'projects',
        'hierarchical'       => false,
        'menu_position'      => 6,
        'menu_icon'          => 'dashicons-shield-alt', // Shield security icon
        'supports'           => ['title', 'editor', 'thumbnail', 'excerpt'],
        'show_in_rest'       => true,
    ];
    register_post_type('project', $project_args);


    // 3. Consultation Requests CPT (درخواست‌های مشاوره و استعلام)
    $contact_labels = [
        'name'                  => _x('درخواست‌های مشاوره', 'Post type general name', 'bumiya-hefazat'),
        'singular_name'         => _x('درخواست مشاوره', 'Post type singular name', 'bumiya-hefazat'),
        'menu_name'             => _x('درخواست‌های مشاوره', 'Admin Menu text', 'bumiya-hefazat'),
        'name_admin_bar'        => _x('درخواست مشاوره', 'Add New on Toolbar', 'bumiya-hefazat'),
        'add_new'               => __('ثبت درخواست دستی', 'bumiya-hefazat'),
        'add_new_item'          => __('افزودن درخواست مشاوره جدید', 'bumiya-hefazat'),
        'edit_item'             => __('بررسی و ویرایش درخواست', 'bumiya-hefazat'),
        'view_item'             => __('مشاهده جزئیات درخواست', 'bumiya-hefazat'),
        'all_items'             => __('همه درخواست‌ها', 'bumiya-hefazat'),
        'search_items'          => __('جستجو در درخواست‌ها', 'bumiya-hefazat'),
        'not_found'             => __('هیچ درخواستی ثبت نشده است.', 'bumiya-hefazat'),
        'not_found_in_trash'    => __('هیچ درخواستی در زباله‌دان نیست.', 'bumiya-hefazat'),
    ];

    $contact_args = [
        'labels'             => $contact_labels,
        'public'             => false, // Internal CRM
        'publicly_queryable' => false,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => false,
        'rewrite'            => false,
        'capability_type'    => 'post',
        'capabilities'       => [
            'create_posts' => 'edit_posts', // Allow admin to add manually if needed
        ],
        'has_archive'        => false,
        'hierarchical'       => false,
        'menu_position'      => 7,
        'menu_icon'          => 'dashicons-phone', // Phone icon
        'supports'           => ['title', 'editor'],
        'show_in_rest'       => false,
    ];
    register_post_type('contact_request', $contact_args);
}
add_action('init', 'bumiya_register_post_types');
