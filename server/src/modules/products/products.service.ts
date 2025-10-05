import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GoldPriceService } from "../gold-price/gold-price.service";
import { Product } from "./entities/product.entity";

export interface ProductWithPrice extends Product {
  price: number;
  goldPrice: number;
}

interface ProductFilters {
  minPrice?: number;
  maxPrice?: number;
  minPopularity?: number;
  maxPopularity?: number;
  search?: string;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private Products: Repository<Product>,
    private goldPriceService: GoldPriceService,
  ) {}

  private calculatePrice(
    popularityScore: number,
    weight: number,
    goldPrice: number,
  ): number {
    const calculatedPrice = (popularityScore + 1) * weight * goldPrice;
    return calculatedPrice;
  }

  async findAll(filters?: ProductFilters): Promise<ProductWithPrice[]> {
    const queryBuilder = this.Products.createQueryBuilder("product")
      .where("product.disabled = :disabled", { disabled: false })
      .orderBy("product.created_at", "DESC");

    if (filters) {
      if (filters.minPopularity !== undefined) {
        queryBuilder.andWhere("product.popularity_score >= :minPopularity", {
          minPopularity: filters.minPopularity,
        });
      }
      if (filters.maxPopularity !== undefined) {
        queryBuilder.andWhere("product.popularity_score <= :maxPopularity", {
          maxPopularity: filters.maxPopularity,
        });
      }

      if (filters.search) {
        queryBuilder.andWhere("product.name ILIKE :search", {
          search: `%${filters.search}%`,
        });
      }
    }

    const products = await queryBuilder.getMany();
    const goldPrice = await this.goldPriceService.getCurrentGoldPricePerGram();

    // Calculate prices and apply price filters
    let productsWithPrices = products.map((product) => ({
      ...product,
      price: this.calculatePrice(
        product.popularity_score,
        product.weight,
        goldPrice,
      ),
      goldPrice,
    }));

    if (filters?.minPrice !== undefined) {
      productsWithPrices = productsWithPrices.filter(
        (product) => product.price >= filters.minPrice!,
      );
    }
    if (filters?.maxPrice !== undefined) {
      productsWithPrices = productsWithPrices.filter(
        (product) => product.price <= filters.maxPrice!,
      );
    }

    return productsWithPrices;
  }
}

export type { ProductFilters };
