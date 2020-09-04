import { Entity, Column, ObjectIdColumn, BaseEntity } from 'typeorm';

export class DiasHoras {
  @Column('text')
  dia: string;

  @Column('text')
  inicio: string;

  @Column('text')
  fin: string;
}

@Entity('horarios')
export class HorarioEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column('text')
  doctorid: string;

  @Column('text')
  nombres: string;

  @Column('text')
  apellidos: string;

  @Column(type => DiasHoras)
  diashoras: DiasHoras;

  // @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  // createdAt: Date

  // @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  // updatedAt: Date
}