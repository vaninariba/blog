const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')
router.get(('/admin'),(req,res)=>{
    res.render('users/signin')
})
router.post(('/users/signin'),passport.authenticate('local',{
    successRedirect:'/posts',
    failureRedirect: '/users/signin',
    failureFlash: true
}))
router.get(('/register'),(req,res)=>{
    res.render('users/signup')
})
router.post(('/users/signup'),async (req,res)=>{
    const {nombre,email,password,confirm_password}= req.body
    const errors =[]
    if (password!=confirm_password){
        errors.push({text:'Las contraseñas no coinciden'})
    }
    if(errors.length>0){
        res.render(('users/signup'),{errors,nombre,email,password,confirm_password})
    }
    else{
        
        const newUser = new User({nombre,email,password})
        newUser.password = await newUser.encryptPassword(password)
        await newUser.save()
        res.redirect('/users/signin')
    }
})

module.exports = router