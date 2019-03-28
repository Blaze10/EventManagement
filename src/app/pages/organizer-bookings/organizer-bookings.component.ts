import { Component, OnInit } from '@angular/core';
import { BookingsService } from 'src/app/_Services/bookings.service';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { CustomersService } from 'src/app/_Services/customers.service';
import { Booking } from 'src/app/_Models/booking.model';
import { Customer } from 'src/app/_Models/customer.model';
import { FormGroup, FormControl } from '@angular/forms';
declare const $: any;

@Component({
  selector: 'app-organizer-bookings',
  templateUrl: './organizer-bookings.component.html',
  styleUrls: ['./organizer-bookings.component.css']
})
export class OrganizerBookingsComponent implements OnInit {
  organizerEmail;
  organizerBookings: Booking[] = [];
  showLoader = false;
  detailCustomer: Customer;
  customerComment = '';
  detailBooking: Booking;
  editForm: FormGroup;
  editLoader = false;
  showAlert = false;
  p = 1;

  constructor(private bookingsService: BookingsService, private alertify: AlertifyService,
              private customerService: CustomersService) { }

  ngOnInit() {
    this.showLoader = true;
    this.organizerEmail = localStorage.getItem('userEmail');
    this.getOrganizerBookings(this.organizerEmail);
    this.editForm = new FormGroup({
      status: new FormControl()
    });
  }

  getOrganizerBookings(email) {
    this.bookingsService.getOrganizerBookings(email).snapshotChanges().subscribe(item => {
      this.showLoader = false;
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['bookingId'] = element.key;
        this.organizerBookings.push(x as Booking);
      });
      this.showAlert = true;
    },
    (err => {
      this.showAlert = true;
      this.showLoader = false;
      console.log(err);
      this.alertify.error('Some error occured');
    }));
  }

  onDetail(email, comments) {
    this.customerService.getCustomerByEmail(email).valueChanges().subscribe((customer: any) => {
      this.detailCustomer = customer[0];
      console.log(this.detailCustomer);
      this.customerComment = comments;
    });
  }


  onEdit(item: Booking) {
    this.detailBooking = item;
  }

  onSubmit() {
    this.showLoader = true;
    this.editLoader = true;
    const bookingId = this.detailBooking.bookingId;
    const status = this.editForm.value.status;
    this.bookingsService.editBookingStatus(bookingId, status)
    .then(() => {
      this.editLoader = false;
      this.alertify.success('Status updation successful!');
      this.organizerBookings = [];
      this.getOrganizerBookings(this.organizerEmail);
      $('#editModal').modal('hide');
    })
    .catch((err) => {
      console.log(err);
      this.alertify.error('Some error occured');
    });
  }
}
