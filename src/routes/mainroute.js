const express = require('express')
const prodRouter=require("./produits/prod");

const mainRouter = express.Router();

mainRouter.use('/produits', prodRouter);

module.exports=mainRouter;