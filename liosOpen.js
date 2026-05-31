import { ui } from "./modules/JS/ui.js";
import { components } from "./modules/JS/ui/components.js";
import { overlays } from "./modules/JS/ui/overlays.js";


const   liosOpen = {
  ui: ui,
  uiExtensions: {
    components: components,
    overlays: overlays
  }
}
export { liosOpen };