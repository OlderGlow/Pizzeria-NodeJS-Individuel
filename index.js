import express from 'express'
import {createServer} from 'http'
import {Server} from 'socket.io';
import { connectionDatabase } from './helpers/_db.js'
import cookieParser from 'cookie-parser'
import { dispatcher } from './helpers/_dispatcher.js'

const PORT = 8000

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)
connectionDatabase()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

dispatcher(app, io)


io.on('connection', socket => {
  console.log('a user is online')
  socket.on('newOrder', (msg) => {
    console.log(msg)
  })
  socket.on('newPizza', (msg) => {
    console.log(msg)
  })
  socket.on('commande-status-changed', (msg) => {
    console.log(msg)
  })
})

httpServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
