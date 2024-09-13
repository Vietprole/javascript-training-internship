class Customer {
  constructor(id, name, status, rate, balance, deposit, description) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.rate = rate;
    this.balance = balance;
    this.deposit = deposit;
    this.description = description;
  }

  toJSON() {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      status: this.status,
      rate: this.rate,
      balance: this.balance,
      deposit: this.deposit,
      description: this.description,
    });
  }
}

// Define the URL for the HTTP request
const url = 'http://localhost:3000/customers';

// Make the GET request using fetch
fetch(url)
  .then((response) => {
    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`Network response was not ok ${response.statusText}`);
    }
    // Parse the JSON from the response
    return response.json();
  })
  .then((data) => {
    // Handle the data from the response
    console.log(data);
  })
  .catch((error) => {
    // Handle any errors that occurred during the fetch
    console.error('There was a problem with the fetch operation:', error);
  });

const newCustomer = new Customer(
  '1',
  'John Doe',
  'Open',
  70,
  -270,
  500,
  'This is a test customer'
).toJSON();
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: newCustomer,
})
  .then((response) => {
    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`Network response was not ok ${response.statusText}`);
    }
    // Parse the JSON from the response
    return response.json();
  })
  .then((data) => {
    // Handle the data from the response
    console.log(data);
  })
  .catch((error) => {
    // Handle any errors that occurred during the fetch
    console.error('There was a problem with the fetch operation:', error);
  });

const putUrl = 'http://localhost:3000/customers/2';
const updatedCustomer = new Customer(
  '2',
  'John Doe',
  'Open',
  70,
  -270,
  500,
  'This is a updated 2 test customer'
).toJSON();

fetch(putUrl, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: updatedCustomer,
})
  .then((response) => {
    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`Network response was not ok ${response.statusText}`);
    }
    // Parse the JSON from the response
    return response.json();
  })
  .then((data) => {
    // Handle the data from the response
    console.log(data);
  })
  .catch((error) => {
    // Handle any errors that occurred during the fetch
    console.error('There was a problem with the fetch operation:', error);
  });

// Define the URL for the DELETE request to delete customer with id 1
const deleteUrl = 'http://localhost:3000/customers/1';

// Make the DELETE request using fetch
fetch(deleteUrl, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => {
    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`Network response was not ok ${response.statusText}`);
    }
    // Parse the JSON from the response
    return response.json();
  })
  .then((data) => {
    // Handle the data from the response
    console.log('Customer deleted:', data);
  })
  .catch((error) => {
    // Handle any errors that occurred during the fetch
    console.error('There was a problem with the fetch operation:', error);
  });
