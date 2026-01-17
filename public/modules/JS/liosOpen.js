export function liosPopup(action, identifier) {
  const selectPopup = document.querySelector(identifier);
  if (action == "open") {
    selectPopup.style.display = "flex";
    selectPopup.classList.remove("pop-up-is-closing");
    selectPopup.classList.add("pop-up-is-opening");
  } else if (action == "close") {
    selectPopup.classList.remove("pop-up-is-opening");
    selectPopup.classList.add("pop-up-is-closing");
    selectPopup.style.display = "none";
  } else {
    console.log("LiOS-Open: module error, unsupported action on LiOS-Popup module");
  };
};
export async function constructLiosPopup(content, frosted) {
  const randomId = "lios-pop-up-" + crypto.randomUUID();
  let popupContainer;
  await async function () {
    popupContainer = document.createElement("div");
    popupContainer.classList.add("lios-pop-up", "pop-up-is-opening");
    if (frosted === true) {
      popupContainer.classList.add("frosted_background");
    };
    popupContainer.id = randomId;
    popupContainer.innerHTML = content;
    document.body.appendChild(popupContainer);
  }();

  function close() {
    liosPopup("close", `#${randomId}`);
    document.body.removeChild(document.body.querySelector(`#${randomId}`));
  }
  document.body.querySelector(`#${randomId}`).style.display = "flex";
  if (document.querySelector(`#${randomId} .lios-constructed-popup-close`)) {
    document.querySelector(`#${randomId} .lios-constructed-popup-close`).addEventListener("click", () => {
      close();
    });
  };
  return {
    close,
    element: popupContainer
  };
};
export { constructWindow as liosWindow } from "./windows.js";
export {virtualDom as liosVirtualDom} from "./virtualDom.js"