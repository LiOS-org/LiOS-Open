import { attachEventListener, vDomEventListener } from "./virtualDom/eventListener.js";
import { svgParser } from "./virtualDom/svgParser.js";
// Global Variables
let childrenMethods;
// 

// Virtual DOM Implementation
export const virtualDom = {
    new: async (tag = "div") => {
        let vDom = [];
        let isMounted = false;
        let updatableNodes = new Set();
    
        let containerTag = tag;
        let dom;
        let id;
        let classList = [];
        let multiState = {};
        let rootPendingUpdates = { newChildrens: [] };
        let activeStateName = null;
        const generateRandomUid = () => {
            const cryptoUid = crypto.randomUUID();
            const randomUid = `virtualDom-${cryptoUid}`;
            return randomUid;
        };
        const appendTo = (parent, node, stateName) => {
            const targetStateName = stateName || activeStateName;
            const targetVDom = targetStateName && multiState[targetStateName]
                ? multiState[targetStateName].vDom
                : vDom;
            
            if (parent === "root") {
                targetVDom.push(node);
                
                if (isMounted) {
                    if (targetStateName && multiState[targetStateName]) {
                        multiState[targetStateName].pendingRootChildrens.push(node);
                    } else {
                        rootPendingUpdates.newChildrens.push(node);
                    }
                }

                return;
            }

            if (parent && parent.__node__) {
                const parentNode = parent.__node__;
                parentNode.children.push(node);
                if (isMounted) {
                    if (!parentNode.pendingUpdates.pendingChildrens) {
                        parentNode.pendingUpdates.pendingChildrens = [];
                    }
                    parentNode.pendingUpdates.pendingChildrens.push(node);
                    updatableNodes.add(parentNode);
                }
            }
        };
        const newChild = async (tag = "div", defaultStateName) => {
            const node = {};
            node.children = [];
            node.tag = tag;
            node.props = {
                class: [],
                id: "",
                attributes: {}
            };
            node.pendingUpdates = {
                eventListners: {
                    add: {}
                }
            };
            childrenMethods = {
                classList: (...classList) => {
                    classList.forEach(className => {
                        node.props.class.push(className);
                    });
                    if (isMounted) {
                        node.pendingUpdates.classList = classList;
                        updatableNodes.add(node);
                    }
                },
                id: (id) => {
                    node.props.id = id;
                    if (isMounted) {
                        node.pendingUpdates.id = id;
                        updatableNodes.add(node);
                    };
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
                        };
                        
                        if (isMounted) {
                            node.pendingUpdates.attributes = attributes;
                            updatableNodes.add(node);
                        };
                    })
                },
                textContent: (text) => {
                    node.textContent = text;
                    
                    if (isMounted) {
                        node.pendingUpdates.textContent = text;
                        updatableNodes.add(node);
                    };
                },
                appendTo: (parent, stateName) => appendTo(parent, node, stateName || defaultStateName),
                eventListner: {
                    add: (type, handler) => {
                        vDomEventListener.attach(node, type, handler);

                        if (isMounted) {
                            node.pendingUpdates.eventListners.add[type] = handler;

                            updatableNodes.add(node);
                        };
                    }
                },
                get dom() {
                    return node.dom;
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

            // Save referance
            node.dom = el;
            // 

            return el;
        };
        return {
            select: (domSelectorOrElement) => {
                if (typeof domSelectorOrElement === "string") {
                    dom = document.querySelector(domSelectorOrElement);
                } else if (domSelectorOrElement instanceof HTMLElement) {
                    dom = domSelectorOrElement;
                }
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
                if (isMounted) {
                    throw new Error("VirtualDOM already rendered, Use update() for further patching or to rebuild use render({force:true})\n \n To avoid this error it is recommended to render() iff the whole virtualDOM is already created.\n");
                }
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
                isMounted = true;
            },
            enableMultiState: () => {
                activeStateName = "default";
                multiState.default = {
                    vDom: vDom,
                    tag: containerTag,
                    pendingRootChildrens: []
                };
                return {
                    newState: (stateName, tag = "div") => {
                        const state = stateName;
                        multiState[stateName] = {
                            vDom: [],
                            tag: tag,
                            pendingRootChildrens: []
                        };
                        return {
                            newChild: (tag = "div", stateName = state) => newChild(tag, stateName)
                        }
                    },
                    switchState: async (stateName) => {
                        const saveScrollPosition = async () => {
                            multiState[activeStateName].scrollY = window.scrollY;
                            multiState[activeStateName.scrollX] = window.scrollX;
                        }
                        await saveScrollPosition();
                        vDom = multiState[stateName].vDom;
                        containerTag = multiState[stateName].tag;
                        activeStateName = stateName;

                        if (isMounted) {
                            updatableNodes.clear();
                            multiState[stateName].pendingRootChildrens = [];
                            const newNode = document.createElement(containerTag);
                            vDom.forEach(node => {
                                newNode.appendChild(renderNode(node));
                            });
                            dom.innerHTML = "";
                            dom.replaceChildren(...newNode.childNodes);
                        }
                    }
                };
            },
            update: () => {
                if (!isMounted) {
                    throw new Error("VirtualDOM needs to be rendered first");
                };
                for (const node of updatableNodes) {
                    const el = node.dom;
                    if (!el) {
                        // Node has not been mounted yet; renderNode will apply props when attached.
                        node.pendingUpdates = { eventListners: { add: {} } };
                        continue;
                    }

                    if (node.pendingUpdates.id) {
                        el.id = node.pendingUpdates.id;
                    };
                    
                    if (node.pendingUpdates.classList) {
                        const classes = node.pendingUpdates.classList;
                        
                        classes.forEach((className) => {
                            el.classList.add(className);
                        });
                    };
                    if (node.pendingUpdates.attributes) {
                        Object.entries(node.pendingUpdates.attributes).forEach(([key, value]) => {
                            el.setAttribute(key, value);
                        });
                    };
                    if (node.pendingUpdates.textContent) {
                        el.textContent = node.pendingUpdates.textContent;
                    };
                    if (node.pendingUpdates.eventListners?.add) {
                        for (const [type, handler] of Object.entries(node.pendingUpdates.eventListners.add)) {
                            attachEventListener(el, type, handler);
                        };
                    }
                    if (node.pendingUpdates.pendingChildrens) {
                        node.pendingUpdates.pendingChildrens.forEach(childNode => {
                            el.appendChild(renderNode(childNode));
                        });
                    }
                    node.pendingUpdates = { eventListners: { add: {} } };
                };

                updatableNodes.clear();

                // Render and append root pending children
                const pendingList = activeStateName && multiState[activeStateName]
                    ? multiState[activeStateName].pendingRootChildrens
                    : rootPendingUpdates.newChildrens;
                if (pendingList.length > 0) {
                    pendingList.forEach(node => {
                        dom.appendChild(renderNode(node));
                    });
                    pendingList.length = 0;
                }
            },
            eventListner: {
                attach: (type, handler) => vDomEventListener.attach(vDom, type, handler)
            },
            export: {
                log: () => {
                    console.log("Exporting virtual DOM structure:");
                    console.log(JSON.stringify(vDom, null, 2));
                },
                save: (filename = "virtualDom.json") => {
                    const json = JSON.stringify(vDom, null, 2);

                    const blob = new Blob([json], { type: "application/json" });
                    const url = URL.createObjectURL(blob);

                    const a = document.createElement("a");
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();

                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }
            }
        };
    }
};
// 

// Global Exports
export { childrenMethods }
// 
