import 'dotenv/config'
import { dataSource } from './database/data-source'
import { app } from './app'
import UserSeed from './database/seed/UserSeed'

async function bootstrap() {
  try {
    await dataSource.initialize()
    console.log('Data Source has been initialized!')
    await UserSeed.execute()
    const port = process.env.API_PORT || 3003

    const server = app.listen(port, () => {
      console.log(`App started on port ${port}`)
    })

    process.on('SIGINT', () => {
      server.close()
      console.log('App finished')
    })
  } catch (error) {
    console.error('Error during Data Source initialization', error)
  }
}

bootstrap()
