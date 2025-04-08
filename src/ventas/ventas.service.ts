import { Injectable, NotFoundException, BadRequestException, Inject, forwardRef } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { type Repository, Between, DataSource } from "typeorm"
import { Venta } from "./entities/venta.entity"
import { DetalleVenta } from "./entities/detalle-venta.entity"
import { CreateVentaDto } from "./dto/create-venta.dto"
import { UpdateVentaDto } from "./dto/update-venta.dto"
import { ProductosService } from "../productos/productos.service"
import { ClientesService } from "../clientes/clientes.service"

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private ventasRepository: Repository<Venta>,
    @InjectRepository(DetalleVenta)
    private detallesVentaRepository: Repository<DetalleVenta>,
    @Inject(forwardRef(() => ProductosService)) // 👈 esto evita el ciclo
    private productosService: ProductosService,
    @Inject(forwardRef(() => ClientesService)) // 👈 igual para clientes
    private clientesService: ClientesService,
    @Inject(DataSource)
    private readonly dataSource: DataSource,
  ) {}
  

  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    // Iniciar transacción
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      // Verificar si existe el cliente
      const cliente = await this.clientesService.findOne(createVentaDto.clienteId)

      // Crear la venta
      const venta = this.ventasRepository.create({
        clienteId: cliente.id,
        vendedorId: createVentaDto.vendedorId,
        fecha: new Date(),
        subtotal: 0,
        impuestos: 0,
        total: 0,
        estado: "Completada",
      })

      // Guardar la venta
      const ventaGuardada = await this.ventasRepository.save(venta)

      // Calcular totales
      let subtotal = 0

      // Procesar detalles de la venta
      for (const detalle of createVentaDto.detalles) {
        // Verificar si existe el producto
        const producto = await this.productosService.findProductoById(detalle.productoId)

        // Verificar stock
        if (producto.stock < detalle.cantidad) {
          throw new BadRequestException(`Stock insuficiente para el producto ${producto.nombre}`)
        }

        // Calcular importe
        const importe = producto.precio * detalle.cantidad
        subtotal += importe

        // Crear detalle de venta
        const detalleVenta = this.detallesVentaRepository.create({
          ventaId: ventaGuardada.id,
          productoId: producto.id,
          cantidad: detalle.cantidad,
          precioUnitario: producto.precio,
          importe,
        })

        // Guardar detalle de venta
        await this.detallesVentaRepository.save(detalleVenta)

        // Actualizar stock del producto
        await this.productosService.updateProducto(producto.id, {
          stock: producto.stock - detalle.cantidad,
        })
      }

      // Calcular impuestos y total
      const impuestos = subtotal * 0.16 // 16% de IVA
      const total = subtotal + impuestos

      // Actualizar totales de la venta
      await this.ventasRepository.update(ventaGuardada.id, {
        subtotal,
        impuestos,
        total,
      })

      // Actualizar estadísticas del cliente
      await this.clientesService.update(cliente.id, {
        // compras: cliente.compras + 1,
        // totalCompras: cliente.totalCompras + total,
      })

      // Confirmar transacción
      await queryRunner.commitTransaction()

      // Retornar la venta con sus detalles
      return this.findOne(ventaGuardada.id)
    } catch (error) {
      // Revertir transacción en caso de error
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      // Liberar el queryRunner
      await queryRunner.release()
    }
  }

  async findAll(): Promise<Venta[]> {
    return this.ventasRepository.find({
      relations: ["cliente", "detalles", "detalles.producto"],
      order: { fecha: "DESC" },
    })
  }

  async findOne(id: number): Promise<Venta> {
    const venta = await this.ventasRepository.findOne({
      where: { id },
      relations: ["cliente", "detalles", "detalles.producto"],
    })

    if (!venta) {
      throw new NotFoundException(`Venta con ID ${id} no encontrada`)
    }

    return venta
  }

  async findByCliente(clienteId: number): Promise<Venta[]> {
    return this.ventasRepository.find({
      where: { clienteId },
      relations: ["cliente", "detalles", "detalles.producto"],
      order: { fecha: "DESC" },
    })
  }

  async findByVendedor(vendedorId: number): Promise<Venta[]> {
    return this.ventasRepository.find({
      where: { vendedorId },
      relations: ["cliente", "detalles", "detalles.producto"],
      order: { fecha: "DESC" },
    })
  }

  async findByFecha(fechaInicio: Date, fechaFin: Date): Promise<Venta[]> {
    return this.ventasRepository.find({
      where: {
        fecha: Between(fechaInicio, fechaFin),
      },
      relations: ["cliente", "detalles", "detalles.producto"],
      order: { fecha: "DESC" },
    })
  }

  async update(id: number, updateVentaDto: UpdateVentaDto): Promise<Venta> {
    const venta = await this.findOne(id)

    // Solo se permite actualizar el estado de la venta
    if (updateVentaDto.estado) {
      await this.ventasRepository.update(id, { estado: updateVentaDto.estado })
    }

    return this.findOne(id)
  }

  async remove(id: number): Promise<void> {
    const venta = await this.findOne(id)

    // No se permite eliminar ventas completadas
    if (venta.estado === "Completada") {
      throw new BadRequestException("No se puede eliminar una venta completada")
    }

    await this.ventasRepository.remove(venta)
  }
}
