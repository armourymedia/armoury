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
