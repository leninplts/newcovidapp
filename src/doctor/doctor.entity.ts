import { Entity, Column, ObjectIdColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('doctors')
export class DoctorEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column('text')
  nombres: string;

  @Column('text')
  apellidos: string;

  @Column('text')
  usuario: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  celular: string;

  @Column('text')
  especialidad: string;
}