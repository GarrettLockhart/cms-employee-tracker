const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const PORT = process.env.PORT || 3001;  
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log('Connection established.')
);

app.use((req, res) => {
  res.status(404).end();
})


app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});