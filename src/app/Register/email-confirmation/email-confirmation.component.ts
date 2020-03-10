import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from './../../../repository/repository.service';
import { AlertService } from './../../services/alert.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
public token:string;
public email:string;
public resend:string;

  constructor(private route: ActivatedRoute,public repo: RepositoryService,public alert: AlertService,private router: Router) { }
  

  ngOnInit() {
    
    this.token = this.route.snapshot.queryParamMap.get('tokenConfirmEmail');
    this.email = this.route.snapshot.queryParamMap.get('email');
    console.log('Users/(ConfirmEmail)?tokenConfirmEmail=' + this.token+ '&email='+this.email);
    this.repo.getData('Users/(ConfirmEmail)?tokenConfirmEmail=' + this.token+ '&email='+this.email
    ).subscribe(
      res=> {
        localStorage.setItem('JWT', res);
        this.alert.success('Registration successful', true);
        
      },
      error=>{
        console.log(error.error);
        this.alert.error(error.error);
        localStorage.setItem('JWT', error);
        console.log('Resend: Users/ResendVerificationEmail?email='+ this.email);
        this.repo.getData('Users/(ResendVerificationEmail)?email='+ this.email
        ).subscribe(
      res=> {
        
        this.alert.success('Verification email has been resent successfully', true);
        
      },
      error=>{
        console.log(error.error);
        this.alert.error(error.error);
      }
        )
      }
    )
  }
}