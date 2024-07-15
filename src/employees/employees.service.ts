import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employees } from './employees.entity';
import { CreateEmployeeDto } from './dto/create-employees.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employees)
    private employeesRepository: Repository<Employees>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employees> {
    const employee = this.employeesRepository.create(createEmployeeDto);
    return this.employeesRepository.save(employee);
  }

  findAll(): Promise<Employees[]> {
    return this.employeesRepository.find({
      relations: ['role', 'company', 'company.adresses'],
    });
  }

  findOne(id: number): Promise<Employees> {
    return this.employeesRepository.findOne({
      where: { idEmployee: id },
      relations: ['role', 'company', 'company.adresses'],
    });
  }

  async update(
    id: number,
    updateEmployeeDto: CreateEmployeeDto,
  ): Promise<Employees> {
    await this.employeesRepository.update(id, updateEmployeeDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.employeesRepository.delete(id);
  }
}
