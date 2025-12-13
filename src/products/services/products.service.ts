import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    images: string[],
  ): Promise<Product> {
    const createdProduct = new this.productModel({
      ...createProductDto,
      images,
    });
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().populate('category').exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).populate('category').exec();
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: any,
    images: string[],
  ): Promise<Product> {
    const existingProduct = await this.productModel.findByIdAndUpdate(
      id,
      { ...updateProductDto, images },
      { new: true },
    );
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return existingProduct;
  }

  async remove(id: string): Promise<any> {
    const result = await this.productModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return result;
  }
}
