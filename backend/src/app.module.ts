import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClientesModule } from './clientes/clientes.module';
import { OdontologosModule } from './odontologos/odontologos.module';
import { ServiciosModule } from './servicios/servicios.module';
import { RolesModule } from './roles/roles.module';
import { OdontologoServiciosModule } from './odontologo_servicios/odontologo_servicios.module';
import { CitasModule } from './citas/citas.module';
import { HorariosModule } from './horarios/horarios.module';
import { ServiciosCitasModule } from './servicios_citas/servicios_citas.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '*/**/entities{.ts|js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ClientesModule,
    OdontologosModule,
    ServiciosModule,
    RolesModule,
    OdontologoServiciosModule,
    CitasModule,
    HorariosModule,
    ServiciosCitasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}