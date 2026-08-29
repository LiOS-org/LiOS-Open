## 1.3.4

### UI Module 

- **apiVersion:** 4 (unchanged)

#### Changes

- In StyleEngine, `installCSS` now installs CSS files before any of StyleEngine's rule-sheet which means now you can overwrite any CSS property added by `installCSS` using [StyleEngine](./docs/modules/ui/style-engine.md).

## 1.3.3

### Components Module

- Refactored `action-buttons` documentation. [Docs](./docs/modules/components/action-buttons.md)

## 1.3.2

### Components module

- Refactored `normal-buttons` [documentation](./docs/modules/components/normal-buttons.md);

## 1.3.1

### UI Module

#### Effects Extension

- Documented `effects` extension. [See](./docs/modules/ui/ui-extensions/effects.md).

## 1.3.0

### Overall changes

- Documentation refactored: We refactored most of the documentation across modules, we made sure non of the documentation are broke. Some leftover documentations will be refactored gradually.

### UI Module

#### New features

- `context` : Provides you powerful APIs to interact with internal `UI` module features. [Docs](./docs/modules/ui/ui-extensions/context.md)
- `StyleEngine.connect` : Provides fluent chaining API for styling. [Docs](./docs/modules/ui/style-engine/connect.md)
- `StyleEngine.cloneStyle` : Allows you to clone styles from one node to another and works across `UI` instances. [Docs](./docs/modules/ui/style-engine/clone-style.md)
- `StyleEngine.installCSS` : Provides a built in way to install CSS files with deduplication abilities. [Docs](./docs/modules/ui/style-engine/install-css.md)
- `Portals` : Create and mount a child node, out of visual hierarchy. [Docs](./docs/modules/ui/node-methods/portals.md)
- `Clear` : A `nodeMethods` able to clear contents of a node (non root). [Docs](./docs/modules/ui/node-methods/clear.md)
  
#### Changes

- Extensions now automatically installs their CSS.
- Now you have option to install extensions either per instance on globally. [See](./docs/modules/ui/ui-extensions/extensions.md)
- Updated implementation of [overlays](./docs/modules/ui/ui-extensions/overlays.md) extension.
- Moved `UIExtensions` away from [modules](./getting-started.md#modules-table) table to its [own page]((./docs/modules/ui/ui-extensions/standaed-extensions.md))
- Proper documentation for building an extension. [Docs](./docs/modules/ui/ui-extensions/extensions.md)
  
>**Note:** Some features are yet to be documented.


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
