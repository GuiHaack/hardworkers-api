import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Employees } from '../employees/employees.entity';

@Entity('companies')
export class Companies {
  @PrimaryGeneratedColumn()
  idCompany: number;

  @Column()
  name: string;

  @Column()
  documentNumber: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column()
  corporateName: string;

  @Column()
  tradeName: string;

  @OneToOne(() => Employees, (employee) => employee.company)
  @JoinColumn({ name: 'employeeId' })
  employee: Employees;
}
