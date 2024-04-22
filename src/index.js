const express = require('express')
const cors = require('cors')
const mainRouter=require("./routes/mainroute");


const server = express();

server.use(cors());
server.use(express.json());
server.use('/api',mainRouter)
server.listen(3000, () => {
    console.log('Server is listening on port 3000',__dirname);
});