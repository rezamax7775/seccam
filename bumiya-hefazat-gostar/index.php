<?php
/**
 * The main template file
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main">
    <?php bumiya_breadcrumbs(); ?>

    <div class="bumiya-container">
        <div class="posts-archive-grid" style="margin-top: 40px;">
            <?php
            if (have_posts()) :
                while (have_posts()) : the_post();
                    ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class('blog-post-card'); ?>>
                        <div class="post-card-body">
                            <h2 class="post-card-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                            <div class="post-excerpt"><?php the_excerpt(); ?></div>
                        </div>
                    </article>
                    <?php
                endwhile;
                bumiya_pagination();
            else :
                echo '<p>محتوایی یافت نشد.</p>';
            endif;
            ?>
        </div>
    </div>
</main>

<?php
get_footer();
