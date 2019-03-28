import { Event } from './../_Models/event.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  eventList: AngularFireList<Event>;
  constructor(private db: AngularFireDatabase) { }

  getEventList() {
    this.eventList = this.db.list('college/events');
    return this.eventList;
  }

  insertEvent(event: Event) {
    return this.eventList.push(event);
  }

  deleteEvent(key) {
    return this.eventList.remove(key);
  }

  updateEvent(key, event) {
    return this.eventList.update(key, event);
  }

}
