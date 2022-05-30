import { trace, Lazy } from "./util.ts";

function sum(a: number, b: number): number {
    console.log(a);
    return a + b;
}

sum(10, 20);
sum(5+5, 20);

function lazySum(a: Lazy<number>, b: Lazy<number>): Lazy<number> {
    return () => {
        console.log('blabla');
        return a() + b();
    }
}

lazySum(trace(() => 5 + 5, 'top'), () => 20)();