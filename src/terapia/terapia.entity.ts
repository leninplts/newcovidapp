import { Entity, Column, ObjectIdColumn, BaseEntity } from 'typeorm';

@Entity('terapia')
export class TerapiaEntity extends BaseEntity {
    @ObjectIdColumn()
    _id: string;

    @Column('text')
    doctorid: string;

    @Column('text')
    docnombres: string;

    @Column('text')
    docapellidos: string;

    @Column('text')
    userid: string;

    @Column('text')
    nombres: string;

    @Column('text')
    apellidos: string;

    @Column('text')
    dni: string;

    @Column('text')
    tratamiento: string;

    @Column('text')
    reqevaluacion: string;

    @Column('text')
    examenes: string;

    @Column('text')
    atencionpoeremergencia: string;

    @Column('text')
    daralta: string;

    @Column('text')
    horaregistro: string;
}