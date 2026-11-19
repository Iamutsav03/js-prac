require('dotenv').config();
const express = require('express');
const app = express();
const studentRoutes = require('./routes/studentRoutes');
const db = require('./config/db');
require('./models/student');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/students', studentRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
});

const startServer = async () => {
  try {
    await db.authenticate();
    await db.sync();
    console.log('Connected to the database');

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error('Unable to start the server:', error.message);
    process.exitCode = 1;
  }
};

if (require.main === module) {
  startServer();
}

module.exports = app;