<?php
/**
 * Projects Archive Template for Bumiya Hefazat Gostar
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

$categories = get_terms([
    'taxonomy'   => 'project_category',
    'hide_empty' => false,
]);
?>

<main id="primary" class="site-main project-archive-main">

    <!-- Breadcrumbs -->
    <?php bumiya_breadcrumbs(); ?>

    <!-- Banner -->
    <section class="archive-header-banner">
        <div class="bumiya-container">
            <h1 class="archive-title">سوابق و پروژه‌های اجرایی بومیا حفاظت گستر</h1>
            <p class="archive-desc">
                نگاهی به گوشه‌ای از صدها پروژه موفق تجهیز، راه‌اندازی و مانیتورینگ دوربین‌های مداربسته و سیستم‌های حفاظت فیزیکی در سراسر کشور.
            </p>
        </div>
    </section>

    <div class="bumiya-container">
        <!-- Filter Bar -->
        <div class="catalog-filter-bar">
            <div class="category-tabs-scroll">
                <a href="<?php echo esc_url(get_post_type_archive_link('project')); ?>" class="cat-filter-btn <?php echo (!is_tax('project_category')) ? 'active' : ''; ?>">
                    همه کاربری‌ها
                </a>
                <?php if (!empty($categories) && !is_wp_error($categories)) : ?>
                    <?php foreach ($categories as $cat) : ?>
                        <a href="<?php echo esc_url(get_term_link($cat)); ?>" class="cat-filter-btn <?php echo (is_tax('project_category', $cat->term_id)) ? 'active' : ''; ?>">
                            <?php echo esc_html($cat->name); ?>
                            <span class="count-badge">(<?php echo esc_html($cat->count); ?>)</span>
                        </a>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </div>

        <!-- Projects Grid -->
        <div class="projects-grid">
            <?php if (have_posts()) : ?>
                <?php while (have_posts()) : the_post(); ?>
                    <?php get_template_part('template-parts/project-card'); ?>
                <?php endwhile; ?>
            <?php else : ?>
                <div class="no-projects-found">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <h3>پروژه‌ای جهت نمایش یافت نشد</h3>
                    <p>پروژه‌های جدید به زودی در این بخش اضافه خواهند شد.</p>
                </div>
            <?php endif; ?>
        </div>

        <!-- Pagination -->
        <?php bumiya_pagination(); ?>
    </div>

</main>

<?php
get_footer();
