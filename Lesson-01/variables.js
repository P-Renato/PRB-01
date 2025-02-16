/*
A variable is pretty uch like a box containing a value that can vary over time.
You can daclare a variable is js using let, const or var ( do not use var)
*/

// LET - a variable that can be reassigned but cannot be redeclared

let age; // variable decalration
age = 6; // variable assignment

// we can do all at once
let myAge = 20; // daclaration and assignment
console.log(myAge); // not using a "" cos myAge is a variable
console.log("myAge"); // here myAge will spelled outas is cos it is a string of text due to the ""

console.clear(); // prevents the previous console logs from  showing up in the terminal

// creating new variable using LET
let myName = "Renato";
// assigning new valure to myName
myName = "Jill";
console.log(myName);

// Styles of naming variables
// CAMEL CASE
let myYoungerCat = "Vera"; // most common in Js
// SNAKE CASE
let my_younger_cat = "Vera";
// NO STYLE
let myyoungercat = "Vera"; // hard to read

console.clear();

// Creating a variable using CONST
// Cannot be redecalred or reassigned
// In general we use CONST unless we truly need to use LET

const lastName = "Smith";
console.log(lastName);
// lastName = "Johnson"; // this will throw an error cos we are trying to reassign a const variable


// trying to access a variable before it is declared is a no-go!

// console.log(futureDog); Error - Cannot access 'futureDog' before initialization
let futureDog = "Rex";


// Do not try this at home..
console.log(strange);
var strange = "Hello"; // Do not use var even though you will see it a lot in OLD materials and old codebsases
