import { prisma } from '../../data/postgresDb';
import { CreateTodoDto, TodoEntity } from '../../domain';
import { TodoDatasource } from '../../domain/datasources/todo.datasource';
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo.dto';

export class TodoDatasourceImpl implements TodoDatasource {
	
	async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
		const newTodo = await prisma.todo.create({
			data: createTodoDto!
		})
		return TodoEntity.fromObject( newTodo );
	}

	async getAll(): Promise<TodoEntity[]> {
		const allTodos = await prisma.todo.findMany();
		return allTodos.map( todo => TodoEntity.fromObject(todo));
	}

	async findById(id: number): Promise<TodoEntity> {
		const todo = await prisma.todo.findFirst({
			where: { id }
		});	

		if( !todo ) throw `Todo with id ${ id } not found`;
		return TodoEntity.fromObject(todo);
	}

	async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
		await this.findById( updateTodoDto.id );

		const updatedTodo = await prisma.todo.update({
			where: { id: updateTodoDto.id },
			data: updateTodoDto!.values
		});

		return TodoEntity.fromObject( updatedTodo );
	}

	async deleteById(id: number): Promise<TodoEntity> {
		await this.findById( id );
		const deleted = await prisma.todo.delete({
			where: { id }
		});
		return TodoEntity.fromObject( deleted );
	}

}