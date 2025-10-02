import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule],
  template: `
  <mat-toolbar class="hdr">
    <div class="container row">
      <a class="brand" routerLink="/users" aria-label="Sistema IRIS">
        <img src="img/Sistema-Iris-Logo-Original.png" alt="Sistema IRIS" height="28" />
      </a>

      <nav class="nav">
        <a mat-button routerLink="/users">Usuários</a>
        <a mat-stroked-button color="primary" href="https://www.sistemairis.com.br/" target="_blank" rel="noopener">
          Área do cliente
        </a>
        <button mat-raised-button color="primary" (click)="openCTA()">
          <mat-icon class="ms">play_circle</mat-icon> Solicitar apresentação
        </button>
      </nav>
    </div>
  </mat-toolbar>
  `,
  styles: [`
    .hdr{
      background: #fff; color: var(--iris-text);
      border-bottom: 1px solid var(--iris-divider);
      position: sticky; top:0; z-index:1001;
    }
    .row{display:flex;align-items:center;justify-content:space-between}
    .nav{display:flex;gap:10px;align-items:center}
    .brand img{ display:block; }
    .ms{ font-variation-settings: 'FILL' 0, 'wght' 600, 'GRAD' 0, 'opsz' 24; }
    a[mat-button]{ color: var(--iris-text); }
  `]
})
export class HeaderComponent {
  openCTA(){ window.open('https://www.sistemairis.com.br/', '_blank'); }
}
