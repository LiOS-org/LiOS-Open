# Buttons

Buttons can be created using either:

- Pure HTML + CSS (lightweight, preferred)
- JS via the UI module (dynamic, more conveniant)

## CSS

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

## JS

> Note: This method still needs `CSS` to be manually installed.

> Assuming `UI module` and `components extension` is already installed and initialized we will select existing `document element`.

- HTML Structure
  - ```HTML
        <main></main>
    ```
- Creating new button
  - ```JS
        const main = new ui("main");

        const button = main.components().button();
    ```
  - breakdown:-
    - main: we created a new instance of ui and selected the HTML element `main` and stored it inside the variable called `main`.
    - button: we created a new child inside main directly fromcomponents which is our button and also stored it inside the variable `button`.
- All available option, will reference the variable we created earlier.
  - ```JS
    button.buttonBackground(value)
    ```
      - sets button background to the provided `value`
  - ```JS
    button.buttonHoverBackground(value)
    ```
      - sets button background on hover to the provided `value`
  - ```JS
    button.text(value)
    ```
      - sets the text inside the button  to the provided `value`

> Note: All the `nodeMethods` from the UI module is available, [see the nodeMethods docs](../ui/node-methods.md).

#### Some Important notes regarding all buttons and its variants created via JS

1. While manual `HTML+CSS` buttons can be an anchor link, e.g `<a>`. JS created buttons are always `<div>` ⚠️ .
2. Because of it is a `<div>` element, `href` won't work, You'll have to use `element.on()` methods from [nodeMethods](../ui/node-methods.md) to add desired event listener.
   1. ```JS
      button.on("click", () => {
      console.log("Clicked!");
      });
      ```
3. `UI` module runs client side, so every component created through it will be generated in real time on client's device, which means it will always be more resource intensive and time consuming than the `CSS and HTML` method. So, use it only when you really need it.
4. Unlike `CSS and HTML` method, it requires `UI` module to be installed, which adds extra overhead in exchange of more features and convenience. 
5. Because `JS` method is  an extension to the `UI` module, there is always a chance of version incompatibility, so upgrade or update with caution where on the other hand `HTML and CSS` method provides you full control  and compatibility depends on the browser.
6. `CSS` files are still required to be manually installed via the `@import` method.
7. Even if you use `JS`,`CSS` cascading effect will still work.

## Variants

Button components has two additional variants
  1. [Action Button](#action-button) and
  2. Buttons group
   
### Action Button

Action button is a special variant of the button, with some special features. It it can also be used with both `CSS` and `JS`

#### CSS

It can be initialsed similarly to normal button, except for the class name to be used is `lios-action-button `.

Available CSS variables are as follows:-

- `--lios-action-button-background`: works similar to normal buttons, no defaults
- `--lios-action-button-box-shadow `: appears as an transition upon hovered, it creates a box shadow of the provided color to suggest an action, no defaults.

> Note: These are the only two `CSS` variables available in action buttons, and it does not inherit any variables from the normal buttons. Those properties can still be manually applied via `CSS` but no variables are available. Manuall assignment of any variable doesn't break anything.


#### JS

Similar initialization as normal buttons instead use `main.components().actionButton()`.

It inherits all of the normal button properties instead `button.buttonHoverBackground(value)` we have 
  ```JS
  button.buttonBoxShadow(value);
  ```
  which sets the box shadow triggered upon hover to the provided `value`.

> All of the [nodeMethods](../ui/node-methods.md) are available.

### Button group

It is a container for normal buttons, it adds special styling to first and last element and helps to group the buttons belonging to same action group.

#### CSS

HTML structure:
  ```HTML
  <div class = "lios-button-group">
      <a class = "lios-button" href = "#"><span>Button A</span></a>
      <a class = "lios-button" href = "#"><span>Button B</span></a>
      <a class = "lios-button" href = "#"><span>Button C</span></a>
  </div>
  ```
  - Where `Button A` and `Button B` will have rounded corners where any button in between have square corners.
  - Under the button group every button is exactly same as normal buttons and inherits all of the normal button's prperties and variables.

#### JS

The buttonGroup can be initialized with:
  ```JS
  const group = main.components().buttonGroup();
  ```

It inherits same properties as normal buttons, the difference being setting any of the properties here will affect every normal button inside it.

Button group also have access to all of the [nodeMethods](../ui/node-methods.md) and new buttons can be added inside the group using:
  ```JS
  const buttonA = group.components().button()
  ```
and again `buttonA` will have all the properties of normal button(via `CSS` cascade, so overwrite is easy) as well as access to [nodeMethods](../ui/node-methods.md).