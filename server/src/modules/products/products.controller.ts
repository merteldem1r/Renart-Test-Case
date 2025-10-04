import { Controller, Get } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @UseGuards(AuthGuard)
  @ApiOperation({
    tags: ["Products"],
    description: "Get All Products",
  })
  @Get()
  findAll() {
    return this.productsService.findAll();
  }
}
