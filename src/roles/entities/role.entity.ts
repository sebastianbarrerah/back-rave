import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm"
import { User } from "../../users/entities/user.entity"
import { Permiso } from "../../permisos/entities/permiso.entity"

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  nombre: string

  @Column()
  descripcion: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToMany(
    () => User,
    (user) => user.roles,
  )
  users: User[]

  @ManyToMany(
    () => Permiso,
    (permiso) => permiso.roles,
  )
  @JoinTable({
    name: "role_permisos",
    joinColumn: { name: "role_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "permiso_id", referencedColumnName: "id" },
  })
  permisos: Permiso[]
}
