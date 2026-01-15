import { Component } from '@angular/core';

@Component({
  selector: 'app-componente1',
  imports: [],
  templateUrl: './componente1.html',
  styleUrl: './componente1.scss',
})
export class Componente1 {
  mensaje(m: String) {
    let y = 'hola pendejos';
    return y;
  }
}
