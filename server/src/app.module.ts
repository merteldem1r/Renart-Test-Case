import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { I18nLanguageModule } from "./modules/language/language.module";
import { ProfilesModule } from "./modules/profiles/profiles.module";
import { SupabaseModule } from "./modules/supabase/supabase.module";
import { SupabaseService } from "./modules/supabase/supabase.service";
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      url:
        process.env.NODE_ENV == "development"
          ? process.env.DATABASE_URL
          : process.env.DATABASE_URL_DIRECT,
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
  ],
  controllers: [AppController],
  providers: [AppService, SupabaseService],
})
export class AppModule {}
