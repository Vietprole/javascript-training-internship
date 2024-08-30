const name = 'John Doe'
const age = 30

const person = {
  name,
  age,
  notShorthand: 'not a shorthand',
  notShorthand: 'not a shorthand',
}

const good = {
  foo: 3,
  bar: 4,
  'data-blah': 5,
}

// bad
console.log(object.hasOwnProperty(key));

// good
console.log(Object.prototype.hasOwnProperty.call(object, key));

// better
const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
console.log(has.call(object, key));

// best
console.log(Object.hasOwn(object, key)); // only supported in browsers that support ES2022

/* or */
import has from 'has'; // https://www.npmjs.com/package/has
console.log(has(object, key));
/* or */
console.log(Object.hasOwn(object, key)); // https://www.npmjs.com/package/object.hasown

// very bad
const original = { a: 1, b: 2 };
const copy = Object.assign(original, { c: 3 }); // this alo change `original`
delete copy.a; // so does this

// bad
const original1 = { a: 1, b: 2 };
const copy1 = Object.assign({}, original1, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

// good
const original2 = { a: 1, b: 2 };
const copy2 = { ...original2, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

const { a, ...noA } = copy; // noA => { b: 2, c: 3 }

const someStack = [];

// bad
someStack[someStack.length] = 'abracadabra';

// good
someStack.push('abracadabra');
console.log(someStack)

const foo = document.querySelectorAll('.foo');

// good
const nodes = Array.from(foo);

// best
const nodes1 = [...foo];

const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 };
console.log(arrLike); // { '0': 'foo', '1': 'bar', '2': 'baz', length: 3 }
// bad
const arr = Array.prototype.slice.call(arrLike);
console.log(arr); // [ 'foo', 'bar', 'baz' ]
// good
const arr1 = Array.from(arrLike);
console.log(arr1); // [ 'foo', 'bar', 'baz' ]

// bad
const baz = [...foo].map(bar);

// good
const baz1 = Array.from(foo, bar);

const numbers = [1, 2, 3];
// bad
const doubled = numbers.map(num => {
  num * 2; // No return statement, so the result is undefined
});
console.log(doubled); // Output: [undefined, undefined, undefined]
// good
const doubled1 = numbers.map(num => num * 2);
const doubled2 = numbers.map(num => {
  return num * 2;
});
console.log(doubled1); // Output: [2, 4, 6]
console.log(doubled2); // Output: [2, 4, 6]

// bad
const array = [
  [0, 1], [2, 3], [4, 5],
];

const objectInArray = [{
  id: 1,
}, {
  id: 2,
}];

const numberInArray = [
  1, 2,
];

// good
const array1 = [[0, 1], [2, 3], [4, 5]];

const objectInArray1 = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const numberInArray1 = [
  1,
  2,
];

//* Destructuring

// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;

  return `${firstName} ${lastName}`;
}

// good
function getFullName(user) {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
}

// best
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}

const array2 = [1, 2, 3, 4];

// bad
const first1 = array2[0];
const second1 = array2[1];

// good
const [first, second] = arr;

// bad
function processInput(input) {
  // then a miracle occurs
  return [left, right, top, bottom];
}

// the caller needs to think about the order of return data
const [left1, __, top1] = processInput(input);

// good
function processInput(input) {
  // then a miracle occurs
  return { left, right, top, bottom };
}

// the caller selects only the data they need
const { left, top } = processInput(input);

// bad
const name2 = "Capt. Janeway";

// bad - template literals should contain interpolation or newlines
const name3 = `Capt. Janeway`;

// good
const name4 = 'Capt. Janeway';

// bad
const errorMessage1 = 'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.';

// bad
const errorMessage2 = 'This is a super long error that was thrown because ' +
  'of Batman. When you stop to think about how Batman had anything to do ' +
  'with this, you would get nowhere fast.';

// good
const errorMessage3 = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';

// bad
function sayHi(name) {
  return 'How are you, ' + name + '?';
}

// bad
function sayHi(name) {
  return ['How are you, ', name, '?'].join();
}

// bad
function sayHi(name) {
  return `How are you, ${ name }?`;
}

// good
function sayHi(name) {
  return `How are you, ${name}?`;
}

// bad
const foo1 = '\'this\' \i\s \"quoted\"';
console.log(foo1); // Output: 'this' is "quoted"

// good
const foo2 = '\'this\' is "quoted"';
console.log(foo2); // Output: 'this' is "quoted"
const name1 = 'John Doe';
const foo3 = `my name is '${name1}'`;
console.log(foo3); // Output: my name is 'John Doe'

// bad
function foo() {
  // ...
}

// bad
const foo = function () {
  // ...
};

// good
// lexical name distinguished from the variable-referenced invocation(s)
const short = function longUniqueMoreDescriptiveLexicalFoo() {
  // ...
};

(function() {
  // Code to be executed immediately
  console.log('Executed immediately');
})();

// immediately-invoked function expression (IIFE)
(function () {
  console.log('Welcome to the Internet. Please follow me.');
}());

// bad
if (currentUser) {
  function test() {
    console.log('Nope.');
  }
}

// good
let test;
if (currentUser) {
  test = () => {
    console.log('Yup.');
  };
}

// bad
function foo(name, options, arguments) {
  // ...
}

// good
function foo(name, options, args) {
  // ...
}