export const svgParser = async (svg, appendTo) => {
    const node = {};
    node.children = [];
    node.tag = "svg";
    node.props = {
        class: [],
        id: "",
        attributes: {}
    };
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, "image/svg+xml");

    const svgElement = doc.documentElement;

    for (const attribute of svgElement.attributes) {
        if (attribute.name === "class") { 
            const classNames = attribute.value.split(" "); 
            classNames.forEach(className => {
                node.props.class.push(className);
            });
            continue;
        }
        node.props.attributes[attribute.name] = attribute.value;
    }

    const parseChildren = (parentNode, targetNode) => {
        for (const child of parentNode.children) {
            const childNode = {};
            childNode.children = [];
            childNode.tag = child.tagName;
            childNode.props = {
                class: [],
                id: "",
                attributes: {}
            };
            for (const attribute of child.attributes) {
                if (attribute.name === "class") {
                    const classNames = attribute.value.split(" ");
                    classNames.forEach(className => {
                        childNode.props.class.push(className);
                    });
                    continue;
                }
                childNode.props.attributes[attribute.name] = attribute.value;
            }
            targetNode.children.push(childNode);
            if (child.children && child.children.length > 0) {
                parseChildren(child, childNode);
            }
        };
    };
    parseChildren(svgElement, node);

    return {
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
                }
                if (typeof value === "object") {
                    node.props.attributes[key] = JSON.stringify(value);
                    return;
                }
                node.props.attributes[key] = String(value);
            });
        },
        appendTo: (parent, stateName) => appendTo(parent, node, stateName),
        __node__: node
    };
};
