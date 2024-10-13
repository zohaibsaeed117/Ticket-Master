export default function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout>;

    return function(this: void, ...args: Parameters<T>) {
        if (timer) clearTimeout(timer); // Clear previous timer if it exists
        timer = setTimeout(() => {
            func(...args); // Execute the function with the correct arguments
        }, delay);
    };
}
