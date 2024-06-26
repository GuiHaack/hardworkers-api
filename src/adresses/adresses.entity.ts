import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Companies } from '../companies/companies.entity';

@Entity('adresses')
export class Adresses {
  @PrimaryGeneratedColumn()
  idAdress: number;

  @Column()
  publicPlace: string;

  @Column()
  number: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @Column()
  zipCode: string;

  @Column()
  neighborhood: string;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  @ManyToOne(() => Companies, (company) => company.adresses)
  @JoinColumn({ name: 'companyId' })
  company: Companies;
}
