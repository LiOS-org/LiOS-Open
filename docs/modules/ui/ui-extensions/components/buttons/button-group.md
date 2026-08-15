# Components: Button Group

This `component` provides you a way to group [normal button](./normal.md), it also applies special styling to first and last [button](./normal.md).

```JS
const buttonGroup = main.components().buttonGroup();
```
It provides you some useful methods:-

## 1. buttonGroup.buttonBackground(value)

This methods changes the background on every child `button`, unless overwritten specifically.

## 2. buttonGroup.buttonHoverBackground(value)

This method changes the hover background of every child `button`, unless overwritten specifically.

## 3. buttonGroup.button(value)

Spawns a new [normal button](./normal.md).

```JS
// You can now do 
const buttonA = buttonGroup.button();
// instead of doing following every-time
const buttonA = buttonGroup.components().button(); //still valid
```

