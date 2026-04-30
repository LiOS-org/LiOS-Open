# Node Methods: Parent

As the `ui` module supports chaining, you can use the `parent` method to return the parent element of the current element. This is useful when you want to manipulate the parent element after creating a child element.

```JS
newChild.parent().style({ backgroundColor: "red" }); // sets the background color of the parent element to red
```
> This method is redundant if you are not using chaining, as you can directly manipulate the parent element without using the `parent` method.

> This method is provided for convenience only, and is highly discouraged to be relied upon.

<div align = "center">

[<- Back: Child](child.md) | [Next: Remove Element ->](remove.md)

</div>