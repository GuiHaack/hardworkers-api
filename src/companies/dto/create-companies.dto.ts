import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly documentNumber: string;

  @IsString()
  @IsOptional()
  readonly phoneNumber?: string;

  @IsString()
  readonly corporateName: string;

  @IsString()
  readonly tradeName: string;

  @IsNumber()
  readonly idAdress: number;

  @IsNumber()
  @IsOptional()
  readonly employeeId?: number;
}
