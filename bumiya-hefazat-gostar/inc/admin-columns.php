<?php
/**
 * Custom Admin Columns and Quick Status Management
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * 1. Contact Requests Columns
 */
function bumiya_contact_requests_columns($columns) {
    $new_columns = [
        'cb'            => '<input type="checkbox" />',
        'title'         => __('نام مشتری / عنوان', 'bumiya-hefazat'),
        'req_phone'     => __('شماره تماس (قابل کلیک / واتساپ)', 'bumiya-hefazat'),
        'req_subject'   => __('موضوع / خدمت', 'bumiya-hefazat'),
        'req_product'   => __('محصول استعلامی', 'bumiya-hefazat'),
        'req_status'    => __('وضعیت پیگیری', 'bumiya-hefazat'),
        'date'          => __('تاریخ ثبت', 'bumiya-hefazat'),
    ];
    return $new_columns;
}
add_filter('manage_contact_request_posts_columns', 'bumiya_contact_requests_columns');

function bumiya_contact_requests_custom_column($column, $post_id) {
    switch ($column) {
        case 'req_phone':
            $phone = get_post_meta($post_id, '_bumiya_req_phone', true);
            if ($phone) {
                $clean_phone = preg_replace('/[^0-9]/', '', $phone);
                echo '<div style="display:flex; align-items:center; gap:8px;">';
                echo '<a href="tel:' . esc_attr($phone) . '" style="font-weight:bold; color:#0284c7; text-decoration:none; direction:ltr; unicode-bidi:embed;">📞 ' . esc_html($phone) . '</a>';
                echo '<a href="https://wa.me/98' . esc_attr(ltrim($clean_phone, '0')) . '" target="_blank" title="ارسال پیام در واتساپ" style="background:#10b981; color:#fff; padding:2px 8px; border-radius:4px; font-size:11px; text-decoration:none;">واتساپ</a>';
                echo '</div>';
            } else {
                echo '<span style="color:#94a3b8;">—</span>';
            }
            break;

        case 'req_subject':
            $subject = get_post_meta($post_id, '_bumiya_req_subject', true);
            echo '<span style="background:#f1f5f9; padding:4px 8px; border-radius:4px; font-size:12px;">' . esc_html($subject ?: 'عمومی') . '</span>';
            break;

        case 'req_product':
            $product = get_post_meta($post_id, '_bumiya_req_product', true);
            echo $product ? '<strong style="color:#0f2b5c;">' . esc_html($product) . '</strong>' : '<span style="color:#94a3b8;">—</span>';
            break;

        case 'req_status':
            $status = get_post_meta($post_id, '_bumiya_req_status', true) ?: 'new';
            $status_labels = [
                'new'         => ['label' => 'جدید (نیاز به تماس)', 'bg' => '#fee2e2', 'color' => '#dc2626'],
                'contacted'   => ['label' => 'تماس گرفته شد', 'bg' => '#fef3c7', 'color' => '#d97706'],
                'in_progress' => ['label' => 'در حال پیگیری / پیش‌فاکتور', 'bg' => '#e0f2fe', 'color' => '#0284c7'],
                'completed'   => ['label' => 'انجام شد (تکمیل)', 'bg' => '#dcfce7', 'color' => '#16a34a'],
                'cancelled'   => ['label' => 'لغو شد', 'bg' => '#f1f5f9', 'color' => '#64748b'],
            ];

            $current = isset($status_labels[$status]) ? $status_labels[$status] : $status_labels['new'];

            echo '<select class="bumiya-quick-status-select" data-post-id="' . esc_attr($post_id) . '" style="background:' . esc_attr($current['bg']) . '; color:' . esc_attr($current['color']) . '; font-weight:bold; font-size:12px; border-radius:6px; border:1px solid rgba(0,0,0,0.1); padding:4px 8px;">';
            foreach ($status_labels as $key => $info) {
                echo '<option value="' . esc_attr($key) . '" ' . selected($status, $key, false) . '>' . esc_html($info['label']) . '</option>';
            }
            echo '</select>';
            break;
    }
}
add_action('manage_contact_request_posts_custom_column', 'bumiya_contact_requests_custom_column', 10, 2);

/**
 * 2. AJAX Handler for Quick Status Change in Admin Table
 */
function bumiya_ajax_update_request_status() {
    check_ajax_referer('bumiya_admin_nonce', 'nonce');

    if (!current_user_can('edit_posts')) {
        wp_send_json_error(['message' => 'عدم دسترسی کافی']);
    }

    $post_id = isset($_POST['post_id']) ? absint($_POST['post_id']) : 0;
    $status  = isset($_POST['status']) ? sanitize_text_field($_POST['status']) : '';

    if ($post_id && in_array($status, ['new', 'contacted', 'in_progress', 'completed', 'cancelled'])) {
        update_post_meta($post_id, '_bumiya_req_status', $status);
        wp_send_json_success(['message' => 'وضعیت با موفقیت به‌روزرسانی شد.']);
    }

    wp_send_json_error(['message' => 'اطلاعات نامعتبر است.']);
}
add_action('wp_ajax_bumiya_update_request_status', 'bumiya_ajax_update_request_status');


/**
 * 3. Products Columns
 */
function bumiya_product_columns($columns) {
    $new_columns = [
        'cb'            => '<input type="checkbox" />',
        'prod_thumb'    => __('تصویر', 'bumiya-hefazat'),
        'title'         => __('نام محصول', 'bumiya-hefazat'),
        'prod_brand'    => __('برند', 'bumiya-hefazat'),
        'prod_model'    => __('مدل', 'bumiya-hefazat'),
        'prod_code'     => __('کد کالا (SKU)', 'bumiya-hefazat'),
        'taxonomy-product_category' => __('دسته‌بندی', 'bumiya-hefazat'),
        'prod_stock'    => __('وضعیت موجودی', 'bumiya-hefazat'),
        'date'          => __('تاریخ', 'bumiya-hefazat'),
    ];
    return $new_columns;
}
add_filter('manage_product_posts_columns', 'bumiya_product_columns');

function bumiya_product_custom_column($column, $post_id) {
    switch ($column) {
        case 'prod_thumb':
            if (has_post_thumbnail($post_id)) {
                echo get_the_post_thumbnail($post_id, [50, 50], ['style' => 'border-radius:6px; object-fit:cover; border:1px solid #e2e8f0;']);
            } else {
                echo '<span style="color:#94a3b8; font-size:11px;">بدون تصویر</span>';
            }
            break;
        case 'prod_brand':
            $brand = get_post_meta($post_id, '_bumiya_product_brand', true);
            echo $brand ? '<span style="font-weight:bold; color:#0f2b5c;">' . esc_html($brand) . '</span>' : '—';
            break;
        case 'prod_model':
            $model = get_post_meta($post_id, '_bumiya_product_model', true);
            echo $model ? '<code style="background:#f1f5f9; padding:2px 6px; border-radius:4px;">' . esc_html($model) . '</code>' : '—';
            break;
        case 'prod_code':
            $code = get_post_meta($post_id, '_bumiya_product_code', true);
            echo $code ? esc_html($code) : '—';
            break;
        case 'prod_stock':
            $stock = get_post_meta($post_id, '_bumiya_product_stock', true);
            if ($stock === 'in_stock') {
                echo '<span style="color:#16a34a; font-weight:bold;">🟢 موجود در انبار</span>';
            } elseif ($stock === 'call_for_stock') {
                echo '<span style="color:#0284c7; font-weight:bold;">🔵 استعلام سفارش</span>';
            } else {
                echo '<span style="color:#dc2626; font-weight:bold;">🔴 ناموجود</span>';
            }
            break;
    }
}
add_action('manage_product_posts_custom_column', 'bumiya_product_custom_column', 10, 2);


/**
 * 4. Projects Columns
 */
function bumiya_project_columns($columns) {
    $new_columns = [
        'cb'            => '<input type="checkbox" />',
        'proj_thumb'    => __('تصویر', 'bumiya-hefazat'),
        'title'         => __('عنوان پروژه', 'bumiya-hefazat'),
        'taxonomy-project_category' => __('نوع کاربری', 'bumiya-hefazat'),
        'proj_location' => __('محل اجرا', 'bumiya-hefazat'),
        'proj_client'   => __('کارفرما', 'bumiya-hefazat'),
        'proj_date'     => __('تاریخ اجرا', 'bumiya-hefazat'),
        'date'          => __('تاریخ ثبت', 'bumiya-hefazat'),
    ];
    return $new_columns;
}
add_filter('manage_project_posts_columns', 'bumiya_project_columns');

function bumiya_project_custom_column($column, $post_id) {
    switch ($column) {
        case 'proj_thumb':
            if (has_post_thumbnail($post_id)) {
                echo get_the_post_thumbnail($post_id, [50, 50], ['style' => 'border-radius:6px; object-fit:cover; border:1px solid #e2e8f0;']);
            } else {
                echo '<span style="color:#94a3b8; font-size:11px;">بدون تصویر</span>';
            }
            break;
        case 'proj_location':
            $loc = get_post_meta($post_id, '_bumiya_project_location', true);
            echo $loc ? '📍 ' . esc_html($loc) : '—';
            break;
        case 'proj_client':
            $client = get_post_meta($post_id, '_bumiya_project_client', true);
            echo $client ? esc_html($client) : '—';
            break;
        case 'proj_date':
            $pdate = get_post_meta($post_id, '_bumiya_project_date', true);
            echo $pdate ? esc_html($pdate) : '—';
            break;
    }
}
add_action('manage_project_posts_custom_column', 'bumiya_project_custom_column', 10, 2);
