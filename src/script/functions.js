//* Functions
// Function declaration
function doSomething(
  Parameter1 = 'default value 1',
  Parameter2 = 'default value 2',
  Parameter3
) {
  // Do something
  return Parameter3
  console.log('This will not be executed')
}
// Function call
doSomething('Argument1', 2)
// Assign return value
let result = doSomething() // Argument3 is not passed, no default value, so it is undefined
console.log(result) // undefined
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

//* Function expression
sayHello() // Hello!
//sayHi() // ReferenceError: Cannot access 'sayHi' before initialization

let sayHi = function() {
  console.log('Hi!')
}// Create function using Function expression

function sayHello() {
  console.log('Hello!')
}// Create function using Function declaration

// Function is a value
console.log( sayHi ) // f sayHi(){return 'Hi!'}
// Assign function to a variable
let func = sayHi
func() // Hi!
sayHi() // Hi!





