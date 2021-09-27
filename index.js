const express = require('express')
const app = express()

const port = 3000

app.get('/api/cards', (request, response) => {
  response.set('Content-type', 'text/html; charset=utf-8')
  response.send('<h1>Hello, World! Wie läufts?</h1>')
})

app.post('/api/cards', (request, response) => {
  response.send('This was a post request')
})

app.put('/api/cards', (request, response) => {
  response.send('This was a put request')
})

app.patch('/api/cards', (request, response) => {
  response.send('This was a patch request')
})

app.delete('/api/cards', (request, response) => {
  response.send('This was a delete request')
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
