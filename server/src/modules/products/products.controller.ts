import { Controller, Get, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery } from "@nestjs/swagger";
import { ProductsService } from "./products.service";

interface ProductFilters {
  minPrice?: number;
  maxPrice?: number;
  minPopularity?: number;
  maxPopularity?: number;
  search?: string;
}

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @UseGuards(AuthGuard)
  @ApiOperation({
    tags: ["Products"],
    description: "Get All Products",
  })
  @Get()
  async findAll(
    @Query("minPrice") minPrice?: string,
    @Query("maxPrice") maxPrice?: string,
    @Query("minPopularity") minPopularity?: string,
    @Query("maxPopularity") maxPopularity?: string,
    @Query("search") search?: string,
  ) {
    const filters: ProductFilters = {
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      minPopularity: minPopularity ? parseFloat(minPopularity) : undefined,
      maxPopularity: maxPopularity ? parseFloat(maxPopularity) : undefined,
      search: search || undefined,
    };

    return this.productsService.findAll(filters);
  }
}
