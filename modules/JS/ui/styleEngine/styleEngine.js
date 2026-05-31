class ChildController {
    #rule;
    #node;
    constructor(ruleSheet,node) {
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
    style(vDOM,myNode,pseudoState) {
        vDOM.style ||= {};
        const node = myNode;
        let identifier = `.${vDOM.identifier}`;
        if (pseudoState) {
            identifier += pseudoState;
        };

        if (vDOM.style[identifier]?.rule) {
            return new ChildController(vDOM.style[identifier].rule,node);
        }


        const vCSSOM = vDOM.style[identifier] = {};
        const index = this.#sheet.insertRule(`${identifier} {}`);
        vCSSOM.rule = this.#sheet.cssRules[index];


        return new ChildController(vCSSOM.rule,node);
    };
}
