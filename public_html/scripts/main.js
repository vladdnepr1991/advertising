(function () {
	"use strict";

	var elements = {},
		Screens = null,
		ScreenEffects = null,
		Slider = null;

	function initElements() {
		elements.advertiseWrapper = document.querySelector("#advertising-wrapper");
		elements.advertise = elements.advertiseWrapper && elements.advertiseWrapper.querySelector("#advertising");
		elements.screens = elements.advertise && elements.advertise.querySelector("#screen-items");
		elements.slider = document.querySelector("#slider");
		elements.scale = elements.slider && elements.slider.querySelector("#slider-scale");
		elements.handle = elements.slider && elements.slider.querySelector("#slider-handle");
	}

	function stepHandlers(step) {
		var imageNumber = step - 1;

		imageNumber = imageNumber < 0 ? 0 : imageNumber;
		imageNumber = imageNumber > 58 ? 58 : imageNumber;

		Screens.stepHandler(imageNumber);
		ScreenEffects.stepHandler(step);
	}

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

		elements.advertise.addEventListener("click", function () {
			window.open("/", "_blank");
		});
	}

	(function init() {
		window.addEventListener("load", function () {
			initElements();
			initModules();
		});
	}());
} ());