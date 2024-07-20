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
    return (`Verterinario ${createVeterinarioDto.name} creado`);
  }

  async findAll() {
    //Leemos el archivo 
    const data = await fs.readFile(DATA_PATH);
    
    // convertimos el json obtenido a objeto;
    const taskList = JSON.parse(data.toString())
    return taskList;
  }

  async findOne(id: string) {
    const data = await this.findAll();
    return data.find(vet => vet.id == id);
  }

  async update(id: string, updateVeterinarioDto: UpdateVeterinarioDto) {
    const data = await this.findAll();
    const vetToUpdate = data.find(vet => vet.id == id);
    const indexToUpdate = data.findIndex(vet => vet.id == id);
    data[indexToUpdate] = {...data[indexToUpdate], ...updateVeterinarioDto}
    fs.writeFile(DATA_PATH, JSON.stringify(data))
    return(`Veterinario ${vetToUpdate.name} modificado`);
  }

  async remove(id: string) {
    const data = await this.findAll();
    const vetToDelete = data.find(vet => vet.id == id);
    const indexToDelete = data.findIndex(vet => vet.id == id);
    data.splice(indexToDelete,1)
    fs.writeFile(DATA_PATH, JSON.stringify(data))
    return (`Veterinario ${vetToDelete.name} eliminado`);


  }
}
