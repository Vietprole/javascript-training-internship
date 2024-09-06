//* Variables
// Don't ❌
setTimeout(clearSessionData, 900000)

// Do ✅
const SESSION_DURATION_MS = 15 * 60 * 1000

setTimeout(clearSessionData, SESSION_DURATION_MS)

//* Functions
// Don't ❌
function printAllFilesInDirectory(dir) {
  const directory = dir || './'
  //   ...
}

// Do ✅
function printAllFilesInDirectory(dir = './') {
  // ...
}

// Don't ❌
function sendPushNotification(title, message, image, isSilent, delayMs) {
  // ...
}

sendPushNotification('New Message', '...', 'http://...', false, 1000)

// Do ✅
function sendPushNotification({ title, message, image, isSilent, delayMs }) {
  // ...
}

const notificationConfig = {
  title: 'New Message',
  message: '...',
  image: 'http://...',
  isSilent: false,
  delayMs: 1000,
}

sendPushNotification(notificationConfig)

// Don't ❌
function pingUsers(users) {
  users.forEach((user) => {
    const userRecord = database.lookup(user)
    if (!userRecord.isActive()) {
      ping(user)
    }
  })
}

// Do ✅
function pingInactiveUsers(users) {
  users.filter(!isUserActive).forEach(ping)
}

function isUserActive(user) {
  const userRecord = database.lookup(user)
  return userRecord.isActive()
}

// Don't ❌
function createFile(name, isPublic) {
  if (isPublic) {
    fs.create(`./public/${name}`)
  } else {
    fs.create(name)
  }
}

// Do ✅
function createFile(name) {
  fs.create(name)
}

function createPublicFile(name) {
  createFile(`./public/${name}`)
}

// Don't ❌
function renderCarsList(cars) {
  cars.forEach((car) => {
    const price = car.getPrice()
    const make = car.getMake()
    const brand = car.getBrand()
    const nbOfDoors = car.getNbOfDoors()

    render({ price, make, brand, nbOfDoors })
  })
}

function renderMotorcyclesList(motorcycles) {
  motorcycles.forEach((motorcycle) => {
    const price = motorcycle.getPrice()
    const make = motorcycle.getMake()
    const brand = motorcycle.getBrand()
    const seatHeight = motorcycle.getSeatHeight()

    render({ price, make, brand, seatHeight })
  })
}

// Do ✅
function renderVehiclesList(vehicles) {
  vehicles.forEach((vehicle) => {
    const price = vehicle.getPrice()
    const make = vehicle.getMake()
    const brand = vehicle.getBrand()

    const data = { price, make, brand }

    switch (vehicle.type) {
      case 'car':
        data.nbOfDoors = vehicle.getNbOfDoors()
        break
      case 'motorcycle':
        data.seatHeight = vehicle.getSeatHeight()
        break
    }

    render(data)
  })
}

// Don't ❌
let date = '21-8-2021'

function splitIntoDayMonthYear() {
  date = date.split('-')
}

splitIntoDayMonthYear()

// Another function could be expecting date as a string
console.log(date) // ['21', '8', '2021'];

// Do ✅
function splitIntoDayMonthYear(date) {
  return date.split('-')
}

const date = '21-8-2021'
const newDate = splitIntoDayMonthYear(date)

// Original vlaue is intact
console.log(date) // '21-8-2021';
console.log(newDate) // ['21', '8', '2021'];

// Don't ❌
function enrollStudentInCourse(course, student) {
  course.push({ student, enrollmentDate: Date.now() })
}

// Do ✅
function enrollStudentInCourse(course, student) {
  return [...course, { student, enrollmentDate: Date.now() }]
}

//* Conditionals
// Don't ❌
function isUserNotVerified(user) {
  // ...
}

if (!isUserNotVerified(user)) {
  // ...
}

// Do ✅
function isUserVerified(user) {
  // ...
}

if (isUserVerified(user)) {
  // ...
}

// Don't ❌
if (isActive === true) {
  // ...
}

if (firstName !== '' && firstName !== null && firstName !== undefined) {
  // ...
}

const isUserEligible = user.isVerified() && user.didSubscribe() ? true : false

// Do ✅
if (isActive) {
  // ...
}

if (!!firstName) {
  // ...
}

const isUserEligible = user.isVerified() && user.didSubscribe()

// Don't ❌
function addUserService(db, user) {
  if (db) {
    if (db.isConnected()) {
      if (user) {
        return db.insert('users', user)
      } else {
        throw new Error('No user')
      }
    } else {
      throw new Error('No database connection')
    }
  } else {
    throw new Error('No database')
  }
}

// Do ✅
function addUserService(db, user) {
  if (!db) throw new Error('No database')
  if (!db.isConnected()) throw new Error('No database connection')
  if (!user) throw new Error('No user')

  return db.insert('users', user)
}

// Don't ❌
const getColorByStatus = (status) => {
  switch (status) {
    case 'success':
      return 'green'
    case 'failure':
      return 'red'
    case 'warning':
      return 'yellow'
    case 'loading':
    default:
      return 'blue'
  }
}

// Do ✅
const statusColors = {
  success: 'green',
  failure: 'red',
  warning: 'yellow',
  loading: 'blue',
}

const getColorByStatus = (status) => statusColors[status] || 'blue'

const user = {
  email: 'JDoe@example.com',
  billing: {
    iban: '...',
    swift: '...',
    address: {
      street: 'Some Street Name',
      state: 'CA',
    },
  },
}

// Don't ❌
const email = (user && user.email) || 'N/A'
const street =
  (user &&
    user.billing &&
    user.billing.address &&
    user.billing.address.street) ||
  'N/A'
const state =
  (user &&
    user.billing &&
    user.billing.address &&
    user.billing.address.state) ||
  'N/A'

// Do ✅
const email = user?.email || 'N/A'
const street = user?.billing?.address?.street || 'N/A'
const state = user?.billing?.address?.state || 'N/A'

// Don't ❌
getUser(function (err, user) {
  getProfile(user, function (err, profile) {
    getAccount(profile, function (err, account) {
      getReports(account, function (err, reports) {
        sendStatistics(reports, function (err) {
          console.error(err)
        })
      })
    })
  })
})

// Do ✅
getUser()
  .then(getProfile)
  .then(getAccount)
  .then(getReports)
  .then(sendStatistics)
  .catch((err) => console.error(err))

// or using Async/Await ✅✅

async function sendUserStatistics() {
  try {
    const user = await getUser()
    const profile = await getProfile(user)
    const account = await getAccount(profile)
    const reports = await getReports(account)
    return sendStatistics(reports)
  } catch (e) {
    console.error(err)
  }
}

//* Error Handling

// Don't ❌
try {
  // Possible erronous code
} catch (e) {
  console.log(e)
}

// Do ✅
try {
  // Possible erronous code
} catch (e) {
  // Follow the most applicable (or all):
  // 1- More suitable than console.log
  console.error(e)

  // 2- Notify user if applicable
  alertUserOfError(e)

  // 3- Report to server
  reportErrorToServer(e)

  // 4- Use a custom error handler
  throw new CustomError(e)
}

//* Comments

// Don't ❌
function generateHash(str) {
  // Hash variable
  let hash = 0

  // Get the length of the string
  let length = str.length

  // If the string is empty return
  if (!length) {
    return hash
  }

  // Loop through every character in the string
  for (let i = 0; i < length; i++) {
    // Get character code.
    const char = str.charCodeAt(i)

    // Make the hash
    hash = (hash << 5) - hash + char

    // Convert to 32-bit integer
    hash &= hash
  }
}

// Do ✅
function generateHash(str) {
  let hash = 0
  let length = str.length
  if (!length) {
    return hash
  }

  for (let i = 0; i < length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash
}

/**  
 * Returns x raised to the n-th power.  
 *  
 * @param {number} x The number to raise.  
 * @param {number} n The power, should be a natural number.  
 * @return {number} x raised to the n-th power.  
 */ 
function pow(x, n) {   
    // ...
}