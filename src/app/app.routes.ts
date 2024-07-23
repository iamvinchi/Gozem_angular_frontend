import { Routes } from '@angular/router';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { DriverDashboardComponent } from './driver-dashboard/driver-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CreatePackageComponent } from './create-package/create-package.component';
import { CreateDeliveryComponent } from './create-delivery/create-delivery.component';
import {HomeComponent} from "./home/home.component"


export const routes: Routes = [
   { path: '', title: 'Home', component: HomeComponent, pathMatch: 'full' },
   { path: 'admin', title: 'Admin - Dashboard', component: AdminDashboardComponent, pathMatch: 'full' },
   { path: 'driver', title: 'Driver - Dashboard', component: DriverDashboardComponent, pathMatch: 'full' },
   { path: 'customer', title: 'Customer - Dashboard', component: CustomerDashboardComponent, pathMatch: 'full' },
   { path: 'create-package', title: 'Create - Package', component: CreatePackageComponent, pathMatch: 'full' },
   { path: 'create-delivery', title: 'Create - Delivery', component: CreateDeliveryComponent, pathMatch: 'full' },
];
