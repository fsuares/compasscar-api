import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

import { Car } from '../modules/cars/entities/Car'
import { User } from '../modules/users/entities/User'
import { Customer } from '../modules/customers/entities/Customer'
import { Order } from '../modules/orders/entities/Order'

import { CreateUsersTable1728394270904 } from './migrations/1728394270904-CreateUsersTable'
import { CreateCarsTable1728411042792 } from './migrations/1728411042792-CreateCarsTable'
import { CreateOrdersTable1728551978379 } from './migrations/1728551978379-CreateOrdersTable'
import { CreateCustomers1728413724717 } from './migrations/1728413724717-CreateCustomers'
import { CustomersAlterColumnBirthDate1728673337247 } from './migrations/1728673337247-CustomersAlterColumnBirthDate'

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_URL,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
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
