# Getting Started

## Installation

LiOS-Open can be installed via `git-submodule`, which provides automated updates, ability to target a specific commit, or modify as you need on the go.

```bash
git submodule add https://github.com/LiOS-org/LiOS-Open.git
```

>Note: To use git submodule, your repository needs to be a git repository.

## Repository Design

This repository has 3 folders:-
1. Assets : This folder hosts static assets such as favicon icon etc, none of the module's assets are stored here.
2. docs : In repository documentations of the available modules.
3. modules : Actual folder which hosts modules as well as their assets, In order to keep LiOS-Open function keep this folder un-changed, because some modules might need files stored in another module's folder.
   
There are also some important files in the root folder:-
1. LICENSE : The license file, which is required to present in every fork, derived work, and every distribution.
2. LiOS_Open.css : A centralized  `CSS` file which automatically imports `CSS` for every modules, because from this release every `JS` module automatically installs its respective CSS, and this file also imports undocumented, and unnecessary CSS, it is now <strong > <font color = "red">Deprecated </font></strong>, but you should still keep it in the repository for backwards compatibility.
3. liosOpen.js : A centralized entry point for every `JS` modules, it has every exports you will ever need and you should always use this file to import `modules`.
   
Except for the mentioned files and folders, you are free to remove every other thing from the root folder on your local copy, and it won't break any functionality.

## Modules Table

A table to route you to every module and its documentation if available.

<div align = "center">

|Module|Description|Documentation|
|------|-----------|-------------|
|UI|A JS DOM based library for all of the UI work you need|[view](./docs/modules/ui.md)|
|Components| A CSS library with pre-made components, with variables make your work easier|[view](./docs/modules/components.md)|
|Effects|A CSS library, which provides some class-names, to give you awesome CSS effects to make your design beautiful|[view](./docs/modules/effects.md)|

</div>

> Note: UI Extensions are moved [here](./docs/modules/ui/ui-extensions/extensions.md) and they are no longer treated as an standalone module.