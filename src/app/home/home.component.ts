import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  selectedRoute: string | undefined
  routes = [
    { name: 'Admin', path: 'admin' },
    { name: 'Customer', path: 'customer' },
    { name: 'Driver', path: 'driver' }
  ];
  constructor(private _router: Router){}


navigateToRoute() {
  if (this.selectedRoute) {
    this._router.navigate([this.selectedRoute]);
  }
}

}
