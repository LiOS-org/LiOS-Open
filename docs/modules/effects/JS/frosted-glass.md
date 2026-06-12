# Effects: Frosted Glass

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
}).text("Frosted Glass"); //Basic styling
```

## Applying the effect

```JS
demoCard.effects().frostedGlass(options); //Options can be passed via parameter as an object
```

### Parameter options

Options can be passed as follows

```JS
demoCard.effects().frostedGlass({
    blur:"5px" //Will set the blur radius to 5px
});
```

Other options are

1. blur:value
   
   As shown abovem it changes the blur radius of the frostd-glass effect
2. saturation:value
   
   Will change the saturation value
3. blendMode:value
   
   Changes the `mixed-blend-mode` property
4. background:value
   
   Most important propery, value must be a `translucent` color otherwise the effect wont work properly.
5. zIndex:value
   
   This has nothing to do with frosted glass effect, the defalut value is `1` and it simply changes the `z-index` CSS property for the element.