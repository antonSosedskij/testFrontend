import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { max } from 'rxjs';
import { Todo } from './interfaces/todo';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  storage: Todo[] = []

  count: number = 0;
  
  todoForm = new FormGroup({
    description: new FormControl('')
  });

  constructor (private router: Router) {

  }

  onSubmit(form: FormGroup){
    console.log(form.value.description)
    let todo: Todo = {
      id: this.count,
      description: form.value.description,
      completed: false
    }

    this.storage.push(todo)
    this.count++
    localStorage.setItem('storage', JSON.stringify(this.storage))

    window.location.reload()
  }

  delete(id : number) {
    for (let index in this.storage) {
      if (this.storage[index].id === id) {
        // console.log(index);
        this.storage.splice(Number(index), 1);
        localStorage.setItem('storage', JSON.stringify(this.storage))
      }
    }
  }

  completeTask(id: number){
    for (let index in this.storage) {
      if (this.storage[index].id === id) {
        // console.log(index);
        this.storage[index].completed = !this.storage[index].completed;
        // console.log(this.storage[index].completed);
        
        localStorage.setItem('storage', JSON.stringify(this.storage))
      }
    }
  }

  ngOnInit() {

    let storage = localStorage.getItem('storage')
    this.storage = storage ? JSON.parse(storage) : []


    let maxId = this.storage.length > 0 ? this.storage[0].id : 0;
    for(let i = 1; i < this.storage.length; i++){
      if (this.storage[i].id > maxId){
        maxId = this.storage[i].id;
      }
    }

    this.count = maxId + 1;
    
  }

}
