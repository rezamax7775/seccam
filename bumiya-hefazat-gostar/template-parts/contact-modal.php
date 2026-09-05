<?php
/**
 * Consultation & Price Inquiry Modal Form
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

$whatsapp_url = bumiya_get_whatsapp_link();
?>

<div id="bumiya-consultation-modal" class="bumiya-modal-overlay" aria-hidden="true" role="dialog">
    <div class="modal-dialog">
        <div class="modal-header">
            <div class="modal-title-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <h3 class="modal-title" id="modal-heading">درخواست مشاوره و استعلام قیمت</h3>
            </div>
            <button type="button" class="modal-close-btn" aria-label="بستن پنجره">&times;</button>
        </div>

        <div class="modal-body">
            <p class="modal-intro">
                اطلاعات تماس خود را وارد نمایید؛ کارشناسان فنی بومیا حفاظت گستر در اسرع وقت جهت بررسی فنی و صدور پیش‌فاکتور با شما تماس خواهند گرفت.
            </p>

            <form id="bumiya-consultation-form" class="bumiya-form-ajax" method="post">
                <?php wp_nonce_field('bumiya_consultation_nonce', 'bumiya_nonce'); ?>
                <input type="hidden" name="action" value="bumiya_submit_consultation">
                <input type="hidden" name="product_name" id="modal-product-input" value="">
                
                <!-- Honeypot -->
                <div style="display:none !important;" aria-hidden="true">
                    <input type="text" name="bumiya_website_hp" tabindex="-1" autocomplete="off">
                </div>

                <div class="form-group">
                    <label for="customer_name">نام و نام خانوادگی <span class="required">*</span></label>
                    <input type="text" id="customer_name" name="customer_name" required placeholder="مثال: مهندس احمدی">
                </div>

                <div class="form-row-2">
                    <div class="form-group">
                        <label for="customer_phone">شماره همراه / تلفن تماس <span class="required">*</span></label>
                        <input type="tel" id="customer_phone" name="customer_phone" required placeholder="مثال: 09123456789" dir="ltr">
                    </div>

                    <div class="form-group">
                        <label for="customer_email">ایمیل (اختیاری)</label>
                        <input type="email" id="customer_email" name="customer_email" placeholder="name@example.com" dir="ltr">
                    </div>
                </div>

                <div class="form-group">
                    <label for="service_type">نوع خدمت یا حوزه درخواست</label>
                    <select id="service_type" name="service_type">
                        <option value="استعلام قیمت تجهیزات">استعلام قیمت و خرید تجهیزات</option>
                        <option value="نصب و راه‌اندازی دوربین">نصب و راه‌اندازی دوربین مداربسته</option>
                        <option value="طراحی سیستم حفاظتی">طراحی و کارشناسی سیستم نظارتی</option>
                        <option value="پشتیبانی و تعمیرات">سرویس، پشتیبانی و تعمیرات</option>
                        <option value="مشاوره عمومی">مشاوره فنی رایگان</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="customer_message">توضیحات یا متراژ و جزئیات پروژه</label>
                    <textarea id="customer_message" name="customer_message" rows="3" placeholder="تعداد دوربین‌های مورد نیاز، متراژ فضا یا هرگونه توضیح دیگر..."></textarea>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn-submit-form" id="btn-submit-consultation">
                        <span class="btn-text">ثبت و ارسال درخواست</span>
                        <span class="btn-spinner" style="display: none;">در حال ارسال...</span>
                    </button>

                    <a href="<?php echo esc_url($whatsapp_url); ?>" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-direct">
                        <span>ارسال در واتساپ</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    </a>
                </div>

                <div class="form-feedback" id="form-feedback-msg" style="display:none;"></div>
            </form>
        </div>
    </div>
</div>
