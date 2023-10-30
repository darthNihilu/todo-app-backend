import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan } from 'typeorm';
import { Category, TaskEntity } from 'src/task/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  findAll(): Promise<TaskEntity[]> {
    return this.taskRepository.find();
  }

  findAllOutdated(): Promise<TaskEntity[]> {
    const currentDate = new Date().toISOString();
    return this.taskRepository.find({ where: { date: LessThan(currentDate) } });
  }

  findAllFuture(): Promise<TaskEntity[]> {
    const currentDate = new Date().toISOString();
    return this.taskRepository.find({ where: { date: MoreThan(currentDate) } });
  }

  findAllByCategory(category: Category): Promise<TaskEntity[]> {
    return this.taskRepository.find({ where: { category } });
  }

  addTask(data: Omit<TaskEntity, 'id'>): Promise<TaskEntity> {
    return this.taskRepository.save(this.taskRepository.create(data));
  }

  deleteTask(id: number) {
    return this.taskRepository.delete(id);
  }

  async markAsCompleted(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });
    return await this.taskRepository.save({ ...task, completed: true });
  }

  async markAsUncompleted(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });
    return await this.taskRepository.save({ ...task, completed: false });
  }

  async updateTask(id: number, data: Partial<TaskEntity>): Promise<TaskEntity | null> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      return null; // Task not found
    }

    const updatedTask = { ...task, ...data };
    return this.taskRepository.save(updatedTask);
  }
}
