import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VeterinarioModule } from './veterinario/veterinario.module';

@Module({
  imports: [VeterinarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
