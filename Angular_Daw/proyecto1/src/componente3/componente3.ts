import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Componente1 } from '../componente1/componente1';
@Component({
  selector: 'app-componente3',
  imports: [FormsModule, Componente1],
  templateUrl: './componente3.html',
  styleUrl: './componente3.scss',
})
export class Componente3 {
  titulo: string = 'Javi asi se hace algo de código cambio cambio cambio ';
  contador: number = 0;
  nombre: string = '';

  ngOnInit() {
    this.contador = 10;
  }

  incrementar() {
    this.contador++;
  }
  mensaje() {
    alert(this.nombre);
  }

  restar() {
    this.contador--;

    if (this.contador < 0) {
      alert('HADOKKEN!!!!');
    }
  }
}
