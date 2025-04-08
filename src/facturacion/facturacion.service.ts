import { Injectable, NotFoundException, BadRequestException, forwardRef, Inject } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { type Repository, Between, DataSource } from "typeorm"
import { Factura } from "./entities/factura.entity"
import { DetalleFactura } from "./entities/detalle-factura.entity"
import { CreateFacturaDto } from "./dto/create-factura.dto"
import { UpdateFacturaDto } from "./dto/update-factura.dto"
import { VentasService } from "../ventas/ventas.service"
import { ClientesService } from "../clientes/clientes.service"

@Injectable()
export class FacturacionService {
  constructor(
    @InjectRepository(Factura)
    private facturasRepository: Repository<Factura>,
  
    @InjectRepository(DetalleFactura)
    private detallesFacturaRepository: Repository<DetalleFactura>,
  
    @Inject(forwardRef(() => VentasService))
    private ventasService: VentasService,
  
    @Inject(forwardRef(() => ClientesService))
    private clientesService: ClientesService,
  
    @Inject(DataSource) // 👈 esto es lo importante
    private dataSource: DataSource,
  ) {}

  async create(createFacturaDto: CreateFacturaDto): Promise<Factura> {
    // Iniciar transacción
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      // Verificar si existe el cliente
      const cliente = await this.clientesService.findOne(createFacturaDto.clienteId)

      // Verificar si existe la venta (si se proporciona)
      let venta = null
      if (createFacturaDto.ventaId) {
        venta = await this.ventasService.findOne(createFacturaDto.ventaId)
      }

      // Generar número de factura
      const numeroFactura = `F-${Date.now().toString().slice(-4)}`

      // Crear la factura
      const factura = this.facturasRepository.create({
        numero: numeroFactura,
        clienteId: cliente.id,
        ventaId: venta?.id,
        fecha: new Date(),
        subtotal: venta ? venta.subtotal : 0,
        impuestos: venta ? venta.impuestos : 0,
        total: venta ? venta.total : 0,
        estado: "Emitida",
      })

      // Guardar la factura
      const facturaGuardada = await this.facturasRepository.save(factura)

      // Si hay una venta asociada, copiar los detalles
      if (venta) {
        for (const detalleVenta of venta.detalles) {
          const detalleFactura = this.detallesFacturaRepository.create({
            facturaId: facturaGuardada.id,
            productoId: detalleVenta.productoId,
            cantidad: detalleVenta.cantidad,
            precioUnitario: detalleVenta.precioUnitario,
            importe: detalleVenta.importe,
          })

          await this.detallesFacturaRepository.save(detalleFactura)
        }
      } else if (createFacturaDto.detalles) {
        // Si no hay venta pero se proporcionan detalles
        let subtotal = 0

        for (const detalle of createFacturaDto.detalles) {
          const importe = detalle.precioUnitario * detalle.cantidad
          subtotal += importe

          const detalleFactura = this.detallesFacturaRepository.create({
            facturaId: facturaGuardada.id,
            productoId: detalle.productoId,
            cantidad: detalle.cantidad,
            precioUnitario: detalle.precioUnitario,
            importe,
          })

          await this.detallesFacturaRepository.save(detalleFactura)
        }

        // Calcular impuestos y total
        const impuestos = subtotal * 0.16 // 16% de IVA
        const total = subtotal + impuestos

        // Actualizar totales de la factura
        await this.facturasRepository.update(facturaGuardada.id, {
          subtotal,
          impuestos,
          total,
        })
      }

      // Confirmar transacción
      await queryRunner.commitTransaction()

      // Retornar la factura con sus detalles
      return this.findOne(facturaGuardada.id)
    } catch (error) {
      // Revertir transacción en caso de error
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      // Liberar el queryRunner
      await queryRunner.release()
    }
  }

  async findAll(): Promise<Factura[]> {
    return this.facturasRepository.find({
      relations: ["cliente", "detalles", "detalles.producto"],
      order: { fecha: "DESC" },
    })
  }

  async findOne(id: number): Promise<Factura> {
    const factura = await this.facturasRepository.findOne({
      where: { id },
      relations: ["cliente", "detalles", "detalles.producto"],
    })

    if (!factura) {
      throw new NotFoundException(`Factura con ID ${id} no encontrada`)
    }

    return factura
  }

  async findByCliente(clienteId: number): Promise<Factura[]> {
    return this.facturasRepository.find({
      where: { clienteId },
      relations: ["cliente", "detalles", "detalles.producto"],
      order: { fecha: "DESC" },
    })
  }

  async findByFecha(fechaInicio: Date, fechaFin: Date): Promise<Factura[]> {
    return this.facturasRepository.find({
      where: {
        fecha: Between(fechaInicio, fechaFin),
      },
      relations: ["cliente", "detalles", "detalles.producto"],
      order: { fecha: "DESC" },
    })
  }

  async findByEstado(estado: string): Promise<Factura[]> {
    return this.facturasRepository.find({
      where: { estado },
      relations: ["cliente", "detalles", "detalles.producto"],
      order: { fecha: "DESC" },
    })
  }

  async update(id: number, updateFacturaDto: UpdateFacturaDto): Promise<Factura> {
    const factura = await this.findOne(id)

    // Solo se permite actualizar el estado de la factura
    if (updateFacturaDto.estado) {
      await this.facturasRepository.update(id, { estado: updateFacturaDto.estado })
    }

    return this.findOne(id)
  }

  async remove(id: number): Promise<void> {
    const factura = await this.findOne(id)

    // No se permite eliminar facturas emitidas
    if (factura.estado === "Emitida") {
      throw new BadRequestException("No se puede eliminar una factura emitida")
    }

    await this.facturasRepository.remove(factura)
  }
}
