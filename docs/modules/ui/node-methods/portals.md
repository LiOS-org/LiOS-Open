# Portals

In the `UI` module, portals are special child nodes that are outside the instance's child hierarchy and can be placed anywhere inside the `DOM`.

Although a portal is mounted outside an instance’s DOM hierarchy, it still participates in the instance’s vDOM hierarchy. Portals inherit every [nodeMethods](../node-methods.md) as any another child.

## Creating a portal

We can use the [context](../ui-extensions/context.md) or use the static method provided by the `UI` module to create a new portal.

```JS
// Using the static method from the UI module
const portal = ui.nodeMethods.newPortal("body","div");
```

This will return the specialized `vDOM` structure for the new portal.

The first parameter (we used body) is the `parent` parameter, and it needs to already mounted in the `DOM`, if there are multiple elements with the provided `parent` identifier in the `DOM`, it will use the first one (Same as how `document.QuerySelector()` works).

The second parameter is (we used div) is the `newChild` parameter, and it receives the `tagName` of the element you want to create as a portal in `string` format.

>**Note:** Because upon mounting, it mirrors the behavior of an ordinary [child node](../node-methods/child.md) it will also automatically register [element methods](../node-methods/elementMethods.md) if applicable.

## Mounting a portal

In order to mount a portal, you need an initialized instance of the `UI` module, upon mounting it will mirror the behavior of an ordinary [child node](../node-methods/child.md) and also will be considered as a child of the `node` or `root instance` it is mounted on.

For example:- 

```JS
const main = new ui("main"); //Creates a new instance on main
const block = main.child("div"); //Creates a new div child

//Connecting the portal

const connectedPortal = block.connectPortal(portal) //Connects to the portal, while treating it as a child of block
```
`connectPortal` will return a [nodeMethods](../node-methods.md) instance.

## Limitations of the portals

1. Different from `nodeMethods.child(tagName)`
   
   Portals follows a different lifecycle from the `nodeMethods.child(tagName)`. For context when you create a portal, it is created in memory instantly and return you the `vDOM` structure with special properties, and after you connect to it then it bounds [nodeMethods](../node-methods.md) to it and handles child-parent relationship. 

   Because it follows a different path, there will be some feature parity differences, for example currently there is no way to handle an `svg` string as `nodeMethods.child(tagName)` does automatically, even if you pass `svg` in the `newChild` parameter of the `newPortal` method, it will be created as a normal element, not with `SVG Namespace`.
2. Can only be connected once.
   
   Portals are designed to only have one parent, and only to be connected once, it is not a limitation in an exact sense but a design choice which will not allow you to connect to a single portal more than once.
3. No automatic `parent` creation

    As mentioned previously, the `selector` (selector because you can also pass classnames, element id or anything `document.querySelector` accepts) passed inside the `parent` parameter in `createPortal` needs to be already present in `DOM`, and the `UI` module will not create it that for you, failing the condition will greet you with an error.