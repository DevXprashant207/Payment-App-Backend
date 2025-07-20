const express = require("express");
const app = express();
const rootRouter = require("./routes/index");
const cors =  require('cors');
require('dotenv').config();
app.use(cors());
app.use(express.json());// body parser
app.use('/api/v1',rootRouter);
const PORT = process.env.PORT || 6000;
app.listen(PORT,()=>{
    console.log(`serve is running on http://localhost:${PORT}`);
});