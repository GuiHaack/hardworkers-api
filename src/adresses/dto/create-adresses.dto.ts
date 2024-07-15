import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateAdressDto {
  @IsNotEmpty()
  publicPlace: string;

  @IsNotEmpty()
  number: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  uf: string;

  @IsNotEmpty()
  zipCode: string;

  @IsNotEmpty()
  neighborhood: string;

  @IsNotEmpty()
  complement: string;

  @IsNotEmpty()
  referencePoint: string;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  companyId: number;
}
