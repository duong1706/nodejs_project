const express = require('express')
const productModel = require('../models/product.model')
const cartModel = require('../models/cart.model')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        let carts = []
        if(req.session.cart){
            carts = req.session.cart
        }
         res.render('carts/cart',{carts: carts})
    } catch (error) {
        res.redirect('/')
    }
})

router.get('/add/:id', async (req, res) => {
    try {
        const id = req.params.id
        const product = await productModel.findById(id)
        let items_old = []
        let price_old = 0
        if(req.session.cart){
            items_old = req.session.cart.items
            price_old = req.session.cart.priceTotal
        }
        const cart = new cartModel(items_old, price_old)
        cart.add(product, id, product.imageSrc)
        req.session.cart = cart
        res.redirect('/')
    } catch (error) {
        res.redirect('/')
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        let items_old = []
        let price_old = 0
        if(req.session.cart){
            items_old = req.session.cart.items
            price_old = req.session.cart.priceTotal
        }
        const cart = new cartModel(items_old, price_old)
        cart.delete(req.params.id)
        req.session.cart = cart
        res.send('Delete Successfully')
    } catch (error) {
        res.send('Delete Failed')
    }
})

router.put('/reduce/:id', (req, res) => {
    try {
        let items_old = []
        let price_old = 0
        if(req.session.cart){
            items_old = req.session.cart.items
            price_old = req.session.cart.priceTotal
        }
        const cart = new cartModel(items_old, price_old)
        cart.reduce(req.params.id)
        req.session.cart = cart
        res.send('Update Successfully')
    } catch (error) {
        res.send('Update Failed')
    }
})

router.put('/increase/:id', (req, res) => {
    try {
        let items_old = []
        let price_old = 0
        if(req.session.cart){
            items_old = req.session.cart.items
            price_old = req.session.cart.priceTotal
        }
        const cart = new cartModel(items_old, price_old)
        cart.increase(req.params.id)
        req.session.cart = cart
        res.send('Update Successfully')
        //res.redirect('/cart')
    } catch (error) {
        res.send('Update Failed')
    }
})

module.exports = router