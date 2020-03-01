const express = require('express');
const cors = require('cors');
const app = express();

const { connectDb } = require('./config/db');
// Connect DB
connectDb();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ extended: false }))
app.use(cors());

// Define Routes
app.use('/api/auth', require('./backend/routes/auth'));
app.use('/api/users', require('./backend/routes/users'));
app.use('/api/feedback', require('./backend/routes/feedback'));
app.use('/api/archive', require('./backend/routes/archive'));
app.use('/api/retraining', require('./backend/routes/retraining'));

app.listen(PORT, () => console.log(`Server running at port: ${PORT}`))

