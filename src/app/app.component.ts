import { Todo } from './../model/todo.model';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode: String = 'list';
  public todos: Todo[] = [];
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });
  }

  ngOnInit(): void{
    try{
      const data = localStorage.getItem('todos');
      if(data) {
        this.todos = JSON.parse(data);
      }
    }catch(error) {
      console.log("Erro ao analisar JSON: ", error);
    }
  }

  clearTaskForm(){
    this.form.reset();
  }

  addTask(){
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.saveTask();
    this.clearTaskForm();
  }

  removeTask(todo: Todo){
    const index = this.todos.indexOf(todo);
    if(index !== -1){
      this.todos.splice(index, 1);
    }
    this.saveTask();
  }

  markTaskAsDone(todo: Todo){
    todo.done = true;
    this.saveTask();
  }

  markTaskAsUndone(todo: Todo){
    todo.done = false;
    this.saveTask();
  }

  saveTask(){
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  changeMode(mode: String){
    this.mode = mode;
  }
}
