
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Seo, SeoSchema } from '../../common/schemas/seo.schema';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: SeoSchema, required: true })
  seo: Seo;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
