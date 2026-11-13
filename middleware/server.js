const express = require('express');
const app = express();
 
const usernameMiddleware = (req, res, next) => {
    return req.username = 'John Doe', next();
}

app.get('/welcome', usernameMiddleware, (req, res) => {
  res.send(`Welcome ${req.username || 'Guest'}!`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});