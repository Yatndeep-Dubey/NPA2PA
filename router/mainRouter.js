const express = require('express')
const mainRouter = express()
const ejs = require('ejs')
const env = require('../environment/env')
mainRouter.set('view engine','ejs')
mainRouter.set('views','views')
mainRouter.use("/public",express.static('./public'));
mainRouter.use('/assets',express.static('assets'));
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
mainRouter.get('/admin/adminDashboard',(req,res)=>
{
    res.render('adminDashboard')
}
)
mainRouter.post('/admin/adminLogin',(req,res)=>
{
    try{
        if(req.body.admin_id==env.admin_id && req.body.admin_password==env.admin_password)
        {
            res.redirect('/admin/adminDashboard')
        }
        else
        {
            res.status(200).json('Invalid Credentials')
        }
    }
    catch(error)
    {
           console.log(error.message)
    }
   
})

module.exports = mainRouter