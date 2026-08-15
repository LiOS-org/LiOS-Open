# Creating an extension

Creating an extension is pretty straightforward. You can refer to [capabilities page](./capabilities.md) to see what you can do with an extension. 

## Structure of an extension

We will assume that the extension we are creating is called `demoExtension`. The structure of the extension will look like this:

```JS
export const demoExtension = {
    method: function(){

    },
    initFunction: function(ctx){

    },
    metadata:{
        name: "demoExtension",
        version: "1.0.0",
        versionCode: 1,
        api:{
            min: 2,
            max: 4
        },
        capabilities: {
            addsMethods: true,
            overridesMethods: false,
            addsProperties: true
        }
    }
};
```
>**Note:** As per api version 4, the `capabilities` property inside `metadata` is optional. Currently there is no runtime check for capabilities, but it is recommended to add it to your extension.

>**Also:** There is no current way to override existing methods in the core, but it is recommended to set `overridesMethods` to false in your extension metadata.

### 1.Imports and Exports

As shown in the above example, you do not need to import anything to create an extension. The `UI` module will execute the extension by calling it with `this` context set to the `UI` module, providing everything you need to create an extension.

Exporting the extension is also optional, the only that the extension should be accessible to the `UI` module. But keeping extension in separate folder is recommended for better organization of code. You can also export the extension to use it in other extensions.

### 2. Method

The `method` property is a function, and is required to be present in the extension and needs to be a classic function. This method will be called by the `UI` module when the extension is loaded. You can use this method to add new methods or properties to the `UI` module.

`method` by default will be called with `this` context from the [nodeMethods](./../node-methods.md) providing you the access to all the properties of current node.

>**Tip:** In the extension `this` means current node, so you can use `this` to access the current node properties and methods.

#### Accessing Context

Context can be accessed with `this.context` inside the `method` function. [See](./context.md) for more details about context.

#### Example

We will assume we are adding a new method called `heading` which will take a string as a parameter and return the heading node.

The code will look like this:

```JS
method: function(){
    this.heading = (text)=>{
        const node = this.child("h1"); //Creates a new UI node
        node.text(text); //Sets the text of the node
        return node; //Returns the node to allow chaining
    };
    return this; //Returns the current node to allow chaining and also critical for the extension to work properly
}
```
>**Note:** You are free to return anything you want from the method as per your needs, but in order to allow chaining you must return any UI node or the `this` context.

>**Important:** You must return `this` at the end of the `method` property as shown in the above example, otherwise the extension will not work properly.

### 3. Init Function

The `initFunction` property is a function, and is optional to be present in the extension. This function is special, because it will be called exactly once inside the constructor of [nodeMethods](./../node-methods.md) every time a new instance is spawned that are `child()`, `parent()` etc.

`initFunction` takes `ctx` as a parameter to provide you access to [context](./context.md).

As per api version 4, there are not much need or even use-case of `initFunction` but you might want to use it as shown in following example:-

```JS
initFunction: function(ctx){
    ctx.styleEngine.installCSS("css/myCSS.css");
};
```
>**Note:** While `this` can be accessed from `initFunction`, but it is not recommended as it runs every time the constructor is initiated.

>**Note:** Make sure to handle deduplication in `initFunction`, and anything you write inside it, write with a mental modal that it will be automatically called every-time new [nodeMethods](./../node-methods.md) is initiated.

### 4. Metadata

`metadata` is the property that helps `UI` module check compatibility, and throw useful errors. And it is also critical for `UI` module to even consider this pile of objects as an extension.

>**Note:** Every sub-property is mandatory until mentioned

#### name

the `name` sub-property is useful for the `UI` module when it throws errors related to the extension.

#### version

the `version` sub-property is a string, that has human readable version code as a value, recommended but `UI` module don't even reads it.

#### versionCode

Machine readable property, which has an integer as the value, and tells actually which update it is.

#### api

Arguably the most critical sub-property to the `UI` module, it has two values `min` and `max`, where both are integers.

`min` is the minimum api version the extension expects to work with.

>**Note:** Because of style related changes in api 2, it is recommended to target api version 2 and above

`max` is the maximum api version the extension is tested against.

The api version of the `UI` module must lie between `min` and `max` failing the condition will result in a fatal compatibility error, and the affected instance will crash immediately with  console error.

#### capabilities

100% optional, and will be documented in upcoming updates.


<div align = "center">

[<- Back: Context](./context.md) | 

</div>