const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456789',
    database: 'sapiens'
  }
});

knex.raw('create table if not exists users (id int primary key, theme int)')
  .then(() => {
    knex('users').insert({id: 1, theme: 0}).onConflict('id').ignore()
      .then(console.log)
  })
  .catch(console.log)

const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/theme', (req, res) => {
  knex('users').where('id', 1)
    .then((data) => {
      res.status(200).send({data})
    })
    .catch(() => {
      res.status(400).send('error')
    })
})

app.patch('/theme', (req, res) => {
  knex('users').where('id', 1).update({
    theme: req.body.theme
  }).then((data) => {
    res.status(200).send({data})
  })
  .catch(() => {
    res.status(400).send('error')
  })
})

const server = app.listen(5000, () => {
  console.log('server started on port 5000');
})
