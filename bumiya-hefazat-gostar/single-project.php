<?php
/**
 * Single Project Template for Bumiya Hefazat Gostar
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

$project_id = get_the_ID();
$location   = get_post_meta($project_id, '_bumiya_project_location', true);
$client     = get_post_meta($project_id, '_bumiya_project_client', true);
$date       = get_post_meta($project_id, '_bumiya_project_date', true);
$equipment  = get_post_meta($project_id, '_bumiya_project_equipment', true);
$services   = get_post_meta($project_id, '_bumiya_project_services', true);
$results    = get_post_meta($project_id, '_bumiya_project_results', true);

$terms = get_the_terms($project_id, 'project_category');
$cat_name = ($terms && !is_wp_error($terms)) ? $terms[0]->name : '';

$whatsapp_url = bumiya_get_whatsapp_link('سلام، درباره پروژه «' . get_the_title() . '» سوال داشتم و می‌خواهم برای پروژه مشابه مشاوره بگیرم.');
?>

<main id="primary" class="site-main project-single-main">

    <!-- Breadcrumbs -->
    <?php bumiya_breadcrumbs(); ?>

    <div class="bumiya-container">
        <?php while (have_posts()) : the_post(); ?>

            <article id="project-<?php the_ID(); ?>" <?php post_class('project-detail-container'); ?>>
                
                <!-- Project Header -->
                <div class="project-header-box">
                    <?php if ($cat_name) : ?>
                        <span class="project-tag-pill"><?php echo esc_html($cat_name); ?></span>
                    <?php endif; ?>

                    <h1 class="single-project-title"><?php the_title(); ?></h1>

                    <div class="project-meta-chips-bar">
                        <?php if ($location) : ?>
                            <div class="meta-chip-item">
                                <span class="icon">📍</span>
                                <span class="label">محل اجرا:</span>
                                <strong><?php echo esc_html($location); ?></strong>
                            </div>
                        <?php endif; ?>

                        <?php if ($client) : ?>
                            <div class="meta-chip-item">
                                <span class="icon">🏢</span>
                                <span class="label">کارفرما:</span>
                                <strong><?php echo esc_html($client); ?></strong>
                            </div>
                        <?php endif; ?>

                        <?php if ($date) : ?>
                            <div class="meta-chip-item">
                                <span class="icon">📅</span>
                                <span class="label">تاریخ اجرا:</span>
                                <strong><?php echo esc_html($date); ?></strong>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>

                <!-- Featured Image Showcase -->
                <div class="project-featured-image-wrap">
                    <?php if (has_post_thumbnail()) : ?>
                        <?php the_post_thumbnail('bumiya-large', ['class' => 'project-hero-img', 'alt' => get_the_title()]); ?>
                    <?php else : ?>
                        <div class="project-image-placeholder-hero">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            <span>پروژه امنیتی و نظارتی بومیا حفاظت گستر</span>
                        </div>
                    <?php endif; ?>
                </div>

                <!-- Project Content & Information Grid -->
                <div class="project-body-grid">
                    <!-- Right: Main Description -->
                    <div class="project-main-content">
                        <h3 class="block-title">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                            <span>شرح پروژه و نیازمندی‌های کارفرما</span>
                        </h3>
                        <div class="project-text-body typography-rtl">
                            <?php the_content(); ?>
                        </div>

                        <?php if (!empty($results)) : ?>
                            <div class="project-results-card">
                                <h4>🎯 نتایج و دستاوردهای اجرای پروژه</h4>
                                <p><?php echo nl2br(esc_html($results)); ?></p>
                            </div>
                        <?php endif; ?>
                    </div>

                    <!-- Left: Equipment & Services Specs -->
                    <div class="project-sidebar-specs">
                        
                        <?php if (!empty($equipment)) : ?>
                            <div class="project-spec-box">
                                <h4 class="spec-box-title">📹 تجهیزات نظارتی استفاده‌شده</h4>
                                <ul class="spec-items-list">
                                    <?php
                                    $eq_lines = explode("\n", trim($equipment));
                                    foreach ($eq_lines as $eq) {
                                        $eq = trim($eq);
                                        if ($eq) echo '<li>' . esc_html($eq) . '</li>';
                                    }
                                    ?>
                                </ul>
                            </div>
                        <?php endif; ?>

                        <?php if (!empty($services)) : ?>
                            <div class="project-spec-box">
                                <h4 class="spec-box-title">🛠️ اقدامات و خدمات انجام‌شده</h4>
                                <ul class="spec-items-list">
                                    <?php
                                    $srv_lines = explode("\n", trim($services));
                                    foreach ($srv_lines as $srv) {
                                        $srv = trim($srv);
                                        if ($srv) echo '<li>' . esc_html($srv) . '</li>';
                                    }
                                    ?>
                                </ul>
                            </div>
                        <?php endif; ?>

                        <!-- Project CTA Box -->
                        <div class="project-cta-card">
                            <h4>طراحی و اجرای پروژه مشابه</h4>
                            <p>جهت دریافت مشاوره مهندسی و برآورد متراژ و هزینه پروژه خود با کارشناسان ما گفتگو کنید:</p>
                            <a href="#bumiya-consultation-modal" class="btn-project-cta open-consultation-modal" data-service="مشاوره پروژه">
                                درخواست بازدید و کارشناسی
                            </a>
                            <a href="<?php echo esc_url($whatsapp_url); ?>" target="_blank" rel="noopener noreferrer" class="btn-project-wa">
                                گفتگو در واتساپ
                            </a>
                        </div>

                    </div>
                </div>

            </article>

        <?php endwhile; ?>
    </div>

</main>

<?php
get_footer();
