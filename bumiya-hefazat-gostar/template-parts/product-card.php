<?php
/**
 * Product Card Template Part
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

$product_id = get_the_ID();
$brand      = get_post_meta($product_id, '_bumiya_product_brand', true);
$model      = get_post_meta($product_id, '_bumiya_product_model', true);
$code       = get_post_meta($product_id, '_bumiya_product_code', true);
$stock      = get_post_meta($product_id, '_bumiya_product_stock', true) ?: 'in_stock';
$price      = get_post_meta($product_id, '_bumiya_product_price', true);

$terms = get_the_terms($product_id, 'product_category');
$cat_name = ($terms && !is_wp_error($terms)) ? $terms[0]->name : '';

$whatsapp_msg = sprintf('سلام، برای استعلام قیمت و موجودی محصول «%s» مدل (%s) پیام می‌دهم.', get_the_title(), $model ?: $code);
$whatsapp_url = bumiya_get_whatsapp_link($whatsapp_msg);
?>

<article id="product-<?php the_ID(); ?>" <?php post_class('bumiya-product-card'); ?>>
    <div class="card-inner">
        <!-- Thumbnail & Badge -->
        <div class="card-image-wrap">
            <a href="<?php the_permalink(); ?>" class="image-link" aria-label="<?php the_title_attribute(); ?>">
                <?php if (has_post_thumbnail()) : ?>
                    <?php the_post_thumbnail('bumiya-card', ['class' => 'product-img', 'alt' => get_the_title(), 'loading' => 'lazy']); ?>
                <?php else : ?>
                    <div class="image-placeholder">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                        <span>بومیا حفاظت گستر</span>
                    </div>
                <?php endif; ?>
            </a>

            <?php if ($stock === 'in_stock') : ?>
                <span class="stock-badge in-stock">موجود در انبار</span>
            <?php elseif ($stock === 'call_for_stock') : ?>
                <span class="stock-badge call-stock">استعلام سفارش</span>
            <?php else : ?>
                <span class="stock-badge out-stock">ناموجود</span>
            <?php endif; ?>

            <?php if ($cat_name) : ?>
                <span class="cat-pill"><?php echo esc_html($cat_name); ?></span>
            <?php endif; ?>
        </div>

        <!-- Content -->
        <div class="card-body">
            <div class="meta-row">
                <?php if ($brand) : ?>
                    <span class="brand-tag"><?php echo esc_html($brand); ?></span>
                <?php endif; ?>
                <?php if ($model) : ?>
                    <span class="model-code"><?php echo esc_html($model); ?></span>
                <?php endif; ?>
            </div>

            <h3 class="product-title">
                <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
                    <?php the_title(); ?>
                </a>
            </h3>

            <div class="product-excerpt">
                <?php echo wp_trim_words(get_the_excerpt() ?: get_the_content(), 15, '...'); ?>
            </div>

            <!-- Footer Actions -->
            <div class="card-actions">
                <a href="<?php the_permalink(); ?>" class="btn-view">
                    مشاهده مشخصات
                </a>
                <a href="<?php echo esc_url($whatsapp_url); ?>" target="_blank" rel="noopener noreferrer" class="btn-inquire">
                    <span>استعلام قیمت</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </a>
            </div>
        </div>
    </div>
</article>
