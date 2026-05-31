export function element() {
    const node = this;
    const vDOM = node.vDOM;
    return {
        get tagName() {
            return vDOM.tagName;
        },
        get children() {
            return vDOM.children;
        },
        get parent() {
            return vDOM.parent;
        },
        get attributes() {
            return vDOM.attributes;
        },
        get events() {
            return vDOM.events;
        },
        get identifier() {
            return vDOM.identifier;
        }
    }
}