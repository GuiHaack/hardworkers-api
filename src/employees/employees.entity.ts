import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Roles } from '../roles/roles.entity';
import { Companies } from '../companies/companies.entity';

@Entity('employees')
export class Employees {
  @PrimaryGeneratedColumn()
  idEmployee: number;

  @ManyToOne(() => Roles, (role) => role.employees)
  @JoinColumn({ name: 'idRole' })
  role: Roles;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  mainPicture: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  document: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @OneToOne(() => Companies, (company) => company.employee, { nullable: true })
  company: Companies;
}
