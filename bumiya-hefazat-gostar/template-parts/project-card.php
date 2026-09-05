<?php
/**
 * Project Card Template Part
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

$project_id = get_the_ID();
$location   = get_post_meta($project_id, '_bumiya_project_location', true);
$client     = get_post_meta($project_id, '_bumiya_project_client', true);
$date       = get_post_meta($project_id, '_bumiya_project_date', true);

$terms = get_the_terms($project_id, 'project_category');
$cat_name = ($terms && !is_wp_error($terms)) ? $terms[0]->name : '';
?>

<article id="project-<?php the_ID(); ?>" <?php post_class('bumiya-project-card'); ?>>
    <div class="project-inner">
        <div class="project-image-wrap">
            <a href="<?php the_permalink(); ?>">
                <?php if (has_post_thumbnail()) : ?>
                    <?php the_post_thumbnail('bumiya-card', ['class' => 'project-img', 'alt' => get_the_title(), 'loading' => 'lazy']); ?>
                <?php else : ?>
                    <div class="image-placeholder">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        <span>پروژه امنیتی بومیا</span>
                    </div>
                <?php endif; ?>
            </a>
            <?php if ($cat_name) : ?>
                <span class="project-cat-pill"><?php echo esc_html($cat_name); ?></span>
            <?php endif; ?>
        </div>

        <div class="project-body">
            <?php if ($location || $date) : ?>
                <div class="project-meta-row">
                    <?php if ($location) : ?>
                        <span class="location">📍 <?php echo esc_html($location); ?></span>
                    <?php endif; ?>
                    <?php if ($date) : ?>
                        <span class="date">📅 <?php echo esc_html($date); ?></span>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <h3 class="project-title">
                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
            </h3>

            <div class="project-excerpt">
                <?php echo wp_trim_words(get_the_excerpt() ?: get_the_content(), 16, '...'); ?>
            </div>

            <div class="project-footer">
                <a href="<?php the_permalink(); ?>" class="btn-project-view">
                    مشاهده جزئیات پروژه &larr;
                </a>
            </div>
        </div>
    </div>
</article>
