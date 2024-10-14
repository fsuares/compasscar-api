import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { CarStatus } from '../utils/car.status.enum'

export class CreateCarsTable1728411042792 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'license_plate',
            type: 'varchar'
          },
          {
            name: 'brand',
            type: 'varchar'
          },
          {
            name: 'model',
            type: 'varchar'
          },
          {
            name: 'km',
            type: 'integer'
          },
          {
            name: 'year',
            type: 'integer'
          },
          {
            name: 'price',
            type: 'float'
          },
          {
            name: 'items',
            type: 'varchar[]'
          },
          {
            name: 'status',
            type: 'enum',
            enum: Object.values(CarStatus),
            default: `'${CarStatus.ACTIVE}'`
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cars')
  }
}
