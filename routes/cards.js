const express = require('express')
const Card = require('../models/Card')
const { request } = require('express')
const router = express.Router()

// -------------- get -------------------

router.get('/', (request, response, next) => {
  Card.find()
    .then(data => response.status(200).json(data))
    .catch(error =>
      next({ status: 404, messsage: error.message || 'Document not found' })
    )
})

// -------------- get by id -----------------

router.get('/:id', (request, response, next) => {
  const { id } = request.params
  Card.findById(id)
    .then(data => {
      if (!data) {
        throw new Error('This is my error!')
      }
      response.status(200).json(data)
    })

    .catch(error =>
      next({ status: 404, messsage: error.message || 'Document not found' })
    )
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

// -------------- delete -----------------

router.delete('/:id', (request, response, next) => {
  const { id } = request.params

  Card.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        throw new Error('This card does not exist!')
      }
      response.status(200).json(data)
    })

    .catch(error =>
      next({ status: 404, messsage: error.message || 'Document not found' })
    )
})

module.exports = router
