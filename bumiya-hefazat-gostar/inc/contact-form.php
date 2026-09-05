<?php
/**
 * Consultation & Price Inquiry Form Processing
 *
 * Handles AJAX and POST form submissions, security validation,
 * saving to 'contact_request' CPT, duplicate prevention, and wp_mail notification.
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Handle AJAX & POST Consultation Request Submission
 */
function bumiya_handle_consultation_submission() {
    // 1. Verify Nonce
    if (!isset($_POST['bumiya_nonce']) || !wp_verify_nonce($_POST['bumiya_nonce'], 'bumiya_consultation_nonce')) {
        wp_send_json_error([
            'message' => __('اعتبارسنجی امنیتی ناموفق بود. لطفاً صفحه را رفرش نموده و دوباره تلاش کنید.', 'bumiya-hefazat')
        ], 403);
    }

    // 2. Anti-spam Honeypot Check
    if (!empty($_POST['bumiya_website_hp'])) {
        // Bot filled the honeypot
        wp_send_json_success(['message' => __('درخواست شما ثبت شد.', 'bumiya-hefazat')]);
    }

    // 3. Sanitize Inputs
    $full_name    = isset($_POST['customer_name']) ? sanitize_text_field($_POST['customer_name']) : '';
    $phone        = isset($_POST['customer_phone']) ? sanitize_text_field($_POST['customer_phone']) : '';
    $email        = isset($_POST['customer_email']) ? sanitize_email($_POST['customer_email']) : '';
    $service_type = isset($_POST['service_type']) ? sanitize_text_field($_POST['service_type']) : 'مشاوره عمومی';
    $product_name = isset($_POST['product_name']) ? sanitize_text_field($_POST['product_name']) : '';
    $message      = isset($_POST['customer_message']) ? sanitize_textarea_field($_POST['customer_message']) : '';
    $client_ip    = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field($_SERVER['REMOTE_ADDR']) : '';

    // 4. Basic Validation
    if (empty($full_name)) {
        wp_send_json_error(['message' => __('لطفاً نام و نام خانوادگی خود را وارد نمایید.', 'bumiya-hefazat')], 400);
    }

    if (empty($phone) || strlen(preg_replace('/[^0-9]/', '', $phone)) < 8) {
        wp_send_json_error(['message' => __('لطفاً یک شماره تماس معتبر جهت هماهنگی کارشناسان وارد نمایید.', 'bumiya-hefazat')], 400);
    }

    // 5. Anti-Flood / Duplicate Prevention (Within 45 seconds from same IP/phone)
    $transient_key = 'bumiya_flood_' . md5($client_ip . $phone);
    if (get_transient($transient_key)) {
        wp_send_json_error([
            'message' => __('درخواست شما قبلاً ارسال شده است. کارشناسان ما به زودی با شما تماس خواهند گرفت.', 'bumiya-hefazat')
        ], 429);
    }

    // Set transient for 45 seconds
    set_transient($transient_key, 1, 45);

    // 6. Create Contact Request Post in WordPress
    $post_title = sprintf(
        /* translators: 1: Customer name, 2: Service/Subject */
        __('درخواست %1$s - %2$s', 'bumiya-hefazat'),
        $full_name,
        $service_type
    );

    $post_content = sprintf(
        "نام مشتری: %s\nشماره تماس: %s\nایمیل: %s\nموضوع / نوع خدمت: %s\nمحصول مرتبط: %s\n\nتوضیحات و متن درخواست:\n%s",
        $full_name,
        $phone,
        $email ?: 'ثبت نشده',
        $service_type,
        $product_name ?: 'عمومی',
        $message ?: 'توضیحاتی ثبت نشده است.'
    );

    $post_id = wp_insert_post([
        'post_title'   => $post_title,
        'post_content' => $post_content,
        'post_type'    => 'contact_request',
        'post_status'  => 'publish',
        'post_author'  => 1,
    ]);

    if (is_wp_error($post_id) || !$post_id) {
        wp_send_json_error([
            'message' => __('خطایی در ذخیره اطلاعات رخ داد. لطفاً با پشتیبانی تماس حاصل فرمایید.', 'bumiya-hefazat')
        ], 500);
    }

    // 7. Save Custom Post Meta
    update_post_meta($post_id, '_bumiya_req_name', $full_name);
    update_post_meta($post_id, '_bumiya_req_phone', $phone);
    update_post_meta($post_id, '_bumiya_req_email', $email);
    update_post_meta($post_id, '_bumiya_req_subject', $service_type);
    update_post_meta($post_id, '_bumiya_req_product', $product_name);
    update_post_meta($post_id, '_bumiya_req_status', 'new');
    update_post_meta($post_id, '_bumiya_req_ip', $client_ip);
    update_post_meta($post_id, '_bumiya_req_date', current_time('mysql'));

    // 8. Send Email Notification to Admin via wp_mail
    $admin_email = get_theme_mod('bumiya_company_email', get_option('admin_email'));
    if (!is_email($admin_email)) {
        $admin_email = get_option('admin_email');
    }

    $site_name = get_bloginfo('name') ?: 'بومیا حفاظت گستر';
    $email_subject = sprintf('🔔 درخواست جدید مشاوره / استعلام قیمت - %s (%s)', $full_name, $service_type);
    
    $admin_url_view = admin_url('post.php?post=' . $post_id . '&action=edit');

    $email_body = "
    <!DOCTYPE html>
    <html dir='rtl' lang='fa'>
    <head><meta charset='UTF-8'></head>
    <body style='font-family: Tahoma, sans-serif; background-color: #f1f5f9; padding: 25px; margin: 0;'>
        <div style='max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;'>
            <div style='background-color: #0f2b5c; color: #ffffff; padding: 20px; text-align: center;'>
                <h2 style='margin: 0; font-size: 20px;'>بومیا حفاظت گستر - اعلان ثبت درخواست</h2>
                <p style='margin: 5px 0 0; font-size: 14px; opacity: 0.9;'>یک درخواست مشاوره و استعلام قیمت جدید در سایت ثبت گردید.</p>
            </div>
            <div style='padding: 25px; direction: rtl; text-align: right; color: #1e293b; font-size: 14px; line-height: 1.8;'>
                <p><strong>👤 نام و نام خانوادگی:</strong> " . esc_html($full_name) . "</p>
                <p><strong>📞 شماره تماس:</strong> <a href='tel:" . esc_attr($phone) . "' style='color: #0284c7; font-weight: bold; font-size: 16px;'>" . esc_html($phone) . "</a></p>
                " . ($email ? "<p><strong>✉️ ایمیل:</strong> " . esc_html($email) . "</p>" : "") . "
                <p><strong>📋 موضوع خدمت:</strong> " . esc_html($service_type) . "</p>
                " . ($product_name ? "<p><strong>🔍 محصول مورد نظر:</strong> " . esc_html($product_name) . "</p>" : "") . "
                <div style='background: #f8fafc; border-right: 4px solid #0284c7; padding: 12px; margin: 15px 0; border-radius: 4px;'>
                    <strong>📝 متن پیام / توضیحات متقاضی:</strong><br>
                    " . nl2br(esc_html($message ?: 'بدون توضیحات اضافی')) . "
                </div>
                <div style='text-align: center; margin-top: 25px;'>
                    <a href='" . esc_url($admin_url_view) . "' style='background-color: #0284c7; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;'>مشاهده و تغییر وضعیت در پیشخوان وردپرس</a>
                </div>
            </div>
            <div style='background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 12px; text-align: center; font-size: 12px; color: #64748b;'>
                سیستم هوشمند مدیریت درخواست‌های بومیا حفاظت گستر
            </div>
        </div>
    </body>
    </html>
    ";

    $headers = [
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . $site_name . ' <' . (get_option('admin_email') ?: 'no-reply@bumiya-hefazat.ir') . '>',
    ];

    wp_mail($admin_email, $email_subject, $email_body, $headers);

    // 9. Send Success JSON Response
    wp_send_json_success([
        'message' => __('درخواست شما با موفقیت ثبت شد. کارشناسان بومیا حفاظت گستر در اولین فرصت با شما تماس خواهند گرفت.', 'bumiya-hefazat'),
        'request_id' => $post_id
    ]);
}
add_action('wp_ajax_bumiya_submit_consultation', 'bumiya_handle_consultation_submission');
add_action('wp_ajax_nopriv_bumiya_submit_consultation', 'bumiya_handle_consultation_submission');
