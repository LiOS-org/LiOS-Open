# Element Methods

Not every tag is same, some tags have their own unique methods. For example, the `input` tag has a `getValue` method to get the value of the input field. These methods are called element methods and they are specific to certain tags.

We are constantly adding new element methods to make it easier to work with different types of elements. You can find the list of all  the tags that currently supports element methods in the table below.

- Note: The element methods are not available for all tags, only for the ones that we have implemented them for. If you try to use an element method on a tag that does not support it, you will get an error.
- Element methods are a core part of the `ui` module and do not need to be imported separately or initialized. They are injected on the elements that support them as soon as you create them using the `child` method.
- Element methods are designed to be used in a chainable manner, allowing you to perform multiple operations on an element in a single line of code. For example, you can create a new input element and set its value and placeholder in one line:

```JS
const input = main.child("input").value("Hello World").placeholder("Enter text here" );
```

- Currently elementMethods are not available for `select()` method while creataing the `UI` instance.
  

## Tags with Element Methods

<div align = "center">

Tag |   Documentation
--- | ---
a | [View](elementMethods/a.md)
input | [View](elementMethods/input.md)
img | [View](elementMethods/img.md) 
svg | [View](elementMethods/svg.md)

</div>

<div align = "center">

[<- Back: Event Listeners](child.md) | [Next: Parent ->](parent.md)

</div>