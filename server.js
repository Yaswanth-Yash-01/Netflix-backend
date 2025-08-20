const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Backend API is running');
});

const authRoute = require('./routes/auth')
app.use('/api/auth',authRoute);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Mongo connection error:', err));
});