// Camera Class
class Message {
  constructor() {
    this.messages = []

    // Connect to socket server
    this.socket = io()

    // Handle connection error
    this.socket.once('connect_error', () => {
      // Notify main.js via an Event
      window.dispatchEvent(new Event('messagesError'))
    })

    // Listen for all server message (sent on connection)
    this.socket.on('all_messages', messages => {
      // Update local array
      this.messages = messages

      // Notify client via Event
      window.dispatchEvent(new Event('messagesReady'))
    })

    // Listen for message from server
    this.socket.on('new_message', message => {
      // Add to local messages
      this.messages.unshift(message)

      window.dispatchEvent(new CustomEvent('new_message', { detail: message }))
    })
  }

  // Get all messages
  get all() {
    return this.messages
  }

  // Add new messsage
  add(dataUri, captionText) {
    // Create message object
    let message = {
      photo: dataUri,
      caption: captionText
    }

    // Add to local messages
    this.messages.unshift(message)

    // Emit to server
    this.socket.emit('new_message', message)
    console.log('Emit to server')

    // Return formatted message object
    return message
  }
}