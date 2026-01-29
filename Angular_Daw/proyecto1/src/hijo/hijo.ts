import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';

import { ApiService } from '../services/api.service';
import { Pokemon } from '../models/pokemon';
import { Effect } from '../models/Effect';

@Component({
  selector: 'app-hijo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hijo.html',
  styleUrls: ['./hijo.scss'],
})
export class Hijo implements OnChanges {
  @Input() datos: any[] = [];
  @Output() enviarPersonajes = new EventEmitter<Pokemon[]>();

  arrPersonajes: Pokemon[] = [];

  constructor(private apiService: ApiService) {}

  async ngOnChanges(changes: SimpleChanges) {
    // Se ejecuta cada vez que el padre pasa datos nuevos
    if (changes['datos'] && this.datos.length > 0) {
      this.arrPersonajes = [];
      await this.cargarPokemons();
      this.enviarPersonajes.emit(this.arrPersonajes);
      console.log('arrPersonajes en hijo', this.arrPersonajes);
    }
  }

  async cargarPokemons() {
    for (let res of this.datos) {
      this.apiService.apiUrl = res.url;
      const a = await this.apiService.getPosts();
      const dataPok = await lastValueFrom(a);

      const pokemon = new Pokemon();
      pokemon.name = dataPok.name;
      pokemon.image = dataPok.sprites.back_default;

      const efectos: Effect[] = [];

      for (let ability of dataPok.abilities) {
        this.apiService.apiUrl = ability.ability.url;
        const ab = await this.apiService.getPosts();
        const abilityData = await lastValueFrom(ab);

        for (let eff of abilityData.effect_entries) {
          if (eff.language.name === 'en') {
            const e = new Effect();
            e.effect = eff.effect;
            e.short_effect = eff.short_effect;
            efectos.push(e);
          }
        }
      }

      pokemon.effect = efectos;
      this.arrPersonajes.push(pokemon);
    }
  }
}
