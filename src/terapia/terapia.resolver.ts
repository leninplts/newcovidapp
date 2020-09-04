import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TerapiaEntity } from './terapia.entity';
import { TerapiaInput } from './terapia.input';
import { TerapiaService } from './terapia.service';
import { DoctorUserInput } from './doctoruser.input';

@Resolver('Terapia')
export class TerapiaResolver {
    constructor(private readonly terapiaService: TerapiaService) { }

    @Query(() => [TerapiaEntity])
    async terapias() {
        return this.terapiaService.findAll();
    }

    @Mutation(() => TerapiaEntity)
    async createTerapia(@Args('input') input: TerapiaInput) {

        return await this.terapiaService.create(input);
        // return this.diagnosticoService.createToken(diagnostico);
    }

    @Query(() => [TerapiaEntity])
    async misTerapias(@Args('input') input: DoctorUserInput) {
        return this.terapiaService.terapias(input);
    }
}
