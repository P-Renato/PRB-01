/*
Very often we want to execute code only if a certain condition is met.
In that case we can use conditional statements like IF ElSE

IF ELSE executes some logic if the specified condition is met... and executes something else
IF not.
*/

const age = 41; // let's pretend this value comes from the BE or via user input

if (age > 18) { // is age greater than 18? if true procced to line 12 eles jumo to line 14
    console.log("Would like some juice or some beer?")
} else {
    console.log("Would you like some juice?")
}

console.clear();

// Multiple conditionals
// IF - ELSE IF - ELSE

// reassign the value of age

age = -1;

if(age > 90){
    console.log("Impressive age");
} else if (age > 70) {
    console.log("Retired or still working>")
} else if (age > 50){
    console.log("I am going to get there soon")
} else if (age > 18){
    console.log("Party hard")
} else {
    console.log("not born yet")
}

// you can have several else if statements but only one else statement