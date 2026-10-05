export class Loader {
    #canvas = document.createElement("canvas");
    #ctx = this.#canvas.getContext("2d");

    constructor({ size = "90px", location = document.body, background, pillColor, translucentDormantPill = "rgba(56,56,56,0.5)" }) {
        const style = this.#canvas.style;
        this.#canvas.setAttribute("width", size);
        this.#canvas.setAttribute("height", size);
        style.display = "block";
        style.position = "absolute";
        style.left = "50%";
        style.top = "50%";
        style.transform = "translate(-50%, -50%)";
        this.pillColor = pillColor;
        this.background = background;
        this.dormantPillColor = translucentDormantPill;

        if (typeof location == "string") {
            location = document.querySelector(location);
        } else if (location instanceof HTMLElement) {
            location = location;
        } else {
            console.error(new Error("Incompatible location", {
                cause: "location must be either CSS selector or and HTMLElement"
            }));
        };
        this.location = location;

        this.#canvas.width = parseFloat(size);
        this.#canvas.height = parseFloat(size);
        const cx = this.#canvas.width / 2;
        const cy = this.#canvas.height / 2;

        const pillHeight = this.#canvas.height * 5 / 100;
        const pillWidth = pillHeight * 2;
        const padding = this.#canvas.height * 1.25 / 100;
        const gap = this.#canvas.height * 3 / 100;


        // Compose the diamond shape
        const composeDiamond = () => {
            this.#ctx.fillStyle = background;
            this.#ctx.beginPath();
            this.#ctx.moveTo(cx, cy - this.#canvas.height / 2);
            this.#ctx.lineTo(cx - this.#canvas.width / 2, cy);
            this.#ctx.lineTo(cx, cy + this.#canvas.height / 2);
            this.#ctx.lineTo(cx + this.#canvas.width / 2, cy);
            this.#ctx.closePath();
            this.#ctx.fill();
        };
        composeDiamond();
        this.composeDiamond = composeDiamond;
        // 


        let rowCount = Math.floor((this.#canvas.height - padding * 2 + gap) / (pillHeight + gap));
        if (rowCount % 2 === 0) {
            rowCount--;
        };
        const totalHeight = rowCount * pillHeight + (rowCount - 1) * gap;
        const startY = padding + (this.#canvas.height - padding * 2 - totalHeight) / 2;



        const drawAllPills = async (color, sequence) => {
            const pills = [];
            const rings = new Map();

            for (let row = 0; row < rowCount; row++) {
                const y = startY + row * (pillHeight + gap);
                const diamondWidth = this.#canvas.width * (1 - Math.abs(y + pillHeight / 2 - cy) / (this.#canvas.height / 2));
                const availableWidth = diamondWidth - padding * 2;
                const pillCount = Math.floor((availableWidth + gap) / (pillWidth + gap));
                const rowWidth = pillCount * pillWidth + (pillCount - 1) * gap;
                const startX = cx - rowWidth / 2;

                for (let i = 0; i < pillCount; i++) {
                    const x = startX + i * (pillWidth + gap);
                    const distanceX = Math.abs(x + pillWidth / 2 - cx);
                    const distanceY = Math.abs(y + pillHeight / 2 - cy);
                    // Which ring this pill belongs to
                    const ring = Math.max(Math.round(distanceX / (pillWidth + gap)), Math.round(distanceY / (pillHeight + gap)));
                    if (!rings.has(ring)) {
                        rings.set(ring, []);
                    };
                    rings.get(ring).push({ x, y });
                };
            };
            // Outermost ring → innermost ring
            let orderedRings;
            if (sequence === "outward") {
                orderedRings = [...rings.entries()].sort(([a], [b]) => a - b);
            } else {
                orderedRings = [...rings.entries()].sort(([a], [b]) => b - a);
            };
            let previousRingDormant = null;
            let previousRingActive = null;
            const drawPill = (x, y, color) => {
                this.#ctx.fillStyle = color;
                this.#ctx.beginPath();
                this.#ctx.roundRect(
                    x,
                    y,
                    pillWidth,
                    pillHeight,
                    pillHeight / 2
                );
                this.#ctx.fill();
            };

            for (const [ringNumber, ring] of orderedRings) {
                // Current ring becomes active
                for (const pill of ring) {
                    drawPill(pill.x, pill.y, color);
                };

                // Give the browser a chance to render the active ring
                if (sequence !== "static") {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    // The previous ring becomes dormant
                    if (previousRingDormant !== null) {
                        for (const pill of previousRingDormant) {
                            drawPill(pill.x, pill.y, this.dormantPillColor);
                        };
                    };
                    previousRingDormant = ring;
                };

            };
        };
        this.drawAllPills = drawAllPills;

        const clearPills = async() => {
            this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
            composeDiamond();
            drawAllPills(translucentDormantPill);
        };
        this.clearPills = clearPills;
    };
    await = async (asyncFunction) => {
        let active = true;
        let result;
        this.location.appendChild(this.#canvas);
        const operation = asyncFunction ? asyncFunction().then(value => {
            result = value;
            active = false;
        }) : Promise.resolve().then(() => {
            active = false;
        });
        while (active) {
            this.clearPills();
            await this.drawAllPills(this.pillColor, "inward")
        };
        await operation;
        this.#canvas.remove();
        return result;
    };
    awaitInbound = this.await;
    awaitOutbound = async (asyncFunction) => {
        let active = true;
        let result;
        this.location.appendChild(this.#canvas);
        const operation = asyncFunction ? asyncFunction().then(value => {
            result = value;
            active = false;
        }) : Promise.resolve().then(() => {
            active = false;
        });
        while (active) {
            this.clearPills();
            await this.drawAllPills(this.pillColor, "outward")
        };
        await operation;
        this.#canvas.remove();
        return result;
    };
    awaitStatic = async (asyncFunction) => {
        let active = true;
        let result;
        this.location.appendChild(this.#canvas);
        const operation = asyncFunction ? asyncFunction().then(value => {
            result = value;
            active = false;
        }) : Promise.resolve().then(() => {
            active = false;
        });
        while (active) {
            this.clearPills();
            await this.drawAllPills(this.pillColor, "static");
            await new Promise(resolve => setTimeout(resolve, 100));
            this.clearPills();
            await this.drawAllPills(this.dormantPillColor, "static");
            await new Promise(resolve => setTimeout(resolve, 100));
        };
        await operation;
        this.#canvas.remove();
        return result;
    };
};