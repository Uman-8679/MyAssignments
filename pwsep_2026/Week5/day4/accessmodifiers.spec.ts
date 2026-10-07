
// Parent class
class BankAccount {

  // public - accessible everywhere
  public accountNumber: number;

  // private - accessible only inside this class
  private accountHolder: string;

  // protected - accessible inside this class and child classes
  protected balance: number;

  constructor(
    accountNumber: number,
    accountHolder: string,
    balance: number
  ) {
    this.accountNumber = accountNumber;
    this.accountHolder = accountHolder;
    this.balance = balance;
  }

  // Deposit money
  public deposit(amount: number): void {
    this.balance += amount;
    console.log(`Deposited: ${amount}`);
    console.log(`Current Balance: ${this.balance}`);
  }

  // Withdraw money
  public withdraw(amount: number): void {

    if (amount <= this.balance) {
      this.balance -= amount;
      console.log(`Withdrawn: ${amount}`);
      console.log(`Current Balance: ${this.balance}`);
    } else {
      console.log('Insufficient balance');
    }
  }

  // Access private property through public method
  public getAccountHolder(): string {
    return this.accountHolder;
  }
}


// Create object
const account = new BankAccount(
  1001,
  'Uma',
  5000
);


// Access properties directly from outside the class

console.log(account.accountNumber); 
// ✅ public - accessible

// console.log(account.accountHolder);
// ❌ private - Error

// console.log(account.balance);
// ❌ protected - Error


// Access methods
account.deposit(2000);
account.withdraw(1000);

console.log(account.getAccountHolder());


// Child class
class SavingsAccount extends BankAccount {

  public showAccountDetails(): void {

    // public property - accessible
    console.log('Account Number:', this.accountNumber);

    // protected property - accessible
    console.log('Balance:', this.balance);

    // private property - NOT accessible
    // console.log(this.accountHolder);
  }
}


// Create child class object
const savingsAccount = new SavingsAccount(
  2001,
  'Arun',
  10000
);

savingsAccount.showAccountDetails();


// From outside child class

console.log(savingsAccount.accountNumber);
// ✅ public - accessible

// console.log(savingsAccount.balance);
// ❌ protected - Error

// console.log(savingsAccount.accountHolder);
// ❌ private - Error
