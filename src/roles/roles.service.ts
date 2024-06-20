import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
  ) {}

  findAll(): Promise<Roles[]> {
    return this.rolesRepository.find();
  }

  async findOne(id: number): Promise<Roles> {
    const role = await this.rolesRepository.findOne({
      where: { idRole: id },
    });
    if (!role) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return role;
  }

  create(role: Roles): Promise<Roles> {
    return this.rolesRepository.save(role);
  }

  async update(id: number, role: Roles): Promise<Roles> {
    await this.rolesRepository.update(id, role);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.rolesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
  }
}
