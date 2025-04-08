import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { SaleItem } from 'src/sale-item/entities/sale-item.entity';
import { Product } from 'src/products/entities/product.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { BusinessStat } from 'src/business-stats/entities/business-stat.entity';
import { CreateSaleDto } from './dto/create-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale) private saleRepo: Repository<Sale>,
    @InjectRepository(SaleItem) private saleItemRepo: Repository<SaleItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(BusinessStat) private statRepo: Repository<BusinessStat>,
  ) {}

  async createSale(dto: CreateSaleDto): Promise<Sale> {
    const customer = await this.customerRepo.findOneByOrFail({ id: dto.customerId });
    let total = 0;
    const saleItems: SaleItem[] = [];

    for (const item of dto.items) {
      const product = await this.productRepo.findOneByOrFail({ id: item.productId });

      if (product.lot < item.quantity) {
        throw new Error(`Stock insuficiente para el producto: ${product.fullName}`);
      }

      product.lot -= item.quantity;
      await this.productRepo.save(product);

      const subtotal = product.price * item.quantity;
      total += subtotal;

      const saleItem = this.saleItemRepo.create({
        product,
        quantity: item.quantity,
        unitPrice: product.price,
        subtotal,
      });
      saleItems.push(saleItem);
    }

    const sale = this.saleRepo.create({
      customer,
      colaborator: dto.colaborator,
      paymentType: dto.paymentType,
      total,
      isPaid: dto.paymentType === 'contado',
      items: saleItems,
    } as Partial<Sale>);

    await this.saleRepo.save(sale);

    if (dto.paymentType === 'contado') {
      const stat = (await this.statRepo.findOneBy({})) || this.statRepo.create();
    
      stat.totalSales = (stat.totalSales || 0) + total;
      stat.totalProductsSold = (stat.totalProductsSold || 0) + dto.items.reduce((acc, i) => acc + i.quantity, 0);
    
      await this.statRepo.save(stat);
    }
    

    return sale;
  }
}
