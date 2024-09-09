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

function example() {
  console.log(named); // => undefined

  named(); // => TypeError named is not a function

  superPower(); // => ReferenceError superPower is not defined

  var named = function superPower() {
    console.log('Flying');
  };
}

// the same is true when the function name
// is the same as the variable name.
function example() {
  console.log(named); // => undefined

  named(); // => TypeError named is not a function

  var named = function named() {
    console.log('named');
  };
}

function example() {
  superPower(); // => Flying

  function superPower() {
    console.log('Flying');
  }
}

// bad

// Variable a is being used before it is being defined.
console.log(a); // this will be undefined, since while the declaration is hoisted, the initialization is not
var a = 10;

// Function fun is being called before being defined.
fun();
function fun() {}

// Class A is being used before being defined.
new A(); // ReferenceError: Cannot access 'A' before initialization
class A {
}

// `let` and `const` are hoisted, but they don't have a default initialization.
// The variables 'a' and 'b' are in a Temporal Dead Zone where JavaScript
// knows they exist (declaration is hoisted) but they are not accessible
// (as they are not yet initialized).

console.log(a); // ReferenceError: Cannot access 'a' before initialization
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let a = 10;
const b = 5;


// good

var a = 10;
console.log(a); // 10

function fun() {}
fun();

class A {
}
new A();

let a = 10;
const b = 5;
console.log(a); // 10
console.log(b); // 5

if ([0] && []) {
  // true
  // an array (even an empty one) is an object, objects will evaluate to true
}

// bad
if (isValid === true) {
  // ...
}

// good
if (isValid) {
  // ...
}

// bad
if (name) {
  // ...
}

// good
if (name !== '') {
  // ...
}

// bad
if (collection.length) {
  // ...
}

// good
if (collection.length > 0) {
  // ...
}

// bad
switch (foo) {
  case 1:
    let x = 1;
    break;
  case 2:
    const y = 2;
    break;
  case 3:
    function f() {
      // ...
    }
    break;
  default:
    class C {}
}

// good
switch (foo) {
  case 1: {
    let x = 1;
    break;
  }
  case 2: {
    const y = 2;
    break;
  }
  case 3: {
    function f() {
      // ...
    }
    break;
  }
  case 4:
    bar();
    break;
  default: {
    class C {}
  }
}

// bad
const foo = maybe1 > maybe2
  ? "bar"
  : value1 > value2 ? "baz" : null;

// split into 2 separated ternary expressions
const maybeNull = value1 > value2 ? 'baz' : null;

// better
const foo = maybe1 > maybe2
  ? 'bar'
  : maybeNull;

// best
const foo = maybe1 > maybe2 ? 'bar' : maybeNull;

// bad
const foo = a ? a : b;
const bar = c ? true : false;
const baz = c ? false : true;
const quux = a != null ? a : b;

// good
const foo = a || b;
const bar = !!c;
const baz = !c;
const quux = a ?? b;

// bad
const foo = a && b < 0 || c > 0 || d + 1 === 0;

// bad
const bar = a ** b - 5 % d;

// bad
// one may be confused into thinking (a || b) && c
if (a || b && c) {
  return d;
}

// bad
const bar = a + b / c * d;

// good
const foo = (a && b < 0) || c > 0 || (d + 1 === 0);

// good
const bar = a ** b - (5 % d);

// good
if (a || (b && c)) {
  return d;
}

// good
const bar = a + (b / c) * d;

// bad
const value = 0 ?? 'default';
// returns 0, not 'default'

// bad
const value = '' ?? 'default';
// returns '', not 'default'

// good
const value = null ?? 'default';
// returns 'default'

// good
const user = {
  name: 'John',
  age: null
};
const age = user.age ?? 18;
// returns 18

// bad
if (test)
  return false;

// good
if (test) return false;

// good
if (test) {
  return false;
}

// bad
function foo() { return false; }

// good
function bar() {
  return false;
}

// bad
if (test) {
  thing1();
  thing2();
}
else {
  thing3();
}

// good
if (test) {
  thing1();
  thing2();
} else {
  thing3();
}

// bad
function foo() {
  if (x) {
    return x;
  } else {
    return y;
  }
}

// bad
function cats() {
  if (x) {
    return x;
  } else if (y) {
    return y;
  }
}

// bad
function dogs() {
  if (x) {
    return x;
  } else {
    if (y) {
      return y;
    }
  }
}

// good
function foo() {
  if (x) {
    return x;
  }

  return y;
}

// good
function cats() {
  if (x) {
    return x;
  }

  if (y) {
    return y;
  }
}

// good
function dogs(x) {
  if (x) {
    if (z) {
      return y;
    }
  } else {
    return z;
  }
}

// bad
if ((foo === 123 || bar === 'abc') && doesItLookGoodWhenItBecomesThatLong() && isThisReallyHappening()) {
  thing1();
}

// bad
if (foo === 123 &&
  bar === 'abc') {
  thing1();
}

// bad
if (foo === 123
  && bar === 'abc') {
  thing1();
}

// bad
if (
  foo === 123 &&
  bar === 'abc'
) {
  thing1();
}

// good
if (
  foo === 123
  && bar === 'abc'
) {
  thing1();
}

// good
if (
  (foo === 123 || bar === 'abc')
  && doesItLookGoodWhenItBecomesThatLong()
  && isThisReallyHappening()
) {
  thing1();
}

// good
if (foo === 123 && bar === 'abc') {
  thing1();
}

// bad
!isRunning && startRunning();

// good
if (!isRunning) {
  startRunning();
}

// bad
// make() returns a new element
// based on the passed in tag name
//
// @param {String} tag
// @return {Element} element
function make(tag) {

  // ...

  return element;
}

// good
/**
 * make() returns a new element
 * based on the passed-in tag name
 */
function make(tag) {

  // ...

  return element;
}

// bad
const active = true;  // is current tab

// good
// is current tab
const active = true;

// bad
function getType() {
  console.log('fetching type...');
  // set the default type to 'no type'
  const type = this.type || 'no type';

  return type;
}

// good
function getType() {
  console.log('fetching type...');

  // set the default type to 'no type'
  const type = this.type || 'no type';

  return type;
}

// also good
function getType() {
  // set the default type to 'no type'
  const type = this.type || 'no type';

  return type;
}

// bad
//is current tab
const active = true;

// good
// is current tab
const active = true;

// bad
/**
 *make() returns a new element
 *based on the passed-in tag name
 */
function make(tag) {

  // ...

  return element;
}

// good
/**
 * make() returns a new element
 * based on the passed-in tag name
 */
function make(tag) {

  // ...

  return element;
}

class Calculator extends Abacus {
  constructor() {
    super();

    // FIXME: shouldn’t use a global here
    total = 0;
  }
}

class Calculator extends Abacus {
  constructor() {
    super();

    // TODO: total should be configurable by an options param
    this.total = 0;
  }
}


// bad
$('#items').find('.selected').highlight().end().find('.open').updateCount();

// bad
$('#items').
  find('.selected').
    highlight().
    end().
  find('.open').
    updateCount();

// good
$('#items')
  .find('.selected')
    .highlight()
    .end()
  .find('.open')
    .updateCount();

// bad
obj[foo ]
obj[ 'foo']
const x = {[ b ]: a}
obj[foo[ bar ]]

// good
obj[foo]
obj['foo']
const x = { [b]: a }
obj[foo[bar]]

// bad
const obj = { foo : 42 };
const obj2 = { foo:42 };

// good
const obj = { foo: 42 };

// => this.reviewScore = 9;

// bad
const totalScore = new String(this.reviewScore); // typeof totalScore is "object" not "string"

// bad
const totalScore = this.reviewScore + ''; // invokes this.reviewScore.valueOf()

// bad
const totalScore = this.reviewScore.toString(); // isn’t guaranteed to return a string

// good
const totalScore = String(this.reviewScore);

const inputValue = '4';

// bad
const val = new Number(inputValue);

// bad
const val = +inputValue;

// bad
const val = inputValue >> 0;

// bad
const val = parseInt(inputValue);

// good
const val = Number(inputValue);

// good
const val = parseInt(inputValue, 10);

// good
/**
 * parseInt was the reason my code was slow.
 * Bitshifting the String to coerce it to a
 * Number made it a lot faster.
 */
const val = inputValue >> 0;

2147483647 >> 0; // => 2147483647
2147483648 >> 0; // => -2147483648
2147483649 >> 0; // => -2147483647

const age = 0;

// bad
const hasAge = new Boolean(age);

// good
const hasAge = Boolean(age);

// best
const hasAge = !!age;

// bad
function foo() {
  const self = this;
  return function () {
    console.log(self);
  };
}

// bad
function foo() {
  const that = this;
  return function () {
    console.log(that);
  };
}

// good
function foo() {
  return () => {
    console.log(this);
  };
}

// Using 'bind' creates a new function so that 'this' is bound to the correct context
const module = {
  x: 42,
  getX: function () {
    return this.x;
  },
};

const unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// Expected output: undefined

const boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// Expected output: 42

// file 1 contents
class CheckBox {
  // ...
}
export default CheckBox;

// file 2 contents
export default function fortyTwo() { return 42; }

// file 3 contents
export default function insideDirectory() {}

// good
import CheckBox from './CheckBox'; // PascalCase export/import/filename
import fortyTwo from './fortyTwo'; // camelCase export/import/filename
import insideDirectory from './insideDirectory'; // camelCase export/import/directory name/implicit "index"
// ^ supports both insideDirectory.js and insideDirectory/index.js

function makeStyleGuide() {
  // ...
}

export default makeStyleGuide;


const AirbnbStyleGuide = {
  es6: {
  },
};

export default AirbnbStyleGuide;

// bad
import SmsContainer from './containers/SmsContainer';

// bad
const HttpRequests = [
  // ...
];

// good
import SMSContainer from './containers/SMSContainer';

// good
const HTTPRequests = [
  // ...
];

// also good
const httpRequests = [
  // ...
];

// best
import TextMessageContainer from './containers/TextMessageContainer';

// best
const requests = [
  // ...
];

// bad
const PRIVATE_VARIABLE = 'should not be unnecessarily uppercased within a file';

// bad
export const THING_TO_BE_CHANGED = 'should obviously not be uppercased';

// bad
export let REASSIGNABLE_VARIABLE = 'do not use let with uppercase variables';

// ---

// allowed but does not supply semantic value
export const apiKey = 'SOMEKEY';

// better in most cases
export const API_KEY = 'SOMEKEY';

// ---

// bad - unnecessarily uppercases key while adding no semantic value
export const MAPPING = {
  KEY: 'value'
};

// good
export const MAPPING = {
  key: 'value',
};

// bad
class Dragon {
  get age() {
    // ...
  }

  set age(value) {
    // ...
  }
}

// good
class Dragon {
  getAge() {
    // ...
  }

  setAge(value) {
    // ...
  }
}

// bad
$(this).trigger('listingUpdated', listing.id);

// ...

$(this).on('listingUpdated', (e, listingID) => {
  // do something with listingID
});

// good
$(this).trigger('listingUpdated', { listingID: listing.id });

// ...

$(this).on('listingUpdated', (e, data) => {
  // do something with data.listingID
});

// bad
const sidebar = $('.sidebar');

// good
const $sidebar = $('.sidebar');

// good
const $sidebarBtn = $('.sidebar-btn');

// bad
function setSidebar() {
  $('.sidebar').hide();

  // ...

  $('.sidebar').css({
    'background-color': 'pink',
  });
}

// good
function setSidebar() {
  const $sidebar = $('.sidebar');
  $sidebar.hide();

  // ...

  $sidebar.css({
    'background-color': 'pink',
  });
}

// bad
$('ul', '.sidebar').hide();

// bad
$('.sidebar').find('ul').hide();

// good
$('.sidebar ul').hide();

// good
$('.sidebar > ul').hide();

// good
$sidebar.find('ul').hide();

function fact(n) {
  // create an array
  const result = [];
  // push 1 element to the array
  result.push(1);
  // loop from 2 to n
  for (let i = 2; i <= n; i++) {
    // create a variable to store the value of i
    let current = i;
    // loop from 2 to i
    for (let j = 2; j <= i; j++) {
      
    }
  }
  console.log(result);
}
fact(1000);

const user = {
  name: 'Alice',
  age: 25,
};

// Use spread operator to copy data
const newUser = { ...user, location: 'New York'};
console.log(newUser); // { name: 'Alice', age: 25, location: 'New York' }
