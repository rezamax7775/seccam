<?php
/**
 * The template for displaying all single posts
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main single-post-main">

    <!-- Breadcrumbs -->
    <?php bumiya_breadcrumbs(); ?>

    <div class="bumiya-container">
        <div class="single-post-grid">
            <div class="single-post-content-wrap">
                <?php while (have_posts()) : the_post(); ?>

                    <article id="post-<?php the_ID(); ?>" <?php post_class('single-post-article'); ?>>
                        
                        <header class="entry-header">
                            <h1 class="entry-title"><?php the_title(); ?></h1>
                            <div class="entry-meta-row">
                                <span class="meta-date">📅 <?php echo get_the_date(); ?></span>
                                <span class="meta-author">✍️ <?php the_author(); ?></span>
                                <span class="meta-cats">📁 <?php the_category('، '); ?></span>
                            </div>
                        </header>

                        <?php if (has_post_thumbnail()) : ?>
                            <div class="entry-thumbnail">
                                <?php the_post_thumbnail('bumiya-large'); ?>
                            </div>
                        <?php endif; ?>

                        <div class="entry-content typography-rtl">
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

            <!-- Sidebar -->
            <aside class="single-post-sidebar">
                <?php if (is_active_sidebar('sidebar-main')) : ?>
                    <?php dynamic_sidebar('sidebar-main'); ?>
                <?php else : ?>
                    <div class="widget-box widget-contact-promo">
                        <h3>نیاز به مشاوره امنیتی دارید؟</h3>
                        <p>کارشناسان بومیا حفاظت گستر آماده راهنمایی شما در انتخاب مناسب‌ترین سیستم نظارتی هستند.</p>
                        <a href="#bumiya-consultation-modal" class="btn-primary-hero open-consultation-modal" style="display:block; text-align:center; margin-top:15px;">درخواست مشاوره رایگان</a>
                    </div>
                <?php endif; ?>
            </aside>
        </div>
    </div>

</main>

<?php
get_footer();
