export async function greet(name: string): Promise<string> {
    return `Hello ${name}`;
}

export async function add(a: number, b: number): Promise<number> {
    return a + b;
}