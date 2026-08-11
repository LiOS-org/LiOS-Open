const globalWindow = window;
export const overlays = {
    method: function () {
        this.popup = () => {
            const portal = this.ctx.nodeMethods.newPortal("body", "div")
            const p = this.connectPortal(portal);
            p.class.add("lios-pop-up");
            p.open = () => {
                if (p.vDOM.class.includes("pop-up-is-closing")) {
                    p.class.remove("pop-up-is-closing");
                };
                p.class.add("pop-up-is-opening");
            };
            p.close = () => {
                if (p.vDOM.class.includes("pop-up-is-opening")) {
                    p.class.remove("pop-up-is-opening");
                };
                p.class.add("pop-up-is-closing");
            };
            p.delete = () => {
                p.removeAllListeners();
                const element = p.getElement();
                if (element.parentElement) {
                    element.parentElement.removeChild(element);
                }
                delete p.vDOM;
            };
            p.background = (value) => {
                p.property({
                    "--lios-pop-up-background": value
                });
                return p;
            };
            return p;
        };
        this.window = () => {
            const portal = this.ctx.nodeMethods.newPortal("body", "div");
            const w = this.connectPortal(portal);
            w.class.add("lios-window-container");
            w.open = () => {
                if (!(w.vDOM.id)) throw new Error("Window needs id to function");
                w.property({
                    "--window-status": "flex"
                });
                globalWindow.location.href = `#${w.vDOM.id.trim().replace(" ", "-")}`;
                w.restore();
            };
            w.close = () => {
                w.property({
                    "--window-status": "none"
                });
                history.replaceState(null, "", globalWindow.location.pathname);
            };
            w.restore = () => {
                w.style().set({
                    width: "var(--default-width)",
                    height: "var(--default-height)",
                    left: "",
                    right: "",
                    top: "",
                    bottom: "",
                    inset: "var(--default-inset)"
                });
            };
            w.background = (value) => {
                w.style().set({
                    background: value
                });
                return w
            };
            const titleBar = w.child("div").class.add("lios-window-titlebar").style().set({
                cursor: "pointer"
            });
            const title = titleBar.child("span").text("").class.add("lios-window-title");
            const originalId = w.id.bind(w);
            w.setId = (value) => {
                originalId(value);
                title.text(value);
                return w;
            };
            const titleBarBreaker = w.child("hr");

            const window = w.child("div").class.add("lios-window");
            const controller = titleBar.child("div");
            const closeButton = controller.child("div").text("X").on("click", () => {
                w.close();
            }).class.add("lios-window-close").style().set({
                background: "#c6101e"
            });
            const enableDrag = (titleBar, container) => {
                let isDragging = false;
                let offsetX, offsetY = 0;

                titleBar.addEventListener("mousedown", (e) => {
                    isDragging = true;
                    const rect = container.getBoundingClientRect();
                    offsetX = e.clientX - rect.left;
                    offsetY = e.clientY - rect.top;

                    document.body.style.userSelect = "none";

                });
                document.addEventListener("mousemove", (e) => {
                    if (!isDragging) return;

                    container.style.left = `${e.clientX - offsetX}px`;
                    container.style.top = `${e.clientY - offsetY}px`;
                });

                document.addEventListener("mouseup", () => {
                    if (!isDragging) return;
                    isDragging = false;
                    document.body.style.userSelect = "unset";
                });
            };
            enableDrag(titleBar.getElement(), w.getElement());

            // Multiple Window Handling
            w.on("mousedown", () => {
                document.querySelectorAll(".lios-window-container.last-interacted").forEach((win) => {
                    win.classList.remove("last-interacted");
                });
                w.getElement().classList.add("last-interacted");
            });

            // Re assignments
            w.child = window.child.bind(window);
            w.text = window.text.bind(window);
            w.clear = window.clear.bind(window);
            w.id = w.setId;
            return w;
        };
        this.toolTip = (options = {}) => {
            const portal = this.ctx.nodeMethods.newPortal("body", "div");
            const overlay = this.connectPortal(portal);
            overlay.class.add("lios-tooltip");

            const style = this.ctx.styleEngine.connect(overlay);
            style.background(options.background ||= "inherit").padding(options.padding ||= "5px").borderRadius(options.borderRadius ||= "5px");
            style.border(options.border ||= "2px inset white").color(options.color ||= "white");


            overlay.show = (e,content) => {
                const gap = 12;
                let x = e.x;
                let y = e.y;
                const pageX = document.documentElement.scrollWidth;
                const pageY = document.documentElement.scrollHeight;
                const overlayX = overlay.getElement().offsetWidth;
                const overlayY = overlay.getElement().offsetHeight
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                if (content) {
                    overlay.clear();
                    overlay.text(content);
                };

                if (x + overlayX + gap > viewportWidth) {
                    x = x - overlayX - gap;
                } else {
                    x = x + gap;
                };
                if (y + overlayY + gap > viewportHeight) {
                    y = y - overlayY - gap;
                } else {
                    y = y + gap;
                };
                overlay.property({
                    "--lios-tooltip-display": "flex",
                    "--lios-tooltip-top": `${y}px`,
                    "--lios-tooltip-left": `${x}px`
                });
            };
            overlay.hide = () => {
                overlay.property({
                    "--lios-tooltip-display": "none"
                });
            };
            overlay.bind = (UINode, content, { decorate = true, highlight = true } = {}) => {
                if (!UINode) return;
                if (decorate) {
                    UINode.style().set({
                        textDecoration: "underline dotted"
                    });
                };
                if (highlight) {
                    UINode.style().set({
                        transition: "background .15s ease-in-out"
                    });

                    UINode.style(":hover").set({
                        background: "color-mix(in srgb, currentColor 10%, transparent)",
                        transition: "background .15s ease-in-out"
                    });
                };
                UINode.on("pointermove", (e) => overlay.show(e, content));
                UINode.on("pointerleave", overlay.hide);
            };

            return overlay;
        };
        return this;
    },
    metadata: {
        name: "Overlays for LiOS-Open UI module",
        version: "2.0.0",
        versionCode: 3,
        api: {
            min: 1,
            max: 4
        },
        capabilities: {
            addsMethods: true,
            overridesMethods: false,
            addsProperties: true
        }
    },
    initFunction: function (ctx) {
        ctx.styleEngine.installCSS("../../../css/overlays/overlays.css");
    }
};