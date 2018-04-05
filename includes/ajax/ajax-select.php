<?php

add_action('wp_ajax__acf_flm_update_with_custom_layout_selected',           '_acf_flm_update_with_custom_layout_selected');
add_action('wp_ajax_nopriv__acf_flm_update_with_custom_layout_selected',    '_acf_flm_update_with_custom_layout_selected');
function _acf_flm_update_with_custom_layout_selected(){

    $post_id_cible 	    = (int)$_POST['post_id_cible'];
    $post_id_current    = $_POST['post_id_current'];
    $comportement 	    = $_POST['comportement'];
    $layouts 	        = $_POST['layout'];
    $flexible 	        = $_POST['flexible_content'];

    if(!$post_id_cible || !$post_id_current || !$comportement || !$layouts)
        wp_send_json_error('No data');

    $data_actuel = get_field($flexible, $post_id_current);
    $data_cible = get_field($flexible, $post_id_cible);

    $data = array();

    foreach($layouts as $layout):
        $data[] = $data_cible[$layout];
    endforeach;

    if( ($comportement == "add") && $data_actuel ){
        update_field($flexible, array_merge($data_actuel, $data), $post_id_current);
    }else {
        update_field($flexible, $data, $post_id_current);
    }

    wp_send_json_success('OK');

}

add_action('wp_ajax__acf_flm_get_all_posts_how_contains_current_flexible', 			'_acf_flm_get_all_posts_how_contains_current_flexible');
add_action('wp_ajax_nopriv__acf_flm_get_all_posts_how_contains_current_flexible', 	'_acf_flm_get_all_posts_how_contains_current_flexible');
function _acf_flm_get_all_posts_how_contains_current_flexible(){

    $flexible 	        = $_POST['flexible'];
    $key 	            = $_POST['key'];

    $posts = get_posts(array(
        "posts_per_page" => -1,
        "post_type" => 'any',
        "fields"    => 'ids',
        /*"post__not_in" => array(get_the_ID()),*/
        'meta_query' => array(
            array(
                'key'     => $flexible,
                'value'   => false,
                'compare' => '!=',
            ),
        ),
    ));

    $data = array();

    foreach($posts as $post):
        $data[] = array(
            "post_id" => $post,
            "post_title" => get_the_title($post)
        );
    endforeach;

    wp_send_json_success($data);

}