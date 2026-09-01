# Overlays: ToolTip

A simple toolTip overlay, with cursor tracking and auto positioning.

## Creating a ToolTip

```JS
const tooltip = main.overlays().toolTip();

// Custom options can also be passed

const options = {
    background: "blue",
    border: "1px solid red",
};

const tooltip = main.overlays().toolTip(options);
```
### Available Options

- `background` : Sets the background color of the tooltip.
- `border` : Sets the border of the tooltip.

## Using the ToolTip

### Populating the ToolTip

```JS
const block = main.child("div").text("Hover me to see the tooltip");
tooltip.bind(block, "This is a tooltip");
...

// Configurations
tooltip.bind(block, "This is a tooltip",{decorate:false,highlight:false});
```

#### Available Configurations

- `decorate` : If set to `true`, the text-contents of the bound element will be decorated with a dotted underline. Default is `true`.
- `highlight` : If set to `true`, the bound element will be highlighted when the tooltip is shown. Default is `true`.

>**Note:** It is possible to bind multiple elements to the same tooltip, and the tooltip will be updated with the new content.

### Opening and Closing the ToolTip

```JS
tooltip.show(); // Shows the tooltip
tooltip.hide(); // Hides the tooltip
```
>**Note:** `tooltip.bind` automatically handles the opening and closing of the tooltip, so you don't have to worry about it.