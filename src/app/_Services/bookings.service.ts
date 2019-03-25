import { Booking } from './../_Models/booking.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

bookingsList: AngularFireList<any>;
constructor(private db: AngularFireDatabase) { }

getBookingsList() {
  this.bookingsList = this.db.list('college/bookingsList');
  return this.bookingsList;
}

createBookings(data: Booking) {
  return this.bookingsList.push(data);
}

getMyBookings(email) {
  console.log(email);
  return this.db.list('college/bookingsList', ref => ref.orderByChild('customeremail').equalTo(email));
}

}
