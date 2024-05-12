setInterval(() => {
  const idleWarningScreen = document.querySelector(
    "div[class^=IdleWarningScreen]"
  );

  if (idleWarningScreen) {
    idleWarningScreen.querySelector("button").click();
  }
}, 3000);

var browser = typeof browser === "undefined" ? chrome : browser;

var s = document.createElement("script");
s.src = browser.runtime.getURL("js/script.js");
s.onload = () => {
  browser.storage.sync.get(
    [
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
    ],
    (settings) => {
      settings.url = browser.runtime.getURL("img/controls");
      window.dispatchEvent(
        new CustomEvent("startConfig", { detail: settings })
      );
    }
  );

  window.addEventListener("newButtonConfig", (e) => {
    const buttons = e.detail;
    chrome.storage.sync.set({ buttonConfig: buttons });
  });

  s.remove();
};
(document.head || document.documentElement).appendChild(s);
