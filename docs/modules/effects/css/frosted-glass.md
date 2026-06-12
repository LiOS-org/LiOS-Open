# Effects: Frosted Glass

This submodule provides a `class-name` with multiple variable to provide a very customizable frosted glass effect.

## HTML Structure

```HTML
<div class = "lios-frosted-glass docs-showcase">
    <h1> LiOS Frosted Glass</h1>  <!-- Placeholder text-->
</div>
```

The are some default values to get you started, but you might need to configure the CSS.

## CSS

In order to not change the default config, we will create a secondary identifier and configure variables there that is `.docs-showcase` for our case.

1. Blur-radius
   
   By default the blur radius is `40px`, but you can configure it for your need

   ```CSS
   .docs-showcase{
    --lios-frosted-glass-blur: 5px /* Will add 5px blur radius */
   }
   ```
2. Saturation
   
   By default the saturation is `1`, and you dont need to change it in many case, but if you do 

   ```CSS
   .docs-showcase{
    --lios-frosted-glass-saturate: 0.5 /* Will set saturation to 0.5 */
   }
   ```
3. mix-blend-mode
   
   It's `normal` by default, and it's also configurable

   ```CSS
   .docs-showcase{
    --lios-frosted-glass-blend-mode: color-burn /* will change blend-mode to color-burn */
   }
   ```
4. z-index
   
   Should be unchanged for proper functionality, but can be configured

   ```CSS
   .docs-showcase{
    --lios-frosted-glass-index: 5 /* will change z-index to 5 */
   }
   ```
5. background
   
   Most important property of all, `frosted-glass` wont work without a `translucent` background

   ```CSS
   .docs-showcase{
    --lios-frosted-glass-background: rgba(163,139,191,0.3) /* Make sure its a translucent color */
   }
   ```
   > Note: The quality of effect also depends on the transluceny of the background color provided