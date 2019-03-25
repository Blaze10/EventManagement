import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  eventList: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) { }

  getEventList() {
    this.eventList = this.db.list('college/events');
    return this.eventList;
  }

}
