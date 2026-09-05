<?php
/**
 * Custom Meta Boxes for Products, Projects, and Consultation Requests
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Meta Boxes
 */
function bumiya_add_meta_boxes() {
    // Product Details Meta Box
    add_meta_box(
        'bumiya_product_details_box',
        __('مشخصات فنی و اطلاعات تکمیلی محصول', 'bumiya-hefazat'),
        'bumiya_render_product_meta_box',
        'product',
        'normal',
        'high'
    );

    // Project Details Meta Box
    add_meta_box(
        'bumiya_project_details_box',
        __('جزئیات و اطلاعات اجرایی پروژه', 'bumiya-hefazat'),
        'bumiya_render_project_meta_box',
        'project',
        'normal',
        'high'
    );

    // Consultation Request Details Meta Box
    add_meta_box(
        'bumiya_request_details_box',
        __('اطلاعات درخواست مشاوره و پیگیری مشتری', 'bumiya-hefazat'),
        'bumiya_render_request_meta_box',
        'contact_request',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'bumiya_add_meta_boxes');

/**
 * Render Product Meta Box
 */
function bumiya_render_product_meta_box($post) {
    wp_nonce_field('bumiya_save_product_meta', 'bumiya_product_meta_nonce');

    $brand = get_post_meta($post->ID, '_bumiya_product_brand', true);
    $model = get_post_meta($post->ID, '_bumiya_product_model', true);
    $code = get_post_meta($post->ID, '_bumiya_product_code', true);
    $stock = get_post_meta($post->ID, '_bumiya_product_stock', true) ?: 'in_stock';
    $price = get_post_meta($post->ID, '_bumiya_product_price', true);
    $specs = get_post_meta($post->ID, '_bumiya_product_specs', true);
    $features = get_post_meta($post->ID, '_bumiya_product_features', true);
    $applications = get_post_meta($post->ID, '_bumiya_product_applications', true);
    $advantages = get_post_meta($post->ID, '_bumiya_product_advantages', true);
    $catalog_url = get_post_meta($post->ID, '_bumiya_product_catalog_url', true);
    $gallery = get_post_meta($post->ID, '_bumiya_product_gallery', true);
    ?>
    <div class="bumiya-meta-wrapper" style="direction: rtl; font-family: Tahoma, sans-serif;">
        <table class="form-table" style="width: 100%;">
            <tr>
                <th style="width: 20%;"><label for="bumiya_product_brand">برند / کمپانی سازنده:</label></th>
                <td><input type="text" id="bumiya_product_brand" name="bumiya_product_brand" value="<?php echo esc_attr($brand); ?>" class="regular-text" placeholder="مثال: هایک‌ویژن (Hikvision) یا داهوا (Dahua)" /></td>
            </tr>
            <tr>
                <th><label for="bumiya_product_model">مدل دقیق کالا:</label></th>
                <td><input type="text" id="bumiya_product_model" name="bumiya_product_model" value="<?php echo esc_attr($model); ?>" class="regular-text" placeholder="مثال: DS-2CD2043G2-I" /></td>
            </tr>
            <tr>
                <th><label for="bumiya_product_code">کد محصول / پارت نامبر (SKU):</label></th>
                <td><input type="text" id="bumiya_product_code" name="bumiya_product_code" value="<?php echo esc_attr($code); ?>" class="regular-text" placeholder="مثال: BHG-CAM-4022" /></td>
            </tr>
            <tr>
                <th><label for="bumiya_product_stock">وضعیت موجودی انبار:</label></th>
                <td>
                    <select id="bumiya_product_stock" name="bumiya_product_stock">
                        <option value="in_stock" <?php selected($stock, 'in_stock'); ?>>موجود در انبار بومیا حفاظت گستر</option>
                        <option value="call_for_stock" <?php selected($stock, 'call_for_stock'); ?>>موجود جهت سفارش پروژه / استعلام</option>
                        <option value="out_of_stock" <?php selected($stock, 'out_of_stock'); ?>>ناموجود</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th><label for="bumiya_product_price">قیمت تقریبی (اختیاری - تومان):</label></th>
                <td>
                    <input type="text" id="bumiya_product_price" name="bumiya_product_price" value="<?php echo esc_attr($price); ?>" class="regular-text" placeholder="در صورت خالی بودن، دکمه «استعلام قیمت» نمایش داده می‌شود" />
                    <p class="description">سایت فروشگاه آنلاین نیست؛ محصولات با دکمه مستقیم استعلام تلفنی و واتساپ نمایش داده می‌شوند.</p>
                </td>
            </tr>
            <tr>
                <th><label for="bumiya_product_specs">مشخصات فنی (هر خط یک مورد: کلید: مقدار):</label></th>
                <td>
                    <textarea id="bumiya_product_specs" name="bumiya_product_specs" rows="6" class="large-text" placeholder="کیفیت تصویر: 4 مگاپیکسل (2K)
دید در شب: هوشمند مادون قرمز EXIR تا 40 متر
نوع لنز: 2.8 میلی‌متر واید
استاندارد مقاومت: IP67 ضدآب و گردوغبار
جنس بدنه: تمام فلزی مقاوم در برابر ضربه
پروتکل‌ها: ONVIF, RTSP, H.265+
گارانتی: 24 ماه گارانتی طلایی بومیا حفاظت"><?php echo esc_textarea($specs); ?></textarea>
                    <p class="description">برای ایجاد جدول منظم، در هر سطر عبارت را به صورت <code>عنوان مشخصه: مقدار مشخصه</code> وارد نمایید.</p>
                </td>
            </tr>
            <tr>
                <th><label for="bumiya_product_features">ویژگی‌های برجسته (هر خط یک مورد):</label></th>
                <td>
                    <textarea id="bumiya_product_features" name="bumiya_product_features" rows="4" class="large-text" placeholder="مجهز به سنسور پیشرفته پردازش تصویر
پشتیبانی از فناوری فشرده‌سازی Ultra H.265
قابلیت تشخیص چهره و عبور از خط هوشمند"><?php echo esc_textarea($features); ?></textarea>
                </td>
            </tr>
            <tr>
                <th><label for="bumiya_product_applications">کاربردها و محیط‌های پیشنهادی:</label></th>
                <td>
                    <textarea id="bumiya_product_applications" name="bumiya_product_applications" rows="3" class="large-text" placeholder="مناسب برای ویلاها، مجتمع‌های مسکونی، پارکینگ‌ها، کارخانجات و فضاهای باز صنعتی"><?php echo esc_textarea($applications); ?></textarea>
                </td>
            </tr>
            <tr>
                <th><label for="bumiya_product_advantages">مزایا و ارزش افزوده خرید از بومیا:</label></th>
                <td>
                    <textarea id="bumiya_product_advantages" name="bumiya_product_advantages" rows="3" class="large-text" placeholder="اصالت ۱۰۰٪ کالا + تضمین بهترین قیمت همکاری + خدمات نصب و پشتیبانی توسط تکنسین‌های مجرب"><?php echo esc_textarea($advantages); ?></textarea>
                </td>
            </tr>
            <tr>
                <th><label for="bumiya_product_catalog_url">لینک دانلود کاتالوگ PDF:</label></th>
                <td>
                    <input type="url" id="bumiya_product_catalog_url" name="bumiya_product_catalog_url" value="<?php echo esc_url($catalog_url); ?>" class="large-text" placeholder="https://example.com/catalog.pdf" />
                </td>
            </tr>
            <tr>
                <th><label for="bumiya_product_gallery">شناسه تصاویر گالری (با کاما جدا کنید):</label></th>
                <td>
                    <input type="text" id="bumiya_product_gallery" name="bumiya_product_gallery" value="<?php echo esc_attr($gallery); ?>" class="large-text" placeholder="شناسه مدیاهای گالری، مثال: 102, 103, 104" />
                </td>
            </tr>
        </table>
    </div>
    <?php
}

/**
 * Render Project Meta Box
 */
function bumiya_render_project_meta_box($post) {
    wp_nonce_field('bumiya_save_project_meta', 'bumiya_project_meta_nonce');

    $location = get_post_meta($post->ID, '_bumiya_project_location', true);
    $client = get_post_meta($post->ID, '_bumiya_project_client', true);
    $date = get_post_meta($post->ID, '_bumiya_project_date', true);
    $equipment = get_post_meta($post->ID, '_bumiya_project_equipment', true);
    $services = get_post_meta($post->ID, '_bumiya_project_services', true);
    $results = get_post_meta($post->ID, '_bumiya_project_results', true);
    ?>
    <div class="bumiya-meta-wrapper" style="direction: rtl; font-family: Tahoma, sans-serif;">
        <table class="form-table" style="width: 100%;">
            <tr>
                <th style="width: 20%;"><label for="bumiya_project_location">محل اجرای پروژه (شهر / منطقه):</label></th>
                <td><input type="text" id="bumiya_project_location" name="bumiya_project_location" value="<?php echo esc_attr($location); ?>" class="regular-text" placeholder="مثال: تهران - شهرک صنعتی شمس‌آباد" /></td>
            </tr>
            <tr>
                <th><label for="bumiya_project_client">کارفرما / نام مجموعه:</label></th>
                <td><input type="text" id="bumiya_project_client" name="bumiya_project_client" value="<?php echo esc_attr($client); ?>" class="regular-text" placeholder="مثال: شرکت صنایع فولاد برتر" /></td>
            </tr>
            <tr>
                <th><label for="bumiya_project_date">تاریخ یا بازه اجرای پروژه:</label></th>
                <td><input type="text" id="bumiya_project_date" name="bumiya_project_date" value="<?php echo esc_attr($date); ?>" class="regular-text" placeholder="مثال: پاییز ۱۴۰۲" /></td>
            </tr>
            <tr>
                <th><label for="bumiya_project_equipment">تجهیزات نظارتی نصب‌شده:</label></th>
                <td>
                    <textarea id="bumiya_project_equipment" name="bumiya_project_equipment" rows="4" class="large-text" placeholder="۳۲ عدد دوربین بولت تحت شبکه 4MP
۲ دستگاه NVR 32 کانال تحت شبکه
۳ رول کابل شبکه Cat6 SFTP تمام مس
سیستم برق اضطراری آنلاین UPS"><?php echo esc_textarea($equipment); ?></textarea>
                </td>
            </tr>
            <tr>
                <th><label for="bumiya_project_services">خدمات و اقدامات انجام‌شده:</label></th>
                <td>
                    <textarea id="bumiya_project_services" name="bumiya_project_services" rows="4" class="large-text" placeholder="طراحی نقشه جامع مانیتورینگ
کابل‌کشی و داکت‌کشی صنعتی
راه‌اندازی اتاق کنترل و مانیتورینگ مرکزی
آموزش حراست و پشتیبانی فنی ۲۴ ساعته"><?php echo esc_textarea($services); ?></textarea>
                </td>
            </tr>
            <tr>
                <th><label for="bumiya_project_results">نتایج و دستاوردها:</label></th>
                <td>
                    <textarea id="bumiya_project_results" name="bumiya_project_results" rows="3" class="large-text" placeholder="پوشش ۱۰۰ درصدی نقاط کور، کاهش چشمگیر خطاهای امنیتی و مانیتورینگ زنده بدون افت فریم"><?php echo esc_textarea($results); ?></textarea>
                </td>
            </tr>
        </table>
    </div>
    <?php
}

/**
 * Render Consultation Request Meta Box
 */
function bumiya_render_request_meta_box($post) {
    wp_nonce_field('bumiya_save_request_meta', 'bumiya_request_meta_nonce');

    $phone = get_post_meta($post->ID, '_bumiya_req_phone', true);
    $email = get_post_meta($post->ID, '_bumiya_req_email', true);
    $subject = get_post_meta($post->ID, '_bumiya_req_subject', true);
    $product_name = get_post_meta($post->ID, '_bumiya_req_product', true);
    $status = get_post_meta($post->ID, '_bumiya_req_status', true) ?: 'new';
    $notes = get_post_meta($post->ID, '_bumiya_req_admin_notes', true);
    ?>
    <div class="bumiya-meta-wrapper" style="direction: rtl; font-family: Tahoma, sans-serif;">
        <table class="form-table" style="width: 100%;">
            <tr>
                <th style="width: 20%;"><strong>شماره تماس مشتری:</strong></th>
                <td>
                    <a href="tel:<?php echo esc_attr($phone); ?>" style="font-size: 16px; font-weight: bold; color: #0284c7; text-decoration: none;">
                        📞 <?php echo esc_html($phone); ?>
                    </a>
                    &nbsp;&nbsp;
                    <a href="https://wa.me/98<?php echo esc_attr(ltrim($phone, '0+')); ?>" target="_blank" style="color: #10b981; font-weight: bold; text-decoration: none;">
                        💬 پاسخ مستقیم در واتساپ
                    </a>
                </td>
            </tr>
            <tr>
                <th><strong>ایمیل متقاضی:</strong></th>
                <td><?php echo $email ? esc_html($email) : '<span style="color:#94a3b8;">ثبت نشده</span>'; ?></td>
            </tr>
            <tr>
                <th><strong>موضوع درخواست / خدمت:</strong></th>
                <td><span style="background: #f1f5f9; padding: 4px 10px; border-radius: 6px; font-weight: bold;"><?php echo esc_html($subject ?: 'مشاوره عمومی'); ?></span></td>
            </tr>
            <?php if (!empty($product_name)): ?>
            <tr>
                <th><strong>استعلام برای محصول:</strong></th>
                <td><span style="color: #0f2b5c; font-weight: bold;">🔍 <?php echo esc_html($product_name); ?></span></td>
            </tr>
            <?php endif; ?>
            <tr>
                <th><label for="bumiya_req_status"><strong>وضعیت پیگیری:</strong></label></th>
                <td>
                    <select id="bumiya_req_status" name="bumiya_req_status" style="font-weight: bold; padding: 6px 12px; border-radius: 6px;">
                        <option value="new" <?php selected($status, 'new'); ?>>🔴 جدید (نیاز به تماس)</option>
                        <option value="contacted" <?php selected($status, 'contacted'); ?>>🟡 تماس گرفته شد</option>
                        <option value="in_progress" <?php selected($status, 'in_progress'); ?>>🔵 در حال پیگیری و صدور پیش‌فاکتور</option>
                        <option value="completed" <?php selected($status, 'completed'); ?>>🟢 انجام شد (پروژه بسته شد)</option>
                        <option value="cancelled" <?php selected($status, 'cancelled'); ?>>⚪ لغو شد</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th><label for="bumiya_req_admin_notes"><strong>یادداشت کارشناس فروش / فنی:</strong></label></th>
                <td>
                    <textarea id="bumiya_req_admin_notes" name="bumiya_req_admin_notes" rows="4" class="large-text" placeholder="یادداشت‌های داخلی تماس با مشتری، قیمت اعلامی، آدرس پروژه و..."><?php echo esc_textarea($notes); ?></textarea>
                </td>
            </tr>
        </table>
    </div>
    <?php
}

/**
 * Save Meta Box Data
 */
function bumiya_save_meta_boxes_data($post_id) {
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    // Save Product Meta
    if (isset($_POST['bumiya_product_meta_nonce']) && wp_verify_nonce($_POST['bumiya_product_meta_nonce'], 'bumiya_save_product_meta')) {
        $fields = [
            '_bumiya_product_brand' => 'sanitize_text_field',
            '_bumiya_product_model' => 'sanitize_text_field',
            '_bumiya_product_code' => 'sanitize_text_field',
            '_bumiya_product_stock' => 'sanitize_text_field',
            '_bumiya_product_price' => 'sanitize_text_field',
            '_bumiya_product_specs' => 'sanitize_textarea_field',
            '_bumiya_product_features' => 'sanitize_textarea_field',
            '_bumiya_product_applications' => 'sanitize_textarea_field',
            '_bumiya_product_advantages' => 'sanitize_textarea_field',
            '_bumiya_product_catalog_url' => 'esc_url_raw',
            '_bumiya_product_gallery' => 'sanitize_text_field',
        ];
        foreach ($fields as $field => $sanitizer) {
            $post_key = ltrim($field, '_');
            if (isset($_POST[$post_key])) {
                update_post_meta($post_id, $field, $sanitizer($_POST[$post_key]));
            }
        }
    }

    // Save Project Meta
    if (isset($_POST['bumiya_project_meta_nonce']) && wp_verify_nonce($_POST['bumiya_project_meta_nonce'], 'bumiya_save_project_meta')) {
        $fields = [
            '_bumiya_project_location' => 'sanitize_text_field',
            '_bumiya_project_client' => 'sanitize_text_field',
            '_bumiya_project_date' => 'sanitize_text_field',
            '_bumiya_project_equipment' => 'sanitize_textarea_field',
            '_bumiya_project_services' => 'sanitize_textarea_field',
            '_bumiya_project_results' => 'sanitize_textarea_field',
        ];
        foreach ($fields as $field => $sanitizer) {
            $post_key = ltrim($field, '_');
            if (isset($_POST[$post_key])) {
                update_post_meta($post_id, $field, $sanitizer($_POST[$post_key]));
            }
        }
    }

    // Save Request Meta
    if (isset($_POST['bumiya_request_meta_nonce']) && wp_verify_nonce($_POST['bumiya_request_meta_nonce'], 'bumiya_save_request_meta')) {
        if (isset($_POST['bumiya_req_status'])) {
            update_post_meta($post_id, '_bumiya_req_status', sanitize_text_field($_POST['bumiya_req_status']));
        }
        if (isset($_POST['bumiya_req_admin_notes'])) {
            update_post_meta($post_id, '_bumiya_req_admin_notes', sanitize_textarea_field($_POST['bumiya_req_admin_notes']));
        }
    }
}
add_action('save_post', 'bumiya_save_meta_boxes_data');
