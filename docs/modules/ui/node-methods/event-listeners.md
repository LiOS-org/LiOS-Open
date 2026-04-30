# Node Methods: Event Listeners

This method provides methods to add and remove event listeners from the element. It takes an object as an argument where the keys are the event types and the values are the corresponding event handler functions.

## Add Event Listener

```JS
const hello = ()=>{
    window.alert("Hello, World!");
}
main.on("click", hello); // It is recommended to store the event handler function in a variable so that it can be easily removed later.
```

## Remove Event Listener

```JS
main.off("click", hello); // This will remove the click event listener that was added earlier.
```
> Note:
> - The `off` method requires the same event handler function that was used in the `on` method to remove the event listener. If you use an anonymous function in the `on` method, you won't be able to remove it later because you won't have a reference to the function.

## removeAllListeners()

This method removes all event listeners from the element.

```JS
main.removeAllListeners();
```

> Are you looking for
> - [Remove method](remove.md)


<div align = "center">

[<- Back: Attributes](attribute.md) | [Next: New Child ->](child.md)

</div>