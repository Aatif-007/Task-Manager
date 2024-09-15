const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const taskRouter = require('./Routers/TaskRouter')

require('dotenv').config();
require('./Models/db')

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(bodyParser.json());
app.use('/task' , taskRouter )

app.listen(PORT , () => console.log(`Server running on ${PORT}`))
