(function (window) {
	"use strict";

	/**
	 * Module creates and manipulates animations
	 * 
	 * @method ScreenEffects
	 * @param {Object} config - start configuration of module
	 * @returns {Object} - public methods
	 */
	function ScreenEffects(config) {
		var elements = {
				flash: document.querySelector("#flash") || null,
				rain: document.querySelector("#rain") || null,
				video: document.querySelector("#video-advertising-wrapper") || null,
				phoneHighlight: document.querySelector("#phone-highlights") || null,
				phoneInternals: document.querySelector("#phone-internals") || null, 
				phoneInternalsFrame: document.querySelector("#phone-internals-frame") || null,
				cardHighlight: document.querySelector("#card-highlight-wrapper") || null,
				features: document.querySelectorAll(".feature-item") || []
			},
			classNames = {
				animatedCls: "animated",
				dropItemCls: "drop-item",
				unvisibleCls: "unvisible",
				visibleCls: "visible",
				dropClasses: ["drop-1", "drop-2", "drop-3", "drop-4"]
			},
			dropImages = ["images/raindrop_1.png", "images/raindrop_2.png", "images/raindrop_3.png", "images/raindrop_4.png"],
			rainWrapperWidth = elements.rain ? getComputedStyle(elements.rain).width.replace("px", "") : 0,
			rainWrapperHeight = elements.rain ? getComputedStyle(elements.rain).height.replace("px", "") : 0, 
			dropLimit = 200,
			dropsCount = 0,
			handlersDefaultCollection = {},
			interval = null,
			removeDropTimeout = null;

		/**
		 * Method calculates random number limited by range
		 * 
		 * @method randomIntFromInterval
		 * @param {number|string} min
		 * @param {number|string} max
		 * @returns {void}
		 */
		function randomIntFromInterval(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		}

		/**
		 * Method toggles display state of element depends on state
		 * 
		 * @method toggleDisplayState
		 * @param {Object} elem
		 * @param {boolean} state
		 * @return {void}
		 */
		function toggleDisplayState(elem, state) {
			elem.style.display = state ? "block" : "none";
		}

		/**
		 * Method toggles className of element depends on state
		 * 
		 * @method toggleClass
		 * @param {Object} elem
		 * @param {string|number} cls
		 * @param {boolean} state
		 * @returns {void}
		 */
		function toggleClass(elem, cls, state) {
			if (state && elem && elem.className.indexOf(cls) === -1) {
				elem.className += " " + cls;
			} else if (!state && elem) {
				while (elem && elem.className.indexOf(cls) !== -1) {
					elem.className = elem.className.replace(cls, "").trim();    
				}
			}
		};        

		/**
		 * Method renders drop item
		 * 
		 * @method renderDropItem
		 * @param {Object} config
		 * @returns {Object} - DOM element
		 */
		function renderDropItem(config) {
			var drop = document.createElement("img");

			drop.style.top = config.top + "px";
			drop.style.left = config.left + "px";
			drop.src = config.src;

			toggleClass(drop, config.className, true);
			toggleClass(drop, config.additionalClassName, true);            

			return drop;
		}

		/**
		 * Method animates flashlight
		 * 
		 * @method animateFlash
		 * @returns {void}
		 */
		function animateFlash() {
			var elem = elements.flash,
				animate = classNames.animatedCls;

			if (elem) {
				toggleClass(elem, animate, false);
				toggleClass(elem, animate, true);

				window.setTimeout(function () {
					toggleClass(elem, animate, false);
				}, 300);
			}
		}

		/**
		 * Method animates drops
		 * 
		 * @method dropAnimation
		 * @returns {void}
		 */
		function dropAnimation() {
			var rainWrapper = elements.rain,
				rand = randomIntFromInterval(0, classNames.dropClasses.length - 1),
				dropElem = null;     

			dropsCount += 1;

			dropElem = renderDropItem({
				className: classNames.dropItemCls,
				additionalClassName: classNames.dropClasses[rand],
				top: randomIntFromInterval(0, rainWrapperHeight),
				left: randomIntFromInterval(0, rainWrapperWidth),
				src: dropImages[rand]
			});

			if (rainWrapper) {
				rainWrapper.appendChild(dropElem);
			}

			window.setTimeout(function () {
				toggleClass(dropElem, "origin-size", true);
			}, 50);            

			window.setTimeout(function () {
				dropElem.style.top = rainWrapperHeight + "px";
				dropElem.style.width = "3px";
			}, 500);

			if (rainWrapper) {
				window.setTimeout(function () {
					rainWrapper.removeChild(dropElem);    
				}, 3000);
			}                
			
			if (dropsCount >= dropLimit && interval) {
				clearInterval(interval);
			}
		}

		/**
		 * Method starts rain animation
		 * 
		 * @method animateRain
		 * @returns {void}
		 */
		function animateRain() {
			var rainWrapper = elements.rain;

				if (interval) {
					clearInterval(interval);
				}

			if (rainWrapper) {
				toggleClass(rainWrapper, classNames.unvisibleCls, false);
			}

			dropsCount = 0;
			interval = window.setInterval(dropAnimation, 100);
		}

		/**
		 * Method stops rain animation
		 * 
		 * @method stopRainAnimate
		 * @returns {void}
		 */
		function stopRainAnimate() {
			if (interval) {
				clearInterval(interval);
			}

			if (elements.rain && elements.rain.className.indexOf(classNames.unvisibleCls) === -1) {
				toggleClass(elements.rain, classNames.unvisibleCls, true);
			}
		}

		/**
		 * Method manipulates video advertising
		 * 
		 * @method videoAdvertisingHandler
		 * @returns {void}
		 */
		function videoAdvertisingHandler() {
			var player = window.advertising.videoAdvertising.player;
 
			stopRainAnimate();
			toggleDisplayState(elements.video, true);
			toggleDisplayState(elements.phoneHighlight, true); 
			
			if (player && player.playVideo) {
				player.playVideo();
			}
		}

		/**
		 * Method contais additional step handlers
		 * 
		 * @method additionalHandlers
		 * @param {string|number} step
		 * @returns {void}
		 */
		function additionalHandlers(step) {
			var player = window.advertising.videoAdvertising.player;

			if (Number(step) !== 0) {
				toggleDisplayState(elements.video, false);
				toggleDisplayState(elements.phoneHighlight, false); 
				
				if (player && player.pauseVideo) {
					player.pauseVideo();
				}
			}

			if (Number(step) !== 60) {
				toggleClass(elements.phoneInternals, classNames.visibleCls, false);
				toggleClass(elements.phoneInternalsFrame, classNames.visibleCls, false);
				toggleClass(elements.cardHighlight, classNames.animatedCls, false);
			}
		}


		/**
		 * Method shows phone internals
		 * 
		 * @method showPhoneInternals
		 * @return {void}
		 */
		function showPhoneInternals() {
				toggleClass(elements.phoneInternals, classNames.visibleCls, true);
				toggleClass(elements.phoneInternalsFrame, classNames.visibleCls, true);
				toggleClass(elements.cardHighlight, classNames.animatedCls, true);
		}

		/**
		 * Method show phone feature description
		 * 
		 * @method showFeature
		 * @param {number|string} featureNumber
		 * @returns {void}
		 */
		function showFeature(featureNumber) {
			Array.prototype.forEach.call(elements.features, function(feature) {
				toggleClass(feature, classNames.visibleCls, false);
			});

			toggleClass(elements.features[Number(featureNumber)], classNames.visibleCls, true);
		}

		/**
		 * Method shows first feature 
		 * 
		 * @method showFeatureOne
		 * @returns {void}
		 */
		function showFeatureOne() {
			showFeature(0);
		}

		/**
		 * Method shows second feature 
		 * 
		 * @method showFeatureTwo
		 * @returns {void}
		 */
		function showFeatureTwo() {
			showFeature(1);
		}

		/**
		 * Method shows third feature 
		 * 
		 * @method showFeatureThree
		 * @returns {void}
		 */
		function showFeatureThree() {
			showFeature(2);
		}

		/**
		 * Method shows fourth feature 
		 * 
		 * @method showFeatureFour
		 * @returns {void}
		 */
		function showFeatureFour() {
			showFeature(3);
		}        

		/**
		 * Method ads step handler 
		 * @method addHandler
		 * @param {number|string} step
		 * @param {Function} handler
		 * @returns void
		 */
		function addHandler(step, handler) {
			handlersDefaultCollection[step] = handlersDefaultCollection[step] || [];

			if (typeof handler === "function") {
				handlersDefaultCollection[step].push(handler);
			}
		}

		/**
		 * Method sets the same handler to range of steps
		 * 
		 * @method addSeveralStepHandlers
		 * @param {number|string} from
		 * @param {number|string} to
		 * @param {Function} handler
		 * @returns {void}
		 */
		function addSeveralStepHandlers(from, to, handler) {
			var from = Number(from),
				to = Number(to);

			for (from; from <= to; from += 1) {
				addHandler(from, handler)
			}
		}

		/**
		 * Method runs handler list depends on step
		 * 
		 * @method stepHandler
		 * @param {number|string} step
		 * @returns {void}
		 */
		function stepHandler(step) {
			if (handlersDefaultCollection[step] && Array.isArray(handlersDefaultCollection[step])) {
				handlersDefaultCollection[step].forEach(function (handler) {
					handler();
				});
			}

			additionalHandlers(step);
		}

		(function init() {
			addSeveralStepHandlers("0", "3", showFeatureOne);
			addSeveralStepHandlers("4", "23", showFeatureTwo);
			addSeveralStepHandlers("24", "49", showFeatureThree);
			addSeveralStepHandlers("50", "60", showFeatureFour);
			addSeveralStepHandlers("2", "19", animateRain);
			addSeveralStepHandlers("20", "26", stopRainAnimate);
			addHandler("0", videoAdvertisingHandler);
			addHandler("1", stopRainAnimate);
			addHandler("20", stopRainAnimate);
			addHandler("27", animateFlash);
			addHandler("60", showPhoneInternals);
		}())

		return {
			stepHandler: stepHandler
		}
	}

	window.advertising = window.advertising || {};
	window.advertising.ScreenEffects = ScreenEffects; 
}(this))