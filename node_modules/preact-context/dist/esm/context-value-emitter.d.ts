export declare type StateUpdater<T> = (val: T, bitmask: number) => void;
export declare type BitmaskFactory<T> = (a: T, b: T) => number;
export interface ContextValueEmitter<T> {
    register: (updater: StateUpdater<T>) => void;
    unregister: (updater: StateUpdater<T>) => void;
    val: (value?: T) => T;
}
export declare function createEmitter<T>(initialValue: T, bitmaskFactory: BitmaskFactory<T>): ContextValueEmitter<T>;
export declare const noopEmitter: ContextValueEmitter<any>;
