import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-visor-escena',
  standalone: true,
  template: '<div #rendererContainer class="escena-3d"></div>',
  styles: ['.escena-3d { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; z-index: -1; }']
})
export class VisorEscenaComponent implements OnInit {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();

  ngOnInit() {
    this.initThree();
    this.createSkybox();
    this.animate();
  }

  initThree() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.camera.position.set(0, 0, 0.1);
  }

  createSkybox() {
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    const loader = new THREE.TextureLoader();
    const texture = loader.load('assets/imagen360.jpg');
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    this.scene.add(sphere);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.scene.rotation.y += 0.001; 
    this.renderer.render(this.scene, this.camera);
  }
}