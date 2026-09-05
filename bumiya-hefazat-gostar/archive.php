<?php
/**
 * The template for displaying archive pages
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main default-archive-main">

    <!-- Breadcrumbs -->
    <?php bumiya_breadcrumbs(); ?>

    <section class="archive-header-banner">
        <div class="bumiya-container">
            <?php the_archive_title('<h1 class="archive-title">', '</h1>'); ?>
            <?php the_archive_description('<div class="archive-desc">', '</div>'); ?>
        </div>
    </section>

    <div class="bumiya-container">
        <div class="posts-archive-grid">
            <?php if (have_posts()) : ?>
                <?php while (have_posts()) : the_post(); ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class('blog-post-card'); ?>>
                        <?php if (has_post_thumbnail()) : ?>
                            <div class="post-card-thumb">
                                <a href="<?php the_permalink(); ?>">
                                    <?php the_post_thumbnail('bumiya-card'); ?>
                                </a>
                            </div>
                        <?php endif; ?>

                        <div class="post-card-body">
                            <div class="post-meta">
                                <span>📅 <?php echo get_the_date(); ?></span>
                            </div>
                            <h2 class="post-card-title">
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </h2>
                            <div class="post-excerpt">
                                <?php the_excerpt(); ?>
                            </div>
                            <a href="<?php the_permalink(); ?>" class="post-read-more">
                                ادامه مطلب &larr;
                            </a>
                        </div>
                    </article>
                <?php endwhile; ?>
            <?php else : ?>
                <div class="no-posts-found">
                    <p>مطلبی جهت نمایش یافت نشد.</p>
                </div>
            <?php endif; ?>
        </div>

        <?php bumiya_pagination(); ?>
    </div>

</main>

<?php
get_footer();
