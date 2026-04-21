export const components = {
    method: function () {
        this.button = function () {
            const newUI = this.child("div");
            newUI.class.add("lios-button");

            newUI.buttonBackground = (value) => {
                newUI.property({
                    "--lios-button-background": value
                });
                return newUI;
            };

            newUI.buttonHoverBackground = (value) => {
                newUI.property({
                    "--lios-button-on-hover-background": value
                });
                return newUI;
            }
            newUI.text = (value) => {
                newUI.child("span").text(value);
                return newUI;
            }

            return newUI;
        };
        this.actionButton = function () {
            const newUI = this.child("div");
            newUI.class.add("lios-action-button");

            newUI.buttonBackground = (value) => {
                newUI.property({
                    "--lios-action-button-background": value
                });
                return newUI;
            };

            newUI.buttonBoxShadow = (value) => {
                newUI.property({
                    "--lios-action-button-box-shadow": value
                });
                return newUI;
            }
            newUI.text = (value) => {
                newUI.child("span").text(value);
                return newUI;
            }

            return newUI;
        };
        this.buttonGroup = function () {
            const newUI = this.child("div");
            newUI.class.add("lios-button-group");
            newUI.newButton = this.button;

            newUI.buttonBackground = (value) => {
                newUI.property({
                    "--lios-button-background": value
                });
                return newUI;
            };

            newUI.buttonHoverBackground = (value) => {
                newUI.property({
                    "--lios-button-on-hover-background": value
                });
                return newUI;
            }


            return newUI;

        };
        this.table = function () {
            const newUI = this.child("div");

            newUI.components = components;

            newUI.class.add("lios-table");

            newUI.header = newUI.child("div").class.add("lios-table-header");

            newUI.contents = newUI.child("div").class.add("lios-table-contents");

            newUI.cellGap = (value) => {
                newUI.property({
                    "--lios-table-cell-gap": value
                });
                return newUI;
            };
            newUI.tablePadding = (value) => {
                newUI.property({
                    "--lios-table-padding": value
                });
                return newUI;
            };
            newUI.headerBackground = (value) => {
                newUI.property({
                    "--lios-table-header-background": value
                });
                return newUI;
            };
            newUI.cellBackground = (value) => {
                newUI.property({
                    "--lios-table-cell-background": value
                });
                return newUI;
            };
            newUI.cellHoverBackground = (value) => {
                newUI.property({
                    "--lios-table-cell-hover-background": value
                });
                return newUI;
            };
            newUI.background = (value) => {
                newUI.property({
                    "--lios-table-background": value
                });
                return newUI;
            };

        
            newUI.newColumn = function () {

                return {
                    newUI,
                    title: function (value) {
                        newUI.header.child("div").text(value);
                        return this;
                    }
                };
            };

            newUI.newRow = function () {
                const row = newUI.contents.child("div").class.add("lios-table-row");

                return {
                    cell: (...values) => {
                        const elements = [];
                        const attachComponents = (element) => {
                            Object.defineProperty(element, "components", {
                                get() {
                                    return () => {
                                        const bound = Object.create(newUI.components);
                                        bound.method.call(element); // bind methods to element
                                        return element;
                                    };
                                }
                            });
                        };
                        values.forEach(val => {
                            if (typeof val === "string") {
                                const element = row.child("div").text(val);
                                attachComponents(element);
                                elements.push(element);
                            } else if (typeof val === "object") {
                                const text = val.text || "";
                                const events = val.events || {};
                                const element = row.child("div").text(text);
                                attachComponents(element);
                                elements.push(element);
                                if (events) {
                                    for (const [event, callback] of Object.entries(events)) {
                                        element.on(event, callback);
                                    }
                                };
                            };
                        });
                        return { newUI, elements: elements };
                    }
                };
            };

            return newUI;
        };
        return this;
    },
    metadata: {
        name: "Components for LiOS-Open UI module",
        version: "1.0.0",
        versionCode: 1,
        api: {
            min: 1,
            max: 2
        },
        capabilities: {
            addsMethods: true,
            overridesMethods: false,
            addsProperties: true
        }
    }
};