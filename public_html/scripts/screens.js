(function () {
    "use strict";

    /**
     * Module creates and manipulates advertise screens
     * 
     * @method Screens
     * @param {Object} config - start configuration of module 
     * @returns {Object} - public methods
     */
    function Screens(config) {
         var screensElem = config.screensElem || null;

        /**
         * Method creates number of photo depends on number
         * 
         * @method getImageNumber
         * @param {string|number} num - number of photo
         * @returns {string}
         */
        function getImageNumber(num) {
            return Number(num) < 10 ? "0000" + num : "000" + num;
        }

        /**
         * Method renders screen item
         * 
         * @method renderScreenItem
         * @param {string|number} num
         * @returns {Object} - DOM element
         */
        function renderScreenItem(num) {
            var screen = document.createElement("img");

            screen.alt =  num;
            screen.src = "images/phone/phone_" + getImageNumber(num) + ".png";
            screen.className = "screen-item";
            screen.setAttribute("data-step", num);
            
            return screen; 
        }

        /**
         * Method renders screens
         * 
         * @method renderScreenItems
         * @returns {void} 
         */
        function renderScreenItems() {
            var itemsCount = 59,
                item = 0;

            for (item; item < itemsCount; item += 1) {
                if (screensElem) {
                    screensElem.appendChild(renderScreenItem(item));
                }
            }
        }

        /**
         * Method toggles screens depends on step
         * 
         * @method stepHandler
         * @param {number|string} - step
         * @returns {void}
         */
        function stepHandler(step) {
            var screenItem = screensElem.querySelector('[data-step="' + Math.round(step) + '"]'); 

            if (screenItem) {
                Array.prototype.forEach.call(screensElem.querySelectorAll('.screen-item'), function(element) {
                    element.style.display = "none";
                });

                screenItem.style.display = "inline";
            }
        }        

        (function init() {
            renderScreenItems();
        }())

        return {
            stepHandler: stepHandler
        }
    }

     window.advertising = window.advertising || {};
     window.advertising.Screens = Screens;
}())