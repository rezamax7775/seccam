<?php
/**
 * Taxonomy Project Category Template
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

$current_term = get_queried_object();
$categories = get_terms([
    'taxonomy'   => 'project_category',
    'hide_empty' => false,
]);
?>

<main id="primary" class="site-main project-archive-main">

    <!-- Breadcrumbs -->
    <?php bumiya_breadcrumbs(); ?>

    <section class="archive-header-banner">
        <div class="bumiya-container">
            <span class="category-eyebrow">دسته‌بندی پروژه‌ها:</span>
            <h1 class="archive-title"><?php single_term_title(); ?></h1>
            <?php if (!empty($current_term->description)) : ?>
                <p class="archive-desc"><?php echo esc_html($current_term->description); ?></p>
            <?php endif; ?>
        </div>
    </section>

    <div class="bumiya-container">
        <div class="catalog-filter-bar">
            <div class="category-tabs-scroll">
                <a href="<?php echo esc_url(get_post_type_archive_link('project')); ?>" class="cat-filter-btn">
                    همه کاربری‌ها
                </a>
                <?php if (!empty($categories) && !is_wp_error($categories)) : ?>
                    <?php foreach ($categories as $cat) : ?>
                        <a href="<?php echo esc_url(get_term_link($cat)); ?>" class="cat-filter-btn <?php echo ($current_term->term_id === $cat->term_id) ? 'active' : ''; ?>">
                            <?php echo esc_html($cat->name); ?>
                            <span class="count-badge">(<?php echo esc_html($cat->count); ?>)</span>
                        </a>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </div>

        <div class="projects-grid">
            <?php if (have_posts()) : ?>
                <?php while (have_posts()) : the_post(); ?>
                    <?php get_template_part('template-parts/project-card'); ?>
                <?php endwhile; ?>
            <?php else : ?>
                <div class="no-projects-found">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <h3>پروژه‌ای در این دسته کاربری یافت نشد</h3>
                    <a href="<?php echo esc_url(get_post_type_archive_link('project')); ?>" class="btn-primary-hero">مشاهده همه پروژه‌ها</a>
                </div>
            <?php endif; ?>
        </div>

        <?php bumiya_pagination(); ?>
    </div>

</main>

<?php
get_footer();
