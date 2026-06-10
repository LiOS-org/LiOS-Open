import { ui } from "./modules/JS/ui.js";
import { components } from "./modules/JS/ui/extensions/components.js";
import { overlays } from "./modules/JS/ui/extensions/overlays.js";
import { effects } from "./modules/JS/ui/extensions/effects.js";


const liosOpen = {
  ui: ui,
  uiExtensions: {
    components: components,
    overlays: overlays,
    effects: effects
  }
};
export { liosOpen };