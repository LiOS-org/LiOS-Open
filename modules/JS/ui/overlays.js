const globalWindow = window;
export const overlays = {
    method: function () {
        return this;
    },
    metadata: {
        name: "Overlays for LiOS-Open UI module",
        version: "1.1.0",
        versionCode: 2,
        api: {
            min: 1,
            max: 3
        },
        capabilities: {
            addsMethods: false,
            overridesMethods: true,
            addsProperties: true
        }
    },
    initFunction: function () {
        this.popup = () => {
            const p = new this.constructor().create("div", "body");
            const randomUID = String("lios-popup-"+crypto.randomUUID()).trim();
            p.id(randomUID);
            p.class.add("lios-pop-up");
            p.open = () => {
                if (p.vDOM.class.includes("pop-up-is-closing")) {
                    p.class.remove("pop-up-is-closing");
                };
                p.class.add("pop-up-is-opening");
                p.style().set({
                    display: "flex"
                });
            };
            p.close = () => {
                if (p.vDOM.class.includes("pop-up-is-opening")) {
                    p.class.remove("pop-up-is-opening");
                };
                p.class.add("pop-up-is-closing");
                p.style().set({
                    display: "none"
                });
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
            delete p.popup;
            delete p.window;
            delete p.id
            return p;
        };
        this.window = () => {
            const w = new this.constructor().create("div", "body");
            w.class.add("lios-window-container", String("lios-window-" + crypto.randomUUID()).trim());
            w.open = () => {
                w.style().set({
                    display: "flex"
                });
                globalWindow.location.href = `#${w.vDOM.id.trim().replace(" ", "-")}`;
                w.restore();
            };
            w.close = () => {
                w.style().set({
                    display: "none"
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
            const titleBar = w.child("div").class.add("lios-window-titlebar").style({
                cursor: "pointer"
            });
            const title = titleBar.child("span").text("").class.add("lios-window-title");
            w.setId = (value) => {
                w.id(value);
                title.text(value);
                return w;
            };
            const titleBarBreaker = w.child("hr");

            const window = w.child("div").class.add("lios-window");
            const controller = titleBar.child("div");
            const closeButton = controller.child("div").text("X").on("click", () => {
                w.close();
            }).class.add("lios-window-close").style({
                background: "#c6101e"
            });
            const enableDrag = (titlebar, container) => {
                let isDragging = false;
                let offsetX, offsetY = 0;

                titlebar.addEventListener("mousedown", (e) => {
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

            // Re assignments
            w.child = window.child;

            delete w.id
            delete w.popup;
            delete w.window;
            return w;
        }
    }
};