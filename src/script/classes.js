//* Classes
class Person {
    constructor(name) {
      this.name = name
    }
    hello() {
      return 'Hello, I am ' + this.name + '.'
    }
  }
  const flavio = new Person('flavio')
  console.log(flavio.hello()) //'Hello, I am flavio.'
  // Static methods
  class Person1 {
    static genericHello() {
      return 'Hello'
    }
  }
  Person1.genericHello() //Hello
  // Inheritance
  class Person2 {
    hello() {
      return 'Hello, I am a Person'
    }
  }
  
  class Programmer extends Person2 {
    hello() {
      return super.hello() + '. I am also a programmer.'
    }
  }
  const flavio1 = new Programmer()
  console.log(flavio1.hello())
  // Async programming & Callbacks
  function fetchData(callback) {
    setTimeout(() => {
      const data = { id: 1, name: 'John Doe' }
      callback(data)
    }, 5000)
  }
  
  fetchData((data) => {
    console.log('Data received:', data)
  })
  console.log('Fetching data...Data will arrive in 5 seconds')
  
  // Promise
  const error = false
  const promise = new Promise((resolve, reject) => {
    if (!error) {
      setTimeout(() => resolve('Resolving an asynchronous request!'), 2000)
    } else {
      reject('An error occurred!')
    }
  })
  
  // Log the result
  promise
    .then((firstResponse) => {
      // Return a new value for the next then
      return firstResponse + ' And chaining!'
    })
    .then((secondResponse) => {
      console.log(secondResponse)
    })
    .catch((error) => {
      console.error(error)
    })
  
  // Async/Await
  function getUser() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('John Doe'), 2000)
    })
  }
  
  async function getUserName() {
    const user = await getUser()
    console.log(user)
  }
  
  getUserName()
  console.log('Fetching user name...')