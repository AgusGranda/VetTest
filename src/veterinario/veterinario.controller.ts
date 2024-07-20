import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VeterinarioService } from './veterinario.service';
import { CreateVeterinarioDto } from './dto/create-veterinario.dto';
import { UpdateVeterinarioDto } from './dto/update-veterinario.dto';

@Controller('veterinario')
export class VeterinarioController {
  constructor(private readonly veterinarioService: VeterinarioService) {}

  @Post()
  create(@Body() createVeterinarioDto: CreateVeterinarioDto) {
    return this.veterinarioService.create(createVeterinarioDto);
  }

  @Get()
  findAll() {
    return this.veterinarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.veterinarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVeterinarioDto: UpdateVeterinarioDto) {
    return this.veterinarioService.update(+id, updateVeterinarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.veterinarioService.remove(+id);
  }
}
