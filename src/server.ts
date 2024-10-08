import 'dotenv/config'
import { app } from './app'
import './database/data-source'

const port = process.env.PORT || 3003

const server = app.listen(port, () => {
  console.log(`App started on port ${port}`)
})

process.on('SIGINT', () => {
  server.close()
  console.log('App finished')
})
