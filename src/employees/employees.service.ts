import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employees } from './employees.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employees)
    private employeesRepository: Repository<Employees>,
  ) {}

  findAll(): Promise<Employees[]> {
    return this.employeesRepository.find();
  }

  async findOne(id: number): Promise<Employees> {
    const employee = await this.employeesRepository.findOne({
      where: { idEmployee: id },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  create(employee: Employees): Promise<Employees> {
    return this.employeesRepository.save(employee);
  }

  async update(id: number, employee: Employees): Promise<Employees> {
    await this.employeesRepository.update(id, employee);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.employeesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
  }
}
