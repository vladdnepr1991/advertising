(function (window) {
    "use strict";

    /**
     * Module creates slider
     * 
     * @method Slider
     * @param {Object} config - start configuration of module
     * @returns {Object} - public methods
     */
    function Slider(config) {
        var callbacks = {
                changeStep: config && config.stepHandler || null
            },
            elements = {
                module: config && config.module || null,
                scale: config && config.scale || null,
                handle: config && config.handle || null,                
            },
            steps = config && config.steps || 0,
            defaultStep = config && config.defaultStep || 0,
            scaleHeight = 0,
            handleHeight = 0,            
            stepOffset = 0,
            stepRange = 0,
            currentStep = 0,
            previousStep = 0,
            shiftY = 0;

        /**
         * Method gets style of DOM element
         * 
         * @method getStyleValue
         * @param {Object} elem
         * @param {string} style
         * @returns {string|number}
         */
        function getStyleValue (elem, style) {
            return getComputedStyle(elem)[style].replace("px", "");
        }

        /**
         * Method calculates range between steps
         * 
         * @method calculateStepRange
         * @returns {void}
         */
        function calculateStepRange() {
            stepRange = elements.scale ? Number(getStyleValue(elements.scale, "height")) / getStepsCount() : stepRange;
        }

        /**
         * Method calculates offset of selected step
         * 
         * @method calculateStepOffset
         * @returns {void}
         */
        function calculateStepOffset () {
            stepOffset = getStyleValue(elements.handle, "height") / (2 * stepRange);
        }

        /**
         * Method moves handle
         * 
         * @method moveHandle
         * @param {Object} event
         * @returns {boolean}
         */
        function moveHandle (event) {
            var handlePosition = event.pageY - elements.module.getBoundingClientRect().top - shiftY;

            handlePosition = handlePosition <= -(handleHeight/2) ? -(handleHeight/2) : handlePosition;
            handlePosition = handlePosition >= scaleHeight - (handleHeight/2) ? scaleHeight - (handleHeight/2) : handlePosition;
            elements.handle.style.top = handlePosition + "px";
            currentStep = Math.round((handlePosition / stepRange) + stepOffset);

            if (callbacks.changeStep && currentStep !== previousStep || callbacks.changeStep && currentStep === 0) {
                callbacks.changeStep(currentStep);
            }

            previousStep = previousStep === currentStep ? previousStep : currentStep;

            return false;
        }

        /**
         * Method stops transition of sliders handle
         * 
         * @method stopHandleMotion
         * @returns {void}
         */
        function stopHandleMotion () {
            document.removeEventListener("mousemove", moveHandle, false);
            document.removeEventListener("mouseup", stopHandleMotion, false);
        }

        /**
         * Method changes handle position
         * 
         * @method changeHandlePosition
         * @param {Object}
         * @returns {boolean}
         */
        function changeHandlePosition (event) {
            shiftY = event.pageY - elements.handle.getBoundingClientRect().top;

            document.addEventListener("mousemove", moveHandle, false);
            document.addEventListener("mouseup", stopHandleMotion, false);

            return false;
        }

        /**
         * Method sets event handlers
         *  
         * @method setEventListeners
         * @returns {void}
         */
        function setEventListeners() {
            if (elements.handle) {
                elements.handle.addEventListener("mousedown", changeHandlePosition, false);
            }         
        }

        /**
         * Method sets handler fot slider step changing
         * 
         * @method setStepHandler
         * @returns {Object} slider
         */
        function setStepHandler (callback) {
            callbacks.changeStep = callback && typeof callback === "function" ? callback : callbacks.changeStep;

            return this;
        }

        /**
         * Method sets steps for slider
         * 
         * @method setStepsCount
         * @param {number} stepsCount - number of slider position
         * @returns {Object} slider
         */
        function setStepsCount(stepsCount) {
            steps = typeof stepsCount === "number" && !isNaN(stepsCount) && isFinite(stepsCount) ? stepsCount : steps;

            return this;
        }

        /**
         * Method sets start point of handler
         * 
         * @method setStartPosition
         * @param {number}
         * @returns {void}
         */
        function setStartPosition(step) {
            elements.handle.style.top = Number(stepRange * step) - stepOffset + "px";
            currentStep = Math.round(step);

            if (callbacks.changeStep && currentStep !== previousStep || callbacks.changeStep && currentStep === 0) {
                callbacks.changeStep(currentStep);
            }

            previousStep = previousStep === currentStep ? previousStep : currentStep;
        }

        /**
         * Method returns maximum steps count
         *  
         * @method getStepsCount
         * @returns {number}
         */
        function getStepsCount() {
            return Number(steps);
        }           

        (function init() {
            scaleHeight = getStyleValue(elements.scale, "height");
            handleHeight = getStyleValue(elements.handle, "height");
            
            setEventListeners();
            calculateStepRange();
            calculateStepOffset();
            setStartPosition(defaultStep);
        }())

        return {
            setStepsCount: setStepsCount,
            setStepHandler: setStepHandler, 
            getStepsCount: getStepsCount
        };  
    }

    window.advertising = window.advertising || {};
    window.advertising.Slider = Slider;
}(this));