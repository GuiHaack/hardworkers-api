import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  documentNumber: string;

  @IsOptional()
  phoneNumber?: string;

  @IsNotEmpty()
  corporateName: string;

  @IsNotEmpty()
  tradeName: string;

  @IsNotEmpty()
  @IsNumber()
  employeeId: number;

  @IsOptional()
  @IsNumber()
  addressId?: number;
}
