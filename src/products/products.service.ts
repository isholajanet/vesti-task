import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  constructor(@InjectRepository(Product) 
  private readonly productRepository: Repository<Product>){}

  async create(createProductDto: CreateProductDto): Promise<Product> {

    return this.productRepository.save(createProductDto);
  }

  async findProductByName(name: string): Promise<Product> {
    const product = this.productRepository.findOne({ where: {name}});
    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(productId: number): Promise<Product> {
    return this.productRepository.findOne({ where: {productId}});
  }

  async update(productId: number, updateProductDto: UpdateProductDto): Promise<Product> {
    await this.productRepository.update(productId, updateProductDto);
    return this.productRepository.findOne({ where: { productId }});
  }

  async remove(productId: number): Promise<void> {
    await this.productRepository.delete(productId);
  }

}
