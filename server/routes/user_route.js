const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user");


router.put(
  "/register",
  async (req, res, next) => {
    // console.log("route register");
    // console.log("body =", req.body);
    try {
      const { username, password } = req.body;
      if(!username) return res.status(400).json({ error: "Username is empty" });
      if(!password || password.length < 8) return res.status(400).json({ error: "Password must be at least 8 carracter long" });
      // console.log(username, password);
      const user = await User.findOne({ "local.username": username });
      if (user) return res.status(400).json({ error: "Username already used" });
      const newUser = await User.create({ local: { username, password } });
      await newUser.save();
      next();
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal server error" });
    }
  },
  passport.authenticate("local"), (req, res)=> res.status(201).json({userId: req.user._id})
);

router.post(
  "/login",
  passport.authenticate("local"), (req, res)=> res.status(200).json({userId: req.user._id})
);

router.get('/getUserInfos/:id', async (req, res)=>{
  try {
    const id = req.params.id;
    // console.log("get user info by id =", id)
    const user = await User.findById(id);
    if(user){
      if(user.local){
        return res.status(200).json({username: user.local.username})
      }else{
        res.status(400).json({error: 'User not found'})
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'server error'})
  }
})

module.exports = router;
