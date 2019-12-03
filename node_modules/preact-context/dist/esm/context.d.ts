import { ComponentConstructor, ComponentChildren } from "preact";
import { BitmaskFactory } from "./context-value-emitter";
export interface ProviderProps<T> {
    value: T;
}
export declare type ConsumerProps<T> = {
    unstable_observedBits?: number;
} & ({
    render: (val: T) => any;
} | {
    children: (val: T) => any;
} | {
    children: ComponentChildren;
});
export declare type ConsumerState<T> = ProviderProps<T>;
export interface Context<T> {
    Provider: ComponentConstructor<ProviderProps<T>, {}>;
    Consumer: ComponentConstructor<ConsumerProps<T>, ConsumerState<T>>;
}
declare function _createContext<T>(value: T, bitmaskFactory?: BitmaskFactory<T>): Context<T>;
export default _createContext;
export declare const createContext: typeof _createContext;
