import 'dotenv/config'
import '@datasource'
import { app } from './app'

import { Router } from 'express'
import customersRouter from './models/customers/routes/CustomersRoutes'

const port = process.env.PORT || 3003

const routes = Router()
app.use(routes)
routes.use('/customers', customersRouter)

const server = app.listen(port, () => {
  console.log(`App started on port ${port}`)
})

process.on('SIGINT', () => {
  server.close()
  console.log('App finished')
})
