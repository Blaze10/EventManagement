import { AuthService } from './../../_Services/auth.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { BookingsService } from 'src/app/_Services/bookings.service';
import { Booking } from 'src/app/_Models/booking.model';
declare let $: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, DoCheck {
  userBookings: Booking[] = [];
  organizerPendingCout = 0;
  constructor(public authService: AuthService, public bookingService: BookingsService) { }
  useremail = '';
  showNotification = false;
  ngOnInit() {
    this.useremail = localStorage.getItem('userEmail');
    this.checkNotification();
  }

  checkNotification() {
    this.bookingService.getOrganizerBookings(this.useremail).snapshotChanges().subscribe(item => {
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['bookingId'] = element.key;
        this.userBookings.push(x as Booking);
      });
      if (this.userBookings.length > 0) {
        this.userBookings.forEach(ob => {
          if (ob.status === 'Pending') {
            this.organizerPendingCout = this.organizerPendingCout + 1;
          }
        });
      }
      if (this.organizerPendingCout > 0) {
        this.showNotification = true;
      } else {
        this.showNotification = false;
      }
    },
    (err => {
      console.log(err);
    }));
  }

  ngDoCheck() {
    this.useremail = localStorage.getItem('userEmail');
    this.checkNotification();
  }

}
