import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('/customers')
export class CustomersController {

    constructor(private readonly service: CustomersService){}

    @Get()
    async allCustomers(){
        return this.service.allCustomers();
    }

    @Post('/create')
    async createCustomer(@Body() createCustomerDto:CreateCustomerDto){
        return await this.service.createCustomer(createCustomerDto);
    }

    @Patch('/update/:id')
    async updateCustomer(@Param() id: string, @Body() updateCustomerDto: UpdateCustomerDto){
        return await this.service.updateCustomer(id , updateCustomerDto);
    }

}
