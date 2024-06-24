import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Employees } from '../employees/employees.entity';

@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn()
  idRole: number;

  @Column()
  title: string;

  @Column()
  alias: string;

  @OneToMany(() => Employees, (employees) => employees.role)
  employees: Employees[];
}
