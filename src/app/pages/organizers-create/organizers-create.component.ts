import { AuthService } from './../../_Services/auth.service';
import { Event } from './../../_Models/event.model';
import { EventsService } from './../../_Services/events.service';
import { Component, OnInit } from '@angular/core';
import { Venue } from 'src/app/_Models/venue.model';
import { VenuesService } from 'src/app/_Services/venues.service';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { OrganizersService } from 'src/app/_Services/organizers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organizers-create',
  templateUrl: './organizers-create.component.html',
  styleUrls: ['./organizers-create.component.css']
})
export class OrganizersCreateComponent implements OnInit {
  venueList: Venue[] = [];
  eventList: Event[] = [];
  organizerForm: FormGroup;
  showLoader = false;

  constructor(private venueService: VenuesService, private alertify: AlertifyService,
              private eventService: EventsService, private organizerService: OrganizersService,
              private authService: AuthService, private router: Router) { }

  ngOnInit() {
   this.organizerService.getAllOrganizers();
   this.getAllVenues();
   this.getAllEvents();
   this.initOrganizerForm();
  }

  getAllVenues() {
    this.venueService.getVenueList().snapshotChanges().subscribe(item => {
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['venueId'] = element.key;
        this.venueList.push(x as Venue);
      });
    });
  }

  getAllEvents() {
    this.eventService.getEventList().snapshotChanges().subscribe(item => {
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['eventId'] = element.key;
        this.eventList.push(x as Event);
      });
    });
  }

  initOrganizerForm() {
    this.organizerForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      address: new FormControl('', Validators.required),
      mobile: new FormControl('', [Validators.required, Validators.pattern('[6-9]\\d{9}')]),
      availableVenues: new FormControl(null, Validators.required),
      availableEvents: new FormControl(null, Validators.required)
    });
  }


  onSubmit() {
    this.showLoader = true;
    const email = this.organizerForm.value.email;
    const password = this.organizerForm.value.password;
    this.authService.registerOrganizer(email, password)
    .then(registeredUser => {
      const id = registeredUser.user.uid;
      this.organizerService.registerOrganizer({... this.organizerForm.value, userId: id})
      .then(() => {
        this.organizerService.makeOrganizerEntry(email)
        .then(() => {
          this.showLoader = false;
          this.alertify.success('Registration Successful');
          this.router.navigate(['/organizerHome']);
        })
        .catch((err) => {
          console.log(err);
          this.alertify.error('Oops some error occured');
        });
      })
      .catch((err) => {
        console.log(err);
        this.alertify.error('Oops some error occured');
      });
    })
    .catch(err => {
      this.showLoader = false;
      console.log(err);
      const errorCode = err.code;
      const errorMessage = err.message;
      if (errorCode === 'auth/weak-password') {
        this.alertify.error('The password is too weak');
      } else {
        this.alertify.error(errorMessage);
      }
    });
  }
}
