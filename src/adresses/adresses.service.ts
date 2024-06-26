import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adresses } from './adresses.entity';
import { Companies } from '../companies/companies.entity';
import { GeocodingService } from 'src/geocoding/geocoding.service';
import { CreateAdressDto } from './dto/create-adresses.dto';

@Injectable()
export class AdressesService {
  constructor(
    @InjectRepository(Adresses)
    private readonly adressesRepository: Repository<Adresses>,
    @InjectRepository(Companies)
    private readonly companiesRepository: Repository<Companies>,
    private readonly geocodingService: GeocodingService,
  ) {}

  async create(createAdressDto: CreateAdressDto): Promise<Adresses> {
    const { companyId, publicPlace, number, city, uf, zipCode, neighborhood } =
      createAdressDto;
    const company = await this.companiesRepository.findOne({
      where: { idCompany: companyId },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const { latitude, longitude } = await this.geocodingService.getCoordinates(
      publicPlace,
      number,
      city,
      uf,
      zipCode,
      neighborhood,
    );

    const adress = this.adressesRepository.create({
      publicPlace,
      number,
      city,
      uf,
      zipCode,
      neighborhood,
      latitude,
      longitude,
      company,
    });

    return this.adressesRepository.save(adress);
  }

  findAll(): Promise<Adresses[]> {
    return this.adressesRepository.find({ relations: ['company'] });
  }

  findOne(id: number): Promise<Adresses> {
    return this.adressesRepository.findOne({
      where: { idAdress: id },
      relations: ['company'],
    });
  }

  async update(
    id: number,
    updateAdressDto: Partial<CreateAdressDto>,
  ): Promise<Adresses> {
    const adress = await this.findOne(id);

    if (!adress) {
      throw new NotFoundException('Adress not found');
    }

    Object.assign(adress, updateAdressDto);

    if (
      updateAdressDto.publicPlace ||
      updateAdressDto.number ||
      updateAdressDto.city ||
      updateAdressDto.uf ||
      updateAdressDto.zipCode ||
      updateAdressDto.neighborhood
    ) {
      const { latitude, longitude } =
        await this.geocodingService.getCoordinates(
          updateAdressDto.publicPlace || adress.publicPlace,
          updateAdressDto.number || adress.number,
          updateAdressDto.city || adress.city,
          updateAdressDto.uf || adress.uf,
          updateAdressDto.zipCode || adress.zipCode,
          updateAdressDto.neighborhood || adress.neighborhood,
        );
      adress.latitude = latitude;
      adress.longitude = longitude;
    }

    return this.adressesRepository.save(adress);
  }

  async remove(id: number): Promise<void> {
    const adress = await this.findOne(id);

    if (!adress) {
      throw new NotFoundException('Adress not found');
    }

    await this.adressesRepository.remove(adress);
  }
}
