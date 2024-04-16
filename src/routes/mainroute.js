const express = require('express')
const prodRouter=require("./produits/prod");
const categRoot = require('./categories');

const mainRouter = express.Router();

mainRouter.use('/produits', prodRouter)
mainRouter.use('/categories',categRoot)

module.exports=mainRouter;