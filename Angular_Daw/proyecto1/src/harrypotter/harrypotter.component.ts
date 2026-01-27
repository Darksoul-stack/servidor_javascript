import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
export class perso {
  name: string = '';
  gender: string = '';
  image: string = '';
}
@Component({
  selector: 'app-harrypotter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './harrypotter.component.html',
  styleUrls: ['./harrypotter.component.scss'],
})
export class HarrypotterComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  personajes: perso[] = []; // array vacío
  async ngOnInit() {
    this.apiService.apiUrl = 'https://hp-api.onrender.com/api/characters';
    let a = await this.apiService.getPosts();
    console.log('a', a);
    let t = await lastValueFrom(a);
    console.log('t', t);
    // Asignar los datos al array para ngFor
    this.personajes = t;
  }
}
