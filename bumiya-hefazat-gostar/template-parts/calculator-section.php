<?php
/**
 * Interactive Project Calculator Section (On Front Page)
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<section class="bumiya-calculator-section" id="calculator-section">
    <div class="bumiya-container">
        <div class="calculator-section-card">
            <div class="calc-section-header">
                <div class="section-badge-wrap">
                    <span class="section-badge">ابزار آنلاین مهندسی</span>
                </div>
                <h2 class="calc-section-title">محاسبه‌گر آنلاین پروژه دوربین مداربسته و سیستم‌های حفاظتی</h2>
                <p class="calc-section-desc">
                    تعداد دوربین‌ها، کیفیت تصویر و مدت زمان ضبط دلخواه خود را مشخص کنید تا سامانه هوشمند بومیا، مشخصات هارد دیسک، رکوردر NVR و تجهیزات مورد نیاز شما را در چند ثانیه محاسبه نماید.
                </p>
            </div>

            <div class="calc-section-inner">
                <div class="calc-front-grid">
                    <!-- Left: Quick Selectors -->
                    <div class="calc-front-controls">
                        <div class="calc-control-box">
                            <div class="control-head">
                                <label for="front-calc-camera-range">📹 تعداد دوربین‌های مورد نیاز:</label>
                                <span class="control-badge" id="front-calc-cam-display">۴ دوربین</span>
                            </div>
                            <input type="range" id="front-calc-camera-range" min="1" max="32" value="4" class="calc-range-slider">
                            <div class="range-labels">
                                <span>۱</span>
                                <span>۴</span>
                                <span>۸</span>
                                <span>۱۶</span>
                                <span>۲۴</span>
                                <span>۳۲+</span>
                            </div>
                        </div>

                        <div class="calc-control-box">
                            <label>🔍 رزولوشن و کیفیت تصویر:</label>
                            <div class="front-res-pills" id="front-calc-res-group">
                                <button type="button" class="res-pill" data-res="2">2MP Full HD</button>
                                <button type="button" class="res-pill active" data-res="4">4MP 2K QHD (پیشنهادی)</button>
                                <button type="button" class="res-pill" data-res="8">8MP 4K Ultra</button>
                            </div>
                        </div>

                        <div class="calc-control-box">
                            <div class="control-head">
                                <label for="front-calc-days-range">📅 مدت زمان نگهداری فیلم‌ها در هارد:</label>
                                <span class="control-badge" id="front-calc-days-display">۳۰ روز</span>
                            </div>
                            <input type="range" id="front-calc-days-range" min="7" max="90" value="30" class="calc-range-slider">
                            <div class="range-labels">
                                <span>۷ روز</span>
                                <span>۱۵ روز</span>
                                <span>۳۰ روز</span>
                                <span>۶۰ روز</span>
                                <span>۹۰ روز</span>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Results Card -->
                    <div class="calc-front-result-card">
                        <div class="res-card-head">
                            <span class="res-tag">نتیجه برآورد تخصصی</span>
                            <span class="res-tech">کدک فشرده‌سازی: H.265+</span>
                        </div>

                        <div class="res-items-list">
                            <div class="res-item">
                                <span class="res-icon">💾</span>
                                <div class="res-info">
                                    <div class="res-label">حجم هارددیسک نظارتی:</div>
                                    <div class="res-value" id="front-res-storage">۴ ترابایت (4TB Purple)</div>
                                </div>
                            </div>

                            <div class="res-item">
                                <span class="res-icon">🎛️</span>
                                <div class="res-info">
                                    <div class="res-label">دستگاه رکوردر پیشنهادی:</div>
                                    <div class="res-value" id="front-res-nvr">دستگاه ۸ کانال 4K NVR</div>
                                </div>
                            </div>

                            <div class="res-item">
                                <span class="res-icon">🔌</span>
                                <div class="res-info">
                                    <div class="res-label">تجهیزات سوئیچ شبکه:</div>
                                    <div class="res-value" id="front-res-poe">سوئیچ PoE هشت پورت صنعتی</div>
                                </div>
                            </div>

                            <div class="res-item">
                                <span class="res-icon">🧵</span>
                                <div class="res-info">
                                    <div class="res-label">تخمین متراژ کابل:</div>
                                    <div class="res-value" id="front-res-cable">حدود ۱۲۰ متر کابل Cat6 SFTP</div>
                                </div>
                            </div>
                        </div>

                        <div class="res-price-estimate">
                            <span>برآورد حدودی هزینه:</span>
                            <strong id="front-res-price">۱۸ تا ۲۴ میلیون تومان</strong>
                        </div>

                        <div class="res-cta-buttons">
                            <button type="button" class="btn-front-calc-modal open-calculator-modal">
                                <span>مشاهده جزئیات کامل و محاسبه پیشرفته</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </button>
                            <button type="button" class="btn-front-calc-quote" id="btn-front-apply-to-form">
                                <span>ارسال این برآورد به کارشناس بومیا</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
