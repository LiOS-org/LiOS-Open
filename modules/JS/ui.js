export const metadata = {
    name: "UI",
    version: "1.0.0-alpha-1",
    apiVersion: 1,
    versionCode: 1
};
class nodeMethods {
    constructor(getElement, vDOM) {
        this.getElement = getElement;
        this.vDOM = vDOM;
    };

    text(value) {
        const root = this.getElement();
        root.textContent = value;
        this.vDOM.text = value;
        return this;
    };
    child(tagName) {
        const root = this.getElement();
        const childElement = root.appendChild(document.createElement(tagName));

        const childVDOM = {
            tagName: tagName,
            children: [],
            parent: this.vDOM
        };

        this.vDOM.children.push(childVDOM);

        return new nodeMethods(
            () => childElement,
            childVDOM
        );
    };
    parent() {
        if (!this.vDOM.parent) return this;
        return new nodeMethods(
            () => this.getElement().parentElement,
            this.vDOM.parent
        );
    };
    style(object) {
        const root = this.getElement();
        this.vDOM.style = this.vDOM.style || {};

        for (const [key, value] of Object.entries(object)) {
            root.style[key] = value;
            this.vDOM.style[key] = value;
        }
        return this;
    };
    property(object) {
        const root = this.getElement();
        this.vDOM.property = this.vDOM.property || {};

        for (const [key, value] of Object.entries(object)) {
            root.style.setProperty(key, value)
            this.vDOM.property[key] = value;
        }
        return this;
    };
    on(event, callback) {
        const root = this.getElement();
        this.vDOM.events = this.vDOM.events || {};
        this.vDOM.events[event] = this.vDOM.events[event] || [];
        this.vDOM.events[event].push(callback);
        root.addEventListener(event, callback);
        return this;
    };
    off(event, callback) {
        const root = this.getElement();
        if (this.vDOM.events && this.vDOM.events[event]) {
            const index = this.vDOM.events[event].indexOf(callback);
            if (index > -1) {
                this.vDOM.events[event].splice(index, 1);
            }
        }
        root.removeEventListener(event, callback);
        return this;
    };
    removeAllListeners() {
        const root = this.getElement();
        if (this.vDOM.events) {
            for (const [event, callbacks] of Object.entries(this.vDOM.events)) {
                callbacks.forEach(callback => {
                    root.removeEventListener(event, callback);
                });
            }
            this.vDOM.events = {};
        }
        return this;
    };

    remove() {
        const root = this.getElement();
        if (root.parentElement) {
            root.parentElement.removeChild(root);
        }
        let parentNode = null;
        if (this.vDOM.parent) {
            const siblings = this.vDOM.parent.children;
            const index = siblings.indexOf(this.vDOM);
            if (index > -1) {
                siblings.splice(index, 1);
            }
            parentNode = this.vDOM.parent;
        }
        if (parentNode) {
            return new nodeMethods(
                () => root.parentElement,
                parentNode
            );
        }
        this.removeAllListeners();
        return this;
    };

    id(value) {
        const root = this.getElement();
        root.id = value;
        this.vDOM.id = value;
        return this;
    };

    get class() {
        const root = this.getElement();
        return {
            add: (...classNames) => {
                classNames.forEach(className => {
                    root.classList.add(className);
                    this.vDOM.class = this.vDOM.class || [];
                    if (!this.vDOM.class.includes(className)) {
                        this.vDOM.class.push(className);
                    }
                });
                return this;
            },
            remove: (...classNames) => {
                classNames.forEach(className => {
                    root.classList.remove(className);
                    if (this.vDOM.class) {
                        const index = this.vDOM.class.indexOf(className);
                        if (index > -1) {
                            this.vDOM.class.splice(index, 1);
                        }
                    }
                });
                return this;
            }
        };
    };
    attr(object) {
        const root = this.getElement();
        for (const [name, value] of Object.entries(object)) {
            root.setAttribute(name, value);
            this.vDOM.attributes = this.vDOM.attributes || {};
            this.vDOM.attributes[name] = value;
        };
        return this;
    };
};
export class ui extends nodeMethods {
    #root;

    constructor(selector = null) {
        let root = null;

        if (selector instanceof HTMLElement) {
            root = selector;
        } else if (typeof selector === "string") {
            if (selector === "window") {
                throw new Error(`Cannot use "window" as a selector, please use something else. BTW nice try!`);
            }

            const found = document.querySelector(selector);
            if (!found) {
                throw new Error(`Selector "${selector}" not found in DOM`);
            }
            root = found;
        }

        // virtual root support
        const vDOM = {
            tagName: root ? root.tagName : "virtual-root",
            children: [],
            parent: null,
            text: "",
            style: {}
        };

        super(() => this.#root, vDOM);
        this.#root = root;
        this.constructor.initFunctions.forEach(fn => {

            fn.call(this);

        });
    };

    create(tagName, parent) {
        if (this.#root) {
            throw new Error("Root element already exists. Cannot create a new one.");
        }

        const newElement = document.createElement(tagName);
        this.#root = newElement;

        this.vDOM.tagName = tagName;

        if (parent instanceof HTMLElement) {
            parent.appendChild(newElement);
        } else if (typeof parent === "string") {
            const parentElement = document.querySelector(parent);
            if (!parentElement) {
                throw new Error(`Parent selector "${parent}" not found`);
            }
            parentElement.appendChild(newElement);
        }

        return this;
    };
    static extensions = {};
    static initFunctions = [];

    static extend(name, extension) {
        if (metadata.apiVersion < extension.metadata.api.min || metadata.apiVersion > extension.metadata.api.max) {
            throw new Error("Extension is not compatible with current API version", {
                cause: extension.metadata.name
            });
        };

        if (this.prototype[name]) {
            throw new Error(`Method "${name}" already exists in UI`);
        };

        this.prototype[name] = extension.method;

        // 🔥 store metadata
        this.extensions[name] = extension.metadata;

        if (extension.initFunction) {
            this.initFunctions.push(extension.initFunction)
            
        };

    };
};
