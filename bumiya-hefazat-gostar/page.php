<?php
/**
 * The template for displaying all pages
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main default-page-main">

    <!-- Breadcrumbs -->
    <?php bumiya_breadcrumbs(); ?>

    <div class="bumiya-container">
        <?php while (have_posts()) : the_post(); ?>

            <article id="post-<?php the_ID(); ?>" <?php post_class('page-content-card'); ?>>
                
                <header class="page-header">
                    <h1 class="page-title"><?php the_title(); ?></h1>
                </header>

                <?php if (has_post_thumbnail()) : ?>
                    <div class="page-featured-image">
                        <?php the_post_thumbnail('bumiya-large'); ?>
                    </div>
                <?php endif; ?>

                <div class="page-body-content typography-rtl">
                    <?php
                    the_content();

                    wp_link_pages([
                        'before' => '<div class="page-links">' . esc_html__('صفحات:', 'bumiya-hefazat'),
                        'after'  => '</div>',
                    ]);
                    ?>
                </div>

            </article>

        <?php endwhile; ?>
    </div>

</main>

<?php
get_footer();
