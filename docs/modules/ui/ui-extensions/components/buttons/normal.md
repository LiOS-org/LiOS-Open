# Components: Normal buttons

Normal buttons provide a pre-styled button with no additional functionality

```JS
const button = main.components().button();
```
Button has a default parameter, if left empty it defaults to `div` else-wise you can pass any of the allowed parameters as string:-

<div align = "center">

|Allowed tags|
|------------|
|div|
|a|

</div>

>**Note:** Using non-allowed tags, will lead you to an error.

>**Note:** Because `buttons` also follow the normal node creation by [nodeMethods:Child](../../../node-methods/class.md), so when you use `a` as a parameter it will automatically bind [specific Element Methods](../../../node-methods/elementMethods/a.md) allowing you to do something like this:-
```JS
button.href("#"); //And completely avoid needless event listeners
```

## Available methods

### 1. button.buttonBackground(value)

This property as name suggest, will change the background of your button.

### 2. button.buttonHoverBackground(value)

Because `button` has a `hover` animation, this method will change the hover color.

### 3. button.text(value)

>**Note:** Modifies default [nodeMethods:text](../../../node-methods/text.md)

Spawns a `span` (critical) and sets text value to the provided `value`.

>***Easter Egg:*** Knowledge of these `CSS` variable might help you. [standalone components module:buttons](../../../../components/buttons.md)