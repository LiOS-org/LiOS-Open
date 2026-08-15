# Style Engine

`StyleEngine` handles and manages `CSS` throughout the `UI` module, it provides you methods to add and remove styling from specific node, or to install a whole CSS file, wanna use fluent chainable methods for styling `StyleEngine` handles that.

## Why StyleEngine

As we know `UI` module is a `CSR` library, which has to do most of its work inside the `browser`, and withing the `browser APIs`. An easier and traditional approach would had been to use inline `CSS`:-

```JS
const element = document.createElement("div");
element.style.background = "red";
```

But it has some limitations and drawbacks

1. HTML pollution and
2. No way of doing pseudo states

Another option would had been to ask the users to provide their own `CSS` file, which is obviously can't be reasoned about.

So we landed on a sweet spot, `StyleEngine`. It is intended to not only make styling encapsulated but to provide ability to do `pseudo state` which is impossible in inline styling.

Other features such as fluent CSS chaining ([see connect](./style-engine/connect.md)), style cloning ([see cloneStyle](./style-engine/clone-style.md)) or CSS installation ([see installCSS](./style-engine/install-css.md)) were added afterwards as an extension to the existing engine.

## How it works

`StyleEngine` is initiated per instance of the `UI` module, it bind directly to the `vDOM` and installs an empty `style` tag in the head.

> Depending on the browser, the style tag will render empty even if it contains styling

Each `UI` instance has exactly one `style` tag, and every style added via the `StyleEngine` is isolated to that specific `UI` instance.

`StyleEngine` uses the browser's `CSSOM` capabilities and offload most of the work to browser which otherwise else-wise required a backend server.

## How to use it

While `StyleEngine` is a separate `class`, it functionality is exposed only via either [context](./ui-extensions/context.md) and the style API from the [nodeMethods](./node-methods.md).
