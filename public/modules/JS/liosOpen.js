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
