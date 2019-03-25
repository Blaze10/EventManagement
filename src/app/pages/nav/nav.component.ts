import { AuthService } from './../../_Services/auth.service';
import { Component, OnInit, DoCheck } from '@angular/core';
declare let $: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, DoCheck {

  constructor(public authService: AuthService) { }
  useremail = '';
  ngOnInit() {
    this.useremail = localStorage.getItem('userEmail');
  }

  ngDoCheck() {
    this.useremail = localStorage.getItem('userEmail');
  }

}
