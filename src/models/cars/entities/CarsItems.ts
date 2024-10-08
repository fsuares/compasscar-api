import { Car } from './Cars'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm'

@Entity('cars_items')
export class CarItems {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Car, (car) => car.items)
  car_id: string

  @Column()
  item: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
