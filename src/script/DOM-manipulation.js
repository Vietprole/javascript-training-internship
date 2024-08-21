//* Selecting elements
// Select the demo-id div
const demoId = document.querySelector('#demo-id')
demoId.textContent = 'Demo ID text updated.'

// Select the demo-class div
const demoClass = document.querySelectorAll('.demo-class')
demoClass.forEach((element => {
    element.textContent = 'All demo classes text updated.'
}))

// Select the demo-tag div
demoClass[0]