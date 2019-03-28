import { OrganizersService } from 'src/app/_Services/organizers.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_Services/auth.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {
  organizersEntryList = [];
  loginForm: FormGroup;
  showLoader = false;
  constructor(private alertify: AlertifyService, private router: Router,
              private organizersService: OrganizersService, private authService: AuthService) { }

  ngOnInit() {
    this.organizersService.getOrganizerEntryList().valueChanges().subscribe((list: any) => {
      this.organizersEntryList = list;
    });
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  onSubmit() {
    this.showLoader = true;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.authService.loginUser(email, password)
    .then(user => {
      const id = user.user.uid;
      this.organizersEntryList.forEach(item => {
        if (email === item.email) {
          localStorage.setItem('userRole', 'organizer');
          localStorage.setItem('userEmail', email);
        }
      });
      if (this.authService.isOrganizerLoggedIn()) {
        this.alertify.success('Logged in');
        this.router.navigate(['/organizerProfile']);
        this.showLoader = false;
      } else {
        this.alertify.error('Invalid Credentials');
        this.authService.signout();
        this.showLoader = false;
      }
    })
    .catch(err => {
      this.showLoader = false;
      if (!this.authService.isOrganizerLoggedIn()) {
        this.alertify.error('Invalid credentials');
      }
    });
  }

}
