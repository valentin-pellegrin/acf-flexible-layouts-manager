<?php
add_action('wp_ajax__acf_flm_get_all_layout_templates',         '_acf_flm_get_all_layout_templates');
add_action('wp_ajax_nopriv__acf_flm_get_all_layout_templates',  '_acf_flm_get_all_layout_templates');
function _acf_flm_get_all_layout_templates(){
    
    $post_id 	= $_POST['postid'];
    $flexible 	= $_POST['flexible'];

    $data = get_field($flexible, $post_id);

    wp_send_json_success($data);
}