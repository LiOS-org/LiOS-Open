type ClassMethods = {
    add(...classNames: string[]): nodeMethods;
    remove(...classNames: string[]): nodeMethods;
};

type vDOM = {
    tagName: HTMLElement | string,
    children: nodeMethods[],
    parent: null | vDOM,
    text: string,
    style: any
};
type Portal = vDOM & {
    mountTarget: HTMLElement,
    element: HTMLElement,
    isPortal: boolean,
    isConnected:boolean
}

export class nodeMethods {
    extensions: object;
    initFunctions: (...args: any[]) => any[];
    constructor(getElement: () => HTMLElement, vDOM: object, styleEngine: any, context: object);
    
    get vDOM(): object;
    get styleEngine(): object;
    text(value: string): this;
    child(tagName: string): nodeMethods;
    svg(svgString: string): nodeMethods;
    parent(): nodeMethods;
    style(pseudoState?: string): any;
    property(object: object): this;
    on(event: string, callback: (...args: any[]) => any): this;
    off(event: string, callback: (...args: any[]) => any): this;
    label(value: string): this;
    removeAllListeners(): this;
    remove(): nodeMethods;
    id(value: string): this;
    get class(): ClassMethods;
    attr(object: object): this;
    clear(): this;
    connectPortal(portal: Portal): nodeMethods;
    static newPortal(parent: string, newChild: string): Portal;
    [key: string]: (...args:any[])=>nodeMethods;
};