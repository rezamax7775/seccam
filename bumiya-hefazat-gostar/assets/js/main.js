/**
 * Bumiya Hefazat Gostar - Main Frontend JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {
    // 1. Mobile Menu Drawer
    var mobileMenuBtn = document.getElementById('mobile-menu-btn');
    var mobileDrawer = document.getElementById('mobile-drawer');
    var drawerCloseBtn = document.getElementById('drawer-close');

    if (mobileMenuBtn && mobileDrawer) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileDrawer.classList.add('active');
            mobileDrawer.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });

        if (drawerCloseBtn) {
            drawerCloseBtn.addEventListener('click', function () {
                mobileDrawer.classList.remove('active');
                mobileDrawer.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        }

        mobileDrawer.addEventListener('click', function (e) {
            if (e.target === mobileDrawer) {
                mobileDrawer.classList.remove('active');
                mobileDrawer.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });
    }

    // 2. Search Modal
    var openSearchBtn = document.getElementById('btn-open-search');
    var searchModal = document.getElementById('bumiya-search-modal');
    var closeSearchBtn = document.getElementById('search-modal-close');

    if (openSearchBtn && searchModal) {
        openSearchBtn.addEventListener('click', function () {
            searchModal.classList.add('active');
            searchModal.setAttribute('aria-hidden', 'false');
            var searchInput = searchModal.querySelector('.search-field');
            if (searchInput) searchInput.focus();
        });

        if (closeSearchBtn) {
            closeSearchBtn.addEventListener('click', function () {
                searchModal.classList.remove('active');
                searchModal.setAttribute('aria-hidden', 'true');
            });
        }

        searchModal.addEventListener('click', function (e) {
            if (e.target === searchModal) {
                searchModal.classList.remove('active');
                searchModal.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // 3. Consultation / Quote Modal
    var consultModal = document.getElementById('bumiya-consultation-modal');
    var openModalBtns = document.querySelectorAll('.open-consultation-modal');
    var modalCloseBtn = consultModal ? consultModal.querySelector('.modal-close-btn') : null;
    var productInput = document.getElementById('modal-product-input');
    var serviceSelect = document.getElementById('service_type');
    var modalHeading = document.getElementById('modal-heading');

    if (consultModal && openModalBtns.length > 0) {
        openModalBtns.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                var productName = btn.getAttribute('data-product') || '';
                var serviceType = btn.getAttribute('data-service') || '';

                if (productInput) productInput.value = productName;
                if (modalHeading) {
                    modalHeading.innerText = productName 
                        ? 'استعلام قیمت و مشخصات: ' + productName 
                        : 'درخواست مشاوره و استعلام قیمت';
                }

                if (serviceSelect && serviceType) {
                    for (var i = 0; i < serviceSelect.options.length; i++) {
                        if (serviceSelect.options[i].value.indexOf(serviceType) !== -1 || serviceType.indexOf(serviceSelect.options[i].value) !== -1) {
                            serviceSelect.selectedIndex = i;
                            break;
                        }
                    }
                }

                consultModal.classList.add('active');
                consultModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            });
        });

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', function () {
                consultModal.classList.remove('active');
                consultModal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        }

        consultModal.addEventListener('click', function (e) {
            if (e.target === consultModal) {
                consultModal.classList.remove('active');
                consultModal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });
    }

    // 4. AJAX Consultation Form Submissions
    var ajaxForms = document.querySelectorAll('.bumiya-form-ajax');
    ajaxForms.forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var submitBtn = form.querySelector('button[type="submit"]');
            var feedbackBox = form.querySelector('.form-feedback');
            var btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
            var btnSpinner = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;

            if (submitBtn) submitBtn.disabled = true;
            if (btnText && btnSpinner) {
                btnText.style.display = 'none';
                btnSpinner.style.display = 'inline';
            }

            var formData = new FormData(form);

            var ajaxUrl = (typeof bumiya_ajax !== 'undefined' && bumiya_ajax.ajax_url) 
                ? bumiya_ajax.ajax_url 
                : '/wp-admin/admin-ajax.php';

            fetch(ajaxUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (feedbackBox) {
                    feedbackBox.style.display = 'block';
                    if (data.success) {
                        feedbackBox.className = 'form-feedback success';
                        feedbackBox.innerHTML = data.data.message || 'درخواست شما با موفقیت ثبت گردید.';
                        form.reset();
                    } else {
                        feedbackBox.className = 'form-feedback error';
                        feedbackBox.innerHTML = data.data.message || 'خطایی در ثبت اطلاعات رخ داده است.';
                    }
                }
            })
            .catch(function (error) {
                if (feedbackBox) {
                    feedbackBox.style.display = 'block';
                    feedbackBox.className = 'form-feedback error';
                    feedbackBox.innerHTML = 'خطای ارتباط با سرور. لطفاً مجدداً تلاش فرمایید.';
                }
            })
            .finally(function () {
                if (submitBtn) submitBtn.disabled = false;
                if (btnText && btnSpinner) {
                    btnText.style.display = 'inline';
                    btnSpinner.style.display = 'none';
                }
            });
        });
    });

    // 5. Smart Project & Storage Calculator
    var calcModal = document.getElementById('bumiya-calculator-modal');
    var openCalcBtns = document.querySelectorAll('.open-calculator-modal');
    var closeCalcBtn = document.getElementById('calc-modal-close');

    // Calculator state
    var calcState = {
        cameras: 4,
        resolution: 4, // 2, 4, 8
        night: 'ir', // 'ir', 'colorvu'
        days: 30
    };

    function recalculateProject() {
        var cameras = calcState.cameras;
        var res = calcState.resolution;
        var days = calcState.days;

        // Bitrate in Mbps per camera for H.265+
        var mbps = (res === 2) ? 2.5 : (res === 4) ? 4.5 : 8.0;
        
        // Storage in GB = cameras * (mbps * 1000 / 8) * (3600 * 24 * days) / 1000000000
        // GB per day per camera approx: 2MP=27GB, 4MP=48GB, 8MP=86GB
        var gbPerDayPerCam = (res === 2) ? 27 : (res === 4) ? 48 : 86;
        var totalGB = cameras * gbPerDayPerCam * days;
        var rawTB = totalGB / 1000;

        // Suggest standard HDD size: 1, 2, 4, 6, 8, 10, 16, 24 TB
        var suggestedTB = 1;
        if (rawTB <= 1) suggestedTB = 1;
        else if (rawTB <= 2) suggestedTB = 2;
        else if (rawTB <= 4) suggestedTB = 4;
        else if (rawTB <= 6) suggestedTB = 6;
        else if (rawTB <= 8) suggestedTB = 8;
        else if (rawTB <= 12) suggestedTB = 12;
        else if (rawTB <= 16) suggestedTB = 16;
        else suggestedTB = Math.ceil(rawTB / 8) * 8;

        // NVR channels: 4, 8, 16, 32, 64
        var nvrChannels = (cameras <= 4) ? 4 : (cameras <= 8) ? 8 : (cameras <= 16) ? 16 : 32;

        // PoE Switch ports
        var poeText = (cameras <= 4) ? 'سوئیچ PoE چهار پورت ۱۰/۱۰۰' :
                      (cameras <= 8) ? 'سوئیچ PoE هشت پورت ۱۰/۱۰۰/۱۰۰۰' :
                      (cameras <= 16) ? 'سوئیچ PoE شانزده پورت صنعتی گیگابیتی' : 'سوئیچ PoE بیست و چهار پورت مدیریتی';

        // Cable estimate (avg 30m per camera)
        var estCableMeters = cameras * 30;

        // Price estimation (approx range in Million Tomans)
        var basePerCam = (res === 2) ? 2.2 : (res === 4) ? 3.6 : 5.8;
        var hddCost = suggestedTB * 1.6;
        var nvrCost = (nvrChannels === 4) ? 4.5 : (nvrChannels === 8) ? 7.5 : (nvrChannels === 16) ? 13 : 24;
        var cableCost = (estCableMeters * 35000) / 1000000;
        var totalMin = Math.round(cameras * basePerCam + hddCost + nvrCost + cableCost);
        var totalMax = Math.round(totalMin * 1.3);

        // Update Modal elements
        var camValBadge = document.getElementById('calc-camera-val');
        if (camValBadge) camValBadge.innerText = cameras + ' عدد';

        var daysValBadge = document.getElementById('calc-days-val');
        if (daysValBadge) daysValBadge.innerText = days + ' روز';

        var resStorage = document.getElementById('res-storage-val');
        if (resStorage) resStorage.innerText = suggestedTB + ' ترابایت (' + suggestedTB + 'TB)';

        var resStorageModel = document.getElementById('res-storage-model');
        if (resStorageModel) resStorageModel.innerText = 'هارد Western Digital Purple نظارتی (محاسبه دقیق: ' + rawTB.toFixed(1) + 'TB)';

        var resNvr = document.getElementById('res-nvr-val');
        if (resNvr) resNvr.innerText = 'دستگاه ' + nvrChannels + ' کانال 4K NVR';

        var resPoe = document.getElementById('res-poe-val');
        if (resPoe) resPoe.innerText = poeText;

        var resCable = document.getElementById('res-cable-val');
        if (resCable) resCable.innerText = 'حدود ' + estCableMeters + ' متر';

        var resPrice = document.getElementById('res-price-range');
        if (resPrice) resPrice.innerText = totalMin + ' تا ' + totalMax + ' میلیون تومان';

        // Update Front-page section elements if present
        var frontCamBadge = document.getElementById('front-calc-cam-display');
        if (frontCamBadge) frontCamBadge.innerText = cameras + ' دوربین';

        var frontDaysBadge = document.getElementById('front-calc-days-display');
        if (frontDaysBadge) frontDaysBadge.innerText = days + ' روز';

        var frontResStorage = document.getElementById('front-res-storage');
        if (frontResStorage) frontResStorage.innerText = suggestedTB + ' ترابایت (' + suggestedTB + 'TB Purple)';

        var frontResNvr = document.getElementById('front-res-nvr');
        if (frontResNvr) frontResNvr.innerText = 'دستگاه ' + nvrChannels + ' کانال 4K NVR';

        var frontResPoe = document.getElementById('front-res-poe');
        if (frontResPoe) frontResPoe.innerText = poeText;

        var frontResCable = document.getElementById('front-res-cable');
        if (frontResCable) frontResCable.innerText = 'حدود ' + estCableMeters + ' متر کابل Cat6 SFTP';

        var frontResPrice = document.getElementById('front-res-price');
        if (frontResPrice) frontResPrice.innerText = totalMin + ' تا ' + totalMax + ' میلیون تومان';
    }

    // Modal Triggers
    if (openCalcBtns.length > 0 && calcModal) {
        openCalcBtns.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                calcModal.classList.add('active');
                calcModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
                recalculateProject();
            });
        });

        if (closeCalcBtn) {
            closeCalcBtn.addEventListener('click', function () {
                calcModal.classList.remove('active');
                calcModal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        }

        calcModal.addEventListener('click', function (e) {
            if (e.target === calcModal) {
                calcModal.classList.remove('active');
                calcModal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });
    }

    // Modal Slider & Chip Listeners
    var modalCamSlider = document.getElementById('calc-camera-count');
    if (modalCamSlider) {
        modalCamSlider.addEventListener('input', function () {
            calcState.cameras = parseInt(this.value, 10);
            var frontSlider = document.getElementById('front-calc-camera-range');
            if (frontSlider) frontSlider.value = this.value;
            recalculateProject();
        });
    }

    var modalDaysSlider = document.getElementById('calc-days-count');
    if (modalDaysSlider) {
        modalDaysSlider.addEventListener('input', function () {
            calcState.days = parseInt(this.value, 10);
            var frontDays = document.getElementById('front-calc-days-range');
            if (frontDays) frontDays.value = this.value;
            recalculateProject();
        });
    }

    var resChips = document.querySelectorAll('#calc-resolution-chips .calc-chip');
    resChips.forEach(function (chip) {
        chip.addEventListener('click', function () {
            resChips.forEach(function (c) { c.classList.remove('active'); });
            chip.classList.add('active');
            calcState.resolution = parseInt(chip.getAttribute('data-res'), 10);
            
            // Sync front section
            var frontPills = document.querySelectorAll('#front-calc-res-group .res-pill');
            frontPills.forEach(function (p) {
                p.classList.toggle('active', parseInt(p.getAttribute('data-res'), 10) === calcState.resolution);
            });
            recalculateProject();
        });
    });

    var nightChips = document.querySelectorAll('#calc-night-chips .calc-chip');
    nightChips.forEach(function (chip) {
        chip.addEventListener('click', function () {
            nightChips.forEach(function (c) { c.classList.remove('active'); });
            chip.classList.add('active');
            calcState.night = chip.getAttribute('data-night');
            recalculateProject();
        });
    });

    // Front-Page Calculator Section Listeners
    var frontCamSlider = document.getElementById('front-calc-camera-range');
    if (frontCamSlider) {
        frontCamSlider.addEventListener('input', function () {
            calcState.cameras = parseInt(this.value, 10);
            if (modalCamSlider) modalCamSlider.value = this.value;
            recalculateProject();
        });
    }

    var frontDaysSlider = document.getElementById('front-calc-days-range');
    if (frontDaysSlider) {
        frontDaysSlider.addEventListener('input', function () {
            calcState.days = parseInt(this.value, 10);
            if (modalDaysSlider) modalDaysSlider.value = this.value;
            recalculateProject();
        });
    }

    var frontResPills = document.querySelectorAll('#front-calc-res-group .res-pill');
    frontResPills.forEach(function (pill) {
        pill.addEventListener('click', function () {
            frontResPills.forEach(function (p) { p.classList.remove('active'); });
            pill.classList.add('active');
            calcState.resolution = parseInt(pill.getAttribute('data-res'), 10);
            
            resChips.forEach(function (c) {
                c.classList.toggle('active', parseInt(c.getAttribute('data-res'), 10) === calcState.resolution);
            });
            recalculateProject();
        });
    });

    // Apply Calculated Specs to Consultation Form
    function transferCalcToForm() {
        var summaryText = 'استعلام برآورد محاسبه‌گر: تعداد دوربین: ' + calcState.cameras + ' عدد (' + calcState.resolution + 'MP) | نگهداری آرشیو: ' + calcState.days + ' روز | دید در شب: ' + (calcState.night === 'colorvu' ? 'دید در شب رنگی' : 'مادون قرمز');
        
        if (calcModal) {
            calcModal.classList.remove('active');
            calcModal.setAttribute('aria-hidden', 'true');
        }

        if (consultModal) {
            consultModal.classList.add('active');
            consultModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';

            var messageArea = document.getElementById('modal-customer-message') || document.getElementById('front_message');
            if (messageArea) messageArea.value = summaryText;

            if (productInput) productInput.value = 'پکیج ' + calcState.cameras + ' دوربین مداربسته (' + calcState.resolution + 'MP)';
            if (modalHeading) modalHeading.innerText = 'استعلام پیش‌فاکتور پکیج ' + calcState.cameras + ' دوربین';
        } else {
            var frontMessage = document.getElementById('front_message');
            if (frontMessage) {
                frontMessage.value = summaryText;
                frontMessage.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    var applyQuoteBtn = document.getElementById('btn-calc-apply-quote');
    if (applyQuoteBtn) {
        applyQuoteBtn.addEventListener('click', transferCalcToForm);
    }

    var frontApplyBtn = document.getElementById('btn-front-apply-to-form');
    if (frontApplyBtn) {
        frontApplyBtn.addEventListener('click', transferCalcToForm);
    }

    // Initial calculation run
    recalculateProject();

    // 6. Escape Key to close all open modals
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (consultModal) consultModal.classList.remove('active');
            if (calcModal) calcModal.classList.remove('active');
            if (searchModal) searchModal.classList.remove('active');
            if (mobileDrawer) mobileDrawer.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

