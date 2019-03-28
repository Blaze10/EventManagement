import { AdminGuardGuard } from './guard/admin-guard.guard';
import { CustomerGuardGuard } from './guard/customer-guard.guard';
import { LoginGuardGuard } from './guard/login-guard.guard';
import { MessageListComponent } from './pages/admin/message-list/message-list.component';
import { VenueListComponent } from './pages/admin/venue-list/venue-list.component';
import { BookingsListComponent } from './pages/admin/bookings-list/bookings-list.component';
import { OrganizersListComponent } from './pages/admin/organizers-list/organizers-list.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CustomerBookingsComponent } from './pages/customer-bookings/customer-bookings.component';
import { BookEventComponent } from './pages/book-event/book-event.component';
import { CustomerCreateComponent } from './pages/customer-create/customer-create.component';
import { OrganizersCreateComponent } from './pages/organizers-create/organizers-create.component';
import { OrganizerComponent } from './pages/home/organizer/organizer.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerProfileComponent } from './pages/customer-profile/customer-profile.component';
import { OrganizerProfileComponent } from './pages/organizer-profile/organizer-profile.component';
import { OrganizerBookingsComponent } from './pages/organizer-bookings/organizer-bookings.component';
import { CustomersListComponent } from './pages/admin/customers-list/customers-list.component';
import { EventListComponent } from './pages/admin/event-list/event-list.component';
import { OrganizerGuardGuard } from './guard/organizer-guard.guard';

const routes: Routes = [
  {path: '', redirectTo: '/aboutus', pathMatch: 'full'},
  {path: 'aboutus', component: AboutUsComponent},
  {path: 'contactus', component: ContactusComponent},
  {path: 'admin', component: AdminLoginComponent},
  {
    path: '',
    canActivateChild: [LoginGuardGuard],
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'organizerHome', component: OrganizerComponent},
      {path: 'organizerRegistration', component: OrganizersCreateComponent},
      {path: 'customerRegistration', component: CustomerCreateComponent},
    ]
  },
  {
    path: '',
    canActivateChild: [CustomerGuardGuard],
    children: [
      {path: 'customerProfile', component: CustomerProfileComponent},
      {path: 'bookEvent', component: BookEventComponent},
      {path: 'customerBookings', component: CustomerBookingsComponent},
    ]
  },
  {
    path: '',
    canActivateChild: [OrganizerGuardGuard],
    children: [
      {path: 'organizerProfile', component: OrganizerProfileComponent},
      {path: 'organizerBookings', component: OrganizerBookingsComponent},
    ]
  },
  {
    path: '',
    canActivateChild: [AdminGuardGuard],
    children: [
      {path: 'customersList', component: CustomersListComponent},
      {path: 'organizersList', component: OrganizersListComponent},
      {path: 'bookinsList', component: BookingsListComponent},
      {path: 'eventList', component: EventListComponent},
      {path: 'venueList', component: VenueListComponent},
      {path: 'messageList', component: MessageListComponent}
    ]
  },
  {path: '**', component: AboutUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
