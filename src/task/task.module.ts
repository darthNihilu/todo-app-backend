import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from 'src/task/task.controller';
import { TaskEntity } from 'src/task/task.entity';
import { TaskService } from 'src/task/task.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
