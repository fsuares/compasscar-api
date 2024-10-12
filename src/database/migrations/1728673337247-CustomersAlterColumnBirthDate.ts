import { MigrationInterface, QueryRunner } from 'typeorm'

export class CustomersAlterColumnBirthDate1728673337247
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE customers ALTER COLUMN birth_date TYPE VARCHAR(10)`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE customers ALTER COLUMN birth_date TYPE date`
    )
  }
}
