const express = require('express')
const pdf = require('html-pdf')

const app = express()
app.use(require('body-parser').json())

app.get('/', (req, res, next) => res.send({ msg: 'hello' }))

const verifyHasHtml = (req, res, next) => {
  if (req.body.html) { return next() }
  return res.status(400).json({ msg: 'html?' })
}
app.post('/pdf', [
  verifyHasHtml,
], (req, res) => {
  pdf.create(req.body.html).toBuffer((err, buffer) => {
    if (err) {
      return res.status(400).json({ msg: 'Did not work' })
    }
    return res.status(200).json({ buffer })
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})