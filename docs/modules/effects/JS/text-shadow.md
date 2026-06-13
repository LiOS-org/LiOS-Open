# Effects: Text Shadow

For this submodule to work, you need to have [UI module](../../ui.md) installed and you'll also need to install the `effecs` extension as shown below

```JS
const ui = liosOpen.ui;
ui.extend("effects",liosOpen.uiExtensions.effects);
const main = new ui("main"); //Initialization of the UI module
```

this will install the `effects` module into the `UI` module.

```JS
const demoCard = main.child("div").style().set({
    "width":"90%",
    "height":"300px"
}).text("Text Shadow"); //Basic styling
```

## Applying the effect

```JS
demoCard.effects().textShadow(options); //Options can be passed via parameter as an object
```

### Parameter options

Options can be passed as follows

```JS
demoCard.effects().textShadow({
    color:"pink" //Will set the text color to pink
});
```

Other options are

1. color:value
   
   As shown abovem it changes the font color of the element
2. offsetX:value
   
   ositions the shadow `value` away from the text virtically in downwards direction, `-` sign reverses the direction
3. offswtY:value
   
   Positions the shadow `value` away from the text horizontally to the right side, `-` sign reverses the direction
4. blurRadius:value
   
   Changes the blur radius of the shadow to `value`, can be set to `0` to disable the blur
5. shadowColor:value
   
   sets the text's shadow color to `value`

## Reset Blur

```JS
demo.noTextShadowBlur(); // Removes the blur effect from the text shadow
```

## Default values

To See the list of default values [click here](../css/text-shadow.md#default-values).