# Node Methods : Label
The `label` method is used to set the label of the element. It takes a string as an argument which will be the aria-label of the element.

```JS
main.label("Main Element");
```

> Note:
> - This is a shorthand method for setting the `aria-label` attribute of the element. It is equivalent to using the `attribute` method like this:
> ```JS
> main.attr({
>     "aria-label": "Main Element"
> });
> ```
> - Repeated use will override the previous label with the new value.



<div align = "center">

[<- Back: attribute](attribute.md) | [Next: Event Listeners ->](event-listeners.md)

</div>