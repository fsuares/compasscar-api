import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

import { Car } from '../models/cars/entities/Car'
import { User } from '../models/users/entities/User'

import { CreateUsersTable1728394270904 } from './migrations/1728394270904-CreateUsersTable'
import { CreateCarsTable1728411042792 } from './migrations/1728411042792-CreateCarsTable'

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [User, Car],
  migrations: [CreateUsersTable1728394270904, CreateCarsTable1728411042792],
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
