import { Entity, Column, ObjectIdColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class MiPaciente {
  @Column('text')
  userid: string

  @Column('text')
  nombres: string

  @Column('text')
  apellidos: string

  @Column('text')
  evaluacion: string

  @Column('text')
  genero: string

  @Column('text')
  distrito: string
}

@Entity('usertest')
export class UserTestEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column('text')
  uderid: string;

  @Column('text')
  dni: string;

  @Column('text')
  nombres: string;

  @Column('text')
  apellidos: string;

  @Column('text')
  genero: string;

  @Column('text')
  edad: string;

  @Column('text')
  region: string;

  @Column('text')
  provincia: string;

  @Column('text')
  distrito: string;

  @Column('text')
  direccion: string;

  @Column('text')
  oficio: string;

  @Column('text')
  peso: string;

  @Column('text')
  talla: string;

  @Column('text')
  respiracion: string;

  @Column('text')
  gestante: string;

  @Column('text')
  enfermedad: string;

  @Column('text')
  enfermedaddetalle: string;

  @Column('text')
  alergia: string;

  @Column('text')
  alergiadetalle: string;

  @Column('text')
  alcohol: string;

  @Column('text')
  medicacion: string;

  @Column('text')
  medicaciondetalle: string;

  @Column('text')
  diagnostico: string;

  @Column('text')
  diagnosticodetalle: string;

  @Column('text')
  contactocovid: string;

  @Column('text')
  fiebre: string;

  @Column('text')
  tos: string;

  @Column('text')
  fatiga: string;

  @Column('text')
  disminucionapetito: string;

  @Column('text')
  dificultadrespiracion: string;

  @Column('text')
  malestargeneral: string;

  @Column('text')
  malestarfechainicio: string;

  @Column('text')
  otros: string;

  @Column('text')
  otrosdetalle: string;

  @Column('text')
  sinsintomas: string;

  @Column('text')
  sensaciondeahogamiento: string;

  @Column('text')
  desorientacion: string;

  @Column('text')
  fiebremayordosdias: string;

  @Column('text')
  dolorespechoespalda: string;

  @Column('text')
  coloraciondelabios: string;

  @Column('text')
  actividadesdiarias: string;

  @Column('text')
  personasdeconvivencia: string;

  @Column('text')
  doctorid: string;

  @Column('text')
  horaregistro: string;
}