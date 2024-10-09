import { CarStatus } from '@database/utils/car.status.enum'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
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
  km: number

  @Column()
  year: number

  @Column()
  price: number

  @Column('simple-array')
  items: string[]

  @Column({
    type: 'enum',
    enum: CarStatus,
    default: CarStatus.ATIVO
  })
  status: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
