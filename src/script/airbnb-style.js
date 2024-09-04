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
console.log(object.hasOwnProperty(key))

// good
console.log(Object.prototype.hasOwnProperty.call(object, key))

// better
const has = Object.prototype.hasOwnProperty // cache the lookup once, in module scope.
console.log(has.call(object, key))

// best
console.log(Object.hasOwn(object, key)) // only supported in browsers that support ES2022

/* or */
import has from 'has' // https://www.npmjs.com/package/has
console.log(has(object, key))
/* or */
console.log(Object.hasOwn(object, key)) // https://www.npmjs.com/package/object.hasown

// very bad
const original = { a: 1, b: 2 }
const copy = Object.assign(original, { c: 3 }) // this alo change `original`
delete copy.a // so does this

// bad
const original1 = { a: 1, b: 2 }
const copy1 = Object.assign({}, original1, { c: 3 }) // copy => { a: 1, b: 2, c: 3 }

// good
const original2 = { a: 1, b: 2 }
const copy2 = { ...original2, c: 3 } // copy => { a: 1, b: 2, c: 3 }

const { a, ...noA } = copy // noA => { b: 2, c: 3 }

const someStack = []

// bad
someStack[someStack.length] = 'abracadabra'

// good
someStack.push('abracadabra')
console.log(someStack)

const foo = document.querySelectorAll('.foo')

// good
const nodes = Array.from(foo)

// best
const nodes1 = [...foo]

const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 }
console.log(arrLike) // { '0': 'foo', '1': 'bar', '2': 'baz', length: 3 }
// bad
const arr = Array.prototype.slice.call(arrLike)
console.log(arr) // [ 'foo', 'bar', 'baz' ]
// good
const arr1 = Array.from(arrLike)
console.log(arr1) // [ 'foo', 'bar', 'baz' ]

// bad
const baz = [...foo].map(bar)

// good
const baz1 = Array.from(foo, bar)

const numbers = [1, 2, 3]
// bad
const doubled = numbers.map((num) => {
  num * 2 // No return statement, so the result is undefined
})
console.log(doubled) // Output: [undefined, undefined, undefined]
// good
const doubled1 = numbers.map((num) => num * 2)
const doubled2 = numbers.map((num) => {
  return num * 2
})
console.log(doubled1) // Output: [2, 4, 6]
console.log(doubled2) // Output: [2, 4, 6]

// bad
const array = [
  [0, 1],
  [2, 3],
  [4, 5],
]

const objectInArray = [
  {
    id: 1,
  },
  {
    id: 2,
  },
]

const numberInArray = [1, 2]

// good
const array1 = [
  [0, 1],
  [2, 3],
  [4, 5],
]

const objectInArray1 = [
  {
    id: 1,
  },
  {
    id: 2,
  },
]

const numberInArray1 = [1, 2]

//* Destructuring

// bad
function getFullName(user) {
  const firstName = user.firstName
  const lastName = user.lastName

  return `${firstName} ${lastName}`
}

// good
function getFullName(user) {
  const { firstName, lastName } = user
  return `${firstName} ${lastName}`
}

// best
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`
}

const array2 = [1, 2, 3, 4]

// bad
const first1 = array2[0]
const second1 = array2[1]

// good
const [first, second] = arr

// bad
function processInput(input) {
  // then a miracle occurs
  return [left, right, top, bottom]
}

// the caller needs to think about the order of return data
const [left1, __, top1] = processInput(input)

// good
function processInput(input) {
  // then a miracle occurs
  return { left, right, top, bottom }
}

// the caller selects only the data they need
const { left, top } = processInput(input)

// bad
const name2 = 'Capt. Janeway'

// bad - template literals should contain interpolation or newlines
const name3 = `Capt. Janeway`

// good
const name4 = 'Capt. Janeway'

// bad
const errorMessage1 =
  'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.'

// bad
const errorMessage2 =
  'This is a super long error that was thrown because ' +
  'of Batman. When you stop to think about how Batman had anything to do ' +
  'with this, you would get nowhere fast.'

// good
const errorMessage3 =
  'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.'

// bad
function sayHi(name) {
  return 'How are you, ' + name + '?'
}

// bad
function sayHi(name) {
  return ['How are you, ', name, '?'].join()
}

// bad
function sayHi(name) {
  return `How are you, ${name}?`
}

// good
function sayHi(name) {
  return `How are you, ${name}?`
}

// bad
const foo1 = '\'this\' is "quoted"'
console.log(foo1) // Output: 'this' is "quoted"

// good
const foo2 = '\'this\' is "quoted"'
console.log(foo2) // Output: 'this' is "quoted"
const name1 = 'John Doe'
const foo3 = `my name is '${name1}'`
console.log(foo3) // Output: my name is 'John Doe'

// bad
function foo() {
  // ...
}

// bad
const foo = function () {
  // ...
}

// good
// lexical name distinguished from the variable-referenced invocation(s)
const short = function longUniqueMoreDescriptiveLexicalFoo() {
  // ...
}

;(function () {
  // Code to be executed immediately
  console.log('Executed immediately')
})()

// immediately-invoked function expression (IIFE)
;(function () {
  console.log('Welcome to the Internet. Please follow me.')
})()

// bad
if (currentUser) {
  function test() {
    console.log('Nope.')
  }
}

// good
let test
if (currentUser) {
  test = () => {
    console.log('Yup.')
  }
}

// bad
function foo(name, options, arguments) {
  // ...
}

// good
function foo(name, options, args) {
  // ...
}

// really bad
function handleThings(opts) {
  // No! We shouldn’t mutate function arguments.
  // Double bad: if opts is falsy it'll be set to an object which may
  // be what you want but it can introduce subtle bugs.
  opts = opts || {}
  // ...
}

// still bad
function handleThings(opts) {
  if (opts === void 0) {
    opts = {}
  }
  // ...
}

// good
function handleThings(opts = {}) {
  // ...
}

// bad
const add = new Function('a', 'b', 'return a + b')

// still bad
const subtract = Function('a', 'b', 'return a - b')

// bad
function foo(bar, baz, quux) {
  // ...
}

// good
function foo(bar, baz, quux) {
  // ...
}

// bad
console.log(foo, bar, baz)

// good
console.log(foo, bar, baz)

// bad
;[1, 2, 3].map(function (x) {
  const y = x + 1
  return x * y
})

// good
;[1, 2, 3].map((x) => {
  const y = x + 1
  return x * y
})

// return object literal by wrapping it in parentheses
;[1, 2, 3].map((number, index) => ({
  [index]: number,
}))

// bad
;[1, 2, 3].map((number) => {
  const nextNumber = number + 1
  ;`A string containing the ${nextNumber}.`
})

// good
;[1, 2, 3].map((number) => `A string containing the ${number + 1}.`)

// good
;[1, 2, 3].map((number) => {
  const nextNumber = number + 1
  return `A string containing the ${nextNumber}.`
})

// bad
;['get', 'post', 'put'].map((httpMethod) =>
  Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod
  )
)

// good
;['get', 'post', 'put'].map((httpMethod) =>
  Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod
  )
)

// bad
;[1, 2, 3].map((x) => x * x)

// good
;[1, 2, 3].map((x) => x * x)

// bad
const itemHeight = (item) =>
  item.height <= 256 ? item.largeSize : item.smallSize

// bad
const itemHeight = (item) =>
  item.height >= 256 ? item.largeSize : item.smallSize

// good
const itemHeight = (item) =>
  item.height <= 256 ? item.largeSize : item.smallSize

// bad
;(foo) => bar

;(foo) => bar

// good
;(foo) => bar
;(foo) => bar
;(foo) => bar

// bad
function Queue(contents = []) {
  this.queue = [...contents]
}
Queue.prototype.pop = function () {
  const value = this.queue[0]
  this.queue.splice(0, 1)
  return value
}

// good
class Queue {
  constructor(contents = []) {
    this.queue = [...contents]
  }
  pop() {
    const value = this.queue[0]
    this.queue.splice(0, 1)
    return value
  }
}

// bad
const inherits = require('inherits')
function PeekableQueue(contents) {
  Queue.apply(this, contents)
}
inherits(PeekableQueue, Queue)
PeekableQueue.prototype.peek = function () {
  return this.queue[0]
}

// good
class PeekableQueue extends Queue {
  peek() {
    return this.queue[0]
  }
}

// good
class Jedi {
  jump() {
    this.jumping = true
    return this
  }

  setHeight(height) {
    this.height = height
    return this
  }
}

const luke = new Jedi()

luke.jump().setHeight(20)

// bad
class Foo {
  bar() {
    console.log('bar');
  }
}

// good - this is used
class Foo {
  bar() {
    console.log(this.bar);
  }
}

// good - constructor is exempt
class Foo {
  constructor() {
    // ...
  }
}

// good - static methods aren't expected to use this
class Foo {
  static bar() {
    console.log('bar');
  }
}

// bad
const AirbnbStyleGuide = require('./AirbnbStyleGuide');
module.exports = AirbnbStyleGuide.es6;

// ok
import AirbnbStyleGuide from './AirbnbStyleGuide';
export default AirbnbStyleGuide.es6;

// best
import { es6 } from './AirbnbStyleGuide';
export default es6;

// bad
import * as AirbnbStyleGuide from './AirbnbStyleGuide';

// good
import AirbnbStyleGuide from './AirbnbStyleGuide';

// bad
// filename es6.js
export { es6 as default } from './AirbnbStyleGuide';

// good
// filename es6.js
import { es6 } from './AirbnbStyleGuide';
export default es6;

// bad
import foo from 'foo';
// … some other imports … //
import { named1, named2 } from 'foo';

// good
import foo, { named1, named2 } from 'foo';

// good
import foo, {
  named1,
  named2,
} from 'foo';

// bad
let foo = 3;
export { foo };

// good
const foo = 3;
export { foo };

// bad
import {longNameA, longNameB, longNameC, longNameD, longNameE} from 'path';

// good
import {
  longNameA,
  longNameB,
  longNameC,
  longNameD,
  longNameE,
} from 'path';

// bad
import fooSass from 'css!sass!foo.scss';
import barCss from 'style!css!bar.css';

// good
import fooSass from 'foo.scss';
import barCss from 'bar.css';

// bad
import foo from './foo.js';
import bar from './bar.jsx';
import baz from './baz/index.jsx';

// good
import foo from './foo';
import bar from './bar';
import baz from './baz';

const numbers = [1, 2, 3, 4, 5];

// bad
let sum = 0;
for (let num of numbers) {
  sum += num;
}
sum === 15;

// good
let sum = 0;
numbers.forEach((num) => {
  sum += num;
});
sum === 15;

// best (use the functional force)
const sum = numbers.reduce((total, num) => total + num, 0);
sum === 15;

// bad
const increasedByOne = [];
for (let i = 0; i < numbers.length; i++) {
  increasedByOne.push(numbers[i] + 1);
}

// good
const increasedByOne = [];
numbers.forEach((num) => {
  increasedByOne.push(num + 1);
});

// best (keeping it functional)
const increasedByOne = numbers.map((num) => num + 1);

const luke = {
  jedi: true,
  age: 28,
};

function getProp(prop) {
  return luke[prop];
}

const prop = 'jedi';
const isJedi = luke[prop];

// bad
superPower = new SuperPower();// this is a global variable

// good
const superPower = new SuperPower();

// bad
const items = getItems(),
    goSportsTeam = true,
    dragonball = 'z';

// bad
// (compare to above, and try to spot the mistake)
const items = getItems(),
    goSportsTeam = true;
    dragonball = 'z';

// good
const items = getItems();
const goSportsTeam = true;
const dragonball = 'z';

const goSportsTeam = true;
const items = getItems();
let dragonball;
let i;
let length;

// bad
(function example() {
  // JavaScript interprets this as
  // let a = ( b = ( c = 1 ) );
  // The let keyword only applies to variable a; variables b and c become
  // global variables.
  let a = b = c = 1;
}());

console.log(a); // throws ReferenceError
console.log(b); // 1
console.log(c); // 1

// good
(function example() {
  let a = 1;
  let b = a;
  let c = a;
}());

console.log(a); // throws ReferenceError
console.log(b); // throws ReferenceError
console.log(c); // throws ReferenceError

// the same applies for `const`

// bad
const foo =
  superLongLongLongLongLongLongLongLongFunctionName();

// bad
const foo
  = 'superLongLongLongLongLongLongLongLongString';

// good
const foo = (
  superLongLongLongLongLongLongLongLongFunctionName()
);

// good
const foo = 'superLongLongLongLongLongLongLongLongString';

// we know this wouldn’t work (assuming there
// is no notDefined global variable)
function example() {
  console.log(notDefined); // => throws a ReferenceError
}

// creating a variable declaration after you
// reference the variable will work due to
// variable hoisting. Note: the assignment
// value of `true` is not hoisted.
function example() {
  console.log(declaredButNotAssigned); // => undefined
  var declaredButNotAssigned = true;
}

// the interpreter is hoisting the variable
// declaration to the top of the scope,
// which means our example could be rewritten as:
function example() {
  let declaredButNotAssigned;
  console.log(declaredButNotAssigned); // => undefined
  declaredButNotAssigned = true;
}

// using const and let
function example() {
  //TDZ start at the beginning of the block
  const func = () => console.log(foo); // No TDZ error

  console.log(foo); // => throws a ReferenceError: Cannot access 'foo' before initialization
  console.log(typeof foo); // => throws a ReferenceError
  
  const foo = 3; //TDZ ends for foo
  func(); // 3
}

function example() {
  console.log(anonymous); // => undefined

  anonymous(); // => TypeError anonymous is not a function

  var anonymous = function () {
    console.log('anonymous function expression');
  };
}