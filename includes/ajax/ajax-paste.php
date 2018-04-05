<?php

add_action('wp_ajax__acf_flm_update_template_with_pasted_layout',           '_acf_flm_update_template_with_pasted_layout');
add_action('wp_ajax_nopriv__acf_flm_update_template_with_pasted_layout',    '_acf_flm_update_template_with_pasted_layout');
function _acf_flm_update_template_with_pasted_layout(){

    $post_id 	        = $_POST['post_id'];
    $comportement 	    = $_POST['comportement'];
    $layouts 	        = $_POST['paste-code'];
    $flexible 	        = $_POST['flexible'];
    $key 	            = $_POST['key'];

    if(!$comportement || !$layouts)
        wp_send_json_error('No data');

    if(!$flexible || !$key)
        wp_send_json_error('No flexible');

    $data_actuel = get_field($flexible, $post_id);

    $data = json_decode(stripslashes($layouts), TRUE);

    if( ($comportement == "add") && $data_actuel ){
        update_field($flexible, array_merge($data_actuel, $data), $post_id);
    }else {
        update_field($flexible, $data, $post_id);
    }

    wp_send_json_success("OK");

}
