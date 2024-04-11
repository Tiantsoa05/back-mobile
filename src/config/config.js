const mysql = require('mysql')

const database = mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"jossuca",
        database:"sitecommerce"
    }
)

module.exports=database