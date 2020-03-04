import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { RepositoryService } from './../../../repository/repository.service';
import { Credentials } from './../credentials.ts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
form: FormGroup;
public response;

  constructor(public repo: RepositoryService,public fb: FormBuilder) {
    this.form = this.fb.group({
      login: [''],
      password: ['']
    })
  }
 ngOnInit() { }
  onSubmit() {
   

   
    this.repo.login('Users/(Login)',{name:this.form.get('login').value,password:this.form.get('password').value}).subscribe(res => {
        localStorage.setItem('JWT', res) ;
        
      },
      (error) => {
        localStorage.setItem('JWT', error)
        this.response = error;
  }
    )


}
}