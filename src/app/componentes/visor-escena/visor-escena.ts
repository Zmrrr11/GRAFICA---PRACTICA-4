import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import * as THREE from 'three';
import { CampoEntrada } from '../campo-entrada/campo-entrada';
import { BotonPrincipal } from '../boton-principal/boton-principal';

@Component({
  selector: 'app-visor-escena',
  standalone: true,
  providers: [CampoEntrada, BotonPrincipal], 
  templateUrl: './visor-escena.html',
  styleUrl: './visor-escena.css'
})
export class VisorEscena implements AfterViewInit {
  @ViewChild('canvas') private canvasRef!: ElementRef;

  private escena = new THREE.Scene();
  private camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  private renderizador!: THREE.WebGLRenderer;
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private listaInteractivos: THREE.Object3D[] = [];

  constructor(private campo: CampoEntrada, private boton: BotonPrincipal) {}

  ngAfterViewInit() {
    this.renderizador = new THREE.WebGLRenderer({ canvas: this.canvasRef.nativeElement, antialias: true });
    this.renderizador.setSize(window.innerWidth, window.innerHeight);
    this.camara.position.z = 5;

    
    const fondoGeo = new THREE.SphereGeometry(500, 60, 40).scale(-1, 1, 1);
    const fondoMat = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('assets/imagen360.jpg') 
    });
    this.escena.add(new THREE.Mesh(fondoGeo, fondoMat));

   
    const inputUser = this.campo.crear(0.8, "Usuario");
    const inputPass = this.campo.crear(-0.1, "Password");
    const btnAccion = this.boton.crear();

    this.listaInteractivos.push(inputUser, inputPass, btnAccion);
    this.escena.add(inputUser, inputPass, btnAccion);
    this.escena.add(new THREE.AmbientLight(0xffffff, 0.8));
    this.animar();
  }

  @HostListener('window:mousemove', ['$event'])
  onMove(e: MouseEvent) {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    this.checkHover();
  }

  private checkHover() {
    this.raycaster.setFromCamera(this.mouse, this.camara);
    const hits = this.raycaster.intersectObjects(this.listaInteractivos, true);
    document.body.style.cursor = 'default';
    this.listaInteractivos.forEach(obj => obj.scale.set(1, 1, 1));

    if (hits.length > 0) {
      document.body.style.cursor = 'pointer';
      let item = hits[0].object;
      if (item.parent instanceof THREE.Group) item = item.parent;
      item.scale.set(1.1, 1.1, 1.1);
    }
  }

  private animar = () => {
    requestAnimationFrame(this.animar);
    this.renderizador.render(this.escena, this.camara);
  }
}