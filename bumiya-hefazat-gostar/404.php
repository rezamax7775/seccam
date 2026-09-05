<?php
/**
 * 404 Error Page Template for Bumiya Hefazat Gostar
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main error-404-main">

    <?php bumiya_breadcrumbs(); ?>

    <div class="bumiya-container">
        <div class="error-404-card">
            <div class="error-visual">
                <span class="error-code">۴۰۴</span>
                <div class="camera-lens-graphic">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/></svg>
                </div>
            </div>

            <h1 class="error-title">صفحه مورد نظر پیدا نشد!</h1>
            <p class="error-text">
                آدرسی که وارد کرده‌اید تغییر یافته، حذف شده یا موقتاً در دسترس نیست. می‌توانید از جستجوی زیر استفاده کنید یا به صفحه اصلی بازگردید.
            </p>

            <!-- Search Form -->
            <div class="error-search-wrap">
                <form role="search" method="get" class="search-form-full" action="<?php echo esc_url(home_url('/')); ?>">
                    <input type="search" class="search-input-big" placeholder="جستجوی محصول یا خدمت..." name="s" required />
                    <button type="submit" class="btn-search-big">
                        <span>جستجو</span>
                    </button>
                </form>
            </div>

            <div class="error-actions-btns">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="btn-primary-hero">
                    <span>بازگشت به صفحه اصلی</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <a href="<?php echo esc_url(get_post_type_archive_link('product')); ?>" class="btn-secondary-hero">
                    <span>مشاهده محصولات</span>
                </a>
            </div>
        </div>
    </div>

</main>

<?php
get_footer();
