import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class MenuLateralComponent {
  menuAtivo: string | null = null;

 alternarSubMenu(menu: string) {
  this.menuAtivo = this.menuAtivo === menu ? null : menu;
}
}
