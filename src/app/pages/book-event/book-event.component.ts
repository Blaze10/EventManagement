import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Organizer } from 'src/app/_Models/organizer.model';
import { Router } from '@angular/router';
import { OrganizersService } from './../../_Services/organizers.service';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
import { BookingsService } from 'src/app/_Services/bookings.service';
import { Venue } from 'src/app/_Models/venue.model';
import { VenuesService } from 'src/app/_Services/venues.service';

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
  allVenues: Venue[] = [];
  organizersList: Organizer[] = [];
  selectedOrganizer: Organizer;
  bookingForm: FormGroup;

  constructor(private alertify: AlertifyService, private router: Router,
              private OrgService: OrganizersService, private bookingService: BookingsService,
              private venuService: VenuesService) {
                this.datepickerConfig = Object.assign({}, {
                  containerClass: 'theme-default',
                  dateInputFormat: 'DD-MM-YYYY'
                });
              }

  ngOnInit() {
    this.currentUserEmail = localStorage.getItem('userEmail');
    this.bookingService.getBookingsList();
    // this.getAllOrganizers();
    this.initBookingForm();
    this.getAllVenues();
  }

  getAllOrganizers(venue) {
    this.OrgService.getAllOrganizers().snapshotChanges().subscribe(item => {
      this.organizersList = [];
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['$key'] = element.key;
        const avevents = Object.values(x['availableVenues']);
        if (avevents.includes(venue)) {
          this.organizersList.push(x as Organizer);
        }
      });
    },
    (err => {
      console.log(err);
      this.alertify.error('Some error occured');
    }));
  }

  getAllVenues() {
    this.venuService.getVenueList().valueChanges().subscribe((venuList: Venue[]) => {
      this.allVenues = venuList;
    },
    (err => {
      console.log(err);
    }));
  }

  initBookingForm() {
    this.bookingForm = new FormGroup({
      customeremail: new FormControl(this.currentUserEmail),
      organizer: new FormControl({value: null, disabled: true}, Validators.required),
      venue: new FormControl(null, Validators.required),
      event: new FormControl({value: null, disabled: true}, Validators.required),
      date: new FormControl(new Date(), Validators.required),
      comments: new FormControl(''),
      status: new FormControl('Pending')
   });
  }

  onOrganizerSelect() {
    const key = this.bookingForm.value.venue;
    if (key === null || key === undefined || key === 'Select') {
      this.eventList = [];
      this.venueList = [];
      this.bookingForm.get('organizer').disable();
    } else {
      this.getAllOrganizers(key);
      this.bookingForm.get('organizer').enable();
    }
  }
  onOrgSelect() {
    const key = this.bookingForm.value.organizer;
    if (key === null || key === undefined || key === 'Select') {
      this.eventList = [];
      this.venueList = [];
      this.bookingForm.get('event').disable();
    } else {
      this.OrgService.getOrganizerByKey(key).valueChanges()
    .subscribe((organizer: any) => {
      this.bookingForm.get('event').enable();
      this.selectedOrganizer = organizer;
      this.eventList = this.selectedOrganizer.availableEvents;
    },
    (err => {
      this.bookingForm.get('event').disable();
      console.log(err);
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
