const express = require('express')
const app = express()

const port = 3000

app.use(express.json())

app.get('/api/cards', (request, response) => {
  response.set('Content-type', 'text/html; charset=utf-8')
  response.send('<h1>Hello, World! Wie läufts?</h1>')
})

app.post('/api/cards', (request, response) => {
  response.send('This was a POST request')
})

app.put('/api/cards', (request, response) => {
  response.send('This was a PUT request')
})

app.patch('/api/cards', (request, response) => {
  response.send('This was a PATCH request')
})

app.delete('/api/cards', (request, response) => {
  response.send('This was a DELETE request')
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
