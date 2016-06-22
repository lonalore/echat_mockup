var eChat = eChat || {'modal': {}, 'settings': {}, 'callbacks': {}};

(function ($) {

    eChat.settings = {
        'modal': {
            'max-width': 900,
            'max-height': 600
        }
    };

    $(document).ready(function () {
        eChat.modal = $('#eChatModal');
        eChat.modal.modal('show');

        eChat.modal.on('show.bs.modal', function () {

        });

        eChat.modal.on('shown.bs.modal', function () {
            eChat.callbacks.scrollMessagesToBottom();
            eChat.callbacks.initAutoGrow();
        });
    });

    eChat.callbacks.scrollMessagesToBottom = function () {
        var $section = $('.message-container');
        $section.stop().animate({scrollTop: $section.prop("scrollHeight")}, 500);
    };

    eChat.callbacks.initAutoGrow = function () {
        var $textarea = $('.message-container .message-input');
        $textarea.css('overflow', 'hidden').autogrow({
            vertical: true,
            horizontal: false
        });
        $textarea.on('keyup', function () {
            eChat.callbacks.scrollMessagesToBottom();
        });
    };

})(jQuery);
