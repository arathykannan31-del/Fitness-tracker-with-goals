const express =
require("express");

const router =
express.Router();

const Workout =
require("../models/Workout");

const auth =
require("../middleware/authMiddleware");


// ADD WORKOUT
router.post(
"/",
auth,
async (req, res) => {

const workout =
await Workout.create({
userId:
req.user.id,

exerciseType:
req.body.exerciseType,

duration:
req.body.duration,

caloriesBurned:
req.body.caloriesBurned
});

res.json(workout);
});


// GET WORKOUTS
router.get(
"/",
auth,
async (req, res) => {

const workouts =
await Workout.find({
userId:
req.user.id
});

res.json(workouts);
});


// UPDATE
router.put(
"/:id",
auth,
async (req, res) => {

const workout =
await Workout.findByIdAndUpdate(
req.params.id,
req.body,
{
new: true
}
);

res.json(workout);
});


// DELETE
router.delete(
"/:id",
auth,
async (req, res) => {

await Workout.findByIdAndDelete(
req.params.id
);

res.json({
message:
"Workout Deleted"
});
});

module.exports =
router;