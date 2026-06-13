# Effects: Text Shadow

This submodule allows the developer to apply the `text-shadow` effect without repeating much of `CSS`.

> HTML Structure
> ```HTML
> <div class = "lios-text-shadow demo-shadow">
>   <h1> Text Shadow </h1>    
> </div>
> ```

## Configuring the Effect

1. Text Color
   
   ```CSS
   .demo-shadow{
    --lios-text-shadow-text: Pink /* Sets the text color to pink */
   }
   ```
2. Text Shadow Color
   
   ```CSS
   .demo-shadow{
    --lios-text-shadow-color: Magenta /* Sets the text's shadow color to magenta */
   }
   ```
3. Offset X
   
   ```CSS
   .demo-shadow{
    --lios-text-shadow-offsetX: 5px /* Positions the shadow 5px away from the text virtically in downwards direction, `-` sign reverses the direction */
   }
   ```
4. Offset Y
   
   ```CSS
   .demo-shadow{
    --lios-text-shadow-offsetY: 5px /* Positions the shadow 5px away from the text horizontally to the right side, `-` sign reverses the direction */
   }
   ```
5. Blur radius
   
   ```CSS
   .demo-shadow{
    --lios-text-shadow-blur-radius: 5px /* Changes the blur radius of the shadow to 5px, can be set to `0` to disable the blur */
   }
   ```

## Default values

The default values of variable mentioned above are as follows:-

1. `--color` : `inherit`
2. `--lios-text-shadow-color` : `rgba(0,0,0,0.3)`
3. `--lios-text-shadow-offsetX` : `3px`
4. `--lios-text-shadow-offsetY` : `3px`
5. `--lios-text-shadow-blur-radius` : `3px`