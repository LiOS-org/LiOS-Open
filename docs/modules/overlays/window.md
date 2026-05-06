# Windows

Windows are a type of overlay that can be used to display content on top of the current view. They can be used for a variety of purposes, such as displaying notifications, showing additional information, or providing a way for users to interact with the app without leaving the current view.

Windows are draggable and resizable, allowing users to move and resize them as needed. They also have a title bar that can be used to display the title of the window and provide a way to close it.

> Drag only works with a mouse.

## Creating a new Window

```JS
const myWindow = overlay.window() //avoid asigning to `window` as it may cause conflicts with the global `window` object.
```

- This will create a new window and return an instance of [UI](../ui.md) that represents the window. You can use any of the [node methods](../ui/node-methods.md) on this instance to manipulate the window's content.

- Keep in mind that the `overlay` module hijacks the `child` method of the new instance and forces the child to be appended to the window's content, so you don't have to worry about the structure of the window.

## Opening an Closing the Window

```JS
myWindow.open(); //to open the window
myWindow.close(); //to close the window
```

- At the moment, the window is empty and bare bones, but we will populate it ahead in the documentation.
  
## Giving the Window an Identity

- Assigning and `id` and the `title`
  
  `window` overlay has a title bar that can be used to display the title of the window and provide a way to close it, due to a strructural design decision, the `title` and `id` of the window are the same, the `id()` method of the [node methods](../ui/node-methods.md) is replaced with `setId()`.

  ```JS
  myWindow.setId("Demo"); //this will set the id and the title of the window to "Demo"
  ```
- Adding a background
  
  ```JS
  myWindow.background("blue") // Changes background to blue
  ```

  Each window can have a unique background.

## Special function

- If you want to restore shape & size along with position of thw window you can use the `window.restore()` function, it gets called everytime you open a window anyways.

## Adding content to the window

The window overlay is a `ui` instance in itself as mentioned above, that means it inherits all the [node methods](../ui/node-methods.md), you can utilize that to populate the window. And for your conveneance the `child()` method is modified to create new child elements inside the intended place so you can treat the `window-container` as a unmodified [UI](ui.md) instance.


<div align = "center">

[<- Back: Overlays](../overlays.md) | [Next: Pop ups ->](popup.md)

</div>