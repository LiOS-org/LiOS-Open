class ChildController {
    #rule;
    #node;
    constructor(ruleSheet, node) {
        this.#rule = ruleSheet;
        this.#node = node;
    }

    set(object) {
        for (const [key, value] of Object.entries(object)) {
            this.#rule.style.setProperty(normalizePropertyName(key), value)
        };
        return this.#node;
    };
    unset(...properties) {
        properties.forEach(property => {
            this.#rule.style.removeProperty(normalizePropertyName(property));
        });
        return this.#node;
    };
    reset() {
        this.#rule.style.cssText = "";
        return this.#node;
    };
};

function normalizePropertyName(propertyName) {
    if (propertyName.startsWith("--") || propertyName.includes("-")) {
        return propertyName;
    }

    return propertyName.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
}

export class StyleEngine {
    #styleTag;
    #sheet;

    constructor(vDOM) {
        this.#styleTag = document.createElement("style");
        document.head.appendChild(this.#styleTag);

        this.#sheet = this.#styleTag.sheet;
    }
    style(vDOM, myNode, pseudoState) {
        vDOM.style ||= {};
        const node = myNode;
        let identifier = `.${vDOM.identifier}`;
        if (pseudoState) {
            identifier += pseudoState;
        };

        if (vDOM.style[identifier]?.rule) {
            return new ChildController(vDOM.style[identifier].rule, node);
        };


        const vCSSOM = vDOM.style[identifier] = {};
        const index = this.#sheet.insertRule(`${identifier} {}`);
        vCSSOM.rule = this.#sheet.cssRules[index];


        return new ChildController(vCSSOM.rule, node);
    };
    #insertSheet = (sheet, identifier) => {
        const normalizedIdentifier = identifier.trim()
        const existingIndex = [...this.#sheet.cssRules].findIndex(
            rule => rule.selectorText.trim() === normalizedIdentifier
        );
        if (existingIndex !== -1) {
            this.#sheet.deleteRule(existingIndex);
        };
        this.#sheet.insertRule(sheet);
    };
    static #clones = new Map();

    static cloneStyle = (sourceNode, targetInstance) => {
        const originalVDOM = sourceNode.vDOM;
        const originalIdentifier = `.${originalVDOM.identifier}`;
        if (!(originalVDOM.style) || !(originalVDOM.style[originalIdentifier])) throw new Error("No styles to copy");
        let ruleSheet = originalVDOM.style[originalIdentifier].rule.cssText;
        const newController = targetInstance.styleEngine;
        const newIdentifier = `${originalIdentifier}-clone`;
        ruleSheet = ruleSheet.replace(originalIdentifier, newIdentifier);
        this.#clones.set(newIdentifier, ruleSheet);
        newController.#insertSheet(ruleSheet, newIdentifier);

        return newIdentifier.replace(".", "").trim();
    };
    static #installedCSS = new Set();
    static get installedCSS() {
        return this.#installedCSS;
    };
    static installCSS(url) {
        const css = new URL(url, import.meta.url);
        if (this.installedCSS.has(css.pathname)) return;

        this.installedCSS.add(css.pathname);

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = css;
        document.head.appendChild(link);
    };
    static connect(node) {
        const vDOM = node.vDOM;
        if (!(vDOM.class.includes(vDOM.identifier))) node.class.add(vDOM.identifier);
        const styleEngine = node.styleEngine;
        // Initiate StyleOnce
        styleEngine.style(vDOM, node);
        // 
        const identifier = `.${vDOM.identifier}`;
        const rule = vDOM.style[identifier].rule;

        return new CSSFluent(rule);
    };
};
class CSSFluent {
    rule;
    constructor(rule) {
        this.rule = rule;
    };
};
const style = document.createElement("div").style;
for (const key in style) {
    if (typeof style[key] === "string" && !Number.isInteger(+key)) {
        CSSFluent.prototype[key] = function (value) {
            this.rule.style.setProperty(normalizePropertyName(key), value);
            return this;
        };
    };
};