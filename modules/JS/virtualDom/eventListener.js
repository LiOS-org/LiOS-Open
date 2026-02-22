export const attachEventListener = (el,type,handler) => {
    el.addEventListener(type, handler);
};
export const detachEventListener = (el,type,handler) => {
el.removeEventListener(type, handler);
};
export const vDomEventListener = {
    attach: (node, type, handler) => {
        node.eventListners = {
            [type]: handler
        };
    }
};