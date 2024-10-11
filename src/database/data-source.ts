import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

import { Car } from '../models/cars/entities/Car'
import { User } from '../models/users/entities/User'
import { Customer } from '../models/customers/entities/Customer'
import { Order } from '../models/orders/entities/Order'

import { CreateUsersTable1728394270904 } from './migrations/1728394270904-CreateUsersTable'
import { CreateCarsTable1728411042792 } from './migrations/1728411042792-CreateCarsTable'
import { CreateOrdersTable1728551978379 } from './migrations/1728551978379-CreateOrdersTable'
import { CreateCustomers1728413724717 } from './migrations/1728413724717-CreateCustomers'
import { CustomersAlterColumnBirthDate1728673337247 } from './migrations/1728673337247-CustomersAlterColumnBirthDate'

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [User, Car, Order, Customer],
  migrations: [
    CreateUsersTable1728394270904,
    CreateCarsTable1728411042792,
    CreateOrdersTable1728551978379,
    CreateCustomers1728413724717,
    CustomersAlterColumnBirthDate1728673337247
  ],
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
