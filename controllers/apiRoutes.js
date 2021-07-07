const router = require("express").Router();
const db = require("../models");

router.get("/workouts", async (req, res) => {
    
    // FUNCTION top-level, local variables
    const lastWorkout = await db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: {$sum: "$exercises.duration"}
            }
        }
    ]);
    
    // Returns the workoutRangeArr variable as JSON
    res.json(lastWorkout);
});

router.get("/workouts/range", async (req, res) => {
    
    // FUNCTION top-level, local variables
    let workoutRangeArr = [];
    const workoutRangeQuery = await db.Workout.aggregate([
        {
            $project: {
                day: {$substr: ["$day", 0, 10]},
                // day: "$day",
                exercises: "$exercises",
                totalDuration: {$sum: "$exercises.duration"}
            }
        },
        {$sort: {day: 1}}
    ]);
    
    // Checks every the workoutRangeQuery data
    for await (const dailyWorkout of workoutRangeQuery) {
        
        // FOR-IN scope variables
        let workoutRangeObj = {};
        const found = workoutRangeArr.some(el => el.day === dailyWorkout.day);
        
        // Checks if found variable returns TRUE or FALSE, and reverses the condition
        if (!found) {

            // Adds brand new day entry, since found return FALSE, then condition was reversed
            workoutRangeObj.day = dailyWorkout.day;
            workoutRangeObj.exercises = dailyWorkout.exercises;
            workoutRangeObj.totalDuration = dailyWorkout.totalDuration;
            workoutRangeArr.push(workoutRangeObj);
        }
        else {
            
            // Updates existing entry workout.exercises
            // Find the element index of the existing date (day)
            let dayExistIndex = workoutRangeArr.findIndex(elem => elem.day == dailyWorkout.day);

            // If the for in variable, dailyWorkout day matches, then update by
            // adding existing exercises and total duration, into a single day
            if (dailyWorkout.day == workoutRangeArr[dayExistIndex].day) {
                workoutRangeArr[dayExistIndex].exercises.push(dailyWorkout.exercises[0]);
                workoutRangeArr[dayExistIndex].totalDuration += dailyWorkout.totalDuration;
            }

            //#region previous code
            // for(let i = 0; i < workoutRangeArr.length; i++) {
            //     if (dailyWorkout.day == workoutRangeArr[i].day) {
            //         workoutRangeArr[i].exercises.push(dailyWorkout.exercises[0]);
            //         workoutRangeArr[i].totalDuration += dailyWorkout.totalDuration;
            //         break;
            //     }
            // }
            //#endregion
        }
        
    }
    
    // Returns the workoutRangeArr variable as JSON
    res.json(workoutRangeArr);
});

router.post("/workouts", async (req, res) => {
    console.log("****************** /workouts");
    console.log(req.body);
    res.json("POST workouts");
});

router.put("/workouts/:id", async (req, res) => {
    console.log("****************** /workouts/:id");
    console.log(req.body);
    res.json("POST workouts");
});

module.exports = router;