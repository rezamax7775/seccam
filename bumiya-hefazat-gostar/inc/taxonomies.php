<?php
/**
 * Register Custom Taxonomies for Bumiya Hefazat Gostar
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Taxonomies
 */
function bumiya_register_taxonomies() {

    // 1. Product Categories (دسته‌بندی محصولات)
    $prod_cat_labels = [
        'name'              => _x('دسته‌بندی محصولات', 'taxonomy general name', 'bumiya-hefazat'),
        'singular_name'     => _x('دسته‌بندی محصول', 'taxonomy singular name', 'bumiya-hefazat'),
        'search_items'      => __('جستجوی دسته‌ها', 'bumiya-hefazat'),
        'all_items'         => __('همه دسته‌بندی‌ها', 'bumiya-hefazat'),
        'parent_item'       => __('دسته والد', 'bumiya-hefazat'),
        'parent_item_colon' => __('دسته والد:', 'bumiya-hefazat'),
        'edit_item'         => __('ویرایش دسته‌بندی', 'bumiya-hefazat'),
        'update_item'       => __('بروزرسانی دسته‌بندی', 'bumiya-hefazat'),
        'add_new_item'      => __('افزودن دسته جدید', 'bumiya-hefazat'),
        'new_item_name'     => __('نام دسته جدید', 'bumiya-hefazat'),
        'menu_name'         => __('دسته‌بندی محصولات', 'bumiya-hefazat'),
    ];

    register_taxonomy('product_category', ['product'], [
        'hierarchical'      => true,
        'labels'            => $prod_cat_labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => ['slug' => 'product-category', 'with_front' => false],
        'show_in_rest'      => true,
    ]);


    // 2. Product Brands (برند محصولات)
    $brand_labels = [
        'name'          => _x('برندها', 'taxonomy general name', 'bumiya-hefazat'),
        'singular_name' => _x('برند', 'taxonomy singular name', 'bumiya-hefazat'),
        'search_items'  => __('جستجوی برندها', 'bumiya-hefazat'),
        'all_items'     => __('همه برندها', 'bumiya-hefazat'),
        'edit_item'     => __('ویرایش برند', 'bumiya-hefazat'),
        'update_item'   => __('بروزرسانی برند', 'bumiya-hefazat'),
        'add_new_item'  => __('افزودن برند جدید', 'bumiya-hefazat'),
        'new_item_name' => __('نام برند جدید', 'bumiya-hefazat'),
        'menu_name'     => __('برندهای محصولات', 'bumiya-hefazat'),
    ];

    register_taxonomy('product_brand', ['product'], [
        'hierarchical'      => false,
        'labels'            => $brand_labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => ['slug' => 'brand', 'with_front' => false],
        'show_in_rest'      => true,
    ]);


    // 3. Project Categories (دسته‌بندی پروژه‌ها)
    $proj_cat_labels = [
        'name'              => _x('نوع پروژه / کاربری', 'taxonomy general name', 'bumiya-hefazat'),
        'singular_name'     => _x('نوع پروژه', 'taxonomy singular name', 'bumiya-hefazat'),
        'search_items'      => __('جستجوی نوع پروژه', 'bumiya-hefazat'),
        'all_items'         => __('همه نوع پروژه‌ها', 'bumiya-hefazat'),
        'parent_item'       => __('نوع والد', 'bumiya-hefazat'),
        'parent_item_colon' => __('نوع والد:', 'bumiya-hefazat'),
        'edit_item'         => __('ویرایش نوع پروژه', 'bumiya-hefazat'),
        'update_item'       => __('بروزرسانی نوع پروژه', 'bumiya-hefazat'),
        'add_new_item'      => __('افزودن نوع پروژه جدید', 'bumiya-hefazat'),
        'new_item_name'     => __('نام نوع پروژه جدید', 'bumiya-hefazat'),
        'menu_name'         => __('دسته‌بندی پروژه‌ها', 'bumiya-hefazat'),
    ];

    register_taxonomy('project_category', ['project'], [
        'hierarchical'      => true,
        'labels'            => $proj_cat_labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => ['slug' => 'project-type', 'with_front' => false],
        'show_in_rest'      => true,
    ]);
}
add_action('init', 'bumiya_register_taxonomies');
