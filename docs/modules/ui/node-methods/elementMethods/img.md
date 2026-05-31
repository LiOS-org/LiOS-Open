# ElementMethods: img

1. src(value)
    The `src` method is used to set the `src` attribute of an `img` element. It takes a string as an argument which specifies the URL of the image that should be displayed.

    ```JS
    const image = main.child("img").src("https://www.example.com/image.jpg");
    ```
2. alt(value)
    The `alt` method is used to set the `alt` attribute of an `img` element. It takes a string as an argument which specifies the alternative text that will be displayed if the image cannot be loaded.

    ```JS
    const image = main.child("img").alt("Description of the image");
    ```
3. clearDefaults()
    The `clearDefaults` method is used to clear the default styles of an `img` element.
    ```JS
    const image = main.child("img").clearDefaults();
    ```

<div align = "center">

[<- Return: ElementMethods](../elementMethods.md) 

</div>