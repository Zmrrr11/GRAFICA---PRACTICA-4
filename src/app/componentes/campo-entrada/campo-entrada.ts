import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-campo-entrada',
  standalone: true,
  template: `
    <div class="input-group">
      <input type="text" [placeholder]="placeholder" class="glass-input">
    </div>
  `,
  styles: [`
    .glass-input {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      padding: 12px;
      color: white;
      width: 100%;
      margin-bottom: 15px;
      backdrop-filter: blur(5px);
      box-sizing: border-box;
    }
  `]
})
export class CampoEntradaComponent {
  @Input() placeholder: string = '';
}