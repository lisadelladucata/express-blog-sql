const express = require('express');
const app = express();
const port = 3001;

//importazioni
const postsRouter = require('./routers/posts')
const errorHandler = require('./middlewares/errorHandler')
const notFound = require('./middlewares/notFound')

//middleware per file statici
app.use(express.static('bacheca'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Server del mio blog')
})

app.use("/posts", postsRouter)
//middleware per errore interno del server
app.use(errorHandler)
//middleware per errore 404
app.use(notFound)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})