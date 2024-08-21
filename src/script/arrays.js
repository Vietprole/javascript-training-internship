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