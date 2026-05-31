# Node Methods

After initialization of the `ui` module, it returns a bunch of nodeMethods that can be used to manipulate the DOM elements. 

> Pro tip: Do `console.log(main)` to see all the available methods and properties of the `main` variable.

## Node Methods Table
<div align = "center">

| Method | Description | Documentation |
|--------|-------------|---------------|
|text(value)| sets the text content of the element | [View](node-methods/text.md)|
|child()| creates a new child element and returns it | [View](node-methods/child.md)|
|parent()| returns the parent element | [View](node-methods/parent.md)|
|styleMethods| Manages CSS styling of an element | [View](node-methods/style.md)|
|property(object)| sets the property of the element | [View](node-methods/property.md)|
|Event Listeners| allows you to add event listeners to the element | [View](node-methods/event-listeners.md)|
|remove()| removes the element from the DOM | [View](node-methods/remove.md)|
|id(value)| sets the id of the element | [View](node-methods/id.md)|
|class()| Allows you to add or remove classes from the element | [View](node-methods/class.md)|
|attr(object)| sets the attribute of the element | [View](node-methods/attribute.md)|


</div>

- Additionally, there is also aboutElements methods which returns read only properties of the element such as `tagName`, `children` etc. You can find more about these methods in the [About Elements](about-elements.md) documentation.

<div align = "center">

[<- Back: Initialization](initialization.md) | [Next: Id ->](node-methods/id.md)

</div>