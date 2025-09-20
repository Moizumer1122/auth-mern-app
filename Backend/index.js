
// use of body parser 
// When a client sends data to your server (for example, 
// during a POST request when submitting a form or sending JSON), that data is in the request body.

// But by default, Node.js doesn’t automatically know how to read that data.

// Body Parser reads that incoming data, parses it,
// //  and makes it accessible in your code as a JavaScript object.

// -------------------------------------------------------------------------------------------
// 🛠️ What does CORS do?

// CORS allows your backend server to tell the browser:

// “Hey, it’s okay for this frontend (origin) to access my resources.”



const express = require('express');
const app = express();
require('dotenv').config();
require('./Models/db'); // Connect to MongoDB
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');

const port = process.env.PORT || 3000

// Middleware
app.use(express.json()); // Built-in JSON parser
app.use(cors());

// Test route
app.get('/ping', (req, res) => {
  res.send('pong');
});

// Routes
app.use('/auth', AuthRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on  localhost:${port}`);
});
