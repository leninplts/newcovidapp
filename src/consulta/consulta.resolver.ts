import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ConsultaService } from './consulta.service';
import { ConsultaEntity } from './consulta.entity';
import { ConsultaInput } from './consulta.input';
import { DoctorUserInput } from './doctoruser.input';

@Resolver('Consulta')
export class ConsultaResolver {
    constructor(private readonly consultaService: ConsultaService) { }

    @Query(() => [ConsultaEntity])
    async consultas() {
        return this.consultaService.findAll();
    }

    @Mutation(() => ConsultaEntity)
    async createConsulta(@Args('input') input: ConsultaInput) {
        console.log(input)
        return await this.consultaService.create(input);
        // return this.diagnosticoService.createToken(diagnostico);
    }

    @Query(() => [ConsultaEntity])
    async misConsultas(@Args('input') input: DoctorUserInput) {
        return this.consultaService.misConsultas(input);
    }
}
