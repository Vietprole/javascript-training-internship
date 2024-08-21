//* Objects
// Object initialization
let user = {
    name: "John",
    age: 30
  } // Using object literal
  const obj1 = new Object() // Using the object built-in function
  const obj2 = Object.create(null) // Using the Object.create() function
  // Function as object constructor
  function Car(brand, model) {
    this.brand = brand
    this.model = model
  }
  
  let myCar = new Car('Ford', 'Fiesta')
  console.log(myCar.brand) // Ford
  // Primitive types are passed by value
  let age = 36
  let myAge = age
  myAge = 37
  console.log(age) // 36
  // Objects are passed by reference
  const car = {
    color: 'blue',
  }
  const anotherCar = car
  anotherCar.color = 'yellow'
  console.log(car.color) // yellow
  
  //* Object properties
  // Define properties
  const car1 = {
    color: 'blue',
    'the color': 'bluey', // Use quotes for special characters property names
    brand: {
      name: 'Ford',
    },
  }
  // Property value shorthand
  function makeUser(name, age){
    return {
      name, // same as name: name
      age // same as age: age
    }
  }
  let user1 = makeUser('John', 30)
  console.log(user1.name) // John
  
  let username = 'Doe'
  let user2 = {
    username, // same as name: name
    age: 30
  }
  console.log(user2.username) // Doe
  // Property names limitation
  let obj = {
    for: 1,
    let: 2,
    return: 3,
  }
  console.log(obj.for + obj.let + obj.return) // 6
  
  obj = {
    0: 'test', // same as '0': 'test'
  }// number name is converted to string
  console.log(obj[0]) // test
  console.log(obj['0']) // test
  
  obj = {}
  obj.__proto__ = 5 // __proto__ is a special property name, it must be an object
  console.log(obj.__proto__) // [object Object]
  
  // Access properties
  console.log(car1.color) // blue
  console.log(car1['the color']) // bluey
  let key = "color"
  console.log(car1[key]) // blue
  console.log(car1.name) // undefined
  console.log(car1.brand.name) // Ford
  console.log(car1['brand']['name']) // Ford
  // Modify properties
  car1.color = 'yellow'
  car1['the color'] = 'yellowy'
  console.log(car1.color) // yellow
  console.log(car1['the color']) // yellowy
  // Add properties
  car1.model = 'Fiesta'
  console.log(car1.model) // Fiesta
  // Delete properties
  delete car1.model
  console.log(car1.model) // undefined
  //Computed property names
  let fruit = prompt("Which fruit to buy?", "apple")
  let bag = {
    [fruit]: 5, // the name of the property is taken from the variable fruit
  }
  alert(bag[fruit]) // 5
  
  fruit = 'apple'
  bag = {
    ['a_bunch_of_' + fruit]: 52,
  }
  console.log(bag.a_bunch_of_apple) // 52
  
  // Property existence
  let user3 = {}
  console.log(user3.noSuchProperty === undefined) // true
  // non-existing property & property value: undefined returns undefined
  console.log('age' in user) // true
  console.log('name' in user) // true
  key = 'age'
  console.log(key in user) // true
  // Object methods
  const car2 = {
    brand: 'Ford',
    model: 'Fiesta',
    start: function () {
      console.log(`Started ${this.brand} ${this.model}`)
    },
  }
  car2.start() // Started Ford Fiesta
  
  // Arrow function are not bound to the object
  const car3 = {
    brand: 'Ford',
    model: 'Fiesta',
    start: () => {
      console.log(`Started ${this.brand} ${this.model}`) //not going to work
    },
  }
  car3.start() // Started undefined undefined
  
  // Object order when looping
  let codes = {
    "49": "Germany",
    "41": "Switzerland",
    "44": "Great Britain",
    // ..,
    "1": "USA",
    z: "this is z",
    a: "this is a"
  };
  
  for (let code in codes) {
    console.log(code); // 1, 41, 44, 49, z, a
  }// integer properties are sorted, others appear in creation order
  //* Object references and copying
  // Primitive types are passed by value
  let message = 'Hello'
  let phrase = message
  console.log(message) // Hello
  console.log(phrase) // Hello
  message = 'World!'
  console.log(message) // World!
  console.log(phrase) // Hello
  
  // Objects are passed by reference
  user = {
    name: 'John',
  }
  
  let admin = user
  admin.name = 'Pete'
  console.log(user.name) // Pete
  
  // Comparison by reference
  let x = {}
  let y = x // y references the same object as x
  console.log(x == y) // true
  console.log(x === y) // true
  
  let x1 = {}
  let y1 = {} // 2 different objects
  console.log(x1 === y1) // false
  
  //Cloning and merging
  user = {
    name: 'John',
    age: 30,
  }
  
  let clone = {} // the new empty object
  // let's copy all user properties into it
  for (let key in user) {
    clone[key] = user[key]
  }
  
  // now clone is a fully independent clone
  clone.name = 'Pete' // changed the data in it
  console.log(user.name) // John
  console.log(clone.name) // Pete
  
  //Object.assign to copy properties from all sources into the target
  let permissions1 = { canView: true }
  let permissions2 = { canEdit: true }
  
  // copies all properties from permissions1 and permissions2 into user
  Object.assign(user, permissions1, permissions2)
  console.log(user) // { name: 'John', age: 30, canView: true, canEdit: true }
  
  //Object.assign to overwrite properties
  Object.assign(user, { name: 'Pete' }) // overwrite name
  console.log(user.name) // Pete
  
  //Object.assign to clone an object
  let clone1 = Object.assign({}, user)
  console.log(clone1) // { name: 'Pete', age: 30, canView: true, canEdit: true }
  
  //Nested cloning
  user = {
    name: 'John',
    sizes: {
      height: 182,
      width: 50,
    },
  }
  
  let clone2 = Object.assign({}, user);
  
  console.log( user.sizes === clone2.sizes ); // true, same object
  
  // user and clone share sizes
  user.sizes.width = 60;    // change a property from one place
  console.log(clone2.sizes.width); // 60, get the result from the other one
  // structured cloning
  user = {
    name: "John",
    sizes: {
      height: 182,
      width: 50
    }
  };
  
  let clone3 = structuredClone(user);
  
  console.log( user.sizes === clone3.sizes ); // false, different objects
  
  // user and clone are totally unrelated now
  user.sizes.width = 60;    // change a property from one place
  console.log(clone3.sizes.width); // 50, not related