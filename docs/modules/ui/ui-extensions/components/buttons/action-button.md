# Components: Action Button

Action buttons are `buttons` which has custom pre-applied styling to signal action, you can use it as following :- 

```JS
const actionButton = main.components().actionButton();
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

### 1. actionButton.text(value)

>**Note:** Modifies default [nodeMethods:text](../../../node-methods/text.md)

Spawns a `span` (critical) and sets text value to the provided `value`.

### 2. actionButton.buttonBackground(value)

This property as name suggest, will change the background of your button.

### 3. actionButton.boxShadow(value)

Changes the box's shadow color of the `action button`

>***Easter Egg:*** Knowledge of these `CSS` variable might help you. [standalone components module:action buttons](../../../../components/action-buttons.md)