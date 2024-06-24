import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Companies } from './companies.entity';
import { CreateCompanyDto } from './dto/create-companies.dto';
import { Employees } from 'src/employees/employees.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Companies)
    private companiesRepository: Repository<Companies>,
    @InjectRepository(Employees)
    private employeesRepository: Repository<Employees>,
  ) {}

  findAll(): Promise<Companies[]> {
    return this.companiesRepository.find();
  }

  findOne(id: number): Promise<Companies> {
    return this.companiesRepository.findOne({ where: { idCompany: id } });
  }

  async create(createCompanyDto: CreateCompanyDto): Promise<Companies> {
    const employee = await this.employeesRepository.findOne({
      where: { idEmployee: createCompanyDto.employeeId },
    });
    const company = this.companiesRepository.create({
      ...createCompanyDto,
      employee,
    });
    return this.companiesRepository.save(company);
  }
  async update(
    id: number,
    updateCompanyDto: CreateCompanyDto,
  ): Promise<Companies> {
    const company = await this.companiesRepository.findOne({
      where: { idCompany: id },
    });
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    if (updateCompanyDto.employeeId) {
      const employee = await this.employeesRepository.findOne({
        where: { idEmployee: updateCompanyDto.employeeId },
      });
      company.employee = employee;
    }
    Object.assign(company, updateCompanyDto);
    return this.companiesRepository.save(company);
  }

  async remove(id: number): Promise<void> {
    await this.companiesRepository.delete(id);
  }
}
