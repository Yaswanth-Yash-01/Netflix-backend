const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async(req,res)=>{
    const {username,email,password} = req.body;

    const existingUser = await User.findOne({email});
    if(existingUser) return res.status(400).json({msg: "User already exists"});

    const hashpassword = await bcrypt.hash(password,10);

    const newUser = new User({username: req.body.username,
      email: req.body.email,
      password: hashpassword});
    await newUser.save();

    res.status(201).json({msg: "User registered"})
}

exports.login = async(req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email});
    if(!user) return res.status(400).json({msg: "User not found"});

    const isMatch  = await bcrypt.compare(password,user.password);
     if(!isMatch) return res.status(400).json({msg:"Wrong Password"})
     console.log('JWT Secret:', process.env.JWT_SECRET); 
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn : "60m"})

    res.json({token,user : {id:user._id, username:user.username}})
}

