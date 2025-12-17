import { IsString, IsNumber, IsMongoId, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { SeoDto } from '../../common/dto/seo.dto';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsMongoId()
  category: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SeoDto)
  seo?: SeoDto;
}

