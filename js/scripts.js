var eChat = eChat || {'modal': {}, 'settings': {}, 'callbacks': {}};

(function ($) {

    eChat.settings = {
        'modal': {
            'max-width': 900,
            'max-height': 650
        }
    };


    $(document).ready(function () {
        eChat.modal = $('#eChatModal');
        eChat.modal.modal('show');

        eChat.modal.on('shown.bs.modal', function () {
            eChat.callbacks.perfectScrollingInit();
            eChat.callbacks.scrollMessagesToBottom();
            eChat.callbacks.initAutoGrow();
            eChat.callbacks.setModalHeight();
            eChat.callbacks.setModalWidth();
        });

        $(window).resize(function () {
            eChat.callbacks.waitForFinalEvent(function () {
                if (eChat.modal.hasClass('in')) {
                    eChat.callbacks.setModalHeight();
                    eChat.callbacks.setModalWidth();
                }
            }, 500, 'setModalHeight');
        });

        $('[data-toggle="echat-popover-menu"]').popover({
            html: true,
            placement: 'top',
            container: 'body',
            content: function () {
                return $('#smileys').html();
            },
            title: function () {
                return 'Smileys';
            }
        });

        $(document).on('click', function (e) {
            $('[data-toggle="echat-popover-menu"]').each(function () {
                var $this = $(this);
                if (!$this.is(e.target) && $this.has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                    $this.popover('hide');
                }
            });
        });
    });


    eChat.callbacks.perfectScrollingInit = function () {
        $('#eChatModal .user-list-container').perfectScrollbar();
        $('#eChatModal .message-container').perfectScrollbar();
    };


    eChat.callbacks.perfectScrollingUpdate = function () {
        $('#eChatModal .user-list-container').perfectScrollbar('update');
        $('#eChatModal .message-container').perfectScrollbar('update');
    };


    eChat.callbacks.scrollMessagesToBottom = function () {
        var $section = $('#eChatModal .message-container');
        $section.stop().animate({scrollTop: $section.prop("scrollHeight")}, 500, function () {
            eChat.modal.find('.message-input').focus();
        });
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


    eChat.callbacks.setModalHeight = function () {
        var $window = $(window);
        var windowHeight = $window.outerHeight(true);
        var modalHeaderHeight = eChat.modal.find('.modal-header').outerHeight(true);
        var modalFooterHeight = eChat.modal.find('.modal-footer').outerHeight(true);
        var modalBodyHeight = windowHeight - modalHeaderHeight - modalFooterHeight;
        var modalBodyMaxHeight = eChat.settings.modal['max-height'] - modalHeaderHeight - modalFooterHeight;

        eChat.modal.find('.modal-body').css('max-height', modalBodyMaxHeight);
        eChat.modal.find('.user-list-container').css('max-height', modalBodyMaxHeight);
        eChat.modal.find('.message-container').css('max-height', modalBodyMaxHeight);

        eChat.modal.find('.modal-body').css('height', modalBodyHeight);
        eChat.modal.find('.user-list-container').css('height', modalBodyHeight);
        eChat.modal.find('.message-container').css('height', modalBodyHeight);

        if (eChat.settings.modal['max-height'] >= windowHeight) {
            eChat.modal.find('.modal-dialog').addClass('no-margin-top');
        }
        else {
            var modalHeight = eChat.modal.find('.modal-dialog').outerHeight();
            var modalMarginTop = (windowHeight - modalHeight) / 2;

            eChat.modal.find('.modal-dialog').removeClass('no-margin-top');
            eChat.modal.find('.modal-dialog').css('margin-top', modalMarginTop + 'px');
        }

        eChat.callbacks.perfectScrollingUpdate();
        eChat.callbacks.scrollMessagesToBottom();
    };


    eChat.callbacks.setModalWidth = function () {
        var $window = $(window);
        var windowWidth = $window.outerWidth(true);

        if (eChat.settings.modal['max-width'] >= windowWidth) {
            eChat.modal.find('.modal-dialog').addClass('no-margin-left-right');
            eChat.modal.find('.user-list-container').removeClass('always-visible');
            eChat.modal.find('.message-container').removeClass('always-visible');
        }
        else {
            eChat.modal.find('.modal-dialog').removeClass('no-margin-left-right');
            eChat.modal.find('.user-list-container').addClass('always-visible');
            eChat.modal.find('.message-container').addClass('always-visible');
        }
    };


    eChat.callbacks.waitForFinalEvent = (function () {
        var timers = {};
        return function (callback, ms, uniqueId) {
            if (!uniqueId) {
                uniqueId = "Don't call this twice without a uniqueId";
            }
            if (timers[uniqueId]) {
                clearTimeout(timers[uniqueId]);
            }
            timers[uniqueId] = setTimeout(callback, ms);
        };
    })();

})(jQuery);
