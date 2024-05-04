export async function interpret(sourceCode: string) {
    var host = process.env.NEXT_PUBLIC_INTERPRETER_HOST as string;
    var endpoint = process.env.NEXT_PUBLIC_INTERPRET_ENDPOINT as string;
    var url = host + endpoint;

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "sourceCode": sourceCode }),
        });

        return await res.json();
    } catch (err) {
        alert("an error happened while interpreting the code: " + err);
        console.log(err)
        return err
    }
}