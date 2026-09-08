/// Concurrency Limits

async function runWithLimit(tasks, limit) {
    // Where completed results go
    const results = [];

    // Next task to claim
    let index = 0;

    // A worker repeatedly takes a task,
    // waits for it, then takes another task.
    async function worker() {
        while (index < tasks.length) {

            // Claim the next task
            const currentIndex = index++;

            // Run it and wait for it to finish
            results[currentIndex] =
                await tasks[currentIndex]();
        }
    }

    // Create `limit` workers
    const workers = Array.from(
        { length: limit },
        () => worker()
    );

    // Wait until every worker has finished
    await Promise.all(workers);

    return results;
}

