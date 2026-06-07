# Node Methods: SVG

This method allows user to automatically create a complete `svg` element, while recursivily cloning all the attributes and childrens (i.e path, circle etc) from a single svg string.

```JS
const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-aarrow-down-icon lucide-a-arrow-down"><path d="m14 12 4 4 4-4"/><path d="M18 16V7"/><path d="m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16"/><path d="M3.304 13h6.392"/></svg>`;

// It is recomended to use template literals to avoid escaping "/" everywhere.

const svg = main.svg(svgString);

// svg() is a shorthand for

const altSvg = main.child("svg").parse(svgString);

/*
Attribution: 
Example svg that is svgString is made and owned by `lucide-icons` and all rights belongs to them.
*/

```

<div align = "center">

[<- Back: Node Methods](../node-methods.md.md) | 

</div>