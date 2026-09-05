<?php
/**
 * Single Product Template for Bumiya Hefazat Gostar
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

$product_id   = get_the_ID();
$brand        = get_post_meta($product_id, '_bumiya_product_brand', true);
$model        = get_post_meta($product_id, '_bumiya_product_model', true);
$code         = get_post_meta($product_id, '_bumiya_product_code', true);
$stock        = get_post_meta($product_id, '_bumiya_product_stock', true) ?: 'in_stock';
$price        = get_post_meta($product_id, '_bumiya_product_price', true);
$specs_raw    = get_post_meta($product_id, '_bumiya_product_specs', true);
$features_raw = get_post_meta($product_id, '_bumiya_product_features', true);
$apps_raw     = get_post_meta($product_id, '_bumiya_product_applications', true);
$adv_raw      = get_post_meta($product_id, '_bumiya_product_advantages', true);
$catalog_url  = get_post_meta($product_id, '_bumiya_product_catalog_url', true);

$terms = get_the_terms($product_id, 'product_category');
$cat_name = ($terms && !is_wp_error($terms)) ? $terms[0]->name : '';

$contact_info = bumiya_get_contact_info();
$whatsapp_msg = sprintf('سلام و درود، جهت دریافت استعلام قیمت و مشخصات فنی تکمیلی محصول «%s» مدل (%s) از وب‌سایت بومیا حفاظت گستر پیام می‌دهم.', get_the_title(), $model ?: $code);
$whatsapp_url = bumiya_get_whatsapp_link($whatsapp_msg);
?>

<main id="primary" class="site-main product-single-main">

    <!-- Breadcrumb -->
    <?php bumiya_breadcrumbs(); ?>

    <div class="bumiya-container">
        <?php while (have_posts()) : the_post(); ?>

            <article id="product-<?php the_ID(); ?>" <?php post_class('product-detail-wrapper'); ?>>
                
                <!-- 1. Top Section: Visual & Key Specs / Inquiry -->
                <div class="product-top-grid">
                    
                    <!-- Right: Product Image / Visual Showcase -->
                    <div class="product-gallery-side">
                        <div class="main-image-box">
                            <?php if (has_post_thumbnail()) : ?>
                                <?php the_post_thumbnail('bumiya-large', ['class' => 'product-main-img', 'alt' => get_the_title()]); ?>
                            <?php else : ?>
                                <div class="product-image-fallback">
                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                                    <span>بومیا حفاظت گستر</span>
                                </div>
                            <?php endif; ?>

                            <?php if ($stock === 'in_stock') : ?>
                                <span class="badge-stock in-stock">🟢 موجود در انبار</span>
                            <?php elseif ($stock === 'call_for_stock') : ?>
                                <span class="badge-stock call-stock">🔵 موجود جهت سفارش پروژه</span>
                            <?php else : ?>
                                <span class="badge-stock out-stock">🔴 ناموجود</span>
                            <?php endif; ?>
                        </div>

                        <!-- Product Trust Guarantees -->
                        <div class="product-trust-strip">
                            <div class="trust-pill">
                                <span>🔒 ضمانت اصالت ۱۰۰٪ کالا</span>
                            </div>
                            <div class="trust-pill">
                                <span>🛠️ خدمات نصب و راه‌اندازی</span>
                            </div>
                            <div class="trust-pill">
                                <span>🛡️ گارانتی معتبر شرکتی</span>
                            </div>
                        </div>
                    </div>

                    <!-- Left: Product Key Information & CTA Actions -->
                    <div class="product-summary-side">
                        <?php if ($cat_name) : ?>
                            <span class="product-cat-label"><?php echo esc_html($cat_name); ?></span>
                        <?php endif; ?>

                        <h1 class="single-product-title"><?php the_title(); ?></h1>

                        <div class="product-meta-chips">
                            <?php if ($brand) : ?>
                                <div class="meta-chip">
                                    <span class="chip-label">برند:</span>
                                    <strong class="chip-val"><?php echo esc_html($brand); ?></strong>
                                </div>
                            <?php endif; ?>

                            <?php if ($model) : ?>
                                <div class="meta-chip">
                                    <span class="chip-label">مدل:</span>
                                    <strong class="chip-val"><?php echo esc_html($model); ?></strong>
                                </div>
                            <?php endif; ?>

                            <?php if ($code) : ?>
                                <div class="meta-chip">
                                    <span class="chip-label">کد کالا:</span>
                                    <strong class="chip-val"><?php echo esc_html($code); ?></strong>
                                </div>
                            <?php endif; ?>
                        </div>

                        <div class="product-short-desc">
                            <?php the_excerpt(); ?>
                        </div>

                        <!-- Price / Inquiry Box -->
                        <div class="product-inquiry-box">
                            <div class="price-notice-wrap">
                                <span class="price-badge">نحوه سفارش و قیمت:</span>
                                <span class="price-status-text">
                                    <?php echo $price ? esc_html($price) : 'استعلام قیمت بروز همکاری و پروژه‌ای'; ?>
                                </span>
                            </div>

                            <p class="inquiry-hint">
                                جهت دریافت پیش‌فاکتور رسمی، تخفیف همکاری و مشاوره در خصوص سازگاری تجهیزات، با ما در ارتباط باشید:
                            </p>

                            <div class="product-action-buttons">
                                <a href="<?php echo esc_url($whatsapp_url); ?>" target="_blank" rel="noopener noreferrer" class="btn-product-whatsapp">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                                    <span>استعلام قیمت در واتساپ</span>
                                </a>

                                <a href="#bumiya-consultation-modal" class="btn-product-modal open-consultation-modal" data-product="<?php echo esc_attr(get_the_title()); ?>" data-service="استعلام قیمت محصول">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                    <span>ثبت فرم استعلام قیمت</span>
                                </a>

                                <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9+]/', '', $contact_info['phone_main'])); ?>" class="btn-product-call" dir="ltr">
                                    📞 <?php echo esc_html($contact_info['phone_main']); ?>
                                </a>
                            </div>

                            <?php if ($catalog_url) : ?>
                                <div class="catalog-download-wrap">
                                    <a href="<?php echo esc_url($catalog_url); ?>" target="_blank" rel="noopener noreferrer" class="btn-download-pdf">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                        <span>دانلود کاتالوگ و دیتاشیت فنی (PDF)</span>
                                    </a>
                                </div>
                            <?php endif; ?>
                        </div>

                    </div>
                </div>

                <!-- 2. Bottom Section: Detailed Tabs / Specs Table -->
                <div class="product-tabs-section">
                    
                    <!-- Specifications Table -->
                    <?php if (!empty($specs_raw)) : ?>
                        <div class="tab-content-block">
                            <h3 class="block-title">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                                <span>جدول مشخصات فنی کالا</span>
                            </h3>
                            <div class="table-responsive">
                                <table class="bumiya-specs-table">
                                    <tbody>
                                        <?php
                                        $lines = explode("\n", trim($specs_raw));
                                        foreach ($lines as $line) {
                                            $line = trim($line);
                                            if (empty($line)) continue;
                                            $parts = explode(":", $line, 2);
                                            $key = isset($parts[0]) ? trim($parts[0]) : '';
                                            $val = isset($parts[1]) ? trim($parts[1]) : '';
                                            if ($key && $val) {
                                                echo '<tr>';
                                                echo '<th class="spec-name">' . esc_html($key) . '</th>';
                                                echo '<td class="spec-value">' . esc_html($val) . '</td>';
                                                echo '</tr>';
                                            } else {
                                                echo '<tr><td colspan="2" class="spec-value-full">' . esc_html($line) . '</td></tr>';
                                            }
                                        }
                                        ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    <?php endif; ?>

                    <!-- Detailed Description -->
                    <div class="tab-content-block">
                        <h3 class="block-title">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                            <span>معرفی تخصصی و بررسی محصول</span>
                        </h3>
                        <div class="product-full-content typography-rtl">
                            <?php the_content(); ?>
                        </div>
                    </div>

                    <!-- Features & Applications -->
                    <?php if (!empty($features_raw) || !empty($apps_raw) || !empty($adv_raw)) : ?>
                        <div class="product-highlights-grid">
                            <?php if (!empty($features_raw)) : ?>
                                <div class="highlight-column">
                                    <h4>⭐ ویژگی‌های کلیدی دستگاه</h4>
                                    <ul class="feature-bullets">
                                        <?php
                                        $flines = explode("\n", trim($features_raw));
                                        foreach ($flines as $fl) {
                                            $fl = trim($fl);
                                            if ($fl) echo '<li>' . esc_html($fl) . '</li>';
                                        }
                                        ?>
                                    </ul>
                                </div>
                            <?php endif; ?>

                            <?php if (!empty($apps_raw)) : ?>
                                <div class="highlight-column">
                                    <h4>🏢 محیط‌ها و کاربری‌های پیشنهادی</h4>
                                    <p class="column-desc"><?php echo nl2br(esc_html($apps_raw)); ?></p>
                                </div>
                            <?php endif; ?>

                            <?php if (!empty($adv_raw)) : ?>
                                <div class="highlight-column">
                                    <h4>🛡️ مزایای خرید از بومیا حفاظت گستر</h4>
                                    <p class="column-desc"><?php echo nl2br(esc_html($adv_raw)); ?></p>
                                </div>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>

                </div>

                <!-- 3. Related Products -->
                <?php
                $related_args = [
                    'post_type'      => 'product',
                    'posts_per_page' => 3,
                    'post__not_in'   => [$product_id],
                    'post_status'    => 'publish',
                ];
                if ($terms && !is_wp_error($terms)) {
                    $related_args['tax_query'] = [
                        [
                            'taxonomy' => 'product_category',
                            'field'    => 'term_id',
                            'terms'    => $terms[0]->term_id,
                        ],
                    ];
                }
                $related_query = new WP_Query($related_args);

                if ($related_query->have_posts()) :
                ?>
                    <div class="related-products-block">
                        <h3 class="related-title">محصولات و تجهیزات مرتبط</h3>
                        <div class="products-grid">
                            <?php
                            while ($related_query->have_posts()) : $related_query->the_post();
                                get_template_part('template-parts/product-card');
                            endwhile;
                            wp_reset_postdata();
                            ?>
                        </div>
                    </div>
                <?php endif; ?>

            </article>

        <?php endwhile; ?>
    </div>

</main>

<?php
get_footer();
