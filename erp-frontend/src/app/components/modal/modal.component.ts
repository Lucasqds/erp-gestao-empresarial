import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ModalComponent {
  @ViewChild('modal') modal!: ElementRef;
  @Input() titulo: string = '';
  isOpen = false;

  abrirModal() {
    this.isOpen = true;
  }

  fecharModal() {
    this.isOpen = false;
  }
}
