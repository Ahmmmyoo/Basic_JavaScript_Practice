// How does JS execute code + call stack

function printNotes() {console.log(`
  🔹 **How JavaScript Executes Code + Call Stack**
  
  ### 🟢 1. JavaScript Execution Context
  JavaScript runs code in an **Execution Context**, which consists of:
     - **1️⃣ Memory (Variable Environment)** → Stores variables & function references.
     - **2️⃣ Code Execution (Thread of Execution)** → Runs the code line by line.
  
  **📝 JS has 3 types of Execution Contexts:**
     - **Global Execution Context (GEC)** → Created by default when JS runs.
     - **Function Execution Context (FEC)** → Created whenever a function is called.
     - **Eval Execution Context** → Created when 'eval()' function runs (rarely used).
  
  ---
  
  ### 🟢 2. Execution Phases in JavaScript
  Every **Execution Context** goes through two phases:
  
  🔹 **1️⃣ Creation Phase (Memory Allocation)**
     - JS scans the code **before execution**.
     - Stores **function declarations** in memory.
     - Variables are allocated **but set to 'undefined'** (due to hoisting).
  
  🔹 **2️⃣ Execution Phase (Code Execution)**
     - Runs code **line by line** in the order it appears.
     - Assigns values to variables, executes functions, etc.
  
  ---
  
  ### 🟢 3. Call Stack - How JavaScript Manages Execution
  📌 The **Call Stack** is a **LIFO (Last In, First Out)** data structure that keeps track of function calls.
  
  🔹 **How It Works:**
  1️⃣ When the script starts, JS creates a **Global Execution Context** (GEC) and pushes it onto the Call Stack.
  2️⃣ When a function is called, a **Function Execution Context (FEC)** is created and pushed onto the stack.
  3️⃣ When a function finishes execution, it is **popped off the stack**.
  4️⃣ The process continues until the stack is empty.
  
  ---
  
  ### 🟢 4. Example of Call Stack in Action:
  \`\`\`js
  function first() {
    console.log("First function");
    second();
  }
  
  function second() {
    console.log("Second function");
    third();
  }
  
  function third() {
    console.log("Third function");
  }
  
  first(); // Start execution
  \`\`\`
  
  🔹 **Call Stack Operations:** 
  1️⃣ \`Global Execution Context (GEC)\` is created and pushed onto the stack.
  2️⃣ \`first()\` is called → A new **Function Execution Context (FEC)** is pushed onto the stack.
  3️⃣ \`console.log("First function")\` executes.
  4️⃣ \`second()\` is called → **New FEC for second()** is pushed onto the stack.
  5️⃣ \`console.log("Second function")\` executes.
  6️⃣ \`third()\` is called → **New FEC for third()** is pushed onto the stack.
  7️⃣ \`console.log("Third function")\` executes.
  8️⃣ \`third()\` finishes → Its execution context is **popped off the stack**.
  9️⃣ \`second()\` finishes → Its execution context is **popped off the stack**.
  🔟 \`first()\` finishes → Its execution context is **popped off the stack**.
  💨 Stack is empty again → Code execution is complete.
  
  ---
  
  ### 🟢 5. Call Stack Overflow ❌
  Since the **Call Stack has a limit**, **recursive functions without a base case** can cause a **stack overflow** error.
  
  \`\`\`js
  function recursion() {
    recursion(); // Infinite recursion 😱
  }
  
  recursion(); // ❌ Uncaught RangeError: Maximum call stack size exceeded
  \`\`\`
  
  📌 **Fix?** Always include a **base condition** in recursion to avoid infinite calls.
  
  ---
  
  ### 🟢 6. How JavaScript Handles Asynchronous Code
  JS is **single-threaded**, meaning it can only do **one task at a time**. But it can handle async tasks using:
  - **Web APIs** (setTimeout, DOM events, AJAX, etc.)
  - **Callback Queue (Task Queue)**
  - **Event Loop (to move async tasks back into the stack)**
  
  Example of **setTimeout()**:
  \`\`\`js
  console.log("Start");
  
  setTimeout(() => {
    console.log("Inside setTimeout");
  }, 2000);
  
  console.log("End");
  \`\`\`
  🔹 **Execution Order:**
  1️⃣ "Start" is logged.
  2️⃣ \`setTimeout()\` moves the callback function to **Web API**.
  3️⃣ "End" is logged.
  4️⃣ After 2 sec, **Event Loop** moves the callback back to the stack.
  5️⃣ "Inside setTimeout" is logged **after everything else has executed**.
  
  ---
  
  ### 🟢 7. Summary:
  ✅ **JS runs in Execution Contexts (Global & Function).**  
  ✅ **It has a Call Stack to manage function execution.**  
  ✅ **The stack follows LIFO (Last In, First Out).**  
  ✅ **Recursive calls without a base case can cause a Stack Overflow.**  
  ✅ **JS uses Web APIs & Event Loop for async operations.**
  
  🚀 **Understanding the Call Stack helps debug issues and optimize performance!**
  `);
}

// printNotes();

function one() {
  console.log("one");
  two();
}
function two(){
  console.log("two");
  three();
}
function three() {
  console.log("three");
}

one(); // one pOne > two pTwo > three pThree > pop Three > pop Two > pop One
