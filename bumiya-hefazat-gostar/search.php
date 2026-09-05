<?php
/**
 * Search Results Template for Bumiya Hefazat Gostar
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main search-results-main">

    <!-- Breadcrumbs -->
    <?php bumiya_breadcrumbs(); ?>

    <!-- Search Header Banner -->
    <section class="archive-header-banner">
        <div class="bumiya-container">
            <span class="category-eyebrow">نتایج جستجو در سامانه بومیا:</span>
            <h1 class="archive-title">«<?php echo esc_html(get_search_query()); ?>»</h1>
            <p class="archive-desc">
                نمایش نتایج منطبق بر کلیدواژه جستجوشده در محصولات، پروژه‌ها و صفحات سایت
            </p>
        </div>
    </section>

    <div class="bumiya-container">
        <!-- Re-search bar -->
        <div class="search-page-bar">
            <form role="search" method="get" class="search-form-full" action="<?php echo esc_url(home_url('/')); ?>">
                <input type="search" class="search-input-big" placeholder="جستجوی مجدد در محصولات و مطالب..." value="<?php echo get_search_query(); ?>" name="s" required />
                <button type="submit" class="btn-search-big">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <span>جستجو</span>
                </button>
            </form>
        </div>

        <?php if (have_posts()) : ?>
            <div class="search-results-list">
                <?php while (have_posts()) : the_post(); ?>
                    <?php
                    $post_type = get_post_type();
                    $type_label = 'محتوا';
                    if ($post_type === 'product') {
                        $type_label = 'محصول حفاظتی';
                    } elseif ($post_type === 'project') {
                        $type_label = 'پروژه اجرایی';
                    } elseif ($post_type === 'page') {
                        $type_label = 'برگه سازمانی';
                    }
                    ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class('search-result-item'); ?>>
                        <div class="search-item-type">
                            <span class="type-badge type-<?php echo esc_attr($post_type); ?>"><?php echo esc_html($type_label); ?></span>
                        </div>
                        <div class="search-item-content">
                            <h2 class="search-item-title">
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </h2>
                            <div class="search-item-excerpt">
                                <?php the_excerpt(); ?>
                            </div>
                            <div class="search-item-meta">
                                <a href="<?php the_permalink(); ?>" class="search-item-link">
                                    مشاهده صفحه &larr;
                                </a>
                            </div>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>

            <!-- Pagination -->
            <?php bumiya_pagination(); ?>

        <?php else : ?>
            <div class="no-results-card">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                <h3>نتیجه‌ای برای «<?php echo esc_html(get_search_query()); ?>» یافت نشد.</h3>
                <p>پیشنهاد می‌کنیم از کلمات کلیدی عام‌تر استفاده کنید یا از بخش‌های زیر دیدن فرمایید:</p>
                <div class="quick-links-suggestions">
                    <a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>" class="btn-primary-hero">کاتالوگ محصولات</a>
                    <a href="<?php echo esc_url(get_post_type_archive_link('project')); ?>" class="btn-secondary-hero">پروژه‌های اجرایی</a>
                    <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="btn-outline-action">تماس با کارشناسان</a>
                </div>
            </div>
        <?php endif; ?>
    </div>

</main>

<?php
get_footer();
