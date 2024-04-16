const database = require("../config/config");

function getAllProducts(callback) {
    database.query("SELECT * FROM produit", function (error, results) {
        if (error) {
            console.error("Error fetching products:", error);
            callback(null);
        } else {
            callback(results);
        }
    })
}
function getCategorizedProducts(category,callback){
    database.query("SELECT * produit INNER JOIN categorie USING(id_categorie) WHERE categorie.Nom_categorie=?",[category],(error,results)=>{
        if(error) throw(error)
        callback(results)
    })
}
function getAllCategories(callback){
    database.query("SELECT * FROM categorie",(error,results)=>{
        if(error) throw error
        callback(results)
    })
}

function reduceProduct(payload, callback) {
    const { qte_minus, id } = payload
    database.query("UPDATE produit SET qte = qte - ? WHERE id_produit=?", [qte_minus, id], function (error, results) {
        if (error) throw error
        callback(results)
    })
}

function addProdCommand(prod, callback) {
    const { id_produit, id_client, qte_produit } = prod
    database.query("INSERT INTO commande(id_produit,id_client,qte_produit) VALUES (?,?,?) ", [id_produit, id_client, qte_produit], function (error, results ) {
        if (error) throw error
        callback(results)
    })
}

module.exports = {
    getAllProducts,
    reduceProduct,
    addProdCommand,
    getAllCategories,
    getCategorizedProducts
}