const express = require('express')
const { getAllProducts, reduceProduct, addProdCommand, getCategorizedProducts, PayOrderedCart } = require("../../controllers/ProductsController");

const prodRouter = express.Router();

prodRouter.get('/all', (req, res) => {
    getAllProducts((data) => {
        res.status(200).send(JSON.stringify(data));
    });
});

prodRouter.get('/:categorie', (req, res) => {
    const { categorie } = req.params
    getCategorizedProducts(categorie, (data) => {
        res.status(200).send(JSON.stringify(data))
    })
})


prodRouter.post('/commande', (req, res) => {

    const parameter = JSON.parse(req.body.data)

    // // const {id_produit,qte_produit} = req.body
    // addProdCommand(req.body, (response) => {
    //     console.log(response)
    // })

    addProdCommand(parameter, (response) => {
        console.log(response)
    })

    // // reduceProduct({ qte_minus: parseInt(qte_produit), id: id_produit }, (response) => {
    // reduceProduct(req.body, (response) => {
    //     let { affectedRows } = response
    //     res.status(200).end(JSON.stringify(affectedRows))
    // })

    reduceProduct(parameter, (response) => {
        let { affectedRows } = response
        res.status(200).end(JSON.stringify(affectedRows))
    })

})

prodRouter.post('/payement', (req, res) => {

    const parameter = JSON.parse(req.body.data)

    // PayOrderedCart(req.body, (response) => {
    //     let { affectedRows } = response
    //     res.status(200).end(JSON.stringify(affectedRows))
    // })

    PayOrderedCart(parameter, (response) => {
        let { affectedRows } = response
        res.status(200).end(JSON.stringify(affectedRows))
    })

})

module.exports = prodRouter;