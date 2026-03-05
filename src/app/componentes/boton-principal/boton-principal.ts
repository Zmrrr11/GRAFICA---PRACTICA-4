import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-boton-principal',
  standalone: true,
  template: `
    <button class="glass-button">{{ label }}</button>
  `,
  styles: [`
    .glass-button {
      background: #4facfe;
      color: white;
      border: none;
      padding: 12px;
      border-radius: 8px;
      width: 100%;
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s;
    }
    .glass-button:hover { background: #00f2fe; }
  `]
})
export class BotonPrincipalComponent {
  @Input() label: string = 'Boton';
}