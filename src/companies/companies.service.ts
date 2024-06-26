import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Companies } from './companies.entity';
import { Employees } from '../employees/employees.entity';
import { Adresses } from '../adresses/adresses.entity';
import { CreateCompanyDto } from './dto/create-companies.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Companies)
    private companiesRepository: Repository<Companies>,
    @InjectRepository(Employees)
    private employeesRepository: Repository<Employees>,
    @InjectRepository(Adresses)
    private addressesRepository: Repository<Adresses>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Companies> {
    const {
      name,
      documentNumber,
      phoneNumber,
      corporateName,
      tradeName,
      employeeId,
      addressId,
    } = createCompanyDto;

    const employee = await this.employeesRepository.findOne({
      where: { idEmployee: employeeId },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const address = addressId
      ? await this.addressesRepository.findOne({
          where: { idAdress: addressId },
        })
      : null;
    if (addressId && !address) {
      throw new NotFoundException('Address not found');
    }

    const company = this.companiesRepository.create({
      name,
      documentNumber,
      phoneNumber,
      corporateName,
      tradeName,
      employee,
      adresses: address ? [address] : [],
    });

    return this.companiesRepository.save(company);
  }

  findAll(): Promise<Companies[]> {
    return this.companiesRepository.find({
      relations: ['employee', 'adresses'],
    });
  }

  findOne(id: number): Promise<Companies> {
    return this.companiesRepository.findOne({
      where: { idCompany: id },
      relations: ['employee', 'adresses'],
    });
  }

  async update(id, updateCompanyDto: CreateCompanyDto): Promise<Companies> {
    const company = await this.companiesRepository.findOne(id);
    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const {
      name,
      documentNumber,
      phoneNumber,
      corporateName,
      tradeName,
      employeeId,
      addressId,
    } = updateCompanyDto;

    const employee = await this.employeesRepository.findOne({
      where: { idEmployee: employeeId },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const address = addressId
      ? await this.addressesRepository.findOne({
          where: { idAdress: addressId },
        })
      : null;
    if (addressId && !address) {
      throw new NotFoundException('Address not found');
    }

    company.name = name;
    company.documentNumber = documentNumber;
    company.phoneNumber = phoneNumber;
    company.corporateName = corporateName;
    company.tradeName = tradeName;
    company.employee = employee;
    if (address) {
      company.adresses = [address];
    }

    return this.companiesRepository.save(company);
  }

  async remove(id: number): Promise<void> {
    await this.companiesRepository.delete(id);
  }
}
