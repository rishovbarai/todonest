import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class TodoService {
  constructor(private supabaseService: SupabaseService) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('todos')
      .insert([createTodoDto])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create todo: ${error.message}`);
    }

    return data;
  }

  async findAll(): Promise<Todo[]> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('todos')
      .select('*')
      .order('order', { ascending: true })
      .order('createdAt', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch todos: ${error.message}`);
    }

    return data || [];
  }

  async findOne(id: number): Promise<Todo> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('todos')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return data;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('todos')
      .update({ ...updateTodoDto, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return data;
  }

  async remove(id: number): Promise<void> {
    const { error } = await this.supabaseService
      .getClient()
      .from('todos')
      .delete()
      .eq('id', id);

    if (error) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }

  async updateOrder(todos: { id: number; order: number }[]): Promise<Todo[]> {
    const updatePromises = todos.map(({ id, order }) =>
      this.supabaseService
        .getClient()
        .from('todos')
        .update({ order, updatedAt: new Date().toISOString() })
        .eq('id', id),
    );

    await Promise.all(updatePromises);
    return await this.findAll();
  }
}


