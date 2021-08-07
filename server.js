const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const indexRouter = require('./routes/index')
const categoryRouter = require('./routes/category')
const productRouter = require('./routes/product')
const cartRouter = require('./routes/cart')
const mongoose = require('mongoose')
const app = express()
const methodOverride = require('method-override')
require('dotenv').config()

const connectFun = async()=>{
    try {
        await mongoose.connect('mongodb://localhost/project', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log("Success")
    } catch (error) {
        console.log(error)
        console.log("Fail")
    }
}

connectFun()
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.set('layout', 'layouts/layout')
app.use(express.static('public'))
app.use(express.urlencoded({extended: false, limit: '10mb'}))
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:  { maxAge: 60*60*1000}
  }))

app.use('/', indexRouter)
app.use('/category', categoryRouter)
app.use('/product', productRouter)
app.use('/cart', cartRouter)
app.listen(3000)
