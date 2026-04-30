# Initialize UI

Now we have `UI` imported, we can initialize it in three ways

1. Initialize using existing [document element](#initialize-using-existing-document-element)
2. Initialize using new [HTML element](#initialize-using-new-html-element)
3. Initialize using [virtual  root ](#initialize-using-virtual-root)

## Initialize using existing document element

> Recommended for most use cases, it is the most efficient and straightforward method to initialize `UI` module.

For this method the `HTML Object` must already exist in the `DOM` and we will select it using `UI` and store it inside a variable for later use.
```HTML
<main></main>
```

```JS
const main = new ui("main");
```
> You can pass any valid `CSS selector` to the `ui()` function, it will select the first element that matches the selector and store it inside the variable `main`.

## Initialize using new HTML element

> Least efficient method, it is not recommended to use this method unless you have a specific use case that requires it.

```JS
const newElement = document.createElement("main");
document.body.appendChild(newElement);
const main = new ui(newElement);
```

## Initialize using virtual root

> Most efficient method, it is recommended to use this method if you don't need to interact with existing `HTML elements` and want to create everything from scratch.

```JS
const main = new ui().create("main","body");
```
### Explanation
1. We created a new instance of `UI` without passing any selector, which means it is not attached to any existing `HTML element` and is a virtual root.
2. We used the `create()` method to create a new `main` element and attached it to the `body` element.

> Note: For virtual root, no parameter should be passed to the `ui()` function, otherwise it will try to select an existing element and fail if it doesn't exist.
>
> `create()` method takes two parameters, the first one is the tag name of the element you want to create and the second one is the selector of the parent element you want to attach it to.
>
> `Parent` can be both an `HTMLElement` or a `CSS selector`, if it is a `CSS selector`, it will select the first element that matches the selector and attach the new element to it.
>
> `create()` is only available for virtual root, if you try to use it on an instance that is already attached to an existing element, it will throw an error.


<div align = "center">

[<- Back: UI](../ui.md) | [Next: Initialization ->](node-methods.md)

</div>