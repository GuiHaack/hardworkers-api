import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './employees/employees.module';
import { RolesModule } from './roles/roles.module';
import { Employees } from './employees/employees.entity';
import { Roles } from './roles/roles.entity';
import { CompaniesController } from './companies/companies.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'e5d4s19GUIhaack*',
      database: 'mydb',
      entities: [Employees, Roles],
      synchronize: true,
      logging: true,
    }),
    EmployeesModule,
    RolesModule,
  ],
  controllers: [CompaniesController],
})
export class AppModule {}
