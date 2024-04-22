const database = require("../config/config");

function getAllProducts(callback) {
    database.query("SELECT * FROM produit INNER JOIN categorie USING(id_categorie)", function (error, results) {
        if (error) {
            console.error("Error fetching products:", error);
            callback(null);
        } else {
            callback(results);
        }
    })
}
function getCategorizedProducts(category, callback) {
    database.query("select  * from produit inner join categorie using(id_categorie) where Nom_categorie=?", [category], (error, results) => {
        if (error) throw (error)
        callback(results)
    })
}
function getAllCategories(callback) {
    database.query("SELECT * FROM categorie", (error, results) => {
        if (error) throw error
        callback(results)
    })
}

function reduceProduct(payload, callback) {
    if (payload.length === 1) {
        const { qte_produit, id_produit } = payload[0]
        database.query("UPDATE produit SET qte = qte - ? WHERE id_produit=?", [qte_produit, id_produit], function (error, results) {
            if (error) throw error
            callback(results)
        })
    } else {
        let data = payload
        let i = 0
        let arrayFinal = []
        data.map(function (item) {
            arrayFinal[i] = []
            Object.keys(item).map(function (key) {
                (key === 'qte_produit' || key === 'id_produit') && arrayFinal[i].push(item[key])
            })
            i++
        })
        console.log(arrayFinal)

        let updates = [];
        payload.forEach(item => {
            const { qte_produit, id_produit } = item;
            updates.push(new Promise((resolve, reject) => {
                database.query("UPDATE produit SET qte = qte - ? WHERE id_produit = ?", [qte_produit, id_produit], function (error, results) {
                    if (error) reject(error);
                    resolve(results);
                });
            }));
        });
        Promise.all(updates)
            .then(results => {
                callback(results);
            })
            .catch(error => {
                throw error;
            });
    }
}

function addProdCommand(prod, callback) {
    let data = prod
    let i = 0
    let arrayFinal = []
    data.map(function (item) {
        arrayFinal[i] = []
        Object.keys(item).map(function (key) {
            arrayFinal[i].push(item[key])
        })
        i++
    })
   
    database.query("INSERT INTO commande(id_produit,id_client,qte_produit) VALUES ? ", [arrayFinal], function (error, results) {
        if (error) throw error
        callback(results)
    })
}

const PayOrderedCart = (cart,callback) =>{
    
}

module.exports = {
    getAllProducts,
    reduceProduct,
    addProdCommand,
    getAllCategories,
    getCategorizedProducts
}