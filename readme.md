1) What is the difference between var, let, and const?
Ans: var is function-scoped and it can be redeclared and updated, also supports hoisting.
let is block-scoped. It can be updated but not redeclared in the same scope.
const is also block-scoped but must be assigned at declaration, can't be reassigned.
2) What is the difference between map(), forEach(), and filter()?
Ans: map() returns a new array with transformed elements.
forEach() usually loops through items but gives no return (undefined).
filter() is used for returning a new array with elements passing through a condition.
3) What are arrow functions in ES6?
Ans: Arrow functions in ES6 are a shorter syntax for writing functions using =>. An example is here:
const add = (a, b) => a+b;
console.log(add(3,5));  
4) How does destructuring assignment work in ES6?
Ans: Destructuring assignment in ES6 allows us to extract values from arrays or objects and assign them to variables in a concise way. 
5) Explain template literals in ES6. How are they different from string concatenation?
Ans: Template literals in ES6 are string literals that allow embedded expressions, multi-line strings, and string interpolation using backticks (`) instead of quotes.
The differences are:
We can embed variables or expressions directly using ${} instead of using +
Template literals supports multi-line strings easily.
A better readability comes from Template literals. 