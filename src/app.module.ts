import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from 'src/task/task.controller';
import { TaskModule } from 'src/task/task.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST ? process.env.POSTGRES_HOST : 'localhost',
      // host: 'postgres',
      port: process.env.POSTGRES_PORT
        ? Number(process.env.POSTGRES_PORT)
        : 5434,

      username: 'postgres',
      password: 'testpassword',
      database: 'postgres',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
