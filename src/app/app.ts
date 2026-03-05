import { Component } from '@angular/core';
import { VisorEscenaComponent } from './componentes/visor-escena/visor-escena';
import { CampoEntradaComponent } from './componentes/campo-entrada/campo-entrada';
import { BotonPrincipalComponent } from './componentes/boton-principal/boton-principal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [VisorEscenaComponent, CampoEntradaComponent, BotonPrincipalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}