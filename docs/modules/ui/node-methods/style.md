# Style Methods

The `styleMethods` is a powerful tool for managing the CSS styling of an element. It provides methods to set, unset, and reset styles on an element, allowing you to easily manipulate the appearance of your elements.

## Setting Styles

### Selecting target, default or pseudo state

```CSS
 /* To set styles for the default state */

main.style().set({
  color: 'red',
  backgroundColor: 'blue'
});

/* To set styles for a pseudo state */
main.style(":hover").set({
  color: 'white',
  backgroundColor: 'green'
});
```
### Setting new Styles

```CSS
main.style().set({
  color: 'red',
  backgroundColor: 'blue'
});
```
As you can see, the `set` method allows you to set multiple styles at once by passing an object with key-value pairs where the key is the CSS property and the value is the desired style.

The new styleMethods also automatically converts camelCase properties to kebab-case when applying styles, so you can use either format when setting styles.

### Removing Styles

```CSS
main.style().unset("color", "background-color");
```
The `unset` method allows you to remove a specific style from the element by passing the name of the CSS property you want to remove. We have intentionally avoided `remove` as the method name to prevent confusion with the `remove()` method that removes the entire element from the DOM.

You can pass as many properties separeted via comma as you want to the `unset` method, and it will remove all of them from the element's styles.

### Resetting Styles

```CSS
main.style().reset();
```
The `reset` method allows you to remove all styles from the element, effectively resetting it to its default state. This can be useful when you want to clear all styles and start fresh.

- Note: The `reset` method only removes styles that were set using the `set` method. It does not affect styles that are applied through external stylesheets or inline styles that were not set using the `set` method.

<div align = "center">

[<- Back: Text](text.md) | [Next: CSS: Properties ->](property.md)

</div>