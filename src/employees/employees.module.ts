import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { Employees } from './employees.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employees])],
  providers: [EmployeesService],
  controllers: [EmployeesController],
  exports: [TypeOrmModule],
})
export class EmployeesModule {}
