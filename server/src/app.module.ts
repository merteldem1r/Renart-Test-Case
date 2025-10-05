import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { I18nLanguageModule } from "./modules/language/language.module";
import { ProductsModule } from "./modules/products/products.module";
import { ProfilesModule } from "./modules/profiles/profiles.module";
import { SupabaseModule } from "./modules/supabase/supabase.module";
import { SupabaseService } from "./modules/supabase/supabase.service";
import { GoldPriceModule } from "./modules/gold-price/gold-price.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      synchronize: process.env.NODE_ENV == "development",
      autoLoadEntities: true,
      ssl: { rejectUnauthorized: false },
      logging:
        process.env.NODE_ENV === "development"
          ? ["error", "schema"]
          : ["error"],
    }),
    SupabaseModule,
    I18nLanguageModule,
    ProfilesModule,
    ProductsModule,
    GoldPriceModule,
  ],
  controllers: [AppController],
  providers: [AppService, SupabaseService],
})
export class AppModule {}
