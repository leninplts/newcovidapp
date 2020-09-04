import { Module } from '@nestjs/common';
import { TerapiaService } from './terapia.service';
import { TerapiaResolver } from './terapia.resolver';
import { TerapiaEntity } from './terapia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TerapiaEntity])],
  providers: [TerapiaService, TerapiaResolver]
})
export class TerapiaModule { }
