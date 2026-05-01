<div align = "center">
    <a href="#">
        <img alt = "LiOS-Open" src = "assets/favicon/favicon-squircle.svg" width = "25%"/>
    </a>
    <h1>LiOS-Open</h1>

**Designed to load fast, learn quickly, and cut down repetitive work.**

</div>

LiOS-Open is our internal foundation. We built LiOS-Colors, Tech-Informal, Virtual-PeriodicTable, and LiOS-InkWell using it. It works so well, we're open-sourcing it for developers like you.

> ⚠️ Documentation is still a work in progress. Some parts may be incomplete or subject to change.

## Installation

1. Git submodule method
   ```zsh
   git submodule add https://github.com/LiOS-org/LiOS-Open.git
   ```
2. Manual Download
   
   In case if you can't or don't wanna use `git`, you can manually download the `zip` file from the [Releases](https://github.com/LiOS-org/LiOS-Open/releases) page.

   > Pro tip: Choose stable over latest unless you need something specific.
## Modules table
<div align = "center">

|Module|JS|CSS|Documentation|
|------|--|---|--------------|
|UI|✅|❌|[View](docs/modules/ui.md)|
|Components|Requires UI|✅|[View](docs/modules/components.md)|
|Overlays|Requires UI|Unsupported|[View](docs/modules/overlays.md)|

</div>

### Terminology
1. Unsupported: Means it is possible, but officially discouraged and not supported.
2. Requires `<module name>`: Usage depends on the specified module.
3. ✅: Means entirely supported
4. ❌: Means entirely unsupported / not possible.

## Why LiOS-Open?

- Modular architecture
- Unified UI module for DOM interaction
- Consistent component design