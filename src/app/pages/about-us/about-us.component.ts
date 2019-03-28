import { AuthService } from 'src/app/_Services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
