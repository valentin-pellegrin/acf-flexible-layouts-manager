<?php

add_action('acf/input/admin_footer', '_acf_flm_select_layout');
function _acf_flm_select_layout()
{
    add_thickbox(); ?>

    <div id="acf-flm-thickbox-select-layout" style="display:none;">
        <div class="boxcontent">

            <div class="content">
                <div class="load">
                    <div class="spinner is-active" style="float:none;"></div>
                </div>

                <table class="widefat page-table" id="acf-flm-select-post-table"></table>

                <div class="acf-flm-select-layout-result">
                    <form action="#" method="post" id="acf-flm-form-answer-custom-select-layout">

                        <input type="hidden" value="_acf_flm_update_with_custom_layout_selected" name="action">
                        <input type="hidden" value="" name="post_id_cible">
                        <input type="hidden" value="" name="flexible_content">

                        <div id="inputs-select"></div>

                        <div id="acf-flm-btn-nav-select-layout" style="display:none;">
                            <button type="button" class="button" id="return-select-post" style="margin-top:20px;margin-bottom:20px;"><?php echo __( "Back", 'acf-flexible-layouts-manager' ); ?></button>
                            <button type="submit" class="button button-primary" style="margin-top:20px;margin-bottom:20px;"><?php echo __( "Update", 'acf-flexible-layouts-manager' ); ?></button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    </div>
    
    <?php
}