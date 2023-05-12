"use strict";
// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

let currentAccount;
let sorted = false;

function displayMovements(movements, sort = false) {
  containerMovements.innerHTML = "";
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (movement, i) {
    const type = movement > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${movement}€</div>
    </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}
function displayCalcBalance(account) {
  account.balance = account.movements.reduce((acc, curr) => acc + curr);
  labelBalance.textContent = `${account.balance}€`;
}
function displayCalcSummary(account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr);
  labelSumIn.textContent = `${incomes}€`;
  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumInterest.textContent = `${interest}€`;
}

function createUserNames(accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map(name => name[0])
      .join("");
  });
}
createUserNames(accounts);

// Update UI
function updateUI(account) {
  displayMovements(account.movements);
  displayCalcBalance(account);
  displayCalcSummary(account);
}

// Login
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  const currentAcc = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  if (currentAcc?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome Back, ${
      currentAcc.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginUsername.blur();
    inputLoginPin.blur();
    currentAccount = currentAcc;
    updateUI(currentAccount);
  }
});

// Transfer Money
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAccount?.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    receiverAccount?.movements.push(amount);
    updateUI(currentAccount);
    inputTransferAmount.value = inputTransferTo.value = "";
    inputTransferAmount.blur();
    inputTransferTo.blur();
  }
});

// Request Loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov > amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
  inputLoanAmount.blur();
});

// Close Account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === inputCloseUsername.value
    );
    accounts.splice(index, 1);
    labelWelcome.textContent = `Log in to get started`;
    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = "";
    inputCloseUsername.blur();
    inputClosePin.blur();
  }
});

// sort movements
btnSort.addEventListener("click", function () {
  sorted = !sorted;
  displayMovements(currentAccount.movements, sorted);
});
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// Array methods
// const arr = ["a", "b", "c", "d", "e"];
/*
// slice
//                  (from, to)
console.log(arr.slice(1, 3));

// splice, it mutates the original array
//     (from,no of elements)
arr.splice(2, 2);
console.log(arr);

// reverse, it mutates the original array
const arr2 = ["j", "i", "h", "g", "f"];
arr2.reverse();
console.log(arr2);

// concat
const letters = arr.concat(arr2);
console.log(letters);

// join
console.log(letters.join("_"));

// at method
console.log(arr2.at(-1));
*/
/*
// forEach
movements.forEach(function (movement, index, array) {
  if (movement > 0) console.log(`${index + 1}: You deposited ${movement}`);
  else console.log(`${index + 1}: You withdrew ${Math.abs(movement)}`);
});
// using map
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
// using set
const currenciesUnique = new Set(["INR", "USD", "EUR", "USD", "EUR"]);
currenciesUnique.forEach(function (value, _, set) {
  console.log(value);
});
*/
/*
// map method
const eurToUsd = 1.1;
const movementsUSD = movements.map(mov => mov * eurToUsd);
// console.log(movementsUSD);

const movementsDescription = movements.map(
  (mov, i) =>
    `${i + 1}: You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(mov)}`
);
console.log(movementsDescription.join("\n"));
*/
/*
// filter method
const deposits = movements.filter(mov => mov > 0);
const withdrawals = movements.filter(mov => mov < 0);
console.log(movements, withdrawals, deposits);

// reduce method
const balance = movements.reduce(function (acc, curr, i, arr) {
  return acc + curr;
}, 0);
console.log(balance);

const maxmovement = movements.reduce(
  (acc, curr) => (curr > acc ? curr : acc),
  movements[0]
);
console.log(maxmovement);
*/
/*
// find method
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);
const account = accounts.find(acc => acc.owner === "Jessica Davis");
console.log(account);
*/
/*
// some method
const anyDeposits = movements.some(mov => mov >= 2000);
console.log(anyDeposits);

// every method
console.log(movements.every(mov => mov > 0));
const everyDeposits = account4.movements.every(mov => mov > 0);
console.log(everyDeposits);
*/
/*
// flat method
const arr = [1, [2, 3, 4, 5], 6, 7, 8, 9, 10, [11, 12]];
const arrDeep = [[1, [2, 3], 4, [5, 6]], 7, 8, 9, 10, [11, 12]];
console.log(arr.flat());
console.log(arrDeep.flat(2));

const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, curr) => acc + curr);
console.log(overallBalance);

// flatMap
const overallBalance2 = accounts
.flatMap(acc => acc.movements)
.reduce((acc, curr) => acc + curr, 0);
console.log(overallBalance2);

const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, curr) => sum + curr);
console.log(bankDepositSum);

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((num, curr) => (curr >= 1000 ? ++num : num), 0);
console.log(numDeposits1000);

const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sum, mov) => {
      sum[mov > 0 ? "deposits" : "withdrawals"] += mov;
      return sum;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);
*/

/*
// sort with Strings
const str = ["John", "Bob", "Michael", "steven"];
console.log(str.sort());

// sort with Numbers

movements.sort((a, b) => a - b);
console.log(movements);
*/
/*
// empty array
const arr = new Array(6);
// fill method
arr.fill(6);
console.log(arr);
const x = [1, 2, 3, 4, 5, 6];
//   (n, from, to)
x.fill(4, 0, 4);
console.log(x);

// Array.from
const z = Array.from({ length: 6 }, (_, i) => i + 1);
console.log(z);

labelBalance.addEventListener("click", function () {
  const movementsUI = Array.from(
    document.querySelectorAll(".movements__value"),
    el => Number(el.textContent.replace("€", ""))
  );
  console.log(movementsUI);
});
*/
/*
function convertTitleCase(title) {
  const exceptions = ["a", "an", "and", "the", "but", "or", "on", "in", "with"];
  const capitalize = str => str.replace(str[0], str[0].toUpperCase());
  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(" ");
  return capitalize(titleCase);
}
console.log(convertTitleCase("this is a nice title"));
console.log(convertTitleCase("this is a LONG title but not too long"));
console.log(convertTitleCase("and here is another title with an EXAMPLE"));
*/
