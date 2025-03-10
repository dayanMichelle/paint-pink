const { ipcRenderer } = require('electron')
const ipc = ipcRenderer // just for shortened name

document.querySelector('#minimize').addEventListener('click', () => {
  console.log('Minimize button clicked')
  ipc.send('manualMinimize')
})
document.querySelector('#maximize').addEventListener('click', () => {
  ipc.send('manualMaximize')
})
document.querySelector('#close').addEventListener('click', () => {
  ipc.send('manualClose')
})

// Código para dibujar en el canvas
const canvas = document.getElementById('drawingCanvas')
const ctx = canvas.getContext('2d')
let drawing = false
let pencilActive = false

document.getElementById('pencil').addEventListener('click', () => {
  pencilActive = !pencilActive
  if (pencilActive) {
    console.log('Pencil tool activated')
  } else {
    console.log('Pencil tool deactivated')
  }
})

canvas.addEventListener('mousedown', () => {
  if (pencilActive) {
    drawing = true
  }
})

canvas.addEventListener('mouseup', () => {
  if (pencilActive) {
    drawing = false
    ctx.beginPath()
  }
})

canvas.addEventListener('mousemove', draw)

function draw (event) {
  if (!drawing || !pencilActive) return
  ctx.lineWidth = 2
  ctx.lineCap = 'round'
  ctx.strokeStyle = 'black'

  ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
}
document.getElementById('esier').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  console.log('Canvas cleared')
})
