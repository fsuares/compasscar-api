import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

import { User } from '../models/users/entities/User'
import { Customer } from '../models/customers/entities/Customer'

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [User, Customer],
  migrations: ['./migrations'],
  subscribers: []
})

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })
