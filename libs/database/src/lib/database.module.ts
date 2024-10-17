import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions, createConnection } from 'typeorm';
import { CarColorEntity } from './entities/car-color.entity';
import { CarModelEntity } from './entities/car-model.entity';
import { ComplaintActivityEntity } from './entities/complaint-activity.entity';
import { ComplaintEntity } from './entities/complaint.entity';
import { CouponEntity } from './entities/coupon.entity';
import { DriverTransactionEntity } from './entities/driver-transaction.entity';
import { DriverWalletEntity } from './entities/driver-wallet.entity';
import { DriverEntity } from './entities/driver.entity';
import { FeedbackParameterEntity } from './entities/feedback-parameter.entity';
import { FeedbackEntity } from './entities/feedback.entity';
import { FleetTransactionEntity } from './entities/fleet-transaction.entity';
import { FleetWalletEntity } from './entities/fleet-wallet.entity';
import { FleetEntity } from './entities/fleet.entity';
import { MediaEntity } from './entities/media.entity';
import { OperatorRoleEntity } from './entities/operator-role.entity';
import { OperatorEntity } from './entities/operator.entity';
import { OrderMessageEntity } from './entities/request-message.entity';
import { RequestEntity } from './entities/request.entity';
import { PaymentGatewayEntity } from './entities/payment-gateway.entity';
import { ProviderTransactionEntity } from './entities/provider-transaction.entity';
import { ProviderWalletEntity } from './entities/provider-wallet.entity';
import { RegionEntity } from './entities/region.entity';
import { RiderAddressEntity } from './entities/rider-address.entity';
import { RiderEntity } from './entities/rider-entity';
import { RiderTransactionEntity } from './entities/rider-transaction.entity';
import { RiderWalletEntity } from './entities/rider-wallet.entity';
import { ServiceCategoryEntity } from './entities/service-category.entity';
import { ServiceEntity } from './entities/service.entity';
import { PaymentEntity } from './entities/payment.entity';
import { ServiceOptionEntity } from './entities/service-option.entity';
import { GiftCodeEntity } from './entities/gift-code.entity';
import { GiftBatchEntity } from './entities/gift-batch.entity';
import { SOSEntity } from './entities/sos.entity';
import { SOSActivityEntity } from './entities/sos-activity.entity';
import { AnnouncementEntity } from './entities/announcement.entity';
import { ZonePriceEntity } from './entities/zone-price.entity';
import { GatewayToUserEntity } from './entities/gateway-to-user.entity';
import { FleetDeviceEntity } from './entities/fleet-device.entity';
import { OrderCancelReasonEntity } from './entities/order-cancel-reason.entity';
import { SavedPaymentMethodEntity } from './entities/saved-payment-method.entity';
import { RiderReviewEntity } from './entities/rider-review.entity';
import { PayoutAccountEntity } from './entities/payout-account.entity';
import { PayoutMethodEntity } from './entities/payout-method.entity';
import { PayoutSessionEntity } from './entities/payout-session.entity';
import { parse } from 'url';  // Import the 'url' module

@Module({
imports: [
  TypeOrmModule.forRootAsync({
    useFactory: async () => {
      const dbUrl = process.env.CLEARDB_PURPLE_URL;
      const parsedUrl = parse(dbUrl);

      return {
        type: 'mysql',
        host: parsedUrl.hostname,
        port: 3306,
        username: parsedUrl.auth?.split(':')[0],  // Extract username from URL
        password: parsedUrl.auth?.split(':')[1],  // Extract password from URL
        database: parsedUrl.pathname?.split('/')[1],  // Extract database name from URL
        synchronize: false,
        logging: false,
        migrations: [`${__dirname}/migration/*.js`],
        migrationsRun: false,
      };
    },
  }),
],
})
export class DatabaseModule {}


export const entities = [
  MediaEntity,
  OperatorEntity,
  OperatorRoleEntity,
  DriverEntity,
  ProviderTransactionEntity,
  ProviderWalletEntity,
  ComplaintActivityEntity,
  ComplaintEntity,
  CarModelEntity,
  CarColorEntity,
  DriverTransactionEntity,
  DriverWalletEntity,
  FeedbackParameterEntity,
  FeedbackEntity,
  FleetEntity,
  FleetWalletEntity,
  FleetTransactionEntity,
  FleetDeviceEntity,
  RequestEntity,
  OrderMessageEntity,
  OrderCancelReasonEntity,
  PaymentGatewayEntity,
  PaymentEntity,
  ServiceEntity,
  ServiceCategoryEntity,
  CouponEntity,
  RegionEntity,
  RiderEntity,
  RiderWalletEntity,
  RiderTransactionEntity,
  RiderAddressEntity,
  ServiceOptionEntity,
  GiftBatchEntity,
  GiftCodeEntity,
  SOSEntity,
  SOSActivityEntity,
  AnnouncementEntity,
  ZonePriceEntity,
  GatewayToUserEntity,
  SavedPaymentMethodEntity,
  RiderReviewEntity,
  PayoutMethodEntity,
  PayoutAccountEntity,
  PayoutSessionEntity,
];
