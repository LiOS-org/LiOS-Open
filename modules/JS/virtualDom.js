export const virtualDom = {
    new: async() => {
        let dom;
        let domContent;
        let savedDomContent = {};
        const vDom = [
            {
                tag: "nav",
                props: {
                    class: ["lios-header-nav-2", "lios-frosted-glass"]
                },
                children: [
                    {
                        tag: "div",
                        props: {
                            class: ["lios-header-nav-2-branding"]
                        },
                        children: [
                            {
                                tag: "img",
                                props: {
                                    src: "imageUrl",
                                    alt: "its alt"
                                },
                                children: []
                            }
                        ]
                    },
                    {
                        tag: "div",
                        props: {
                            class: ["lios-header-nav-2-buttons"]
                        },
                        children: [
                            {
                                tag: "div",
                                props: {
                                    class: ["lios-header-nav-2-button"]
                                },
                                children: [
                                    {
                                        tag: "span",
                                        props: {},
                                        children: ["Products"]
                                    },
                                    {
                                        tag: "span",
                                        props: {},
                                        children: [
                                            {
                                                tag: "svg",
                                                props: {
                                                    /* svg attributes */
                                                },
                                                children: []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];
        const generateRandomUid = async () => {
            const crypto = crypto.randomUUID();
            const randomUid = `virtualDom-${crypto}`;
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
        return {
            select: (domSelector) => {
                dom = document.querySelector(domSelector);
            },
            replace: async (replacerNode, node) => {
                const cloneNode = node.cloneNode(true)
                await saveDom(cloneNode);
                if (!node) {
                    let savedClassList;
                    let savedId;
                    if (dom.classList) {
                        savedClassList = [dom.classList];
                    };
                    if (dom.Id) {
                        savedId = domContent.id;
                    };
                    dom.parentNode.dom.replace(dom,replacerNode);
                } else {
                    dom.replace(node, replacerNode);
                };
            },
            saveDom,
            newNode: async (type, classList = [], id) => {
                const nodeId = await generateRandomUid();
                const node = {
                    type: type,
                    props: {
                        classList: classList,
                        id: id
                    },
                    nodeId: nodeId

                };
                return { node };
            },
            render: (node, location)=>{
                newVnode = document.createElement(node.type);
                if (node.props.classList.length > 0) {
                    node.props.classList.forEach(className => {
                        newVnode.classList.add(className);
                    });
                };
                if (node.props.id) {
                    newVnode.id = node.props.id;
                };
                if (location) {
                    location.appendChild(newVnode);
                } else {
                    dom.appendChild(newVnode);
                };
            },
            applyState: async (stateId)=>{
                const savedNode = savedDomContent[stateId];
                dom.parentNode.replace(savedNode.content);
                await saveDom(savedNode.content);
            }
        };

    }
};