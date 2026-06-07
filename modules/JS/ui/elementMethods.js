export const elementMethods = {
    a: function () {
        this.href = (url) => {
            this.attr({
                "href": url
            });
            return this;
        };
        this.clearDefaults = (brute = false) => {
            this.style().set({
                "text-decoration": "none",
                "color": "inherit"
            });
            if (brute) {
                this.style().set({
                    "all": "unset"
                });
            };
            return this;
        };
        this.target = (value) => {
            this.attr({
                "target": value
            });
            return this; 
        }
    },
    img: function () {
        this.src = (url) => {
            this.attr({
                "src": url
            });
            return this;
        };
        this.alt = (text) => {
            this.attr({
                "alt": text
            });
            return this;
        };
        this.clearDefaults = () => {
            this.style().set({
                "display": "block"
            });
            return this;
        }
    },
    input: function () {
        this.placeholder = (text) => {
            this.attr({
                "placeholder": text
            });
            return this;
        };
        this.getValue = () => {
            const value = this.getElement().value;
            return value;
        };
        this.clearField = () => {
            this.getElement().value = "";
            return this;
        };
        this.clearDefaults = () => {
            this.style(":focus").set({
                "outline": "unset"
            }).style().set({
                "border": "unset"
            });
            return this;
        };
    },
    svg: function () {
        this.parse = (svgString) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgString, "image/svg+xml");
            const svgElement = doc.documentElement;
            
            // Migrate attributes and classes
            for (const attr of svgElement.attributes) {
                if (attr.name === "class") {
                    const classNames = attr.value.split(" ").filter(name => name.trim() !== "");
                    classNames.forEach(className => {
                        this.class.add(className);
                    });
                    continue;
                }
                this.attr({
                    [attr.name]: attr.value
                });
            };
            // 
            // Migrate child nodes
            const parseChildren = (svgParent, parent) => {
                for (const child of svgParent.children) {
                    const children = parent.child(child.tagName);
                    for (const attribute of child.attributes) {
                        if (attribute.name === "class") {
                            const classNames = attribute.value.split(" ");
                            classNames.forEach(className => {
                                children.class.add(className);
                            });
                            continue;
                        }
                        children.attr({
                            [attribute.name]: attribute.value
                        });
                    }
                    if (child.children && child.children.length > 0) {
                        parseChildren(child, children);
                    }
                };
            };
            parseChildren(svgElement, this);
            // 
            return this;

        }
    }
};