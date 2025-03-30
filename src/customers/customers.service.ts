import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {

constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>
){}

    async allCustomers(){
        const allCustomers = await this.customerRepository.find();
        return allCustomers;
    }

    async createCustomer(createCustomerDto:CreateCustomerDto):Promise<Customer>{

        const { email, phone } = createCustomerDto;

        try {
            const customerBd = this.customerRepository.findBy({email});

            // if(customerBd){
            //     throw new BadRequestException(`Error al crear el cliente ${email}, ya existe en la base de datos.`)
            // }

            if(phone < 0){
                throw new BadRequestException(`Error al crear el cliente ${email}, el valor numerico debe ser positivo.`)
            }

            const customer = this.customerRepository.create(createCustomerDto);
            await this.customerRepository.save(customer);

            return customer;
            
        } catch (error) {
            console.log(error);
            throw new BadRequestException(`Error al crear el cliente ${error.message}`)
        }
    }

    async updateCustomer(id: string, updateCustomerDto: UpdateCustomerDto){

        const { email, phone } = updateCustomerDto;

        try {
            
            const customerBd = this.customerRepository.findBy({email}); 

            // if(phone < 0){
            //     throw new BadRequestException(`Error al crear el cliente ${email}, el valor numerico debe ser positivo.`)
            // }
            
            // if (!email) {
            //     throw new NotFoundException('No existe el usuario')
            // }

            const customerUpdate = this.customerRepository.update(id, updateCustomerDto);
            return customerUpdate;
        } catch (error) {
            throw new BadRequestException(`Hay error al actualizar el cliente ${email}`)
        }
    }

}
