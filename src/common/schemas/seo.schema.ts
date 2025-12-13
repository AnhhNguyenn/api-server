
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class OpenGraph {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true, default: 'website' })
  type: string;
}

export const OpenGraphSchema = SchemaFactory.createForClass(OpenGraph);

@Schema({ _id: false })
export class Seo {
  @Prop({ required: true, maxlength: 60 })
  metaTitle: string;

  @Prop({ required: true, maxlength: 160 })
  metaDescription: string;

  @Prop({ required: true, unique: true, index: true })
  slug: string;

  @Prop([String])
  keywords: string[];

  @Prop({ required: true })
  canonicalUrl: string;

  @Prop({ type: OpenGraphSchema, required: true })
  openGraph: OpenGraph;

  @Prop({ default: false })
  noIndex: boolean;
}

export const SeoSchema = SchemaFactory.createForClass(Seo);
