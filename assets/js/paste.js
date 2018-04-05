jQuery(document).ready(function ($) {

    var template = $('._acf_flm_add_layout_section').attr('data-target');

    //Show the past button if is not a new page/post/term or user
    if( (typeof template !== 'undefined') && (template != 'new') && (template != '') ){
        $('.acf-flm-btn-past-layout').show();
    }

    $("form#acf-flm-form-paste-layout").submit(function (e) {
        e.preventDefault();

        try {
            //If no value
            if( !$('#json-code').val() )
                throw "No data";

            //If the value is not a JSON object
            if( (typeof JSON.parse($('#json-code').val())) != 'object')
                throw "Not Object";

            var formdata = new FormData(this);

            //Add the post_id in the formdata
            formdata.set('post_id', template);

            //Add loader
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

        } catch (e) {
            alert(tradObject.problemPasteData);
        }

    });

    $('.acf-flm-btn-past-layout').click(function(){
        //Add value on input hidden in modal
        $('#acf-flm-thickbox-paste-layout #acf-flm-form-paste-layout input[name="flexible"]').val($(this).parent().attr('data-template-name'));
        $('#acf-flm-thickbox-paste-layout #acf-flm-form-paste-layout input[name="key"]').val($(this).parent().attr('data-template-key'));
        
        //Open modal
        tb_show("Paste Layout(s)", "#TB_inline?width=600&height=500&inlineId=acf-flm-thickbox-paste-layout");
    });

});