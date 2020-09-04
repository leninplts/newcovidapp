import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DiagnosticoService } from './diagnostico.service';
import { DiagnosticoEntity } from './diagnostico.entity';
import { DiagnosticoInput } from './diagnostico.input';
import { DoctorUserInput } from './doctoruser.input';

@Resolver('Diagnostico')
export class DiagnosticoResolver {
    constructor(private readonly diagnosticoService: DiagnosticoService) { }

    @Query(() => [DiagnosticoEntity])
    async diagnosticos() {
        return this.diagnosticoService.findAll();
    }

    @Mutation(() => DiagnosticoEntity)
    async createDiagnostico(@Args('input') input: DiagnosticoInput) {

        return await this.diagnosticoService.create(input);
        // return this.diagnosticoService.createToken(diagnostico);
    }

    @Query(() => [DiagnosticoEntity])
    async misDiagnosticos(@Args('input') input: DoctorUserInput) {
        return this.diagnosticoService.diagnosticos(input);
    }

}
