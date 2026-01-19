export const virtualDom = {
    new: async () => {
        let vDom = [];
        let dom;
        let id;
        let parent = vDom;
        let classList = [];
        let domContent;
        let savedDomContent = {};
        const generateRandomUid = async () => {
            const cryptoUid = crypto.randomUUID();
            const randomUid = `virtualDom-${cryptoUid}`;
            return randomUid;
        };
        const saveDom = async (node) => {
            const randomId = await generateRandomUid();
            savedDomContent[randomId] = {
                id: randomId,
                content: node
            };
            return randomId;
        };
        const appendTo = (parent, node) => {
            if (parent === "root") {
                vDom.push(node);
                return;
            };
            if (parent && parent.__node__) {
                parent.__node__.children.push(node);
                return;
            };
        };
        const newChild = async (tag) => {
            const node = {};
            node.children = [];
            node.tag = tag;
            node.props = {
                class: [],
                id: "",
                attributes: {}
            };
            const chidrenMethods = {
                classList: (classList) => {
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
                appendTo: (parent) => appendTo(parent, node),
                __node__: node
            };
            return chidrenMethods;
        };
        const renderNode = (node) => {
            const el = document.createElement(node.tag);

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
                    el.appendChild(renderNode(childNode));
                });
            }

            return el;
        };
        return {
            select: (domSelector) => {
                dom = document.querySelector(domSelector);
            },
            newChild,
            classList: (classListArray) => {
                classListArray.forEach(className => {
                    classList.push(className);
                });
            },
            id: (idString) => {
                id = idString;
            },
            render: () => {
                const newNode = document.createElement("div");

                if (id.length > 0) {
                    newNode.id = id;
                }

                if (classList.length > 0) {
                    classList.forEach(className => {
                        newNode.classList.add(className);
                    });
                }

                // 🔑 render root-level nodes
                vDom.forEach(node => {
                    newNode.appendChild(renderNode(node));
                });

                dom.replaceWith(newNode);
            }
        };
    }
};