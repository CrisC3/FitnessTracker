const router = require("express").Router();
const mongo = require("mongodb");
const db = require("../models");
let browserTz = Date.now();

router.get("/workouts", async (req, res) => {

    // GET route local variables
    const lastWorkout = await db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: {$sum: "$exercises.duration"}
            }
        }
    ]);

    // Returns the variable as JSON
    res.json(lastWorkout);
});

router.get("/workouts/range", async (req, res) => {
    
    // GET route local date variables
    const startRangeDate = new Date(browserTz);
    startRangeDate.setDate(startRangeDate.getDate() - 8); // Sets the date back to 8 days
    startRangeDate.setHours(
        startRangeDate.getHours(),
        startRangeDate.getMinutes(),
        startRangeDate.getSeconds(),
        startRangeDate.getMilliseconds()); // Sets the time of 8 days back to midnight
        
    // GET route local variables
    let workoutRangeArr = [];
    const workoutRangeQuery = await db.Workout.aggregate([
        {
            $match: {
                day: {$gt: startRangeDate}
            }
        },
        {
            $project: {
                // day: {$substr: ["$day", 0, 10]},
                day: "$day",
                exercises: "$exercises",
                totalDuration: {$sum: "$exercises.duration"}
            }
        },        
        {$sort: {day: 1}}
    ]);
    let loop = 0;
    
    // Checks every the workoutRangeQuery data
    for await (const dailyWorkout of workoutRangeQuery) {
        console.log("******************************")
        console.log("In loop = " + loop++);
        
        // FOR-IN scope variables
        // let dailyWorkoutDay = dailyWorkout.day + "T" + startRangeDate.toISOString().split("T")[1];
        let workoutRangeObj = {};
        let dailyWorkoutDay = dailyWorkout.day;
        let dateSplit = new Date(dailyWorkoutDay).toISOString().split("T")[0];
        let newDay = new Date(dateSplit);
        let dayEntry = new Date(dateSplit);

        newDay.setHours(startRangeDate.getHours(), startRangeDate.getMinutes(), startRangeDate.getSeconds(), startRangeDate.getMilliseconds() + 1)
        dayEntry.setHours(startRangeDate.getHours(), startRangeDate.getMinutes(), startRangeDate.getSeconds(), startRangeDate.getMilliseconds())

        if (new Date(dailyWorkoutDay) > newDay) {
            console.log("TRUE");
            dayEntry.setDate(dayEntry.getDate() + 1)
        }
        console.log(newDay);
        console.log(dailyWorkoutDay);
        console.log(dayEntry);
        
        let finalDayEntry = dayEntry.toISOString();
        const found = workoutRangeArr.some(el => el.day === finalDayEntry);
        
        // Checks if found variable returns TRUE or FALSE, and reverses the condition
        if (!found) {
            
            // Adds brand new day entry, since found return FALSE, then condition was reversed
            workoutRangeObj.day = finalDayEntry;
            workoutRangeObj.exercises = dailyWorkout.exercises;
            workoutRangeObj.totalDuration = dailyWorkout.totalDuration;
            workoutRangeArr.push(workoutRangeObj);
        }
        else {
            
            // Updates existing entry workout.exercises
            // Find the element index of the existing date (day)
            let dayExistIndex = workoutRangeArr.findIndex(elem => elem.day == finalDayEntry);

            // If the for in variable, dailyWorkout day matches, then update by
            // adding existing exercises and total duration, into a single day
            if (finalDayEntry === workoutRangeArr[dayExistIndex].day) {
                workoutRangeArr[dayExistIndex].exercises.push(dailyWorkout.exercises[0]);
                workoutRangeArr[dayExistIndex].totalDuration += dailyWorkout.totalDuration;
            }
        }
    }
    
    // Returns the workoutRangeArr variable as JSON
    res.json(workoutRangeArr);
});

router.post("/workouts", async (req, res) => {

    //#region Creates new document in MongoDB then pulls ID
    // // POST route local variables
    // const newWorkout = await db.Workout.create({});

    // // Returns the variable as JSON
    // res.json(newWorkout);
    //#endregion

    // POST route local variables
    const ObjectId = mongo.ObjectID;
    const newWorkoutId = ObjectId();
    const newWorkoutObj = { _id: newWorkoutId};

    // Returns the variable as JSON
    res.json(newWorkoutObj);
});

router.put("/workouts/:id", async (req, res) => {
    
    // PUT route local variables
    const newWorkoutId = req.params.id;
    const newWorkout = req.body;
    const addWorkout = await db.Workout.create(
        {
            _id: newWorkoutId,
            day: Date.now(),
            exercises: {
                type: newWorkout.type,
                name: newWorkout.name,
                duration: newWorkout.duration,
                weight: newWorkout.weight,
                reps: newWorkout.reps,
                sets: newWorkout.sets,                
                distance: newWorkout.distance
            }
        }
    );
    
    // Returns the variable as JSON
    res.json(addWorkout);
});

router.post("/timezone", async (req, res) => {

    browserTz = req.body.dateTime;
   
    res.json(browserTz);
});

module.exports = router;