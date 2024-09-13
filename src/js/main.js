import httpRequest from './utils';

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

export default Customer;

const url = 'http://localhost:3000/customers/1';
httpRequest('GET', null, url);

const postUrl = 'http://localhost:3000/customers';
const newCustomer = new Customer('5', 'John Boe', 'Due', 0.05, 2000, 600, 'A new test customer');
httpRequest('POST', newCustomer.toJSON(), postUrl);

const putUrl = 'http://localhost:3000/customers/2';
const updatedCustomer = new Customer(
  '2',
  'John Doe',
  'Open',
  0.05,
  2000,
  600,
  'An updated test customer'
);

httpRequest('PUT', updatedCustomer.toJSON(), putUrl);
httpRequest('DELETE', null, 'http://localhost:3000/customers/3');
