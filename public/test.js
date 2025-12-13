import { liosPopup } from "./modules/JS/liosOpen.js";

document.querySelector(".open-pop-up").addEventListener("click", () => {
    liosPopup("open", ".test-pop-up");
});
document.querySelector(".close-pop-up").addEventListener("click", () => {
    liosPopup("close", ".test-pop-up");
});