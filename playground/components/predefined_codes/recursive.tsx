export function GetRecursive() {
    return `fn recursive(v) {
    if v <= 0 {
        return;
    }
    print v;
    recursive(v-1);
}

dec v = 10;
recursive(v);
`
}