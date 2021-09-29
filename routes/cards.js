const express = require('express')
const Card = require('../models/Card')
const { nanoid } = require('nanoid')
const { request } = require('express')
const router = express.Router()

let cards = [
  {
    text: 'What is the meaning of Life?',
    author: 'Jane Doe',
    id: '123abc',
  },
  {
    text: 'What is a server?',
    author: 'Peter Post',
    id: '456def',
  },
]

// -------------- get -------------------

router.get('/', (request, response) => {
  Card.find()
    .then(data => response.status(200).json(data))
    .catch(error => response.status(404).json(error))
})

// -------------- get by id -------------------

router.get('/:id', (request, response) => {
  const { id } = request.params
  Card.findById(id)
    .then(data => response.status(200).json(data))
    .catch(error => response.status(404).json(error))
})

// -------------- post -------------------

router.post('/', (request, response) => {
  const { text, author } = request.body
  const newCard = { text, author }

  if (text === '' || author === '') {
    const error = { message: 'Missing Information' }
    return response.status(400).json(error) // Bad Request
  }

  Card.create(newCard)
    .then(newCard => response.status(201).json(newCard))
    .catch(error => response.status(404).json(error))

  //  response.status(200).json(newCard)
})

// -------------- patch -------------------

router.patch('/:id', (request, response) => {
  const { id } = request.params
  const { text, author } = request.body

  if (!text && !author) {
    const error = { message: 'information missing.' }
    return response.status(400).json(error)
  }

  Card.findByIdAndUpdate(id, { text, author }, { new: true })
    .then(card => response.status(200).json(card))
    .catch(error => response.status(400).json(error))
})

// -------------- delete -------------------
router.delete('/:id', (request, response) => {
  const { id } = request.params

  Card.findByIdAndDelete(id)
    .then(card => response.status(200).json(card))
    .catch(error => response.status(404).json(error))
})

module.exports = router
