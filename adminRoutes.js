const express =
require("express");

const router =
express.Router();

const User =
require("../models/User");

const Workout =
require("../models/Workout");

const Diet =
require("../models/Diet");

const Goal =
require("../models/Goal");

const auth =
require("../middleware/authMiddleware");


// ADMIN CHECK
const adminOnly =
(req, res, next) => {

if (
req.user.role !==
"admin"
) {
return res.status(403)
.json({
message:
"Access Denied"
});
}

next();
};


// GET ALL USERS
router.get(
"/users",
auth,
adminOnly,
async (req, res) => {

try {

const users =
await User.find()
.select("-password");

res.json(users);

} catch (error) {
res.status(500)
.json(error);
}
});


// BLOCK USER
router.put(
"/block/:id",
auth,
adminOnly,
async (req, res) => {

try {

const user =
await User.findByIdAndUpdate(
req.params.id,
{
blocked: true
},
{
new: true
}
);

res.json({
message:
"User Blocked",
user
});

} catch (error) {
res.status(500)
.json(error);
}
});


// UNBLOCK USER
router.put(
"/unblock/:id",
auth,
adminOnly,
async (req, res) => {

try {

const user =
await User.findByIdAndUpdate(
req.params.id,
{
blocked: false
},
{
new: true
}
);

res.json({
message:
"User Unblocked",
user
});

} catch (error) {
res.status(500)
.json(error);
}
});


// DELETE USER
router.delete(
"/delete/:id",
auth,
adminOnly,
async (req, res) => {

try {

await User.findByIdAndDelete(
req.params.id
);

await Workout.deleteMany({
userId:
req.params.id
});

await Goal.deleteMany({
userId:
req.params.id
});

await Diet.deleteMany({
userId:
req.params.id
});

res.json({
message:
"User Deleted"
});

} catch (error) {
res.status(500)
.json(error);
}
});


// SYSTEM DATA
router.get(
"/stats",
auth,
adminOnly,
async (req, res) => {

try {

const totalUsers =
await User.countDocuments();

const totalWorkouts =
await Workout.countDocuments();

const totalDiets =
await Diet.countDocuments();

const totalGoals =
await Goal.countDocuments();

res.json({
totalUsers,
totalWorkouts,
totalDiets,
totalGoals
});

} catch (error) {
res.status(500)
.json(error);
}
});

module.exports =
router;