/// Concurrency Limits

async function runWithLimit(tasks, limit) {
    const results = [];
    let index = 0;

    async function worker() {
        while (index < tasks.length) {
            const currentIndex = index++;
            results[currentIndex] = await tasks[currentIndex]();
        }
    }

    const workers = Array.from(
        { length: limit },
        () => worker()
    );

    await Promise.all(workers);

    return results;
}
