# Element Methods: input

1. placeholder(value)
    The `placeholder` method is used to set the `placeholder` attribute of an `input` element. It takes a string as an argument which specifies the placeholder text that will be displayed in the input field when it is empty.

    ```JS
    const input = main.child("input").placeholder("Enter your name");
    ```
2. getValue()
    The `getValue` method is used to get the current value of an `input` element. It returns a string which is the current value of the input field.

    ```JS
    const inputValue = main.child("input").getValue();
    console.log(inputValue); // Logs the current value of the input field
    ```
    - Note: Intentionally breaks the chainability of the element methods to return the value of the input field.

3. clearField()
    The `clearField` method is used to clear the value of an `input` element. It sets the value of the input field to an empty string.

    ```JS
    main.child("input").clearField();
    ```
4. clearDefaults()
    The `clearDefaults` method is used to clear the default styles of an `input` element.

    ```JS
    const input = main.child("input").clearDefaults();
    ```

<div align = "center">

[<- Return: ElementMethods](../elementMethods.md) 

</div>