import { attachEventListener, vDomEventListener } from "./virtualDom/eventListener.js";
import { svgParser } from "./virtualDom/svgParser.js";
// Global Variables
let childrenMethods;
// 

// Virtual DOM Implementation
export const virtualDom = {
    new: async (tag = "div") => {
        let vDom = [];
    
        let containerTag = tag;
        let dom;
        let id;
        let classList = [];
        let multiState = {};
        const generateRandomUid = async () => {
            const cryptoUid = crypto.randomUUID();
            const randomUid = `virtualDom-${cryptoUid}`;
            return randomUid;
        };
        const appendTo = (parent, node) => {
            const targetVDom = node.__state__
                ? multiState[node.__state__].vDom
                : vDom;

            if (parent === "root") {
                targetVDom.push(node);
                return;
            }

            if (parent && parent.__node__) {
                parent.__node__.children.push(node);
            }
        };
        const newChild = async (tag = "div") => {
            const node = {};
            node.children = [];
            node.tag = tag;
            node.props = {
                class: [],
                id: "",
                attributes: {}
            };
            childrenMethods = {
                classList: (...classList) => {
                    classList.forEach(className => {
                        node.props.class.push(className);
                    });
                },
                id: (id) => {
                    node.props.id = id;
                },
                attributes: (attributes) => {
                    Object.entries(attributes).forEach(([key, value]) => {
                        if (value === undefined || value === null) {
                            return;
                        };
                        if (typeof value === "object") {
                            node.props.attributes[key] = JSON.stringify(value);
                        } else {
                            node.props.attributes[key] = String(value);
                        }
                    })
                },
                textContent: (text) => {
                    node.textContent = text;
                },
                appendTo: (parent, stateName) => appendTo(parent, node, stateName),
                eventListner: {
                    add:(type, handler) => vDomEventListener.attach(node,type,handler)
                },
                __node__: node
            };
            return childrenMethods;
        };
        const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
        const renderNode = (node, isSvgTree = false) => {
            const nodeTag = String(node.tag || "").toLowerCase();
            const isCurrentSvgTree = isSvgTree || nodeTag === "svg";
            const el = isCurrentSvgTree
                ? document.createElementNS(SVG_NAMESPACE, node.tag)
                : document.createElement(node.tag);

            // classes
            if (node.props.class.length > 0) {
                node.props.class.forEach(className => {
                    el.classList.add(className);
                });
            }

            // id
            if (node.props.id.length > 0) {
                el.id = node.props.id;
            }

            // attributes
            if (node.props.attributes) {
                Object.entries(node.props.attributes).forEach(([key, value]) => {
                    el.setAttribute(key, value);
                });
            }

            // text
            if (typeof node.textContent === "string") {
                el.textContent = node.textContent;
            }

            // 🔑 render children recursively
            if (node.children && node.children.length > 0) {
                node.children.forEach(childNode => {
                    el.appendChild(renderNode(childNode, isCurrentSvgTree));
                });
            }
            if (node.eventListners) {
                for (const [type, handler] of Object.entries(node.eventListners)) {
                    attachEventListener(el, type, handler);
                };
            };

            return el;
        };
        return {
            select: (domSelector) => {
                dom = document.querySelector(domSelector);
            },
            newChild,
            svgParser: (svg) => svgParser(svg, appendTo),
            classList: (...classListArray) => {
                classListArray.forEach(className => {
                    classList.push(className);
                });
            },
            id: (idString) => {
                id = idString;
            },
            render: () => {
                const newNode = document.createElement(containerTag);

                if (id && id.length > 0) {
                    dom.id = id;
                }

                if (classList && classList.length > 0) {
                    classList.forEach(className => {
                        dom.classList.add(className);
                    });
                }

                vDom.forEach(node => {
                    newNode.appendChild(renderNode(node));
                });
                if (vDom.eventListners) {
                    for (const [type, handler] of Object.entries(vDom.eventListners)) {
                        attachEventListener(newNode, type, handler);
                    }
                }

                dom.innerHTML = "";
                dom.replaceChildren(...newNode.childNodes);
            },
            enableMultiState: () => {
                multiState.default = {
                    vDom: vDom,
                    tag:containerTag
                };
                return {
                    newState: (stateName, tag = "div") => {
                        const state = stateName;
                        multiState[stateName] = {
                            vDom: [],
                            tag: tag
                        };
                        return {
                            newChild: (tag = "div", stateName = state) => newChild(tag, stateName)
                        }
                    },
                    switchState: async(stateName) => {
                        vDom = multiState[stateName].vDom;
                        containerTag = multiState[stateName].tag;
                    }
                };
            },
            eventListner: {
                attach:(type,handler) => vDomEventListener.attach(vDom,type,handler)
            },
            export: {
                log: () => {
                    console.log("Exporting virtual DOM structure:");
                    console.log(JSON.stringify(vDom, null, 2));
                }
            }
        };
    }
};
// 

// Global Exports
export { childrenMethods }
// 
