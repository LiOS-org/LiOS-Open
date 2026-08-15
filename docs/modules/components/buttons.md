# Buttons

Buttons can be created using either:

- Pure HTML + CSS (lightweight, preferred)
- JS via the UI module (dynamic, more convenient)

## Usage

- HTML structure
  ```HTML
  <link rel="stylesheet" href="${path to liosOpen installation}/css/components/buttons.css">

  <a class = "lios-button" href = "#"><span>Button</span></a>
  ```
  > Note: `span` is needed because the hover animation uses a background layer that would otherwise cover the text.

  - Available `CSS` variables
    - `--lios-button-border-width`: changes the border width of the button, default value 0.
    - `--lios-button-border-color`: changes the border color, needs `--lios-button-border-width` greater than 0, no defaults.
    - `--lios-button-padding`: changes the padding of the button, default value `5px`.
    - `--lios-button-border-radius`: changes the border radius of the button, no defaults.
    - `--lios-button-font-size`: changes the font size of the button, no defaults.
    - `--lios-button-background`: changes the background of the button, no defaults.
    - `--lios-button-on-hover-background`: changes the transition background over hover, no defaults.
    - example
      ```CSS
      .lios-button{
        --lios-button-background: #c6101e /*Changes the background to Bloodthirsty Lips*/
      }
      ```
  > Note: For variables with no defaults, it is still possible to inherit values automatically because of `CSS` Cascading effect.

## Variants

Button components has two additional variants
  1. [Action Button](#action-button) and
  2. [Buttons group](#button-group)
   



### Button group

It is a container for normal buttons, it adds special styling to first and last element and helps to group the buttons belonging to same action group.


HTML structure:
  ```HTML
  <div class = "lios-button-group">
      <a class = "lios-button" href = "#"><span>Button A</span></a>
      <a class = "lios-button" href = "#"><span>Button B</span></a>
      <a class = "lios-button" href = "#"><span>Button C</span></a>
  </div>
  ```
  - Where `Button A` and `Button B` will have rounded corners where any button in between have square corners.
  - Under the button group every button is exactly same as normal buttons and inherits all of the normal button's properties and variables.


<div align = "center">

[<- Back: Components](../components.md) | [Next: Tables ->](tables.md)

</div>