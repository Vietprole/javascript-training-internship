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
console.log(demoClass[0])

// Assign image element
const img = document.querySelector('img')

console.log(img.hasAttribute('src'))    // returns true
console.log(img.getAttribute('src'))    // returns "...shark.png"
// Type in console
// img.removeAttribute('src')            // remove the src attribute and value
// img.setAttribute('src', 'https://images.unsplash.com/photo-1529673203658-56306382b724?auto=format&fit=crop&w=1000&q=80&ar=16:9') // set the src attribute and value

// Select the first div
const div = document.querySelector('div');

// Assign the warning class to the first div
div.className = 'warning';

// Select the 'active' div by class name
const activeDiv = document.querySelector('.active');

// Type in console
// activeDiv.classList.add('hidden');                // Add the hidden class
// activeDiv.classList.remove('hidden');             // Remove the hidden class
// activeDiv.classList.toggle('hidden');             // Switch between hidden true and false
// activeDiv.classList.replace('active', 'warning'); // Replace active class with warning class

// Select 'style-modify' div
const div1 = document.querySelector('.style-modify');

// Apply style to div
div1.setAttribute('style', 'text-align: center');
// Using style attribute directly
div1.style.height = '100px';
div1.style.width = '100px';
div1.style.border = '2px solid black';

// Make div into a circle and vertically center the text
div1.style.borderRadius = '50%';
div1.style.display = 'flex';
div1.style.justifyContent = 'center';
div1.style.alignItems = 'center';