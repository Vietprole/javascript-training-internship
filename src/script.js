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
;('A string')
;('Another string')
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
  [7, 8, 9],
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
  console.log(`Element: ${element}, Index: ${index}, Array: ${array}`)
  return element > 3
})
console.log(foundItem) // 4
const foundIndex = arr8.findIndex((element, index, array) => {
  console.log(`Element: ${element}, Index: ${index}, Array: ${array}`)
  return element > 3
})
console.log(foundIndex) // 3
console.log(arr8.includes(4)) // true
console.log(arr8.includes(4, 5)) // find from index 5 to the end

//* Loops
// while
i = 0
while (i < 5) {
  console.log(i)
  i++
} // 0 1 2 3 4
i = 0
while (i < 5) {
  console.log(i)
  i++
  if (i === 4) break // Use break to end the loop early
} // 0 1 2 3
i = 0
while (i < 5) {
  if (i === 3) {
    i++
    continue // Use continue to skip the current iteration
  }
  console.log(i)
  i++
} // 0 1 2 4
i = 0
// do...while, condition is checked after one iteration
do {
  console.log(i)
  i++
} while (i < 5) // 0 1 2 3 4
// so the do...while loop will always run at least once
// for
for (let i = 0; i < 5; i++) {
  console.log(i)
} // 0 1 2 3 4
// for of
for (let item of arr8) {
  console.log(item)
} // 0 1 2 3 4 5
let user4 = {
  name: 'John',
  age: 30,
  isAdmin: true,
}
for (let key in user4) {
  console.log(key, user4[key])
} // name John, age 30, isAdmin true

//* Functions
// Function declaration
function doSomething(
  Parameter1 = 'default value 1',
  Parameter2 = 'default value 2'
) {
  // Do something
  return 'hi!'
}
// Function call
doSomething('Value 1', 2)
// Assign return value
let result = doSomething()
console.log(result) // hi!
// Nested functions
function outerFunction() {
  function innerFunction() {
    console.log('Inner function')
  }
  innerFunction()
}
// Assign functions to variables
let getData = function () {
  //...
}
getData()
// Arrow functions
let getData1 = () => {
  //...
}
getData1()
// Arrow functions with single line
let getData2 = () => console.log('hi!')
// Arrow functions with one parameter
let getData3 = (param) => console.log(param)
// Arrow functions with implicit return
let getData4 = () => 'hi!'

//* Objects
// Object initialization
const user = {
  name: "John",
  age: 30
} // Using object literal
const obj1 = new Object() // Using the object built-in function
const obj2 = Object.create(null) // Using the Object.create() function
// Function as object constructor
function Car(brand, model) {
  this.brand = brand
  this.model = model
}

let myCar = new Car('Ford', 'Fiesta')
console.log(myCar.brand) // Ford
// Primitive types are passed by value
let age = 36
let myAge = age
myAge = 37
console.log(age) // 36
// Objects are passed by reference
const car = {
  color: 'blue',
}
const anotherCar = car
anotherCar.color = 'yellow'
console.log(car.color) // yellow

//* Object properties
// Define properties
const car1 = {
  color: 'blue',
  'the color': 'bluey', // Use quotes for special characters property names
  brand: {
    name: 'Ford',
  },
}
// Property value shorthand
function makeUser(name, age){
  return {
    name, // same as name: name
    age // same as age: age
  }
}
let user1 = makeUser('John', 30)
console.log(user1.name) // John

let username = 'Doe'
let user2 = {
  username, // same as name: name
  age: 30
}
console.log(user2.username) // Doe
// Property names limitation
let obj = {
  for: 1,
  let: 2,
  return: 3,
}
console.log(obj.for + obj.let + obj.return) // 6

obj = {
  0: 'test', // same as '0': 'test'
}// number name is converted to string
console.log(obj[0]) // test
console.log(obj['0']) // test

obj = {}
obj.__proto__ = 5 // __proto__ is a special property name, it must be an object
console.log(obj.__proto__) // [object Object]

// Access properties
console.log(car1.color) // blue
console.log(car1['the color']) // bluey
let key = "color"
console.log(car1[key]) // blue
console.log(car1.name) // undefined
console.log(car1.brand.name) // Ford
console.log(car1['brand']['name']) // Ford
// Modify properties
car1.color = 'yellow'
car1['the color'] = 'yellowy'
console.log(car1.color) // yellow
console.log(car1['the color']) // yellowy
// Add properties
car1.model = 'Fiesta'
console.log(car1.model) // Fiesta
// Delete properties
delete car1.model
console.log(car1.model) // undefined
//Computed property names
let fruit = prompt("Which fruit to buy?", "apple")
let bag = {
  [fruit]: 5, // the name of the property is taken from the variable fruit
}
alert(bag[fruit]) // 5

fruit = 'apple'
bag = {
  ['a_bunch_of_' + fruit]: 52,
}
console.log(bag.a_bunch_of_apple) // 52
// Property existence
let user3 = {}
console.log(user3.noSuchProperty === undefined) // true
// non-existing property & property value: undefined returns undefined
console.log('age' in user) // true
console.log('name' in user) // true
key = 'age'
console.log(key in user) // true
// Object methods
const car2 = {
  brand: 'Ford',
  model: 'Fiesta',
  start: function () {
    console.log(`Started ${this.brand} ${this.model}`)
  },
}
car2.start() // Started Ford Fiesta

// Arrow function are not bound to the object
const car3 = {
  brand: 'Ford',
  model: 'Fiesta',
  start: () => {
    console.log(`Started ${this.brand} ${this.model}`) //not going to work
  },
}
car3.start() // Started undefined undefined

// Object order when looping
let codes = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  // ..,
  "1": "USA",
  z: "this is z",
  a: "this is a"
};

for (let code in codes) {
  console.log(code); // 1, 41, 44, 49, z, a
}// integer properties are sorted, others appear in creation order
//* Classes
class Person {
  constructor(name) {
    this.name = name
  }
  hello() {
    return 'Hello, I am ' + this.name + '.'
  }
}
const flavio = new Person('flavio')
console.log(flavio.hello()) //'Hello, I am flavio.'
// Static methods
class Person1 {
  static genericHello() {
    return 'Hello'
  }
}
Person1.genericHello() //Hello
// Inheritance
class Person2 {
  hello() {
    return 'Hello, I am a Person'
  }
}

class Programmer extends Person2 {
  hello() {
    return super.hello() + '. I am also a programmer.'
  }
}
const flavio1 = new Programmer()
console.log(flavio1.hello())
// Async programming & Callbacks
function fetchData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: 'John Doe' }
    callback(data)
  }, 5000)
}

fetchData((data) => {
  console.log('Data received:', data)
})
console.log('Fetching data...Data will arrive in 5 seconds')

// Promise
const error = false
const promise = new Promise((resolve, reject) => {
  if (!error) {
    setTimeout(() => resolve('Resolving an asynchronous request!'), 2000)
  } else {
    reject('An error occurred!')
  }
})

// Log the result
promise
  .then((firstResponse) => {
    // Return a new value for the next then
    return firstResponse + ' And chaining!'
  })
  .then((secondResponse) => {
    console.log(secondResponse)
  })
  .catch((error) => {
    console.error(error)
  })

// Async/Await
function getUser() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('John Doe'), 2000)
  })
}

async function getUserName() {
  const user = await getUser()
  console.log(user)
}

getUserName()
console.log('Fetching user name...')

//* Variables scope
// Global scope
var globalVar = 'I am a global var variable'
let globalLet = 'I am a global let variable'
const globalConst = 'I am a global const variable'

// Function scope
function myFunction() {
  console.log(globalVar) // I am a global var variable
  console.log(globalLet) // I am a global let variable
  console.log(globalConst) // I am a global const variable
  //You can log the functionVar before it is declared
  console.log(functionVar) // undefined
  if (true) {
    var functionVar = 'I am a function var variable'
    let functionLet = 'I am a function let variable'
    const functionConst = 'I am a function const variable'
  }
  console.log(functionVar) // I am a function var variable
  // console.log(functionLet) // ReferenceError: functionLet is not defined
  // console.log(functionConst) // ReferenceError: functionConst is not defined
}
myFunction()