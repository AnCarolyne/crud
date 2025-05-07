const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MySQL conexão
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
  } else {
    console.log('Conectado ao banco MySQL.');
  }
});

// Rota de envio
app.post('/submit', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Nome é obrigatório.' });
  }

  const query = 'INSERT INTO nomes (nome) VALUES (?)';
  db.query(query, [name], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro ao inserir no banco de dados.' });
    }
    res.json({ message: 'Nome salvo com sucesso!' });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
