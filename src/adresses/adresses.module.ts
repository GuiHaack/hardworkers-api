import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adresses } from './adresses.entity';
import { AdressesService } from './adresses.service';
import { AdressesController } from './adresses.controller';
import { Companies } from '../companies/companies.entity';
import { HttpModule } from '@nestjs/axios';
import { GeocodingService } from 'src/geocoding/geocoding.service';

@Module({
  imports: [TypeOrmModule.forFeature([Adresses, Companies]), HttpModule],
  providers: [AdressesService, GeocodingService],
  controllers: [AdressesController],
})
export class AdressesModule {}
