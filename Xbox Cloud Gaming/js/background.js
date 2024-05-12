chrome.runtime.onInstalled.addListener(() => {
    const startParams = {
        "stickRadius": 30,
        "buttonDiameter": 40,
        "buttonBorderLeftOffset": 30,
        "buttonBorderRightOffset": 30,
        "buttonBorderTopOffset": 30,
        "buttonBorderBottomOffset": 30,
        "opacity": 255,
        "enableColors": false,
        "enableDrawSticks": true,
        "disableTouchController": true,
        "buttonConfig": null
    };
    chrome.storage.sync.get([
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
        "buttonConfig"
    ], (settings) => {
        for (const key of Object.keys(settings)) {
            startParams[key] = settings[key];
        }
        chrome.storage.sync.set(startParams);
    });
});