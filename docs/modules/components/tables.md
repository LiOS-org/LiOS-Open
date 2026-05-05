# Tables

This implementation of tables is very different from the normal HTML tables, unlike normal tables, these tables uses a combination of `div` elements, `flex` layout and `CSS` variables to create a table structure, this allows us to have more control over the styling and behaviour of the tables, and also makes it more flexible and easier to use in different contexts.

Tables can also be created in two different ways, either by using `CSS` or by using `components` extension in [UI](../ui.md) module.

At a glance the `CSS` method will look easy and efficient to many but it's definitely not the case, `CSS` one gets too messy too easily, it is recommened to use `JS` method whenever possible and you will know why very soon.

## CSS

But first we need to import some files.

```CSS
@import ${path to LiOS-Open Installtion}/modules/css/components/table.css
```

1. We will first create an HTML container for our table, and it is recommened to use `div` element or whatever element mentioned in the snippets, using other elements may cause unexpected behaviour and is not recommended.

   ```HTML
   <div class = "lios-table">
       <!-- Table content goes here -->
   </div>
   ```
2. Naturally you will need a `header` row for your table, which can be created with the following structure:
   ```HTML
    <div class = "lios-table-header">
        <!-- Cells go here -->
    </div>
   ```
3. For the sake of sanity and ease of use, to create a cell you just need an empty `div`, yes that's it which means the whole `table.css`, even for the `JS` method is very fragile so pay attention to the following texts
   ```HTML
   <div></div> <!-- Cell A-->
   <div></div> <!-- Cell B-->
   ```
   yes that's it, you created an empty cell, make sure that the number of `div` elements or as we are calling it a `cell` in the header row is equal to the number of cells in the body rows, otherwise you will get unexpected behaviour and it is not recommended.
4. Now we need to create the body of the table, which can be done with the following structure, but before let's summarize the whole structure of the table so far:
   ```HTML
   <div class = "lios-table">
       <div class = "lios-table-header">
           <div></div> <!-- Cell A-->
           <div></div> <!-- Cell B-->
       </div>
       <div class = "lios-table-contents">
           <!-- Rows go here -->
       </div>
   </div>
   ```
5. The `div` with the class `lios-table-contents` is the container for the body of the table, and it can contain multiple rows, each row can be created with the following structure:
   ```HTML
    <div class = "lios-table-row">
         <div></div> <!-- Cell C-->
         <div></div> <!-- Cell D-->
    </div>
    <!-- Each row can be created in similar way, and do make sure the number of cells is consistent -->
   ```
   For clearification, the whole `table` is `flex` dependant and ideally `Cell A` and `Cell C` should be in the same column and `Cell B` and `Cell D` should be in the same column, but if you mess up the number of cells in each row or the header row, you will get unexpected behaviour and it is not recommended.

**Congratulations! You have successfully created a table using the `CSS` method, but we still need to add styling to make it look good.**

### Styling

Contrary to popular believe, this table was designed to be primaruly created with `HTML` and `CSS`, so it has a lot of `CSS` variables to control the styling of the table, and it is recommended to use these variables to style the table, but you can also use custom `CSS` if you want.

1. Adjusting the cell gap
    ```CSS
    .lios-table {
         --lios-table-cell-gap: 10px; /* Adjust the gap between cells, default value 5px */
         
    }
    ```
2. Adjusting the padding of the table
    ```CSS
    .lios-table {
         --lios-table-padding: 20px; /* Adjust the padding of the table, default value 12px */
         
    }
    ```
3. Background
   1. Table background
      ```CSS
      .lios-table {
           --lios-table-background: #fff; /* Adjust the background color of the table, default value #fff */
           
      }
      ```
   2. Header background
      ```CSS
      .lios-table{
              --lios-table-header-background: #f5f5f5; /* Adjust the background color of the header, default value #f5f5f5 */
              
        }
        ```
    3. Cell Background
          ```CSS
          .lios-table {
               --lios-table-cell-background: #c73838; /* Adjust the background color of the cells, default value #fff */
               
          }
          ```
    4. Hover background (Applies to both header and body cells)
          ```CSS
          .lios-table {
               --lios-table-cell-hover-background: #e0e0e0; /* Adjust the background color of the cells on hover, default value #e0e0e0 */
               
          }
          ```
4. Border
   ```CSS
   .lios-table {
        --lios-table-border: 1px solid #000; /* Adjust the border of the table, default value 2px solid white */
    }
    ```

> ⚠️ Note: The above variables unlike other components are very critical, if you want to change the  values mentioned above, do use the variables, aside from that you are free to use custom CSS

## JS

Technically it's a wrapper around the `CSS` method, and it will also generate the similar structure as the `CSS` method, but it takes all the pain of writing the `HTML` structure, removes error surface and makes it too easy to work with database and automated systems.

The CSS method exists for low-level control, but for any real-world or dynamic use case, the JS method should be considered the default

> Aside from the fact that it is easier to use, it also provides you access to all the [nodeMethods](../ui/node-methods.md) which means you can easily add event listeners and manipulate the table in any way you want.

But first we need to import some files.

```JS
import {liosOpen} from "${path to liosOpen installation}/liosOpen.js";

import {components} from "${path to liosOpen installation}/modules/JS/ui/components.js";

const ui = liosOpen.ui;

ui.extend("components",components);
```
and don't forget to install the `CSS` method as well , because the `JS` method still relies on the `CSS` for styling and structure.

```CSS
@import ${path to LiOS-Open Installtion}/modules/css/components/table.css
```

1. Selecting the container.
   - HTML
    ```HTML
    <main></main>
    ```
    - JS
    ```JS
    const main = new ui("main"); //We're using the select method, you can use other methods as well, as per the UI module documentation
    ```
2. Creating the table
   ```JS
   const table = main.components().table(); // Note that any component is always a child in the main container, components are always appended as children of the container, as it is possible with overlays
   ```
3. Adding the header row
   
   Unlike the `CSS` method you don't need to manually assing a header row, instead you create a new column and it will be automatically assigned as a header row.

   ```JS
   const c1 = table.addColumn().title("Column 1"); // The title method is used to set the title of the column, and it will be automatically assigned to the header row

   const c2 = table.addColumn().title("Column 2"); //We will use two columns for the demonstration, you can add as many columns as you want.

   // const c3 = table.addColumn().title(""); and this is how you can create an empty column.
   ```
4. Adding new rows
   
   ```JS
   const r1 = table.newRow(); // This will create a new row and return it

   const r2 = table.newRow();
   const r3 = table.newRow(); // For demonstration purposes we will create three rows, you can create as many rows as you want.
   ```
5. Adding cells to the rows
   
   ```JS
   r1.cell("Alpha", "Beta", "Gamma"); // Note that this method does not create any columns, it's basic function is to add values to the cells in the row, if you try to add more values than the number of columns, you may get unexpected behaviour.

   r2.cell("Hydrogen", "", "Helium"); // You can also create empty cells by passing an empty string, but make sure that the number of cells in each row is consistent with the number of columns, otherwise you may get unexpected behaviour.

   r3.cell("","",""); // A row with no values at all, but I will document the usecase later, for now just know that you can do this as well.
   ```
6. Doing more with cells
   
   1. Selecting a cell
        ```JS
        const cellA = r1.elements[0]; // This will select the first cell in the first row, which is "Alpha", it follows the standard convention that is the first element is at index 0, the second element is at index 1 and so on.
        ```

        each row provides it's own `elements` property which is an array of all the cells in that row, so you can easily select any cell you want by using the index of the cell in the row.
    2. Now that you have a reference to the cell, you can use all the [node methods](../ui/node-methods.md) on it, for example you can change the background color of the cell on click like this:
        ```JS
        cellA.style({
            "background-color": "red"
        });
        ```
6. Advance cell creation (experimental)
   
   This method allows you to create a cell with built-in event listner.

   ```JS
   const r4 = table.newRow();
   const zombie = {
    text: "Zombie Cell",
    events:{
        click: () => {
            alert("You clicked the zombie cell!");
        }
    }
   }
   r4.cell(zombie, "Skeleton", "Creeper");
   ```

### Shorthand CSS methods

1. table.cellGap(value)
   
   changes the gap between cells, it is a shorthand for `--lios-table-cell-gap` variable.
2. table.tablePadding(value)
   
   changes the padding of the table, it is a shorthand for `--lios-table-padding` variable.
3. table.headerBackground(value)
   
   changes the background color of the header cells, it is a shorthand for `--lios-table-header-background` variable.
4. table.cellBackground(value)
   
    changes the background color of the body cells, it is a shorthand for `--lios-table-cell-background` variable.
5. table.cellHoverBackground(value)
   
   changes the background color of the cells on hover, it is a shorthand for `--lios-table-cell-hover-background` variable.
6. table.background(value)
   
   changes the background color of the whole table, it is a shorthand for `--lios-table-background` variable.

### Tip

Because `components` is already installed you can do following:

But let's assume we have following JSON

```JSON
[
  {
    "user": {
      "name": "John Doe",
      "email": "John@liosorg.com",
      "uid": "1234567890"
    }
  }
]
```
and we want to display this data in a table, we can do this easily with the following code:

```JS
const row3 = r3.elements; // This will give us an array of all the cells in the third row, which we can use to add values to the cells.

row3[0].text(user.name); // This will add the name of the user to the first cell in the third row.

row3[1].text(user.uid); // This will add the uid of the user to the second cell in the third row.

row3[2].components().button("Send Email").on("click", () => {
    // This will add a button to the third cell in the third row, and when the button is clicked, it will execute the function that sends an email to the user.
    window.location.href = `mailto:${user.email}`;
});
```
## That's it

That was all of the `components` module, if you are interested you can check out the [overlays module](../modules/overlays.md) which provides you with a set of components that are meant to be used as overlays.


<div align = "center">

[<- Back: Buttons](buttons.md) |

</div>