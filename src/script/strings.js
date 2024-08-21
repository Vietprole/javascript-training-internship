//* Strings
// String literals
'A string'
'Another string'
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
is	awesome!`
)
// The ${} syntax
let name = 'John'
console.log(`This is ${name}, he is ${4 * 5} years old.`) // This is John, he is 20 years old.
