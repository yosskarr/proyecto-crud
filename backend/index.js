const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const db = require('./database');

app.use(cors());
app.use(express.json());

// Rutas CRUD

// Leer todos los usuarios
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Crear un nuevo usuario
app.post('/usuarios', (req, res) => {
  const { nombre, celular } = req.body;
  db.query('INSERT INTO usuarios (nombre, celular) VALUES (?, ?)', [nombre, celular], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, nombre, celular });
  });
});

// Actualizar un usuario existente
app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, celular } = req.body;
  db.query('UPDATE usuarios SET nombre = ?, celular = ? WHERE id = ?', [nombre, celular, id], (err) => {
    if (err) throw err;
    res.json({ id, nombre, celular });
  });
});

// Eliminar un usuario
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuarios WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Usuario eliminado' });
  });
});

app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
