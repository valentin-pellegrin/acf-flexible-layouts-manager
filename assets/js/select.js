jQuery(document).ready(function ($) {

    var template = $('._acf_flm_add_layout_section').attr('data-target');
    
    //Show the select button if is not a new page/post/term or user
    if( (typeof template !== 'undefined') && (template != 'new') && (template != '') ){
        $('.acf-flm-btn-select-layout').show();
    }

    $('.acf-flm-btn-select-layout').click(function(){

        //Get the current flexible name and the last flexible name open in the modal
        var currentFlexible = $(this).parent().attr('data-template-name');
        var key             = $(this).parent().attr('data-template-key');
        var oldFlexible     = $('#acf-flm-form-answer-custom-select-layout input[name="flexible_content"]').val();

        //Open the modal
        tb_show("Import Layout(s)", "#TB_inline?width=600&height=600&inlineId=acf-flm-thickbox-select-layout");

        //Remove loader and show the first table selection
        returnFirstStep();

        //If the modal has no content or if the last flexible is not the same has the current => Reload post
        if( ($('#acf-flm-select-post-table').html().length < 1) || (typeof oldFlexible === 'undefined')  || (currentFlexible != oldFlexible) ) {

            //Update hidden field with the current flexible
            $('#acf-flm-form-answer-custom-select-layout input[name="flexible_content"]').val(currentFlexible);
            //Add loader
            $('.boxcontent .content .load').addClass('is-active');

            data = { 
                action: 	'_acf_flm_get_all_posts_how_contains_current_flexible',
                flexible:   currentFlexible,
                key:        key
            };

            $.post(ajaxurl, data, function(response){
                
                if(response.success){

                    //Build the table structure
                    var rows = '<tr><th class="row-title">Pages / Posts / Custom Posts</th></tr>';

                    $.each(response.data, function(index, value){
                        //Add row in the table with every post/page/user/term how have the same flexible
                        rows += '<tr>' +
                            '<td class="row-title">' +
                            '<label for="tablecell">' +
                            '<a href="javascript:void(0);" class="page-id-click" data-post-id="' + value.post_id + '">' + value.post_title + '</a>' +
                            '</label>' +
                            '</td>' +
                            '</tr>';
                    });
                    //Update the table with the new data
                    $('#acf-flm-select-post-table').html(rows);
                    //Add the trigger on every item of the table
                    triggerCLickPageID();
                    //Remove loader
                    $('.boxcontent .content .load').removeClass('is-active');
                }

            });
        }
    });

    //Remove loader and show the first table selection
    function returnFirstStep(){
        $('.boxcontent .content #acf-flm-select-post-table').show();
        $('#acf-flm-btn-nav-select-layout').hide();
        $('.boxcontent .content .load').removeClass('is-active');
        $('.boxcontent .content .acf-flm-select-layout-result').removeClass('is-active');
        $('.boxcontent .content .acf-flm-select-layout-result #inputs-select').html('');
    }

    $('#return-select-post').click(function(){
        returnFirstStep();
    });

    //Click on one item of the table
    function triggerCLickPageID() {

        $('.page-id-click').click(function () {

            var pageLink    = $(this);
            var divContent  = pageLink.parents('.content');
            var flexible    = $(this).parents('.boxcontent').find('#acf-flm-form-answer-custom-select-layout input[name="flexible_content"]').val();

            //Add loader
            divContent.find('.load').addClass('is-active');

            data = {
                action: '_acf_flm_get_all_layout_templates',
                postid: pageLink.attr('data-post-id'),
                flexible: flexible
            };

            $.post(ajaxurl, data, function (response) {
                
                if (response.success) {
                    //Remove loader
                    divContent.find('.load').removeClass('is-active');
                    //Hide table
                    divContent.find('table').hide();
                    //Add post id cible in input hidden
                    divContent.find('.acf-flm-select-layout-result input[type="hidden"][name="post_id_cible"]').val(pageLink.attr('data-post-id'));
                    //Add title with the post name an the first checkbox to select all layouts
                    var inputs = '<h4>' + tradObject.selectTemplate + '</h4><ul><label><input type="checkbox" id="all" value="1" name="all">' + pageLink.text() + '</label></div>';
                    //Loop to add all layout checkbox
                    $.each(response.data, function (index, value) {
                        inputs += '<li><label><input type="checkbox" value="' + index + '" name="layout[]">' + value.acf_fc_layout + '</label></li>';
                    });
                    //Add radiobutton to select the behavior of the new layout with the post
                    inputs += '<div><h4>' + tradObject.behaviorTemplate + '</h4><label><input type="radio" value="add" name="comportement" checked>' + tradObject.addTemplate + '</label></div>';
                    inputs += '<div><label><input type="radio" value="replace" name="comportement">' + tradObject.replaceTemplate + '</label></div>';
                    //Add into the DOM the previous input
                    divContent.find('#acf-flm-form-answer-custom-select-layout #inputs-select').html(inputs);
                    //Show form final
                    divContent.find('.acf-flm-select-layout-result').addClass('is-active');
                    //Show buttons to send and go back
                    divContent.find('#acf-flm-btn-nav-select-layout').show();
                    //Checkbox to select or unselect every layout
                    $('#all').change(function () {
                        var all = $(this);
                        $('input[name^="layout"]').each(function () {
                            $(this).prop('checked', all.prop("checked"));
                        });
                    });

                }
            });
        });
    }

    $("form#acf-flm-form-answer-custom-select-layout").submit(function (e) {
        e.preventDefault();

        var checked = false;
        //Check if at least one checkbox is selected
        $('input[name^="layout"]').each(function () {
            if($(this).is(":checked"))
                checked = true;
        });

        if(!checked){
            alert(tradObject.noSelectTemplate);
        }else {
            var formdata = new FormData(this);
            //Add the current post id to the formdata before send it to ajax
            formdata.set('post_id_current', $('._acf_flm_add_layout_section').attr('data-target'));
            //Add loading
            $(this).parents('.content').find('.load').addClass('is-active');

            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: formdata,
                cache: false,
                dataType: 'json',
                processData: false,
                contentType: false,
                success: function (response) {
                    if(response.success){
                        location = location.href;
                    }
                }
            });
        }
    });
});