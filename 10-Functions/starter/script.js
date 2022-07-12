'use strict';

////////////////////////////////
// The Call and Apply Methods //
////////////////////////////////
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function () {} - old syntax
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode} ${flightNum}`, name });
  },
};

lufthansa.book(239, 'Arkadii Cheprasov');
lufthansa.book(666, 'John Smith');
console.log(lufthansa);

const eurowings = {
  name: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

// Call Method
const book = lufthansa.book;
// Does not work
// book(23, 'Sarah Williams');
book.call(eurowings, 23, 'Sarah Williams');
book.call(lufthansa, 239, 'Mary Cooper');

const swiss = {
  name: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 539, 'Mary Cooper');
console.log(swiss);

// Apply Method
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData);

///////////////////////////////////
// Functions Returning Functions //
///////////////////////////////////
// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greeterHey = greet('Hey');
// greeterHey('Arkadii');
// greeterHey('Jonas');

// greet('Hello')('Arkadii');

// const greet2 = greeting => {
//   return name => {
//     console.log(`${greeting} ${name}`);
//   };
// }; // Yes but:
// const greetGenius = greeting => name => console.log(`${greeting} ${name}`);

// greet2('Hey')('Arkadii2');
// greetGenius('Hey')('Arkadii23');

////////////////////////////////////////////
// Functions Accepting Callback Functions //
////////////////////////////////////////////
// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// // Higher-order function
// const transformer = function (str, fnc) {
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string: ${fnc(str)}`);
//   console.log(`Transformed by: ${fnc.name}`);
// };

// transformer('Javascript is the best!', upperFirstWord);
// transformer('Javascript is the best!', oneWord);

// // JS uses callback all the time
// const high5 = function () {
//   console.log('High five');
// };

// document.body.addEventListener('click', high5);
// ['Arkadii', 'Jonas', 'Martha'].forEach(high5);

/////////////////////////////////////////////////////
// How Passing Arguments Works: Value vs Reference //
/////////////////////////////////////////////////////
// const flight = 'LH234';
// const arkadii = {
//   name: 'Arkadii Cheprasov',
//   passport: 2017025099,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999';
//   passenger.name = 'Mr. ' + passenger.name;

//   if (passenger.passport === 2017025099) {
//     alert('Check in');
//   } else {
//     alert('Wrong passport');
//   }
// };

// checkIn(flight, arkadii);
// console.log(flight);
// console.log(arkadii);

// Is the same as doing:
// const flightNum = flight;
// const passenger = arkadii;

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 1000000000000);
// };

// newPassport(arkadii);
// checkIn(flight, arkadii);

/////////////////////////
// Default Paramteters //
/////////////////////////
// const bookings = [];

// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('H123', 2, 800);
// createBooking('H123', 2);
// createBooking('H123', 5);
