import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskEntity } from 'src/task/task.entity';
import { TaskService } from 'src/task/task.service';
import returnAsJson from 'src/utils';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(): Promise<string> {
    const allItems = await this.taskService.findAll();
    return returnAsJson(allItems);
  }

  @Post()
  async addTask(@Body() data: Omit<TaskEntity, 'id'>): Promise<string> {
    const newTask = await this.taskService.addTask(data);
    return returnAsJson(newTask);
  }
}
