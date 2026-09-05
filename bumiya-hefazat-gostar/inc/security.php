<?php
/**
 * Security Hardening and Input/Output Sanitization Helpers
 *
 * @package Bumiya_Hefazat_Gostar
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Remove WordPress Version Meta for Security
 */
remove_action('wp_head', 'wp_generator');

/**
 * Disable XML-RPC Pingbacks to prevent DDoS amplification
 */
function bumiya_disable_xmlrpc_pingback($methods) {
    unset($methods['pingback.ping']);
    return $methods;
}
add_filter('xmlrpc_methods', 'bumiya_disable_xmlrpc_pingback');

/**
 * Clean and Sanitize Phone Numbers (Persian/Arabic digits to English digits)
 */
function bumiya_sanitize_phone($phone) {
    if (empty($phone)) return '';
    $persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    $arabic  = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    $english = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    $phone = str_replace($persian, $english, $phone);
    $phone = str_replace($arabic, $english, $phone);
    return preg_replace('/[^0-9+]/', '', $phone);
}

/**
 * Convert English Numbers to Persian for display
 */
function bumiya_to_persian_num($string) {
    $english = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    $persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return str_replace($english, $persian, (string)$string);
}
