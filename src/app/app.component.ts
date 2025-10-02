import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingService } from './core/services/loading.service';
import { HeaderComponent } from './shared/layout/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatProgressBarModule, HeaderComponent],
  template: `
    <mat-progress-bar *ngIf="loading.isLoading()" mode="indeterminate" class="topbar"></mat-progress-bar>
    <app-header></app-header>
    <router-outlet />
  `,
  styles: [`.topbar{position:sticky;top:0;left:0;right:0;z-index:1000}`]
})
export class AppComponent { loading = inject(LoadingService); }
