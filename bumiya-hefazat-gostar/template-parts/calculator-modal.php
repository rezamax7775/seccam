<?php
/**
 * Smart Project Calculator Modal for Bumiya Hefazat Gostar Theme
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<!-- Project Quote & Storage Calculator Modal -->
<div id="bumiya-calculator-modal" class="bumiya-modal-overlay calc-modal-overlay" aria-hidden="true">
    <div class="bumiya-modal-dialog calc-modal-dialog">
        <div class="calc-modal-header">
            <div class="calc-header-title">
                <div class="calc-badge-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="16" y1="18" x2="16" y2="18.01"/><line x1="12" y1="18" x2="12" y2="18.01"/><line x1="8" y1="18" x2="8" y2="18.01"/></svg>
                </div>
                <div>
                    <h3 class="calc-title">محاسبه‌گر مهندسی و تخمین هوشمند پروژه مداربسته</h3>
                    <p class="calc-subtitle">محاسبه آنلاین حجم هارد دیسک، رکوردر NVR، سوئیچ PoE و متراژ کابل بر اساس استانداردهای H.265+</p>
                </div>
            </div>
            <button type="button" class="modal-close-btn calc-close-btn" id="calc-modal-close" aria-label="بستن پنجره">&times;</button>
        </div>

        <div class="calc-modal-body">
            <div class="calc-layout-grid">
                <!-- Controls Column -->
                <div class="calc-controls-col">
                    <!-- Control 1: Camera Count -->
                    <div class="calc-control-group">
                        <div class="control-label-row">
                            <label for="calc-camera-count" class="calc-label">
                                <span class="label-icon">📹</span>
                                تعداد دوربین‌های مداربسته
                            </label>
                            <span class="calc-value-badge" id="calc-camera-val">۴ عدد</span>
                        </div>
                        <input type="range" id="calc-camera-count" class="calc-slider" min="1" max="32" value="4" step="1">
                        <div class="slider-ticks">
                            <span>۱</span>
                            <span>۴</span>
                            <span>۸</span>
                            <span>۱۶</span>
                            <span>۲۴</span>
                            <span>۳۲</span>
                        </div>
                    </div>

                    <!-- Control 2: Resolution -->
                    <div class="calc-control-group">
                        <label class="calc-label">
                            <span class="label-icon">🔍</span>
                            کیفیت و رزولوشن سنسور تصویر
                        </label>
                        <div class="calc-chips-grid" id="calc-resolution-chips">
                            <button type="button" class="calc-chip" data-res="2" data-mbps="2.5">
                                <span class="chip-title">2MP Full HD</span>
                                <span class="chip-desc">اقتصادی و عمومی</span>
                            </button>
                            <button type="button" class="calc-chip active" data-res="4" data-mbps="4.5">
                                <span class="chip-title">4MP 2K QHD</span>
                                <span class="chip-desc">پیشنهاد بومیا (استاندارد)</span>
                            </button>
                            <button type="button" class="calc-chip" data-res="8" data-mbps="8.0">
                                <span class="chip-title">8MP 4K Ultra</span>
                                <span class="chip-desc">صنعتی، پلاک‌خوان و زوم بالا</span>
                            </button>
                        </div>
                    </div>

                    <!-- Control 3: Night Vision -->
                    <div class="calc-control-group">
                        <label class="calc-label">
                            <span class="label-icon">🌙</span>
                            فناوری دید در شب
                        </label>
                        <div class="calc-chips-grid" id="calc-night-chips">
                            <button type="button" class="calc-chip active" data-night="ir">
                                <span class="chip-title">مادون قرمز هوشمند (Smart IR)</span>
                                <span class="chip-desc">تصویر سیاه و سفید در تاریکی مطلق</span>
                            </button>
                            <button type="button" class="calc-chip" data-night="colorvu">
                                <span class="chip-title">دید در شب تمام رنگی (ColorVu / Starlight)</span>
                                <span class="chip-desc">تصویر رنگی شفاف ۲۴ ساعته با نور گرم</span>
                            </button>
                        </div>
                    </div>

                    <!-- Control 4: Recording Days -->
                    <div class="calc-control-group">
                        <div class="control-label-row">
                            <label for="calc-days-count" class="calc-label">
                                <span class="label-icon">📅</span>
                                مدت زمان ذخیره‌سازی آرشیو ویدیو
                            </label>
                            <span class="calc-value-badge" id="calc-days-val">۳۰ روز</span>
                        </div>
                        <input type="range" id="calc-days-count" class="calc-slider" min="7" max="90" value="30" step="1">
                        <div class="slider-ticks">
                            <span>۷ روز</span>
                            <span>۱۵ روز</span>
                            <span>۳۰ روز</span>
                            <span>۶۰ روز</span>
                            <span>۹۰ روز</span>
                        </div>
                    </div>
                </div>

                <!-- Results Output Column -->
                <div class="calc-results-col">
                    <div class="calc-summary-card">
                        <div class="summary-header">
                            <span class="summary-badge">⚡ برآورد فنی هوشمند</span>
                            <span class="summary-codec">کدک فشرده‌سازی: H.265+ Ultra</span>
                        </div>

                        <div class="summary-metrics-grid">
                            <!-- Metric: Storage -->
                            <div class="metric-card metric-storage">
                                <div class="metric-icon">💾</div>
                                <div class="metric-data">
                                    <span class="metric-label">هارد دیسک مورد نیاز</span>
                                    <span class="metric-val" id="res-storage-val">۴ ترابایت (4TB)</span>
                                    <span class="metric-sub" id="res-storage-model">هارد Western Digital Purple نظارتی</span>
                                </div>
                            </div>

                            <!-- Metric: NVR -->
                            <div class="metric-card">
                                <div class="metric-icon">🎛️</div>
                                <div class="metric-data">
                                    <span class="metric-label">دستگاه رکوردر NVR / DVR</span>
                                    <span class="metric-val" id="res-nvr-val">دستگاه ۸ کانال 4K</span>
                                    <span class="metric-sub" id="res-nvr-ports">پشتیبانی از فرمت‌های هوش مصنوعی AI</span>
                                </div>
                            </div>

                            <!-- Metric: Network & Power -->
                            <div class="metric-card">
                                <div class="metric-icon">🔌</div>
                                <div class="metric-data">
                                    <span class="metric-label">تجهیزات شبکه و تغذیه</span>
                                    <span class="metric-val" id="res-poe-val">سوئیچ PoE هشت پورت صنعتی</span>
                                    <span class="metric-sub">منبع تغذیه مرکزی با محافظ جریان</span>
                                </div>
                            </div>

                            <!-- Metric: Cabling -->
                            <div class="metric-card">
                                <div class="metric-icon">🧵</div>
                                <div class="metric-data">
                                    <span class="metric-label">برآورد کابل‌کشی استاندارد</span>
                                    <span class="metric-val" id="res-cable-val">حدود ۱۲۰ متر</span>
                                    <span class="metric-sub">کابل شبکه Cat6 SFTP تمام مس</span>
                                </div>
                            </div>
                        </div>

                        <!-- Approximate Price Range -->
                        <div class="calc-price-box">
                            <div class="price-title-row">
                                <span>تخمین حدودی هزینه تجهیزات و بستر:</span>
                                <span class="price-range" id="res-price-range">۱۸ تا ۲۴ میلیون تومان</span>
                            </div>
                            <p class="price-note">* قیمت نهایی پس از کارشناسی دقیق محیط و متراژ دقیق کابل‌کشی در پیش‌فاکتور رسمی ارائه می‌گردد.</p>
                        </div>

                        <!-- Direct Transfer to Inquiry Button -->
                        <button type="button" class="btn-calc-apply" id="btn-calc-apply-quote">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            <span>ثبت درخواست پیش‌فاکتور با این مشخصات</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
