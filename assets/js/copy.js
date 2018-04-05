jQuery(document).ready(function($){

    $('._acf_flm_add_layout_section').each(function(index){

        var customDiv           = $(this);
        var template            = customDiv.attr('data-target');
        var flexibleLayout      = customDiv.parents('.acf-field-flexible-content').find('> .acf-input > .acf-flexible-content > .values > .layout');

        if( (typeof template !== 'undefined') && (template != 'new') && (template != '') ){

            data = {
                action: 	'_acf_flm_get_all_layout_templates',
                postid: 	template,
                flexible:   customDiv.attr('data-template-name'),
                key:        customDiv.attr('data-template-key')
            };

            $.post(ajaxurl, data, function(response){
                if(response.success){

                    flexibleLayout.each(function(index){

                        //Get the name of the layout
                        var name        = $(this).children('input[type="hidden"]').attr('name');

                        //Find the position of the second array in the name. Exemple acf[field_5ac35fefd0d75][3][acf_fc_layout] or acf[field_5ac35fefd0d75][5ac483673c181][acf_fc_layout]
                        var $start      = name.indexOf('[', name.indexOf('[') + 1);
                        var $end        = name.indexOf(']', name.indexOf(']') + 1);

                        $start++;
                        //Position of the layout in the template. With the previous exemple : 3 or 5ac483673c181
                        var position    = name.substr($start, $end - $start);

                        //Create input invisible to store JSON and allow auto copy for one layout
                        var input = document.createElement("input");
                        input.setAttribute("type", "text");
                        input.setAttribute("style", "clip: rect(0,0,0,0); clip-path: rect(0,0,0,0); position: absolute;");
                        input.setAttribute("id", "copy-the-layout");
                        input.setAttribute("value", JSON.stringify([response.data[position]]));
                        
                        //Add the input in the dom
                        $(this).append(input);
                        
                        //Add the icone copy
                        $(this).find('> .acf-fc-layout-controlls a.acf-icon.-plus.-sync.small.light.acf-js-tooltip.acf-icon-clone').before('<a class="acf-icon -plus -search small light acf-js-tooltip acf-icon-copy" href="javascript:void(0);" title="' + tradObject.copy + '"></a>');
                        
                        //Add click listeneur for one template
                        $(this).find('.acf-icon-copy').click(function(){

                            $(this).parent('.acf-fc-layout-controlls').siblings('input[type="text"]').select();
                            var successful = document.execCommand('copy');

                            if(successful){
                                alert(tradObject.copied);
                            }else {
                                console.log('erreur');
                            }

                        });
                    });
                    
                    //Add JSON content into the input for the copy of the all layout
                    customDiv.find('.acf-flm-input-copy-all-layouts').val(JSON.stringify(response.data));
                    customDiv.find('.acf-flm-btn-copy-all-layouts').show();
                    
                } else {
                    console.log("Problem with AJAX get template");
                }
            });

            //Copy all the template of this flexible content
            customDiv.find('.acf-flm-btn-copy-all-layouts').click(function(){

                $(this).find('.acf-flm-input-copy-all-layouts').select();
                var successful = document.execCommand('copy');

                if (successful) {
                    $(this).text(tradObject.copiedPlurial);
                    $(this).addClass('button-disabled');
                } else {
                    console.log('erreur');
                }

            });
        }
    });
});