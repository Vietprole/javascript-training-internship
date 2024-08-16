//* Variables
let a = 1
//! let a = 2 // SyntaxError: Identifier 'a' has already been declared
let i = 0
let b = 2
//* Expressions
// Primitive expressions
2
0.02
;('something')
true
false
this // the current scope
undefined
i // where i is a variable or a constant
// Arithmetic expressions
1 / 2
i++
i -= 2
i * 2
// String expressions
'A' + 'string'
// Logical expressions
a && b
a || b
!a
//* Operators
console.log(a + b) // 3
console.log(20 / 5) // 4
console.log(20 / 7) // 2.857142857142857
console.log(1 / 0) // Infinity
console.log(-1 / 0) // -Infinity
console.log(20 % 5) // 0
console.log(20 % 7) // 6
console.log(1 % 0) // NaN
console.log(-1 % 0) // NaN
//* Conditionals
if (a === 1) {
  console.log('a is 1') //when let a = 1
} else if (a === 2) {
  console.log('a is 2') //when let a = 2
} else {
  console.log('a is neither 1 nor 2') //when let a = 3
}
//* Strings
// String literals
'A string'
"Another string"
// String assignment
let string = 'A string'
// String length
'A string'.length // 8
string.length // 8
''.length // 0
// String concatenation
'A ' + 'string' // 'A string'
// String interpolation
'This is ' + string // 'This is A string'
// Multiline strings using template literals
console.log(
`Hey
this

string
is	awesome!`)
// The ${} syntax
let name = 'John'
console.log(`This is ${name}, he is ${4 * 5} years old.`) // This is John, he is 20 years old.
//* Arrays
// Array initialization
const arr = [] // Using array literal
const arr1 = Array() // Using the array built-in function
const arr2 = [1, 2, 3] // Pre-fill array
const arr3 = Array.of(1, 2, 3) // Using the Array.of() function
const arr4 = [1, 'string', true, ['a', 2, 3]] // Mixed array
const arr5 = Array(12).fill(0) // Initialize array with 12 zeros
// Multi-dimensional arrays
const matrix = [
  [1, 2, 3], 
  [4, 5, 6], 
  [7, 8, 9]
]
// Accessing array elements
console.log(arr2[0]) // 1
console.log(matrix[0][1]) // 2
// Array length
console.log(arr2.length) // 3
arr2.length = 4 // Set the length of the array
console.log(arr2) // [1, 2, 3, undefined]
arr2.length = 2 // Truncate the array
console.log(arr2) // [1, 2]
// Adding items to an array
arr2.push(3) // Add 3 to the end of the array
arr2.unshift(-1, 0) // Add -1, 0 to the beginning of the array
console.log(arr2) // [-1, 0, 1, 2, 3]
// Removing items from an array
arr2.pop() // Remove the last element
arr2.shift() // Remove the first element
console.log(arr2) // [0, 1, 2]
// Joining arrays
const arr6 = [3, 4, 5]
const arr7 = arr2.concat(arr6) // [0, 1, 2, 3, 4, 5]
const arr8 = [...arr2, ...arr6] // Using the spread operator
// Find an item in an array
const foundItem = arr8.find((element, index, array) => {
  console.log(`Element: ${element}, Index: ${index}, Array: ${array}`);
  return element > 3;
});
console.log(foundItem); // 4
const foundIndex = arr8.findIndex((element, index, array) => {
  console.log(`Element: ${element}, Index: ${index}, Array: ${array}`);
  return element > 3;
});
console.log(foundIndex); // 3
console.log(arr8.includes(4)) // true
console.log(arr8.includes(4, 5)) // find from index 5 to the end
//* Loops
// while
i = 0
while (i < 5) {
  console.log(i)
  i++
}// 0 1 2 3 4
i = 0
while (i < 5) {
  console.log(i)
  i++
  if (i === 4) break // Use break to end the loop early
}// 0 1 2 3
i = 0
while (i < 5) {
  if (i === 3){
    i++
    continue // Use continue to skip the current iteration
  } 
  console.log(i)
  i++
}// 0 1 2 4
i = 0
// do...while, condition is checked after one iteration
do {
  console.log(i)
  i++
} while (i < 5)// 0 1 2 3 4
// so the do...while loop will always run at least once
// for
for (let i = 0; i < 5; i++) {
  console.log(i)
}// 0 1 2 3 4
// for of
for (let item of arr8) {
  console.log(item)
}// 0 1 2 3 4 5