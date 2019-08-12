import {Injectable} from '@angular/core';

import {Todo} from './todo/todo.model';

@Injectable()
export class TodoService {

	private static STORAGE_KEY = 'todos-angular-5';
	private lastInsertId = 0;
	private todos: Todo[] = [];

	constructor() {
		if (this.todos.length > 0) {
			this.lastInsertId = this.todos[this.todos.length - 1].id;
		}
	}

	create(todo: string): Todo {
		todo =  todo.trim();
		if (todo.length === 0) {
			return;
		}
		const newTodo = new Todo(++this.lastInsertId, todo);
		this.todos.push(newTodo);
		return newTodo;
	}

	findAll() {
		return this.todos;
	}

	update(todo: Todo) {
		todo.title = todo.title.trim();
		if (todo.title.length === 0) {
			this.delete(todo);
		}
	}

	delete(todo: Todo) {
		this.todos = this.todos.filter((t) => t !== todo);
	}

	toggle(todo: Todo) {
		todo.completed = !todo.completed;
	}

	toggleAll(completed: boolean) {
		this.todos.forEach((t) => t.completed = completed);
	}

	clearCompleted() {
		this.todos = this.todos.filter((t) => !t.completed);
	}

	remaining() {
		return this.todos
			.filter(t => !t.completed)
			.length;
	}

	completed() {
		return this.todos
			.filter(t => t.completed)
			.length;
	}
}
