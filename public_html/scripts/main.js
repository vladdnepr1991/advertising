(function (window) {
    "use strict";

    var elements = {},
        advertiseElem = null,
        Screens = null,
        ScreenEffects = null,
        Slider = null;

        /**
         * Method initializes DOM elements
         * 
         * @method initElements
         * @returns {void}
         */
        function initElements() {
            elements.advertiseWrapper = document.querySelector("#advertising-wrapper");
            elements.advertise = elements.advertiseWrapper && elements.advertiseWrapper.querySelector("#advertising");
            elements.screens = elements.advertise && elements.advertise.querySelector("#screen-items");
            elements.slider = document.querySelector("#slider");
            elements.scale = elements.slider && elements.slider.querySelector("#slider-scale");
            elements.handle = elements.slider && elements.slider.querySelector("#slider-handle");
            elements.closeWindow = elements.advertiseWrapper && elements.advertiseWrapper.querySelector("#close-window-wrapper");
        }

    /**
     * Method handles step changes
     *  
     * @method stepHandlers
     * @param {number} step
     * @returns {void}
     */
    function stepHandlers(step) {
        var imageNumber = step - 1,
            minPictureNumber = 0,
            maxPictureNumber = 58;

        imageNumber = imageNumber < minPictureNumber ? minPictureNumber : imageNumber;
        imageNumber = imageNumber > maxPictureNumber ? maxPictureNumber : imageNumber;

        Screens.stepHandler(imageNumber);
        ScreenEffects.stepHandler(step);            
    }

    /**
     * Method init modules
     * 
     * @method initModules
     * @returns {void} 
     */
    function initModules() {
        elements.advertiseWrapper.className = elements.advertiseWrapper.className.replace("loading", ""); 

        Screens = new window.advertising.Screens({
            screensElem: elements.screens
        });

        ScreenEffects = new window.advertising.ScreenEffects({});
    
        Slider = new window.advertising.Slider({
            module: elements.slider,
            scale: elements.scale,
            handle: elements.handle,
            steps: 60,
            stepHandler: stepHandlers,
            defaultStep: 0
        });

        elements.advertise.addEventListener("click", function (e) {
            window.open("/", '_blank');
        });        
    }

    function setEventListeners() {
        window.addEventListener("load", function () {
            initElements();
            initModules();

            elements.closeWindow.addEventListener("click", function () {
                advertiseElem = document.body.removeChild(elements.advertiseWrapper);

                return false;
            });
        });
    }

    (function init () {
        setEventListeners();
    }())
}(this));