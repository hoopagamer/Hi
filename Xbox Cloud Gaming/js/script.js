const main = () => {
    let config = null;

    window.addEventListener("startConfig", (e) => {
        config = e.detail;
        setup();
    });

    const setup = () => {
        const main = document.createElement("div");
        const touchElem = document.createElement("span");
        const canvasElem = document.createElement("canvas");
        const canvasCtx = canvasElem.getContext("2d");

        canvasElem.style.cssText = "width:100%;height:100%;top:0;left:0;position:fixed;overflow:hidden;touch-action:none;";
        canvasElem.width = window.innerWidth;
        canvasElem.height = window.innerHeight;
        touchElem.style.display = "none";

        const disableButton = document.createElement('button')
        disableButton.id = "disableController"
        disableButton.style.position = "absolute";
        disableButton.style.top = "0.5rem";
        disableButton.style.left = "calc(50% - 24px)";
        disableButton.style.cssText = "box-sizing: border-box;margin: 0;overflow: visible;text-transform: none;padding: 0;display: flex;word-break: break-word;-webkit-box-align: center;align-items: center;font-size: 14px;line-height: 18px;font-family: Segoe UI, Arial, Helvetica, sans-serif;font-weight: unset;flex-shrink: 0;-webkit-box-pack: center;justify-content: center;text-align: center;padding-left: unset;padding-right: unset;width: 40px;height: 40px;min-width: unset;border-radius: 20px;cursor: pointer;background-color: #008746ff;color: #ffffff;fill: #ffffff;border: 2px solid #00000000;position: absolute;top: 0.5rem;left: calc(50% - 24px);";
        disableButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" width="32" height="32" style="text-transform: none;word-break: break-word;font-size: 14px;line-height: 18px;font-family: Segoe UI, Arial, Helvetica, sans-serif;font-weight: unset;text-align: center;cursor: pointer;color: #ffffff;box-sizing: border-box;overflow: hidden;vertical-align: middle;fill: currentColor;flex-shrink: 0;height: 16px;width: 16px;margin: 0;">
                <path d="M1791 1538q35 0 64.5 -17.5t46.5 -47t17 -63.5v-768q0 -53 -37.5 -90.5t-90.5 -37.5h-1536q-53 0 -90.5 37.5t-37.5 90.5v768q0 34 17 63.5t46.5 47t64.5 17.5h1536zM255 642h1536v768h-1536v-768zM702 770h-128v187h-191v128h191v197h128v-197h193v-128h-193v-187zM1279 804.5q-59 34.5 -93.5 93t-34.5 128.5q0 69 34.5 128t93.5 93.5t128 34.5t128 -34.5t93.5 -93.5t34.5 -128q0 -70 -34.5 -128.5t-93.5 -93t-128 -34.5t-128 34.5zM1279 1026q0 -55 38 -91q37 -37 90 -37q52 0 91 37q37 37 37 91q0 53 -37 90q-40 38 -91 38q-52 0 -90 -38q-38 -36 -38 -90z"></path>
            </svg>
        `

        let disableButtonElem

        disableButton.ontouchend = (e) => {
            e.preventDefault()
            if (layoutMode) {
                document.getElementById("game-stream").focus()
                layoutMode = false;
                disableButtonElem.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" width="32" height="32" style="text-transform: none;word-break: break-word;font-size: 14px;line-height: 18px;font-family: Segoe UI, Arial, Helvetica, sans-serif;font-weight: unset;text-align: center;cursor: pointer;color: #ffffff;box-sizing: border-box;overflow: hidden;vertical-align: middle;fill: currentColor;flex-shrink: 0;height: 16px;width: 16px;margin: 0;">
                        <path d="M1791 1538q35 0 64.5 -17.5t46.5 -47t17 -63.5v-768q0 -53 -37.5 -90.5t-90.5 -37.5h-1536q-53 0 -90.5 37.5t-37.5 90.5v768q0 34 17 63.5t46.5 47t64.5 17.5h1536zM255 642h1536v768h-1536v-768zM702 770h-128v187h-191v128h191v197h128v-197h193v-128h-193v-187zM1279 804.5q-59 34.5 -93.5 93t-34.5 128.5q0 69 34.5 128t93.5 93.5t128 34.5t128 -34.5t93.5 -93.5t34.5 -128q0 -70 -34.5 -128.5t-93.5 -93t-128 -34.5t-128 34.5zM1279 1026q0 -55 38 -91q37 -37 90 -37q52 0 91 37q37 37 37 91q0 53 -37 90q-40 38 -91 38q-52 0 -90 -38q-38 -36 -38 -90z"></path>
                    </svg>
                `
                return
            }
            config.disableTouchController = !config.disableTouchController
            updateVisibility()
        }

        disableButton.onmousedown = (e) => {
            disableButtonElem.remove()
        }

        disableButton.addEventListener("contextmenu", (e) => {
            e.preventDefault()
            document.getElementById("game-stream").focus()
            config.disableTouchController = false
            layoutMode = !layoutMode
            disableButtonElem.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="32" height="32" style="width: 16px;height: 16px;">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>          
            `
            updateVisibility()
        })

        const startTime = Date.now();

        let layoutMode = false;

        const stickLColor = "#82b4ff";
        let stickLActive = false;
        let stickLStartX = 0;
        let stickLStartY = 0;
        let stickLEndX = 0;
        let stickLEndY = 0;
        let stickLDeltaX = 0;
        let stickLDeltaY = 0;

        const stickRColor = "#ff8a82";
        let stickRActive = false;
        let stickRStartX = 0;
        let stickRStartY = 0;
        let stickREndX = 0;
        let stickREndY = 0;
        let stickRDeltaX = 0;
        let stickRDeltaY = 0;

        const emulatedGamepad = {
            id: "Xbox 360 Gamepad",
            index: 0,
            connected: true,
            timestamp: 0,
            mapping: "standard",
            axes: [0, 0, 0, 0],
            buttons: [
                {
                    label: "A",
                    color: "#7dc242",
                    locRight: config.buttonDiameter + config.buttonBorderRightOffset,
                    locBottom: config.buttonBorderBottomOffset,
                    scale: 1,
                    img: "A"
                },
                {
                    label: "B",
                    color: "#ed1c24",
                    locRight: config.buttonBorderRightOffset,
                    locBottom: config.buttonDiameter + config.buttonBorderBottomOffset,
                    scale: 1,
                    img: "B"
                },
                {
                    label: "X",
                    color: "#24bcee",
                    locRight: (config.buttonDiameter * 2) + config.buttonBorderRightOffset,
                    locBottom: config.buttonDiameter + config.buttonBorderBottomOffset,
                    scale: 1,
                    img: "X"
                },
                {
                    label: "Y",
                    color: "#f0ea1b",
                    locRight: config.buttonDiameter + config.buttonBorderRightOffset,
                    locBottom: (config.buttonDiameter * 2) + config.buttonBorderBottomOffset,
                    scale: 1,
                    img: "Y"
                },
                {
                    label: "L1",
                    color: "#636466",
                    locLeft: `${config.buttonBorderLeftOffset}px`,
                    locTop: (config.buttonDiameter * 1.4) + config.buttonBorderTopOffset + "px",
                    scale: 2,
                    img: "L1"
                },
                {
                    label: "R1",
                    color: "#636466",
                    locRight: 0 + config.buttonBorderRightOffset,
                    locTop: (config.buttonDiameter * 1.4) + config.buttonBorderTopOffset + "px",
                    scale: 2,
                    img: "R1"
                },
                {
                    label: "L2",
                    color: "#636466",
                    locLeft: config.buttonBorderLeftOffset + "px",
                    locTop: config.buttonBorderTopOffset + "px",
                    scale: 2,
                    img: "L2"
                },
                {
                    label: "R2",
                    color: "#636466",
                    locRight: config.buttonBorderRightOffset,
                    locTop: config.buttonBorderTopOffset + "px",
                    scale: 2,
                    img: "R2"
                },
                {
                    label: "Se",
                    color: "#636466",
                    locLeft: (config.buttonDiameter * 5) + config.buttonBorderLeftOffset + "px",
                    locTop: (config.buttonDiameter * 1.1) + config.buttonBorderTopOffset + "px",
                    scale: 1.2,
                    img: "select"
                },
                {
                    label: "St",
                    color: "#636466",
                    locRight: (config.buttonDiameter * 5) + config.buttonBorderRightOffset,
                    locTop: (config.buttonDiameter * 1.1) + config.buttonBorderTopOffset + "px",
                    scale: 1.2,
                    img: "start"
                },
                {
                    label: "L3",
                    color: "#7a24ee",
                    locLeft: (config.buttonDiameter * 5) + config.buttonBorderLeftOffset + "px",
                    locBottom: 0 + config.buttonBorderBottomOffset,
                    scale: 1,
                    img: "L3"
                },
                {
                    label: "R3",
                    color: "#7a24ee",
                    locRight: (config.buttonDiameter * 5) + config.buttonBorderRightOffset,
                    locBottom: config.buttonBorderBottomOffset,
                    scale: 1,
                    img: "R3"
                },
                {
                    label: "⇧",
                    color: "#636466",
                    locLeft: config.buttonDiameter + config.buttonBorderLeftOffset + "px",
                    locBottom: (config.buttonDiameter * 2) + config.buttonBorderBottomOffset,
                    scale: 1,
                    img: "up"
                },
                {
                    label: "⇩",
                    color: "#636466",
                    locLeft: config.buttonDiameter + config.buttonBorderLeftOffset + "px",
                    locBottom: 0 + config.buttonBorderBottomOffset,
                    scale: 1,
                    img: "down"
                },
                {
                    label: "⇦",
                    color: "#636466",
                    locLeft: config.buttonBorderLeftOffset + "px",
                    locBottom: config.buttonDiameter + config.buttonBorderBottomOffset,
                    scale: 1,
                    img: "left"
                },
                {
                    label: "⇨",
                    color: "#636466",
                    locLeft: (config.buttonDiameter * 2) + config.buttonBorderLeftOffset + "px",
                    locBottom: config.buttonDiameter + config.buttonBorderBottomOffset,
                    scale: 1,
                    img: "right"
                },
                {
                    label: "H",
                    color: "#ed591c",
                    locLeft: `calc(50% - ${config.buttonDiameter / 2}px)`,
                    locBottom: config.buttonBorderBottomOffset,
                    scale: 1,
                    img: "home"
                }
            ]
        };

        if (typeof config.buttonConfig !== "undefined" && config.buttonConfig !== null) emulatedGamepad.buttons = config.buttonConfig.slice();

        emulatedGamepad.buttons.forEach((button) => {
            const buttonElem = document.createElement("img");
            buttonElem.src = `${config.url}/${button.img}.svg`;
            buttonElem.style.position = "fixed";
            buttonElem.style.width = config.buttonDiameter * button.scale + "px";
            buttonElem.style.opacity = ((config.opacity / 255) * 100) + "%";
            if (config.enableColors) buttonElem.style.filter = "drop-shadow(0 0 0 " + button.color + ")"

            if (typeof button.locLeft !== "undefined") buttonElem.style.left = button.locLeft;
            if (typeof button.locRight !== "undefined") buttonElem.style.right = button.locRight + "px";
            if (typeof button.locTop !== "undefined") buttonElem.style.top = button.locTop;
            if (typeof button.locBottom !== "undefined") buttonElem.style.bottom = button.locBottom + "px";

            button.pressed = false;
            button.touched = false;
            button.value = 0;

            button.buttonElem = buttonElem;
        })

        const handleStickTouch = (touchEvent, type) => {
            const touches = type === 2 ? touchEvent.changedTouches : touchEvent.touches;
            for (let i = 0; i < touches.length; i++) {
                if (touches[i].target !== canvasElem) continue;
                const clientX = touches[i].clientX;
                const clientY = touches[i].clientY;
                const stickIndex = clientX > window.innerWidth / 2 ? 1 : 0;
                if (stickIndex) { //R
                    switch (type) {
                        case 0:
                            if (stickRActive) break;
                            stickRActive = true;
                            stickRStartX = stickREndX = clientX;
                            stickRStartY = stickREndY = clientY;
                            break;
                        case 1:
                            stickREndX = clientX;
                            stickREndY = clientY;
                            break;
                        case 2:
                            stickRActive = false;
                            stickRStartX = stickREndX = 0;
                            stickRStartY = stickREndY = 0;
                            break;
                    }
                    const angle = Math.atan2(stickRStartY - stickREndY, stickRStartX - stickREndX) + Math.PI;
                    let distance = Math.sqrt(
                        (stickRStartX - stickREndX) * (stickRStartX - stickREndX) +
                        (stickRStartY - stickREndY) * (stickRStartY - stickREndY)
                    );
                    if (distance > config.stickRadius) distance = config.stickRadius;
                    stickRDeltaX = distance * Math.cos(angle);
                    stickRDeltaY = distance * Math.sin(angle);

                    setAxis(2, stickRDeltaX / config.stickRadius);
                    setAxis(3, stickRDeltaY / config.stickRadius);
                } else { //L
                    switch (type) {
                        case 0:
                            if (stickLActive) break;
                            stickLActive = true;
                            stickLStartX = stickLEndX = clientX;
                            stickLStartY = stickLEndY = clientY;
                            break;
                        case 1:
                            stickLEndX = clientX;
                            stickLEndY = clientY;
                            break;
                        case 2:
                            stickLActive = false;
                            stickLStartX = stickLEndX = 0;
                            stickLStartY = stickLEndY = 0;
                            break;
                    }
                    const angle = Math.atan2(stickLStartY - stickLEndY, stickLStartX - stickLEndX) + Math.PI;
                    let distance = Math.sqrt(
                        (stickLStartX - stickLEndX) * (stickLStartX - stickLEndX) +
                        (stickLStartY - stickLEndY) * (stickLStartY - stickLEndY)
                    );
                    if (distance > config.stickRadius) distance = config.stickRadius;
                    stickLDeltaX = distance * Math.cos(angle);
                    stickLDeltaY = distance * Math.sin(angle);

                    setAxis(0, stickLDeltaX / config.stickRadius);
                    setAxis(1, stickLDeltaY / config.stickRadius);
                }
            }
        }

        const drawSticks = () => {
            canvasCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            if (stickLActive) {
                canvasCtx.fillStyle = "#cccccc" + config.opacity.toString(16);
                canvasCtx.beginPath();
                canvasCtx.arc(stickLStartX, stickLStartY, config.stickRadius, 0, 2 * Math.PI);
                canvasCtx.fill();

                canvasCtx.fillStyle = stickLColor + config.opacity.toString(16);
                canvasCtx.beginPath();
                canvasCtx.arc(stickLStartX + stickLDeltaX, stickLStartY + stickLDeltaY, config.stickRadius / 2, 0, 2 * Math.PI);
                canvasCtx.fill();
            }

            if (stickRActive) {
                canvasCtx.fillStyle = "#cccccc" + config.opacity.toString(16);
                canvasCtx.beginPath();
                canvasCtx.arc(stickRStartX, stickRStartY, config.stickRadius, 0, 2 * Math.PI);
                canvasCtx.fill();

                canvasCtx.fillStyle = stickRColor + config.opacity.toString(16);
                canvasCtx.beginPath();
                canvasCtx.arc(stickRStartX + stickRDeltaX, stickRStartY + stickRDeltaY, config.stickRadius / 2, 0, 2 * Math.PI);
                canvasCtx.fill();
            }
        }

        const pressButton = (buttonID, isPressed) => {
            emulatedGamepad.buttons[buttonID].pressed = isPressed;
            emulatedGamepad.buttons[buttonID].touched = isPressed;
            emulatedGamepad.buttons[buttonID].value = isPressed ? 1 : 0;
            emulatedGamepad.buttons[buttonID].buttonElem.style.filter = isPressed ? "brightness(0)" : "";

            if (config.enableColors && isPressed) {
                emulatedGamepad.buttons[buttonID].buttonElem.style.filter += "drop-shadow(0 0 0 " + emulatedGamepad.buttons[buttonID].color + ")";
            }

            emulatedGamepad.timestamp = Date.now() - startTime;
        }

        const setAxis = (axis, value) => {
            emulatedGamepad.axes[axis] = value;
            emulatedGamepad.timestamp = Date.now() - startTime;
        }

        const updateVisibility = () => {
            touchElem.style.display = !config.disableTouchController && (window.location.pathname.includes("/launch/") || window.location.pathname.includes("/html5-gamepad-test/")) ? "initial" : "none"
        }

        const layoutButton = (event, type, buttonID) => {
            let clientX = event.clientX;
            let clientY = event.clientY;
            if (typeof event.touches !== "undefined" || typeof event.changedTouches !== "undefined") {
                const touches = type === 2 ? event.changedTouches : event.touches;
                clientX = touches[0].clientX;
                clientY = touches[0].clientY;
            }

            const button = emulatedGamepad.buttons[buttonID];
            const buttonElem = button.buttonElem;
            const newX = clientX - (buttonElem.offsetWidth / 2);
            const newY = clientY - (buttonElem.offsetHeight / 2);

            buttonElem.style.left = newX + "px";
            buttonElem.style.top = newY + "px";

            if (type === 2) {
                delete button.locRight;
                delete button.locBottom;

                button.locLeft = newX + "px";
                button.locTop = newY + "px";
                const sentButtons = JSON.parse(JSON.stringify(emulatedGamepad.buttons));
                sentButtons.forEach((button) => {
                    delete button.buttonElem;
                    delete button.pressed;
                    delete button.touched;
                    delete button.value;
                })

                window.dispatchEvent(new CustomEvent("newButtonConfig", { detail: sentButtons }));
            }
        }

        canvasElem.addEventListener("touchstart", (e) => {
            e.preventDefault();
            handleStickTouch(e, 0);
            if (config.enableDrawSticks) drawSticks();
        });

        canvasElem.addEventListener("touchmove", (e) => {
            e.preventDefault();
            handleStickTouch(e, 1);
            if (config.enableDrawSticks) drawSticks();
        });

        canvasElem.addEventListener("touchend", (e) => {
            e.preventDefault();
            handleStickTouch(e, 2);
            if (config.enableDrawSticks) drawSticks();
        });

        window.onload = async () => {
            touchElem.appendChild(canvasElem);
            main.appendChild(touchElem);
            main.appendChild(disableButton);
            document.body.appendChild(main);
            disableButtonElem = document.getElementById("disableController");
            emulatedGamepad.buttons.forEach(({ buttonElem }, i) => {
                touchElem.appendChild(buttonElem);

                buttonElem.addEventListener("touchstart", (e) => {
                    e.preventDefault();
                    layoutMode ? layoutButton(e, 0, i) : pressButton(i, true);
                });
                buttonElem.addEventListener("touchmove", (e) => {
                    e.preventDefault();
                    if (layoutMode) layoutButton(e, 1, i);
                });
                buttonElem.addEventListener("touchend", (e) => {
                    e.preventDefault();
                    layoutMode ? layoutButton(e, 2, i) : pressButton(i, false);
                });
            });
        }

        window.onresize = () => {
            canvasElem.width = window.innerWidth;
            canvasElem.height = window.innerHeight;

            updateVisibility()
        }

        window.addEventListener("popstate", updateVisibility);
        updateVisibility();

        const originalGetGamepads = navigator.getGamepads;
        navigator.getGamepads = () => {
            const originalGamepads = originalGetGamepads.apply(navigator);
            const modifiedGamepads = [emulatedGamepad, null, null, null];
            let insertIndex = 1;
            for (let i = 0; i < 4; i++) {
                if (insertIndex >= 4) break;
                if (originalGamepads[i] !== null) {
                    modifiedGamepads[insertIndex] = {};
                    for (let property in originalGamepads[i]) {
                        modifiedGamepads[insertIndex][property] = originalGamepads[i][property];
                    }
                    modifiedGamepads[insertIndex].index = insertIndex;
                    insertIndex++;
                }
            }
            return modifiedGamepads;
        }
    }
}

Object.defineProperty(navigator, "maxTouchPoints", { get: () => { return 0 }, set: (a) => { } });
delete window.ontouchstart;

const injScript = document.createElement("script");
injScript.appendChild(document.createTextNode("(" + main + ")();"));
(document.body || document.head || document.documentElement).appendChild(injScript);