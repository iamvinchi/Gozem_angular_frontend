import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from "@angular/google-maps";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,NgxSpinnerModule,RouterModule,RouterLink,RouterLinkActive, GoogleMapsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'package_tracker';
}


