## 1.2.1

### New Module : Effects

- Available to be used with both `CSS` (standalone) or `JS` depends on [UI module](./docs/modules/ui.md).
- For more information [read documentation](./docs/modules/effects.md)

## 1.2.0

### New Features

- New nodeMethod, svg(): It is a shorthand for child("svg").parse(svgString), this nodeMethods automatically creates a new child and parses an svg element from an svg string.
- New elementMethods for `svg` tag, parse(svgString): It parses an `svgElement` in empty `svg` element from a singlr `svgString` as a parameter.

## 1.1.0

### Bugfixes

- In `components`, the JS module: Fixed a bug in table where `cell` was returning `elements` instead of `rows`.

### New Features

- In `ui` module: Added new element methods for various tags, for example `img` tag has `src`, `alt`, and `title` properties. You can find more about these methods in the [Element Methods: img](docs/modules/ui/node-methods/elementMethods.md) documentation. 
- In `ui` module: Added new set of getters called `aboutElements` which returns read-only properties of the element such as `tagName`, `children` etc. You can find more about these methods in the [About Elements](docs/modules/ui/about-elements.md) documentation.
  
### Improvements (Breaking Changes)

- In `ui` module: Replaced the previous style() system with a CSSOM-based StyleEngine supporting persistent rule mapping and pseudo-state styling. You can find more about the new style methods in the [Style Methods](docs/modules/ui/node-methods/style.md) documentation.
