import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from './../../../repository/repository.service';
import { AlertService } from './../../services/alert.service';
import { Credentials } from './../credentials.ts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
form: FormGroup;
public submitted;
public loading;

  constructor(
    public repo: RepositoryService,
    public fb: FormBuilder,
    public alert: AlertService,
    private router: Router,)
   {
    this.form = this.fb.group({
      login: ['',Validators.required],
      password: ['',Validators.required]
    })
  }
 ngOnInit() { }
  onSubmit() {
   this.submitted = true;
 
   this.alert.clear();
   if (this.form.invalid){
     return;
   }
   this.loading = true;
    this.repo.post('Users/(Login)',{name:this.form.get('login').value,password:this.form.get('password').value}).subscribe(res => {
        localStorage.setItem('JWT', res) ;
        this.router.navigate(['/']);
      },
      (error) => {
        localStorage.setItem('JWT', error)
        this.alert.error(error);
        this.loading = false;
  }
    )


}
}