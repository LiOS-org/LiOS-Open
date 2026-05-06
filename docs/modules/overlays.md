# Overlays

This module provide a set of overlays like `window` and `popup`.

## Getting Started

```JS
import {overlays} from "${path-to-lios-open}/modules/JS/ui/overlays.js";
```

- CSS is also required
  ```CSS
  @import url(${path-to-lios-open}/modules/css/pop-up.css); /*For popup*/

  @import url(${path-to-lios-open}/modules/css/windows.css); /*For windows*/
  ```

### Initializing the module

```JS
liosOpen.ui.extend("overlays", overlays);

const overlay = new liosOpen.ui();

```
> ⚠️ This module requires `body` to be present in the DOM, so make sure to initialize it after the DOM is ready.

> Unlike the `components` module, the `overlays` don't append child, instead, they create a new instance of [UI](ui.md) and return it, `overlays` also hijacks the `child` method of the new instance and forces the child to be appended to the overlay's content, so you don't have to worry about the structure of the overlay.


## Supported Overlays

<div align = "center">

|Overlay|Description|Documentation|
|---|---|---|
|Window|A draggable and resizable window overlay.|[View](overlays/window.md)|
|Popup|A simple popup overlay.|[View](overlays/popup.md)|

</div>

<div align = "center">

| [Next: Window ->](overlays/window.md) 

</div>