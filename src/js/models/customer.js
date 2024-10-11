class Customer {
  constructor(
    id,
    name,
    status,
    rate,
    balance,
    deposit,
    description,
    currency = 'CAD',
    symbol = '$'
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.rate = rate;
    this.balance = balance;
    this.deposit = deposit;
    this.description = description;
    this.currency = currency;
    this.symbol = symbol;
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
      currency: this.currency,
      symbol: this.symbol,
    });
  }
}

export default Customer;
