import { Injectable } from '@nestjs/common';
import { CreateVeterinarioDto } from './dto/create-veterinario.dto';
import { UpdateVeterinarioDto } from './dto/update-veterinario.dto';
import { DATA_PATH } from 'src/common/constants/data.base.path';
import * as fs from 'fs/promises';
import { randomUUID, UUID } from 'crypto';


@Injectable()
export class VeterinarioService {


  async create(createVeterinarioDto: CreateVeterinarioDto) {


    const data = await this.findAll();
    const newID = randomUUID();
    const newVet = {id:newID , ...createVeterinarioDto}
    data.push(newVet);

    fs.writeFile(DATA_PATH, JSON.stringify(data));
    return ('Verterinario Creado');
  }

  async findAll() {
    //Leemos el archivo 
    const data = await fs.readFile(DATA_PATH);
    
    // convertimos el json obtenido a objeto;
    const taskList = JSON.parse(data.toString())
    return taskList;
  }

  findOne(id: number) {
    const data = this.findAll();
  }

  update(id: number, updateVeterinarioDto: UpdateVeterinarioDto) {
    return `This action updates a #${id} veterinario`;
  }

  remove(id: number) {
    return `This action removes a #${id} veterinario`;
  }
}
