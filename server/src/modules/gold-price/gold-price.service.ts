import { Injectable } from "@nestjs/common";

@Injectable()
export class GoldPriceService {
  private cachedPrice: number | null = null;
  private lastFetchedTime: number = 0;
  private readonly CACHE_DURATION_MS = 15 * 60 * 1000; // cache for 15 min

  private async fetchFromGoldPriceOrg(): Promise<number | null> {
    try {
      const response = await fetch(`${process.env.GOLD_API}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      console.log(data);

      // ounce to gram (1 troy oz = 31.1035 grams)
      const pricePerGram = data.price / 31.1035;
      return pricePerGram;
    } catch (error) {
      return null;
    }
  }

  async getCurrentGoldPricePerGram(): Promise<number> {
    if (
      this.cachedPrice &&
      Date.now() - this.lastFetchedTime < this.CACHE_DURATION_MS
    ) {
      return this.cachedPrice;
    }

    try {
      let goldPrice = await this.fetchFromGoldPriceOrg();

      if (!goldPrice) {
        goldPrice = 65;
      }

      this.cachedPrice = goldPrice;
      this.lastFetchedTime = Date.now();

      return goldPrice;
    } catch (error) {
      if (this.cachedPrice) {
        return this.cachedPrice;
      }

      return 65;
    }
  }
}
