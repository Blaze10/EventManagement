import { Component, OnInit } from '@angular/core';
import { Organizer } from 'src/app/_Models/organizer.model';
import { OrganizersService } from 'src/app/_Services/organizers.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { AuthService } from 'src/app/_Services/auth.service';

@Component({
  selector: 'app-organizers-list',
  templateUrl: './organizers-list.component.html',
  styleUrls: ['./organizers-list.component.css']
})
export class OrganizersListComponent implements OnInit {

  allOrganizers: Organizer[] = [];
  showLoader = false;
  showAddress = '';
  showEvents = '';
  showVenues = '';
  p = 1;
  constructor(private organizerService: OrganizersService, private router: Router,
              private alertify: AlertifyService, private authService: AuthService) { }

  ngOnInit() {
    this.showLoader = true;
    this.getAllOrganizers();
  }

  getAllOrganizers() {
    this.organizerService.getAllOrganizers().snapshotChanges().subscribe(item => {
      this.showLoader = false;
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['$key'] = element.key;
        this.allOrganizers.push(x as Organizer);
      });
      console.log(this.allOrganizers);
    },
    (err => {
      this.showLoader = false;
      console.log(err);
      this.alertify.error('Some error occured');
    }));
  }

  onShowAddress(organizer: Organizer) {
    this.showAddress = organizer.address;
    this.showEvents = Object.values(organizer.availableEvents).toString();
    this.showVenues = Object.values(organizer.availableVenues).toString();
  }


}
