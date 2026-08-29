# Bind Deep-Dive Roadmap

## Prompt:
8/16/2026, 1:34:32 PM

make me a roadmap to understand bind with depth

## Response:
8/16/2026, 1:34:33 PM

Absolutely. Since you're learning JavaScript in the order **functions → callbacks → arrow functions → objects → `this` → `call/apply/bind`**, I’d learn `bind()` as a concept built on top of `this`, not as an isolated method.

# `bind()` Deep-Dive Roadmap

## Phase 0 — Prerequisites

Before touching `bind`, make sure you can explain these:

### 1. Functions
- Function declaration
- Function expression
- Parameters vs arguments
- Return values
- Functions as values

```js
function greet(name) {
  return `Hello ${name}`;
}

const fn = greet;

console.log(fn("Ahmad"));
```

Understand that:

> A function can be stored in a variable, passed around, and called later.

---

### 2. Callbacks

Understand what happens when a function is passed somewhere:

```js
function greet() {
  console.log("Hello");
}

setTimeout(greet, 1000);
```

Then understand the important problem:

```js
const user = {
  name: "Ahmad",

  greet() {
    console.log(this.name);
  }
};

setTimeout(user.greet, 1000);
```

Why doesn't this necessarily behave like:

```js
user.greet();
```

This leads directly into `this`.

---

# Phase 1 — Master `this`

Before `bind`, you should be able to determine the value of `this` without guessing.

Learn these rules in order:

### Rule 1 — Method call

```js
const user = {
  name: "Ahmad",

  greet() {
    console.log(this.name);
  }
};

user.greet();
```

`this` → `user`

---

### Rule 2 — Regular function

```js
function greet() {
  console.log(this);
}

greet();
```

Understand how strict mode changes the result.

---

### Rule 3 — Explicit `this`

Learn:

```js
call()
apply()
bind()
```

These allow you to explicitly control `this`.

---

### Rule 4 — Arrow functions

Understand why:

```js
const user = {
  name: "Ahmad",

  greet: () => {
    console.log(this.name);
  }
};
```

doesn't behave like a normal method.

The key concept:

> Arrow functions don't create their own `this`.

This is **very important for understanding why `bind()` doesn't work the way you might expect with arrows.**

---

# Phase 2 — Understand the Problem `bind()` Solves

This is where I recommend spending significant time.

Start with:

```js
const user = {
  name: "Ahmad",

  greet() {
    console.log(this.name);
  }
};

user.greet();
```

Works.

Now:

```js
const greet = user.greet;

greet();
```

Why did `this` change?

The function itself didn't change.

**The way the function was called changed.**

This is the fundamental problem that `bind()` solves.

---

# Phase 3 — Learn `call()`

Before `bind()`, master `call()`.

```js
function greet() {
  console.log(this.name);
}

const user = {
  name: "Ahmad"
};

greet.call(user);
```

Understand:

```js
greet.call(user);
```

means essentially:

> "Call `greet` right now, but make `this` equal to `user`."

Then learn arguments:

```js
function greet(message) {
  console.log(message, this.name);
}

greet.call(user, "Hello");
```

---

# Phase 4 — Learn `apply()`

Then compare:

```js
greet.call(user, "Hello");
```

with:

```js
greet.apply(user, ["Hello"]);
```

Understand that historically:

- `call()` → arguments individually
- `apply()` → arguments as an array

Then learn why `apply()` became less important with spread syntax:

```js
greet(...args);
```

and:

```js
greet.apply(user, args);
```

---

# Phase 5 — Finally Learn `bind()`

Now introduce:

```js
const boundGreet = greet.bind(user);
```

The most important distinction:

### `call()`

Calls immediately.

```js
greet.call(user);
```

### `apply()`

Calls immediately.

```js
greet.apply(user);
```

### `bind()`

Does **not** call immediately.

```js
const boundGreet = greet.bind(user);
```

It creates a **new function**.

Then:

```js
boundGreet();
```

calls it later.

Think:

```text
call   → control this → CALL NOW
apply  → control this → CALL NOW
bind   → control this → CREATE NEW FUNCTION
```

---

# Phase 6 — Understand What `bind()` Actually Returns

This is where we go deeper.

Given:

```js
function greet() {
  console.log(this.name);
}

const user = {
  name: "Ahmad"
};

const boundGreet = greet.bind(user);
```

Understand that:

```js
boundGreet !== greet
```

They're two different function objects.

Conceptually:

```text
greet
  ↓
original function

bind(user)
  ↓
new function
  ↓
remembers:
    this = user
```

Then:

```js
boundGreet();
```

internally behaves conceptually like:

```js
greet.call(user);
```

Not literally implemented that simply, but that's an excellent mental model.

---

# Phase 7 — `bind()` With Arguments

This is one of the most useful features.

```js
function introduce(greeting, punctuation) {
  console.log(
    greeting,
    this.name + punctuation
  );
}

const user = {
  name: "Ahmad"
};

const fn = introduce.bind(user, "Hello");

fn("!");
```

Here `bind()` does two things:

```text
1. permanently sets this
2. can pre-fill arguments
```

This is called **partial application** / **partial argument binding**.

---

# Phase 8 — Real-World Callback Problem

Now return to the problem that started everything.

```js
const user = {
  name: "Ahmad",

  greet() {
    console.log(this.name);
  }
};

setTimeout(user.greet, 1000);
```

Fix it with:

```js
setTimeout(user.greet.bind(user), 1000);
```

Now understand the flow:

```text
user.greet
    ↓
extract function
    ↓
bind(user)
    ↓
new function
    ↓
setTimeout receives new function
    ↓
later...
    ↓
this === user
```

This is one of the most important practical uses of `bind()`.

---

# Phase 9 — `bind()` With Event Handlers

Learn this pattern:

```js
class Button {
  constructor() {
    this.count = 0;

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.count++;
  }
}
```

Understand **why** classes commonly use binding when passing methods as callbacks.

This will also connect nicely to React.

---

# Phase 10 — `bind()` in React

Since you're preparing for React/Next.js, this is important historically and conceptually.

Understand the old class-component pattern:

```js
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      count: 0
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      count: this.state.count + 1
    });
  }
}
```

Then understand:

> Why did React developers need to bind methods?

And later:

> Why don't modern React functional components usually need `bind()`?

That distinction is important for interviews.

---

# Phase 11 — `bind()` + Arrow Functions

Now compare:

### Normal function

```js
const obj = {
  name: "Ahmad",

  greet() {
    console.log(this.name);
  }
};

const fn = obj.greet.bind(obj);
```

### Arrow function

```js
const fn = () => {
  console.log(this);
};

const bound = fn.bind(obj);
```

Understand why binding an arrow function does **not** change its `this`.

This will force you to understand:

> `this` is determined differently for arrow functions.

---

# Phase 12 — Advanced `bind()`

Once the basics are solid, move into:

### 1. Rebinding

```js
const fn1 = greet.bind(user1);
const fn2 = fn1.bind(user2);
```

Question:

**Which object becomes `this`?**

---

### 2. Bound arguments

```js
function add(a, b, c) {
  return a + b + c;
}

const add10 = add.bind(null, 10);

add10(20, 30);
```

Understand why this works.

---

### 3. `bind()` with constructors

Learn:

```js
function Person(name) {
  this.name = name;
}

const BoundPerson = Person.bind(null, "Ahmad");

const person = new BoundPerson();
```

This is an advanced but important topic.

Understand why `new` changes some of the normal `bind()` behavior.

---

### 4. `prototype`

Eventually understand:

```js
BoundPerson.prototype
```

and how bound functions interact with prototypes.

This is **advanced JavaScript interview territory**.

---

# Phase 13 — Build `bind()` Yourself

This is where you'll know whether you truly understand it.

Try creating:

```js
Function.prototype.myBind = function (...) {
  // your implementation
};
```

Eventually make this work:

```js
function greet(age) {
  console.log(this.name, age);
}

const user = {
  name: "Ahmad"
};

const fn = greet.myBind(user, 22);

fn();
```

Then progressively support:

```text
myBind
 ↓
this
 ↓
arguments
 ↓
partial arguments
 ↓
new operator
 ↓
prototype behavior
```

Implementing `bind()` is one of the best ways to deeply understand it.

---

# Phase 14 — Interview-Level Understanding

Finally, you should be able to answer these without memorizing:

### Basic

1. What does `bind()` do?
2. Does `bind()` execute the function?
3. What does `bind()` return?
4. Difference between `call`, `apply`, and `bind`?

### Intermediate

5. Why is `bind()` useful with callbacks?
6. What happens to `this` when a method is detached?
7. Can `bind()` permanently change `this`?
8. Can you bind arguments?

### Advanced

9. What happens when you bind an already-bound function?
10. What happens when a bound function is used with `new`?
11. Does `bind()` work on arrow functions?
12. Why doesn't binding an arrow function change its `this`?
13. How would you implement `bind()` yourself?
14. Why was `bind()` common in React class components?

---

# The Learning Path I Recommend for You

Don't try to learn all of this at once.

We'll do it in this order:

```text
1. Review functions
       ↓
2. Callback functions
       ↓
3. The real problem with `this`
       ↓
4. How `this` is determined
       ↓
5. `call()`
       ↓
6. `apply()`
       ↓
7. `bind()` basics
       ↓
8. bind() vs call() vs apply()
       ↓
9. bind() + arguments
       ↓
10. bind() + callbacks
       ↓
11. bind() + objects
       ↓
12. bind() + classes
       ↓
13. bind() + React
       ↓
14. bind() + arrow functions
       ↓
15. rebinding
       ↓
16. bind() + `new`
       ↓
17. partial application
       ↓
18. implement `myBind()`
       ↓
19. tricky interview questions
       ↓
20. advanced exercises
```

### The most important mental model

If you remember only one thing initially:

```js
fn.call(obj)
```

means:

> **Run `fn` now with `this = obj`.**

```js
fn.apply(obj, args)
```

means:

> **Run `fn` now with `this = obj` and these arguments.**

```js
const newFn = fn.bind(obj)
```

means:

> **Give me a new function that remembers `this = obj` and can run later.**

That distinction is the foundation we'll build everything else on.

## Prompt:
8/16/2026, 1:36:18 PM

now make me learn

## Response:
8/16/2026, 1:36:20 PM

Yes. We'll learn it **step by step**, like we did with async JS. I’ll explain → show examples → give you questions → check your answers → then move to the next level.

# Lesson 1 — The Problem `bind()` Solves

Before `bind()`, you need to understand **why `this` gets lost**.

## 1. Start with a normal object

```js
const user = {
  name: "Ahmad",

  greet() {
    console.log(this.name);
  }
};

user.greet();
```

Output:

```text
Ahmad
```

Why?

Because the function is called like this:

```js
user.greet();
```

JavaScript sees:

```text
object.function()
   ↓
  this
   ↓
 user
```

So inside `greet()`:

```js
this === user
```

---

# 2. Now separate the function

Look at this:

```js
const user = {
  name: "Ahmad",

  greet() {
    console.log(this.name);
  }
};

const fn = user.greet;

fn();
```

What happened?

We took the function out of the object.

Originally:

```js
user.greet();
```

Now:

```js
fn();
```

Those are **not the same kind of function call**.

The important thing is:

```text
user.greet()
   ↑
JavaScript can determine this from the caller

fn()
 ↑
There is no user before the dot
```

So `this` is no longer automatically `user`.

---

# 3. This is the problem `bind()` helps solve

Imagine:

```js
const user = {
  name: "Ahmad",

  greet() {
    console.log("Hello " + this.name);
  }
};

const fn = user.greet;

setTimeout(fn, 1000);
```

We want:

```text
Hello Ahmad
```

But we've lost the connection between:

```text
fn
```

and:

```text
user
```

We need a way to say:

> "Whenever this function runs, I want `this` to refer to `user`."

That's where `bind()` comes in.

---

# 4. Your first `bind()`

```js
const boundFn = user.greet.bind(user);
```

Read this almost like English:

> Take `user.greet` and create a new function whose `this` is bound to `user`.

Then:

```js
boundFn();
```

Now:

```text
Hello Ahmad
```

And this works too:

```js
setTimeout(boundFn, 1000);
```

Because `boundFn` remembers:

```text
this → user
```

---

# 5. Understand what `bind()` returns

This is **extremely important**.

When you write:

```js
user.greet.bind(user);
```

`bind()` does **not** execute `greet()`.

It creates another function.

Think:

```text
user.greet
     │
     │ bind(user)
     ↓
┌─────────────┐
│ new function│
│             │
│ remembers   │
│ this = user │
└─────────────┘
```

So:

```js
const boundFn = user.greet.bind(user);
```

Then later:

```js
boundFn();
```

---

# 6. Compare these carefully

### `call`

```js
user.greet.call(user);
```

**Execute now.**

### `apply`

```js
user.greet.apply(user);
```

**Execute now.**

### `bind`

```js
const fn = user.greet.bind(user);
```

**Don't execute. Create a new function.**

Then:

```js
fn();
```

**Execute later.**

Memorize this:

```text
call  → call now
apply → call now
bind  → create function for later
```

---

# 7. First real-world example

Imagine a button:

```js
const user = {
  name: "Ahmad",

  handleClick() {
    console.log(`${this.name} clicked the button`);
  }
};
```

If we give the method directly to another system:

```js
someEventSystem(user.handleClick);
```

The system may eventually call:

```js
user.handleClick
```

as just:

```js
callback();
```

Now the original object relationship is gone.

So we can do:

```js
someEventSystem(
  user.handleClick.bind(user)
);
```

Now the callback remembers:

```text
this = user
```

This callback pattern is one of the biggest practical reasons you encounter `bind()`.

---

# 8. One very important distinction

Look at these:

```js
const fn1 = user.greet;
```

versus:

```js
const fn2 = user.greet.bind(user);
```

### `fn1`

```text
original function
+
no fixed this
```

### `fn2`

```text
new function
+
this permanently bound to user
```

So:

```js
fn1();
```

and:

```js
fn2();
```

can behave differently.

---

# Your turn 🧠

Don't look for the answers yet. Answer these.

### Question 1

What is printed?

```js
const person = {
  name: "Ahmad",

  greet() {
    console.log(this.name);
  }
};

person.greet();
```

---

### Question 2

What is the problem here?

```js
const person = {
  name: "Ahmad",

  greet() {
    console.log(this.name);
  }
};

const fn = person.greet;

fn();
```

Explain **why** `this` is different.

---

### Question 3

What does this do?

```js
const fn = person.greet.bind(person);
```

A) Immediately executes `greet`

B) Creates a new function with `this` bound to `person`

C) Changes the original `greet` function

D) Converts `greet` into an arrow function

---

### Question 4

What's the difference?

```js
person.greet.call(person);
```

and

```js
const fn = person.greet.bind(person);
```

---

### Question 5 — predict the output

```js
const person = {
  name: "Ahmad",

  greet() {
    console.log(this.name);
  }
};

const a = person.greet;
const b = person.greet.bind(person);

a();
b();
```

Tell me what happens to **both `a()` and `b()`**, and most importantly **why**.

After you answer these, we'll move to **Lesson 2: `call()` vs `apply()` vs `bind()`**, where things start getting much more interesting.

## Prompt:
8/16/2026, 1:43:08 PM

ahmad
this != user
binds this to person
this != person vs this = person
undefined ahmad

## Response:
8/16/2026, 1:43:09 PM

Excellent. **5/5 conceptually.** You understand the core problem.

One small precision on Q4:

```js
person.greet.call(person);
```

means **run it immediately with `this = person`**.

```js
const fn = person.greet.bind(person);
```

means **create a new function that remembers `this = person`**.

That distinction is the heart of `bind()`.

---

# Lesson 2 — `call()` vs `apply()` vs `bind()`

Now we're going one level deeper.

Consider:

```js
function introduce(greeting, age) {
  console.log(greeting, this.name, age);
}

const person = {
  name: "Ahmad"
};
```

We want to control what `this` refers to.

## `call()`

```js
introduce.call(person, "Hello", 22);
```

Output:

```text
Hello Ahmad 22
```

The structure is:

```js
function.call(thisValue, arg1, arg2, arg3);
```

So:

```js
introduce.call(person, "Hello", 22);
```

means:

```text
this = person
greeting = "Hello"
age = 22
run function NOW
```

---

# `apply()`

Almost identical:

```js
introduce.apply(person, ["Hello", 22]);
```

Output:

```text
Hello Ahmad 22
```

The major difference is how arguments are supplied.

### `call`

```js
fn.call(obj, arg1, arg2, arg3);
```

### `apply`

```js
fn.apply(obj, [arg1, arg2, arg3]);
```

Think:

```text
call  → separate arguments
apply → array of arguments
```

---

# `bind()`

Now:

```js
const fn = introduce.bind(person, "Hello", 22);
```

Nothing prints.

Why?

Because `bind()` **doesn't call the function**.

It creates a new function.

Then:

```js
fn();
```

Output:

```text
Hello Ahmad 22
```

So:

```text
call
 ↓
execute immediately

apply
 ↓
execute immediately

bind
 ↓
create new function
 ↓
execute later
```

---

# But `bind()` has another superpower

You don't have to provide all the arguments.

For example:

```js
function add(a, b, c) {
  return a + b + c;
}
```

We can do:

```js
const add10 = add.bind(null, 10);
```

Now `10` is already attached to the first argument.

So:

```js
add10(20, 30);
```

is effectively:

```js
add(10, 20, 30);
```

Result:

```text
60
```

This is called **partial application**.

---

# Visualize it

Original:

```text
add(a, b, c)
```

After:

```js
const add10 = add.bind(null, 10);
```

Think:

```text
add10(b, c)

      ↓

add(10, b, c)
```

Then:

```js
add10(20, 30);
```

becomes conceptually:

```js
add(10, 20, 30);
```

---

# One important question

Why did we use:

```js
add.bind(null, 10);
```

instead of:

```js
add.bind({}, 10);
```

Because `add()` doesn't use `this`.

We don't care about its `this` value, so `null` is commonly used.

---

# Your turn 🔥

### 1. What does this print?

```js
function greet(message, punctuation) {
  console.log(message, this.name + punctuation);
}

const user = {
  name: "Ahmad"
};

greet.call(user, "Hello", "!");
```

---

### 2. What does this print?

```js
function greet(message, punctuation) {
  console.log(message, this.name + punctuation);
}

const user = {
  name: "Ahmad"
};

greet.apply(user, ["Hi", "?"]);
```

---

### 3. What happens here?

```js
function greet(message) {
  console.log(message, this.name);
}

const user = {
  name: "Ahmad"
};

const fn = greet.bind(user, "Hello");

console.log("Start");

fn();

console.log("End");
```

Give me the **exact order**.

---

### 4. What does this produce?

```js
function multiply(a, b, c) {
  return a * b * c;
}

const double = multiply.bind(null, 2);

console.log(double(3, 4));
```

---

### 5. Most important

Explain the difference between:

```js
greet.call(user, "Hello");
```

and:

```js
const fn = greet.bind(user, "Hello");
```

Don't just say "one runs and one doesn't."

Tell me **what happens to `this` and the argument `"Hello"`** in each case.

## Prompt:
8/16/2026, 1:57:55 PM

hello ahmad !
hi ahmad ?
start 
hello ahmad 
end
24
calls the fun with this = user vs creates a greet with this = user
hello is used vs hello is bind for later calls

## Response:
8/16/2026, 1:57:56 PM

Perfect. **5/5.** And your last answer shows you understand the important distinction between **binding `this`** and **binding arguments**.

Let's go deeper.

# Lesson 3 — What `bind()` Actually Creates

This is where I want you to stop thinking of `bind()` as just:

> "`bind()` sets `this`."

That's true, but incomplete.

Consider:

```js
function greet(message) {
  console.log(message, this.name);
}

const user = {
  name: "Ahmad"
};

const boundGreet = greet.bind(user);
```

There are now **two different functions**:

```text
greet
   ↓
original function

boundGreet
   ↓
new bound function
   ↓
remembers:
    this → user
```

So:

```js
console.log(greet === boundGreet);
```

gives:

```text
false
```

`bind()` does **not modify the original function**.

---

## 1. Prove it

```js
function greet() {
  console.log(this.name);
}

const user = {
  name: "Ahmad"
};

const bound = greet.bind(user);

console.log(greet === bound);
```

Output:

```text
false
```

Why?

Because `bind()` created another function.

---

# 2. The bound function remembers `this`

```js
const bound = greet.bind(user);
```

Then:

```js
bound();
```

uses:

```text
this → user
```

Even if we pass it somewhere:

```js
setTimeout(bound, 1000);
```

it still remembers:

```text
this → user
```

That's the magic.

---

# 3. But what if we try to change `this`?

This is where `bind()` gets interesting.

```js
const user1 = {
  name: "Ahmad"
};

const user2 = {
  name: "Ali"
};

function greet() {
  console.log(this.name);
}

const bound = greet.bind(user1);

bound.call(user2);
```

What do you think?

You might expect:

```text
Ali
```

because:

```js
bound.call(user2);
```

says:

> Call this function with `this = user2`.

But the output is:

```text
Ahmad
```

Why?

Because `bound` already has its `this` bound.

Conceptually:

```text
greet
 ↓
bind(user1)
 ↓
bound
 ↓
this = user1
```

Trying:

```js
bound.call(user2)
```

doesn't replace that bound `this`.

---

# 4. This is called "bound `this`"

Once:

```js
const bound = greet.bind(user1);
```

the function remembers:

```text
this = user1
```

Normal `call()` / `apply()` can't override it.

That's a major property of bound functions.

---

# 5. But arguments behave differently

Consider:

```js
function introduce(greeting, name) {
  console.log(greeting, name);
}

const fn = introduce.bind(null, "Hello");
```

We've bound the **first argument**:

```text
greeting = "Hello"
```

But `name` is still open.

So:

```js
fn("Ahmad");
```

becomes conceptually:

```js
introduce("Hello", "Ahmad");
```

Output:

```text
Hello Ahmad
```

---

# 6. Multiple bound arguments

You can bind several:

```js
function add(a, b, c) {
  return a + b + c;
}

const fn = add.bind(null, 10, 20);
```

Now:

```js
fn(30);
```

is effectively:

```js
add(10, 20, 30);
```

Result:

```text
60
```

Think of `bind()` as creating a function with some values **pre-filled**.

---

# 7. This is the deeper mental model

When you write:

```js
const fn = original.bind(obj, 10, 20);
```

think:

```text
NEW FUNCTION
│
├── remembers this → obj
│
├── remembers first argument → 10
│
└── remembers second argument → 20
```

Then when you call:

```js
fn(30, 40);
```

conceptually:

```text
this      → obj
argument1 → 10
argument2 → 20
argument3 → 30
argument4 → 40
```

So `bind()` isn't merely a `this` tool.

It's also a **function configuration tool**.

---

# Challenge 🔥

Don't run these. Predict them.

### A

```js
const a = {
  name: "Ahmad"
};

const b = {
  name: "Ali"
};

function greet() {
  console.log(this.name);
}

const fn = greet.bind(a);

fn.call(b);
```

What prints?

---

### B

```js
function greet(greeting, name) {
  console.log(greeting, name);
}

const fn = greet.bind(null, "Hello");

fn("Ahmad");
```

What prints?

---

### C

```js
function add(a, b, c) {
  return a + b + c;
}

const fn = add.bind(null, 10);

console.log(fn(20, 30));
```

What prints?

---

### D — Think carefully

```js
function greet(a, b) {
  console.log(this.name, a, b);
}

const user = {
  name: "Ahmad"
};

const fn = greet.bind(user, 10);

fn(20);
```

What are:

```text
this = ?
a = ?
b = ?
```

---

### E — Important

```js
function greet() {
  console.log(this.name);
}

const user = {
  name: "Ahmad"
};

const fn = greet.bind(user);

console.log(greet === fn);
```

`true` or `false`?

And **why?**

After this, we'll tackle one of the most confusing `bind()` topics: **what happens when you bind an already-bound function**.

## Prompt:
8/16/2026, 2:06:10 PM

ahmad
hello ahmad
50
ahmad 10 20, this = user, a 10, b 20
false, greet is a function with its own this but fn is a fucntion with this = user

## Response:
8/16/2026, 2:06:12 PM

Excellent — **5/5 again.** Your mental model is getting solid.

One tiny correction to your last explanation:

> `greet` is not a function "with its own `this`."

`greet` is just the original function. Its `this` is determined when it is called. The **bound function** is special because its `this` has been fixed by `bind()`.

---

# Lesson 4 — Binding a Bound Function

This is one of the classic tricky `bind()` questions.

Start here:

```js
const user1 = {
  name: "Ahmad"
};

const user2 = {
  name: "Ali"
};

function greet() {
  console.log(this.name);
}
```

First:

```js
const fn1 = greet.bind(user1);
```

So:

```text
fn1 → this = user1
```

Therefore:

```js
fn1();
```

prints:

```text
Ahmad
```

Simple.

---

## Now do this

```js
const fn2 = fn1.bind(user2);
```

You might think:

```text
fn1
 ↓ bind(user2)
fn2
 ↓
this = user2
```

So perhaps:

```js
fn2();
```

prints:

```text
Ali
```

But it doesn't.

It prints:

```text
Ahmad
```

### Why?

Because `fn1` already has its `this` bound.

```text
greet
 ↓
bind(user1)
 ↓
fn1
 ↓
this locked to user1
```

Then:

```text
fn1
 ↓
bind(user2)
 ↓
fn2
```

The new binding **cannot replace the original bound `this`**.

So:

```text
fn2
 ↓
this = user1
```

not `user2`.

---

# Very important rule

> **Once `this` has been bound with `bind()`, another `bind()`, `call()`, or `apply()` cannot override that bound `this`.**

Example:

```js
const fn = greet.bind(user1);

fn.call(user2);
fn.apply(user2);
const fn2 = fn.bind(user2);
```

All of them still use:

```text
this → user1
```

---

# But there's a twist 👀

Arguments can continue to be accumulated.

Consider:

```js
function add(a, b, c) {
  return a + b + c;
}

const fn1 = add.bind(null, 10);

const fn2 = fn1.bind(null, 20);

console.log(fn2(30));
```

What happens?

The first binding gives:

```text
a = 10
```

The second binding supplies:

```text
b = 20
```

Then the call supplies:

```text
c = 30
```

So:

```text
10 + 20 + 30
```

→ `60`

This gives us an important distinction:

```text
Bound `this`
    ↓
cannot be replaced

Bound arguments
    ↓
can continue accumulating
```

---

# Let's test your understanding 🔥

### Q1

```js
const a = {
  name: "Ahmad"
};

const b = {
  name: "Ali"
};

function greet() {
  console.log(this.name);
}

const fn1 = greet.bind(a);
const fn2 = fn1.bind(b);

fn2();
```

What prints?

---

### Q2

```js
function add(a, b, c) {
  return a + b + c;
}

const fn1 = add.bind(null, 10);
const fn2 = fn1.bind(null, 20);

console.log(fn2(30));
```

What prints?

---

### Q3

What happens here?

```js
const fn = greet.bind(a);

fn.call(b);
```

Does it print Ahmad or Ali?

And **why?**

---

### Q4 — Deep one

```js
function show(a, b, c) {
  console.log(this.name, a, b, c);
}

const user1 = {
  name: "Ahmad"
};

const user2 = {
  name: "Ali"
};

const fn1 = show.bind(user1, 10);
const fn2 = fn1.bind(user2, 20);

fn2(30);
```

Tell me exactly:

```text
this = ?
a = ?
b = ?
c = ?
```

Once you nail these, we'll move into **`bind()` + `new`**, which is the first genuinely advanced part.

## Prompt:
8/29/2026, 2:00:03 PM

ok go advance

## Response:
8/29/2026, 2:00:06 PM

Good. You've got the core behavior, so let's jump to the **advanced part: `bind()` + `new`**.

# Lesson 5 - `bind()` + `new`

This is where many developers get confused.

Start with a constructor:

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const p = new Person("Ahmad", 22);

console.log(p.name);
console.log(p.age);
```

You already know roughly what `new` does:

```text
new Person("Ahmad", 22)

        ↓

1. Create a new object
2. Set its prototype to Person.prototype
3. Call Person with this = new object
4. Return the object
```

So conceptually:

```js
this = newObject;
Person("Ahmad", 22);
```

---

# Now combine `bind()` and `new`

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const BoundPerson = Person.bind(null, "Ahmad");

const person = new BoundPerson(22);

console.log(person.name);
console.log(person.age);
```

Output:

```text
Ahmad
22
```

But wait.

We did:

```js
Person.bind(null, "Ahmad")
```

Didn't we say that `bind()` fixes:

```text
this = null
```

?

Why did `this` become the newly-created object?

## Because `new` wins.

When a bound function is called with `new`, the bound `this` value is ignored.

So:

```js
const BoundPerson = Person.bind(null, "Ahmad");

new BoundPerson(22);
```

conceptually becomes:

```text
Create new object
       ↓
this = new object
       ↓
Person("Ahmad", 22)
```

The `"Ahmad"` is still bound.

The `this` binding isn't.

---

# Remember this rule

For normal calls:

```js
boundFn.call(otherObject);
```

The original bound `this` wins.

But:

```js
new boundFn();
```

The newly created object becomes `this`.

So:

```text
Normal call:
bind → controls this

call/apply:
bind → still controls this

new:
new → controls this
```

That's a very important interview rule.

---

# Why does `bind()` work with constructors?

Because `bind()` can bind arguments independently of `this`.

Example:

```js
function Car(brand, model, year) {
  this.brand = brand;
  this.model = model;
  this.year = year;
}

const ToyotaCar = Car.bind(null, "Toyota");

const car = new ToyotaCar("Corolla", 2026);
```

Think:

```text
ToyotaCar("Corolla", 2026)

↓

Car("Toyota", "Corolla", 2026)

↓

new object:
{
    brand: "Toyota",
    model: "Corolla",
    year: 2026
}
```

This is a useful application of **partial application**.

---

# The really interesting part: prototype

Now:

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log("Hello " + this.name);
};

const BoundPerson = Person.bind(null, "Ahmad");

const person = new BoundPerson();

person.sayHello();
```

It works.

Why?

Because the object created by `new BoundPerson()` still gets the appropriate prototype behavior associated with the original constructor.

Conceptually:

```text
Person
  │
  ├── prototype
  │      │
  │      └── sayHello()
  │
  ↓
bind()
  ↓
BoundPerson
  │
  ↓
new
  │
  ↓
person
  │
  └── can access Person.prototype methods
```

This is one of the reasons `bind()` isn't simply:

```js
(...args) => original(...args)
```

A real bound function has special behavior around constructors.

---

# Now let's go one level deeper

## Implementing your own `bind()`

You should eventually be able to understand something like:

```js
Function.prototype.myBind = function (thisArg, ...boundArgs) {
  const originalFunction = this;

  return function (...laterArgs) {
    return originalFunction.apply(
      thisArg,
      [...boundArgs, ...laterArgs]
    );
  };
};
```

Then:

```js
function greet(greeting, punctuation) {
  console.log(greeting, this.name + punctuation);
}

const user = {
  name: "Ahmad"
};

const fn = greet.myBind(user, "Hello");

fn("!");
```

Output:

```text
Hello Ahmad!
```

Let's dissect it.

---

## Step 1

When we do:

```js
greet.myBind(user, "Hello");
```

inside `myBind`:

```js
this
```

refers to:

```text
greet
```

because we're calling:

```js
greet.myBind(...)
```

So:

```js
const originalFunction = this;
```

means:

```text
originalFunction = greet
```

---

## Step 2

We return another function:

```js
return function (...laterArgs) {
```

That function is the equivalent of our future:

```js
fn
```

---

## Step 3

We eventually call:

```js
fn("!");
```

So:

```text
boundArgs = ["Hello"]

laterArgs = ["!"]
```

We combine them:

```js
["Hello", "!"]
```

Then:

```js
originalFunction.apply(
  thisArg,
  ["Hello", "!"]
);
```

which is essentially:

```js
greet.apply(user, ["Hello", "!"]);
```

So:

```text
this → user
greeting → "Hello"
punctuation → "!"
```

---

# But our `myBind()` is incomplete

This is where interview questions get serious.

Our implementation handles:

```text
✓ this
✓ bound arguments
✓ later arguments
✓ calling the function
```

But it doesn't correctly handle:

```text
✗ new
✗ constructor behavior
✗ prototype behavior
```

A proper polyfill needs to distinguish:

```js
fn()
```

from:

```js
new fn()
```

That's significantly more advanced.

---

# One more advanced concept: `bind()` is not "permanent" in every sense

Be precise.

We say:

> "`bind()` permanently binds `this`."

That's a useful beginner explanation, but technically:

```js
new boundFunction()
```

can cause the newly created object to become `this`.

So the more accurate statement is:

> **A bound function ignores normal attempts to override its bound `this`, but constructor calls using `new` have special behavior.**

That's the interview-quality explanation.

---

# Your Advanced Challenge 🔥

Don't run these. Predict them.

### 1

```js
function Person(name) {
  this.name = name;
}

const BoundPerson = Person.bind(null, "Ahmad");

const p = new BoundPerson();

console.log(p.name);
```

---

### 2

```js
function Person(name) {
  this.name = name;
}

const a = {
  name: "Ali"
};

const BoundPerson = Person.bind(a, "Ahmad");

const p = new BoundPerson();

console.log(p.name);
console.log(a.name);
```

What are both outputs?

---

### 3 - harder

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const BoundPerson = Person.bind(null, "Ahmad");

const p = new BoundPerson(22);

console.log(p.name);
console.log(p.age);
console.log(p instanceof Person);
console.log(p instanceof BoundPerson);
```

Predict all four.

---

### 4 - interview level

Explain this statement in your own words:

> **`bind()` fixes `this` for normal function calls, but when the bound function is invoked with `new`, the newly created object becomes `this`.**

If you can explain **why** that's true rather than just repeating it, you've understood the advanced part.

Next after this: **`bind()` + arrow functions + lexical `this`**, then we'll finish with **a real `myBind()` implementation including `new` support**.

## Prompt:
8/29/2026, 2:01:27 PM

ok go next

## Response:
8/29/2026, 2:01:29 PM

# Lesson 6 - `bind()` + Arrow Functions

This is one of the **most important `bind()` concepts**, because it connects everything you've learned about `this`.

The big rule:

> **`bind()` cannot change the `this` of an arrow function.**

Let's understand *why*, rather than memorizing it.

---

## 1. Normal function gets `this` from the call

```js
function greet() {
  console.log(this.name);
}

const user = {
  name: "Ahmad"
};

greet.call(user);
```

Here `call()` can control `this`.

Likewise:

```js
const fn = greet.bind(user);

fn();
```

works because `greet` is a **normal function**.

---

# 2. Arrow functions are different

Consider:

```js
const greet = () => {
  console.log(this.name);
};
```

An arrow function doesn't create its own `this`.

Instead, it **inherits `this` from its surrounding scope**.

Think:

```text
normal function

function greet() {
    this ← determined when called
}
```

versus:

```text
arrow function

const greet = () => {
    this ← inherited from outside
}
```

---

# 3. Therefore `bind()` can't control an arrow's `this`

Example:

```js
const greet = () => {
  console.log(this.name);
};

const user = {
  name: "Ahmad"
};

const fn = greet.bind(user);

fn();
```

`bind(user)` does **not** make the arrow's `this` become `user`.

Why?

Because the arrow never had its own `this` to bind in the first place.

---

# 4. Compare them

### Normal function

```js
function greet() {
  console.log(this.name);
}

const bound = greet.bind(user);

bound();
```

`this` → `user`

### Arrow

```js
const greet = () => {
  console.log(this.name);
};

const bound = greet.bind(user);

bound();
```

`this` → whatever `this` was in the surrounding lexical scope.

`bind()` can't replace it.

---

# 5. This becomes extremely useful with objects

Look at this:

```js
const user = {
  name: "Ahmad",

  greet: function () {
    console.log(this.name);
  }
};

user.greet();
```

Output:

```text
Ahmad
```

Now change it to:

```js
const user = {
  name: "Ahmad",

  greet: () => {
    console.log(this.name);
  }
};

user.greet();
```

The arrow does **not** get `this = user`.

This is why using an arrow function as an object method can produce surprising results.

---

# 6. But arrows are fantastic inside methods

This is where it gets interesting.

```js
const user = {
  name: "Ahmad",

  greet() {
    const inner = () => {
      console.log(this.name);
    };

    inner();
  }
};

user.greet();
```

Output:

```text
Ahmad
```

Why?

The outer method has:

```text
this → user
```

The arrow doesn't create a new `this`.

So it inherits:

```text
arrow this
    ↓
outer this
    ↓
user
```

This is called **lexical `this`**.

---

# 7. Why this matters for callbacks

Here's the classic problem:

```js
const user = {
  name: "Ahmad",

  greet() {
    setTimeout(function () {
      console.log(this.name);
    }, 1000);
  }
};

user.greet();
```

The callback is a normal function.

Its `this` isn't automatically the same as the outer `greet()`.

You could solve this with `bind()`:

```js
setTimeout(
  function () {
    console.log(this.name);
  }.bind(this),
  1000
);
```

Or, modern JavaScript:

```js
setTimeout(() => {
  console.log(this.name);
}, 1000);
```

The arrow inherits `this` from `greet()`.

So:

```text
                greet()
                  │
             this = user
                  │
                  ↓
              arrow()
                  │
          inherits this
                  │
                  ↓
             this = user
```

---

# 8. `bind()` vs arrow functions

You should now recognize two different solutions.

### Explicitly bind

```js
const fn = callback.bind(this);
```

You're saying:

> "Make this function use this specific `this`."

### Arrow function

```js
const fn = () => {
   // uses outer this
};
```

You're saying:

> "Don't create a new `this`; use the surrounding `this`."

That's a major conceptual difference.

---

# 9. A very common interview question

What does this output?

```js
const user = {
  name: "Ahmad",

  greet() {
    const arrow = () => {
      console.log(this.name);
    };

    arrow();
  }
};

user.greet();
```

Answer:

```text
Ahmad
```

Because:

```text
user.greet()
     ↓
this = user
     ↓
arrow inherits this
     ↓
this = user
```

---

# 10. Now the tricky one

```js
const user = {
  name: "Ahmad",

  greet() {
    const arrow = () => {
      console.log(this.name);
    };

    const boundArrow = arrow.bind({
      name: "Ali"
    });

    boundArrow();
  }
};

user.greet();
```

What does it print?

**Ahmad.**

Why?

Because `arrow` already gets its `this` lexically from `greet()`.

`bind()` cannot replace it.

---

# The complete mental model

At this point you should think of functions in three categories:

```text
NORMAL FUNCTION
     │
     └── this determined by how it's called
             │
             ├── call()
             ├── apply()
             └── bind()

ARROW FUNCTION
     │
     └── this inherited lexically
             │
             └── call/apply/bind cannot change it

BOUND FUNCTION
     │
     └── normal this-binding attempts can't override it
             │
             └── new has special constructor behavior
```

---

# Final Challenge for This Lesson 🔥

Predict each one.

### A

```js
const obj = {
  name: "Ahmad",

  normal() {
    console.log(this.name);
  },

  arrow: () => {
    console.log(this.name);
  }
};

obj.normal();
obj.arrow();
```

What happens to each?

---

### B

```js
const obj = {
  name: "Ahmad",

  normal() {
    const arrow = () => {
      console.log(this.name);
    };

    arrow();
  }
};

obj.normal();
```

---

### C

```js
const obj = {
  name: "Ahmad",

  normal() {
    const arrow = () => {
      console.log(this.name);
    };

    arrow.bind({
      name: "Ali"
    })();
  }
};

obj.normal();
```

---

### D - Explain, don't just give output

Why does this work:

```js
function greet() {
  console.log(this.name);
}

greet.bind(obj)();
```

but this doesn't change the `this`:

```js
const greet = () => {
  console.log(this.name);
};

greet.bind(obj)();
```

Once you answer these, we'll go into the **final boss: implementing `Function.prototype.myBind()` properly**, including partial arguments, `this`, and `new`.

## Prompt:
8/29/2026, 2:01:59 PM

next

## Response:
8/29/2026, 2:02:01 PM

# Lesson 7 — Build `bind()` Yourself

Now we're at the point where you stop **using** `bind()` and start understanding how it works internally.

We'll build it in stages.

---

## 1. First, forget `bind()`

Suppose we have:

```js
function greet(message) {
  console.log(message, this.name);
}

const user = {
  name: "Ahmad"
};
```

Normally:

```js
greet();
```

doesn't give us `this = user`.

But we can manually do:

```js
greet.call(user, "Hello");
```

So our first idea for `myBind()` could be:

```js
Function.prototype.myBind = function (obj) {
  const originalFunction = this;

  return function () {
    originalFunction.call(obj);
  };
};
```

Now:

```js
const bound = greet.myBind(user);

bound();
```

But we've forgotten the `"Hello"` argument.

---

# 2. Add arguments

We want:

```js
const bound = greet.myBind(user, "Hello");

bound();
```

So:

```js
Function.prototype.myBind = function (obj, ...boundArgs) {
  const originalFunction = this;

  return function (...laterArgs) {
    return originalFunction.call(
      obj,
      ...boundArgs,
      ...laterArgs
    );
  };
};
```

Now:

```js
const bound = greet.myBind(user, "Hello");

bound();
```

Conceptually becomes:

```js
greet.call(user, "Hello");
```

---

# 3. Understand `this` inside `myBind`

This line is extremely important:

```js
const originalFunction = this;
```

If we do:

```js
greet.myBind(user);
```

what is `this` inside `myBind`?

It's:

```text
greet
```

Because:

```text
greet.myBind(...)
     ↑
   caller
```

So:

```js
this === greet
```

This is another example of the normal `this` calling rule.

---

# 4. Understand the two sets of arguments

Look at:

```js
function add(a, b, c) {
  return a + b + c;
}

const fn = add.myBind(null, 10, 20);

fn(30);
```

Inside `myBind`:

```text
boundArgs = [10, 20]
```

When `fn(30)` happens:

```text
laterArgs = [30]
```

We combine them:

```text
[10, 20] + [30]
       ↓
[10, 20, 30]
```

Then:

```js
originalFunction.call(
  obj,
  ...boundArgs,
  ...laterArgs
);
```

becomes:

```js
add.call(null, 10, 20, 30);
```

Result:

```text
60
```

---

# 5. Our first `myBind()` is pretty good

```js
Function.prototype.myBind = function (obj, ...boundArgs) {
  const originalFunction = this;

  return function (...laterArgs) {
    return originalFunction.call(
      obj,
      ...boundArgs,
      ...laterArgs
    );
  };
};
```

It supports:

```text
✓ this
✓ bound arguments
✓ later arguments
✓ returns a new function
✓ delayed execution
```

But it has a major problem.

---

# 6. The `new` problem

Remember:

```js
function Person(name) {
  this.name = name;
}
```

Native `bind()` allows:

```js
const BoundPerson = Person.bind(null, "Ahmad");

const person = new BoundPerson();

console.log(person.name);
```

to work.

But our implementation:

```js
const BoundPerson = Person.myBind(null, "Ahmad");

const person = new BoundPerson();
```

doesn't behave correctly.

Why?

Because our returned function always does:

```js
originalFunction.call(obj, ...)
```

So we're forcing:

```text
this = obj
```

even when `new` is being used.

But native `bind()` has special constructor behavior.

---

# 7. Detect whether the bound function was called with `new`

Inside our returned function:

```js
return function (...laterArgs) {
```

we can check:

```js
this instanceof returnedFunction
```

A cleaner modern approach is:

```js
new.target
```

When a function is called normally:

```js
fn();
```

then:

```js
new.target === undefined
```

But:

```js
new fn();
```

means:

```js
new.target === fn
```

So we can distinguish:

```text
fn()
 ↓
normal call

new fn()
 ↓
constructor call
```

---

# 8. Constructor behavior

Our goal is:

```js
function Person(name) {
  this.name = name;
}

const BoundPerson = Person.myBind(null, "Ahmad");

const person = new BoundPerson();
```

When `new BoundPerson()` happens, we want:

```text
new object
   ↓
this = new object
   ↓
Person("Ahmad")
```

NOT:

```text
this = null
```

---

# 9. The advanced implementation

A simplified implementation can look like:

```js
Function.prototype.myBind = function (thisArg, ...boundArgs) {
  const originalFunction = this;

  function boundFunction(...laterArgs) {
    const args = [...boundArgs, ...laterArgs];

    if (new.target) {
      return new originalFunction(...args);
    }

    return originalFunction.apply(thisArg, args);
  }

  return boundFunction;
};
```

Now we support:

```text
✓ normal calls
✓ this binding
✓ partial arguments
✓ later arguments
✓ new
```

There are still subtleties around prototypes and constructor return behavior, but this gives you the core mechanics.

---

# 10. The ultimate mental model

Native:

```js
const fn = original.bind(obj, 10);
```

creates a special function that remembers:

```text
┌────────────────────────────┐
│       bound function       │
├────────────────────────────┤
│ target: original           │
│ bound this: obj            │
│ bound args: [10]           │
└────────────────────────────┘
```

Then:

```js
fn(20);
```

means conceptually:

```text
target:
original

this:
obj

arguments:
10, 20
```

But:

```js
new fn(20);
```

means:

```text
create new object
       ↓
this = new object
       ↓
original(10, 20)
```

That's the deepest useful mental model for `bind()`.

---

# Final Boss — Predict These

Don't run them.

### 1

```js
function Person(name) {
  this.name = name;
}

const Bound = Person.bind(null, "Ahmad");

const p = new Bound();

console.log(p.name);
```

---

### 2

```js
function Person(name) {
  this.name = name;
}

const obj = {
  name: "Ali"
};

const Bound = Person.bind(obj, "Ahmad");

const p = new Bound();

console.log(p.name);
console.log(obj.name);
```

---

### 3 — Hard

```js
function add(a, b, c) {
  return a + b + c;
}

const fn1 = add.bind(null, 10);
const fn2 = fn1.bind(null, 20);

console.log(fn2(30));
```

---

### 4 — Very hard

```js
function Person(name) {
  this.name = name;
}

const Bound = Person.bind(null, "Ahmad");

const p = new Bound();

console.log(p instanceof Person);
console.log(p instanceof Bound);
```

---

### 5 — Interview question

Explain this:

```js
const bound = fn.bind(obj);

bound.call(otherObj);
```

Why does `obj` win over `otherObj`?

And then explain why this is different:

```js
const bound = fn.bind(obj);

const result = new bound();
```

Once you can answer those, **you've basically mastered the mechanics of `bind()`**. The next step is learning the practical patterns where you'll actually encounter it in real JavaScript and React.

## Prompt:
8/29/2026, 2:02:36 PM

next

## Response:
8/29/2026, 2:02:38 PM

Good. Now let's move from **"how `bind()` works"** to **"when and why you'd actually use it."**

# Lesson 8 — Real-World `bind()` Patterns

You've learned:

- `this`
- `call()`
- `apply()`
- `bind()`
- bound arguments
- rebinding
- arrows
- `new`
- implementing `myBind()`

Now let's connect it to real JavaScript.

---

## 1. The classic callback problem

Consider:

```js
const user = {
  name: "Ahmad",

  greet() {
    console.log(`Hello ${this.name}`);
  }
};
```

This works:

```js
user.greet();
```

But this doesn't preserve the object relationship:

```js
const callback = user.greet;

setTimeout(callback, 1000);
```

Why?

Because `setTimeout` eventually does something conceptually like:

```js
callback();
```

not:

```js
user.greet();
```

Therefore the original receiver isn't there.

### Fix

```js
setTimeout(user.greet.bind(user), 1000);
```

Now:

```text
setTimeout
    ↓
calls callback()
    ↓
bound function
    ↓
this = user
    ↓
greet()
```

This is probably the most important practical use of `bind()`.

---

# 2. Event handlers

Imagine:

```js
const counter = {
  count: 0,

  increment() {
    this.count++;
    console.log(this.count);
  }
};
```

Suppose an event system receives:

```js
button.addEventListener("click", counter.increment);
```

The event system controls how the callback is called.

So the callback's `this` may not be your `counter`.

You can explicitly bind it:

```js
button.addEventListener(
  "click",
  counter.increment.bind(counter)
);
```

Now the callback remembers:

```text
this → counter
```

---

# 3. Class methods

This is especially important for understanding older JavaScript and React code.

```js
class Counter {
  constructor() {
    this.count = 0;

    this.increment = this.increment.bind(this);
  }

  increment() {
    this.count++;
  }
}
```

Why?

Because later:

```js
button.addEventListener("click", counter.increment);
```

would otherwise detach the method from its instance.

Binding in the constructor gives:

```text
counter.increment
       ↓
bound function
       ↓
this = counter
```

---

# 4. Why modern React uses it less

Older React class components commonly had:

```js
class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this);
  }
}
```

Modern React usually uses function components:

```js
function Counter() {
  const handleClick = () => {
    // ...
  };

  return <button onClick={handleClick}>Click</button>;
}
```

So you don't normally see:

```js
handleClick.bind(this)
```

in modern functional React.

But understanding `bind()` is still valuable because:

- older React code uses it
- JavaScript classes use it
- callback APIs use it
- libraries may require it
- interviews ask about it
- understanding it improves your understanding of `this`

---

# 5. Partial application in real code

Remember:

```js
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);

double(10); // 20
double(20); // 40
double(50); // 100
```

You created a specialized function:

```text
multiply
   ↓
bind first argument = 2
   ↓
double
```

This is useful when you repeatedly use the same configuration.

For example:

```js
function log(level, message) {
  console.log(`[${level}] ${message}`);
}

const logError = log.bind(null, "ERROR");
const logInfo = log.bind(null, "INFO");

logError("Database failed");
logInfo("Server started");
```

Conceptually:

```text
logError(message)
    ↓
log("ERROR", message)

logInfo(message)
    ↓
log("INFO", message)
```

---

# 6. A subtle point: `bind()` doesn't "copy" the object

This:

```js
const bound = greet.bind(user);
```

doesn't create a copy of `user`.

It remembers the **reference**.

So:

```js
const user = {
  name: "Ahmad"
};

function greet() {
  console.log(this.name);
}

const bound = greet.bind(user);

user.name = "Ali";

bound();
```

Output:

```text
Ali
```

Why?

Because:

```text
bound
 ↓
references same user object
```

It isn't:

```text
bound
 ↓
copy of user from when bind() was called
```

This is an important JavaScript reference/value concept.

---

# 7. `bind()` doesn't freeze the object

For example:

```js
const user = {
  name: "Ahmad"
};

const greet = function () {
  console.log(this.name);
}.bind(user);
```

Now:

```js
user.name = "Ali";
```

Then:

```js
greet();
```

prints:

```text
Ali
```

`bind()` fixed **which object** is `this`.

It did not freeze the object's properties.

---

# 8. Another important pattern

Suppose:

```js
const user = {
  name: "Ahmad",

  greet() {
    console.log(this.name);
  }
};
```

You can create:

```js
const greetUser = user.greet.bind(user);
```

Now you can pass it anywhere:

```js
setTimeout(greetUser, 1000);

someFunction(greetUser);

button.addEventListener("click", greetUser);
```

All those systems can call:

```js
greetUser();
```

and the function still knows:

```text
this → user
```

That's the real power of binding.

---

# 9. But don't overuse `bind()`

You don't need:

```js
const fn = someFunction.bind(obj);
```

everywhere.

If you control the callback and can use an arrow that naturally captures the desired `this`, sometimes:

```js
const fn = () => obj.method();
```

is clearer.

And if you don't need `this` at all, don't introduce it unnecessarily.

Good JavaScript isn't about using `bind()` everywhere.

It's about understanding **when a function needs a stable `this`**.

---

# Final Test — Real-World Scenarios

Tell me whether you'd use **`bind()`**, an **arrow function**, or **neither**, and explain why.

### A

```js
const user = {
  name: "Ahmad",

  greet() {
    console.log(this.name);
  }
};

setTimeout(__________, 1000);
```

You need `greet` to retain `user` as `this`.

---

### B

```js
function add(a, b) {
  return a + b;
}

const add10 = __________;
```

You want:

```js
add10(5); // 15
add10(20); // 30
```

---

### C

```js
const user = {
  name: "Ahmad",

  greet() {
    setTimeout(__________, 1000);
  }
};
```

Inside `greet`, you want the callback to use the same `this` as `greet`.

---

### D — Important

Would this be a good use of `bind()`?

```js
function add(a, b) {
  return a + b;
}

const result = add.bind(null, 10, 20);
```

Why or why not?

---

### E — Interview level

Explain this in your own words:

> **`bind()` is useful when a function will be called later by something else, but you need that function to retain a particular `this` value.**

After this, we'll do the **final mastery stage: tricky `bind()` interview problems and implementing a much more complete `myBind()`**, including constructor/prototype behavior.

## Prompt:
8/29/2026, 2:03:10 PM

next

## Response:
8/29/2026, 2:03:13 PM

# Lesson 9 — `bind()` Interview Traps

Now we're going to stop learning new syntax and start training your brain to **predict `this`**.

These are the kinds of questions that expose whether someone actually understands `bind()`.

---

## Trap 1 — `bind()` doesn't change the original function

```js
const user = {
  name: "Ahmad"
};

function greet() {
  console.log(this.name);
}

const bound = greet.bind(user);

console.log(greet === bound);
```

Output:

```text
false
```

Why?

```text
greet
 ↓ bind(user)
bound
```

`bound` is a **new function**.

---

# Trap 2 — Calling `bind()` doesn't execute

```js
const bound = greet.bind(user);

console.log("A");

bound();

console.log("B");
```

Output:

```text
A
Ahmad
B
```

Not:

```text
Ahmad
A
B
```

Because:

```js
greet.bind(user)
```

only creates the bound function.

---

# Trap 3 — `call()` can't override `bind()`

```js
const a = {
  name: "Ahmad"
};

const b = {
  name: "Ali"
};

function greet() {
  console.log(this.name);
}

const fn = greet.bind(a);

fn.call(b);
```

Output:

```text
Ahmad
```

Remember:

```text
bind(a)
   ↓
this = a
```

Then:

```text
call(b)
```

tries to change it, but can't.

---

# Trap 4 — `apply()` can't override either

```js
fn.apply(b);
```

Still:

```text
Ahmad
```

And:

```js
const fn2 = fn.bind(b);

fn2();
```

Still:

```text
Ahmad
```

So:

```text
bound this
    ↓
call      ❌ override
apply     ❌ override
bind      ❌ override
new       ✅ special case
```

---

# Trap 5 — Arrow functions

```js
const a = {
  name: "Ahmad"
};

const fn = () => {
  console.log(this.name);
};

const bound = fn.bind(a);

bound();
```

`bind()` doesn't change the arrow's `this`.

Why?

Because arrow functions use **lexical `this`**.

---

# Trap 6 — Object method vs detached method

This is extremely common:

```js
const user = {
  name: "Ahmad",

  greet() {
    console.log(this.name);
  }
};

user.greet();
```

→ Ahmad

But:

```js
const greet = user.greet;

greet();
```

doesn't retain `user`.

Fix:

```js
const greet = user.greet.bind(user);
```

Now:

```js
greet();
```

→ Ahmad

---

# Trap 7 — `bind()` only remembers the object reference

This is subtle.

```js
const user = {
  name: "Ahmad"
};

function greet() {
  console.log(this.name);
}

const fn = greet.bind(user);

user.name = "Ali";

fn();
```

Output:

```text
Ali
```

Why?

Because:

```text
fn
 ↓
reference → user
```

It doesn't save:

```text
name = "Ahmad"
```

It saves the object reference.

---

# Trap 8 — Bound arguments

```js
function greet(greeting, name) {
  console.log(greeting, name);
}

const hello = greet.bind(null, "Hello");

hello("Ahmad");
hello("Ali");
```

Output:

```text
Hello Ahmad
Hello Ali
```

The first argument is permanently pre-filled.

---

# Trap 9 — Arguments accumulate

```js
function add(a, b, c) {
  return a + b + c;
}

const f1 = add.bind(null, 10);
const f2 = f1.bind(null, 20);

console.log(f2(30));
```

Result:

```text
60
```

Think:

```text
f1
 ↓
a = 10

f2
 ↓
b = 20

f2(30)
 ↓
c = 30
```

---

# Trap 10 — `new` breaks the normal `this` rule

This is the advanced one.

```js
function Person(name) {
  this.name = name;
}

const user = {
  name: "Ali"
};

const BoundPerson = Person.bind(user, "Ahmad");

const person = new BoundPerson();

console.log(person.name);
console.log(user.name);
```

Output:

```text
Ahmad
Ali
```

Why?

Because `new` creates a new object and makes **that object** the `this`.

The bound `user` isn't used as `this`.

But `"Ahmad"` is still a bound argument.

So:

```text
BoundPerson
 │
 ├── bound argument → "Ahmad"
 │
 └── bound this → user
```

Then:

```text
new BoundPerson()
```

causes:

```text
bound this → ignored
new object → this
bound argument → still used
```

That's an excellent interview answer.

---

# Now let's do the final mastery challenge

Don't execute these. **Predict them.**

## Question 1

```js
const a = {
  name: "Ahmad"
};

const b = {
  name: "Ali"
};

function greet() {
  console.log(this.name);
}

const f1 = greet.bind(a);
const f2 = f1.bind(b);

f2.call(b);
```

Output?

---

## Question 2

```js
function add(a, b, c, d) {
  return a + b + c + d;
}

const f1 = add.bind(null, 1, 2);
const f2 = f1.bind(null, 3);

console.log(f2(4));
```

Output?

---

## Question 3

```js
function Person(name) {
  this.name = name;
}

const a = {
  name: "Ali"
};

const Bound = Person.bind(a, "Ahmad");

const p = new Bound();

console.log(p.name);
console.log(a.name);
```

Both outputs?

---

## Question 4 — Brain burner

```js
const obj = {
  name: "Ahmad",

  method() {
    const normal = function () {
      console.log(this.name);
    };

    const arrow = () => {
      console.log(this.name);
    };

    normal.call(this);
    arrow.call({
      name: "Ali"
    });
  }
};

obj.method();
```

What are the two outputs?

And explain **why `call()` behaves differently for `normal` and `arrow`**.

---

## Question 5 — Final interview question

Without using the words "it binds `this`":

**Explain what `bind()` actually does.**

Try to explain it as if an interviewer asked:

> "What is JavaScript's `bind()` method and when would you use it?"

Once you answer these, we'll finish with a **real `Function.prototype.myBind()` implementation**, including the constructor/prototype details that separate beginner understanding from deep JavaScript understanding.



---
