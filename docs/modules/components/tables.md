# Tables

This implementation of tables is very different from the normal HTML tables, unlike normal tables, these tables uses a combination of `div` elements, `flex` layout and `CSS` variables to create a table structure, this allows us to have more control over the styling and behavior of the tables, and also makes it more flexible and easier to use in different contexts.

Tables can also be created in two different ways, either by using `CSS` or by using `components` extension in [UI](../ui.md) module.

At a glance the `CSS` method will look easy and efficient to many but it's definitely not the case, `CSS` one gets too messy too easily, it is recommend to use `JS` method whenever possible and you will know why very soon.

## CSS

But first we need to import some files.

```CSS
@import ${path to LiOS-Open Installation}/modules/css/components/table.css
```

1. We will first create an HTML container for our table, and it is recommend to use `div` element or whatever element mentioned in the snippets, using other elements may cause unexpected behavior and is not recommended.

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
   yes that's it, you created an empty cell, make sure that the number of `div` elements or as we are calling it a `cell` in the header row is equal to the number of cells in the body rows, otherwise you will get unexpected behavior and it is not recommended.
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
   For clarification, the whole `table` is `flex` dependant and ideally `Cell A` and `Cell C` should be in the same column and `Cell B` and `Cell D` should be in the same column, but if you mess up the number of cells in each row or the header row, you will get unexpected behavior and it is not recommended.

**Congratulations! You have successfully created a table using the `CSS` method, but we still need to add styling to make it look good.**

### Styling

Contrary to popular believe, this table was designed to be primarily created with `HTML` and `CSS`, so it has a lot of `CSS` variables to control the styling of the table, and it is recommended to use these variables to style the table, but you can also use custom `CSS` if you want.

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



<div align = "center">

[<- Back: Buttons](buttons.md) |

</div>