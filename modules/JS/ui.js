import { nodeMethods } from "./ui/nodeMethods.js";
import { StyleEngine } from "./ui/styleEngine/styleEngine.js";
export const metadata = {
    name: "UI",
    version: "1.0.0-alpha-3",
    apiVersion: 3,
    versionCode: 3
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
        };
        // virtual root support
        const vDOM = {
            tagName: root ? root.tagName : "virtual-root",
            children: [],
            parent: null,
            text: "",
            style: {}
        };
        // Style Engine Injection
        const styleEngine = new StyleEngine(vDOM);

        super(() => this.#root, vDOM,styleEngine);
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

        if (this.prototype[name] || nodeMethods.prototype[name]) {
            throw new Error(`Method "${name}" already exists in UI`);
        };

        this.prototype[name] = extension.method;
        nodeMethods.prototype[name] = extension.method;

        // 🔥 store metadata
        this.extensions[name] = extension.metadata;

        if (extension.initFunction) {
            this.initFunctions.push(extension.initFunction)
            
        };

    };
};
