<?php
/**
 * Product Archive Template for Bumiya Hefazat Gostar
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

$categories = get_terms([
    'taxonomy'   => 'product_category',
    'hide_empty' => false,
]);
?>

<main id="primary" class="site-main product-archive-main">

    <!-- Breadcrumbs -->
    <?php bumiya_breadcrumbs(); ?>

    <!-- Archive Hero Banner -->
    <section class="archive-header-banner">
        <div class="bumiya-container">
            <h1 class="archive-title">کاتالوگ محصولات و تجهیزات حفاظتی</h1>
            <p class="archive-desc">
                تأمین و توزیع انواع دوربین‌های مداربسته تحت شبکه و آنالوگ، دستگاه‌های رکوردر NVR و DVR، هارد دیسک‌های نظارتی و تجهیزات پسیو شبکه با ضمانت اصالت فیزیکی و گارانتی طلایی بومیا حفاظت گستر.
            </p>
        </div>
    </section>

    <div class="bumiya-container">
        <!-- Filter & Search Bar -->
        <div class="catalog-filter-bar">
            <!-- Categories Filter Tabs -->
            <div class="category-tabs-scroll">
                <a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>" class="cat-filter-btn <?php echo (!is_tax('product_category') && empty($_GET['cat'])) ? 'active' : ''; ?>">
                    همه محصولات
                </a>
                <?php if (!empty($categories) && !is_wp_error($categories)) : ?>
                    <?php foreach ($categories as $cat) : ?>
                        <a href="<?php echo esc_url(get_term_link($cat)); ?>" class="cat-filter-btn <?php echo (is_tax('product_category', $cat->term_id)) ? 'active' : ''; ?>">
                            <?php echo esc_html($cat->name); ?>
                            <span class="count-badge">(<?php echo esc_html($cat->count); ?>)</span>
                        </a>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>

            <!-- In-archive Search -->
            <div class="archive-quick-search">
                <form role="search" method="get" class="search-form-inline" action="<?php echo esc_url(home_url('/')); ?>">
                    <input type="hidden" name="post_type" value="product">
                    <input type="search" class="search-field-mini" placeholder="جستجوی مدل یا برند..." value="<?php echo get_search_query(); ?>" name="s">
                    <button type="submit" class="btn-search-mini" aria-label="جستجو">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    </button>
                </form>
            </div>
        </div>

        <!-- Products Grid -->
        <div class="products-grid">
            <?php if (have_posts()) : ?>
                <?php while (have_posts()) : the_post(); ?>
                    <?php get_template_part('template-parts/product-card'); ?>
                <?php endwhile; ?>
            <?php else : ?>
                <div class="no-products-found">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <h3>محصولی در این دسته‌بندی یافت نشد</h3>
                    <p>جهت استعلام موجودی تجهیزات خاص می‌توانید مستقیماً با کارشناسان بومیا حفاظت گستر تماس حاصل فرمایید.</p>
                    <a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>" class="btn-primary-hero">مشاهده تمامی محصولات</a>
                </div>
            <?php endif; ?>
        </div>

        <!-- Pagination -->
        <?php bumiya_pagination(); ?>
    </div>

</main>

<?php
get_footer();
