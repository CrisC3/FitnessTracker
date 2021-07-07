const router = require("express").Router();
const mongo = require("mongodb");
const db = require("../models");

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
    const getRangeDate = new Date();
    getRangeDate.setDate(getRangeDate.getDate() - 7); // Sets the date back to 7 days
    getRangeDate.setHours(0, 0, 0, 0); // Sets the time of 7 days back to midnight
    
    // GET route local variables
    let workoutRangeArr = [];
    const workoutRangeQuery = await db.Workout.aggregate([
        {$match: {"day": {$gt: getRangeDate}}},
        {
            $project: {
                day: {$substr: ["$day", 0, 10]},
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
        let dailyWorkoutDay = dailyWorkout.day + "T" + getRangeDate.toISOString().split("T")[1];
        const found = workoutRangeArr.some(el => el.day === dailyWorkoutDay);
        
        // Checks if found variable returns TRUE or FALSE, and reverses the condition
        if (!found) {
            
            // Adds brand new day entry, since found return FALSE, then condition was reversed
            workoutRangeObj.day = dailyWorkoutDay;
            workoutRangeObj.exercises = dailyWorkout.exercises;
            workoutRangeObj.totalDuration = dailyWorkout.totalDuration;
            workoutRangeArr.push(workoutRangeObj);
        }
        else {
            
            // Updates existing entry workout.exercises
            // Find the element index of the existing date (day)
            let dayExistIndex = workoutRangeArr.findIndex(elem => elem.day == dailyWorkoutDay);

            // If the for in variable, dailyWorkout day matches, then update by
            // adding existing exercises and total duration, into a single day
            if (dailyWorkoutDay === workoutRangeArr[dayExistIndex].day) {
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

module.exports = router;