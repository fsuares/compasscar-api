import { OrderStatus } from '../../../database/utils/order.status.enum'
import { Customer } from '../../customers/entities/Customer'
import { Car } from '../../cars/entities/Car'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm'

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => Customer, (customer) => customer.id)
  customer_id: Customer

  @CreateDateColumn()
  created_at: Date

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.OPEN
  })
  status: string

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

  @ManyToOne(() => Car, (car) => car.id)
  car_id: Car

  @Column()
  start_date: Date

  @Column()
  end_date: Date

  @Column()
  cancel_date: Date

  @Column()
  closed_date: Date

  @Column({ type: 'float' })
  penalty_value: number

  @UpdateDateColumn()
  updated_at: Date
}
