
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, ValidateNested, IsObject } from 'class-validator';

// A DTO for the OpenGraph object
class OpenGraphDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    image: string;
}

// A DTO for the SEO object
class SeoDto {
    @IsString()
    @IsNotEmpty()
    metaTitle: string;

    @IsString()
    @IsNotEmpty()
    metaDescription: string;

    @IsString()
    @IsNotEmpty()
    slug: string;

    @IsString({ each: true })
    keywords: string[];

    @IsString()
    @IsNotEmpty()
    canonicalUrl: string;

    @ValidateNested()
    @Type(() => OpenGraphDto)
    @IsObject()
    openGraph: OpenGraphDto;
}

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @ValidateNested()
    @Type(() => SeoDto)
    @IsObject()
    seo: SeoDto;
}
