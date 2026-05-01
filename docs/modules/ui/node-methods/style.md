# Node Methods : Style

The `style` method is used to set the style of the element. It takes an object as an argument where the keys are the CSS properties and the values are the corresponding values for those properties.

```JS
main.style({
    "background-color": "red",
    "color": "white",
    "font-size": "20px"
});
```
> Note: 
> - Repeated use will not override the previous styles, it will add to the existing styles.
> - To override a specific style, you can use the `style` method again with the same property and a new value.

<div align = "center">

[<- Back: Text](text.md) | [Next: CSS: Properties ->](property.md)

</div>