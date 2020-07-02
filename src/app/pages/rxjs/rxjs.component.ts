import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    // tslint:disable-next-line: deprecation
    this.subscription = this.regresaObservable().subscribe(
      // tslint:disable-next-line: variable-name
      number => console.log( 'Subs', number ),
      error => console.error('Error en el obs', error ),
      () => console.log('El observador termino!')
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    console.log('Se cerrara la pagina');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      // tslint:disable-next-line: prefer-const
      let intervalo = setInterval( () => {

        contador++;

        const salida = {
          valor: contador
        };

        observer.next( salida );

        // if ( contador === 3 ) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }

        // if ( contador === 2 ) {
        //   // clearInterval( intervalo );
        //   observer.error('Ha habido un error');
        // }

      }, 1000);

    }).pipe(
      map( resp => resp.valor ),
      // valor, index
      filter( () => {

        // if ( (valor % 2) === 1) {
        //   // Impar
        //   return true;
        // }else {
        //   // Par
        //   return false;
        // }
        return true;
      })
    );

  }

}
