import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Organizer } from 'src/app/_Models/organizer.model';
import { Router } from '@angular/router';
import { OrganizersService } from './../../_Services/organizers.service';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
import { BookingsService } from 'src/app/_Services/bookings.service';

@Component({
  selector: 'app-book-event',
  templateUrl: './book-event.component.html',
  styleUrls: ['./book-event.component.css']
})
export class BookEventComponent implements OnInit {

  datepickerConfig: Partial<BsDatepickerConfig>;
  showLoader = false;
  currentUserEmail;
  venueList =  [];
  eventList = [];
  organizersList: Organizer[] = [];
  selectedOrganizer: Organizer;
  bookingForm: FormGroup;

  constructor(private alertify: AlertifyService, private router: Router,
              private OrgService: OrganizersService, private bookingService: BookingsService) {
                this.datepickerConfig = Object.assign({}, {
                  containerClass: 'theme-default',
                  dateInputFormat: 'DD-MM-YYYY'
                });
              }

  ngOnInit() {
    this.currentUserEmail = localStorage.getItem('userEmail');
    this.bookingService.getBookingsList();
    this.getAllOrganizers();
    this.initBookingForm();
  }

  getAllOrganizers() {
    this.OrgService.getAllOrganizers().snapshotChanges().subscribe(item => {
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['$key'] = element.key;
        this.organizersList.push(x as Organizer);
      });
    },
    (err => {
      console.log(err);
      this.alertify.error('Some error occured');
    }));
  }

  initBookingForm() {
    this.bookingForm = new FormGroup({
      customeremail: new FormControl(this.currentUserEmail),
      organizer: new FormControl(null, Validators.required),
      venue: new FormControl(null, Validators.required),
      event: new FormControl(null, Validators.required),
      date: new FormControl(new Date(), Validators.required),
      comments: new FormControl(''),
      status: new FormControl('Pending')
   });
  }

  onOrganizerSelect() {
    const key = this.bookingForm.value.organizer;
    if (key === null || key === undefined || key === 'Select') {
      this.eventList = [];
      this.venueList = [];
    } else {
      this.OrgService.getOrganizerByKey(key).valueChanges().subscribe((item: Organizer) => {
        this.selectedOrganizer = item;
        this.eventList = this.selectedOrganizer.availableEvents;
        this.venueList = this.selectedOrganizer.availableVenues;
      },
      (err => {
        console.log(err);
        this.alertify.error('Some error occured');
      }));
    }
  }

  onSubmit() {
    this.showLoader = true;
    this.bookingForm.value.date = new DatePipe('en-US').transform(this.bookingForm.value.date, 'dd-MM-yyyy');
    this.bookingForm.value.organizer = this.selectedOrganizer.email;
    this.bookingService.createBookings(this.bookingForm.value)
    .then(() => {
      this.showLoader = false;
      this.alertify.success('Booking request has been created successfully');
      this.router.navigate(['/customerProfile']);
    })
    .catch(err => {
      this.showLoader =  false;
      console.log(err.message);
      this.alertify.error('Some error occured');
    });
  }
}
