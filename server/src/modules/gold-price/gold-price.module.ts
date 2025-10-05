import { Module } from "@nestjs/common";
import { GoldPriceService } from "./gold-price.service";

@Module({
  controllers: [],
  providers: [GoldPriceService],
  exports: [GoldPriceService],
})
export class GoldPriceModule {}
