import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from './../../../repository/repository.service';
import { AlertService } from './../../services/alert.service';
import { Credentials } from './../credentials.ts';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
form: FormGroup;
public submitted;
public loading;

  constructor(
    public repo: RepositoryService,
    public fb: FormBuilder,
    public alert: AlertService,
    private router: Router)
   {
    this.form = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
      email: ['',Validators.required]
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
    this.repo.post('Users/(Register)',
      {name:this.form.get('username').value,
      password:this.form.get('password').value,
      email:this.form.get('email').value
    }
    ).subscribe(res => {
        this.alert.success('Registration email sent to ' + this.form.get('email').value +'. Open this email to finish signup.', true);
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