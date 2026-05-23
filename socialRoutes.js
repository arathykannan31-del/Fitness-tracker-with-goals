const express =
require("express");

const router =
express.Router();

const Post =
require("../models/Post");

const auth =
require("../middleware/authMiddleware");


// CREATE POST
router.post(
"/post",
auth,
async (req, res) => {

try {

const newPost =
await Post.create({
userId:
req.user.id,

text:
req.body.text
});

res.status(201)
.json(newPost);

} catch (error) {
res.status(500)
.json({
message:
error.message
});
}
});


// GET ALL POSTS
router.get(
"/posts",
auth,
async (req, res) => {

try {

const posts =
await Post.find()
.populate(
"userId",
"name email"
)
.sort({
createdAt: -1
});

res.json(posts);

} catch (error) {
res.status(500)
.json(error);
}
});


// LIKE POST
router.put(
"/like/:id",
auth,
async (req, res) => {

try {

const post =
await Post.findById(
req.params.id
);

if (
post.likes.includes(
req.user.id
)
) {
return res.status(400)
.json({
message:
"Already liked"
});
}

post.likes.push(
req.user.id
);

await post.save();

res.json(post);

} catch (error) {
res.status(500)
.json(error);
}
});


// COMMENT POST
router.put(
"/comment/:id",
auth,
async (req, res) => {

try {

const post =
await Post.findById(
req.params.id
);

post.comments.push({
userId:
req.user.id,

text:
req.body.text
});

await post.save();

res.json(post);

} catch (error) {
res.status(500)
.json(error);
}
});

module.exports =
router;