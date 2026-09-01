# Overlays

This module provide a set of overlays like `window` and `popup`.


## Initializing the module

```JS
liosOpen.ui.extend("overlays", liosOpen.uiExtensions.overlays);

const main = new liosOpen.ui("main");

```
> ⚠️ This module requires `body` to be present in the DOM, so make sure to initialize it after the DOM is ready.

## Supported Overlays

<div align = "center">

|Overlay|Description|Documentation|
|---|---|---|
|Window|A draggable and resizable window overlay.|[View](overlays/window.md)|
|Popup|A simple popup overlay.|[View](overlays/popup.md)|
|ToolTip|A simple tooltip overlay.|[View](overlays/tooltip.md)|

</div>

<div align = "center">

| [Next: Window ->](overlays/window.md) 

</div>