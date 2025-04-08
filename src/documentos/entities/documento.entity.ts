// import { 
//     Entity, 
//     Column, 
//     PrimaryGeneratedColumn, 
//     CreateDateColumn, 
//     UpdateDateColumn, 
//     ManyToOne, 
//     OneToMany, 
//     JoinColumn,
//     Index
//   } from 'typeorm';
//   import { IsNotEmpty, IsDate, IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
//   import { Cliente } from '../clientes/cliente.entity';
//   import { User } from '../users/user.entity';
//   import { DocumentoItem } from './documento-item.entity';
  
//   export enum TipoDocumento {
//     FACTURA = 'factura',
//     COTIZACION = 'cotizacion',
//     NOTA_CREDITO = 'nota_credito',
//     NOTA_DEBITO = 'nota_debito',
//     REMISION = 'remision',
//     RECIBO = 'recibo'
//   }
  
//   export enum EstadoDocumento {
//     BORRADOR = 'borrador',
//     EMITIDO = 'emitido',
//     PAGADO = 'pagado',
//     VENCIDO = 'vencido',
//     CANCELADO = 'cancelado',
//     RECHAZADO = 'rechazado'
//   }
  
//   export enum MetodoPago {
//     EFECTIVO = 'efectivo',
//     TRANSFERENCIA = 'transferencia',
//     TARJETA_CREDITO = 'tarjeta_credito',
//     TARJETA_DEBITO = 'tarjeta_debito',
//     CHEQUE = 'cheque',
//     DEPOSITO = 'deposito',
//     CREDITO = 'credito'
//   }
  
//   @Entity('documentos')
//   @Index(['serie', 'folio'], { unique: true })
//   export class Documento {
//     @PrimaryGeneratedColumn()
//     id: number;
  
//     @Column({ type: 'enum', enum: TipoDocumento })
//     @IsNotEmpty()
//     @IsEnum(TipoDocumento)
//     tipo: TipoDocumento;
  
//     @Column({ length: 10 })
//     @IsNotEmpty()
//     @IsString()
//     serie: string;
  
//     @Column()
//     @IsNotEmpty()
//     @IsString()
//     folio: string;
  
//     @Column()
//     @IsDate()
//     @IsNotEmpty()
//     fechaEmision: Date;
  
//     @Column({ nullable: true })
//     @IsDate()
//     @IsOptional()
//     fechaVencimiento: Date;
  
//     @ManyToOne(() => Cliente, cliente => cliente.documentos, { nullable: false })
//     @JoinColumn({ name: 'clienteId' })
//     cliente: Cliente;
  
//     @Column()
//     clienteId: number;
  
//     @ManyToOne(() => User, user => user.documentosCreados, { nullable: false })
//     @JoinColumn({ name: 'creadoPorId' })
//     creadoPor: User;
  
//     @Column()
//     creadoPorId: number;
  
//     @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
//     @IsNumber()
//     @Min(0)
//     subtotal: number;
  
//     @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
//     @IsNumber()
//     @Min(0)
//     descuento: number;
  
//     @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
//     @IsNumber()
//     @Min(0)
//     impuestos: number;
  
//     @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
//     @IsNumber()
//     @Min(0)
//     total: number;
  
//     @Column({ type: 'enum', enum: EstadoDocumento, default: EstadoDocumento.BORRADOR })
//     @IsEnum(EstadoDocumento)
//     estado: EstadoDocumento;
  
//     @Column({ type: 'enum', enum: MetodoPago, nullable: true })
//     @IsEnum(MetodoPago)
//     @IsOptional()
//     metodoPago: MetodoPago;
  
//     @Column({ nullable: true })
//     @IsString()
//     @IsOptional()
//     referenciaPago: string;
  
//     @Column({ nullable: true })
//     @IsDate()
//     @IsOptional()
//     fechaPago: Date;
  
//     @Column({ type: 'text', nullable: true })
//     @IsString()
//     @IsOptional()
//     notas: string;
  
//     @Column({ type: 'text', nullable: true })
//     @IsString()
//     @IsOptional()
//     condicionesPago: string;
  
//     // Campos específicos para facturas electrónicas
//     @Column({ nullable: true })
//     @IsString()
//     @IsOptional()
//     uuid: string;
  
//     @Column({ nullable: true })
//     @IsString()
//     @IsOptional()
//     certificadoSAT: string;
  
//     @Column({ nullable: true })
//     @IsString()
//     @IsOptional()
//     selloDigitalCFDI: string;
  
//     @Column({ nullable: true })
//     @IsString()
//     @IsOptional()
//     selloSAT: string;
  
//     @Column({ nullable: true })
//     @IsString()
//     @IsOptional()
//     cadenaOriginal: string;
  
//     @Column({ nullable: true })
//     @IsString()
//     @IsOptional()
//     regimen: string;
  
//     @Column({ nullable: true })
//     @IsString()
//     @IsOptional()
//     usoCFDI: string;
  
//     @Column({ nullable: true })
//     @IsString()
//     @IsOptional()
//     formaPago: string; // Código SAT
  
//     @Column({ nullable: true })
//     @IsString()
//     @IsOptional()
//     metodoPagoSAT: string; // Código SAT (PUE, PPD)
  
//     @Column({ nullable: true })
//     @IsString()
//     @IsOptional()
//     motivoCancelacion: string;
  
//     @Column({ nullable: true })
//     @IsDate()
//     @IsOptional()
//     fechaCancelacion: Date;
  
//     // Relación con documentos relacionados (por ejemplo, una factura relacionada con una nota de crédito)
//     @Column({ nullable: true })
//     @IsNumber()
//     @IsOptional()
//     documentoRelacionadoId: number;
  
//     @ManyToOne(() => Documento, { nullable: true })
//     @JoinColumn({ name: 'documentoRelacionadoId' })
//     documentoRelacionado: Documento;
  
//     // Relación con los items del documento
//     @OneToMany(() => DocumentoItem, item => item.documento, { 
//       cascade: true,
//       eager: true 
//     })
//     items: DocumentoItem[];
  
//     // Campos para almacenar los documentos generados
//     @Column({ type: 'text', nullable: true })
//     @IsString()
//     @IsOptional()
//     xmlBase64: string;
  
//     @Column({ type: 'text', nullable: true })
//     @IsString()
//     @IsOptional()
//     pdfBase64: string;
  
//     // Campos para control de versiones y auditoría
//     @Column({ default: 1 })
//     version: number;
  
//     @Column({ nullable: true })
//     @IsString()
//     @IsOptional()
//     ipEmision: string;
  
//     @CreateDateColumn({ type: 'timestamp' })
//     createdAt: Date;
  
//     @UpdateDateColumn({ type: 'timestamp' })
//     updatedAt: Date;
  
//     // Métodos de utilidad
//     calcularTotales() {
//       if (!this.items || this.items.length === 0) {
//         this.subtotal = 0;
//         this.impuestos = 0;
//         this.total = 0;
//         return;
//       }
  
//       // Calcular subtotal (suma de subtotales de items)
//       this.subtotal = this.items.reduce((sum, item) => sum + Number(item.subtotal), 0);
      
//       // Calcular impuestos (suma de impuestos de items)
//       this.impuestos = this.items.reduce((sum, item) => sum + Number(item.impuestos), 0);
      
//       // Calcular total
//       this.total = Number(this.subtotal) - Number(this.descuento) + Number(this.impuestos);
//     }
  
//     estaVencido(): boolean {
//       if (!this.fechaVencimiento) return false;
//       if (this.estado === EstadoDocumento.PAGADO || this.estado === EstadoDocumento.CANCELADO) return false;
      
//       const hoy = new Date();
//       return this.fechaVencimiento < hoy;
//     }
  
//     puedeSerCancelado(): boolean {
//       return this.estado === EstadoDocumento.EMITIDO || this.estado === EstadoDocumento.BORRADOR;
//     }
  
//     puedeSerEditado(): boolean {
//       return this.estado === EstadoDocumento.BORRADOR;
//     }
//   }