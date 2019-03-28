import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './pages/nav/nav.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { OrganizerComponent } from './pages/home/organizer/organizer.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { OrganizersCreateComponent } from './pages/organizers-create/organizers-create.component';
import { CustomerCreateComponent } from './pages/customer-create/customer-create.component';
import { CustomerProfileComponent } from './pages/customer-profile/customer-profile.component';
import { OrganizerProfileComponent } from './pages/organizer-profile/organizer-profile.component';
import { BookEventComponent } from './pages/book-event/book-event.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { CustomerBookingsComponent } from './pages/customer-bookings/customer-bookings.component';
import { OrganizerBookingsComponent } from './pages/organizer-bookings/organizer-bookings.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CustomersListComponent } from './pages/admin/customers-list/customers-list.component';
import { OrganizersListComponent } from './pages/admin/organizers-list/organizers-list.component';
import { BookingsListComponent } from './pages/admin/bookings-list/bookings-list.component';
import { EventListComponent } from './pages/admin/event-list/event-list.component';
import { VenueListComponent } from './pages/admin/venue-list/venue-list.component';
import { MessageListComponent } from './pages/admin/message-list/message-list.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    OrganizerComponent,
    OrganizersCreateComponent,
    CustomerCreateComponent,
    CustomerProfileComponent,
    OrganizerProfileComponent,
    BookEventComponent,
    CustomerBookingsComponent,
    OrganizerBookingsComponent,
    AboutUsComponent,
    ContactusComponent,
    AdminLoginComponent,
    CustomersListComponent,
    OrganizersListComponent,
    BookingsListComponent,
    EventListComponent,
    VenueListComponent,
    MessageListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    AngularFireModule.initializeApp(environment.config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
