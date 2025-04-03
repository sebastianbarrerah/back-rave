import { Controller, Body, Patch, Param} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Controller('/inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }

  @Patch()
  updateInventory(@Body() updateInventoryDto: UpdateInventoryDto) {
    return this.inventoryService.updateStockMin(updateInventoryDto);
  }

  @Patch('/update/:id')
  updateInventoryMax(@Param('id') id: string ,@Body() updateInventoryDto: UpdateInventoryDto) {
    return this.inventoryService.updateStockMax(id, updateInventoryDto);
  }

}
