const express =
require("express");

const router =
express.Router();

const User =
require("../models/User");

const Workout =
require("../models/Workout");

const Goal =
require("../models/Goal");

const auth =
require("../middleware/authMiddleware");


// GET PROFILE
router.get(
"/",
auth,
async (req, res) => {

try {

const user =
await User.findById(
req.user.id
).select("-password");

const workouts =
await Workout.find({
userId:
req.user.id
});

const goals =
await Goal.find({
userId:
req.user.id
});

res.json({
user,
goals,
workouts
});

} catch (error) {
res.status(500)
.json(error);
}
});


// UPDATE PROFILE
router.put(
"/update",
auth,
async (req, res) => {

try {

const updatedUser =
await User.findByIdAndUpdate(
req.user.id,
req.body,
{
new: true
}
).select("-password");

res.json({
message:
"Profile Updated",
updatedUser
});

} catch (error) {
res.status(500)
.json(error);
}
});

module.exports =
router;