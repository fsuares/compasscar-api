import { Order } from '../../orders/entities/Order'
import { CarStatus } from '../../../database/utils/car.status.enum'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm'

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  license_plate: string

  @Column()
  brand: string

  @Column()
  model: string

  @Column()
  year: number

  @Column({
    type: 'enum',
    enum: CarStatus,
    default: CarStatus.ACTIVE
  })
  status: CarStatus

  @Column()
  km: number

  @Column({ type: 'decimal', precision: 2, scale: 2 })
  price: number

  @Column('text', { array: true })
  items: string[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToMany(() => Order, (orders) => orders.car)
  orders: Order[]
}
