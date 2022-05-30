import { Lazy, printList, LazyList } from "./util.ts";

function range(begin: Lazy<number>): LazyList<number> {
    return () => {
        let x = begin();
        return {
            head: () => x,
            tail: range(() => x + 1),
        };
    }
}

printList(range(() => 3));