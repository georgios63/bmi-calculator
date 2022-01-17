//console.log("What does process.argv contain?", process.argv);
//data given from user (terminal control)

const weightInKg = parseInt(process.argv[2]);
const heightInM = parseFloat(process.argv[3]);
const age = parseInt(process.argv[4]);
const dailyExercise = process.argv[5];
const gender = process.argv[6];


if (process.argv.length !== 7) {
  console.log(`
    You gave ${process.argv.length - 2} arguments(s) to the program

    Please provide 5 arguments for

    weight (kg), 
    height (m), 
    age (years), 
    whether you exercise daily (yes or no)
    and your gender (m or f)

    Example:

    $ node index.js 82 1.79 32 yes m
  `);

  process.exit();
}

if (isNaN(weightInKg) || isNaN(heightInM) || isNaN(age)) {
  console.log(`
    Please make sure weight, height and age are numbers:

    weight (kg) example: 82 | your input: ${process.argv[2]}
    height (m) example 1.79 | your input: ${process.argv[3]}
    age (years) example 32  | your input: ${process.argv[4]} 

    $ node index.js 82 1.79 32 yes m
  `);

  process.exit();
}

if (age < 20) {
  console.log(`
    Please make sure your age is above 20 years old!
    Our application only accepts age 20+

    age (years) example 22  | your input: ${process.argv[4]} 
  `);

  process.exit();
}

if (weightInKg < 30 || weightInKg > 300) {
  console.log(`
    Please enter a weight in kgs
    
    Your weight of ${weightInKg} kgs does not fall in the range between 30 kg and 300 kg

    If you weight is below 30 kg or over 300 kg seek professional medical help
  `);

  process.exit();
}

if (dailyExercise !== "yes" && dailyExercise !== "no") {
  console.log(`
    Please specify wether you exercise daily with yes or no

    You entered: ${dailyExercise}

    (Don't worry, we won't judge you if you enter no)
  `);

  process.exit();
}

//The formula needed for the calculations
const BMI = weightInKg / (heightInM * heightInM);
const idealWeight = 22.5 * (heightInM * heightInM);

let BMR = (10 * weightInKg) + (6.25 * (heightInM * 100)) - (5 * age);
BMR = gender === "m" ? BMR + 50 : BMR - 150;

const dailyCalories = dailyExercise === "yes" ? BMR * 1.6 : BMR * 1.4;


// Rounded up formulas 
const roundedBMI = Math.round(BMI);
const roundedIdealWeight = Math.round(idealWeight);
const roundedBMR = Math.round(BMR);
const roundedDailyCalories = Math.round(dailyCalories);


const weightToLose = weightInKg - roundedIdealWeight;
const weightToGain = weightToLose < 0 ? Math.abs(weightToLose) : weightToLose;

const timeForIdealWeight = idealWeight > weightInKg
  ? Math.abs(weightToGain / 0.5)
  : weightToLose / 0.5;

const calloriesNeededToConsume = idealWeight > weightInKg
  ? roundedDailyCalories + 500
  : roundedDailyCalories - 500;


console.log("weight:", weightInKg);
console.log("height:", heightInM);
console.log("weightToLose:", weightToLose);
console.log("weightToGain:", weightToGain);
console.log("timeForIdealWeightLoss:", timeForIdealWeight, "weeks");

if (idealWeight < weightInKg) {
  console.log(`
**************
BMI CALCULATOR
**************

age: ${age}
gender: ${gender}
height: ${heightInM}
weight: ${weightInKg}
daily exercise: ${dailyExercise}

****************
FACING THE FACTS
****************

Your BMI is ${roundedBMI}

A BMI under 18.5 is considered underweight
A BMI above 25 is considered overweight

Your ideal weight is ${roundedIdealWeight}

Every day you get ${roundedDailyCalories} calories based on your BMR

The weight you need to lose is ${weightToLose}kg and that will take you ${timeForIdealWeight} weeks

The amount of callories you need to consume in order to achieve your ideal weight in that time table 
are ${calloriesNeededToConsume}

`);
} else {
  console.log(`
**************
BMI CALCULATOR
**************

age: ${age}
gender: ${gender}
height: ${heightInM}
weight: ${weightInKg}
daily exercise: ${dailyExercise}

****************
FACING THE FACTS
****************

Your BMI is ${roundedBMI}

A BMI under 18.5 is considered underweight
A BMI above 25 is considered overweight

Your ideal weight is ${roundedIdealWeight}

Every day you get ${roundedDailyCalories} calories based on your BMR

The weight you need to gain is ${weightToGain}kg and that will take you ${timeForIdealWeight} weeks

The amount of callories you need to consume in order to achieve your ideal weight in that time table 
are ${calloriesNeededToConsume}
`);
}