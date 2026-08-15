# Installing UI Extensions 

While the core `UI` module has a lots of functionality built in, it is also possible to extend it via extensions.

## Installing an extension

In the `UI` module, extensions can be added either `globally` or `instance-specific`, it is worth to keep in mind that `globally` installed extensions are still `instance-specific` extension, the difference is that global extensions gets auto-installed to every new instance. Here is how it works:-

```JS
import {liosOpen} from "{path-to-liosOpen-installation}/liosOpen.js";
const components = liosOpen.uiExtensions.components;
const ui = liosOpen.ui;
```

### Global Extensions

To install an extension globally, we will use an static method provided by the `UI` module

```JS
ui.extend("components",components);
```

Note that the first parameter is always the name of the extension in string, you are free to name it whatever you want, and second parameter is the actual export provided by the extension, you should keep it as it is. But remember whatever you name here, the extension methods will be accessible to only that name for example:-

```JS
const button = nodeMethods.components().button();
```

and if you for some reason decide to call it `intractable`, your code will look like this:-

```JS
const alternativeButton = nodeMethods.intractable().button();
```

>Note: Here `nodeMethods` is an instance of the `nodeMethods` class, returned when creating a new `UI` instance, or creating a new child element. [Learn more](../node-methods.md)

I would like to make it clear that `Global Extensions` is a registry. Installation still happens at instance-level automatically for any extension installed as global. Global extensions should be seen as a convenience rather that something available at global scope.

### Instance Specific Extensions

Every extension in the `UI` module is always installed as instance specific extension, whenever you create a new `UI` instance, the constructor automatically loops through the [Global Extensions](#global-extensions) registry and install them.

To install an instance specific extension, you need to first initialize an `UI` instance ( [See initialize UI](../../ui/initialization.md) ) then install the extension as follows:-

```JS
const overlays = liosOpen.uiExtensions.overlays;
main.extend("overlays",overlays); //We assumed that we stored our new UI instance in the variable named main.
```
The first parameter is again the name of the extension in string, you can name it whatever you want but the second parameter is the actual export provided by the extension. It is explained in depth in [Global Extensions](#global-extensions) section.

## How UI module handles multiple extensions, installed by same name

The UI module does a strict runtime check, if it finds out that the to be installed extension is being installed by same name as another extensions, the instance will crash with an error `Method "${name}" already exists in UI`. The same error will be thrown if you try to install the extension with a name reserved by the `nodeMethods` such as `child `, `parent`, `style` etc.

>Note: When the `UI` module detects two extensions with same name, it only crashes the affected instances, not the whole module. To prevent that it is recommended to use `instance specific` extensions. The `UI` module has this nature to prevent overwriting of methods added by previous extensions, ans specially the `nodeMethods` itself.

## API compatibility

The `UI` module has a apiVersion as an integer, which can be accessed by importing the metadata from the `ui.js`. `UI`module checks compatibility at runtime, and at the time of installation, the extension provides `api.min` and `api.max` in its metadata as an integer, the `UI` module checks that if its api version lies in between those two values, if true it installs the extension else it throws the error:
`Extension is not compatible with current API version`. Along with the extension name (provided by you as the first parameter) as the cause.

>Note: The API version is incremented every time `nodeMethods` is updated, and `apiVersion` and `versionCode` of the `UI` module are not related, `apiVersion` tells which features it supports where `versionCode` tells that the module is on its nth update.

<div align = "center">

|[Next: Extension's capabilities ->](./capabilities.md)

</div>