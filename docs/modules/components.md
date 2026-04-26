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

   import {components} from "${path to liosOpen installation}/modules/JS/ui.js";

   const ui = liosOpen.ui;
   ui.extend("components",components);
   ```
   > Note: JS installation still needs `CSS` to be manually installed.

|<center>Sub Module Name|Documentation|
|---------------|----------------------|
|<center>Buttons|[View](components/buttons.md)|
|<center>Action Button:(windows and popup)|[View](components/action-button.md)|
