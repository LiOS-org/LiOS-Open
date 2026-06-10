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