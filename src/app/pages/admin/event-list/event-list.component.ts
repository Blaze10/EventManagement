import { EventsService } from './../../../_Services/events.service';
import { Event } from './../../../_Models/event.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/_Services/alertify.service';
declare const $: any;

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  allEventList: Event[] = [];
  showLoader = false;
  eventForm: FormGroup;
  mode = 'New';
  modalLoader = false;
  deleteLoader = false;
  selectedKey;
  selectedId;
  p = 1;
  constructor(private alertify: AlertifyService, private eventService: EventsService) { }

  ngOnInit() {
    this.getAllEvents();
    this.initEventForm();
  }

  initEventForm() {
    this.eventForm = new FormGroup({
      eventName: new FormControl('', Validators.required)
    });
  }

  getAllEvents() {
    this.showLoader = true;
    this.eventService.getEventList().snapshotChanges().subscribe(item => {
      item.forEach(element => {
        const x: any = element.payload.toJSON();
        x.eventId = element.key;
        this.allEventList.push(x);
      });
      this.showLoader = false;
    },
    (err => {
      console.log(err);
      this.alertify.error('Some error occured');
    }));
  }

  onSubmit() {
    this.modalLoader = true;
    let entryFlag = 0;
    const event = this.eventForm.value;
    this.allEventList.forEach(element => {
        if (element.eventName.toLowerCase() === event.eventName.toLowerCase()) {
          entryFlag += 1;
        }
      });
    if (entryFlag > 0) {
        this.alertify.error('Event with this name already exists!');
        this.modalLoader = false;
      } else {
        if (this.mode === 'New') {
        this.eventService.insertEvent(event)
        .then(() => {
          this.alertify.success( event.eventName + ' added successfully');
          this.modalLoader = false;
          this.allEventList = [];
          this.getAllEvents();
          $('#addModal').modal('hide');
        })
        .catch(err => {
          this.modalLoader = false;
          console.log(err);
          this.alertify.error('Some error occured');
        });
      } else if (this.mode === 'Edit') {
        this.eventService.updateEvent(this.selectedId, event)
        .then(() => {
          this.alertify.success( event.eventName + ' updated successfully');
          this.modalLoader = false;
          this.allEventList = [];
          this.getAllEvents();
          $('#addModal').modal('hide');
        })
        .catch(err => {
          this.modalLoader = false;
          console.log(err);
          this.alertify.error('Some error occured');
        });
      }
    }

  }

  onEdit(event: Event) {
    this.mode = 'Edit';
    this.selectedId = event.eventId;
    this.eventForm.patchValue({
      eventName: (event.eventName)
    });
  }

  onAdd() {
    this.mode = 'New';
    this.eventForm.reset();
  }

  onDeleteEvent(id) {
    this.selectedKey = id;
  }

  confirmDelte() {
    this.deleteLoader = true;
    if (this.selectedKey) {
      this.eventService.deleteEvent(this.selectedKey)
    .then(() => {
      this.deleteLoader = false;
      $('#deleteModal').modal('hide');
      this.alertify.success('event deleted successfully');
      this.allEventList = [];
      this.getAllEvents();
    })
    .catch(err => {
      this.deleteLoader = false;
      console.log(err);
      this.alertify.error('Some error occured');
    });
    } else {
      this.deleteLoader = false;
      this.alertify.error('Some error occured');
    }
  }


}
