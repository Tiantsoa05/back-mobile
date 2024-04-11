const express = require('express')
const {getAllProducts, reduceProduct, addProdCommand} =require("../../controllers/ProductsController");

const prodRouter = express.Router();

prodRouter.get('/all', (req, res) => {
    getAllProducts((data) => {
        res.status(200).send(JSON.stringify(data));
    });
});


prodRouter.post('/commande',(req,res)=>{
    const {id_produit,qte_produit} = req.body
    addProdCommand(req.body, (response) => {
        console.log(response)
    })
    reduceProduct({ qte_minus: parseInt(qte_produit), id: id_produit }, (response) => {
        let {affectedRows} = response
        res.status(200).end(JSON.stringify(affectedRows))
    })
})

module.exports=prodRouter;