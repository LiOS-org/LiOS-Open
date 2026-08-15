# About Context

`Context` is a special object that is available to every extension method via `this.ctx` which is a getter function. It is also available in the `initFunction` as a parameter. While `context` can be accessed via extensions, it is provided by the `UI` module, and is also available to the user.

`Context` provides access to some static methods from [nodeMethods](../node-methods.md) and [StyleEngine](../style-engine.md).

## Accessing Context without extensions

`Context` provides some very useful functionalities that are even useful outside extensions. They can be accessed as follows:-

```JS
// Assuming UI module is already imported
const nodeMethods = ui.nodeMethods; //Provides access to nodeMethods static methods
const styleEngine = ui.styleEngine; //Provides access to StyleEngine static methods
```

Note that `context` is a static object, it doesn't depends on any instance of `UI` or `nodeMethods`, it is available as soon as the `UI` module is imported.

> Note: `Context` can't be accessed from an initialized `UI` instance, it must be accessed from the `UI` module itself, as it is a static object.

## Accessing Context inside extensions

Inside extensions, `Context` can be accessed via `this.ctx` which is a getter function. It is also available in the `initFunction` as a parameter.

> Note: Because `Context` is static, it doesn't depend on `this` and can be used with lexical scoping, but `extension methods` and `initFunction` must be a classic function, not an arrow function, otherwise `this` will be undefined and `this.ctx` will throw an error.

Example of accessing `Context` inside an extension method:-

```JS
method:function(){
    const context = this.ctx;
};
```
Example of accessing `Context` inside an `initFunction`:-

```JS
initFunction: function(ctx){
    //ctx is the context object
};
```

## Context Table

Here is a table of all the methods available in `Context` object, along with their description,  documentation and provider.

<div align = "center">

| Method | Description | Docs | Provider |
|--------|-------------|------|----------|
|newPortal| Creates a new portal element|[Docs](../node-methods/portals.md)|nodeMethods|
|installCSS| Installs a CSS file to the document head, and handles deduplication|[Docs](./../style-engine/install-css.md)|StyleEngine|
|cloneStyle| Clones the style of an element to a classname, and returns the classname. Works across `UI` instances|[Docs](./../style-engine/clone-style.md)|StyleEngine|
|connect| Connects to a `nodeMethods` instance, and provides fluent CSS chaining|[Docs](./../style-engine/connect.md)|StyleEngine|

</div>

<div align = "center">

[<- Back: Capabilities](./capabilities.md) | [Next: Creating an extension ->](./creating-an-extension.md)

</div>