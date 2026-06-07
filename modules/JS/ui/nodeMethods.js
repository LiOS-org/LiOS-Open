import { elementMethods } from "./elementMethods.js";
import { element } from "./aboutElement.js";
export class nodeMethods {
    #vDOM;
    #styleEngine;
    constructor(getElement, vDOM, styleEngine) {
        this.getElement = getElement;
        this.#vDOM = vDOM;
        this.element = element.call(this);
        this.#vDOM.identifier ||= `lios-${crypto.randomUUID().split("-")[0]}`;
        this.#styleEngine = styleEngine;
    };

    get vDOM() {
        return this.#vDOM;
    }
    text(value) {
        const root = this.getElement();
        root.textContent = value;
        this.vDOM.text = value;
        return this;
    };
    child(tagName) {
        const root = this.getElement();
        let childElement;
        const svgTags = [
            "svg",
            "path",
            "circle",
            "rect",
            "line",
            "ellipse",
            "polygon",
            "polyline"
        ];
        if (svgTags.includes(tagName)) {
            childElement = root.appendChild(
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    tagName
                )
            );
        } else {
            childElement = root.appendChild(
                document.createElement(tagName)
            );
        }

        const childVDOM = {
            tagName: tagName,
            children: [],
            parent: this.vDOM
        };

        this.vDOM.children.push(childVDOM);

        const nm = new nodeMethods(
            () => childElement,
            childVDOM, this.#styleEngine
        );

        const handler = elementMethods[tagName];

        if (handler) {
            handler.call(nm);
        };

        return nm;
    };
    svg(svgString) {
        const vector = this.child("svg");
        vector.parse(svgString);
        return vector;
    };
    parent() {
        if (!this.vDOM.parent) return this;
        return new nodeMethods(
            () => this.getElement().parentElement,
            this.vDOM.parent, this.#styleEngine
        );
    };
    style(pseudoState) {
        const state = pseudoState;
        const instance = this.#styleEngine.style(this.vDOM, this, state);
        this.class.add(this.vDOM.identifier);


        return instance;
    }
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
    label(value) {
        this.attr({

            "aria-label": value

        });
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
            this.removeAllListeners();
            return new nodeMethods(
                () => root.parentElement,
                parentNode, this.#styleEngine
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
