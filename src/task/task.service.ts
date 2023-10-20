import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from 'src/task/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  findAll(): Promise<TaskEntity[]> {
    return this.taskRepository.find();
  }

  addTask(data: Omit<TaskEntity, 'id'>): Promise<TaskEntity> {
    return this.taskRepository.save(this.taskRepository.create(data));
  }
}
