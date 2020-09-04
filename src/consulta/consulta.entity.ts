import { Entity, Column, ObjectIdColumn, BaseEntity } from 'typeorm';

@Entity('consulta')
export class ConsultaEntity extends BaseEntity {
    @ObjectIdColumn()
    _id: string;

    @Column('text')
    doctorid: string;

    @Column('text')
    userid: string;

    @Column('text')
    fecha: string;

    @Column('text')
    atendido: string;

    @Column('text')
    horaregistro: string;
}