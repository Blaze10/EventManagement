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

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'organizerHome', component: OrganizerComponent},
  {path: 'organizerRegistration', component: OrganizersCreateComponent},
  {path: 'customerRegistration', component: CustomerCreateComponent},
  {path: 'customerProfile', component: CustomerProfileComponent},
  {path: 'organizerProfile', component: OrganizerProfileComponent},
  {path: 'bookEvent', component: BookEventComponent},
  {path: 'customerBookings', component: CustomerBookingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
