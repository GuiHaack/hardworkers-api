// src/employees/employee.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employees {
  @PrimaryGeneratedColumn()
  idEmployee: number;

  @Column()
  idRole: number;

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
}
