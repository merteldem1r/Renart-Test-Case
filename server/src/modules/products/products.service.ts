import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private Products: Repository<Product>,
  ) {}

  async findAll() {
    const products = await this.Products.find();

    return products;
  }
}
