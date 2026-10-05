export class Loader{
    constructor(options: {
        size?: string,
        location?: HTMLElement | string,
        background: string,
        pillColor: string,
        translucentDormantPill?: string,
    });
    await<T>(asyncFunction?: () => Promise<T>): Promise<T>;
    awaitInbound<T>(asyncFunction?: () => Promise<T>): Promise<T>;
    awaitOutbound<T>(asyncFunction?: () => Promise<T>): Promise<T>;
    awaitStatic<T>(asyncFunction?: () => Promise<T>): Promise<T>;
};