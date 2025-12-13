
import { SeoDto } from '../../common/dto/seo.dto';

export class CreateProductDto {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly category: string; // Category ID
  readonly seo: SeoDto;
}
