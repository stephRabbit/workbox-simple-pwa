// Camera Class
class Camera {
  constructor(videoNode = null) {
    // Camera stream DOM node
    this.videoNode = videoNode
  }

  // Camera feed (view-finder) on
  switchOn() {
    // Get camera media stream and set on player <video>
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        height: 600,
        width: 600
      },
    })
    .then(stream => {
      this.videoNode.srcObject = this.stream = stream
    })
  }

  // Camera feed (view-finder) off
  switchOff() {
    this.videoNode.pause()
    // Stop media stream
    this.stream.getTracks()[0].stop()
  }

  // Capture photo from camera stream
  takePhoto() {
    // Create a <canvas> element to render photo
    let canvas = document.createElement('canvas')
    canvas.setAttribute('height', 600)
    canvas.setAttribute('width', 600)

    // Get canvas context
    let context = canvas.getContext('2d')

    // Draw (render) the image onto canvas
    context.drawImage(this.videoNode, 0, 0, canvas.width, canvas.height)

    // Get the canvas image as data url
    this.photo = context.canvas.toDataURL()

    // Destroy canvas
    context = null
    canvas = null

    return this.photo
  }
}