import 'dotenv/config'
import './database/data-source'
import { app } from './app'

import { Router } from 'express'
import carsRouter from './models/cars/routes/cars.routes'

const port = process.env.PORT || 3003

const routes = Router()
app.use(routes)
routes.use('/cars', carsRouter)

const server = app.listen(port, () => {
  console.log(`App started on port ${port}`)
})

process.on('SIGINT', () => {
  server.close()
  console.log('App finished')
})
