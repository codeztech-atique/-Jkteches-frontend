// Customer Routing Module 

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditProfile } from '../layouts/edit-profile/edit-profile.component';

import { Customer_Dashboard } from '../components/customer/dashboard/dashboard';

const customerRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Customer_Dashboard, data: { title: 'Dashboard', role: 'customer' } },
  { path: 'edit-profile', component: EditProfile, data: { title: 'Edit profile', role: 'customer' } },
];

@NgModule({
  imports: [RouterModule.forChild(customerRoutes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
