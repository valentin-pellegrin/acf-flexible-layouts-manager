<?php

add_action('wp_ajax__acf_flm_layout_duplicate',         '_acf_flm_layout_duplicate');
add_action('wp_ajax_nopriv__acf_flm_layout_duplicate',  '_acf_flm_layout_duplicate');
function _acf_flm_layout_duplicate(){
    $position 	= (int)$_POST['position'];
    $post_id 	= $_POST['post_id'];
    $flexible 	= $_POST['flexible'];

    $data = get_field($flexible, $post_id);

    $data[] = $data[$position];

    update_field($flexible, $data, $post_id);

    wp_send_json_success("OK");
}