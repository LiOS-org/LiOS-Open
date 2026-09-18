# Product Requirements Document

- **LiOS-Open 1.4.x**

## Objective

This release cycle aims to provide new modules and add useful APIs in existing modules to increase the usability and use-cases of `LiOS-Open`



## Requirements

### [Loader](./ROADMAP.md#loader-module)

- Must be a `class`
- Must use `canvas` api
- Provide 3 different modes: `inbound`, `outbound`, and `processing/await`

### [UI : Views](./ROADMAP.md#ui-module)

- Must be treated as a child of `nodeMethods` instance.
- `rootInstance` cant be treated as `views`
- `views` must use a class named `Views`
- Switching `View` shall destroy the whole `subtree` in `DOM` completely (including `event-listeners` and `CSSOM` ruleSheets) and switching back to it should regenerate from `vDOM`
- Each `View` should return a fully fledged `nodeMethods` instance

### [UI : Custom Event Listeners](./ROADMAP.md#ui-module)

- Must reuse the previous implementation that is `nodeMethods.on(event,callback)`
- Use a `Set` to store the custom event listeners for `0(1)` lookup.
- Custom event listeners must use the convention of `document` api that is `allalphabetsinlowercase`(All alphabets in lowercase)
- Must use an `Array` to store callbacks, and execute one by one on event trigger, that means the callback which is registered first will be executed first
- `"default"` view is auto rendered ans is obviously default
- Each `View` must preserve state, that is when user switches back to a view, every field regains their state, along with scroll position
  
### [UI : Rework SVG Parser](./ROADMAP.md#ui-module)

- Must use the existing `nodeMethods.child`
- `nodeMethods.child` auto detects `svg` tag and applies `SVGNamespace`, every child automatically inherits that namespace unlike current implementation which tracks it using an array.
- Attributes, ClassNames and ID tags must work
- Support for complex illustration
- A separate `SVG` class  instance instead of reusing the `nodeMethods` for SVGs.
  
### [UI : Lock and Unlock mechanism for vDOM](./ROADMAP.md#ui-module)

- Implement it using `Manual Property Descriptor Toggling` and not `Object.freeze` or `Object.seal`
- Mechanism should be in another class
- After implementation, `vDOM` should be locked by default
  
### [UI : Methods to add new properties to a `nodeMethods` instance and `vDOM`](./ROADMAP.md#ui-module)

- Add a new extension API called `appendProperty`
- Keywords reserved by one extension cant be accessed by another
- Keyword collision crashed the instance
- Extensions must explicitly ask for the capability
- Array of keywords requested via an extension should must be frozen that is `Object.isFrozen` should return true otherwise extension registry fails
- `nodeMethods.safeAppendVDOM` must be optional way to safely add new properties to vDOM, if the `vDOM` is unlocked users and extension authors should be free to mutate it
- `nodeMethods.safeAppendVDOM` always returns false for reserved `vDOM` keywords (`nodeMethods` maintains a `Set` containing reserved keywords by the library)

### [UI : Temporary child and portals](./ROADMAP.md#ui-module)

- The timeout waits `100ms` to let other batched operation finish then starts the requested timeout.
- After timeout the childNode is permanently erased from `DOM` as well as `vDOM`, `View` switching or `State Manager` don't preserve temporary child.
- In case of portals, the connected portal is also permanently removed
  
### [UI Extension : Labels](./ROADMAP.md#ui-extensions)

- Must use the `nodeMethods.label` behind the scenes
- Warn user `label` is a reserved keyword so use `labels` or some other name while installing the extension
- Also warn user that `nodeMethods.label` currently only supports one `aria-label` at a time and this extension inherits that characteristic.