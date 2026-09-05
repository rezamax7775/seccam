<?php
/**
 * Template Name: تماس با ما (Contact Us)
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

$contact_info = bumiya_get_contact_info();
$whatsapp_url = bumiya_get_whatsapp_link();
?>

<main id="primary" class="site-main page-contact-main">

    <!-- Breadcrumbs -->
    <?php bumiya_breadcrumbs(); ?>

    <!-- Contact Header -->
    <section class="contact-hero-banner">
        <div class="bumiya-container">
            <span class="section-badge">ارتباط با کارشناسان</span>
            <h1 class="contact-title">تماس با بومیا حفاظت گستر</h1>
            <p class="contact-subtitle">
                مشتاقانه آماده پاسخگویی به سوالات، ارائه مشاوره فنی و اجرای پروژه‌های نظارتی و امنیتی شما هستیم.
            </p>
        </div>
    </section>

    <!-- Main Contact Section -->
    <section class="contact-content-section">
        <div class="bumiya-container">
            <div class="contact-layout-grid">
                
                <!-- Right Side: Contact Info Cards -->
                <div class="contact-info-cards-column">
                    
                    <div class="contact-card-box">
                        <div class="card-icon-round">📞</div>
                        <div class="card-text-block">
                            <h3>تماس تلفنی با دفتر مرکزی</h3>
                            <p>پاسخگویی سریع کارشناسان فروش و فنی</p>
                            <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9+]/', '', $contact_info['phone_main'])); ?>" class="contact-link-highlight" dir="ltr">
                                <?php echo esc_html($contact_info['phone_main']); ?>
                            </a>
                            <br>
                            <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9+]/', '', $contact_info['phone_mobile'])); ?>" class="contact-link-mobile" dir="ltr">
                                همراه: <?php echo esc_html($contact_info['phone_mobile']); ?>
                            </a>
                        </div>
                    </div>

                    <div class="contact-card-box whatsapp-featured-card">
                        <div class="card-icon-round wa-green">💬</div>
                        <div class="card-text-block">
                            <h3>ارتباط مستقیم در واتساپ</h3>
                            <p>ارسال پیش‌فاکتور، تصاویر محل پروژه و استعلام فوری</p>
                            <a href="<?php echo esc_url($whatsapp_url); ?>" target="_blank" rel="noopener noreferrer" class="btn-wa-link">
                                شروع گفتگو در واتساپ &larr;
                            </a>
                        </div>
                    </div>

                    <div class="contact-card-box">
                        <div class="card-icon-round">📍</div>
                        <div class="card-text-block">
                            <h3>آدرس دفتر مرکزی بومیا</h3>
                            <p><?php echo esc_html($contact_info['address']); ?></p>
                        </div>
                    </div>

                    <div class="contact-card-box">
                        <div class="card-icon-round">🕒</div>
                        <div class="card-text-block">
                            <h3>ساعات پاسخگویی و کاری</h3>
                            <p><?php echo esc_html($contact_info['working_hours']); ?></p>
                        </div>
                    </div>

                    <div class="contact-card-box">
                        <div class="card-icon-round">✉️</div>
                        <div class="card-text-block">
                            <h3>ایمیل سازمانی</h3>
                            <a href="mailto:<?php echo esc_attr($contact_info['email']); ?>" class="contact-link-email">
                                <?php echo esc_html($contact_info['email']); ?>
                            </a>
                        </div>
                    </div>

                </div>

                <!-- Left Side: Consultation & Quote Request Form -->
                <div class="contact-form-column">
                    <div class="contact-form-card">
                        <div class="form-card-header">
                            <h2 class="form-title">فرم ثبت درخواست مشاوره و استعلام</h2>
                            <p class="form-desc">اطلاعات خود را ثبت کنید؛ در سریع‌ترین زمان ممکن با شما تماس می‌گیریم.</p>
                        </div>

                        <form id="page-contact-form" class="bumiya-form-ajax contact-page-form" method="post">
                            <?php wp_nonce_field('bumiya_consultation_nonce', 'bumiya_nonce'); ?>
                            <input type="hidden" name="action" value="bumiya_submit_consultation">

                            <!-- Honeypot -->
                            <div style="display:none !important;" aria-hidden="true">
                                <input type="text" name="bumiya_website_hp" tabindex="-1" autocomplete="off">
                            </div>

                            <div class="form-group">
                                <label for="contact_name">نام و نام خانوادگی <span class="required">*</span></label>
                                <input type="text" id="contact_name" name="customer_name" required placeholder="نام کامل خود را وارد فرمایید">
                            </div>

                            <div class="form-row-2">
                                <div class="form-group">
                                    <label for="contact_phone">شماره تماس همراه <span class="required">*</span></label>
                                    <input type="tel" id="contact_phone" name="customer_phone" required placeholder="09123456789" dir="ltr">
                                </div>

                                <div class="form-group">
                                    <label for="contact_email">ایمیل (اختیاری)</label>
                                    <input type="email" id="contact_email" name="customer_email" placeholder="email@example.com" dir="ltr">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="contact_subject">موضوع درخواست / خدمت مورد نظر</label>
                                <select id="contact_subject" name="service_type">
                                    <option value="استعلام قیمت و خرید تجهیزات">استعلام قیمت تجهیزات نظارتی</option>
                                    <option value="نصب دوربین مداربسته">نصب و کابل‌کشی دوربین</option>
                                    <option value="طراحی سیستم حفاظتی">طراحی و جانمایی پروژه</option>
                                    <option value="سرویس و تعمیرات">سرویس، انتقال تصویر و تعمیرات</option>
                                    <option value="مشاوره عمومی">سایر موارد و مشاوره عمومی</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="contact_message">توضیحات و شرح نیاز امنیتی</label>
                                <textarea id="contact_message" name="customer_message" rows="4" placeholder="توضیحات تکمیلی پیرامون محل، تعداد دوربین یا سوالات فنی..."></textarea>
                            </div>

                            <button type="submit" class="btn-submit-main">
                                <span class="btn-text">ارسال درخواست مشاوره</span>
                                <span class="btn-spinner" style="display:none;">در حال ارسال...</span>
                            </button>

                            <div class="form-feedback" style="display:none;"></div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </section>

</main>

<?php
get_footer();
