export type Lazy<T> = () => T;

export function trace<T>(a: Lazy<T>, message: string): Lazy<T> {
    return () => {
        console.log(message);
        return a();
    };
};

export type LazyList<T> = Lazy<{
    head: Lazy<T>,
    tail: LazyList<T>,
} | null>

export function toList<T>(a: T[]): LazyList<T> {
    return () => {
        if(a.length === 0) {
            return null;
        } else {
            return {
                head: () => a[0],
                tail: toList(a.slice(1)),
            };
        }
    };
}

export function printList<T>(list: LazyList<T>) {
    let pair = list();

    while(pair !== null) {
        console.log(pair.head());
        pair = pair.tail();
    }
}

export function range(begin: Lazy<number>): LazyList<number> {
    return () => {
        let x = begin();
        return {
            head: () => x,
            tail: range(() => x + 1),
        };
    };
}

export function take<T>(n: Lazy<number>, list: LazyList<T>): LazyList<T> {
    return () => {
        let m = n();
        let pair = list();

        if(m > 0 && pair !== null) {
            return {
                head: pair.head,
                tail: take(() => m - 1, pair.tail),
            }
        } else {
            return null;
        }
    }
}

export function filter<T>(predicate: (a: T) => boolean, list: LazyList<T>): LazyList<T> {
    return () => {
        let pair = list();

        if(pair === null) {
            return null;
        }
        else {
            let x = pair.head();
            return predicate(x)
                ? ({
                    head: () => x,
                    tail: filter(predicate, pair.tail),
                })
                : filter(predicate, pair.tail)();
        }
    }
}