export class loader {
    #canvas = document.createElement("canvas");
    #ctx = this.#canvas.getContext("2d");

    constructor({ size = "90px", location = document.body, background }) {
        const style = this.#canvas.style;
        this.#canvas.setAttribute("width", size);
        this.#canvas.setAttribute("height", size);
        style.display = "block";
        style.position = "absolute";
        style.left = "50%";
        style.top = "50%";
        style.transform = "translate(-50%, -50%)";

        if (typeof location == "string") {
            document.querySelector(location).appendChild(this.#canvas);
        } else if (location instanceof HTMLElement) {
            location.appendChild(this.#canvas);
        } else {
            console.error(new Error("Incompatible location", {
                cause: "location must be either CSS selector or and HTMLElement"
            }));
        };

        const rect = this.#canvas.getBoundingClientRect();
        this.#canvas.width = Math.round(rect.width);
        this.#canvas.height = Math.round(rect.height);

        const cx = this.#canvas.width / 2;
        const cy = this.#canvas.height / 2;

        // Compose the diamond shape
        this.#ctx.fillStyle = background;
        this.#ctx.beginPath();
        this.#ctx.moveTo(cx, cy - this.#canvas.height / 2);
        this.#ctx.lineTo(cx - this.#canvas.width / 2, cy);
        this.#ctx.lineTo(cx, cy + this.#canvas.height / 2);
        this.#ctx.lineTo(cx + this.#canvas.width / 2, cy);
        this.#ctx.closePath();
        this.#ctx.fill();
        // 
    };
};