import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { BookingsService } from './../../_Services/bookings.service';
import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/_Models/booking.model';

@Component({
  selector: 'app-customer-bookings',
  templateUrl: './customer-bookings.component.html',
  styleUrls: ['./customer-bookings.component.css']
})
export class CustomerBookingsComponent implements OnInit {
  customerMail;
  showLoader = false;
  customerBookings: Booking[] = [];
  customerComment;
  showAlert = false;
  p = 1;
  constructor(private bookingService: BookingsService, private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
    this.showLoader = true;
    this.customerMail = localStorage.getItem('userEmail');
    this.getMyBookings(this.customerMail);
  }

  getMyBookings(key) {
    this.bookingService.getMyBookings(key).snapshotChanges().subscribe(item => {
      this.showLoader = false;
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['bookingId'] = element.key;
        this.customerBookings.push(x as Booking);
      });
      this.showAlert = true;
    },
    (err => {
      this.showAlert = true;
      this.showLoader = false;
      console.log(err.message);
      this.alertify.error('Some error occured');
    }));
  }

  showComment(comment) {
    this.customerComment = comment;
  }

}
