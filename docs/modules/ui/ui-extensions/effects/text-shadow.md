# Effects: Text Shadow

Text Shadow applied the shadow effect to a text:-

```JS
const greeting = main.child("h1").text("Hello World");
greeting.effects().textShadow();
```

## Options

Options can be passed into the function parameter as an `object`:-

```JS
const options = {
    color: stringValue, //Changes the text color
    shadowColor: stringValue, //Changes the shadow color
    offsetX: stringValue, //Changes the shadow offset in X-axis
    offsetY: stringValue, //Changes the shadow offset in Y-axis
};
greeting.effects().textShadow(options);
```

There is also a method to disable shadow blur:-

```JS
greeting.noTextShadowBlur(); //Sets the blur radius to 0
```