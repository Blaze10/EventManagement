import { AlertifyService } from './../../../_Services/alertify.service';
import { Booking } from './../../../_Models/booking.model';
import { BookingsService } from './../../../_Services/bookings.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.css']
})
export class BookingsListComponent implements OnInit {
  allBookings: Booking[] = [];
  showComment = '';
  showLoader = false;
  p = 1;
  constructor(private bookingsService: BookingsService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.showLoader = true;
    this.getAllBookings();
  }

  getAllBookings() {
    this.bookingsService.getBookingsList().snapshotChanges().subscribe(item => {
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['bookingId'] = element.key;
        this.allBookings.push(x as Booking);
      });
      this.showLoader = false;
    },
    (err => {
      this.showLoader = false;
      console.log(err);
      this.alertify.error('Some error occured');
    }));
  }

  onShowComments(comment) {
    this.showComment = comment;
  }

}
