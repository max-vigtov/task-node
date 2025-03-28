import { Request, Response, } from "express";
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto';
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo.dto';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, UpdateTodo } from "../../domain";

export class TodosController {

	//* DI
	constructor(
		private readonly todoRepository: TodoRepository
	) {}

	public getTodos = ( req: Request, res: Response ) => {

		new GetTodos( this.todoRepository )
		.execute()
		.then( todos => res.json(todos) )
		.catch( error => res.status(400).json({ message: error.message }));

	}

	public getTodoById = ( req: Request, res: Response ) => {
		const id = +req.params.id;
		new GetTodo( this.todoRepository )
		.execute( id )
		.then( todos => res.json(todos) )
		.catch( error => res.status(400).json({ message: error.message }));

	}

	public createTodo = ( req: Request, res: Response ) => {
		const [ error, createTodoDto ] = CreateTodoDto.create( req.body )

		if( error )  return res.status(400).json({ error })

		new CreateTodo( this.todoRepository )
		.execute( createTodoDto! )
		.then( todos => res.json(todos) )
		.catch( error => res.status(400).json({ message: error.message }));

	}

	public updateTodo = ( req: Request, res: Response ) => {
		
		const id = +req.params.id;
		const [ error, updateTodoDto] = UpdateTodoDto.create({...req.body, id})
		
		if( error )  return res.status(400).json({ error })
		
		new UpdateTodo( this.todoRepository )
		.execute( updateTodoDto! )
		.then( todos => res.json(todos) )
		.catch( error => res.status(400).json({ message: error.message }));		
		
	}

	public deteleteTodo = ( req: Request, res: Response ) => {

		const id = +req.params.id;
		
		new DeleteTodo( this.todoRepository )
		.execute( id )
		.then( todos => res.json(todos) )
		.catch( error => res.status(400).json({ message: error.message }));
	}

}