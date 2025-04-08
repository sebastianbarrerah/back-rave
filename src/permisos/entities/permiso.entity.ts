import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from "typeorm"
import { Role } from "../../roles/entities/role.entity"

@Entity("permisos")
export class Permiso {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  nombre: string

  @Column()
  descripcion: string

  @Column()
  modulo: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToMany(
    () => Role,
    (role) => role.permisos,
  )
  roles: Role[]
}
