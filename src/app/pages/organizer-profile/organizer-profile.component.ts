import { BookingsService } from './../../_Services/bookings.service';
import { Booking } from 'src/app/_Models/booking.model';
import { Event } from './../../_Models/event.model';
import { EventsService } from './../../_Services/events.service';
import { OrganizersService } from './../../_Services/organizers.service';
import { Component, OnInit } from '@angular/core';
import { Organizer } from 'src/app/_Models/organizer.model';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VenuesService } from 'src/app/_Services/venues.service';
import { Venue } from 'src/app/_Models/venue.model';
import { AuthService } from 'src/app/_Services/auth.service';
declare const $: any;

@Component({
  selector: 'app-organizer-profile',
  templateUrl: './organizer-profile.component.html',
  styleUrls: ['./organizer-profile.component.css']
})
export class OrganizerProfileComponent implements OnInit {
  loggedInOrganizer: Organizer;
  organizerBookings: Booking[] = [];
  showLoader = false;
  showAlert = false;
  editLoader = false;
  passwordLoader = false;
  alertMssg = '';
  alertCount = 0;
  eventList: Event[] = [];
  venueList: Venue[] = [];
  selectedEvents = [];
  selectedVenues = [];
  organizerForm: FormGroup;
  passwordForm: FormGroup;
  constructor(private organizerSerivce: OrganizersService, private alertify: AlertifyService,
              private eventService: EventsService, private bookingService: BookingsService,
              private venueService: VenuesService, private authServive: AuthService) { }

  ngOnInit() {
    this.showLoader = true;
    this.initOrganizerForm();
    this.initPasswordForm();
    this.organizerSerivce.getAllOrganizers();
    this.getAllEvents();
    this.getAllVenues();
    const orgEmail = localStorage.getItem('userEmail');
    this.getBookings(orgEmail);

    this.organizerSerivce.getOrganizerByEmail(orgEmail).snapshotChanges().subscribe((item) => {
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['$key'] = element.key;
        this.loggedInOrganizer = x as Organizer;
      });
      this.selectedEvents = Object.values(this.loggedInOrganizer.availableEvents);
      this.selectedVenues = Object.values(this.loggedInOrganizer.availableVenues);
      this.patchOrganizerForm();
      this.showLoader = false;
    },
    (err => {
      this.showLoader = false;
      console.log(err);
      this.alertify.error('Some error occured');
    }));
  }

  getBookings(email) {
    this.bookingService.getOrganizerBookings(email).valueChanges().subscribe((item: any) => {
      this.alertCount = 0;
      this.organizerBookings = item;
      this.organizerBookings.forEach(element => {
        if (element.status === 'Pending') {
          this.alertCount = this.alertCount + 1;
        }
      });
      if (this.alertCount > 0) {
        this.showAlert = true;
        this.alertMssg = 'You have ' + this.alertCount + ' pending Booking request(s).';
      }
    },
    (err => {
      console.log(err);
    }));
  }

  initOrganizerForm() {
    this.organizerForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', Validators.required),
      mobile: new FormControl('', [Validators.required, Validators.pattern('[6-9]\\d{9}')]),
      availableVenues: new FormControl(null, Validators.required),
      availableEvents: new FormControl(null, Validators.required),
      userId: new FormControl('')
    });
  }

  initPasswordForm() {
    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  patchOrganizerForm() {
    this.organizerForm.patchValue({
      fullName: (this.loggedInOrganizer.fullName),
      email: (this.loggedInOrganizer.email),
      address: (this.loggedInOrganizer.address),
      mobile: (this.loggedInOrganizer.mobile),
      availableVenues: (this.selectedVenues),
      availableEvents: (this.selectedEvents),
      userId: (this.loggedInOrganizer.userId)
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

  getAllVenues() {
    this.venueService.getVenueList().snapshotChanges().subscribe(item => {
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['venueId'] = element.key;
        this.venueList.push(x as Venue);
      });
    });
  }

  onSubmit() {
    this.editLoader = true;
    const key = this.loggedInOrganizer.$key;
    const organizer = this.organizerForm.value;
    this.organizerSerivce.updateOrganizer(key, organizer)
    .then(() => {
      this.editLoader = false;
      this.alertify.success('Profile updation successful');
    })
    .catch((err => {
      this.editLoader = false;
      console.log(err);
      this.alertify.error('Oops some error occured');
    }));
  }

  onChangePassword() {
    this.passwordLoader = true;
    const password = this.passwordForm.value.password;
    this.authServive.resetUserPassword(password)
    .then(() => {
      this.passwordLoader = false;
      $('#exampleModal').modal('hide');
      this.alertify.success('Password updated successfully');
      this.passwordForm.reset();
    })
    .catch((err) => {
      this.passwordLoader = false;
      console.log(err.message);
      this.alertify.error(err.message);
    });
  }
}
