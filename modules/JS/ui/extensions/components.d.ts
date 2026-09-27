import type { Extension } from "../../ui";
import type { nodeMethods } from "../nodeMethods";
import { components as thisExtension } from "./components.js";

type Button = nodeMethods & {
    buttonBackground(value: string): nodeMethods;
    buttonHoverBackground(value: string): nodeMethods;
    text(value: string): nodeMethods;
};
type ActionButton = nodeMethods & {
    buttonBackground(value: string): nodeMethods;
    buttonBoxShadow(value: string): nodeMethods;
    text(value: string): nodeMethods;
};
type ButtonGroup = nodeMethods & {
    buttonBackground(value: string): nodeMethods;
    buttonHoverBackground(value: string): nodeMethods;
    button(tag?: "a" | "div"): Button;
};
type Table = nodeMethods & {
    cellGap(value: string): nodeMethods;
    tablePadding(value: string): nodeMethods;
    headerBackground(value: string): nodeMethods;
    cellBackground(value: string): nodeMethods;
    cellHoverBackground(value: string): nodeMethods;
    background(value: string): nodeMethods;
    addColumn(): {
        nodeMethods: nodeMethods,
        title(value: string): nodeMethods
    };
    newRow(): {
        cell(...values: string | object): nodeMethods,
        elements: nodeMethods[]
    };
};

type Components = {
    button(tag?: "a" | "div"): Button;
    actionButton(tag?: "a" | "div"): ActionButton;
    buttonGroup(): ButtonGroup;
    table: Table;
};
export const components: Extension = {
    metadata: thisExtension.metadata,
    method: thisExtension.method,
    initFunction: thisExtension.initFunction
};
// declare module "../nodeMethods" {
//     interface nodeMethods {
//         components(): Components;
//     }
// }