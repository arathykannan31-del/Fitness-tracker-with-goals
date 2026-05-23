const express =
require("express");

const router =
express.Router();

const Diet =
require("../models/Diet");

const auth =
require("../middleware/authMiddleware");


// ADD DIET
router.post(
"/",
auth,
async (req, res) => {

const diet =
await Diet.create({
userId:
req.user.id,

foodItem:
req.body.foodItem,

calories:
req.body.calories,

mealType:
req.body.mealType
});

res.json(diet);
});


// GET DIET
router.get(
"/",
auth,
async (req, res) => {

const diets =
await Diet.find({
userId:
req.user.id
});

res.json(diets);
});


// UPDATE
router.put(
"/:id",
auth,
async (req, res) => {

const updated =
await Diet.findByIdAndUpdate(
req.params.id,
req.body,
{
new: true
}
);

res.json(updated);
});


// DELETE
router.delete(
"/:id",
auth,
async (req, res) => {

await Diet.findByIdAndDelete(
req.params.id
);

res.json({
message:
"Diet Deleted"
});
});

module.exports =
router;