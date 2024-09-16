import { v4 as uuidv4 } from 'uuid';
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

const url = 'http://localhost:3000/customers';
httpRequest('GET', null, url);

const newUuid = uuidv4();
const newCustomer = new Customer(
  newUuid,
  'John Boe',
  'Due',
  0.05,
  2000,
  600,
  'A new test customer'
);
httpRequest('POST', newCustomer.toJSON(), url);

const putUrl = 'http://localhost:3000/customers/8434960a-b06b-4dc9-98b9-d6306de7cdad';
const updatedCustomer = new Customer(
  newUuid,
  'John Doe',
  'Open',
  0.05,
  2000,
  600,
  'An updated test customer'
);

httpRequest('PUT', updatedCustomer.toJSON(), putUrl);
httpRequest('DELETE', null, 'http://localhost:3000/customers/5b4f0c09-6f57-4467-8cad-23c11a65afe1');
