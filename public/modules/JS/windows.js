export const  constructWindow = {};

constructWindow.new = async () => {
  const windowContainer = document.createElement("div");
  const windowUid = "lios-window-" + crypto.randomUUID();
  windowContainer.classList.add("lios-window-container", windowUid);


  const enableDrag = (titlebar, container) => {
    let isDragging = false;
    let offsetX, offsetY = 0;

    titlebar.addEventListener("mousedown", (e) => {
      isDragging = true;
      const rect = container.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      document.body.style.userselect = "none";

    });
    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;

      container.style.left = `${e.clientX - offsetX}px`;
      container.style.top = `${e.clientY - offsetY}px`;
    });
    
    document.addEventListener("mouseup", () => {
      if (!isDragging) return;
      isDragging = false;
      document.body.style.userselect = "unset";
    });
  };

  const close = () => {
    windowContainer.remove();
    history.replaceState(null, "", window.location.pathname);
  };
  return {
    setId: (id) => {
      windowContainer.id = id;
    },
    setTitle: (Title) => {
      const windowTitle = document.createElement("div");
      windowTitle.innerHTML = //html
        `
        <div class="lios-window-titlebar">
          <span class="lios-window-title">${Title}</span>
          <span class="lios-window-close">X</span>
        </div>
        <hr>
      `;
      const closeButton = windowTitle.querySelector(".lios-window-close");
      closeButton.addEventListener("click", close);
      windowContainer.appendChild(windowTitle);
      const titleBar = windowTitle.querySelector(".lios-window-titlebar");
      enableDrag(titleBar, windowContainer);
    },
    setContents: (content) => {
      const windowContentWrapper = document.createElement("div");
      windowContentWrapper.classList.add("lios-window");
      const windowContent = document.createElement("div");
      windowContent.classList.add("lios-window-contents");
      windowContent.innerHTML = content;
      windowContentWrapper.appendChild(windowContent);
      windowContainer.appendChild(windowContentWrapper);
    },
    applyEffect: {
      frostedGlass: () => {
        windowContainer.classList.add("lios-frosted-glass");
      }
    },
    removeEffect: {
      frostedGlass: () => {
        windowContainer.classList.remove("lios-frosted-glass")
      }
    },
    close,
    open: () => {
      document.body.appendChild(windowContainer);
      const thisWindow = document.querySelector(`.${windowUid}`);
      windowContainer.style.height = "var(--default-height)";
      windowContainer.style.width = "var(--default-width)";
      windowContainer.style.inset = "var(--default-inset)";
      windowContainer.style.display = "flex";
      window.location.href = `#${windowContainer.id}`;
    }
  };
};
