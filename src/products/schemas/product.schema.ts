import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Seo, SeoSchema } from '../../common/schemas/seo.schema';
import { Category } from '../../categories/schemas/category.schema';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop([String])
  images: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category', required: true })
  category: Category;

  @Prop({ type: SeoSchema, required: true })
  seo: Seo;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
