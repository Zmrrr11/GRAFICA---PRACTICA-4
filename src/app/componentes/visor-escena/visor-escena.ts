import { Component } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-campo-entrada',
  standalone: true,
  template: '' 
})
export class CampoEntrada {
  
  crearCajaTexto(y: number, textoCualquiera: string): THREE.Group {
    const grupo = new THREE.Group();
    const geo = new THREE.PlaneGeometry(3.5, 0.6);
    const mat = new THREE.MeshPhongMaterial({ 
      color: 0x000000, 
      transparent: true, 
      opacity: 0.4,
      side: THREE.DoubleSide 
    });
    const fondo = new THREE.Mesh(geo, mat);
    const bordesGeo = new THREE.EdgesGeometry(geo);
    const bordesMat = new THREE.LineBasicMaterial({ color: 0xffffff });
    const bordes = new THREE.LineSegments(bordesGeo, bordesMat);

    grupo.add(fondo, bordes);
    grupo.position.y = y;
    grupo.userData = { tipo: 'input', id: textoCualquiera };
    
    return grupo;
  }
}
//pruba par subir