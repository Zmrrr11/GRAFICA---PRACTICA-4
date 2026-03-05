// campo-entrada.component.ts
import { Component } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-campo-entrada',
  standalone: true,
  template: 'sadas', 
})
export class CampoEntrada {

  /**
   * Crea un campo de texto 3D estilizado
    @param yPos 
    @param etiqueta 
   */
  crearInput(yPos: number, etiqueta: string): THREE.Group {
    const grupoInput = new THREE.Group();

    const geometriaCaja = new THREE.PlaneGeometry(3.5, 0.6);
    const materialCaja = new THREE.MeshPhongMaterial({
      color: 0x111111,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide
    });
    const fondo = new THREE.Mesh(geometriaCaja, materialCaja);
    const bordesGeo = new THREE.EdgesGeometry(geometriaCaja);
    const bordesMat = new THREE.LineBasicMaterial({ color: 0x00ffff }); // Color cian neón
    const contorno = new THREE.LineSegments(bordesGeo, bordesMat);

    // 3. Icono Simulado (Un pequeño cuadrado al inicio)
    const iconoGeo = new THREE.PlaneGeometry(0.3, 0.3);
    const iconoMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const icono = new THREE.Mesh(iconoGeo, iconoMat);
    icono.position.x = -1.4; // Posicionado a la izquierda del campo

    // Unir todo
    grupoInput.add(fondo, contorno, icono);
    grupoInput.position.set(0, yPos, 0.1); // Un poco adelantado para evitar z-fighting con el fondo 360
    
    // Datos para el Raycaster (Diferenciación de IA)
    grupoInput.userData = { 
      tipo: 'input', 
      id: etiqueta,
      colorOriginal: 0x00ffff 
    };

    return grupoInput;
  }
}