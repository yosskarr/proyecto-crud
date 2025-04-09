const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'rootpassword',
  database: 'crud_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

module.exports = db;
