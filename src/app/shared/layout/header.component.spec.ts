import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('isMenuOpen deve iniciar como false', () => {
    expect(component.isMenuOpen()).toBe(false);
  });

  it('toggleMenu() alterna o estado do menu', () => {
    expect(component.isMenuOpen()).toBe(false);
    
    component.toggleMenu();
    expect(component.isMenuOpen()).toBe(true);
    
    component.toggleMenu();
    expect(component.isMenuOpen()).toBe(false);
  });

  it('botão hambúrguer deve chamar toggleMenu()', () => {
    spyOn(component, 'toggleMenu');
    
    const menuButton = fixture.debugElement.query(By.css('.menu-button'));
    menuButton.nativeElement.click();
    
    expect(component.toggleMenu).toHaveBeenCalled();
  });

  it('ícone do menu alterna entre "menu" e "close"', () => {
    const menuButton = fixture.debugElement.query(By.css('.menu-button mat-icon'));
    
    expect(menuButton.nativeElement.textContent.trim()).toBe('menu');
    
    component.toggleMenu();
    fixture.detectChanges();
    
    expect(menuButton.nativeElement.textContent.trim()).toBe('close');
  });

  it('classe .menu-open é adicionada quando menu está aberto', () => {
    const mobileNav = fixture.debugElement.query(By.css('.mobile-nav'));
    
    expect(mobileNav.nativeElement.classList.contains('menu-open')).toBe(false);
    
    component.toggleMenu();
    fixture.detectChanges();
    
    expect(mobileNav.nativeElement.classList.contains('menu-open')).toBe(true);
  });

  it('openCTA() abre nova janela', () => {
    spyOn(window, 'open');
    
    component.openCTA();
    
    expect(window.open).toHaveBeenCalledWith(
      'https://www.sistemairis.com.br/solicitar-apresentacao/',
      '_blank'
    );
  });

  it('deve renderizar logo do Sistema IRIS', () => {
    const logo = fixture.debugElement.query(By.css('.brand img'));
    expect(logo).toBeTruthy();
    expect(logo.nativeElement.alt).toBe('Sistema IRIS');
  });

  it('deve ter link para /users', () => {
    const links = fixture.debugElement.queryAll(By.css('a[routerLink="/users"]'));
    expect(links.length).toBeGreaterThan(0);
  });
});