# Buttons

## CSS

- HTML structure
  ```HTML
  <link rel="stylesheet" href="${path to liosOpen installation}/css/components/buttons.css">

  <a class = "lios-button" href = "#"><span>Button</span></a>
  ```
  > Note: `span` class is needed, otherwise the transition will hide the text or any other content.

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
        --lios-button-background: "#c6101e" /*Changes the background to Bloodthirsty Lips*/
      }
      ```
  > Note: For variables with no defaults, it is still possible to inherit values automatically because of `CSSs'` Cascading effect.