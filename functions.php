<?php
/**
 * Armoury child theme functions.
 *
 * @package Armoury
 * @since   1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'AM_THEME_VERSION', '1.0.0' );
define( 'AM_THEME_DIR', trailingslashit( get_stylesheet_directory() ) );
define( 'AM_THEME_URI', trailingslashit( get_stylesheet_directory_uri() ) );

/**
 * Enqueue child theme styles.
 *
 * @since 1.0.0
 * @return void
 */
function am_enqueue_styles() {
    wp_enqueue_style(
        'am-child-theme-style',
        get_stylesheet_uri(),
        array(),
        AM_THEME_VERSION
    );
}
add_action( 'wp_enqueue_scripts', 'am_enqueue_styles', 20 );

/**
 * Enqueue custom theme scripts.
 *
 * @since 1.0.0
 * @return void
 */
function am_enqueue_scripts() {
    wp_enqueue_script(
        'am-child-theme-scripts', 
        AM_THEME_URI . 'scripts.js', 
        array(), 
        AM_THEME_VERSION, 
        true
    );
}
add_action( 'wp_enqueue_scripts', 'am_enqueue_scripts' );

/**
 * Enqueue custom login page styles.
 *
 * @since 1.0.0
 * @return void
 */
function am_enqueue_login_styles() {
    wp_enqueue_style(
        'am-login-style',
        AM_THEME_URI . 'login-style.css',
        array(),
        AM_THEME_VERSION
    );
}
add_action( 'login_enqueue_scripts', 'am_enqueue_login_styles' );

/**
 * Remove the color scheme picker.
 *
 * @since 1.0.0
 * @return void
 */
function am_remove_admin_color_scheme() {
    remove_action( 'admin_color_scheme_picker', 'admin_color_scheme_picker' );
}
add_action( 'admin_init', 'am_remove_admin_color_scheme' );

/**
 * Disable Post via Email feature.
 *
 * @since 1.0.0
 */
add_filter( 'enable_post_by_email_configuration', '__return_false', PHP_INT_MAX );

/**
 * Modify Action Scheduler retention period to 1 day.
 *
 * @since 1.0.0
 * @param  int $seconds Default retention period in seconds.
 * @return int          Modified retention period in seconds.
 */
function am_action_scheduler_retention( $seconds ) {
    return DAY_IN_SECONDS;
}
add_filter( 'action_scheduler_retention_period', 'am_action_scheduler_retention', 10, 1 );

/**
 * Use high resolution YouTube thumbnail image for FlyingPress placeholder.
 *
 * @since 1.0.0
 * @return string Thumbnail resolution.
 */
function am_youtube_thumbnail_resolution() {
    return 'maxresdefault';
}
add_filter( 'flying_press_youtube_placeholder_resolution', 'am_youtube_thumbnail_resolution' );

/**
 * Add Fathom Analytics domain to FlyingPress self-hosted domains.
 *
 * @since 1.0.0
 * @param  array $domains List of domains to self-host.
 * @return array         Modified list of domains.
 */
function am_selfhost_fathom( $domains ) {
    $domains[] = 'cdn.usefathom.com';
    return $domains;
}
add_filter( 'flying_press_selfhost_external_domains', 'am_selfhost_fathom' );
