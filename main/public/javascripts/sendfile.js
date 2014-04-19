/* Function to hide the file input box and allow for sending a file with just visible */

$(function() {
    $(".inputWrapper").mousedown(function() {
        var button = $(this);
        button.addClass('clicked');
        setTimeout(function(){
            button.removeClass('clicked');
        },50);
    });
});