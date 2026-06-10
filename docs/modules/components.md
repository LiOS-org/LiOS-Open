# Components
This module provides a set of components for efficient web building.

## Installation

This module supports 2 types of installation

1. CSS based installation
    
    ```CSS
    @import ${path to LiOS-Open Installtion}/modules/css/components/${your desired module}
    ```

    Unlike JS installation, CSS one gives you complete control over which module you want.
2. JS based installation
   
   ```JS
   import {liosOpen} from "${path to liosOpen installation}/liosOpen.js";

   const ui = liosOpen.ui;
   ui.extend("components",liosOpen.uiExtensions.components);
   ```
   > Note: JS installation still needs `CSS` to be manually installed.

<div align = "center">

| Component | Documentation |
|-----------|---------------|
| Buttons   | [View](components/buttons.md)|
| Tables   | [View](components/tables.md)|

</div>

<div align = "center">

| [Next: Buttons ->](components/buttons.md)

</div>
