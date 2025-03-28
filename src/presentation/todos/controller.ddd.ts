import { Request, Response, } from "express";
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto';
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo.dto';
import { TodoRepository } from '../../domain/repositories/todo.repository';

export class TodosControllerDDD {

	//* DI
	constructor(
		private readonly todoRepository: TodoRepository
	) {}

	public getTodos = async ( req: Request, res: Response) => {

		const todos  = await this.todoRepository.getAll();
		return res.json( todos );
	}

	public getTodoById = async ( req: Request, res: Response ) => {
		const id = +req.params.id;
		try {
			const todo = await this.todoRepository.findById( id );
			res.json(todo);
		} catch (error) {
			res.status(400).json({ error })
		}	
	}

	public createTodo = async ( req: Request, res: Response ) => {
		const [ error, createTodoDto ] = CreateTodoDto.create( req.body )

		if( error )  return res.status(400).json({ error })

		const newTodo = await this.todoRepository.create( createTodoDto! )

		res.json({ description:'Register created', newTodo })
	}

	public updateTodo = async ( req: Request, res: Response ) => {
		
		const id = +req.params.id;
		const [ error, updateTodoDto] = UpdateTodoDto.create({...req.body, id})
		
		if( error )  return res.status(400).json({ error })
		
		const updatedTodo = await this.todoRepository.updateById( updateTodoDto! )
		return res.json( updatedTodo )
		
	}

	public deteleteTodo = async ( req: Request, res: Response ) => {
		const id = +req.params.id;
		const deletedTodo = await this.todoRepository.deleteById( id );
		res.json( deletedTodo );
	}

}