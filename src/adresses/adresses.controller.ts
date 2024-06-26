import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AdressesService } from './adresses.service';
import { CreateAdressDto } from './dto/create-adresses.dto';

@Controller('adresses')
export class AdressesController {
  constructor(private readonly adressesService: AdressesService) {}

  @Post()
  create(@Body() createAdressDto: CreateAdressDto) {
    return this.adressesService.create(createAdressDto);
  }

  @Get()
  findAll() {
    return this.adressesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adressesService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdressDto: Partial<CreateAdressDto>,
  ) {
    return this.adressesService.update(+id, updateAdressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adressesService.remove(+id);
  }
}
