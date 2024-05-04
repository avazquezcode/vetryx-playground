export function GetClosure() {
    return `fn buildCounter() {
    i := 0

    fn count() {
        i = i + 1
        print i
    }
    
    return count
}

dec counter
counter = buildCounter()

counter() # Prints 1
counter() # Prints 2
counter() # Prints 3
`
}