// src/modules/language/language.service.ts
import { Injectable } from "@nestjs/common";
import { I18nContext, I18nService } from "nestjs-i18n";

@Injectable()
export class I18nLanguageService {
  constructor(private readonly i18nService: I18nService) {}

  message(key: string, args?: Record<string, any>, lang?: string): string {
    const ctx = I18nContext.current();
    const resolvedLang = lang ?? ctx?.lang; 
    return this.i18nService.translate(key, {
      lang: resolvedLang,
      args,
    });
  }
}
