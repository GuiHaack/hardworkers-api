import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Employees } from '../employees/employees.entity';
import { Adresses } from '../adresses/adresses.entity';

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

  @OneToMany(() => Adresses, (adress) => adress.company)
  adresses: Adresses[];
}
