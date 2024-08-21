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