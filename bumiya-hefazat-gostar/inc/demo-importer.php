<?php
/**
 * Demo Data Importer and Demo Cleanup Tool
 *
 * Allows one-click installation of sample products, projects, categories, and settings
 * for testing and quick deployment.
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Add Admin Menu for Demo Importer
 */
function bumiya_demo_importer_menu() {
    add_management_page(
        __('درون‌ریزی دمو بومیا حفاظت گستر', 'bumiya-hefazat'),
        __('دمو بومیا حفاظت گستر', 'bumiya-hefazat'),
        'manage_options',
        'bumiya-demo-importer',
        'bumiya_render_demo_importer_page'
    );
}
add_action('admin_menu', 'bumiya_demo_importer_menu');

/**
 * Render Demo Importer Page
 */
function bumiya_render_demo_importer_page() {
    $message = '';
    $msg_type = 'success';

    // Handle Demo Import Action
    if (isset($_POST['bumiya_import_demo_action']) && check_admin_referer('bumiya_demo_action_nonce')) {
        bumiya_execute_demo_import();
        $message = 'اطلاعات و محصولات نمونه بومیا حفاظت گستر با موفقیت درون‌ریزی شدند!';
    }

    // Handle Demo Purge Action
    if (isset($_POST['bumiya_purge_demo_action']) && check_admin_referer('bumiya_demo_action_nonce')) {
        bumiya_execute_demo_purge();
        $message = 'کلیه اطلاعات و محصولات آزمایشی بومیا با موفقیت پاکسازی شدند.';
        $msg_type = 'warning';
    }
    ?>
    <div class="wrap" style="direction: rtl; font-family: Tahoma, sans-serif; max-width: 900px;">
        <h1 style="color: #0f2b5c; margin-bottom: 20px;">🛡️ سیستم درون‌ریزی داده‌های نمونه (Demo Importer) - بومیا حفاظت گستر</h1>

        <?php if ($message): ?>
            <div class="notice notice-<?php echo esc_attr($msg_type); ?> is-dismissible" style="padding: 12px; font-weight: bold;">
                <p><?php echo esc_html($message); ?></p>
            </div>
        <?php endif; ?>

        <div style="background: #fff; padding: 25px; border-radius: 12px; border: 1px solid #e2e8f0; margin-top: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
            <h2 style="color: #0f2b5c; border-bottom: 2px solid #0284c7; padding-bottom: 10px;">درون‌ریزی خودکار محصولات، پروژه‌ها و دسته‌بندی‌ها</h2>
            <p style="color: #475569; line-height: 1.8;">
                با کلیک روی دکمه زیر، اقلام زیر به صورت استاندارد در سایت ایجاد خواهند شد:
            </p>
            <ul style="list-style-type: disc; margin-right: 25px; color: #334155; line-height: 1.8;">
                <li><strong>دسته‌بندی‌های پیش‌فرض:</strong> دوربین مداربسته، DVR، NVR، هارد نظارتی، تجهیزات شبکه، کابل و متعلقات</li>
                <li><strong>محصولات نمونه با مشخصات فنی کامل:</strong>
                    <ul>
                        <li>دوربین مداربسته بولت 4MP دید در شب رنگی (ColorVu)</li>
                        <li>دوربین دام 5MP تحت شبکه ضدضربه (Vandal-Proof)</li>
                        <li>دوربین اسپیددام گردان چرخشی (PTZ) زوم ۳۲ برابر اپتیکال</li>
                        <li>دستگاه رکوردر NVR 32 کانال تحت شبکه 4K</li>
                        <li>دستگاه رکوردر DVR 16 کانال هیبریدی 5MP</li>
                        <li>هارد دیسک نظارتی مخصوص سیستم دوربین مداربسته 4TB</li>
                        <li>سوئیچ شبکه صنعتی 8 پورت PoE</li>
                    </ul>
                </li>
                <li><strong>پروژه‌های اجرایی نمونه:</strong> برج مسکونی آریا، کارخانه صنایع بسته‌بندی نوین، مجتمع تجاری نگین پایتخت</li>
                <li><strong>دسته‌بندی پروژه‌ها:</strong> مسکونی، تجاری، اداری، صنعتی، فروشگاهی، کارخانه</li>
            </ul>

            <form method="post" style="margin-top: 30px; display: inline-block;">
                <?php wp_nonce_field('bumiya_demo_action_nonce'); ?>
                <button type="submit" name="bumiya_import_demo_action" class="button button-primary button-hero" style="background: #0284c7; border-color: #0284c7;">
                    🚀 شروع درون‌ریزی اطلاعات نمونه دمو
                </button>
            </form>

            <form method="post" style="margin-top: 30px; margin-right: 15px; display: inline-block;" onsubmit="return confirm('آیا از حذف داده‌های آزمایشی اطمینان دارید؟');">
                <?php wp_nonce_field('bumiya_demo_action_nonce'); ?>
                <button type="submit" name="bumiya_purge_demo_action" class="button button-secondary button-hero" style="color: #dc2626; border-color: #dc2626;">
                    🗑️ حذف داده‌های نمونه دمو
                </button>
            </form>
        </div>
    </div>
    <?php
}

/**
 * Execute Demo Import
 */
function bumiya_execute_demo_import() {
    // 1. Create Product Categories
    $categories = [
        'دوربین مداربسته' => 'انواع دوربین‌های بولت، دام، چرخشی و پلاک‌خوان تحت شبکه و آنالوگ HD',
        'دستگاه DVR'      => 'دستگاه‌های ضبط تصویر آنالوگ و هیبریدی با کیفیت HD و 4K',
        'دستگاه NVR'      => 'رکوردرهای تحت شبکه با پردازش هوشمند تصویر و هوش مصنوعی',
        'هارد نظارتی'     => 'هارد دیسک‌های ویژه ضبط مداوم ۲۴ ساعته و بدون افت فریم',
        'تجهیزات شبکه'    => 'سوئیچ‌های شبکه PoE، روترها و پچ‌پنل‌های صنعتی',
        'کابل و متعلقات'  => 'کابل‌های شبکه Cat6 SFTP، کابل کواکسیال ترکیبی و کانکتورها',
        'لوازم جانبی'     => 'رک، آداپتور، منبع تغذیه مرکزی و براکت‌های نصب',
    ];

    $cat_ids = [];
    foreach ($categories as $cat_name => $cat_desc) {
        $term = term_exists($cat_name, 'product_category');
        if (!$term) {
            $created = wp_insert_term($cat_name, 'product_category', ['description' => $cat_desc]);
            if (!is_wp_error($created)) {
                $cat_ids[$cat_name] = $created['term_id'];
            }
        } else {
            $cat_ids[$cat_name] = is_array($term) ? $term['term_id'] : $term;
        }
    }

    // 2. Create Project Categories
    $proj_cats = ['مسکونی', 'تجاری', 'اداری', 'صنعتی', 'فروشگاهی', 'کارخانه'];
    $proj_cat_ids = [];
    foreach ($proj_cats as $pcat) {
        $term = term_exists($pcat, 'project_category');
        if (!$term) {
            $created = wp_insert_term($pcat, 'project_category');
            if (!is_wp_error($created)) {
                $proj_cat_ids[$pcat] = $created['term_id'];
            }
        } else {
            $proj_cat_ids[$pcat] = is_array($term) ? $term['term_id'] : $term;
        }
    }

    // 3. Create Sample Products
    $sample_products = [
        [
            'title' => 'دوربین مداربسته بولت 4MP دید در شب رنگی DarkFighter',
            'category' => 'دوربین مداربسته',
            'brand' => 'هایک‌ویژن (Hikvision)',
            'model' => 'DS-2CD2047G2-LU',
            'code' => 'BHG-CAM-401',
            'stock' => 'in_stock',
            'price' => 'استعلام قیمت پروژه',
            'specs' => "کیفیت سنسور: 4 مگاپیکسل واقعی (2688 × 1520)\nفناوری دید در شب: تمام رنگی ColorVu تا فاصله ۴۰ متر\nنوع لنز: لنز ثابت ۲.۸ میلی‌متر با زاویه دید ۱۰۲ درجه\nاستاندارد عایق‌بندی: IP67 مقاوم در برابر باران، برف و گردوغبار شدید\nمیکروفون داخلی: دارد (ضبط صدای محیط با حذف نویز)\nفرمت فشرده‌سازی: H.265+ / H.265 / H.264\nتغذیه: 12V DC و PoE (802.3af)\nگارانتی: ۲۴ ماه گارانتی طلایی تعویض بومیا حفاظت گستر",
            'features' => "تصویربرداری شفاف رنگی در تاریکی مطلق\nفناوری هوشمند AcuSense جهت تفکیک انسان و وسایل نقلیه و کاهش ۹۹٪ هشدارهای کاذب\nبدنه تمام فلزی مقاوم در شرایط آب و هوایی سخت",
            'apps' => 'محوطه بیرونی ساختمان‌ها، درب‌های ورودی، پارکینگ‌ها، محوطه‌های صنعتی و انبارها',
            'advantages' => 'ارائه با گارانتی اصالت کالا، خدمات نصب تخصصی و تنظیم دقیق زاویه دید توسط تکنسین‌های بومیا',
        ],
        [
            'title' => 'دوربین مداربسته دام 5MP تحت شبکه ضدضربه هوشمند',
            'category' => 'دوربین مداربسته',
            'brand' => 'داهوا (Dahua)',
            'model' => 'DH-IPC-HDBW3541E-S',
            'code' => 'BHG-CAM-502',
            'stock' => 'in_stock',
            'price' => 'استعلام قیمت پروژه',
            'specs' => "رزولوشن تصویر: 5 مگاپیکسل سوپر اچ‌دی (2592 × 1944)\nدید در شب: مادون قرمز هوشمند Smart IR تا برد ۵۰ متر\nمقاومت فیزیکی: استاندارد IK10 ضدضربه و ضدخرابکاری\nاستاندارد ضدآب: IP67\nشیار کارت حافظه: پشتیبانی از کارت حافظه MicroSD تا 256GB\nهوش مصنوعی: تشخیص نفوذ به محدوده، عبور از خط فرضی و تشخیص چهره\nگارانتی: ۲۴ ماه ضمانت رسمی بومیا حفاظت گستر",
            'features' => "طراحی گنبدی شکل ضد سرقت و ضد ضربه\nپردازشگر قدرتمند WizSense داهوا\nکیفیت صدای شفاف و بدون نویز",
            'apps' => 'فضاهای داخلی، لابی هتل‌ها و برج‌ها، راهروها، آسانسورها، بانک‌ها و فروشگاه‌های طلا و جواهر',
            'advantages' => 'بهترین گزینه برای اماکنی که احتمال دستکاری فیزیکی وجود دارد با لنز سوپر واید',
        ],
        [
            'title' => 'دوربین اسپیددام چرخشی گردان (PTZ) زوم ۳۲ برابر 4K',
            'category' => 'دوربین مداربسته',
            'brand' => 'یونی‌ویو (Uniview)',
            'model' => 'IPC6852SR-X32UP',
            'code' => 'BHG-PTZ-803',
            'stock' => 'call_for_stock',
            'price' => 'استعلام قیمت اختصاصی',
            'specs' => "بزرگنمایی: ۳۲ برابر زوم اپتیکال بدون افت کیفیت + ۱۶ برابر زوم دیجیتال\nمحدوده چرخش: ۳۶۰ درجه نامحدود افقی و -۱۵ تا ۹۰ درجه عمودی\nدید در شب: لیزری مادون قرمز پرقدرت تا فاصله ۲۵۰ متر\nسرعت چرخش: تا ۳۰۰ درجه در ثانیه\nسیستم ردیابی خودکار: Auto-Tracking هوشمند افراد و خودروها\nسیستم برف‌پاک‌کن اتوماتیک: مجهز به هیتر و تیغه تمیزکننده لنز",
            'features' => "پوشش وسیع میادین، تقاطع‌ها و سایت‌های پهناور صنعتی\nردیابی کامپیوتر-محور اهداف متحرک با چرخش اتوماتیک لنز\nسنسور استارلایت با دید فوق‌العاده در کمترین نور ممکن",
            'apps' => 'محوطه کارخانجات بزرگ، فرودگاه‌ها، بنادر، مزارع، پالایشگاه‌ها، پروژه‌های شهرسازی و نظارت جاده‌ای',
            'advantages' => 'نصب و کالیبراسیون تخصصی با تجهیزات مساحی توسط تیم مهندسی بومیا حفاظت گستر',
        ],
        [
            'title' => 'دستگاه رکوردر تحت شبکه NVR 32 کانال 4K هوش مصنوعی',
            'category' => 'دستگاه NVR',
            'brand' => 'هایک‌ویژن (Hikvision)',
            'model' => 'DS-7732NXI-I4/16P/S',
            'code' => 'BHG-NVR-7732',
            'stock' => 'in_stock',
            'price' => 'استعلام قیمت پروژه',
            'specs' => "تعداد کانال ورودی: ۳۲ کانال دوربین IP با رزولوشن تا 12MP (4K)\nتعداد پورت PoE داخلی: ۱۶ پورت مستقل Plug & Play\nتعداد هارد قابل نصب: ۴ عدد هارد SATA تا ظرفیت ۱۰ ترابایت برای هر هارد (مجموع ۴۰ ترابایت)\nپهنای باند ورودی: ۲۵۶ مگابیت بر ثانیه\nخروجی تصویر: دو خروجی همزمان HDMI (4K) و VGA\nقابلیت‌های AI: آنالیز رفتار، جستجوی سریع هوشمند ویدیو بر اساس چهره یا پلاک",
            'features' => "پایداری فوق‌العاده بالا برای پروژه‌های حیاتی\nسیستم عامل اختصاصی پایدار با ضد هنگ\nدسترسی امن از راه دور روی موبایل بدون نیاز به IP استاتیک (P2P Cloud)",
            'apps' => 'مرکز کنترل مانیتورینگ سازمان‌ها، کارخانه‌ها، هتل‌ها و مجموعه‌های تجاری بزرگ',
            'advantages' => 'کانفیگ و پیکربندی شبکه با استاندارد رمزنگاری پیشرفته توسط متخصصین امنیت شبکه بومیا',
        ],
        [
            'title' => 'هارد دیسک نظارتی وسترن دیجیتال بنفش 4TB مخصوص دوربین',
            'category' => 'هارد نظارتی',
            'brand' => 'وسترن دیجیتال (Western Digital)',
            'model' => 'WD Purple Surveillance 4TB',
            'code' => 'BHG-HDD-4000',
            'stock' => 'in_stock',
            'price' => 'استعلام روز',
            'specs' => "ظرفیت: ۴ ترابایت (۴۰۰۰ گیگابایت)\nفناوری اختصاصی: AllFrame AI جهت جلوگیری از ریزش فریم و قطعی ویدیو\nسرعت چرخش دیسک: 5400 RPM با بافر ۶۴ مگابایت\nپشتیبانی دوربین: پشتیبانی از حداکثر ۶۴ دوربین همزمان\nطول عمر کاری: MTBF یک میلیون ساعت، کارکرد مداوم 24/7/365\nگارانتی: ۳۶ ماه ضمانت تعویض درجا بومیا",
            'features' => "طراحی اختصاصی برای نوشتن پیوسته و طولانی‌مدت تصویر\nمصرف برق بهینه و تولید حرارت بسیار پایین\nتحمل نوسانات لرزشی دستگاه رکوردر",
            'apps' => 'تمامی سیستم‌های نظارت تصویری DVR و NVR خانگی، اداری و صنعتی',
            'advantages' => 'تضمین اصالت ۱۰۰٪ چیپست و سلامت صفر کارکرد دیسک با هولوگرام معتبر',
        ],
        [
            'title' => 'سوئیچ شبکه صنعتی 8 پورت PoE گیگابیت مدیریت‌نشده',
            'category' => 'تجهیزات شبکه',
            'brand' => 'بومیا پرو (Bumiya Pro)',
            'model' => 'BHG-SW8P-GIG',
            'code' => 'BHG-SW-808',
            'stock' => 'in_stock',
            'price' => 'استعلام قیمت',
            'specs' => "تعداد پورت: ۸ پورت 10/100/1000 PoE + ۲ پورت Uplink گیگابیت\nتوان خروجی کلی PoE: ۱۲۰ وات (حداکثر ۳۰ وات برای هر پورت)\nبرد انتقال داده در حالت Extended: تا ۲۵۰ متر در کابل شبکه\nحفاظت در برابر صاعقه: مدار محافظ داخلی تا 6KV Surge Protection\nبدنه: فلزی رکمونت با دفع حرارت پسیو بدون فن و کاملاً بی‌صدا",
            'features' => "تأمین همزمان برق و دیتای دوربین‌های مداربسته روی یک رشته کابل شبکه\nپشتیبانی از قابلیت VLAN اختصاصی برای جداسازی ترافیک پورت‌ها\nپایداری دائم کار بدون نیاز به ریستارت دوره‌ای",
            'apps' => 'شبکه‌های دوربین مداربسته IP، سامانه‌های حضور و غیاب، تلفن‌های VoIP و اکسس‌پوینت‌ها',
            'advantages' => 'محافظت از تجهیزات گران‌قیمت دوربین در برابر نوسانات ناگهانی برق شبکه',
        ]
    ];

    foreach ($sample_products as $pdata) {
        $existing = get_page_by_title($pdata['title'], OBJECT, 'product');
        if (!$existing) {
            $pid = wp_insert_post([
                'post_title'   => $pdata['title'],
                'post_content' => sprintf(
                    "محصول %s با بالاترین استانداردهای ایمنی و تکنولوژی روز نظارت تصویری تولید شده است.\nاین دستگاه توسط تیم فنی «بومیا حفاظت گستر» به صورت کامل تست و اعتبارسنجی شده و با گارانتی معتبر و خدمات پشتیبانی تخصصی در سراسر کشور عرضه می‌گردد.",
                    $pdata['title']
                ),
                'post_status'  => 'publish',
                'post_type'    => 'product',
            ]);

            if ($pid && !is_wp_error($pid)) {
                update_post_meta($pid, '_bumiya_product_brand', $pdata['brand']);
                update_post_meta($pid, '_bumiya_product_model', $pdata['model']);
                update_post_meta($pid, '_bumiya_product_code', $pdata['code']);
                update_post_meta($pid, '_bumiya_product_stock', $pdata['stock']);
                update_post_meta($pid, '_bumiya_product_price', $pdata['price']);
                update_post_meta($pid, '_bumiya_product_specs', $pdata['specs']);
                update_post_meta($pid, '_bumiya_product_features', $pdata['features']);
                update_post_meta($pid, '_bumiya_product_applications', $pdata['apps']);
                update_post_meta($pid, '_bumiya_product_advantages', $pdata['advantages']);
                update_post_meta($pid, '_bumiya_is_demo', '1');

                // Assign Category
                if (isset($cat_ids[$pdata['category']])) {
                    wp_set_object_terms($pid, (int)$cat_ids[$pdata['category']], 'product_category');
                }
            }
        }
    }

    // 4. Create Sample Projects
    $sample_projects = [
        [
            'title' => 'پروژه تجهیز و هوشمندسازی امنیتی برج مسکونی آریا',
            'category' => 'مسکونی',
            'location' => 'تهران - سعادت‌آباد',
            'client' => 'هیئت مدیره مجتمع مسکونی آریا',
            'date' => 'تابستان ۱۴۰۲',
            'equipment' => "۴۸ عدد دوربین مداربسته دام و بولت 5MP داهوا\n۲ دستگاه رکوردر NVR 32 کانال\nسوئیچ‌های PoE صنعتی و رک مرکزی\nسیستم UPS برق اضطراری ۴ ساعته",
            'services' => "طراحی نقشه نظارت تصویری و پوشش کامل مشاعات، پارکینگ‌ها و آسانسورها\nکابل‌کشی ساخت‌یافته درون داکت‌های ضدحریق\nنصب مانیتورینگ آنلاین برای نگهبانی و انتقال تصویر روی موبایل مالکین",
            'results' => 'پوشش ۱۰۰٪ نقاط کور مجتمع، پیشگیری قطعی از ورود افراد غیرمجاز و رضایتمندی کامل ساکنین برج.',
        ],
        [
            'title' => 'پروژه سیستم نظارت تصویری و پایش پیرامونی کارخانه صنایع نوین',
            'category' => 'کارخانه',
            'location' => 'شهرک صنعتی شمس‌آباد',
            'client' => 'شرکت توسعه صنعتی نوین پلاست',
            'date' => 'پاییز ۱۴۰۲',
            'equipment' => "۱۸ عدد دوربین اسپیددام چرخشی PTZ با زوم ۳۲ برابر\n۳۶ عدد دوربین بولت پلاک‌خوان هوشمند هایک‌ویژن\nسرور مرکزی مانیتورینگ با رک ۴۲ یونیت استاندارد\nکابل‌کشی فیبر نوری به طول ۱.۸ کیلومتر",
            'services' => "اجرای شبکه فیبر نوری بین سالن‌های تولید و ساختمان اداری\nنصب سیستم پلاک‌خوان هوشمند در گیت‌های ورود و خروج تریلرها\nتجهیز اتاق مانیتورینگ مرکزی با ۶ نمایشگر صنعتی",
            'results' => 'کنترل دقیق ورود و خروج بار و پرسنل، کاهش خطاهای حراستی و نظارت بی‌وقفه خطوط تولید ۲۴ ساعته.',
        ],
        [
            'title' => 'پروژه ارتقا و نگهداری سیستم نظارت تصویری مجتمع تجاری پایتخت',
            'category' => 'تجاری',
            'location' => 'تهران - خیابان ولیعصر',
            'client' => 'مدیریت مجتمع تجاری پایتخت',
            'date' => 'زمستان ۱۴۰۲',
            'equipment' => "۶۴ عدد دوربین دید در شب رنگی ColorVu\n۳ دستگاه NVR پیشرفته با تحلیل چهره و ازدحام\nسیستم ذخیره‌سازی داده‌های تصویری به مدت ۹۰ روز کاری",
            'services' => "تعویض کامل کابل‌ها و دوربین‌های فرسوده قدیمی بدون اختلال در فعالیت کسبه\nپیاده‌سازی هشدار هوشمند ازدحام در راهروهای اصلی\nپشتیبانی فنی ماهانه و سرویس دوره‌ای دوربین‌ها",
            'results' => 'افزایش امنیت بیش از ۱۵۰ واحد تجاری، ردیابی سریع اشیای گم‌شده و ارتقای امنیت مراجعین.',
        ],
    ];

    foreach ($sample_projects as $proj) {
        $existing = get_page_by_title($proj['title'], OBJECT, 'project');
        if (!$existing) {
            $pid = wp_insert_post([
                'post_title'   => $proj['title'],
                'post_content' => sprintf(
                    "پروژه امنیتی و نظارتی «%s» با موفقیت توسط تیم مهندسی «بومیا حفاظت گستر» طراحی، کابل‌کشی، نصب و تحویل کارفرما گردید.",
                    $proj['title']
                ),
                'post_status'  => 'publish',
                'post_type'    => 'project',
            ]);

            if ($pid && !is_wp_error($pid)) {
                update_post_meta($pid, '_bumiya_project_location', $proj['location']);
                update_post_meta($pid, '_bumiya_project_client', $proj['client']);
                update_post_meta($pid, '_bumiya_project_date', $proj['date']);
                update_post_meta($pid, '_bumiya_project_equipment', $proj['equipment']);
                update_post_meta($pid, '_bumiya_project_services', $proj['services']);
                update_post_meta($pid, '_bumiya_project_results', $proj['results']);
                update_post_meta($pid, '_bumiya_is_demo', '1');

                if (isset($proj_cat_ids[$proj['category']])) {
                    wp_set_object_terms($pid, (int)$proj_cat_ids[$proj['category']], 'project_category');
                }
            }
        }
    }
}

/**
 * Execute Demo Purge
 */
function bumiya_execute_demo_purge() {
    $demo_posts = get_posts([
        'post_type'   => ['product', 'project'],
        'meta_key'    => '_bumiya_is_demo',
        'meta_value'  => '1',
        'numberposts' => -1,
        'post_status' => 'any',
    ]);

    foreach ($demo_posts as $post) {
        wp_delete_post($post->ID, true);
    }
}
