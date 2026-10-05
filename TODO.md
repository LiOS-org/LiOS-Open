# 1.4.x

## Phase 1:

### [Loader Module](./ROADMAP.md#loader-module)

- [x] Make a diamond shaped container
- [x] Add configuration for background color, etc
- [x] Add multiple pill shaped pixels like shapes inside the container
- [x] should have gap (optionally translucent) between the border and the main container
- [x] Add three options for loading (with different animation for different options):
  - [x]  `awaitInbound`
  - [x]  `awaitOutbound`
  - [x]  `awaitStatic`
  - [x]  `await`
- [ ] Finish Documentation

## Phase 2:

### [UI Module](./ROADMAP.md#ui-module)

- [ ] Implement Views
  - [ ] `nodeMethods.child("view")` : Creates and returns a new `View` instance bound to the element
  - [ ] `View.create(tagName,instanceName)` : Creates a new view with `tagName` and returns `nodeMethods` instance bound to that element, user can then use it as normal `nodeMethods` instance. If `instanceName` is not passed it defaults to `"default"`
  - [ ] `View.switch(stateName)` : Switches the view to the provided `stateName`
- [ ] Implement custom event listeners
  - [ ] `newchild` : Activates when a new child is created inside the bound node
  - [ ] `ondelete` : Activates when the bound node is removed
  - [ ] `childdelete` : Activates when child inside the bound node is removed
  - [ ] `viewchange` : Only applicable to `view` child and activates when user switches `view`
  - [ ] `newview` : Only applicable to `view` child and activates when a new view is created

## Phase 3:

### [UI Module](./ROADMAP.md#ui-module)

- [ ] Rework SVG Parser
  - [ ] Extend support to every svg tags
  - [ ] Extend support to custom illustrations
  - [ ] Extend support for attributes and classes
- [ ] Lock and unlock mechanism for `vDOM`
  - [ ] `nodeMethods.unlockVDOM` unlocks `vDOM` of the instance
  - [ ] `nodeMethods.lockVDOM` locks `vDOM` of the instance
- [ ] Methods to add new properties to a `nodeMethods` instance and `vDOM` 
  - [ ] Make a `Set` of reserved keywords
  - [ ] Allow extensions to have an array of keywords that it wants to reserve in its metadata
  - [ ] If requested keyword is already in the `Set` throw a fetal error, else reserve the keyword, add that property to the `nodeMethods` instance and return that keyword to the extension to be used as either to store values or functions
  - [ ] Extensions should explicitly set `addsProperties` to true in their `metadata.capabilities` section.
  - [ ] `nodeMethods.safeAppendVDOM` a new method that receives 2 parameters, `propertyKey` and `propertyValue`, it checks if the property already exists, if not it unlocks the `vDOM` add `Key` and `Value` then locks the `vDOM` upon success returns the `vDOM`, if the property already exists return `false`

## Phase 4:

### [UI Module](./ROADMAP.md#ui-module)

- [ ] Implement Temporary child
  - [ ] `nodeMethods.child` receives a new parameter `timeout` which accepts time in milliseconds and destroys that childNode after time runs out. Final fingerprint: `nodeMethods.child(tagName,timeout)`
- [ ] Implement Temporary portals
  - [ ] `nodeMethods.connectPortal` receives a new parameter `timeout` which accepts time in milliseconds and destroys the connected portal after time runs out. Final fingerprint `nodeMethods.connectPortal(portal,timeout)`
- [ ] Update Documentation

### [UI Extension: Labels](./ROADMAP.md#ui-extensions)

- [ ] Add new extension Labels
  - [ ] `labels().navigation()`
  - [ ] `labels().sidebar()`
  - [ ] `labels().article()`
  - [ ] `labels().header()`
  - [ ] `labels().footer()`
  - [ ] `labels().button()`
  - [ ] `labels().icon()`
- [ ] Add Documentation

## Phase 5:
  