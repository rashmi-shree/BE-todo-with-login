const express = require('express')
const mongoose = require('mongoose');
const todoRoutes = require('./src/routes/todoRoutes');
require('dotenv').config();

const app = express()
app.use(express.json());
const port = 3000

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => console.log('Example app listening on port 3000'));
  })
  .catch(err => console.error(err));

app.use('/api/todos', todoRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
