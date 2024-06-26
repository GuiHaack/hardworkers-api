import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GeocodingService {
  constructor(private readonly httpService: HttpService) {}

  async getCoordinates(
    publicPlace: string,
    number: string,
    city: string,
    uf: string,
    zipCode: string,
    neighborhood: string,
  ): Promise<{ latitude: number; longitude: number }> {
    const address = `${number} ${publicPlace}, ${neighborhood}, ${city}, ${uf}, ${zipCode}`;
    const response = await this.httpService
      .get(`https://nominatim.openpublicPlacemap.org/search`, {
        params: {
          q: address,
          format: 'json',
          addressdetails: 1,
          limit: 1,
        },
      })
      .toPromise();

    const data = response.data[0];
    if (!data) {
      throw new Error('Address not found');
    }

    return {
      latitude: parseFloat(data.lat),
      longitude: parseFloat(data.lon),
    };
  }
}
