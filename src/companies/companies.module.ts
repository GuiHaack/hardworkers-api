import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { Companies } from './companies.entity';
import { Employees } from '../employees/employees.entity';
import { Adresses } from '../adresses/adresses.entity'; // Importa a entidade Addresses

@Module({
  imports: [TypeOrmModule.forFeature([Companies, Employees, Adresses])],
  providers: [CompaniesService],
  controllers: [CompaniesController],
})
export class CompaniesModule {}
