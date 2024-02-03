const express = require('express')
const mainRouter = express()
const ejs = require('ejs')
const env = require('../environment/env')
const adminauth = require('../middleware/adminauth')
mainRouter.set('view engine','ejs')
mainRouter.set('views','views')
mainRouter.use("/public",express.static('./public'));
mainRouter.use('/assets',express.static('assets'));
const bodyParser = require('body-parser')
mainRouter.use(bodyParser.urlencoded({extended:true}))
const session = require('express-session');
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
mainRouter.get('/admin/adminBooking',adminauth.adminisLogin,(req,res)=>
{
    res.render('adminBooking')
})
mainRouter.get('/admin/adminDownload',adminauth.adminisLogin,(req,res)=>
{
    res.render('adminDownload')
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

mainRouter.get('/exchange',(req,res)=>
{
    res.render('exchange')
}
)
mainRouter.get('/NPA2PA',(req,res)=>
{
    res.render('NPA2PA')
}
)
mainRouter.get('/trouble',(req,res)=>
{
    res.render('trouble')
}
)
mainRouter.get('/property',(req,res)=>
{
    res.render('property')
}
)
module.exports = mainRouter