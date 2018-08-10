// Static express server
const express = require('express')
const socketIo = require('socket.io')
const http = require('http')
const fs = require('fs')

// Create HTTP server
const app = express()
const server = http.Server(app)

// Create web soket server
const io = socketIo(server)

// Internal server messages from disk
const messageData = fs.readFileSync(`${__dirname}/db.json`).toString()
const messages = messageData
  ?  JSON.parse(messageData)
  : []

// List for new socket client connection
io.on('connection', socket => {
  // This should be done by persiting to DB
  // done for simplicity

  // Send all messages to connecting client
  socket.emit('all_messages', messages)

  // Listen for new messages
  socket.on('new_message', message => {
    // Add message to front of messages array
    messages.unshift(message)

    // Broadcast new message to all connected clients
    socket.broadcast.emit('new_message', message)

    // Presist to disk (could be async)
    fs.writeFileSync(`${__dirname}/db.json`, JSON.stringify(messages))
  })
})

// Server "app" directory
app.use(express.static(`${__dirname}/../app`))

// Server "node_modules" directory
app.use('/modules', express.static(`${__dirname}/../node_modules`))

// Start Server
server.listen(8000, () => console.log('Listening on PORT:8000'))