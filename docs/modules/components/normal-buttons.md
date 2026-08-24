# Components: Normal Button

This is a normal button, with slide in animation:-

```HTML
<!-- HTML Structure -->
<div class = "lios-button demo-button">
    <span> Click Me </span>
</div>
```
>**Note:** You can also use `a` tag

- `span` is required for `overflow` reasons
  
## Styling 

This component provides two `CSS variables`:-

1. --lios-button-background : Changes the button background
2. --lios-button-on-hover-background : Changes the on-hover background

```CSS
.demo-button{
    --lios-button-background : pink;
    --lios-button-on-hover-background : red;
}
/* Because of cascading you can also set these values at a single place and style them all */
:root{
    ...
}
```