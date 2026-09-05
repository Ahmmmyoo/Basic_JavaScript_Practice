The key to understanding Promises deeply is to stop thinking of them as “the value” and start thinking of them as **objects representing a future result**.

Let's build the mental model from the inside out.

---

# 1. What does `return 20` actually do?

Suppose we have:

```js
async function getNumber() {
    return 20;
}
const x = getNumber();
// you might think, console.log(x) = 20
// but it giver:.
 Promise {2 0} 
```

Conceptually:

```text
getNumber()
     │
     ▼
┌─────────────────────┐
│ Promise object      │
│                     │
│ state: fulfilled    │
│ value: 20           │
└─────────────────────┘
```

So:

```js
const x = getNumber();

console.log(x);
// is conceptually:
Promise {
    state: "fulfilled",
    value: 20
}
```

Then:

```js
getNumber().then(value => {
    console.log(value);
});
```

The `.then()` receives the **value inside the fulfilled Promise**:

```text
Promise
   │
   │ fulfilled
   │
   └── value = 20
             │
             ▼
        .then(value)
             │
             ▼
             20
```

### Important

`async` functions **always return a Promise**.

So:

```js
async function test() {
    return 20;
}
```

is roughly equivalent to:

```js
function test() {
    return Promise.resolve(20);
}
```

Not literally implemented this way internally, but this is the correct mental model.

---

# 2. What about `Promise.resolve(20)`?

Now:

```js
const p = Promise.resolve(20);
```

`p` is itself a Promise:

```text
p
│
▼
┌──────────────────┐
│ Promise          │
│                  │
│ state: fulfilled │
│ value: 20        │
└──────────────────┘
```

So:

```js
Promise.resolve(20).then(value => {
    console.log(value);
});
```

prints:

```text
20
```

But here's the important distinction:

### `.then()` receives the value, not the Promise.

```js
Promise.resolve(20)
    .then(value => {
        console.log(value);
    });
```

Inside the callback:

```js
value === 20
```

not:

```js
value === Promise.resolve(20)
```

---

# 3. Then why does `.then()` itself return a Promise?

This is where Promises become really interesting.

Consider:

```js
const p1 = Promise.resolve(20);

const p2 = p1.then(value => {
    return value * 2;
});
```

You now have:

```text
p1
│
▼
Promise
state: fulfilled
value: 20


p2
│
▼
Promise
state: fulfilled
value: 40
```

So:

```js
p1.then(...)
```

**returns another Promise.**

That's why you can chain:

```js
Promise.resolve(20)
    .then(x => x * 2)
    .then(x => x + 10)
    .then(x => console.log(x));
```

Think:

```text
Promise
  │
  │ 20
  ▼
.then(x => x * 2)
  │
  │ 40
  ▼
.then(x => x + 10)
  │
  │ 50
  ▼
.then(console.log)
```

Every `.then()` creates a **new Promise**.

---

# 4. The really important rule: what you return from `.then()`

This is the heart of Promise chaining.

Suppose:

```js
Promise.resolve(20)
    .then(x => {
        return 30;
    })
    .then(x => {
        console.log(x);
    });
```

The first `.then()` returns:

```text
Promise { fulfilled, value: 30 }
```

So the next `.then()` receives:

```js
30
```

---

## But what if you return a Promise?

```js
Promise.resolve(20)
    .then(x => {
        return Promise.resolve(30);
    })
    .then(x => {
        console.log(x);
    });
```

You might think the second `.then()` receives:

```js
Promise { 30 }
```

But it doesn't.

It receives:

```js
30
```

The Promise chain **adopts/unwraps the returned Promise**.

Conceptually:

```text
first Promise
     │
     │ 20
     ▼
.then()
     │
     │ returns Promise {30}
     ▼
new Promise
     │
     │ waits for returned Promise
     │
     ▼
value = 30
     │
     ▼
next .then(30)
```

This is one of the most important Promise concepts.

---

# 5. What does `new Error()` do?

Now let's move to errors.

```js
const error = new Error("Something went wrong");
```

This **creates an Error object**.

Conceptually:

```text
Error object
┌──────────────────────────┐
│ name: "Error"             │
│ message: "Something..."   │
│ stack: "..."              │
└──────────────────────────┘
```

But **nothing has been thrown yet**.

For example:

```js
const error = new Error("Oops");

console.log("hello");
```

prints:

```text
hello
```

The error object just exists.

---

# 6. What does `throw new Error()` do?

Now:

```js
throw new Error("Oops");
```

There are two separate operations:

### First:

```js
new Error("Oops")
```

creates an Error object.

### Then:

```js
throw ...
```

throws that object.

So:

```js
throw new Error("Oops");
```

means conceptually:

```text
create Error object
       ↓
throw that object
       ↓
stop normal execution
       ↓
look for error handler
```

Example:

```js
console.log("A");

throw new Error("Oops");

console.log("B");
```

Output:

```text
A
Error: Oops
```

`B` never executes.

---

# 7. `throw` vs rejected Promise

These look similar but are not exactly the same thing.

Normal synchronous JavaScript:

```js
function test() {
    throw new Error("Oops");
}
```

Calling:

```js
test();
```

causes a synchronous exception.

But inside an `async` function:

```js
async function test() {
    throw new Error("Oops");
}
```

the behavior is different.

The `async` function returns a **rejected Promise**.

Conceptually:

```text
test()
  │
  ▼
Promise
┌─────────────────────┐
│ state: rejected     │
│ reason: Error       │
│                     │
│ Error.message       │
│ "Oops"              │
└─────────────────────┘
```

So:

```js
const p = test();

console.log(p);
```

is conceptually:

```text
Promise {
    <rejected> Error: Oops
}
```

---

# 8. What does a rejected Promise actually contain?

A Promise has three important conceptual states:

```text
             ┌───────────────┐
             │   PENDING     │
             └───────┬───────┘
                     │
            ┌────────┴────────┐
            ▼                 ▼
     ┌────────────┐    ┌────────────┐
     │ FULFILLED  │    │  REJECTED  │
     │ value: 20  │    │ reason:    │
     │            │    │ Error(...) │
     └────────────┘    └────────────┘
```

For example:

```js
Promise.resolve(20);
```

conceptually:

```text
state = fulfilled
value = 20
```

While:

```js
Promise.reject(new Error("Oops"));
```

conceptually:

```text
state = rejected
reason = Error("Oops")
```

A Promise doesn't technically expose these fields as normal JavaScript properties, but this is an excellent mental model.

---

# 9. Does a rejected Promise go to the next `.then()`?

Normally:

**No.**

Consider:

```js
Promise.reject(new Error("Oops"))
    .then(() => {
        console.log("A");
    })
    .then(() => {
        console.log("B");
    })
    .catch(error => {
        console.log(error.message);
    });
```

Output:

```text
Oops
```

Neither `A` nor `B` runs.

Why?

Because the chain is currently:

```text
REJECTED
   │
   ▼
.then()
   │
   │ skipped
   ▼
.then()
   │
   │ skipped
   ▼
.catch()
   │
   ▼
handles error
```

A rejection **passes through `.then()` handlers that don't have an `onRejected` handler** until it finds an error handler.

---

# 10. But `.then()` CAN consume a rejection

This is an important exception.

`.then()` actually accepts **two callbacks**:

```js
.then(onFulfilled, onRejected)
```

For example:

```js
Promise.reject(new Error("Oops"))
    .then(
        value => {
            console.log("success:", value);
        },
        error => {
            console.log("error:", error.message);
        }
    );
```

The second function handles rejection.

So:

```text
Promise rejected
      │
      ▼
.then(success, error)
               │
               ▼
          error handler
```

You can also use:

```js
.catch(error => ...)
```

which is essentially a convenient way of saying:

```js
.then(undefined, error => ...)
```

---

# 11. What happens after `.catch()`?

This is another huge concept.

```js
Promise.reject(new Error("Oops"))
    .catch(error => {
        console.log("handled");
    })
    .then(value => {
        console.log("next:", value);
    });
```

Output:

```text
handled
next: undefined
```

Why?

Because the `.catch()` handler itself returns normally.

It doesn't return anything:

```js
error => {
    console.log("handled");
}
```

No `return` means:

```js
return undefined;
```

Therefore the Promise produced by `.catch()` becomes:

```text
fulfilled
value: undefined
```

So:

```text
Rejected Promise
      │
      ▼
    catch
      │
      │ returns undefined
      ▼
Fulfilled Promise
value: undefined
      │
      ▼
   next .then()
```

**This is extremely important:**

> A rejected Promise can become a fulfilled Promise if a rejection handler handles the error and returns normally.

---

# 12. Is `undefined` the same as rejection?

**Absolutely not.**

This is one of the biggest things to separate mentally.

These are different:

```js
Promise.resolve(undefined)
```

and:

```js
Promise.reject(undefined)
```

First:

```text
Promise
state: fulfilled
value: undefined
```

Second:

```text
Promise
state: rejected
reason: undefined
```

Both may contain the JavaScript value `undefined`, but their **Promise states are completely different**.

---

# 13. What happens if you don't return?

Consider:

```js
Promise.resolve(20)
    .then(x => {
        console.log(x);
    })
    .then(x => {
        console.log(x);
    });
```

First `.then()`:

```js
x = 20
```

You don't return anything.

JavaScript therefore gives you:

```js
undefined
```

So the Promise created by that `.then()` becomes:

```text
fulfilled
value: undefined
```

Then the next `.then()` receives:

```js
x = undefined
```

So:

```text
Promise {20}
      │
      ▼
.then(x => {
    console.log(x);
    // no return
})
      │
      ▼
Promise {undefined}
      │
      ▼
.then(x => {
    console.log(x);
})
      │
      ▼
x = undefined
```

---

# 14. Compare these three

This is worth memorizing.

### A. Return a value

```js
.then(() => {
    return 20;
})
```

Result:

```text
fulfilled
value: 20
```

---

### B. Don't return

```js
.then(() => {
    // nothing
})
```

Result:

```text
fulfilled
value: undefined
```

---

### C. Throw

```js
.then(() => {
    throw new Error("Oops");
})
```

Result:

```text
rejected
reason: Error("Oops")
```

So:

```text
return 20
     ↓
FULFILLED(20)


no return
     ↓
FULFILLED(undefined)


throw Error
     ↓
REJECTED(Error)
```

This is the core of Promise chaining.

---

# 15. And this explains `async` functions too

Look at:

```js
async function test() {
    return 20;
}
```

Result:

```text
FULFILLED(20)
```

Now:

```js
async function test() {
    return;
}
```

Result:

```text
FULFILLED(undefined)
```

And:

```js
async function test() {
    throw new Error("Oops");
}
```

Result:

```text
REJECTED(Error("Oops"))
```

So you can mentally translate an `async` function into:

```text
return value
     ↓
fulfilled Promise

return undefined
     ↓
fulfilled Promise with undefined

throw error
     ↓
rejected Promise
```

---

# 16. The deepest mental model

When you're reading Promise code, imagine every `.then()` as a **Promise transformation machine**:

```text
              INPUT PROMISE
                   │
                   ▼
             ┌─────────────┐
             │    .then   │
             │             │
             │ callback()  │
             └──────┬──────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
        ▼           ▼           ▼
    return 20    no return    throw Error
        │           │           │
        ▼           ▼           ▼
   Fulfilled    Fulfilled    Rejected
      20        undefined       Error
```

And because `.then()` **always produces a new Promise**, you can keep doing:

```text
Promise
  ↓
.then()
  ↓
Promise
  ↓
.then()
  ↓
Promise
  ↓
.catch()
  ↓
Promise
  ↓
.then()
  ↓
Promise
```

That's the real structure behind Promise chaining.

---

## One final example

Read this very carefully:

```js
Promise.resolve(10)
    .then(x => {
        return x * 2;
    })
    .then(x => {
        throw new Error("Boom");
    })
    .then(x => {
        console.log("I won't run");
        return 100;
    })
    .catch(error => {
        console.log(error.message);
        return 50;
    })
    .then(x => {
        console.log(x);
    });
```

Track the Promises:

```text
Promise.resolve(10)
        │
        │ fulfilled(10)
        ▼
.then(x => x * 2)
        │
        │ fulfilled(20)
        ▼
.then(...)
        │
        │ throws Error
        ▼
      REJECTED
      Error("Boom")
        │
        ▼
.next .then()
        │
        │ SKIPPED
        ▼
     .catch()
        │
        │ return 50
        ▼
   FULFILLED(50)
        │
        ▼
.next .then()
        │
        ▼
      50
```

Output:

```text
Boom
50
```

The key rules to burn into your brain are:

```text
return value
→ fulfilled Promise containing value

return Promise
→ resulting Promise follows that Promise

no return
→ fulfilled Promise containing undefined

throw Error
→ rejected Promise containing that Error

rejected Promise
→ skips normal .then() handlers

catch / onRejected
→ handles the rejection

catch that returns normally
→ creates a fulfilled Promise

catch that throws
→ creates another rejected Promise
```

If you understand those **7 rules**, Promise chaining, `async/await`, error propagation, and most advanced async JavaScript become much easier.