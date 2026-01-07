import { liosWindow } from "./modules/JS/liosOpen.js";

const testWindow = await liosWindow.new();
testWindow.setId("Test-Window");
testWindow.applyEffect.frostedGlass();
testWindow.setTitle("Test Window");
testWindow.setContents("<p>This is a test window.</p>");
console.log(testWindow);

document.querySelector(".test-window").addEventListener("click", () => {
    testWindow.open();
});