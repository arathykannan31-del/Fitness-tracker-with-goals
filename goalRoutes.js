const express =
require("express");

const router =
express.Router();

const Goal =
require("../models/Goal");

const auth =
require("../middleware/authMiddleware");


// ADD GOAL
router.post(
"/",
auth,
async (req, res) => {

try {

const goal =
await Goal.create({
userId:
req.user.id,

weightGoal:
req.body.weightGoal,

calorieTarget:
req.body.calorieTarget,

stepTarget:
req.body.stepTarget
});

res.status(201)
.json(goal);

} catch (error) {
res.status(500)
.json(error);
}
});


// GET GOALS
router.get(
"/",
auth,
async (req, res) => {

const goals =
await Goal.find({
userId:
req.user.id
});

res.json(goals);
});


// UPDATE GOAL
router.put(
"/:id",
auth,
async (req, res) => {

const updatedGoal =
await Goal.findByIdAndUpdate(
req.params.id,
req.body,
{
new: true
}
);

res.json(updatedGoal);
});


// DELETE GOAL
router.delete(
"/:id",
auth,
async (req, res) => {

await Goal.findByIdAndDelete(
req.params.id
);

res.json({
message:
"Goal Deleted"
});
});

module.exports =
router;