const express = require('express')
const mainRouter = express()
const ejs = require('ejs')

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
mainRouter.get('/howtofile',(req,res)=>
{
    res.render('howtofile')
}
)
mainRouter.get('/howtofile',(req,res)=>
{
    res.render('howtofile')
}
)
mainRouter.get('/dashboard',(req,res)=>
{
    res.render('dashboard')
}
)

mainRouter.get('/dashboard11',(req,res)=>
{
    res.render('dashboard11')
}
)
mainRouter.get('/dashboardsubmit',(req,res)=>
{
    res.render('dashboardsubmit')
}
)
mainRouter.get('/exchangePopup',(req,res)=>
{
    res.render('exchangePopup')
}
)
module.exports = mainRouter