import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Componente1 } from '../componente1/componente1';
import { Componente2 } from '../componente2/componente2';
import { Componente3 } from '../componente3/componente3';
import { HarrypotterComponent } from '../harrypotter/harrypotter.component';
import { Padre } from '../padre/padre';
import { Hijo } from '../hijo/hijo';

export const routes: Routes = [
  { path: 'componente1', component: Componente1 },
  { path: 'componente2', component: Componente2 },
  { path: 'componente3', component: Componente3 },
  { path: 'harrypotter', component: HarrypotterComponent },
  { path: 'padre', component: Padre },
  { path: 'hijo', component: Hijo },
];
