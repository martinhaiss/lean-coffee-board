const express = require('express')
const { nanoid } = require('nanoid')
const router = express.Router()

let cards = [
  {
    text: 'What is the meaning of Life?',
    author: 'Jane Doe',
    id: '123abc',
  },
  {
    text: 'What is love?',
    author: 'Haddaway',
    id: '456def',
  },
]

router.get('/', (request, response) => {
  response.status(200).json(cards)
})

router.get('/:id', (request, response) => {
  const { id } = request.params
  const card = cards.find(card => card.id === id)
  if (card) {
    response.status(200).json(card)
  } else {
    const error = { message: 'Sorry, could not find object with that id.' }
    response.status(404).json(error)
  }
})

// ------------------------------------------------

router.post('/', (request, response) => {
  const { text, author } = request.body
  if (text === '' || author === '') {
    const error = { message: 'Missing Information' }
    return response.status(400).json(error) // Bad Request
  }

  const newCard = { text, author, id: nanoid() }
  // { text: text, author: author, id: nanoid() }
  cards = [...cards, newCard]
  // cards.push(newCard)
  response.status(200).json(newCard)
})

// ------------------------------------------------

router.put('/:id', (request, response) => {
  // Put: gesamtes Objekt wird mit den Daten im request.body geupdated
  // Put request handler implementieren
  const { id } = request.params
  const { text, author } = request.body

  if (!text && !author) {
    const error = { message: 'information missing.' }
    return response.status(400).json(error)
  }

  const card = cards.find(card => card.id === id)

  if (!card) {
    const error = { message: 'could not find object with that id.' }
    return response.status(400).json(error)
  }

  const newCard = {
    text,
    author,
    id: card.id,
  }

  const index = cards.findIndex(card => card.id === id)

  cards = [...cards.slice(0, index), newCard, ...cards.slice(index + 1)]

  response.status(200).json(newCard)
})
// ------------------------------------------------

router.patch('/:id', (request, response) => {
  const { id } = request.params
  const { text, author } = request.body

  if (!text && !author) {
    const error = { message: 'information missing.' }
    return response.status(400).json(error)
  }

  const card = cards.find(card => card.id === id)

  if (!card) {
    const error = { message: 'could not find object with that id.' }
    return response.status(400).json(error)
  }

  const newCard = {
    text: text ? text : card.text,
    author: author ? author : card.author,
    id: card.id,
  }

  const index = cards.findIndex(card => card.id === id)

  cards = [...cards.slice(0, index), newCard, ...cards.slice(index + 1)]

  response.status(200).json(newCard)
})

// ------------------------------------------------

router.delete('/:id', (request, response) => {
  const { id } = request.params
  const card = cards.find(card => card.id === id)

  if (card) {
    cards = cards.filter(card => card.id !== id)
  } else {
    const error = { message: 'Could not find object with that id.' }
    response.status(404).json(error)
  }
})

module.exports = router
