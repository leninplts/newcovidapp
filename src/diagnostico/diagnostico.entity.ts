import { Entity, Column, ObjectIdColumn, BaseEntity } from 'typeorm';

@Entity('diagnostico')
export class DiagnosticoEntity extends BaseEntity {
    @ObjectIdColumn()
    _id: string;

    @Column('text')
    doctorid: string;

    @Column('text')
    userid: string;

    @Column('text')
    nombres: string;

    @Column('text')
    apellidos: string;

    @Column('text')
    dni: string;

    @Column('text')
    casocovid: string;

    @Column('text')
    factorderiesgo: string;

    @Column('text')
    horaregistro: string;
}