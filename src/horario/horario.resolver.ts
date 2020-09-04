import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { HorarioEntity } from './horario.entity';
import { HorarioService } from './horario.service';
import { HorarioInput } from './horario.input';

@Resolver('Horario')
export class HorarioResolver {
    constructor(private readonly horarioService: HorarioService) { }

    @Query(() => [HorarioEntity])
    async horarios() {
        return this.horarioService.findAll();
    }

    @Mutation(() => HorarioEntity)
    async createHorario(@Args('input') input: HorarioInput) {
        return await this.horarioService.create(input);
        // return this.horarioService.createToken(user);
    }

    @Query(() => [HorarioEntity])
    async miHorario(@Args('doctorid') doctorid: string) {
        console.log(doctorid);
        return await this.horarioService.getHorariosById(doctorid);
        // return this.horarioService.createToken(doctor);
    }
}
