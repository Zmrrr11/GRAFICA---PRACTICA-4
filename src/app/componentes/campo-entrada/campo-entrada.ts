import { Component } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-campo-entrada',
  standalone: true,
  template: '', // Lógica pura de Three.js
})
export class CampoEntrada {
  // Fabricamos el objeto 3D del input
  crear(y: number, etiqueta: string): THREE.Group {
    const grupo = new THREE.Group();

    // Fondo del campo (Semi-transparente)
    const geo = new THREE.PlaneGeometry(3.5, 0.6);
    const mat = new THREE.MeshPhongMaterial({ 
      color: 0x000000, 
      transparent: true, 
      opacity: 0.5 
    });
    const fondo = new THREE.Mesh(geo, mat);

    // Marco de neón (Regla GUI: Visibilidad clara)
    const bordesGeo = new THREE.EdgesGeometry(geo);
    const bordesMat = new THREE.LineBasicMaterial({ color: 0x00f3ff });
    const marco = new THREE.LineSegments(bordesGeo, bordesMat);

    grupo.add(fondo, marco);
    grupo.position.y = y;
    
    // Metadata para que el VisorEscena sepa qué es
    grupo.userData = { tipo: 'input', id: etiqueta };

    return grupo;
  }
}