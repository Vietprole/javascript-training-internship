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
