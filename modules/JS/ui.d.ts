import type { liosOpen } from "../../liosOpen";
import type { nodeMethods } from "./ui/nodeMethods";
import type { StyleEngine } from "./ui/styleEngine/styleEngine";

export declare interface Extension{
    method: function,
    initFunction: function,
    metadata: object
};

const context = {
    nodeMethods: {
        newPortal: nodeMethods.newPortal.bind(nodeMethods)
    },
    styleEngine: {
        cloneStyle: StyleEngine.cloneStyle.bind(StyleEngine),
        installCSS: StyleEngine.installCSS.bind(StyleEngine),
        connect: StyleEngine.connect.bind(StyleEngine)
    }
};

export class UI extends nodeMethods{
    constructor(selector?: string = null);
    static extend(name: string, extension: Extension): void;
    create(tagName: string, parent: string): this;

    static nodeMethods = context.nodeMethods;
    static styleEngine = context.styleEngine;
};