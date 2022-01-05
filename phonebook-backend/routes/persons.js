const express = require('express')
const router = express.Router()
const { Person } = require('../mongo')

router.get('/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(p => p.toJSON()))
  })
})

router.get('/persons/info', (req, res) => {
  Person.find({}).then(persons => {
    const str = `<h2>Puhelinluettelossa ${persons.length} henkilön tiedot</h2>
    <h2>${new Date()}</h2>`
    res.send(str)
  })

})

router.get('/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person.toJSON())
    } else {
      res.status(400).end()
    }
  })
    .catch(error => next(error))
})

router.delete('/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

router.post('/persons', (req, res, next) => {
  const body = req.body
  if (body.name === undefined) {
    return res.status(400).json({ error: 'name missing' })
  }
  if (body.number === undefined) {
    return res.status(400).json({ error: 'number missing' })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON())
  })
    .catch(error => next(error))
})

router.put('/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

module.exports = router