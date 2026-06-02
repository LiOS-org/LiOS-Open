# Node Methods : Attribute
The `attribute` method is used to set the attributes of the element. It takes an object as an argument where the keys are the attribute names and the values are the corresponding values for those attributes.

```JS
main.attr({
    "data-id": "123",
    "aria-label": "Main Element"
});
```

> Note:
> - Repeated use will not override the previous attributes, it will add to the existing attributes.
> - To override a specific attribute, you can use the `attribute` method again with the same attribute and a new value.



<div align = "center">

[<- Back: property](property.md) | [Next: Event Listeners ->](label.md)

</div>