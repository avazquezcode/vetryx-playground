export function GetNthFibo() {
    return `fn fibonacci(n) {
    a := 0
    b := 1

    if n < 0 {
        print "invalid input"
    }

    if n == 0 {
        return a
    }

    if n == 1 {
        return b
    }

    i := 2
    while i < n+1 {
        c := a + b
        a = b
        b = c
        i = i + 1
    } 
    return b
}

print fibonacci(10)
`
}