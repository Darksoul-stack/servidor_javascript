import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';

import { ApiService } from '../services/api.service';
import { Pokemon } from '../models/pokemon';
import { Hijo } from '../hijo/hijo';

@Component({
  selector: 'app-padre',
  standalone: true,
  imports: [CommonModule, Hijo],
  templateUrl: './padre.html',
  styleUrls: ['./padre.scss'],
})
export class Padre {
  resultados: any[] = [];
  arrPersonajes: Pokemon[] = [];

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    //  Llamada a la API principal (PokéAPI)
    this.apiService.apiUrl = 'https://pokeapi.co/api/v2/pokemon?offset=1&limit=20';
    const obs = await this.apiService.getPosts();
    const data = await lastValueFrom(obs);

    this.resultados = data.results; // Aquí se guardan los Pokémon
    console.log('resultados del padre', this.resultados);
  }

  pintarCard(pokemons: Pokemon[]) {
    this.arrPersonajes = pokemons;
    console.log('arrPersonajes en el padre', this.arrPersonajes);
  }
}
