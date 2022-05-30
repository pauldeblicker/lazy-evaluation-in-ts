import { Lazy } from "./util.ts";

function dummy<T>(): T {
    return dummy();
}

function first(a: number, b: number): number {
    return a;
}

// console.log('first', first(1, dummy()));

function lazyFirst(a: Lazy<number>, b: Lazy<number>): Lazy<number> {
    return a;
}

console.log('lazyFirst', lazyFirst(() => 1, () => dummy())());