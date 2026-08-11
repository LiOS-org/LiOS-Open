import { nodeMethods } from "./ui/nodeMethods.js";
import { StyleEngine } from "./ui/styleEngine/styleEngine.js";
export const metadata = {
    name: "UI",
    version: "1.0.0-alpha-4",
    apiVersion: 4,
    versionCode: 4
};
const context = {
    nodeMethods: {
        newPortal: nodeMethods.newPortal.bind(nodeMethods)
    },
    styleEngine: {
        cloneStyle: StyleEngine.cloneStyle.bind(StyleEngine),
        installCSS: StyleEngine.installCSS.bind(StyleEngine),
        connect: StyleEngine.connect.bind(StyleEngine)
    }
};
Object.freeze(context);
export class ui extends nodeMethods {
    #root;
    extensions = {};
    initFunctions = [];

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
        // 

        super(() => this.#root, vDOM, styleEngine, context);
        this.owner = this;
        this.#root = root;
        // Extension Initialization
        for (const [name, extension] of Object.entries(this.constructor.globalExtensions)) {
            this.#registerExtension(name, extension);
        };
        this.constructor.globalInitFunctions.forEach(fn => {
            fn.call(this, context);
        });
        // 
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
    #registerExtension(name, extension) {
        if (metadata.apiVersion < extension.metadata.api.min || metadata.apiVersion > extension.metadata.api.max) {
            throw new Error("Extension is not compatible with current API version", {
                cause: extension.metadata.name
            });
        };

        if (this[name] || nodeMethods.prototype[name]) {
            throw new Error(`Method "${name}" already exists in UI`);
        };
        this[name] = extension.method;
        // nodeMethods.prototype[name] = extension.method;

        // Store the extension for future reference
        this.extensions[name] = extension;
        if (extension.initFunction) {
            this.initFunctions.push(extension.initFunction);
        }
    };
    extend(name, extension) { 
        this.#registerExtension(name, extension);
    }

    // Static properties for global extensions and init functions
    static globalExtensions = {};
    static globalInitFunctions = [];

    static extend(name, extension) {
        // 🔥 store metadata
        this.globalExtensions[name] = extension;

        if (extension.initFunction) {
            this.globalInitFunctions.push(extension.initFunction)
        };

    };
    static nodeMethods = context.nodeMethods;
    static styleEngine = context.styleEngine;
};
