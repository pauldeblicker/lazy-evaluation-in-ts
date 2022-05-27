const sum = (a: number, b: number): number => {
    console.log('inside', a);
    return a + b;
}

console.log('classic', sum(10, 20));
console.log('classic', sum(5 + 5, 20));

//////////////////////////////////////////////////////////////////

const lazySum = (a: () => number, b: () => number): (() => number) => {
    console.log('inside', a);

    return () => a() + b();
}

console.log('lazy', lazySum(() => 10, () => 20));
console.log('lazy', lazySum(() => 5 + 5, () => 20));