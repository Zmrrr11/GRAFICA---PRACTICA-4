import { Component } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-boton-principal',
  standalone: true,
  template: '',
})
export class BotonPrincipal {

  crear(): THREE.Mesh {
    const geo = new THREE.CapsuleGeometry(0.2, 1.2, 8, 16);
    const mat = new THREE.MeshStandardMaterial({ 
      color: 0x00ff88, 
      emissive: 0x002211, 
      roughness: 0.1 
    });
    
    const boton = new THREE.Mesh(geo, mat);
    boton.rotation.z = Math.PI / 2; 
    boton.position.y = -1.5;
    boton.userData = { tipo: 'boton' };

    return boton;
  }
}