import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
public token:string;
public email:string;

  constructor(private route: ActivatedRoute) { }
  

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('tokenConfirmEmail');
    this.email = this.route.snapshot.queryParamMap.get('email');
  }
}