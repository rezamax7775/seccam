/**
 * Bumiya Hefazat Gostar - Admin JavaScript
 */

jQuery(document).ready(function ($) {
    // Quick Status Update for Consultation Requests
    $(document).on('change', '.bumiya-quick-status', function () {
        var $select = $(this);
        var requestId = $select.data('id');
        var newStatus = $select.val();

        $select.css('opacity', '0.5');

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'bumiya_update_request_status',
                request_id: requestId,
                status: newStatus,
                nonce: $('#_wpnonce').val() || ''
            },
            success: function (response) {
                $select.css('opacity', '1');
            },
            error: function () {
                $select.css('opacity', '1');
                alert('خطا در بروزرسانی وضعیت.');
            }
        });
    });
});
