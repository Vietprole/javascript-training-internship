// Function to modify the text content of the paragraph
const changeText = () => {
	const p = document.querySelector('p');

	p.textContent = "I changed because of an inline event handler.";
}

// Function to modify the text content of the paragraph
const changeText1 = () => {
	const p = document.querySelector('.event-handler-p');

	p.textContent = "I changed because of an event handler property.";
}

// Add event handler as a property of the button element
const button = document.querySelector('.event-handler-btn');
button.onclick = changeText1;

// Function to modify the text content of the paragraph
const changeText2 = () => {
	const p = document.querySelector('.event-listener-p');

	p.textContent = "I changed because of an event listener.";
}

// Listen for click event
const button1 = document.querySelector('.event-listener-btn');
button1.addEventListener('click', changeText2);
button1.addEventListener('click', () => {
    alert('Last button clicked.');
});
// Remove event listener
removeEventListener('click', changeText2);

// Test the key and code properties
document.addEventListener('keydown', event => {
	console.log('key: ' + event.key);
	console.log('code: ' + event.code);
});

// Pass an event through to a listener
document.addEventListener('keydown', event => {
	var element = document.querySelector('.event-object');

	// Set variables for keydown codes
	var a = 'KeyA';
	var s = 'KeyS';
	var d = 'KeyD';
	var w = 'KeyW';

	// Set a direction for each code
	switch (event.code) {
		case a:
			element.textContent = 'Left';
			break;
		case s:
			element.textContent = 'Down';
			break;
		case d:
			element.textContent = 'Right';
			break;
		case w:
			element.textContent = 'Up';
			break;
	}
});

const section = document.querySelector('section');

// Print the selected target
section.addEventListener('click', event => {
	console.log(event.target);
});

// Event capturing and bubbling
const capturingForm = document.querySelector('.capturing');
const capturingDiv = capturingForm.querySelector('div');
const capturingP = capturingDiv.querySelector('p');
capturingForm.addEventListener("click", e => alert(`Capturing: ${capturingForm.tagName}`), true);
capturingForm.addEventListener("click", e => alert(`Bubbling: ${capturingForm.tagName}`));

for(let elem of capturingForm.querySelectorAll('*')) {
    elem.addEventListener("click", e => alert(`Capturing: ${elem.tagName}`), true);
    elem.addEventListener("click", e => alert(`Bubbling: ${elem.tagName}`));
}