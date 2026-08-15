# Capabilities of UI Extensions

UI Extensions are attached directly to each [nodeMethods](./../node-methods.md) instance, giving them access to that instance through `this`.

## Accessing `this` inside an extension

`this` can be accessed inside an extension exactly how you would access it inside another function. For example:-

```JS
const block = main.child("div"); //Where main is our root element
```

And inside the extension

```JS
this.style().set({
    background:"red"
});
```
is equivalent to:-

```JS
block.style().set({
    background:"red"
});
```

### What `this` provides

Inside `this` you will have access to very powerful methods such as:-

1. Every single [nodeMethods](./../node-methods.md)
2. Access to [ctx](./context.md)
3. Access to methods from other extensions
4. Access to [elementMethods](../node-methods/elementMethods.md)(if applicable)

## Adding new capabilities using extensions

For example lets assume we want to add a functionality which triggers `window.alert`, with the `identifier` of the element followed by a custom message.

Inside the extension:-

```JS
this.alert = (value)=>{
    const message = `${this.vDOM.identifier}: ${value}`;
    window.alert(message);
    return this; //Allow chaining
}
```
>Note: While methods can be an arrow function, the structure of the overall extension should exactly match the structure as discussed in [creating an extension](./creating-an-extension.md).

The newly created method can be accessed the newly created method:-

```JS
block.extensionName().alert("Demo");//Here extension name can be anything you named during installation.
```

## Using extensions as scripts, wrappers, or factory functions

Let's say we want to build a card, which has three buttons and a content box. First button is at the top right which is an info button, after that we have the content box displaying whatever content we want, then we have a button group where first button is for copying the content while the other is for sharing the content.

Without the factory function we would need something like this:-

```JS
const contentBox = main.child("div"); //Creating the main box

const infoButton = contentBox.components().button("div").text("Info"); //Creating the info button
infoButton.style().set({
    justifySelf:"right"
}); //Placing it to right side of the box

const content = contentBox.child("div"); //Creating the content area
const textContent = "Text Content"
content.text(textContent); //Manually setting the text content

const buttonGroup = contentBox.components().buttonGroup(); //Creating the button group

const share = buttonGroup.components().button("div").text("share").on("click",()=>{
    navigator.share(textContent);
});
const copy = buttonGroup.components().button("div").text("copy").on("click",()=>{
    navigator.clipboard.writeText(textContent);
});
```
While it is okay and probably a better choice for a single use case, it is tedious, prone to inconsistencies and human errors, and creates boilerplate code when we want to use it multiple times.

But in an extension, same code becomes:-

```JS
this.contentBox = (textContent)=>{
    const contentBox = this.child("div"); //Creating the main box

    const infoButton = contentBox.components().button("div").text("Info"); //Creating the info button
    infoButton.style().set({
        justifySelf:"right"
    }); //Placing it to right side of the box

    const content = contentBox.child("div"); //Creating the content area
    content.text(textContent); //Manually setting the text content

    const buttonGroup = contentBox.components().buttonGroup(); //Creating the button group

    const share = buttonGroup.components().button("div").text("share").on("click",()=>{
        navigator.share(textContent);
    });
    const copy = buttonGroup.components().button("div").text("copy").on("click",()=>{
        navigator.clipboard.writeText(textContent);
    });
    return contentBox;
}
```
With only exactly 3 lines of additional code, we made it reusable, consistent, avoided boilerplate code and most importantly, whenever you want to update it, you update it once.

Here is how it can be used:-

```JS
main.extensionName().contentBox("Demo Content");//Here extension name can be anything you named during installation.
main.extensionName().contentBox("Another Box");
main.extensionName().contentBox("Third Box");
```
Notice that there’s no repeated boilerplate. Every content box remains consistent, and updating the implementation only requires changing the extension once.

## Executing an initFunction

> Note: Init Function is an advanced extension feature, initFunction runs once for every newly created [nodeMethods](./../node-methods.md) instance. It does not run again for that same instance, but it will run for every additional instance created through new `ui()`, `child()`, `parent()`, `remove()`, and similar APIs.

While creating an extension, you can define an initFunction, which automatically gets executed on every [nodeMethods](../node-methods.md) instance initialization those are `new ui()`, `child()`, `parent()`, `remove()` etc.

The function has full access to the element's `this` and here is an small example:-

If you are creating an extension related to UI, you might need to provide its CSS, instead of telling the user to manually import CSS every time you can use the [ctx](context.md) or context provided by the `UI` module.

```JS
// We have an extension named cards, which depends on `cards.css`

initFunction: function(ctx){
    ctx.styleEngine.installCSS(URL);
};
```
Again structure of extension will be discussed in [creating an extension](./creating-an-extension.md).

>Note: Make sure to handle deduplication, as mentioned initFunction runs every time a [nodeMethods](./../node-methods.md) is initiated, even for methods like `parent()` and `remove()`

> There can only be one initFunction per extension. [Learn More](./advance-extension-capabilities.md)

> `installCSS()` automatically handles deduplication. [Learn More](./context.md)

> Unlike normal methods, you need to explicitly accept `ctx` in as a parameter.


<div align = "center">

[<- Back: Installing UI Extensions](extensions.md) | [Next: About Context ->](./context.md)

</div>