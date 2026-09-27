import type { nodeMethods } from "../nodeMethods";

type FrostedGlassOptions = {
    blur: string;
    saturation: string;
    blendMode: string;
    zIndex: number;
    background: string
};
type TextShadowOptions = {
    color: string;
    offsetX: string;
    offsetY: string;
    blurRadius: string;
    shadowColor: string;
};
type TextShadowMethods = nodeMethods & {
    noTextShadowBlur(): TextShadowMethods
};
    
type Effects = {
    frostedGlass(options?: FrostedGlassOptions): nodeMethods;
    textShadow(options?: TextShadowOptions): TextShadowMethods;
};
// declare module "../nodeMethods" {
//     interface nodeMethods {
//         effects():Effects
//     }
// }