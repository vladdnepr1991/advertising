(function (window) {
    "use strict"; 

    function init() {
        window.advertising.videoAdvertising.player.playVideo();
    }

    window.onYouTubeIframeAPIReady = function () {
        window.advertising.videoAdvertising.player = new YT.Player('video-advertising', {
            height: '197',
            width: '362',
            videoId: '9xKR8Vcjias',
            events: {
                'onReady': window.advertising.videoAdvertising.init
            }          
        });
    }

    window.advertising = window.advertising || {};
    window.advertising.videoAdvertising = {
        player: null,
        init: init
    };
}(this))
