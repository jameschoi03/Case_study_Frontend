import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) {

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos : Todo[]

  message : string
 
    //= [
    // new Todo(1, 'Update Resume', false, new Date()),
    // new Todo(2, 'Update LinkedIn Account', false, new Date()),
    // new Todo(3, 'Finish 2-3 projects', false, new Date())

    // { id: 1, description: 'Update Resume' },
    // { id: 2, description: 'Update LinkedIn Account' },
    // { id: 3, description: 'Finish 2-3 projects' }

    //]

  // todo = {
  //   id : 1,
  //   description: 'Finish working on LinkedIn account'
  // }

  constructor(
    private todoService: TodoDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshTodos();
  }

  refreshTodos() {
    this.todoService.retrieveAllTodos('James').subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    )
  }

  deleteTodo(id) {
    console.log(`delete todo ${id}`)
    this.todoService.deleteTodo('James Choi', id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete of Issue ${id} Successful!`
        this.refreshTodos();
      }
    )
  }

  updateTodo(id) {
    console.log(`update ${id}`)
    this.router.navigate(['todos', id])
  }

  addTodo() {
    this.router.navigate(['todos', -1])
  }

  
}
