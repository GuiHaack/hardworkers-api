import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employees } from './employees.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id); // Certifique-se de converter o id para número
  }

  @Post()
  create(@Body() employee: Employees) {
    return this.employeesService.create(employee);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() employee: Employees) {
    return this.employeesService.update(+id, employee); // Certifique-se de converter o id para número
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id); // Certifique-se de converter o id para número
  }
}
