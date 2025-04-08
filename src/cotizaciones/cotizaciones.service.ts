import { Injectable, NotFoundException, BadRequestException, Inject, forwardRef } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { type Repository, Between, DataSource } from "typeorm"
import { Cotizacion } from "./entities/cotizacion.entity"
import { DetalleCotizacion } from "./entities/detalle-cotizacion.entity"
import { CreateCotizacionDto } from "./dto/create-cotizacion.dto"
import { UpdateCotizacionDto } from "./dto/update-cotizacion.dto"
import { ProductosService } from "../productos/productos.service"
import { ClientesService } from "../clientes/clientes.service"

@Injectable()
export class CotizacionesService {
  constructor(
    @InjectRepository(Cotizacion)
    private cotizacionesRepository: Repository<Cotizacion>,
  
    @InjectRepository(DetalleCotizacion)
    private detallesCotizacionRepository: Repository<DetalleCotizacion>,
  
    private productosService: ProductosService,
    private clientesService: ClientesService,
  
    @Inject(DataSource) // 👈 esto es clave
    private dataSource: DataSource,
  ) {}
  

  async create(createCotizacionDto: CreateCotizacionDto): Promise<Cotizacion> {
    // Iniciar transacción
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      // Verificar si existe el cliente
      const cliente = await this.clientesService.findOne(createCotizacionDto.clienteId)

      // Generar número de cotización
      const numeroCotizacion = `COT-${Date.now().toString().slice(-4)}`

      // Crear la cotización
      const cotizacion = this.cotizacionesRepository.create({
        numero: numeroCotizacion,
        clienteId: cliente.id,
        vendedorId: createCotizacionDto.vendedorId,
        fecha: new Date(),
        fechaVencimiento: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 días
        subtotal: 0,
        impuestos: 0,
        total: 0,
        estado: "Pendiente",
      })

      // Guardar la cotización
      const cotizacionGuardada = await this.cotizacionesRepository.save(cotizacion)

      // Procesar detalles de la cotización
      let subtotal = 0

      for (const detalle of createCotizacionDto.detalles) {
        // Verificar si existe el producto
        const producto = await this.productosService.findProductoById(detalle.productoId)

        // Calcular importe
        const importe = producto.precio * detalle.cantidad
        subtotal += importe

        // Crear detalle de cotización
        const detalleCotizacion = this.detallesCotizacionRepository.create({
          cotizacionId: cotizacionGuardada.id,
          productoId: producto.id,
          cantidad: detalle.cantidad,
          precioUnitario: producto.precio,
          importe,
        })

        // Guardar detalle de cotización
        await this.detallesCotizacionRepository.save(detalleCotizacion)
      }

      // Calcular impuestos y total
      const impuestos = subtotal * 0.16 // 16% de IVA
      const total = subtotal + impuestos

      // Actualizar totales de la cotización
      await this.cotizacionesRepository.update(cotizacionGuardada.id, {
        subtotal,
        impuestos,
        total,
      })

      // Confirmar transacción
      await queryRunner.commitTransaction()

      // Retornar la cotización con sus detalles
      return this.findOne(cotizacionGuardada.id)
    } catch (error) {
      // Revertir transacción en caso de error
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      // Liberar el queryRunner
      await queryRunner.release()
    }
  }

  async findAll(): Promise<Cotizacion[]> {
    return this.cotizacionesRepository.find({
      relations: ["cliente", "detalles", "detalles.producto"],
      order: { fecha: "DESC" },
    })
  }

  async findOne(id: number): Promise<Cotizacion> {
    const cotizacion = await this.cotizacionesRepository.findOne({
      where: { id },
      relations: ["cliente", "detalles", "detalles.producto"],
    })

    if (!cotizacion) {
      throw new NotFoundException(`Cotización con ID ${id} no encontrada`)
    }

    return cotizacion
  }

  async findByCliente(clienteId: number): Promise<Cotizacion[]> {
    return this.cotizacionesRepository.find({
      where: { clienteId },
      relations: ["cliente", "detalles", "detalles.producto"],
      order: { fecha: "DESC" },
    })
  }

  async findByVendedor(vendedorId: number): Promise<Cotizacion[]> {
    return this.cotizacionesRepository.find({
      where: { vendedorId },
      relations: ["cliente", "detalles", "detalles.producto"],
      order: { fecha: "DESC" },
    })
  }

  async findByFecha(fechaInicio: Date, fechaFin: Date): Promise<Cotizacion[]> {
    return this.cotizacionesRepository.find({
      where: {
        fecha: Between(fechaInicio, fechaFin),
      },
      relations: ["cliente", "detalles", "detalles.producto"],
      order: { fecha: "DESC" },
    })
  }

  async findByEstado(estado: string): Promise<Cotizacion[]> {
    return this.cotizacionesRepository.find({
      where: { estado },
      relations: ["cliente", "detalles", "detalles.producto"],
      order: { fecha: "DESC" },
    })
  }

  async update(id: number, updateCotizacionDto: UpdateCotizacionDto): Promise<Cotizacion> {
    const cotizacion = await this.findOne(id)

    // Iniciar transacción
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      // Actualizar estado
      if (updateCotizacionDto.estado) {
        await this.cotizacionesRepository.update(id, { estado: updateCotizacionDto.estado })
      }

      // Si se proporcionan nuevos detalles, actualizar
      if (updateCotizacionDto.detalles && updateCotizacionDto.detalles.length > 0) {
        // Eliminar detalles anteriores
        await this.detallesCotizacionRepository.delete({ cotizacionId: id })

        // Procesar nuevos detalles
        let subtotal = 0

        for (const detalle of updateCotizacionDto.detalles) {
          // Verificar si existe el producto
          const producto = await this.productosService.findProductoById(detalle.productoId)

          // Calcular importe
          const importe = producto.precio * detalle.cantidad
          subtotal += importe

          // Crear detalle de cotización
          const detalleCotizacion = this.detallesCotizacionRepository.create({
            cotizacionId: id,
            productoId: producto.id,
            cantidad: detalle.cantidad,
            precioUnitario: producto.precio,
            importe,
          })

          // Guardar detalle de cotización
          await this.detallesCotizacionRepository.save(detalleCotizacion)
        }

        // Calcular impuestos y total
        const impuestos = subtotal * 0.16 // 16% de IVA
        const total = subtotal + impuestos

        // Actualizar totales de la cotización
        await this.cotizacionesRepository.update(id, {
          subtotal,
          impuestos,
          total,
        })
      }

      // Confirmar transacción
      await queryRunner.commitTransaction()

      // Retornar la cotización actualizada
      return this.findOne(id)
    } catch (error) {
      // Revertir transacción en caso de error
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      // Liberar el queryRunner
      await queryRunner.release()
    }
  }

  async remove(id: number): Promise<void> {
    const cotizacion = await this.findOne(id)

    // No se permite eliminar cotizaciones aprobadas
    if (cotizacion.estado === "Aprobada") {
      throw new BadRequestException("No se puede eliminar una cotización aprobada")
    }

    await this.cotizacionesRepository.remove(cotizacion)
  }
}
