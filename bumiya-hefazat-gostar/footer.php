<?php
/**
 * The Footer for Bumiya Hefazat Gostar Theme
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

$contact_info = bumiya_get_contact_info();
$whatsapp_url = bumiya_get_whatsapp_link();
?>

    <!-- Footer -->
    <footer id="colophon" class="site-footer">
        <div class="footer-top-wave"></div>
        <div class="bumiya-container">
            <div class="footer-grid">
                <!-- Column 1: Company Profile -->
                <div class="footer-col footer-col-about">
                    <div class="footer-brand">
                        <div class="footer-logo-shield">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        <span class="footer-brand-title">بومیا حفاظت گستر</span>
                    </div>
                    <p class="footer-about-text">
                        شرکت بومیا حفاظت گستر، مرجع تخصصی مشاوره، طراحی، تأمین و اجرای پیشرفته‌ترین سیستم‌های نظارت تصویری و دوربین مداربسته. تعهد به کیفیت، اصالت قطعات و پشتیبانی شبانه‌روزی، ضامن امنیت پایدار شماست.
                    </p>
                    <div class="footer-trust-badges">
                        <div class="trust-badge-item">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                            <span>اصالت ۱۰۰٪ کالا</span>
                        </div>
                        <div class="trust-badge-item">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                            <span>۲۴ ماه گارانتی معتبر</span>
                        </div>
                    </div>
                </div>

                <!-- Column 2: Quick Links -->
                <div class="footer-col">
                    <h4 class="footer-col-title">دسترسی سریع</h4>
                    <ul class="footer-links-list">
                        <li><a href="<?php echo esc_url(home_url('/')); ?>">صفحه اصلی</a></li>
                        <li><a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>">کاتالوگ محصولات</a></li>
                        <li><a href="<?php echo esc_url(home_url('/#services-section')); ?>">خدمات تخصصی ما</a></li>
                        <li><a href="<?php echo esc_url(get_post_type_archive_link('project')); ?>">پروژه‌های اجرایی</a></li>
                        <li><a href="<?php echo esc_url(home_url('/about/')); ?>">درباره شرکت بومیا</a></li>
                        <li><a href="<?php echo esc_url(home_url('/contact/')); ?>">تماس با کارشناسان</a></li>
                    </ul>
                </div>

                <!-- Column 3: Products -->
                <div class="footer-col">
                    <h4 class="footer-col-title">تجهیزات و محصولات</h4>
                    <ul class="footer-links-list">
                        <li><a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>">انواع دوربین مداربسته IP & HD</a></li>
                        <li><a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>">دستگاه‌های رکوردر DVR و NVR</a></li>
                        <li><a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>">هارد دیسک‌های نظارتی بنفش</a></li>
                        <li><a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>">سوئیچ‌های شبکه صنعتی PoE</a></li>
                        <li><a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>">کابل شبکه و کواکسیال تمام مس</a></li>
                        <li><a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>">منابع تغذیه و متعلقات رک</a></li>
                    </ul>
                </div>

                <!-- Column 4: Contact Info -->
                <div class="footer-col footer-col-contact">
                    <h4 class="footer-col-title">اطلاعات ارتباطی</h4>
                    <ul class="footer-contact-list">
                        <li class="contact-item">
                            <span class="icon">📍</span>
                            <span class="text"><?php echo esc_html($contact_info['address']); ?></span>
                        </li>
                        <li class="contact-item">
                            <span class="icon">📞</span>
                            <span class="text">
                                تلفن دفتر: <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9+]/', '', $contact_info['phone_main'])); ?>" dir="ltr"><?php echo esc_html($contact_info['phone_main']); ?></a>
                            </span>
                        </li>
                        <li class="contact-item">
                            <span class="icon">📱</span>
                            <span class="text">
                                مشاوره فنی: <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9+]/', '', $contact_info['phone_mobile'])); ?>" dir="ltr"><?php echo esc_html($contact_info['phone_mobile']); ?></a>
                            </span>
                        </li>
                        <li class="contact-item">
                            <span class="icon">✉️</span>
                            <span class="text"><?php echo esc_html($contact_info['email']); ?></span>
                        </li>
                        <li class="contact-item">
                            <span class="icon">🕒</span>
                            <span class="text"><?php echo esc_html($contact_info['working_hours']); ?></span>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="footer-bottom-bar">
                <div class="copyright-text">
                    &copy; <?php echo date_i18n('Y'); ?> تمامی حقوق مادی و معنوی برای شرکت <strong>بومیا حفاظت گستر</strong> محفوظ است.
                </div>
                <div class="bottom-trust-links">
                    <span>طراحی مهندسی و اجرای سیستم‌های نظارت تصویری</span>
                </div>
            </div>
        </div>
    </footer>

    <!-- Floating WhatsApp Action Button (Strictly WhatsApp, no Telegram) -->
    <a href="<?php echo esc_url($whatsapp_url); ?>" target="_blank" rel="noopener noreferrer" class="floating-whatsapp-widget" title="ارتباط مستقیم در واتساپ">
        <div class="whatsapp-pulse-ring"></div>
        <div class="whatsapp-btn-inner">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            <span class="whatsapp-tooltip">مشاوره و استعلام در واتساپ</span>
        </div>
    </a>

    <!-- Global Consultation Modal -->
    <?php get_template_part('template-parts/contact-modal'); ?>

    <!-- Global Project Calculator Modal -->
    <?php get_template_part('template-parts/calculator-modal'); ?>

</div><!-- #page -->

<?php wp_footer(); ?>
</body>
</html>
