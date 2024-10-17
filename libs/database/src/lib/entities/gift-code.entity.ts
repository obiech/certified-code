import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RiderTransactionEntity } from './rider-transaction.entity';
import { DriverTransactionEntity } from './driver-transaction.entity';
import { GiftBatchEntity } from './gift-batch.entity';

@Entity('gift_code')
export class GiftCodeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string;

  @Column({
    nullable: true,
  })
  usedAt?: Date;

  @OneToOne(
    () => DriverTransactionEntity,
    (driverTransaction) => driverTransaction.giftCard,
  )
  driverTransaction?: DriverTransactionEntity;

  @OneToOne(
    () => RiderTransactionEntity,
    (riderTransaction) => riderTransaction.giftCard,
  )
  riderTransaction?: RiderTransactionEntity;

  @ManyToOne(() => GiftBatchEntity, (gift) => gift.giftCodes)
  gift!: GiftBatchEntity;

  @Column()
  giftId!: number;
}
