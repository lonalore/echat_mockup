var eChat = eChat || {'modal': {}, 'settings': {}, 'callbacks': {}};

(function ($) {

    $(document).ready(function () {
        eChat.modal = $('#eChatModal');
        eChat.modal.modal('show');

        eChat.modal.on('shown.bs.modal', function (e) {
            eChat.callbacks.scrollMessagesToBottom();
        });
    });

    eChat.callbacks.scrollMessagesToBottom = function () {
        var $section = $('section.message-container');
        $section.animate({scrollTop: $section.prop("scrollHeight")}, 500);
    };

})(jQuery);
