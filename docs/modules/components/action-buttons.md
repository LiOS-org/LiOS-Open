# Components: Action Button

This is a action button, with slide an on hover shadow animation:-

```HTML
<!-- HTML Structure -->
<div class = "lios-action-button demo-button"> Click Me </div>
```
>**Note:** You can also use `a` tag

  
## Styling 

This component provides two `CSS variables`:-

1. --lios-action-button-background : Changes the button background
2. --lios-action-button-box-shadow : Changes the on-hover shadow color

```CSS
.demo-button{
    --lios-action-button-background : pink;
    --lios-action-button-box-shadow : red;
}
/* Because of cascading you can also set these values at a single place and style them all */
:root{
    ...
}
```