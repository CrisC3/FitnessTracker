const router = require("express").Router();
const db = require("../models");

router.get("/workouts/range", async (req, res) => {
    
    let workoutRangeArr = [];
    const workoutRangeQuery = await await db.Workout.aggregate([
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
    
    for await (const dailyWorkout of workoutRangeQuery) {
        
        let workoutRangeObj = {};
        const found = workoutRangeArr.some(el => el.day === dailyWorkout.day);
        
        if (!found) {
            workoutRangeObj.day = dailyWorkout.day;
            workoutRangeObj.exercises = dailyWorkout.exercises;
            workoutRangeObj.totalDuration = dailyWorkout.totalDuration;
            workoutRangeArr.push(workoutRangeObj);
        }
        else {
            for(let i = 0; i < workoutRangeArr.length; i++) {
                if (dailyWorkout.day == workoutRangeArr[i].day) {
                    workoutRangeArr[i].exercises.push(dailyWorkout.exercises[0]);
                    workoutRangeArr[i].totalDuration += dailyWorkout.totalDuration;
                    break;
                }
            }
        }
        
    }

    console.log(workoutRangeArr);

    res.json(workoutRangeArr);
});

module.exports = router;