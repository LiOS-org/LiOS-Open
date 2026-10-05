import { UI } from "./modules/JS/ui";
import type { components } from "./modules/JS/ui/extensions/components";
import type { effects } from "./modules/JS/ui/extensions/effects";

export const liosOpen  =  {
    ui: UI,
    uiExtensions: {
        components,
        effects
    }
}