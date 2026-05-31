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
    }
};