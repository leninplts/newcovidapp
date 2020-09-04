import { Entity, Column, ObjectIdColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column('text')
  nombres: string;

  @Column('text')
  apellidos: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  celular: string;

  @Column('text')
  direccion: string;
}