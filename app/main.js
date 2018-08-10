// Initialize new camera instance with player node
let player = document.getElementById('player')
const camera = new Camera(player)

// Main app logic
const _init = () => {
  // Initial new messsage
  const messages = new Message()

  // Notify user of connection error
  window.addEventListener('messagesError', () => {
    toastr.error('Message could not be received.<br>Will keep trying.', 'Network connection error')
  })

  // Listen for existing message from server
  window.addEventListener('messagesReady', () => {
    let loader = document.getElementById('loader')
    loader && loader.remove()

    // Check if some message exist
    if (messages.all.length === 0) toastr.info('Add a message', 'No messages')

    // Empty out existing messages if this update is from reconnection
    let messageEl = document.getElementById('messages')
    if (messageEl) messageEl.innerHTML = ''

    // Iterate and render all messages (reverse due to prepending)
    messages.all.reverse().forEach(renderMessage)
  })

  // Listen for new message event
  window.addEventListener('new_message', e => {
    renderMessage(e.detail)
  })

  // Switch on camera in viewfinder
  $('#view-finder').on('show.bs.modal', () => {
    camera.switchOn()
  })

  // Switch off camera in viewfinder
  $('#view-finder').on('hidden.bs.modal', () => {
    camera.switchOff()
  })

  // Take Photo
  let shutterButton = document.getElementById('shutter')
  shutterButton && shutterButton.addEventListener('click', () => {
    let photo = camera.takePhoto()

    // Show photo preview in camera button
    let cameraEl = document.getElementById('camera')
    cameraEl.classList.add('withPhoto')
    cameraEl.style.backgroundImage = `url(${photo})`
  })

  // Submit message
  let sendButton = document.getElementById('send')
  sendButton && sendButton.addEventListener('click', () => {
    let caption = document.getElementById('caption');
    let cameraButton = document.getElementById('camera');

    // Check message is ok if (!photo || !caption) {
    if (!camera.photo || !caption.value) {
      toastr.warning('Photo & Caption Reqired.', 'Incomplete Message')
      return
    }

    // Add new message
    let message = messages.add(camera.photo, caption.value)

    console.log(messages.all)

    // Render message in feed
    renderMessage(message)

    // Reset textarea
    console.log('Adding message', caption.value)
    caption.value = ''
    cameraButton.style.backgroundImage = ''
    cameraButton.classList.remove('withPhoto')
    camera.photo = null
  })
}

// Create message element
const renderMessage = (message) => {
  // Message HTML
  let messageHtml = `
    <div class="row message bg-light mb-2 rounded shadow">
      <div class="col-2 p-1">
        <img src="${message.photo}" class="photo w-100 rounded">
      </div>
      <div class="message.photo">
        ${message.caption}
      </div>
    </div>
  `
  // Prend to #messages
  let messageEl = document.getElementById('messages')
  //messageEl.prepend(messageHtml)
  $(messageHtml).prependTo('#messages')
    .find('img').on('click', showPhoto)
}

// Show message photo in modal
const showPhoto = e => {
  // Get phot src
  let photoSrc = e.target.getAttribute('src')
  let photoframeImg = document.getElementById('photo-frame-img')
  photoframeImg && photoframeImg.setAttribute('src', photoSrc)
  $('#photo-frame').modal('show')
}