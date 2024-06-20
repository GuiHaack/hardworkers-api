import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Patch,
  Body,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Roles } from './roles.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  findAll(): Promise<Roles[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Roles> {
    return this.rolesService.findOne(+id);
  }

  @Post()
  create(@Body() employee: Roles) {
    return this.rolesService.create(employee);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() employee: Roles) {
    return this.rolesService.update(+id, employee); // Certifique-se de converter o id para número
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.rolesService.remove(+id);
  }
}
