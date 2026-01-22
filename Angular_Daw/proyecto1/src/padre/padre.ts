import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-padre',
  imports: [CommonModule],
  templateUrl: './padre.html',
  styleUrl: './padre.scss',
})
export class perso {
  name: string = '';
  gender: string = '';
  image: string = '';
}
export class Padre implements OnInit {
  constructor(private apiService: ApiService) {}
  personajes: perso[] = []; // array vacío
  async ngOnInit() {
    let a = await this.apiService.getPosts();
    console.log('a', a);
    let t = await lastValueFrom(a);
    console.log('t', t);
    // Asignar los datos al array para ngFor
    this.personajes = t;
  }

  // Función que muestra el total de personajes con alert
  totalPersonajes() {
    const total = this.personajes.length;
    alert('Total de personajes: ' + total);
    return total; // opcional, si quieres usar el valor también en código
  }
}
