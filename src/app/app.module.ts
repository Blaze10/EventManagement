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
    OrganizerBookingsComponent
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
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
