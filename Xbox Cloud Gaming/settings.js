var browser = (typeof browser === "undefined") ? chrome : browser;

browser.storage.sync.get([
    "stickRadius",
    "buttonDiameter",
    "buttonBorderLeftOffset",
    "buttonBorderRightOffset",
    "buttonBorderTopOffset",
    "buttonBorderBottomOffset",
    "opacity",
    "enableColors",
    "enableDrawSticks",
    "disableTouchController",
    "buttonConfig",
], (settings) => {
    const stickRadiusElem = document.getElementById("stick-radius");
    const buttonDiameterElem = document.getElementById("button-diameter");
    const buttonBorderLeftOffsetElem = document.getElementById("button-border-left-offset");
    const buttonBorderRightOffsetElem = document.getElementById("button-border-right-offset");
    const buttonBorderTopOffsetElem = document.getElementById("button-border-top-offset");
    const buttonBorderBottomOffsetElem = document.getElementById("button-border-bottom-offset");
    const opacityElem = document.getElementById("opacity");
    const enableColorsElem = document.getElementById("enable-colors");
    const enableDrawSticksElem = document.getElementById("enable-draw-sticks");
    const disableTouchControllerElem = document.getElementById("disable-touchcontroller");
    const applyButtonElem = document.getElementById("apply-button");

    stickRadiusElem.value = settings.stickRadius;
    buttonDiameterElem.value = settings.buttonDiameter;
    buttonBorderLeftOffsetElem.value = settings.buttonBorderLeftOffset;
    buttonBorderRightOffsetElem.value = settings.buttonBorderRightOffset;
    buttonBorderTopOffsetElem.value = settings.buttonBorderTopOffset;
    buttonBorderBottomOffsetElem.value = settings.buttonBorderBottomOffset;
    opacityElem.value = settings.opacity;
    enableColorsElem.checked = settings.enableColors;
    enableDrawSticksElem.checked = settings.enableDrawSticks;
    disableTouchControllerElem.checked = settings.disableTouchController;

    applyButtonElem.onclick = () => {
        const startParams = {
            "stickRadius": parseInt(stickRadiusElem.value),
            "buttonDiameter": parseInt(buttonDiameterElem.value),
            "buttonBorderLeftOffset": parseInt(buttonBorderLeftOffsetElem.value),
            "buttonBorderRightOffset": parseInt(buttonBorderRightOffsetElem.value),
            "buttonBorderTopOffset": parseInt(buttonBorderTopOffsetElem.value),
            "buttonBorderBottomOffset": parseInt(buttonBorderBottomOffsetElem.value),
            "opacity": parseInt(opacityElem.value),
            "enableColors": enableColorsElem.checked,
            "enableDrawSticks": enableDrawSticksElem.checked,
            "disableTouchController": disableTouchControllerElem.checked,
        };
        browser.storage.sync.set(startParams, () => {
            chrome.tabs.reload();
        });
    }
});