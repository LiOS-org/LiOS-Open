## Components: Tables

Tables are very advance `UI` components which gives you an easy way of data visualization while also giving you the access of [nodeMethods](./../../node-methods.md).

### Creating a Table

```JS
const table = main.components().table(); //Creates the table
```
#### Adding Column

```JS
const nameColumn = table.newColumn().title("Name");
const emailColumn = table.newColumn().title("Email");
```

Here `newColumn` creates the column and `title` puts the title inside that.

#### Adding rows

```JS
const rowA = table.newRow();
const rowB = table.newRow();
const rowC = table.newRow();
```

#### Populating Rows

The `tables component` is row oriented, that means while you add columns first, the data must be inserted row-wise.

```JS
rowA.cell("John Doe","johndoe@example.com");
rowB.cell("Maria Smith","maria554@example.com");
```
It is also possible to create empty rows and populate it later:-

```JS
rowC.cell("",""); //Zombie Cells
```

#### Advance row operations

As mentioned before you can populate the cells afterwards:-

```JS
const cellNodes = rowC.elements; //Gives you access to the nodeMethods instance of the elements
```
>**Note:** It only becomes available after you run `cell` and it only contains elements passed inside that `cell` method.

`cellNodes` is an array that means you can access it like another arrays:-

```JS
cellNodes[0].text("Hello").style().set({
    color: "red"
}); //Gives you access to the nodeMethods instance of particular cell
```

### Important Styling operations

#### Change the cell gap

```JS
table.cellGap(value);//value must be  a css accepted value in string
```

Changes the gap in between cells.

#### Table Padding

```JS
table.tablePadding(value);//value must be  a css accepted value in string
```

Changes the padding of the table container.

#### Header background

```JS
table.headerBackground(value);//value must be  a css accepted value in string
```

Changes the background of header rows i.e you set up using `table.newColumn`.

#### Background

```JS
table.background(value);//value must be  a css accepted value in string
```

Changes the background of the table container.

#### Cell background

```JS
table.cellBackground(value);//value must be  a css accepted value in string
```

Changes the background of cells.

#### Cell Hover background

```JS
table.cellHoverBackground(value);//value must be  a css accepted value in string
```

Changes the hover background of cells.