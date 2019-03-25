import { Event } from './../../_Models/event.model';
import { EventsService } from './../../_Services/events.service';
import { OrganizersService } from './../../_Services/organizers.service';
import { Component, OnInit } from '@angular/core';
import { Organizer } from 'src/app/_Models/organizer.model';
import { AlertifyService } from 'src/app/_Services/alertify.service';

@Component({
  selector: 'app-organizer-profile',
  templateUrl: './organizer-profile.component.html',
  styleUrls: ['./organizer-profile.component.css']
})
export class OrganizerProfileComponent implements OnInit {
  loggedInOrganizer: Organizer;
  showLoader = false;
  eventList = [];
  venueList = [];
  constructor(private organizerSerivce: OrganizersService, private alertify: AlertifyService,
              private eventService: EventsService) { }

  ngOnInit() {
    this.showLoader = true;

    // this.getAllEvents();

    const orgEmail = localStorage.getItem('userEmail');
    this.organizerSerivce.getOrganizerByEmail(orgEmail).snapshotChanges().subscribe((item) => {
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['$key'] = element.key;
        this.loggedInOrganizer = x as Organizer;
      });
      this.showLoader = false;
      this.eventList = Object.values(this.loggedInOrganizer.availableEvents);
      this.venueList = Object.values(this.loggedInOrganizer.availableVenues);
    },
    (err => {
      this.showLoader = false;
      console.log(err);
      this.alertify.error('Some error occured');
    }));
  }

  // getAllEvents() {
  //   this.eventService.getEventList().snapshotChanges().subscribe(item => {
  //     item.forEach(element => {
  //       const x = element.payload.toJSON();
  //       x['eventId'] = element.key;
  //       this.eventList.push(x as Event);
  //     });
  //   });
  // }
}
