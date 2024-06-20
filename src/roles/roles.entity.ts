// src/roles/role.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Employees } from '../employees/employees.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  idRole: number;

  @Column()
  title: string;

  @Column()
  alias: string;

  @OneToMany(() => Employees, (employee) => employee.idRole)
  employees: Employees[];
}
