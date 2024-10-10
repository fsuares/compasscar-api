import { OrderStatus } from '../../../database/utils/order.status.enum'
import { Customer } from '../../customers/entities/Customer'
import { Car } from '../../cars/entities/Car'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer

  @ManyToOne(() => Car, (car) => car.orders)
  @JoinColumn({ name: 'car_id' })
  car: Car

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.OPEN
  })
  status: OrderStatus

  @Column()
  cep: string

  @Column()
  city: string

  @Column()
  uf: string

  @Column({ type: 'float' })
  order_fee: number

  @Column({ type: 'float' })
  total_value: number

  @CreateDateColumn()
  created_at: Date

  @Column()
  start_date: Date

  @Column()
  end_date: Date

  @Column({ nullable: true })
  cancel_date: Date

  @Column({ nullable: true })
  closed_date: Date

  @Column({ type: 'float', nullable: true })
  penalty_value: number

  @UpdateDateColumn()
  updated_at: Date
}
