// Customer Routing Module 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admin_Dashboard } from '../components/admin/dashboard/dashboard';
import { EditProfile } from '../layouts/edit-profile/edit-profile.component';


// Import other admin components here

const adminRoutes: Routes = [
  // Admin routes
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Admin_Dashboard, data: { title: 'Dashboard', role: 'customer' } },
  { path: 'edit-profile', component: EditProfile, data: { title: 'Edit profile', role: 'Admin' } },
  // Add more admin-specific routes here
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
