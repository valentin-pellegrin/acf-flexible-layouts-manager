<?php
add_action( 'admin_enqueue_scripts', '_pit_acf_template_enqueue_admin_languages' );
function _pit_acf_template_enqueue_admin_languages(){
    wp_localize_script('_acf-flm-script-move-button', 'tradObject', array(
        'duplication'           => __( 'Duplicate this layout', 'acf-flexible-layouts-manager' ),
        'copy'                  => __( 'Copy this layout', 'acf-flexible-layouts-manager' ),
        'copied'                => __( 'Layout copied!', 'acf-flexible-layouts-manager' ),
        'copiedPlurial'         => __( 'Layouts copied!', 'acf-flexible-layouts-manager' ),
        'confirmDuplication'    => __( 'Did you save your modifications? The duplication functionnality will overwrite your unsaved data.', 'acf-flexible-layouts-manager' ),
        'problemDuplication'    => __( 'You can\'t duplicate a unsaved layout.', 'acf-flexible-layouts-manager' ),
        'problemPasteData'      => __( 'There is an error in your data.', 'acf-flexible-layouts-manager' ),
        'selectTemplate'        => __( 'Selection of layout(s) to import:', 'acf-flexible-layouts-manager' ),
        'behaviorTemplate'      => __( 'Behavior of the import:', 'acf-flexible-layouts-manager' ),
        'addTemplate'           => __( 'Add to the other(s) layout(s)', 'acf-flexible-layouts-manager' ),
        'replaceTemplate'       => __( 'Replace current layout(s)', 'acf-flexible-layouts-manager' ),
        'noSelectTemplate'      => __( 'There is no layout selected', 'acf-flexible-layouts-manager' ),
      ) );
}