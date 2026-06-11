export const effects = {
    method: function () {
        this.frostedGlass = function (options = {}) {
            this.class.add("lios-frosted-glass");
            if (options.blur) {
                this.property({
                    "--lios-frosted-glass-blur": options.blur
                });
            };
            if (options.saturation) {
                this.property({
                    "--lios-frosted-glass-saturate": options.saturation
                });
            };
            if (options.blendMode) {
                this.property({
                    "--lios-frosted-glass-blend-mode": options.blendMode
                });
            };
            if (options.zIndex) {
                this.property({
                    "--lios-frosted-glass-index": options.zIndex
                });
            };
            if (options.background) {
                this.property({
                    "--lios-frosted-glass-background": options.background
                });
            };
                
            return this;
        };
        this.textShadow = function (options = {}) {
            this.class.add("lios-text-shadow");
            if (options.color) {
                this.property({
                    "--lios-text-shadow-text": options.color
                });
            };
            if (options.offsetX) {
                this.property({
                    "--lios-text-shadow-offsetX": options.offsetX
                });
            };
            if (options.offsetY) {
                this.property({
                    "--lios-text-shadow-offsetY": options.offsetY
                });
            };
            if (options.blurRadius) {
                this.property({
                    "--lios-text-shadow-blur-radius": options.blurRadius
                });
            };
            if (options.shadowColor) {
                this.property({
                    "--lios-text-shadow-color": options.shadowColor
                });
            };
            this.noTextShadowBlur = () => {
                this.property({
                    "--lios-text-shadow-blur-radius": "0"
                });
                return this;
            };


            return this;
        }
        return this;
    },
    metadata: {
        name: "Effects for LiOS-Open UI module",
        version: "1.0.0",
        versionCode: 1,
        api: {
            min: 2,
            max: 3
        },
        capabilities: {
            addsMethods: true,
            overridesMethods: false,
            addsProperties: true
        }
    }
};