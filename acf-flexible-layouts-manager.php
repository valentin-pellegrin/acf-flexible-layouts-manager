<?php 
/*
    Plugin Name: ACF Flexible Layouts Manager
    Description: Add "Copy", "Duplicate", "Import" & "Paste" options for layout in ACF Flexible Content
    Author: Valentin PELLEGRIN
    Text Domain: acf-flexible-layouts-manager
    Version: 1.0.0
    Author URI: https://github.com/valentin-pellegrin
    Licence: GPLv2
*/

if(!defined('ABSPATH'))
  die('You are not allowed to call this page directly.');

defined('ACF_TEMPLATES') || define('ACF_TEMPLATES', plugin_dir_path(__FILE__));
defined( 'ACF_TEMPLATES_URL' ) || define( 'ACF_TEMPLATES_URL', plugin_dir_url(__FILE__) );

load_plugin_textdomain( 'acf-flexible-layouts-manager', false, basename( dirname( __FILE__ ) ) . '/languages/' );


add_action( 'plugins_loaded', '_acf_flm_acf_exist' );
function _acf_flm_acf_exist() {

    if(class_exists('acf_field')){

        require_once(ACF_TEMPLATES . 'helpers/add-button.php');

        require_once(ACF_TEMPLATES . 'includes/ajax/ajax-copy.php');
        require_once(ACF_TEMPLATES . 'includes/ajax/ajax-duplicate.php');
        require_once(ACF_TEMPLATES . 'includes/ajax/ajax-paste.php');
        require_once(ACF_TEMPLATES . 'includes/ajax/ajax-select.php');

        require_once(ACF_TEMPLATES . 'includes/paste.php');
        require_once(ACF_TEMPLATES . 'includes/select.php');

        add_action( 'admin_enqueue_scripts', '_acf_flm_template_enqueue_admin_style' );
        function _acf_flm_template_enqueue_admin_style(){
            //Style
            wp_enqueue_style('_acf-flm-admin-style', ACF_TEMPLATES_URL . 'assets/css/style-admin.css' );
            
            wp_enqueue_script('_acf-flm-script-move-button', ACF_TEMPLATES_URL . 'assets/js/move-button.js', array('jquery'), false );
              
            wp_enqueue_script('_acf-flm-script-copy', ACF_TEMPLATES_URL . 'assets/js/copy.js', array('jquery'), false );
            wp_enqueue_script('_acf-flm-script-duplicate', ACF_TEMPLATES_URL . 'assets/js/duplicate.js', array('jquery'), false );
            wp_enqueue_script('_acf-flm-script-paste', ACF_TEMPLATES_URL . 'assets/js/paste.js', array('jquery'), false );
            wp_enqueue_script('_acf-flm-script-select', ACF_TEMPLATES_URL . 'assets/js/select.js', array('jquery'), false );
        }

        require_once(ACF_TEMPLATES . 'includes/languages.php');
    }
}