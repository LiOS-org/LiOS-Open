# Element Methods : a

1. href(value)
    The `href` method is used to set the `href` attribute of an `a` element. It takes a string as an argument which specifies the URL that the link should point to.

    ```JS
    const link = main.child("a").href("https://www.example.com");
    ```
2. clearDefaults(brute = false)
    The `clearDefaults` method is used to clear the default styles of an `a` element. It takes a boolean as an argument which specifies whether to clear the default styles in a brute force way or not. If set to `true`, it will clear all the default styles of the element, including the ones that are not related to the link styling. If set to `false`, it will only clear the default styles that are related to the link styling, such as the text color and text decoration.

    ```JS
    const link = main.child("a").clearDefaults(); // Dont pass any argument or pass false to clear only the link related default styles
    const link2 = main.child("a").clearDefaults(true); // Pass true to clear all the default styles of the element in a brute force way
    ```

<div align = "center">

[<- Return: ElementMethods](../elementMethods.md) 

</div>