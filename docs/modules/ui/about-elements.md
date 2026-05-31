# About Elements 
The `aboutElements` methods are a set of methods that return read-only properties of the element. These methods are useful for getting information about the element without modifying it.

1. tagName
    The `tagName` method returns the tag name of the element as a string.

    ```JS
    const tagName = main.child("div").aboutElements.tagName;
    console.log(tagName); // Logs "DIV"
    ```
2. children
    The `children` method returns an array of child elements of the current element.

    ```JS
    const children = main.child("div").aboutElements.children;
    console.log(children); // Logs an array of child elements
    ```
3. parent
    The `parent` method returns the parent element of the current element.

    ```JS
    const parent = main.child("div").aboutElements.parent;
    console.log(parent); // Logs the parent element
    ```
4. attributes
    The `attributes` method returns an object containing all the attributes of the element.

    ```JS
    const attributes = main.child("div").aboutElements.attributes;
    console.log(attributes); // Logs an object of attributes
    ```
5. identifier
    The `identifier` method returns a unique identifier for the element.

    ```JS
    const identifier = main.child("div").aboutElements.identifier;
    console.log(identifier); // Logs a unique identifier for the element
    ```
   
<div align = "center">

[<- Return: Node Methods](node-methods.md) 

</div>