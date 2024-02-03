const express = require('express')
const mainRouter = express()
const ejs = require('ejs')
const env = require('../environment/env')
const adminauth = require('../middleware/adminauth')
mainRouter.set('view engine','ejs')
mainRouter.set('views','views')
mainRouter.use("/public",express.static('./public'));
mainRouter.use('/assets',express.static('assets'));
const userModel = require('../models/userModel')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
mainRouter.use(bodyParser.urlencoded({extended:true}))
const session = require('express-session');
mainRouter.use(cookieParser())
mainRouter.use(session(
    {
        secret:"Mysecret",
        resave:false,
        saveUninitialized:false
    }
))
mainRouter.get('/',(req,res)=>
{
    res.render('index')
}
)

mainRouter.get('/admin/adminLogin',(req,res)=>
{
    res.render('adminLogin')
}
)
mainRouter.get('/admin/adminDashboard',adminauth.adminisLogin,(req,res)=>
{
    res.render('adminDashboard')
})

mainRouter.post('/admin/adminLogin',(req,res)=>
{
    try
    {
      
        
        if(env.admin_id == req.body.admin_id && env.admin_password == req.body.admin_password)
        {
            req.session.admin_id = req.body.admin_id
            return res.status(200).json("Login Successful")
        }
        else
        {
            return res.status(400).json("Invalid Credentials")
        }
    }
    catch(error)
    {
        console.log(error.message)
    }
    
})

mainRouter.get('/admin/booking',(req,res)=>
{
    res.render('booking')
})
mainRouter.get('/exchange',(req,res)=>
{
    res.render('exchange')
})

mainRouter.get('/login',(req,res)=>
{
    res.render('login')
})


const generateOtp = ()=>
{
    return Math.floor(1000 + Math.random() * 9000)
}

mainRouter.post('/login',async (req,res)=>
{
    if(req.body.mobile.length != 10 )
    {
        return res.status(400).json("Invalid Mobile Number")
    }
    try
    {
        const user = await userModel.findOne({mobile:req.body.mobile})
        if(user)
        {
            const otp = generateOtp()
            await userModel.findOneAndUpdate({mobile:req.body.mobile},{otp:otp})
            return res.status(200).json({otp:otp.toString(),mobile:req.body.mobile,name:req.body.name})
            
        }
        else
        {
            await userModel.create(req.body)
            const otp = generateOtp()
            await userModel.findOneAndUpdate({mobile:req.body.mobile},{otp:otp})
            return res.status(200).json({otp:otp.toString(),mobile:req.body.mobile,name:req.body.name})
        }
    }
    catch(error)
    {
        console.log(error.message)
    }
    
})

mainRouter.get('/verify-otp',(req,res)=>
{

    res.render('loginOTP',{mobile:req.query.mobile,name:req.query.name})
})
mainRouter.post('/verify-otp',async (req,res)=>{
   try
   {
         const user = await userModel.findOne({mobile:req.body.mobile})
            if(user.otp == req.body.otp)
            {
                res.cookie('user_name',user.name)
                res.cookie('user_mobile',user.mobile)
                return res.status(200).json("Login Successful")
            }
            else
            {
                return res.status(400).json("Invalid Otp")
            }
   }
   catch(error)
   {
       console.log(error.message)
   }
})
mainRouter.get('/logout',(req,res)=>
{
    res.clearCookie('user_mobile');
    res.clearCookie('user_name')
	res.redirect('/');
})
module.exports = mainRouter

