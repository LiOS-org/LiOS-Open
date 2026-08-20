# Effects: Frosted Glass

This effect provides a frosted glass effect to an element, it requires a translucent background to function i.e `rgba`.

## Applying the effect

```JS
const card = main.child("div");
card.text("Hello World");

card.effects().frostedGlass(); //Applies the effect with default configurations.
```

## Options

This effect receives an `object` as an option.

```JS
const options = {
    blur : stringValue, //Changes the blur radius
    saturation : stringValue, //Changes the saturation level
    blendMode : stringValue, //Changes the mix-blend-mode 
    zIndex : numericValue, //Changes the zIndex
    background : stringValue, //Changes the background color, must be a translucent color.
};

card.effects().frostedGlass(options);
```
