require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const indexRouter = require('./routes/index')
const personRouter = require('./routes/persons')

morgan.token('body', function (req) { return JSON.stringify(req.body) })

app.use(express.static('dist'))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use('/', indexRouter)
app.use('/api', personRouter)

const unknownEndpoint = (req, res) => {
  res.status(400).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    const errors = error.errors
    if (errors.name !== undefined) {
      if (errors.name.kind === 'unique') {
        return res.status(400).send({ error: 'name must be unique' })
      }
      if (errors.name.kind === 'minlength') {
        return res.status(400).send({ error: 'name must have at least 3 characters' })
      }
    } else {
      return res.status(400).send({ error: 'number must have at least 8 characters' })
    }
  }

  next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})