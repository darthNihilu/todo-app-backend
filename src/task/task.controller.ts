import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Category, TaskEntity } from 'src/task/task.entity';
import { TaskService } from 'src/task/task.service';
import returnAsJson from 'src/utils';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/by-category')
  async findAllTasks(@Query('category') category: Category): Promise<string> {
    const allItems = await this.taskService.findAllByCategory(category);
    return returnAsJson(allItems);
  }

  @Get()
  async findAll(): Promise<string> {
    const allItems = await this.taskService.findAll();
    return returnAsJson(allItems);
  }

  @Get('/future')
  async findAllFutureTasks(): Promise<string> {
    const allItems = await this.taskService.findAllFuture();
    return returnAsJson(allItems);
  }

  @Get('/outdated')
  async findAllOutdatedTasks(): Promise<string> {
    const allItems = await this.taskService.findAllOutdated();
    return returnAsJson(allItems);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: number): Promise<string> {
    const allItems = await this.taskService.deleteTask(id);
    return returnAsJson(allItems);
  }

  @Post('/:id/done')
  async markTaskCompleted(@Param('id') id: number): Promise<string> {
    const allItems = await this.taskService.markAsCompleted(id);
    return returnAsJson(allItems);
  }

  @Post('/:id/undone')
  async markTaskUncompleted(@Param('id') id: number): Promise<string> {
    const allItems = await this.taskService.markAsUncompleted(id);
    return returnAsJson(allItems);
  }

  @Post()
  async addTask(@Body() data: Omit<TaskEntity, 'id'>): Promise<string> {
    const newTask = await this.taskService.addTask(data);
    return returnAsJson(newTask);
  }
}
