import { CarItems } from './CarsItems'
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
  km: number

  @Column()
  year: number

  @Column()
  price: number

  @Column('simple-array')
  @OneToMany(() => CarItems, (carItems) => carItems.car_id)
  items: CarItems[]

  @Column()
  status: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
