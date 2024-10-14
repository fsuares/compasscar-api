import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm'
import { OrderStatus } from '../utils/order.status.enum'

export class CreateOrdersTable1728551978379 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'customer_id',
            type: 'uuid'
          },
          {
            name: 'car_id',
            type: 'uuid'
          },
          {
            name: 'status',
            type: 'enum',
            enum: Object.values(OrderStatus),
            default: `'${OrderStatus.OPEN}'`
          },
          {
            name: 'cep',
            type: 'varchar'
          },
          {
            name: 'city',
            type: 'varchar'
          },
          {
            name: 'uf',
            type: 'varchar'
          },
          {
            name: 'order_fee',
            type: 'decimal',
            precision: 10,
            scale: 2
          },
          {
            name: 'total_value',
            type: 'decimal',
            precision: 10,
            scale: 2
          },
          {
            name: 'penalty_value',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
            default: null
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()'
          },
          {
            name: 'start_date',
            type: 'timestamp with time zone'
          },
          {
            name: 'end_date',
            type: 'timestamp with time zone'
          },
          {
            name: 'cancel_date',
            type: 'timestamp with time zone',
            isNullable: true,
            default: null
          },
          {
            name: 'closed_date',
            type: 'timestamp with time zone',
            isNullable: true,
            default: null
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()'
          }
        ]
      })
    )

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['customer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customers',
        onDelete: 'RESTRICT'
      })
    )

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['car_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cars',
        onDelete: 'RESTRICT'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders', 'FK_orders_customer_id')
    await queryRunner.dropForeignKey('orders', 'FK_orders_car_id')
    await queryRunner.dropTable('orders')
  }
}
