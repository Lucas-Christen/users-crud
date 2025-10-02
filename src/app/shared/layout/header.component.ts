import { Component, signal } from '@angular/core'; // Importe o 'signal'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importe o CommonModule

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, // Adicione o CommonModule aqui
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  template: `
    <mat-toolbar class="hdr">
      <div class="container row">
        <a class="brand" routerLink="/users" aria-label="Sistema IRIS">
          <img src="img/Sistema-Iris-Logo-Original.png" alt="Sistema IRIS" height="28" />
        </a>

        <nav class="nav desktop-nav">
          <a mat-button routerLink="/users">Usuários</a>
          <a mat-stroked-button color="primary" href="https://atendimento.sistemairis.com.br/Account/Login" target="_blank" rel="noopener">
            Área do cliente
          </a>
          <button mat-raised-button color="primary" (click)="openCTA()" aria-label="Solicitar apresentação">
            <mat-icon class="ms" aria-hidden="true">play_circle</mat-icon> Solicitar apresentação
          </button>
        </nav>

        <button mat-icon-button class="menu-button" (click)="toggleMenu()">
          <mat-icon>{{ isMenuOpen() ? 'close' : 'menu' }}</mat-icon>
        </button>
      </div>
    </mat-toolbar>

    <nav class="nav mobile-nav" [class.menu-open]="isMenuOpen()">
      <a mat-button routerLink="/users" (click)="toggleMenu()">Usuários</a>
      <a mat-stroked-button color="primary" href="https://atendimento.sistemairis.com.br/Account/Login" target="_blank" rel="noopener">
        Área do cliente
      </a>
      <button mat-raised-button color="primary" (click)="openCTA()" aria-label="Solicitar apresentação">
        <mat-icon class="ms" aria-hidden="true">play_circle</mat-icon> Solicitar apresentação
      </button>
    </nav>
  `,
  styleUrls: ['./header.component.scss'], // Mantemos a conexão com o .scss
  styles: [`
    .hdr {
      background: #fff;
      color: var(--iris-text);
      border-bottom: 1px solid var(--iris-divider);
      position: sticky; /* Mantemos o header fixo */
      top: 0;
      z-index: 1001;
    }
    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand img {
      display: block;
    }
    .ms {
      font-variation-settings: 'FILL' 0, 'wght' 600, 'GRAD' 0, 'opsz' 24;
    }
    a[mat-button] {
      color: var(--iris-text);
    }
  `]
})
export class HeaderComponent {
  // Signal para controlar se o menu está aberto ou fechado
  isMenuOpen = signal(false);

  // Função para inverter o valor do signal
  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }

  openCTA() {
    window.open('https://www.sistemairis.com.br/solicitar-apresentacao/', '_blank');
  }
}