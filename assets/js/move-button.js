jQuery(document).ready(function($){

    $('._acf_flm_add_layout_section').each(function(index){

        //Get the acf div with the flexible content informations
        var flexibleContent = $(this).parents('.acf-field-flexible-content');

        //Get the flexible name and key and add it into our custom div in data attribute
        $(this).attr('data-template-name', flexibleContent.attr('data-name'));
        $(this).attr('data-template-key', flexibleContent.attr('data-key'));

        //Put the custom div in the actions div of the flexible content
        var flexibleAction  = flexibleContent.find('> .acf-input > .acf-flexible-content > .acf-actions');
        flexibleAction.prepend($(this));

        //Show the section with button
        $(this).show();
        $(this).css('display', 'inline-block');

    });
});