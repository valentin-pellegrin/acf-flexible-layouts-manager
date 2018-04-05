<?php

add_action('acf/input/admin_footer', '_acf_flm_paste_layout');
function _acf_flm_paste_layout()
{
    add_thickbox(); ?>

    <div id="acf-flm-thickbox-paste-layout" style="display:none;">
        <div class="boxcontent">

            <div class="content">
                <div class="load">
                    <div class="spinner is-active" style="float:none;"></div>
                </div>

                <form action="" id="acf-flm-form-paste-layout">

                    <input type="hidden" name="action" value="_acf_flm_update_template_with_pasted_layout">
                    <input type="hidden" name="flexible" value="">
                    <input type="hidden" name="key" value="">

                    <div>
                        <label>
                            <h4><?php echo __( "Paste JSON data here:", 'acf-flexible-layouts-manager' ); ?></h4>
                            <textarea name="paste-code" id="json-code" cols="80" rows="10"></textarea>
                        </label>
                    </div>

                    <div>
                        <h4><?php echo __( "Behavior of the import:", 'acf-flexible-layouts-manager' ); ?></h4>
                        <label>
                            <input type="radio" value="add" name="comportement" checked><?php echo __( "Add to the other(s) layout(s)", 'acf-flexible-layouts-manager' ); ?>
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="radio" value="replace" name="comportement"><?php echo __( "Replace current layout(s)", 'acf-flexible-layouts-manager' ); ?>
                        </label>
                    </div>

                    <button type="submit" class="button button-primary" style="margin-top:20px;"><?php echo __( "Update", 'acf-flexible-layouts-manager' ); ?></button>

                </form>

            </div>
        </div>
    </div>
    
    <?php
}