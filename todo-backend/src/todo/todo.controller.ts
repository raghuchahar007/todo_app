import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.schema';

@Controller({ path: 'todo', version: '1' })
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findById(id);
  }

  @Post()
  async create(@Body() todo: Todo): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedTodo: Todo,
  ): Promise<Todo> {
    return this.todoService.update(id, updatedTodo);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.todoService.delete(id);
  }
}
