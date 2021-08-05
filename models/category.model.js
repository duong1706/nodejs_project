const mongoose = require('mongoose')
const productModel = require('./product.model')
const categorySchema = new mongoose.Schema({
    name: {type: 'string', required: true, default: 'Banh trang'}
}, {
    timestamps: true
})

categorySchema.pre('remove', async function (next) {
    try {
        console.log("okok");
        const products = await productModel.find({category: this._id})
        if (products.length > 0) {
            next(new Error('Khong the xoa'))
        }
    
    } catch (error) {
        console.log("ko");
        next()
    }
})

module.exports = mongoose.model('category', categorySchema)