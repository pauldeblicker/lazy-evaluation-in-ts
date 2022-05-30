import { Lazy, LazyList, printList, range, take, filter } from "./util.ts";

function sieve(list: LazyList<number>): LazyList<number> {
    let pair = list();

    return () => {
        if (pair === null) {
            return null;
        } else {
            let h = pair.head();
            return ({
                head: () => h,
                tail: sieve(filter((x: number) => x % h !== 0, pair.tail)),
            });
        }
    }
}

printList(sieve(range(() => 2)));

// example of haskell implementation for sieve
// sieve (x:xs) = x:(sieve $ filter (\a -> a `mod` x /= 0) xs)