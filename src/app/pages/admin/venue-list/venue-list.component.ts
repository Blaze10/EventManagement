import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { VenuesService } from 'src/app/_Services/venues.service';
import { Venue } from 'src/app/_Models/venue.model';
declare const $: any;

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.css']
})
export class VenueListComponent implements OnInit {

  allVenueList: Venue[] = [];
  showLoader = false;
  venueForm: FormGroup;
  mode = 'New';
  modalLoader = false;
  deleteLoader = false;
  selectedKey;
  selectedId;
  p = 1;
  constructor(private alertify: AlertifyService, private venueService: VenuesService) { }

  ngOnInit() {
    this.getAllVenues();
    this.initVenueForm();
  }

  initVenueForm() {
    this.venueForm = new FormGroup({
      venueName: new FormControl('', Validators.required)
    });
  }

  getAllVenues() {
    this.showLoader = true;
    this.venueService.getVenueList().snapshotChanges().subscribe(item => {
      item.forEach(element => {
        const x: any = element.payload.toJSON();
        x.venueId = element.key;
        this.allVenueList.push(x);
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
    const venue = this.venueForm.value;
    this.allVenueList.forEach(element => {
        if (element.venueName.toLowerCase() === venue.venueName.toLowerCase()) {
          entryFlag += 1;
        }
      });
    if (entryFlag > 0) {
        this.alertify.error('Venue with this name already exists!');
        this.modalLoader = false;
      } else {
        if (this.mode === 'New') {
        this.venueService.insertVenue(venue)
        .then(() => {
          this.alertify.success( venue.venueName + ' added successfully');
          this.modalLoader = false;
          this.allVenueList = [];
          this.getAllVenues();
          $('#addModal').modal('hide');
        })
        .catch(err => {
          this.modalLoader = false;
          console.log(err);
          this.alertify.error('Some error occured');
        });
      } else if (this.mode === 'Edit') {
        this.venueService.updateVenue(this.selectedId, venue)
        .then(() => {
          this.alertify.success( venue.venueName + ' updated successfully');
          this.modalLoader = false;
          this.allVenueList = [];
          this.getAllVenues();
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

  onEdit(venue: Venue) {
    this.mode = 'Edit';
    this.selectedId = venue.venueId;
    this.venueForm.patchValue({
      venueName: (venue.venueName)
    });
  }

  onAdd() {
    this.mode = 'New';
    this.venueForm.reset();
  }

  onDeleteVenue(id) {
    this.selectedKey = id;
  }

  confirmDelte() {
    this.deleteLoader = true;
    if (this.selectedKey) {
      this.venueService.deleteVenue(this.selectedKey)
    .then(() => {
      this.deleteLoader = false;
      $('#deleteModal').modal('hide');
      this.alertify.success('Venue deleted successfully');
      this.allVenueList = [];
      this.getAllVenues();
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
