import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GoldPriceService } from './gold-price.service';
import { CreateGoldPriceDto } from './dto/create-gold-price.dto';
import { UpdateGoldPriceDto } from './dto/update-gold-price.dto';

@Controller('gold-price')
export class GoldPriceController {
  constructor(private readonly goldPriceService: GoldPriceService) {}

  @Post()
  create(@Body() createGoldPriceDto: CreateGoldPriceDto) {
    return this.goldPriceService.create(createGoldPriceDto);
  }

  @Get()
  findAll() {
    return this.goldPriceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goldPriceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoldPriceDto: UpdateGoldPriceDto) {
    return this.goldPriceService.update(+id, updateGoldPriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goldPriceService.remove(+id);
  }
}
