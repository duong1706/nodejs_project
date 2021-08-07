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
        res.redirect('/cart')
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
        res.redirect('/cart')
    } catch (error) {
        res.redirect('/')
    }
})

router.get('/reduce/:id', (req, res) => {
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
        res.redirect('/cart')
    } catch (error) {
        res.redirect('/')
    }
})

router.get('/increase/:id', (req, res) => {
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
        res.redirect('/cart')
    } catch (error) {
        res.redirect('/')
    }
})

module.exports = router