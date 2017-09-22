const express = require('express')
const pdf = require('html-pdf')

const app = express()
app.use(require('body-parser').json())

app.get('/', (req, res, next) => res.send({ msg: 'hello' }))

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})