import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './todo.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async findAll(): Promise<Todo[]> {
    return await this.todoModel.find({ isDeleted: false }).exec();
  }

  async findById(id: string): Promise<Todo> {
    const todo = await this.todoModel.findById(id).exec();
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  async create(todo: Todo): Promise<Todo> {
    const newTodo = new this.todoModel(todo);
    return await newTodo.save();
  }

  async update(id: string, updatedTodo: Todo): Promise<Todo> {
    const todo = await this.findById(id);
    todo.title = updatedTodo.title;
    todo.description = updatedTodo.description;
    todo.completed = updatedTodo.completed;
    return await todo.save();
  }

  async delete(id: string): Promise<void> {
    const todo = await this.findById(id);
    todo.isDeleted = true;
    todo.save();
  }
}
