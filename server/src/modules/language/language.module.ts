import { Global, Module } from "@nestjs/common";
import {
  AcceptLanguageResolver,
  CookieResolver,
  I18nModule,
  QueryResolver,
} from "nestjs-i18n";
import * as path from "path";
import { I18nLanguageService } from "./language.service";

@Global()
@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: "en",
      fallbacks: { "tr-*": "tr", "en-*": "en" },
      loaderOptions: {
        path:
          process.env.NODE_ENV === "production"
            ? path.join(__dirname, "../..", "i18n")
            : path.join(process.cwd(), "src/i18n"),
        watch: process.env.NODE_ENV !== "production",
      },
      resolvers: [
        { use: QueryResolver, options: ["lang", "lng"] },
        new AcceptLanguageResolver({
          matchType: "strict",
        }),
        new CookieResolver(["lang"]),
      ],
    }),
  ],
  providers: [I18nLanguageService],
  exports: [I18nLanguageService],
})
export class I18nLanguageModule {}
