<?php
/**
 * The Front Page Template for Bumiya Hefazat Gostar
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main front-page-main">

    <!-- 1. Hero Section -->
    <?php get_template_part('template-parts/hero'); ?>

    <!-- 2. Highlights Banner -->
    <section class="bumiya-highlights-banner">
        <div class="bumiya-container">
            <div class="highlights-grid">
                <div class="highlight-box">
                    <div class="highlight-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <div class="highlight-info">
                        <h4>اصالت و ضمانت معتبر کالا</h4>
                        <p>ارائه تجهیزات با گارانتی تعویض شرکتی</p>
                    </div>
                </div>

                <div class="highlight-box">
                    <div class="highlight-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <div class="highlight-info">
                        <h4>نصب سریع و استاندارد</h4>
                        <p>اجرای بدون نقص توسط تیم فنی مجرب</p>
                    </div>
                </div>

                <div class="highlight-box">
                    <div class="highlight-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <div class="highlight-info">
                        <h4>مشاوره و بازدید تخصصی</h4>
                        <p>کارشناسی دقیق محیط و نیازسنجی</p>
                    </div>
                </div>

                <div class="highlight-box">
                    <div class="highlight-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <div class="highlight-info">
                        <h4>پشتیبانی و خدمات ۲۴/۷</h4>
                        <p>پاسخگویی سریع در تمامی ایام هفته</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 3. Services Section -->
    <?php get_template_part('template-parts/services'); ?>

    <!-- 3.5 Interactive Project Calculator Section -->
    <?php get_template_part('template-parts/calculator-section'); ?>

    <!-- 4. Featured Products Section -->
    <section class="bumiya-products-featured">
        <div class="bumiya-container">
            <div class="section-header-flex">
                <div class="header-text">
                    <span class="section-badge">تجهیزات و سامانه‌ها</span>
                    <h2 class="section-title">جدیدترین محصولات نظارت تصویری</h2>
                    <p class="section-desc">مجموعه‌ای از برترین دوربین‌ها، رکوردرها و قطعات شبکه حفاظتی</p>
                </div>
                <div class="header-action">
                    <a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>" class="btn-outline-action">
                        <span>مشاهده همه محصولات</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                </div>
            </div>

            <div class="products-grid">
                <?php
                $featured_products = new WP_Query([
                    'post_type'      => 'product',
                    'posts_per_page' => 6,
                    'post_status'    => 'publish',
                ]);

                if ($featured_products->have_posts()) :
                    while ($featured_products->have_posts()) : $featured_products->the_post();
                        get_template_part('template-parts/product-card');
                    endwhile;
                    wp_reset_postdata();
                else :
                    echo '<div class="no-items-notice"><p>محصولی جهت نمایش یافت نشد. لطفاً از طریق منوی مدیریت یا بخش دمو، محصولات جدید را اضافه نمایید.</p></div>';
                endif;
                ?>
            </div>
        </div>
    </section>

    <!-- 5. Why Bumiya Hefazat Gostar? -->
    <section class="bumiya-why-us-section">
        <div class="bumiya-container">
            <div class="why-us-grid">
                <div class="why-us-content">
                    <span class="section-badge">مزیت‌های رقابتی</span>
                    <h2 class="why-title">چرا شرکت «بومیا حفاظت گستر»؟</h2>
                    <p class="why-desc">
                        ما در بومیا حفاظت گستر معتقدیم امنیت یک کالای تزئینی نیست، بلکه یک سیستم حیاتی و حساس است. انتخاب تجهیزات مناسب، نصب اصولی بدون کوچک‌ترین خطای دید و پشتیبانی دائم، سه رکن اصلی خدمات ماست.
                    </p>

                    <div class="why-features-list">
                        <div class="why-feature-item">
                            <div class="why-icon">🛡️</div>
                            <div class="why-text">
                                <h4>مشاوره و طراحی مهندسی</h4>
                                <p>جانمایی دقیق دوربین‌ها با محاسبات متراژ، زوایای دید و لنزهای متناسب</p>
                            </div>
                        </div>

                        <div class="why-feature-item">
                            <div class="why-icon">⚡</div>
                            <div class="why-text">
                                <h4>تجهیزات درجه یک با اصالت کامل</h4>
                                <p>عرضه مستقیم از برترین برندهای بین‌المللی با چیپست‌ها و سنسورهای اورجینال</p>
                            </div>
                        </div>

                        <div class="why-feature-item">
                            <div class="why-icon">🔧</div>
                            <div class="why-text">
                                <h4>نصب فوق‌العاده تمیز و استاندارد</h4>
                                <p>سیم‌کشی صنعتی بدون آسیب به دکوراسیون و استفاده از داکت و لوله‌های فلکسی مقاوم</p>
                            </div>
                        </div>

                        <div class="why-feature-item">
                            <div class="why-icon">🤝</div>
                            <div class="why-text">
                                <h4>پشتیبانی و خدمات پس از فروش متعهدانه</h4>
                                <p>پاسخگویی سریع، رفع خطاهای شبکه و انتقال تصویر بدون اتلاف وقت</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="why-us-visual">
                    <div class="why-image-card">
                        <div class="shield-watermark">
                            <svg width="220" height="220" viewBox="0 0 24 24" fill="none" stroke="rgba(2, 132, 199, 0.15)" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        <div class="why-quote-box">
                            <span class="quote-stars">★★★★★</span>
                            <p>«کیفیت تصویر در شب فوق‌العاده بود و تیم نصب بومیا تمام نقاط حساس کارخانه را بدون هیچ نقطه کوری پوشش دادند.»</p>
                            <span class="quote-author">— مهندس رضوانی، مدیرعامل مجتمع صنعتی نوین</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 6. Featured Projects Section -->
    <section class="bumiya-projects-featured">
        <div class="bumiya-container">
            <div class="section-header-flex">
                <div class="header-text">
                    <span class="section-badge">نمونه کارهای اجرایی</span>
                    <h2 class="section-title">پروژه‌های اخیر بومیا حفاظت گستر</h2>
                    <p class="section-desc">پایش و تجهیز اماکن مسکونی، تجاری، اداری و شهرک‌های صنعتی</p>
                </div>
                <div class="header-action">
                    <a href="<?php echo esc_url(get_post_type_archive_link('project')); ?>" class="btn-outline-action">
                        <span>مشاهده همه پروژه‌ها</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                </div>
            </div>

            <div class="projects-grid">
                <?php
                $featured_projects = new WP_Query([
                    'post_type'      => 'project',
                    'posts_per_page' => 3,
                    'post_status'    => 'publish',
                ]);

                if ($featured_projects->have_posts()) :
                    while ($featured_projects->have_posts()) : $featured_projects->the_post();
                        get_template_part('template-parts/project-card');
                    endwhile;
                    wp_reset_postdata();
                else :
                    echo '<div class="no-items-notice"><p>پروژه‌ای جهت نمایش یافت نشد.</p></div>';
                endif;
                ?>
            </div>
        </div>
    </section>

    <!-- 7. Consultation Form Section (Embedded on Home Page) -->
    <section class="bumiya-consultation-section" id="consultation-form-section">
        <div class="bumiya-container">
            <div class="consultation-card-wrapper">
                <div class="consult-info-side">
                    <span class="consult-badge">کارشناسی و مشاوره</span>
                    <h2 class="consult-heading">به مشاوره تخصصی در محل نیاز دارید؟</h2>
                    <p class="consult-text">
                        فرم زیر را تکمیل نمایید تا کارشناسان فنی بومیا حفاظت گستر در کمتر از چند ساعت با شما تماس گرفته و بهترین راهکار امنیتی را با تخمین هزینه دقیق ارائه نمایند.
                    </p>

                    <div class="consult-quick-steps">
                        <div class="step-item">
                            <span class="step-num">۱</span>
                            <div class="step-desc">ثبت مشخصات و نیازسنجی اولیه</div>
                        </div>
                        <div class="step-item">
                            <span class="step-num">۲</span>
                            <div class="step-desc">تماس و اعزام کارشناس جهت بازدید</div>
                        </div>
                        <div class="step-item">
                            <span class="step-num">۳</span>
                            <div class="step-desc">ارائه پیش‌فاکتور شفاف و اجرای فوری</div>
                        </div>
                    </div>

                    <div class="consult-direct-call">
                        <span>یا تماس مستقیم با شماره:</span>
                        <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9+]/', '', bumiya_get_contact_info()['phone_main'])); ?>" class="direct-number" dir="ltr">
                            📞 <?php echo esc_html(bumiya_get_contact_info()['phone_main']); ?>
                        </a>
                    </div>
                </div>

                <div class="consult-form-side">
                    <form class="front-consult-form bumiya-form-ajax" method="post">
                        <?php wp_nonce_field('bumiya_consultation_nonce', 'bumiya_nonce'); ?>
                        <input type="hidden" name="action" value="bumiya_submit_consultation">
                        
                        <div style="display:none !important;" aria-hidden="true">
                            <input type="text" name="bumiya_website_hp" tabindex="-1" autocomplete="off">
                        </div>

                        <div class="form-group">
                            <label for="front_name">نام و نام خانوادگی <span class="required">*</span></label>
                            <input type="text" id="front_name" name="customer_name" required placeholder="نام کامل خود را وارد کنید">
                        </div>

                        <div class="form-row-2">
                            <div class="form-group">
                                <label for="front_phone">شماره همراه <span class="required">*</span></label>
                                <input type="tel" id="front_phone" name="customer_phone" required placeholder="09123456789" dir="ltr">
                            </div>
                            <div class="form-group">
                                <label for="front_service">موضوع مشاوره</label>
                                <select id="front_service" name="service_type">
                                    <option value="مشاوره و استعلام خرید">خرید و استعلام تجهیزات</option>
                                    <option value="نصب دوربین مداربسته">نصب و راه‌اندازی دوربین</option>
                                    <option value="طراحی پروژه حفاظتی">طراحی و نقشه پروژه</option>
                                    <option value="تعمیرات و پشتیبانی">پشتیبانی و سرویس</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="front_message">توضیحات تکمیلی (متراژ، تعداد دوربین، شهر و...)</label>
                            <textarea id="front_message" name="customer_message" rows="3" placeholder="توضیحات کوتاه درباره نیاز امنیتی خود..."></textarea>
                        </div>

                        <button type="submit" class="btn-submit-front">
                            <span class="btn-text">ارسال درخواست مشاوره رایگان</span>
                        </button>

                        <div class="form-feedback" style="display:none;"></div>
                    </form>
                </div>
            </div>
        </div>
    </section>

</main>

<?php
get_footer();
